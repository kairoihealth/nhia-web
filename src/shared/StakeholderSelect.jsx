import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";

import { getAllHmo, getAllProviders } from "../services/settings";
import { selectStyles } from "../utils/style";

const PAGE_SIZE = 50;
const DEBOUNCE_MS = 300;

const FETCHERS = {
  HMO: getAllHmo,
  Provider: getAllProviders,
};

const PLACEHOLDERS = {
  HMO: "Search for an HMO by name or code",
  Provider: "Search for a facility by name, code or LGA",
};

const toOption = (record) => ({
  value: record.id,
  label: record.alias ? `${record.name} (${record.alias})` : record.name,
  record,
});

/**
 * Typeahead picker for an HMO or Health Care Facility.
 *
 * The facility register runs to tens of thousands of rows, so the list cannot
 * be pulled into the browser and filtered there — what the user types is sent
 * to the API and only the matches come back. Keystrokes are debounced so a
 * fast typist causes one request rather than one per character.
 */
const StakeholderSelect = ({
  kind,
  value,
  onChange,
  placeholder,
  isDisabled,
  isClearable = true,
  state,
  error,
}) => {
  const fetcher = FETCHERS[kind];
  const [defaultOptions, setDefaultOptions] = useState([]);
  const debounceRef = useRef(null);

  const search = useCallback(
    async (term) => {
      const data = await fetcher({
        search: term,
        page: 1,
        pageSize: PAGE_SIZE,
        ordering: "name",
        state,
      });
      return (data?.results || []).map(toOption);
    },
    [fetcher, state],
  );

  // A short opening list gives the field something to show before the user
  // types, without pretending it is the whole register.
  useEffect(() => {
    let cancelled = false;
    search("")
      .then((options) => {
        if (!cancelled) setDefaultOptions(options);
      })
      .catch(() => {
        if (!cancelled) setDefaultOptions([]);
      });
    return () => {
      cancelled = true;
    };
  }, [search]);

  const loadOptions = useMemo(
    () => (inputValue) =>
      new Promise((resolve) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          search(inputValue).then(resolve).catch(() => resolve([]));
        }, DEBOUNCE_MS);
      }),
    [search],
  );

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  return (
    <AsyncSelect
      styles={selectStyles}
      cacheOptions
      defaultOptions={defaultOptions}
      loadOptions={loadOptions}
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
      isClearable={isClearable}
      placeholder={placeholder || PLACEHOLDERS[kind]}
      loadingMessage={() => "Searching..."}
      noOptionsMessage={({ inputValue }) =>
        inputValue
          ? `No match for "${inputValue}"`
          : "Start typing to search"
      }
      aria-invalid={Boolean(error)}
    />
  );
};

StakeholderSelect.propTypes = {
  kind: PropTypes.oneOf(["HMO", "Provider"]).isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  state: PropTypes.string,
  error: PropTypes.string,
};

export default StakeholderSelect;

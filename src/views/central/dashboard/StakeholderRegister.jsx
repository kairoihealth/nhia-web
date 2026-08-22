import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ReusableTable from "../../../shared/Table";
import FormCardHeader from "../../enrolees/ComplaintForm/FormCardHeader";
import { useHandleError, useHandleSuccess } from "../../../hooks/useToastHandler";
import { textFieldStyles } from "../../../utils/style";
import {
  addHmo,
  addProvider,
  bulkUploadHmos,
  bulkUploadProviders,
  getAllHmo,
  getAllProviders,
  getRegions,
  getStates,
} from "../../../services/settings";

const PAGE_SIZE = 20;

// The two registers differ only in their columns, their extra filter and which
// service call they use, so one component covers both and the tab picks a
// config rather than duplicating the page.
const REGISTERS = {
  HMO: {
    label: "HMOs",
    singular: "HMO",
    fetch: getAllHmo,
    add: addHmo,
    bulkUpload: bulkUploadHmos,
    columns: [
      { label: "Name", field: "name" },
      { label: "Code", field: "code" },
      { label: "Category", field: "category" },
      { label: "State", field: "stateName" },
      { label: "Official Email", field: "official_email" },
    ],
    extraFilter: {
      key: "category",
      label: "Category",
      options: ["National", "Regional", "State", "Zonal"],
    },
    addFields: [
      { name: "name", label: "HMO name", required: true },
      { name: "code", label: "HMO code" },
      { name: "cac_registration_number", label: "CAC registration number" },
      { name: "official_email", label: "Official email" },
      { name: "call_centre_numbers", label: "Call centre numbers" },
      { name: "street", label: "Address", multiline: true },
    ],
  },
  Provider: {
    label: "Health Care Facilities",
    singular: "HCF",
    fetch: getAllProviders,
    add: addProvider,
    bulkUpload: bulkUploadProviders,
    columns: [
      { label: "Name", field: "name" },
      { label: "Code", field: "alias" },
      { label: "Coverage", field: "entity_coverage_types" },
      { label: "State", field: "stateName" },
      { label: "LGA", field: "lga" },
    ],
    extraFilter: {
      key: "coverage",
      label: "Coverage",
      options: ["Primary", "Secondary", "Tertiary"],
    },
    addFields: [
      { name: "name", label: "Facility name", required: true },
      { name: "alias", label: "Facility code" },
      { name: "lga", label: "LGA" },
      { name: "entity_coverage_types", label: "Coverage type" },
      { name: "street", label: "Address", multiline: true },
    ],
  },
};

const AddDialog = ({ open, onClose, config, states }) => {
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({});

  useEffect(() => {
    if (open) setForm({});
  }, [open]);

  const mutation = useMutation({
    mutationFn: (payload) => config.add(payload),
    onSuccess: () => {
      handleSuccess(`${config.singular} saved.`);
      queryClient.invalidateQueries({ queryKey: ["stakeholder-register"] });
      onClose();
    },
    onError: (error) =>
      handleError(
        error,
        error?.response?.data?.detail || `Could not save the ${config.singular}.`,
      ),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(
      Object.entries(form).filter(([, value]) => String(value || "").trim() !== ""),
    );
    mutation.mutate(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add a new {config.singular}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
        >
          {config.addFields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              required={field.required}
              multiline={field.multiline}
              minRows={field.multiline ? 2 : undefined}
              sx={textFieldStyles}
              value={form[field.name] || ""}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, [field.name]: event.target.value }))
              }
            />
          ))}
          <TextField
            select
            label="State"
            sx={textFieldStyles}
            value={form.state || ""}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, state: event.target.value }))
            }
            helperText="Leave blank for a nationally registered organisation."
          >
            <MenuItem value="">No specific state</MenuItem>
            {states.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            loading={mutation.isPending}
            disabled={!form.name?.trim()}
            sx={{ textTransform: "none", backgroundColor: "#1B5E20" }}
          >
            Save {config.singular}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  states: PropTypes.array.isRequired,
};

const BulkUploadDialog = ({ open, onClose, config }) => {
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (open) {
      setFile(null);
      setResult(null);
    }
  }, [open]);

  const mutation = useMutation({
    mutationFn: () => config.bulkUpload(file),
    onSuccess: (data) => {
      setResult(data);
      handleSuccess(
        `${data.created_count} added, ${data.updated_count} updated.`,
      );
      queryClient.invalidateQueries({ queryKey: ["stakeholder-register"] });
    },
    onError: (error) =>
      handleError(
        error,
        error?.response?.data?.detail || "Could not process that file.",
      ),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Bulk upload {config.label}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ fontSize: "14px", color: "#595959" }}>
          Upload a CSV or XLSX with a <strong>Name</strong> column. Optional
          columns are matched by heading:{" "}
          {config === REGISTERS.HMO
            ? "HMO Code, State, Category, CAC Reg No., Official Email, Call Centre Numbers, Address."
            : "Alias, State, LGA, Address, EntityCoverageTypes."}
        </Typography>
        <Typography sx={{ fontSize: "13px", color: "#6B6B6B" }}>
          Rows are matched on code first and name second, so re-uploading a
          corrected sheet updates existing records instead of duplicating them.
        </Typography>

        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
          sx={{ textTransform: "none", borderColor: "#1B5E20", color: "#1B5E20" }}
        >
          {file ? file.name : "Choose a CSV or XLSX file"}
          <input
            hidden
            type="file"
            accept=".csv,.xlsx"
            onChange={(event) => {
              setFile(event.target.files?.[0] || null);
              setResult(null);
            }}
          />
        </Button>

        {result && (
          <Box
            sx={{
              backgroundColor: "#F6F8F6",
              border: "1px solid #E0E0E0",
              borderRadius: "8px",
              p: 2,
            }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              {result.created_count} added · {result.updated_count} updated ·{" "}
              {result.skipped_count} skipped
            </Typography>
            {result.errors?.length > 0 && (
              <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
                {result.errors.map((message, index) => (
                  <Typography
                    key={index}
                    component="li"
                    sx={{ fontSize: "13px", color: "#8A6D3B" }}
                  >
                    {message}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          {result ? "Done" : "Cancel"}
        </Button>
        <Button
          variant="contained"
          disabled={!file}
          loading={mutation.isPending}
          onClick={() => mutation.mutate()}
          sx={{ textTransform: "none", backgroundColor: "#1B5E20" }}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BulkUploadDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};

const StakeholderRegister = () => {
  const [kind, setKind] = useState("HMO");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [state, setState] = useState("");
  const [extra, setExtra] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  const config = REGISTERS[kind];

  // Searching the register hits the API, so the term is debounced rather than
  // firing a request per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getRegions({ page: 1, pageSize: 100 }),
  });

  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  const stateOptions = useMemo(() => {
    const all = states?.results || [];
    return region ? all.filter((item) => item.region?.id === region) : all;
  }, [states, region]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "stakeholder-register",
      kind,
      page,
      search,
      region,
      state,
      extra,
    ],
    queryFn: () =>
      config.fetch({
        page,
        pageSize: PAGE_SIZE,
        ordering: "name",
        search,
        region,
        state,
        [config.extraFilter.key]: extra,
      }),
    keepPreviousData: true,
  });

  const rows = useMemo(
    () =>
      (data?.results || []).map((record) => ({
        ...record,
        stateName: record.state?.name || "—",
        code: record.code || "—",
        alias: record.alias || "—",
        category: record.category || "—",
        lga: record.lga || "—",
        entity_coverage_types: record.entity_coverage_types || "—",
        official_email: record.official_email || "—",
      })),
    [data],
  );

  const switchRegister = (nextKind) => {
    setKind(nextKind);
    setPage(1);
    setExtra("");
  };

  const resetFilters = () => {
    setSearchInput("");
    setRegion("");
    setState("");
    setExtra("");
    setPage(1);
  };

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <Card
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: "12px",
          boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <FormCardHeader
            title="HMO & HCF Register"
            subtitle="Every accredited HMO and Health Care Facility on the scheme."
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<UploadFileIcon />}
              onClick={() => setUploadOpen(true)}
              sx={{
                textTransform: "none",
                borderColor: "#1B5E20",
                color: "#1B5E20",
                borderRadius: "8px",
              }}
            >
              Bulk upload
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setAddOpen(true)}
              sx={{
                textTransform: "none",
                backgroundColor: "#1B5E20",
                borderRadius: "8px",
              }}
            >
              Add {config.singular}
            </Button>
          </Box>
        </Box>

        <Tabs
          value={kind}
          onChange={(_event, next) => switchRegister(next)}
          sx={{ mt: 2, "& .MuiTabs-indicator": { backgroundColor: "#1B5E20" } }}
        >
          <Tab
            value="HMO"
            label="HMOs"
            sx={{ textTransform: "none", "&.Mui-selected": { color: "#1B5E20" } }}
          />
          <Tab
            value="Provider"
            label="Health Care Facilities"
            sx={{ textTransform: "none", "&.Mui-selected": { color: "#1B5E20" } }}
          />
        </Tabs>
        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "2fr 1fr 1fr 1fr auto",
            },
            gap: 2,
            mb: 3,
            alignItems: "center",
          }}
        >
          <TextField
            size="small"
            label={`Search ${config.label}`}
            placeholder="Name, code, LGA..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <TextField
            select
            size="small"
            label="Region"
            value={region}
            onChange={(event) => {
              setRegion(event.target.value);
              setState("");
              setPage(1);
            }}
          >
            <MenuItem value="">All regions</MenuItem>
            {(regions?.results || []).map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            label="State"
            value={state}
            onChange={(event) => {
              setState(event.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="">All states</MenuItem>
            {stateOptions.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            label={config.extraFilter.label}
            value={extra}
            onChange={(event) => {
              setExtra(event.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="">All</MenuItem>
            {config.extraFilter.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button
            onClick={resetFilters}
            sx={{ textTransform: "none", color: "#1B5E20" }}
          >
            Reset
          </Button>
        </Box>

        <Typography sx={{ fontSize: "14px", color: "#595959", mb: 1 }}>
          {isLoading
            ? "Loading..."
            : `${data?.total ?? 0} ${config.label.toLowerCase()} found`}
        </Typography>

        {isError ? (
          <Typography color="error">
            {error?.response?.data?.detail || "Could not load the register."}
          </Typography>
        ) : isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <ReusableTable
              columns={config.columns}
              rows={rows}
              showActions={false}
              showStatus={false}
              pagination
              totalPages={data?.total_pages || 1}
              page={page}
              setPage={setPage}
            />
          </Box>
        )}
      </Card>

      <AddDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        config={config}
        states={states?.results || []}
      />
      <BulkUploadDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        config={config}
      />
    </Box>
  );
};

export default StakeholderRegister;

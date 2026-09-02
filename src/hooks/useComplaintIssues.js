import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getComplaintIssueOptions } from "../services/general";

export const OTHERS_ISSUE = "Others";

/**
 * Issues available for a complainant/respondent pair.
 *
 * Which issues exist depends on *both* who is complaining and who is being
 * complained about — an enrollee complaining about a hospital and an HMO
 * complaining about the same hospital raise different things — so the pair is
 * sent to the API and the schedule comes back from there. Keeping the
 * catalogue server-side means the form and the validation that accepts it can
 * never drift apart.
 *
 * The list always ends with "Others" so a complainant who cannot find their
 * situation can describe it in their own words.
 */
export const useComplaintIssues = (complainantCategory, complaintAgainst) => {
  const enabled = Boolean(complainantCategory && complaintAgainst);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["complaint-issues", complainantCategory, complaintAgainst],
    queryFn: () =>
      getComplaintIssueOptions({
        complainant_category: complainantCategory,
        complaint_against: complaintAgainst,
      }),
    enabled,
    staleTime: 1000 * 60 * 30,
  });

  const issues = useMemo(() => data?.issues || [], [data]);

  const issueOptions = useMemo(
    () =>
      issues.map((issue) => ({
        value: issue.description,
        label: issue.description,
      })),
    [issues],
  );

  const findIssue = useMemo(
    () => (description) =>
      issues.find((issue) => issue.description === description) || null,
    [issues],
  );

  return {
    issues,
    issueOptions,
    findIssue,
    allowedRespondents: data?.allowed_respondents || [],
    isLoading: enabled && isLoading,
    isError,
  };
};

/**
 * Respondents a complainant of this category may file against.
 *
 * Fetched without a respondent, so the API answers with the allowed list only.
 */
export const useAllowedRespondents = (complainantCategory) => {
  const { data, isLoading } = useQuery({
    queryKey: ["complaint-respondents", complainantCategory],
    queryFn: () =>
      getComplaintIssueOptions({ complainant_category: complainantCategory }),
    enabled: Boolean(complainantCategory),
    staleTime: 1000 * 60 * 30,
  });

  const respondentLabels = {
    Enrollee: "Enrollee",
    HMO: "HMO",
    Provider: "Health Care Facility (HCF)",
    NHIA: "NHIA",
  };

  const filteredRespondentOptions = useMemo(
    () => {
      if (complainantCategory === "Enrollee") {
        return (data?.allowed_respondents || []).filter(
          (value) => value !== "NHIA",
        );
      } else {
        return data?.allowed_respondents || [];
      }
    },
    [data], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const respondentOptions = useMemo(
    () =>
      filteredRespondentOptions?.map((value) => ({
        value,
        label: respondentLabels[value] || value,
      })),
    [data], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return { respondentOptions, isLoading };
};

import { Chip } from "@mui/material";
import PropTypes from "prop-types";

const statusColors = {
  resolved: { backgroundColor: "#E8F5E9", color: "#1B5E20" },
  closed: { backgroundColor: "#E8F5E9", color: "#1B5E20" },
  active: { backgroundColor: "#E3F2FD", color: "#0D47A1" },
  pending: { backgroundColor: "#FFF8E1", color: "#FF8F00" },
  escalated: { backgroundColor: "#FFEBEE", color: "#C62828" },
  default: { backgroundColor: "#F5F5F5", color: "#616161" },
};

export const StatusChip = ({ status }) => {
  const statusLower = status?.toLowerCase();
  const colors = statusColors[statusLower] || statusColors.default;
  return (
    <Chip
      label={status || "Unknown"}
      size="small"
      sx={{
        backgroundColor: colors.backgroundColor,
        color: colors.color,
        textTransform: "capitalize",
        fontWeight: 400,
      }}
    />
  );
};

StatusChip.propTypes = {
  status: PropTypes.string,
};

const priorityColors = {
  low: { backgroundColor: "#E3F2FD", color: "#0D47A1" },
  medium: { backgroundColor: "#FFF8E1", color: "#FF8F00" },
  high: { backgroundColor: "#FFEBEE", color: "#C62828" },
  urgent: { backgroundColor: "#FFEBEE", color: "#C62828" },
  default: { backgroundColor: "#F5F5F5", color: "#616161" },
};

export const PriorityChip = ({ priority }) => {
  const priorityLower = priority?.toLowerCase();
  const colors = priorityColors[priorityLower] || priorityColors.default;
  return (
    <Chip
      label={priority || "N/A"}
      size="small"
      sx={{
        backgroundColor: colors.backgroundColor,
        color: colors.color,
        textTransform: "capitalize",
        fontWeight: 400,
      }}
    />
  );
};

PriorityChip.propTypes = {
  priority: PropTypes.string,
};

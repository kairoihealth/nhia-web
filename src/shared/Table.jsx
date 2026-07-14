import { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  Box,
  Pagination,
  PaginationItem,
  Chip,
} from "@mui/material";
import PropTypes from "prop-types";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

const ReusableTable = ({
  columns,
  rows,
  onViewClick,
  showActions = false,
  showStatus = false,
  pagination = false,
  headerBackgroundColor = "#1B5E20",
  actionButtonText = "View Complaint",
  statusLabel = "Complaint Status",
  totalPages = 1,
  page = 1,
  setPage,
  pageSize = 10,
  // setPageSize,
}) => {
  // const [page, setPage] = useState(1);
  const statusColors = {
    closed: { backgroundColor: "#E8F5E9", color: "#1B5E20" },
    active: { backgroundColor: "#E3F2FD", color: "#0D47A1" },
    pending: { backgroundColor: "#FFF8E1", color: "#FF8F00" },
    escalated: { backgroundColor: "#FFEBEE", color: "#C62828" },
    default: { backgroundColor: "#F5F5F5", color: "#616161" },
  };

  const getStatusChip = (status) => {
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
        }}
      />
    );
  };
  const rowsPerPage = pageSize || 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  console.log(rows, "rows");

  // const paginatedRows = rows.slice(
  //   (page - 1) * rowsPerPage,
  //   page * rowsPerPage
  // );

  return (
    <Box
      elevation={3}
      sx={{
        overflowX: "auto",
        mb: 4,
        border: "none",
      }}
    >
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: headerBackgroundColor,
              color: "#FFFFFF",
              "& th:first-of-type": {
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              },
              "& th:last-of-type": {
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              },
            }}
          >
            {columns.map((column, index) => (
              <TableCell key={index} align={column.align || "left"}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "19.12px",
                    color: "#FFFFFF",
                  }}
                >
                  {column.label}
                </Typography>
              </TableCell>
            ))}
            {showStatus && (
              <TableCell
                align="center"
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "19.12px",
                  color: "#FFFFFF",
                }}
              >
                {statusLabel}
              </TableCell>
            )}
            {showActions && (
              <TableCell
                align="center"
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "19.12px",
                  color: "#FFFFFF",
                }}
              >
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody
          sx={{
            "& td": {
              border: "none",
              color: "#595959",
            },
            "& tr:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
        >
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover>
              {/* Render Data Cells */}
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} align={column.align || "left"}>
                  {typeof column.format === "function"
                    ? column.format(row[column.field])
                    : row[column.field]}
                </TableCell>
              ))}

              {/* Status Pill Cell (if showStatus is true) */}
              {showStatus && (
                <TableCell align="center">
                  {getStatusChip(row.status)}
                </TableCell>
              )}

              {/* View Button Cell (if showActions is true) */}
              {showActions && (
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() => onViewClick(row)}
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      lineHeight: "21.6px",
                      borderRadius: "60px",
                      backgroundColor: "#1B5E20",
                      color: "#FFFFFF",
                      // py: { xs: "8px", md: "12px" },
                      // px: { xs: "16px", md: "23px" },
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#027A3B" },
                    }}
                  >
                    {actionButtonText}
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pagination && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          {/* Math.ceil(rows.length / rowsPerPage) */}
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            renderItem={(item) => {
              console.log(item, "item");
              // Render page numbers first
              if (item.type === "page") {
                return (
                  <PaginationItem
                    {...item}
                    sx={{
                      mx: 0.5, // Add some spacing between page numbers
                      "&.Mui-selected": {
                        backgroundColor: "#1B5E20",
                        color: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: "#027A3B",
                        },
                      },
                    }}
                  />
                );
              }
              // Render navigation buttons (previous/next) on the right
              if (item.type === "previous" || item.type === "next") {
                return (
                  <PaginationItem
                    {...item}
                    component={Box} // Use Box to customize the icon
                    sx={{
                      ml: 1, // Add spacing between navigation buttons
                      "&.Mui-disabled": {
                        opacity: 0.5,
                      },
                    }}
                    icon={
                      item.type === "previous" ? <ArrowLeft /> : <ArrowRight />
                    }
                  />
                );
              }
              // Hide ellipsis (optional)
              if (
                item.type === "start-ellipsis" ||
                item.type === "end-ellipsis"
              ) {
                return null;
              }
              return <PaginationItem {...item} />;
            }}
          />
        </Box>
      )}
    </Box>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      align: PropTypes.string,
      format: PropTypes.func,
    }),
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onViewClick: PropTypes.func,
  showActions: PropTypes.bool,
  showStatus: PropTypes.bool,
  pagination: PropTypes.bool,
  headerBackgroundColor: PropTypes.string,
  actionButtonText: PropTypes.string,
  statusLabel: PropTypes.string,
  totalPages: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.func,
  pageSize: PropTypes.number,
  setPageSize: PropTypes.func,
};

ReusableTable.defaultProps = {
  showActions: false,
  showStatus: false,
  pagination: false,
  headerBackgroundColor: "#1B5E20",
  actionButtonText: "View Complaint",
  statusLabel: "Complaint status",
  totalPages: 1,
  page: 1,
  pageSize: 10,
};

export default ReusableTable;

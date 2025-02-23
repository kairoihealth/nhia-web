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
  PaginationItem
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
  headerBackgroundColor = "#038F3E",
  actionButtonText = "View Complaint"
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedRows = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box
      elevation={3}
      sx={{
        overflowX: "auto",
        mb: 4,
        border: "none"
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
                borderBottomLeftRadius: "10px"
              },
              "& th:last-of-type": {
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px"
              }
            }}
          >
            {columns.map((column, index) => (
              <TableCell key={index} align={column.align || "left"}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "19.12px",
                    color: "#FFFFFF"
                  }}
                >
                  {column.label}
                </Typography>
              </TableCell>
            ))}
            {showActions && (
              <TableCell
                align="center"
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "19.12px",
                  color: "#FFFFFF"
                }}
              >
                Actions
              </TableCell>
            )}
            {showStatus && (
              <TableCell
                align="center"
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "19.12px",
                  color: "#FFFFFF"
                }}
              >
                Complaint Status
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody
          sx={{
            "& td": {
              border: "none",
              color: "#595959"
            },
            "& tr:hover": {
              backgroundColor: "#F5F5F5"
            }
          }}
        >
          {paginatedRows.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover>
              {/* Render Data Cells */}
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} align={column.align || "left"}>
                  {typeof column.format === "function"
                    ? column.format(row[column.field])
                    : row[column.field]}
                </TableCell>
              ))}

              {/* View Button Cell (if showActions is true) */}
              {showActions && (
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() => onViewClick(row)}
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "21.6px",
                      borderRadius: "8px",
                      backgroundColor: "#038F3E",
                      color: "#FFFFFF",
                      py: "12px",
                      px: "23px",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#027A3B" }
                    }}
                  >
                    {actionButtonText}
                  </Button>
                </TableCell>
              )}

              {/* Status Pill Cell (if showStatus is true) */}
              {showStatus && (
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "inline-block",
                      px: 2,
                      py: 0.5,
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "21.6px",
                      borderRadius: "8px",
                      backgroundColor:
                        row.status === "Pending"
                          ? "#FFF3E7"
                          : row.status === "Resolved"
                          ? "#D6EBFF"
                          : "#E8F8EE",
                      color:
                        row.status === "Pending"
                          ? "#EDB378"
                          : row.status === "Resolved"
                          ? "#4B95DD"
                          : "#096F35"
                    }}
                  >
                    &bull; {row.status || "N/A"}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pagination && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            renderItem={(item) => {
              // Render page numbers first
              if (item.type === "page") {
                return (
                  <PaginationItem
                    {...item}
                    sx={{
                      mx: 0.5, // Add some spacing between page numbers
                      "&.Mui-selected": {
                        backgroundColor: "#038F3E",
                        color: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: "#027A3B"
                        }
                      }
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
                        opacity: 0.5
                      }
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
      format: PropTypes.func
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onViewClick: PropTypes.func,
  showActions: PropTypes.bool,
  showStatus: PropTypes.bool,
  pagination: PropTypes.bool,
  headerBackgroundColor: PropTypes.string,
  actionButtonText: PropTypes.string
};

ReusableTable.defaultProps = {
  showActions: false,
  showStatus: false,
  pagination: false,
  headerBackgroundColor: "#038F3E",
  actionButtonText: "View Complaint"
};

export default ReusableTable;

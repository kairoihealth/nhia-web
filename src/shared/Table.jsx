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
  Icon,
  useTheme,
  useMediaQuery,
  Card,
} from "@mui/material";
import PropTypes from "prop-types";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { StatusChip } from "./StatusChips";

const ReusableTable = ({
  columns,
  rows,
  onViewClick,
  showActions = false,
  showStatus = false,
  pagination = false,
  headerBackgroundColor = "#E8F5E9",
  actionButtonText = "View Complaint",
  statusLabel = "Complaint Status",
  totalPages = 1,
  page = 1,
  setPage,
  // pageSize = 10,
  // setPageSize,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (isMobile) {
    return (
      <Box>
        {rows.length > 0 ? (
          rows.map((row, rowIndex) => (
            <Card
              key={rowIndex}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: "12px",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {columns.map((column, colIndex) => (
                <Box
                  key={colIndex}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1,
                    borderBottom:
                      colIndex === columns.length - 1 && !showStatus
                        ? "none"
                        : "1px solid #f0f0f0",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#6B6B6B" }}
                  >
                    {column.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#595959", textAlign: "right" }}
                  >
                    {typeof column.format === "function"
                      ? column.format(row[column.field])
                      : row[column.field]}
                  </Typography>
                </Box>
              ))}
              {showStatus && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#6B6B6B" }}
                  >
                    {statusLabel}
                  </Typography>
                  <StatusChip status={row.status} />
                </Box>
              )}
              {showActions && (
                <Button
                  fullWidth
                  variant="contained"
                  size="medium"
                  onClick={() => onViewClick(row)}
                  sx={{
                    mt: 2,
                    fontSize: "14px",
                    fontWeight: 500,
                    borderRadius: "8px",
                    backgroundColor: "#1B5E20",
                    color: "#FFFFFF",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#027A3B" },
                  }}
                >
                  {actionButtonText}
                </Button>
              )}
            </Card>
          ))
        ) : (
          <Box
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              textAlign: "center",
            }}
          >
            <Icon sx={{ fontSize: 64, color: "grey.400" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </Icon>
            <Typography variant="body1" color="text.secondary">
              No data to display
            </Typography>
          </Box>
        )}
        {pagination && totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          overflowX: "auto", // This will be respected now
          mb: 3,
          border: "1px solid #E0E0E0",
          borderRadius: "12px",
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            "& .MuiTableCell-root": { whiteSpace: "nowrap" },
          }}
        >
          {/* Table Header */}
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: headerBackgroundColor,
                color: "#FFFFFF",
                "& th": {
                  padding: "14px 10px",
                },
                // "& th:first-of-type": {
                //   borderTopLeftRadius: "10px",
                //   borderBottomLeftRadius: "10px",
                // },
                // "& th:last-of-type": {
                //   borderTopRightRadius: "10px",
                //   borderBottomRightRadius: "10px",
                // },
              }}
            >
              {columns.map((column, index) => (
                <TableCell key={index} align={column.align || "left"}>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontWeight: 600,
                      lineHeight: "19.12px",
                      color: "#6B6B6B",
                      textTransform: "uppercase",
                      letterSpacing: "0.3px",
                      textAlign: "left",
                    }}
                  >
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
              {showStatus && (
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "11px",
                    fontWeight: 600,
                    lineHeight: "19.12px",
                    color: "#6B6B6B",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    textAlign: "left",
                  }}
                >
                  {statusLabel}
                </TableCell>
              )}
              {showActions && (
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "11px",
                    fontWeight: 600,
                    lineHeight: "19.12px",
                    color: "#6B6B6B",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    textAlign: "left",
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
                color: "#595959",
                borderBottom: "1px solid #E0E0E0",
                padding: "14px 10px",
                fontSize: "13px",
                textAlign: "left",
              },
              "& tr:last-of-type td": {
                borderBottom: "none",
              },
              "& tr:hover": {
                backgroundColor: "#F5F5F5",
              },
              "& tr:last-child td": {
                borderBottom: "none",
              },
            }}
          >
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
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
                    <TableCell align="left">
                      {<StatusChip status={row.status} />}
                    </TableCell>
                  )}

                  {/* View Button Cell (if showActions is true) */}
                  {showActions && (
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        size="medium"
                        onClick={() => onViewClick(row)}
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: "21.6px",
                          letterSpacing: "0.3",
                          borderRadius: "60px",
                          backgroundColor: "#1B5E20",
                          color: "#FFFFFF",
                          textTransform: "none",
                          "&:hover": { backgroundColor: "#027A3B" },
                        }}
                      >
                        {actionButtonText}
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length +
                    (showActions ? 1 : 0) +
                    (showStatus ? 1 : 0)
                  }
                  align="left"
                >
                  <Box
                    sx={{
                      p: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: 64, color: "grey.400" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>
                    </Icon>
                    <Typography variant="body1" color="text.secondary">
                      No data to display
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      {/* Pagination */}
      {pagination && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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

// import { Helmet } from "react-helmet-async";
import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Card,
  CircularProgress,
} from "@mui/material";
import { useMemo } from "react";
import { useState } from "react";
import PieChart from "../../../shared/PieChart";
import { options } from "../../../utils/config";
import { useQuery } from "@tanstack/react-query";
import { getComplaintStats } from "../../../services/general";
import { useHandleError } from "../../../hooks/useToastHandler";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getStates } from "../../../services/settings";
import WithAuthorization from "../../../components/auth/withAuthorization";
import { useAuth } from "../../../components/auth/AuthContext";

// const styles = {
//   borderRadius: "8px",
//   "& .MuiOutlinedInput-notchedOutline": {
//     borderColor: "#DADADA",
//   },
//   "&:hover .MuiOutlinedInput-notchedOutline": {
//     borderColor: "#038F3E",
//   },
//   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//     borderColor: "#038F3E",
//   },
// };

const textStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    "&:hover": {
      outline: "1px solid #038F3E",
    },
    "&.Mui-focused": {
      outline: "1px solid #038F3E",
      boxShadow: "none",
    },
  },
};

const ProvidersReportPage = () => {
  const { hasPermission } = useAuth();
  const handleError = useHandleError();
  const [pieData, setPieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    reportType: "complaints",
    location: "",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const {
    data: states,
    isLoading: isLoadingStates,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  const handleGenerateReport = async () => {
    const { reportType, location, startDate, endDate } = filters;

    try {
      setIsLoading(true);
      const reportData = await getComplaintStats({
        reportType,
        state_id: location,
        start_date: startDate,
        end_date: endDate,
      });

      // const data = reportData?.map((complaint) => ({
      //   id: complaint.id,
      //   complaintId: complaint.complaintId,
      //   providerName: complaint.providerName,
      //   providerId: complaint.providerId,
      //   complaintType: complaint.complaintType,
      //   status: complaint.status,
      //   createdAt: new Date(complaint.createdAt).toLocaleDateString("en-US", {
      //     year: "numeric",
      //     month: "2-digit",
      //     day: "2-digit",
      //   }),
      //   updatedAt: new Date(complaint.updatedAt).toLocaleDateString("en-US", {
      //     year: "numeric",
      //     month: "2-digit",
      //     day: "2-digit",
      //   }),
      // }));

      const aggregatedData = [
        { status: "All", total: reportData?.total },
        ...reportData.status,
        // { status: "Pending", total: pendingComplaints },
        // { status: "Closed", total: closedComplaints },
        // { status: "Active", total: activeComplaints },
        // { status: "Escalated", total: escalatedComplaints },
      ];

      setPieData(aggregatedData);
    } catch (error) {
      console.log(error, "errortt");
      handleError("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!pieData || pieData.length === 0) {
      return handleError("No data available to download.");
    }
    const columns = Object.keys(pieData[0]).map((key) => ({
      header: key.toUpperCase(),
      dataKey: key,
    }));

    const doc = new jsPDF();

    //Create header
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("NHIA Complaints Report", 14, 15);

    // Create table
    autoTable(doc, {
      columns,
      body: pieData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] }, // green header
      startY: 20,
      margin: { horizontal: 10 },
    });

    doc.save("report.pdf");
  };

  const pieStatusColors = [
    { status: "pending", color: "#FFCC99" },
    { status: "active", color: "#72F172" },
    { status: "closed", color: "#4B95DD" },
    { status: "escalated", color: "#E75C5C" },
  ];
  const filteredPieStatus = useMemo(
    () =>
      pieData
        ?.filter((d) => d.status !== "All")
        ?.map((s) => {
          const colorObj = pieStatusColors.find((c) => c.status === s.status);
          return {
            ...s,
            color: colorObj ? colorObj.color : "#dddddd",
            title: s.status,
          };
        }),
    [pieData],
  );

  const pieStatusData = {
    labels: filteredPieStatus?.map((s) => s.status) || [],
    datasets: [
      {
        data: filteredPieStatus?.map((s) => s.total) || [],
        backgroundColor: filteredPieStatus?.map((s) => s.color),
        borderColor: filteredPieStatus?.map((s) => s.color),
        borderWidth: 1,
      },
    ],
  };

  if (isLoadingStates) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* <Helmet>
        <title>Provider Reports</title>
        <meta name="Provider Reports" content=" " />
        <link rel="canonical" href="/" />
      </Helmet> */}
      {/* Main Layout */}
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#FAFAFA",
          height: "100vh",
        }}
      >
        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {/* Sub Content */}
          <Box sx={{ display: "flex", flexDirection: "column", mt: 1, gap: 4 }}>
            {/* Title */}
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#101828",
              }}
              gutterBottom
            >
              Reports
            </Typography>

            {/* Filters Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              {/* Report Type */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "100%", sm: "318px" },
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#038F3E",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "19.36px",
                  }}
                >
                  Report Type
                </Typography>
                <FormControl
                  fullWidth
                  sx={{ maxWidth: { xs: "100%", sm: "318px" } }}
                >
                  <select
                    id="report-type"
                    value={filters.reportType}
                    name="reportType"
                    onChange={handleFilterChange}
                    style={{
                      width: "100%",
                      height: "51px",
                      borderRadius: "8px",
                      backgroundColor: "#F5F5F5",
                      padding: "0 16px",
                      border: "1px solid #DADADA",
                      color: "#475467",
                      fontSize: "16px",
                    }}
                  >
                    {/* <option value="">Select Report Type</option> */}
                    <option value="complaints">Complaints</option>
                  </select>
                  {/* <Select
                    labelId="report-type-label"
                    id="report-type"
                    value={filters.reportType}
                    name="reportType"
                    onChange={handleFilterChange}
                    // label="Report Type"
                    sx={styles}
                  >
                    <MenuItem value="">Comparison Value</MenuItem>
                    <MenuItem value="complaints">Complaints</MenuItem>
                  </Select> */}
                </FormControl>
              </Box>

              {/* Location */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "100%", sm: "243px" },
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#038F3E",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "19.36px",
                  }}
                >
                  Location
                </Typography>
                <FormControl
                  fullWidth
                  sx={{ maxWidth: { xs: "100%", sm: "243px" } }}
                >
                  <select
                    id="location"
                    value={filters.location}
                    name="location"
                    onChange={handleFilterChange}
                    style={{
                      width: "100%",
                      height: "51px",
                      borderRadius: "8px",
                      backgroundColor: "#F5F5F5",
                      padding: "0 16px",
                      border: "1px solid #DADADA",
                      color: "#475467",
                      fontSize: "16px",
                    }}
                  >
                    <option value="">Select Location</option>
                    {states?.results?.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {/* <Select
                    labelId="location-label"
                    id="location"
                    value={filters.location}
                    name="location"
                    onChange={handleFilterChange}
                    // label="Location"
                    sx={styles}
                  >
                    <MenuItem value="">Select Region</MenuItem>
                    <MenuItem value="Lagos">Lagos</MenuItem>
                    <MenuItem value="Kaduna">Kaduna</MenuItem>
                  </Select> */}
                </FormControl>
              </Box>

              {/* Duration */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "100%", sm: "265px" },
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#038F3E",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "19.36px",
                  }}
                >
                  Duration
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <TextField
                    type="date"
                    placeholder="From"
                    value={filters.startDate}
                    name="startDate"
                    onChange={handleFilterChange}
                    // label="From"
                    variant="outlined"
                    sx={{ ...textStyles, width: { xs: "100%", sm: "auto" } }}
                  />
                  <TextField
                    type="date"
                    placeholder="To"
                    value={filters.endDate}
                    name="endDate"
                    onChange={handleFilterChange}
                    // label="To"
                    variant="outlined"
                    slotProps={{
                      placeholder: "To", // This sets the placeholder text
                    }}
                    sx={{ ...textStyles, width: { xs: "100%", sm: "auto" } }}
                  />
                </Box>
              </Box>

              {/* Generate Button */}
              <Button
                variant="contained"
                sx={{
                  width: { xs: "100%", sm: "135px" },
                  height: "51px",
                  backgroundColor: "#038F3E",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "19.36px",
                  borderRadius: "8px",
                  py: "16px",
                  px: "32px",
                }}
                onClick={handleGenerateReport}
                loading={isLoading}
              >
                Generate
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  minHeight: "300px",
                  borderRadius: "8px",
                  backgroundColor: "#F5F5F5",
                  py: 4,
                }}
              >
                {pieData && pieData?.length > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <table
                      style={{
                        width: "100%",
                        // borderCollapse: "collapse",
                        borderSpacing: "0 19px",
                        textAlign: "center",
                        marginBottom: "30px",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            backgroundColor: "#000000",
                            borderRadius: "8px",
                            border: "none",
                          }}
                        >
                          {pieData?.map((d, index) => (
                            <th
                              key={index}
                              style={{
                                padding: "8px",
                                textAlign: "center",
                                paddingBlock: "16px",
                                ...(index === 0 && {
                                  borderTopLeftRadius: "8px",
                                  borderBottomLeftRadius: "8px",
                                }),
                                ...(index === pieData?.length - 1 && {
                                  borderTopRightRadius: "8px",
                                  borderBottomRightRadius: "8px",
                                }),
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  lineHeight: "16px",
                                  color: "#ffffff",
                                  px: 4,
                                  textTransform: "capitalize",
                                }}
                              >
                                {d.status}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: "#ffffff" }}>
                          {/* pieStatusData?.map((s, index) => ( */}
                          {pieData?.map((d, index) => (
                            <td
                              key={index}
                              style={{
                                padding: "8px",
                                paddingBlock: "12px",
                                ...(index === 0 && {
                                  borderTopLeftRadius: "8px",
                                  borderBottomLeftRadius: "8px",
                                }),
                                ...(index === pieData?.length - 1 && {
                                  borderTopRightRadius: "8px",
                                  borderBottomRightRadius: "8px",
                                }),
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  lineHeight: "16px",
                                  color: "#000000",
                                  px: 4,
                                }}
                              >
                                {d?.total}
                              </Typography>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                ) : null}
                {pieStatusData && pieStatusData.labels.length > 0 ? (
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                      p: 2,
                      py: 4,
                      alignItems: "center",
                      borderRadius: "12px",
                      backgroundColor: "#FFFFFF",
                      width: { xs: "100%", md: "500px" },
                      // height: "350px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        px: { xs: 2, sm: 10 },
                      }}
                    >
                      <PieChart
                        title="Pie Chart Example"
                        data={pieStatusData}
                        options={options}
                        height="209px"
                        width="209px"
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 1.2,
                        mt: 5,
                      }}
                    >
                      {filteredPieStatus?.map((t) => (
                        <Box
                          key={t.title}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Box
                            sx={{
                              width: "8px",
                              height: "8px",
                              backgroundColor: t.color,
                              borderRadius: "50%",
                              margin: "0 8px",
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 500,
                              lineHeight: "16px",
                              color: "#475467",
                              textTransform: "capitalize",
                            }}
                          >
                            {t.title}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Card>
                ) : null}
              </Box>

              {hasPermission("can_export_complaint_data") && (
                <Box
                  sx={{
                    py: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: { xs: "100%", sm: "249px" },
                      height: "51px",
                      borderRadius: "8px",
                      backgroundColor: "#038F3E",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "19.36px",
                      textTransform: "none",
                      color: "#FFFFFF",
                    }}
                    onClick={handleDownloadReport}
                    disabled={!pieData || pieData.length === 0}
                  >
                    Download as pdf
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const ProvidersReport = WithAuthorization(
  ProvidersReportPage,
  "can_access_advanced_reporting",
);

export default ProvidersReport;

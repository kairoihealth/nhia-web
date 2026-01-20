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
import {
  getAllHmo,
  getAllProviders,
  getStates,
} from "../../../services/settings";
import Logo from "../../../assets/nhia-logo.png";
import { useAuth } from "../../../components/auth/AuthContext";
import WithAuthorization from "../../../components/auth/withAuthorization";

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
    height: "100%",
    borderColor: "#DADADA",
    "&:hover": {
      outline: "1px solid #038F3E",
    },
    "&.Mui-focused": {
      outline: "1px solid #038F3E",
      boxShadow: "none",
    },
  },
};

const campaignAgainstOptions = [
  { value: "HMO", label: "Hmo" },
  { value: "Provider", label: "Provider" },
  { value: "Enrollee", label: "Enrollee" },
];

const CentralReportsPage = () => {
  const { hasPermission } = useAuth();
  const handleError = useHandleError();
  const [pieData, setPieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    reportType: "status",
    location: "",
    startDate: "",
    endDate: "",
    complaint_against: "",
    name: "",
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

  const hmosQueryKey = useMemo(() => ["hmos"], []);
  const { data: hmosData } = useQuery({
    queryKey: hmosQueryKey,
    queryFn: () => getAllHmo({ page: 1, pageSize: 100 }),
  });

  const hmos = useMemo(
    () =>
      hmosData?.results?.map((hmo) => ({
        value: hmo.id,
        label: hmo.name,
      })) || [],
    [hmosData],
  );

  const providersQueryKey = useMemo(() => ["providers"], []);
  const { data: providersData } = useQuery({
    queryKey: providersQueryKey,
    queryFn: () => getAllProviders({ page: 1, pageSize: 100 }),
  });

  const providers = useMemo(
    () =>
      providersData?.results?.map((provider) => ({
        value: provider.id,
        label: provider.name,
      })) || [],
    [providersData],
  );

  const handleGenerateReport = async () => {
    const {
      reportType,
      location,
      startDate,
      endDate,
      complaint_against,
      name,
    } = filters;
    const respondent =
      complaint_against === "HMO"
        ? "hmo_id"
        : complaint_against === "Provider"
          ? "provider_id"
          : complaint_against === "Enrollee"
            ? "enrollee"
            : null;

    try {
      setIsLoading(true);
      const reportData = await getComplaintStats({
        reportType,
        state_id: location,
        start_date: startDate,
        end_date: endDate,
        // complaint_against,
        [respondent]: name || "",
      });

      const aggregatedData = [
        { status: "All", total: reportData?.total },
        ...(reportData[filters.reportType]?.map((item) => ({
          status:
            item.status ||
            item.complaint_type ||
            item.complaint_against ||
            item.state__region__name ||
            "Unknown",
          total: item.total,
        })) || []),
      ];

      console.log(aggregatedData, "aggregatedData");
      setPieData(aggregatedData);
    } catch (error) {
      console.log(error, "errortt");
      handleError("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //convert hex color to [41, 128, 185] format
  const convertHexColorToRGB = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return [r, g, b];
  };

  const handleDownloadReport = () => {
    if (!pieData || pieData.length === 0) {
      return handleError("No data available to download.");
    }
    // const columns = Object.keys(pieData[0]).map((key) => ({
    //   header: key.toUpperCase(),
    //   dataKey: key,
    // }));

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 15;

    // Calculate totals
    const totalComplaints =
      pieData.find((d) => d.status === "All")?.total ||
      pieData.reduce((sum, d) => (d.status !== "All" ? sum + d.total : sum), 0);

    const dataWithoutAll = pieData.filter((d) => d.status !== "All");

    // Add Logo
    doc.addImage(Logo, "PNG", pageWidth / 2 - 15, yPosition, 30, 30);
    yPosition += 35; // Move down after logo

    // Add Header Text
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("NATIONAL HEALTH INSURANCE AUTHORITY", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 10; // Move down after text

    // Helper function to check and add new page if needed
    const checkPageBreak = (requiredSpace) => {
      if (yPosition + requiredSpace > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
        return true;
      }
      return false;
    };

    // Helper function to draw pie chart
    const drawPieChart = (x, y, radius, data) => {
      let currentAngle = -Math.PI / 2; // Start from top

      // Filter out the "All" category for drawing the pie chart
      const chartData = data.filter((item) => item.status !== "All");
      const total = chartData.reduce((sum, item) => sum + item.total, 0);

      if (total === 0) return; // Don't draw if there's no data
      chartData.forEach((item, index) => {
        const percentage = item.total / total;
        const sliceAngle = percentage * 2 * Math.PI;

        const color = pieColors[index % pieColors.length];
        doc.setFillColor(...convertHexColorToRGB(color));

        // Draw arc for this slice by drawing many small triangles
        const segments = 100; // Increase for smoother circle
        for (let i = 0; i <= segments; i++) {
          const angle = currentAngle + (sliceAngle * i) / segments;
          const prevAngle = currentAngle + (sliceAngle * (i - 1)) / segments;
          const x0 = x + radius * Math.cos(prevAngle);
          const y0 = y + radius * Math.sin(prevAngle);
          const x1 = x + radius * Math.cos(angle);
          const y1 = y + radius * Math.sin(angle);

          if (i > 0) {
            doc.triangle(x, y, x0, y0, x1, y1, "F");
          }
        }
        currentAngle += sliceAngle;
      });

      // Draw legend
      let legendY = y - radius + 10;
      chartData.forEach((item, index) => {
        const percentage = ((item.total / total) * 100).toFixed(1);

        // Color box
        doc.setFillColor(
          ...convertHexColorToRGB(pieColors[index % pieColors.length]),
        );
        doc.rect(x + radius + 15, legendY - 3, 5, 5, "F");

        // Label
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.text(
          `${item.status}: ${item.total} (${percentage}%)`,
          x + radius + 23,
          legendY + 2,
        );

        legendY += 8;
      });
    };

    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Complaints Data Analysis Report", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 8;

    // Date
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const reportDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Generated on: ${reportDate}`, pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 10;

    // Add Filters Info if they exist
    const activeFilters = [];

    if (filters.complaint_against && filters.name) {
      if (filters.complaint_against === "HMO") {
        const hmoName = hmos.find((h) => h.value === filters.name)?.label;
        if (hmoName) {
          activeFilters.push(`HMO: ${hmoName}`);
        }
      } else if (filters.complaint_against === "Provider") {
        const providerName = providers.find(
          (p) => p.value === filters.name,
        )?.label;
        if (providerName) {
          activeFilters.push(`Provider: ${providerName}`);
        }
      } else if (filters.complaint_against === "Enrollee") {
        activeFilters.push(`Enrollee: ${filters.name}`);
      }
    }

    if (filters.location) {
      const locationName = states?.results?.find(
        (s) => s.id === filters.location,
      )?.name;
      if (locationName) {
        activeFilters.push(`State: ${locationName}`);
      }
    }
    if (filters.startDate) {
      activeFilters.push(
        `From: ${new Date(filters.startDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
      );
    }
    if (filters.endDate) {
      activeFilters.push(
        `To: ${new Date(filters.endDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
      );
    }

    if (activeFilters.length > 0) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.text(`${activeFilters.join("   |   ")}`, pageWidth / 2, yPosition, {
        align: "center",
      });
      yPosition += 8;
    }

    // Executive Summary Section
    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPosition, pageWidth - 30, 25, "F");

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(3, 143, 62);
    doc.text("Executive Summary", 20, yPosition + 7);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Complaints: ${totalComplaints}`, 20, yPosition + 14);
    doc.text(`Categories: ${dataWithoutAll.length}`, 20, yPosition + 20);

    yPosition += 35;

    // 1. Overview Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(3, 143, 62);
    doc.text("1. Complaints Overview", 20, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    const overviewText = `This report presents a comprehensive analysis of ${totalComplaints} complaints recorded in the system. The data has been categorized into ${dataWithoutAll.length} distinct categories to facilitate better understanding and actionable insights.`;

    const splitOverview = doc.splitTextToSize(overviewText, pageWidth - 40);
    doc.text(splitOverview, 20, yPosition);
    yPosition += splitOverview.length * 6 + 12;

    checkPageBreak(100);

    // 2. Data Distribution Table
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(3, 143, 62);
    doc.text("2. Complaints Distribution by Category", 20, yPosition);
    yPosition += 10;

    // Prepare table data with percentages
    const tableData = dataWithoutAll.map((d) => {
      const percentage = ((d.total / totalComplaints) * 100).toFixed(1);
      return [d.status, d.total.toString(), `${percentage}%`];
    });

    autoTable(doc, {
      startY: yPosition,
      head: [["Category", "Total Complaints", "Percentage"]],
      body: tableData,
      foot: [["Total", totalComplaints.toString(), "100%"]],
      theme: "grid",
      headStyles: {
        fillColor: [3, 143, 62],
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
        fontSize: 11,
      },
      footStyles: {
        fillColor: [220, 220, 220],
        textColor: 0,
        fontStyle: "bold",
        fontSize: 11,
      },
      styles: {
        fontSize: 10,
        cellPadding: 6,
      },
      columnStyles: {
        0: { cellWidth: 80, halign: "left" },
        1: { cellWidth: 50, halign: "center" },
        2: { cellWidth: 40, halign: "center" },
      },
      margin: { left: 20, right: 20 },
    });

    yPosition = doc.lastAutoTable.finalY + 20;

    checkPageBreak(120);

    // 3. Visual Analysis - Pie Chart
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(3, 143, 62);
    doc.text("3. Visual Data Analysis", 20, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("Distribution of Complaints by Category", 20, yPosition);
    yPosition += 15;

    // Draw pie chart
    const chartCenterX = pageWidth / 2 - 20;
    const chartCenterY = yPosition + 40;
    const chartRadius = 35;

    drawPieChart(chartCenterX, chartCenterY, chartRadius, dataWithoutAll);

    yPosition = chartCenterY + chartRadius + 20;

    checkPageBreak(80);

    // 4. Detailed Analysis
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(3, 143, 62);
    doc.text("4. Detailed Category Analysis", 20, yPosition);
    yPosition += 10;

    dataWithoutAll.forEach((item, index) => {
      checkPageBreak(35);

      const percentage = ((item.total / totalComplaints) * 100).toFixed(1);
      const isHighest =
        item.total === Math.max(...dataWithoutAll.map((d) => d.total));
      const isLowest =
        item.total === Math.min(...dataWithoutAll.map((d) => d.total));

      // Category box
      doc.setFillColor(245, 245, 245);
      doc.rect(20, yPosition - 5, pageWidth - 40, 22, "F");

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${index + 1}. ${item.status}`, 25, yPosition + 2);

      doc.setFont("helvetica", "normal");
      doc.text(
        `Count: ${item.total}  |  ${percentage}% of total`,
        25,
        yPosition + 9,
      );

      // Add insight badge
      if (isHighest) {
        doc.setFillColor(231, 76, 60);
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.rect(pageWidth - 60, yPosition - 3, 35, 8, "F");
        doc.text("HIGHEST", pageWidth - 57, yPosition + 2);
      } else if (isLowest) {
        doc.setFillColor(46, 204, 113);
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.rect(pageWidth - 60, yPosition - 3, 35, 8, "F");
        doc.text("LOWEST", pageWidth - 57, yPosition + 2);
      }

      yPosition += 26;
    });

    if (filters.reportType !== "status") {
      yPosition += 5;
      checkPageBreak(70);
      // 5. Key Insights
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(3, 143, 62);
      doc.text("5. Key Insights & Recommendations", 20, yPosition);
      yPosition += 10;

      // Find highest and lowest
      const highest = dataWithoutAll.reduce(
        (max, d) => (d.total > max.total ? d : max),
        dataWithoutAll[0],
      );
      const lowest = dataWithoutAll.reduce(
        (min, d) => (d.total < min.total ? d : min),
        dataWithoutAll[0],
      );
      const highestPercentage = (
        (highest.total / totalComplaints) *
        100
      ).toFixed(1);
      const lowestPercentage = ((lowest.total / totalComplaints) * 100).toFixed(
        1,
      );

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      // Insight 1
      doc.setFont("helvetica", "bold");
      doc.text("• Highest Category:", 25, yPosition);
      doc.setFont("helvetica", "normal");
      const insight1 = `${highest.status} accounts for ${highestPercentage}% of all complaints with ${highest.total} case(s). This category requires immediate attention and resource allocation.`;
      const splitInsight1 = doc.splitTextToSize(insight1, pageWidth - 50);
      doc.text(splitInsight1, 27, yPosition + 6);
      yPosition += splitInsight1.length * 5 + 12;

      // Insight 2
      doc.setFont("helvetica", "bold");
      doc.text("• Lowest Category:", 25, yPosition);
      doc.setFont("helvetica", "normal");
      const insight2 = `${lowest.status} represents ${lowestPercentage}% of complaints with ${lowest.total} case(s). This indicates effective management in this area.`;
      const splitInsight2 = doc.splitTextToSize(insight2, pageWidth - 50);
      doc.text(splitInsight2, 27, yPosition + 6);
      yPosition += splitInsight2.length * 5 + 12;

      // Insight 3
      doc.setFont("helvetica", "bold");
      doc.text("• Distribution Pattern:", 25, yPosition);
      doc.setFont("helvetica", "normal");
      const avgPerCategory = (totalComplaints / dataWithoutAll.length).toFixed(
        1,
      );
      const insight3 = `Average complaints per category: ${avgPerCategory}. Categories significantly above this threshold require strategic intervention.`;
      const splitInsight3 = doc.splitTextToSize(insight3, pageWidth - 50);
      doc.text(splitInsight3, 27, yPosition + 6);
      yPosition += splitInsight3.length * 5 + 15;

      checkPageBreak(50);

      // 6. Recommendations
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(3, 143, 62);
      doc.text("6. Actionable Recommendations", 20, yPosition);
      yPosition += 10;

      doc.setFillColor(255, 248, 220);
      doc.rect(20, yPosition - 3, pageWidth - 40, 45, "F");

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      const recommendations = [
        `Focus resources on ${highest.status} to reduce the high volume of complaints`,
        `Analyze successful strategies used in ${lowest.status} management`,
        `Implement continuous monitoring and early warning systems`,
        `Conduct stakeholder training to address recurring issues`,
        `Establish feedback loops for complaint resolution tracking`,
      ];

      recommendations.forEach((rec, index) => {
        doc.text(`${index + 1}. ${rec}`, 25, yPosition + index * 8);
      });

      yPosition += 50;
    }
    // Footer
    doc.setFillColor(3, 143, 62);
    doc.rect(0, pageHeight - 20, pageWidth, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text(
      "National Health Insurance Authority - Enforcement Department",
      pageWidth / 2,
      pageHeight - 12,
      { align: "center" },
    );
    doc.text(
      "297 Shehu Yar'adua Way, Utako District, Abuja, Nigeria",
      pageWidth / 2,
      pageHeight - 6,
      { align: "center" },
    );

    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(9);
    doc.setTextColor(100);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 25, pageHeight - 25);
    }

    // Save the PDF
    const timestamp = new Date().toISOString().split("T")[0];
    doc.save(`NHIA_Complaints_Analysis_${timestamp}.pdf`);
  };

  // const pieColors = ["#FFCC99", "#72F172", "#4B95DD", "#E75C5C"];
  const pieColors = [
    "#72F172",
    "#4B95DD",
    "#E75C5C",
    "#FFCC99",
    "#F172A8",
    "#B84BF1",
    "#F1E54B",
  ];
  const filteredPieStatus = useMemo(
    () =>
      pieData
        ?.filter((d) => d.status !== "All")
        ?.map((s, i) => {
          // const colorObj = pieStatusColors.find((c) => c.status === s.status);
          return {
            ...s,
            // color: colorObj ? colorObj.color : "#dddddd",
            color: pieColors[i % pieColors.length],
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
                  width: "200px",
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
                <FormControl fullWidth sx={{ maxWidth: "200px" }}>
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
                    <option value="status">Complaints</option>
                    <option value="complaint_type">Complaint Type</option>
                    <option value="complaint_against">Complaint Against</option>
                    <option value="regions">Regions</option>
                  </select>
                </FormControl>
              </Box>

              {/* <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap={2}
                mt={2}
              > */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "200px",
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
                  Complaint against
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <select
                  id="complaint_against"
                  value={filters.complaint_against}
                  name="complaint_against"
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
                  <option value="status">All</option>
                  {campaignAgainstOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Box>
              {/* </Box> */}

              {filters.complaint_against === "HMO" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "200px",
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
                    HMO Name
                    <span style={{ color: "#099243", marginLeft: "6px" }}>
                      *
                    </span>
                  </Typography>
                  <Box>
                    <select
                      id="name"
                      value={filters.name}
                      name="name"
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
                      <option value="status">All</option>
                      {hmos.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Box>
                </Box>
              ) : filters.complaint_against === "Provider" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "200px",
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
                    Providers Name
                    <span style={{ color: "#099243", marginLeft: "6px" }}>
                      *
                    </span>
                  </Typography>
                  <Box>
                    <select
                      id="name"
                      value={filters.name}
                      name="name"
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
                      <option value="status">All</option>
                      {providers.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Box>
                </Box>
              ) : filters.complaint_against === "Enrollee" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "200px",
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
                    Enrollee Name or NHIA Number
                    <span style={{ color: "#099243", marginLeft: "6px" }}>
                      *
                    </span>
                  </Typography>
                  <Box>
                    <TextField
                      name="name"
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="enter Enrollee name or NHIA number"
                      value={filters.name}
                      onChange={handleFilterChange}
                    />
                  </Box>
                </Box>
              ) : null}

              {/* Location */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "243px",
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
                <FormControl fullWidth sx={{ maxWidth: "243px" }}>
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
                  width: "265px",
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
                    alignItems: "center",
                    height: "51px",
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
                    sx={textStyles}
                    style={{ height: "100%" }}
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
                    sx={textStyles}
                    style={{ height: "100%" }}
                  />
                </Box>
              </Box>

              {/* Generate Button */}
              <Button
                variant="contained"
                sx={{
                  width: "135px",
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
                  width: "1044px",
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
                      width: "700px",
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
                      width: "500px",
                      // height: "350px",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", px: 10 }}>
                      <PieChart
                        title="Pie Chart Example"
                        data={pieStatusData}
                        options={options}
                        height="209px"
                        width="209px"
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 1.2, mt: 5 }}>
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
                      width: "249px",
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

const CentralReports = WithAuthorization(
  CentralReportsPage,
  "can_access_advanced_reporting",
);

export default CentralReports;

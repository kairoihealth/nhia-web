import { daysOfTheWeek } from "../utils/daysOfTheWeeks";

export const pieData = {
  labels: ["Open", "Resolved", "Pending", "Escalated"],
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: ["#72F172", "#4B95DD", "#FFCC99", "#E75C5C"],
      borderColor: ["#72F172", "#4B95DD", "#FFCC99", "#E75C5C"],
      borderWidth: 1
    }
  ]
};

export const barData = {
  labels: ["NE", "NW", "NC", "SW", "SE", "SS"],
  datasets: [
    {
      label: "Volume",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: ["#20201E"],
      borderColor: ["#20201E"],
      borderWidth: 1,
      barThickness: 15,
      borderRadius: 4
    }
  ]
};

const labels = daysOfTheWeek.days({ count: 7 });

export const lineData = {
  labels: labels,
  datasets: [
    {
      label: "Trend",
      data: [65, 59, 100, 81, 56, 55, 40],
      fill: false,
      borderColor: "#18A0FB",
      tension: 0.1
    }
  ]
};

export const pieCatogryData = {
  labels: ["Financial", "Operational", "Services"],
  datasets: [
    {
      data: [40, 30, 30],
      backgroundColor: ["#66B3FF", "#F9AA33", "#CE88E5"],
      borderColor: ["#66B3FF", "#F9AA33", "#CE88E5"],
      borderWidth: 1
    }
  ]
};

export const pieCentralData = {
  labels: ["Open", "Resolved", "Pending"],
  datasets: [
    {
      data: [12, 19, 3],
      backgroundColor: ["#72F172", "#4B95DD", "#FFCC99"],
      borderColor: ["#72F172", "#4B95DD", "#FFCC99"],
      borderWidth: 1
    }
  ]
};

export const pieColor = [
  {
    id: 1,
    color: "#FFCC99",
    title: "Pending"
  },
  {
    id: 2,
    color: "#72F172",
    title: "Open"
  },
  {
    id: 3,
    color: "#4B95DD",
    title: "Resolved"
  },
  {
    id: 4,
    color: "#E75C5C",
    title: "Escalated"
  }
];

export const categoryColor = [
  {
    id: 1,
    color: "#66B3FF",
    title: "Financial"
  },
  {
    id: 2,
    color: "#F9AA33",
    title: "Operational"
  },
  {
    id: 3,
    color: "#CE88E5",
    title: "Services"
  }
];

export const pieCentralColor = [
  {
    id: 1,
    color: "#FFCC99",
    title: "Pending"
  },
  {
    id: 2,
    color: "#72F172",
    title: "Open"
  },
  {
    id: 3,
    color: "#4B95DD",
    title: "Resolved"
  }
];

export const complaintData = {
  labels: ["Enrollee", "Providers"],
  datasets: [
    {
      data: [12, 19],
      backgroundColor: ["#72F172", "#4B95DD"],
      borderColor: ["#72F172", "#4B95DD"],
      borderWidth: 1
    }
  ]
};

export const complaintColor = [
  {
    id: 1,
    color: "#72F172",
    title: "Enrollee"
  },
  {
    id: 2,
    color: "#4B95DD",
    title: "Provider"
  }
];

export const complaintDatabyRegion = {
  labels: [
    "North West",
    "North Central",
    "North East",
    "South West",
    "South South",
    "South East"
  ],
  datasets: [
    {
      data: [12, 19, 10, 6, 18, 4],
      backgroundColor: [
        "#737CB7",
        "#FA7A5D",
        "#95CC7B",
        "#2AC5F3",
        "#2CADB2",
        "#FCE500"
      ],
      borderColor: [
        "#737CB7",
        "#FA7A5D",
        "#95CC7B",
        "#2AC5F3",
        "#2CADB2",
        "#FCE500"
      ],
      borderWidth: 1
    }
  ]
};

export const dataByRegionColor = [
  {
    id: 1,
    color: "#737CB7",
    title: "North West"
  },
  {
    id: 2,
    color: "#FA7A5D",
    title: "North Central"
  },
  {
    id: 3,
    color: "#95CC7B",
    title: "North East"
  },
  {
    id: 4,
    color: "#2AC5F3",
    title: "South West"
  },
  {
    id: 5,
    color: "#2CADB2",
    title: "South South"
  },
  {
    id: 6,
    color: "#FCE500",
    title: "South East"
  }
];

export const centralBarData = {
  labels: [
    "Abuja",
    "Benue",
    "Kogi",
    "Kwara",
    "Nasarawa",
    "Niger",
    "Plataeu",
    "Lagos"
  ],
  datasets: [
    {
      label: "Volume",
      data: [65, 59, 80, 81, 56, 55, 40, 30],
      backgroundColor: ["#20201E"],
      borderColor: ["#20201E"],
      borderWidth: 1,
      barThickness: 15,
      borderRadius: 4
    }
  ]
};

export const regComplaintData = {
  labels: ["Billing", "Care", "Services", "Com", "Cov", "Others"],
  datasets: [
    {
      label: "Volume",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: ["#20201E"],
      borderColor: ["#20201E"],
      borderWidth: 1,
      barThickness: 15,
      borderRadius: 4
    }
  ]
};

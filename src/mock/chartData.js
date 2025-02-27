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
      data: [65, 59, 80, 81, 56, 55, 40],
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

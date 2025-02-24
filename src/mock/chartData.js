import { daysOfTheWeek } from "../utils/daysOfTheWeeks";

export const pieData = {
    labels: ['Open', 'Resolved', 'Pending', 'Escalated'],
    datasets: [
      {
        // label: ['Open', 'Resolved', 'Pending', 'Escalated'],
        data: [12, 19, 3, 5],
        backgroundColor: [
          "#72F172",
          "#4B95DD",
          "#FFCC99",
          "#E75C5C"
        ],
        borderColor: [
          "#72F172",
          "#4B95DD",
          "#FFCC99",
          "#E75C5C"
        ],
        borderWidth: 1
      }
    ]
};

export const barData = {
    labels: ['NE', 'NW', 'NC', 'SW', 'SE', 'SS'],
    datasets: [{
      label: 'Volume',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        '#20201E',
      ],
      borderColor: [
        '#20201E',
      
      ],
      borderWidth: 1,
      barThickness: 15,
      borderRadius: 4
    }]
};
  
const labels = daysOfTheWeek.days({ count: 7 });

export const lineData = {
  labels: labels,
  datasets: [{
    label: 'Trend',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: '#18A0FB',
    tension: 0.1
  }]
};
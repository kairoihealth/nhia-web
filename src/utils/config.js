export const options = {
    plugins: {
      legend: {
        display: false,
        position: "top"
      }
    }
  };

 export const barOptions = {
    responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  }
  };

export const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: false, 
      },
      y: {
        beginAtZero: true, 
      },
    },
  };
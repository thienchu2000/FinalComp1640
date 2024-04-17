const data = {
  labels: [
    "Faculty of graphic design",
    "Faculty business management",
    "Faculty of Information Technology",
  ],
  datasets: [
    {
      label: "total number of submissions",
      data: [10, 30, 50, 70, 100],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

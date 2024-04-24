const data = {
  labels: [
    "Faculty of Graphic Design",
    "Faculty of Business Management",
    "Faculty of Information Technology",
    "Faculty of Cinematic Arts",
    "Faculty of Education",
    "Faculty of Engineering",
  ],
  datasets: [
    {
      label: "Total Number of Submissions",
      data: [10, 30, 50, 70, 100, 90],
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

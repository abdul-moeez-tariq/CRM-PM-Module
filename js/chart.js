// js/chart.js

export function initCharts() {

  // =========================
  // User Growth Line Chart
  // =========================

  const userCanvas = document.getElementById("userChart");

  if (userCanvas) {

    const ctx = userCanvas.getContext("2d");

    // gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(168, 85, 247, 0.35)");
    gradient.addColorStop(1, "rgba(168, 85, 247, 0.05)");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
          data: [1600,1700,1650,1800,2000,1900,2300,2500,2200,2100,2200,2100],
          fill: true,
          backgroundColor: gradient,
          borderWidth: 0,
          tension: 0.45,
          pointRadius: 0
        }]
      },

      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {

          y: {
            min: 1000,
            max: 2500,
            ticks: {
              stepSize: 500,
              color: "#A1A1AA",
              font: { size: 12 }
            },
            grid: {
              color: "#F3F4F6"
            }
          },

          x: {
            grid: { display: false },
            ticks: {
              color: "#A1A1AA"
            }
          }

        }
      }
    });

  }


  // =========================
  // Bar Chart
  // =========================

  const planCanvas = document.getElementById("planChart");

  if (planCanvas) {

    new Chart(planCanvas, {

      type: "bar",

      data: {
        labels: ["Basic", "Standard", "Premium", "Enterprise"],
        datasets: [{
          data: [45, 90, 80, 35],
          backgroundColor: ["#F59E0B", "#3B82F6", "#A855F7", "#10B981"]
        }]
      },

      options: {
        responsive: true,

        plugins: {
          legend: { display: false }
        },

        scales: {

          x: {
            grid: {
              display: false
            }
          },

          y: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 25
            }
          }

        }

      }

    });

  }

}
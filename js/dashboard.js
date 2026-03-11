import { loadHTML } from './utils.js';
import { initCharts } from './chart.js';
import { toggleLogs } from './view-logs.js';
window.toggleLogs = toggleLogs;
export async function initDashboard() {


  // load charts HTML
  await loadHTML('#dashboard-charts', '../components/dashboard-chart.html');

  // initialize charts AFTER html load
  initCharts();

}

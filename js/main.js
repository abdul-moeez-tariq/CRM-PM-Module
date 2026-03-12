import { loadHTML } from "./utils.js";
import { initHeader } from "./header.js";
import { initSidebar } from "./sidebar.js";
import { initNotification } from "./notification.js";
import { initDashboard } from "./dashboard.js";
import { initUsersTable, initDelete } from "./dataTable.js";
import { initSidebarToggle } from "./sidebar.js";
import { initDropdowns } from "./addNewProject.js";
import { initMultiDropdown } from "./addNewProject.js";
import { initFileUpload } from "./addNewProject.js";
import { initProjectFormValidation } from "./addNewProject.js";

import { initTaskDropdowns } from "./addNewTask.js";
import { initTaskMultiDropdown } from "./addNewTask.js";
import { initTaskFileUpload } from "./addNewTask.js";
import { initTaskFormValidation } from "./addNewTask.js";

import { initTimelineDropdowns } from "./timeline.js";
import { initCalendarTabs } from "./timeline.js";
import { initDeleteTimelineModal } from "./timeline.js";

import { initNewTimelineDropdowns } from "./addNewTimeline.js";
import { initTimelineMultiDropdown } from "./addNewTimeline.js";
import { initTimelineFileUpload } from "./addNewTimeline.js";
import { initTimelineFormValidation } from "./addNewTimeline.js";

const content = document.getElementById("layout-content");

// 🔹 Load Layout Once
async function loadLayout() {
  await loadHTML("#layout-header", "/components/header.html");
  initHeader();

  await loadHTML("#layout-sidebar", "/components/sidebar.html");

  initSidebarToggle();
  initSidebar();
}

// 🔹 Run Page JS
function runPageJS(page) {
  if (page === "dashboard") initDashboard();
  if (page === "notification") initNotification();
  if (page === "projects") {
    initUsersTable();
    initDelete();
  }

  if (page === "addnewproject") {
    initDropdowns();
    initMultiDropdown();
    initFileUpload();
    initProjectFormValidation();
  }

  if (page === "addNewTask") {
    initTaskDropdowns();
    initTaskMultiDropdown();
    initTaskFileUpload();
    initTaskFormValidation();
  }

  if (page === "timeline") {
    initTimelineDropdowns();
    initCalendarTabs();
    initDeleteTimelineModal();
  }

  if (page === "addNewTimeline") {
    initNewTimelineDropdowns();
    initTimelineMultiDropdown();
    initTimelineFileUpload();
    initTimelineFormValidation();
  }
}

// 🔹 Router Function
async function loadPageFromHash() {
  let hash = location.hash;

  // Default page
  if (!hash) {
    hash = "#/dashboard";
    location.hash = hash;
  }

  const page = hash.replace("#/", "");

  try {
    const res = await fetch(`/pages/${page}.html`);
    const html = await res.text();
    content.innerHTML = html;

    runPageJS(page);
  } catch (error) {
    content.innerHTML = `<h2 class="p-4 text-red-500">Page Not Found</h2>`;
  }
}

// 🔹 Handle Link Click
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#/")) return;

  e.preventDefault();
  location.hash = href;
});

// 🔹 Listen Hash Change
window.addEventListener("hashchange", loadPageFromHash);

// 🔹 Init App
await loadLayout();
loadPageFromHash();

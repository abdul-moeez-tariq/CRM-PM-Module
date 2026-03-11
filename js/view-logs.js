// js/logs.js

let expanded = false;

export function toggleLogs() {

  const wrapper = document.getElementById("logsWrapper");
  const btn = document.getElementById("toggleBtn");

  if (!wrapper || !btn) return;

  expanded = !expanded;

  if (expanded) {

    wrapper.classList.remove("overflow-y-hidden");
    wrapper.classList.add("overflow-y-auto");

    btn.innerText = "Hide Logs";

  } else {

    wrapper.classList.remove("overflow-y-auto");
    wrapper.classList.add("overflow-y-hidden");

    btn.innerText = "View Full Logs";

    wrapper.scrollTop = 0;

  }

}
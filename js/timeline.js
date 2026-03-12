// timeline.js;
export function initTimelineDropdowns() {
  const dropdowns = document.querySelectorAll(".timelineDropdown");

  dropdowns.forEach((dropdown) => {
    const input = dropdown.querySelector(".timelineDropdown-input");
    const list = dropdown.querySelector(".timelineDropdown-list");
    const arrow = dropdown.querySelector(".timelineDropdown-arrow");
    const items = dropdown.querySelectorAll(".timelineDropdown-item");

    input.addEventListener("click", () => {
      // close other dropdowns
      document.querySelectorAll(".timelineDropdown-list").forEach((other) => {
        if (other !== list) {
          other.style.maxHeight = "0px";
          other.style.opacity = "0";
        }
      });

      if (list.style.maxHeight && list.style.maxHeight !== "0px") {
        list.style.maxHeight = "0px";
        list.style.opacity = "0";
        arrow.style.transform = "rotate(0deg)";
      } else {
        list.style.maxHeight = list.scrollHeight + "px"; // smooth height
        list.style.opacity = "1";
        arrow.style.transform = "rotate(180deg)";
      }
    });

    items.forEach((item) => {
      item.addEventListener("click", () => {
        input.value = item.textContent.trim(); // trim removes extra spaces
        input.classList.add("text-left"); // force left alignment if not applied
        input.style.textAlign = "left"; // inline style to avoid CSS overrides

        list.style.maxHeight = "0px";
        list.style.opacity = "0";
        arrow.style.transform = "rotate(0deg)";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", initTimelineDropdowns);

export function initCalendarTabs() {
  const dayTabs = document.querySelectorAll(".dayTab");

  dayTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      dayTabs.forEach((t) => {
        t.classList.remove("bg-blue-600", "text-white");
        t.classList.add("bg-gray-200", "text-gray-600");
      });

      tab.classList.remove("bg-gray-200", "text-gray-600");
      tab.classList.add("bg-blue-600", "text-white");
    });
  });

  const viewTabs = document.querySelectorAll(".viewTab");

  viewTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      viewTabs.forEach((t) => {
        t.classList.remove("bg-blue-600", "text-white");
        t.classList.add("text-gray-600");
      });

      tab.classList.add("bg-blue-600", "text-white");
    });
  });
}

export function initDeleteTimelineModal() {
  const modal = document.getElementById("deleteTimelineModal");
  const openBtn = document.getElementById("openDeleteTimeline");
  const cancelBtn = document.getElementById("cancelTimelineBtn");
  const deleteBtn = document.getElementById("deleteTimelineBtn");

  if (!modal) return;

  // open modal
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  }

  // cancel
  cancelBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // delete logic
  deleteBtn?.addEventListener("click", () => {
    console.log("Timeline deleted");

    // yahan API call ya data remove logic
    // example:
    // await fetch(`/api/timeline/${id}`, { method: "DELETE" });

    modal.classList.add("hidden");
  });
}

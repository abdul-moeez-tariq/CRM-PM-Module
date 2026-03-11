// ====================
// NOTIFICATION SYSTEM
// ====================

export function initNotification() {
  // DOM elements
  const notificationList = document.getElementById("notificationList");
  const searchInput = document.getElementById("searchInput");
  const filterInput = document.getElementById("filterInput");
  const markAllBtn = document.getElementById("markAllBtn");
  const clearAllBtn = document.getElementById("clearAllBtn");

  // Sample data (you will replace this with real data later)
  let notifications = [
    {
      id: 0,
      title: "Welcome!",
      message: "Hi, I'm Anam Gulzar",
      date: "2026-02-03",
      read: false,
    },
    {
      id: 1,
      title: "Profile Updated",
      message: "Your profile has been updated",
      date: "2026-02-02",
      read: false,
    },
    {
      id: 2,
      title: "Weekly Report",
      message: "Weekly report ready",
      date: "2026-01-30",
      read: false,
    },
    {
      id: 3,
      title: "Project Update",
      message: "Project is on track",
      date: "2026-01-25",
      read: false,
    },
  ];

  // Load read status from localStorage
  const storedReadState = JSON.parse(
    localStorage.getItem("readNotifications") || "{}",
  );
  notifications = notifications.map((n) => ({
    ...n,
    read: !!storedReadState[n.id],
  }));

  // Save only read state to localStorage
  function saveReadState() {
    const readState = {};
    notifications.forEach((n) => {
      if (n.read) readState[n.id] = true;
    });
    localStorage.setItem("readNotifications", JSON.stringify(readState));
  }

  // Render all notifications (or filtered list)
  function renderNotifications(list = notifications) {
    notificationList.innerHTML = "";

    if (!list.length) {
      notificationList.innerHTML = `
    <div class="flex flex-col items-center justify-center py-10">
      
      <img src="../assets/images/noNotification.png" 
           alt="No notifications" 
           class="w-48 h-48 mb-4 opacity-80">
      <div class="text-gray-400 text-center">
           
        <h2 class="text-2xl">Woo!</h2>
        <p class="text-lg">
          No Notifications
        </p>
        <p class="text-sm">
          Currently you have no notifications keep attached with Us
        </p>
      </div>
    </div>
  `;
      return;
    }
    // Sort: newest first
    list.sort((a, b) => new Date(b.date) - new Date(a.date));

    list.forEach((n) => {
      const div = document.createElement("div");
      div.className = `p-4 flex items-start gap-3 rounded-lg transition-all ${
        n.read
          ? "bg-white border border-gray-200"
          : "bg-blue-50 border border-blue-200"
      } hover:shadow-sm`;

      div.innerHTML = `
        <div class="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100 flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.73 1.38 5.2 3.6 6.9V22l3.2-1.7c1 .28 2.07.43 3.2.43 5.52 0 10-4.14 10-9.25S17.52 2 12 2z" fill="#2563EB"/>
          </svg>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-gray-800">${n.title}</p>
            <span class="w-2 h-2 rounded-full ${n.read ? "bg-gray-300" : "bg-blue-500"}"></span>
          </div>
          <p class="text-sm text-gray-600 mt-1">${n.message}</p>
          <p class="text-xs text-gray-400 mt-2">${n.date}</p>
        </div>
        <button class="mark-read-btn text-xs text-blue-600 hover:text-blue-800 font-medium">
          ${n.read ? "Read" : "Mark read"}
        </button>
      `;

      div.querySelector(".mark-read-btn").addEventListener("click", () => {
        if (!n.read) markAsRead(n.id);
      });

      notificationList.appendChild(div);
    });
  }

  // Mark single notification as read
  function markAsRead(id) {
    notifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n,
    );
    saveReadState();
    renderNotifications();
  }

  // Mark all as read
  function markAllRead() {
    notifications = notifications.map((n) => ({ ...n, read: true }));
    saveReadState();
    renderNotifications();
  }

  // Clear all (also removes read state)
  function clearAll() {
    if (!confirm("Are you sure you want to clear all notifications?")) return;
    notifications = [];
    localStorage.removeItem("readNotifications");
    renderNotifications();
  }

  // Search filter
  function searchNotifications(query = "") {
    const q = query.trim().toLowerCase();
    if (!q) {
      renderNotifications(notifications);
      return;
    }
    const filtered = notifications.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q),
    );
    renderNotifications(filtered);
  }

  // Time-based filter
  function filterByTime(value) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filtered = [...notifications];

    if (value === "Recent") {
      filtered = filtered.filter((n) => {
        const d = new Date(n.date);
        d.setHours(0, 0, 0, 0);
        const diff = (today - d) / 86400000;
        return diff >= 0 && diff <= 2;
      });
    } else if (value === "Last Week") {
      filtered = filtered.filter((n) => {
        const d = new Date(n.date);
        d.setHours(0, 0, 0, 0);
        const diff = (today - d) / 86400000;
        return diff > 2 && diff <= 7;
      });
    } else if (value === "Last Month") {
      filtered = filtered.filter((n) => {
        const d = new Date(n.date);
        d.setHours(0, 0, 0, 0);
        const diff = (today - d) / 86400000;
        return diff > 7 && diff <= 31;
      });
    }
    // "All Notifications" → no filter

    renderNotifications(filtered);
  }

  // Dropdown selection handler
  window.selectOption = function (value) {
    // making it global so onclick="" works
    filterInput.value = value;
    filterByTime(value);

    // Close dropdown
    const dropdown = document.querySelector(".dropdown");
    const arrow = document.querySelector(".svg");
    if (dropdown && arrow) {
      dropdown.style.maxHeight = "0";
      dropdown.style.opacity = "0";
      arrow.classList.remove("rotate-180");
    }
  };

  // Event listeners
  searchInput?.addEventListener("input", (e) => {
    searchNotifications(e.target.value);
  });

  markAllBtn?.addEventListener("click", markAllRead);
  clearAllBtn?.addEventListener("click", clearAll);

  // Dropdown toggle (click anywhere outside → close)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".dropdown-btn");
    if (btn) {
      e.stopPropagation();
      const wrapper = btn.closest(".notification-dropdown");
      const dropdown = wrapper?.querySelector(".dropdown");
      const arrow = wrapper?.querySelector(".svg");

      // Close others
      document.querySelectorAll(".dropdown").forEach((d) => {
        if (d !== dropdown) {
          d.style.maxHeight = "0";
          d.style.opacity = "0";
        }
      });
      document.querySelectorAll(".svg").forEach((a) => {
        if (a !== arrow) a.classList.remove("rotate-180");
      });

      // Toggle current
      const isOpen =
        dropdown.style.maxHeight !== "0px" && dropdown.style.maxHeight;
      dropdown.style.maxHeight = isOpen ? "0" : dropdown.scrollHeight + "px";
      dropdown.style.opacity = isOpen ? "0" : "1";
      arrow.classList.toggle("rotate-180", !isOpen);
      return;
    }

    // Click outside → close all
    document.querySelectorAll(".dropdown").forEach((d) => {
      d.style.maxHeight = "0";
      d.style.opacity = "0";
    });
    document
      .querySelectorAll(".svg")
      .forEach((a) => a.classList.remove("rotate-180"));
  });

  // Initial render
  renderNotifications();
}

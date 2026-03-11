export function initHeader() {
 
  // 🌙 Dark Mode Toggle
const toggleBtn = document.getElementById("darkModeToggle");
const circle = document.getElementById("toggleCircle");
const sun = document.getElementById("sunIcon");
const moon = document.getElementById("moonIcon");
 
function getPreferredTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
 
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
 
function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    circle?.classList.add("translate-x-8");
    sun?.classList.add("hidden");
    moon?.classList.remove("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    circle?.classList.remove("translate-x-8");
    sun?.classList.remove("hidden");
    moon?.classList.add("hidden");
  }
}
 
const currentTheme = getPreferredTheme();
applyTheme(currentTheme);
 
toggleBtn?.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
 
  const newTheme = isDark ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  circle?.classList.toggle("translate-x-8");
  sun?.classList.toggle("hidden");
  moon?.classList.toggle("hidden");
});
 
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
 
 
  // 📂 Profile Dropdown
// ================= HEADER DROPDOWN =================
 
const headerWrapper = document.querySelector(".header-dropdown");
 
const headerBtn = headerWrapper?.querySelector(".dropdown-btn");
const headerMenu = headerWrapper?.querySelector(".dropdown-menu");
const headerArrow = headerWrapper?.querySelector(".dropdown-arrow");
 
headerBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
 
  headerMenu.classList.toggle("max-h-40");
  headerMenu.classList.toggle("opacity-100");
  headerArrow.classList.toggle("rotate-180");
});
 
// click outside → close
document.addEventListener("click", () => {
  headerMenu?.classList.remove("max-h-40", "opacity-100");
  headerArrow?.classList.remove("rotate-180");
});
 
 
  // 📱 Mobile Sidebar Toggle
// Mobile Sidebar Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("layout-sidebar");
 
  if (!menuBtn || !sidebar) return;
 
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
  });
});
 
}
 
 
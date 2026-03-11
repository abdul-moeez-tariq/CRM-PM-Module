export function initSidebar() {
  const sidebarLinks = document.querySelectorAll("#layout-sidebar ul li a");
 
  function setActiveLink() {
    let currentHash = window.location.hash || "#/dashboard";
 
    sidebarLinks.forEach(link => {
      const parentLi = link.parentElement;
      const linkHash = link.getAttribute("href");
 
      // Remove previous active styles
      parentLi.classList.remove("border-blue-500");
      parentLi.classList.add("border-transparent");
 
      link.classList.remove("bg-blue-100", "text-blue-500", "active-link");
      link.classList.add("text-gray-500"); // reset text color
 
      // Apply active background, border, and text color
      if (linkHash === currentHash) {
        parentLi.classList.remove("border-transparent");
        parentLi.classList.add("border-blue-500");
 
        link.classList.add("bg-blue-100", "text-blue-500", "active-link");
        link.classList.remove("text-gray-500"); // ✅ remove gray so blue shows
      }
 
      // Hover effect for non-active links
      link.addEventListener("mouseenter", () => {
        link.classList.add("bg-blue-100", "text-blue-500");
        parentLi.classList.add("border-blue-500");
      });
 
      link.addEventListener("mouseleave", () => {
        if (!link.classList.contains("active-link")) {
          link.classList.remove("bg-blue-100", "text-blue-500");
          parentLi.classList.remove("border-blue-500");
          link.classList.add("text-gray-500"); // restore gray
        }
      });
    });
  }
 
  window.addEventListener("hashchange", setActiveLink);
  setActiveLink(); // initial call
}
 
// togglr
export function initSidebarToggle() {
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("layout-sidebar");
  const content = document.getElementById("layout-content");
 
  if (!menuBtn || !sidebar || !content) return;
 
  // Function to open/close sidebar
  function toggleSidebar(forceOpen = null) {
    const isClosed = sidebar.classList.contains("-translate-x-full");
   
    // Determine if we should open or close based on forceOpen param
    const shouldOpen = forceOpen !== null ? forceOpen : isClosed;
 
    if (shouldOpen) {
      sidebar.classList.remove("-translate-x-full");
    } else {
      sidebar.classList.add("-translate-x-full");
 
    }
  }
 
  // Handle button click
  menuBtn.addEventListener("click", () => toggleSidebar());
 
  // Handle automatic open/close on window resize
  function handleResize() {
    if (window.innerWidth >= 1024) {
      toggleSidebar(true); // force open
    } else {
      toggleSidebar(false); // force close
    }
  }
 
  // Run on load
  handleResize();
 
  // Run on resize
  window.addEventListener("resize", handleResize);
}
 
 
 
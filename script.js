document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLink = document.getElementById("navLink");

  if (menuToggle && navLink) {
    // 1. Toggle the menu AND the "X" shape when clicking the burger button
    menuToggle.addEventListener("click", function () {
      navLink.classList.toggle("active");
      menuToggle.classList.toggle("active"); // Adds 'active' to the button for the X animation
    });

    // 2. Close the menu and revert the "X" back to a burger when any link is clicked
    const links = navLink.querySelectorAll("a");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        navLink.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  }
});
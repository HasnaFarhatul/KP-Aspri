
  let isMenuOpen = false;

  function toggleMenu() {
    const menu = document.getElementById("menuItems");
    isMenuOpen = !isMenuOpen;
    menu.style.maxWidth = isMenuOpen ? "300px" : "0";
  }

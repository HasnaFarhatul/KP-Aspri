//dashboard
let isMenuOpen = false;

function toggleMenu() {
const menu = document.getElementById("menuItems");
isMenuOpen = !isMenuOpen;
menu.style.maxWidth = isMenuOpen ? "600px" : "0";
}

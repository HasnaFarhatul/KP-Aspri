//dashboard
let isMenuOpen = false;

function toggleMenu() {
const menu = document.getElementById("menuItems");
isMenuOpen = !isMenuOpen;
menu.style.maxWidth = isMenuOpen ? "600px" : "0";
}

//lupa password
const nextBtn = document.getElementById("nextBtn");
const resetForm = document.getElementById("resetForm");

if (nextBtn && resetForm) {
  nextBtn.addEventListener("click", function () {
    const emailInput = document.getElementById("email").value;

if (emailInput.trim() !== "") {
  document.getElementById("passwordSection").style.display = "block";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("submitBtn").style.display = "inline-block";
  } else {
    alert("Masukkan email terlebih dahulu.");
  }
});

resetForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const pass = document.getElementById("newPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (pass !== confirm) {
    alert("Password tidak cocok!");
    return;
  }

  alert("Password berhasil diubah! 🔒");
});
}

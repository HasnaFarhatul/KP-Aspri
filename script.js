//dashboard
let isMenuOpen = false;

function toggleMenu() {
const menu = document.getElementById("menuItems");
isMenuOpen = !isMenuOpen;
menu.style.maxWidth = isMenuOpen ? "600px" : "0";
}

//kalender
const bulan = [
    { nama: "JULI 2025", jumlahHari: 31, mulaiHari: 1 },
    { nama: "AGUSTUS 2025", jumlahHari: 31, mulaiHari: 5 }, // Jumat
    { nama: "SEPTEMBER 2025", jumlahHari: 30, mulaiHari: 0 }
];
const pendapatanData = {
    "2025-08-01": 50000,
    "2025-08-02": 60000,
    "2025-08-03": 45000,
    "2025-08-04": 70000,
    "2025-08-05": 55000
};
let currentMonthIndex = 1;

function renderCalendar() {
    const grid = document.getElementById("calendarGrid");
    grid.innerHTML = "";
    const bulanIni = bulan[currentMonthIndex];
    document.getElementById("monthTitle").textContent = bulanIni.nama;

    const totalCell = bulanIni.mulaiHari;
    for (let i = 0; i < totalCell; i++) {
        const kosong = document.createElement("div");
        kosong.classList.add("day-box");
        kosong.style.backgroundColor = "transparent";
        kosong.style.boxShadow = "none";
        grid.appendChild(kosong);
    }
    let totalPendapatan = 0;

      for (let tanggal = 1; tanggal <= bulanIni.jumlahHari; tanggal++) {
        const fullDate = `2025-0${currentMonthIndex + 1}-${String(tanggal).padStart(2, '0')}`;
        const pendapatan = pendapatanData[fullDate];

        const box = document.createElement("div");
        box.classList.add("day-box");

        const day = document.createElement("div");
        day.classList.add("day-number");
        day.textContent = tanggal;

        const income = document.createElement("div");
        income.classList.add("income");
        if (pendapatan) {
          income.textContent = `Rp ${pendapatan.toLocaleString()}`;
          totalPendapatan += pendapatan;
        } else {
          income.classList.add("no-income");
        }

        box.appendChild(day);
        box.appendChild(income);
        grid.appendChild(box);
      }
  document.getElementById("totalPendapatan").textContent = `Rp ${totalPendapatan.toLocaleString()}`;
}
function changeMonth(offset) {
    currentMonthIndex += offset;
    if (currentMonthIndex < 0) currentMonthIndex = 0;
    if (currentMonthIndex > 2) currentMonthIndex = 2;
    renderCalendar();
}
renderCalendar();
//dashboard
let isMenuOpen = false;

function toggleMenu() {
const menu = document.getElementById("menuItems");
isMenuOpen = !isMenuOpen;
menu.style.maxWidth = isMenuOpen ? "600px" : "0";
}

//detail profil
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const inputs = document.querySelectorAll('#profileForm input');

editBtn.addEventListener('click', () => {
    inputs.forEach(input => input.removeAttribute('disabled'));
    editBtn.classList.add('d-none');
    saveBtn.classList.remove('d-none');
});

document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    inputs.forEach(input => input.setAttribute('disabled', true));
    editBtn.classList.remove('d-none');
    saveBtn.classList.add('d-none');
    alert('Data berhasil disimpan!');
});

//kalender
const bulan = [
  { nama: "JULI 2025", jumlahHari: 31, mulaiHari: 1 },
  { nama: "AGUSTUS 2025", jumlahHari: 31, mulaiHari: 5 },
  { nama: "SEPTEMBER 2025", jumlahHari: 30, mulaiHari: 0 }
];

const pendapatanData = {
  "2025-08-01": 50000,
  "2025-08-02": 75000,
  "2025-08-05": 100000,
  "2025-08-15": 125000,
  "2025-08-25": 200000
};

let bulanAktif = 1; // default Agustus

function renderKalender() {
  const calendarDays = document.getElementById("calendarDays");
  const monthYear = document.getElementById("monthYear");
  const totalPendapatan = document.getElementById("totalPendapatan");

  calendarDays.innerHTML = "";
  let bulanSekarang = bulan[bulanAktif];
  monthYear.textContent = bulanSekarang.nama;

  let total = 0;

  // kotak kosong sebelum tanggal 1
  for (let i = 0; i < bulanSekarang.mulaiHari; i++) {
    calendarDays.innerHTML += `<div></div>`;
  }

  // render tanggal
  for (let t = 1; t <= bulanSekarang.jumlahHari; t++) {
    const key = `2025-${String(bulanAktif + 7).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
    const income = pendapatanData[key] || 0;
    total += income;

    calendarDays.innerHTML += `
      <div class="day-box">
        <div class="day-number">${t}</div>
        <div class="income">${income > 0 ? "Rp " + income.toLocaleString() : ""}</div>
      </div>
    `;
  }

  totalPendapatan.textContent = `Total Pendapatan: Rp ${total.toLocaleString()}`;
}

document.getElementById("prevMonth").addEventListener("click", () => {
  bulanAktif = (bulanAktif - 1 + bulan.length) % bulan.length;
  renderKalender();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  bulanAktif = (bulanAktif + 1) % bulan.length;
  renderKalender();
});

renderKalender();


//setoran harian
const dataPendapatan = [
    { no: 1, tanggal: "2025-07-14 10:48:37", trx: "ASPRI-5162", kolektor: "Muksin", juru: "Uloh Saepuloh", jumlah: "Rp.100.000" },
    { no: 2, tanggal: "2025-08-05 09:00:00", trx: "ASPRI-5163", kolektor: "Muksin", juru: "Uloh Saepuloh", jumlah: "Rp.100.000" },
    { no: 3, tanggal: "2025-08-01 12:30:00", trx: "ASPRI-5164", kolektor: "Muksin", juru: "Uloh Saepuloh", jumlah: "Rp.100.000" },
    { no: 4, tanggal: "2025-08-05 14:00:00", trx: "ASPRI-5165", kolektor: "Muksin", juru: "Uloh Saepuloh", jumlah: "Rp.100.000" },
];
function renderTable(filteredData) {
    const tbody = document.getElementById("dataTable");
    tbody.innerHTML = "";
    filteredData.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.no}</td>
            <td>${formatDateTime(item.tanggal)}</td>
            <td>${item.trx}</td>
            <td>${item.kolektor}</td>
            <td>${item.juru}</td>
            <td>${item.jumlah} <span class="badge badge-kasbon ms-2">Kasbon</span></td>
        `;
        tbody.appendChild(tr);
    });
}
function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString('id-ID') + " " + date.toLocaleTimeString('id-ID');
}
function filterData(type) {
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    if (type === 'all') document.querySelector('.btn-filter:nth-child(1)').classList.add('active');
    if (type === 'today') document.querySelector('.btn-filter:nth-child(2)').classList.add('active');
    if (type === 'month') document.querySelector('.btn-filter:nth-child(3)').classList.add('active');

    const today = new Date();
    let filtered = [];

    if (type === 'all') {
        filtered = dataPendapatan;
    } else if (type === 'today') {
        filtered = dataPendapatan.filter(item => {
          const date = new Date(item.tanggal);
          return date.toDateString() === today.toDateString();
        });
      } else if (type === 'month') {
        filtered = dataPendapatan.filter(item => {
          const date = new Date(item.tanggal);
          return (
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        });
      }

    renderTable(filtered);
}

function filterDataByDate() {
    const selectedDate = document.getElementById("dateInput").value;
    if (!selectedDate) return;

    const filtered = dataPendapatan.filter(item => {
        return item.tanggal.startsWith(selectedDate);
    });

    renderTable(filtered);
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    }
    
    filterData('all');

// daftar juru parkir
(function(){
  const row = document.querySelector('.container .row.g-4');
  if (!row) return;

  // Buat col untuk ikon panah
  const colPanah = document.createElement('div');
  colPanah.className = 'col-12 col-md-4 d-flex justify-content-center';

  // Tombol transparan
  const btnPanah = document.createElement('button');
  btnPanah.type = 'button';
  btnPanah.className = 'btn btn-sm';
  btnPanah.style.background = 'transparent';
  btnPanah.style.border = 'none';
  btnPanah.style.padding = '0';

  // Gambar panah
  const imgPanah = document.createElement('img');
  imgPanah.src = '../foto/lainnya.png'; // lokasi file kamu
  imgPanah.alt = 'Tampilkan lebih banyak';
  imgPanah.style.width = '40px';
  imgPanah.style.height = '40px';

  btnPanah.appendChild(imgPanah);
  colPanah.appendChild(btnPanah);

  // Masukkan di akhir row
  row.appendChild(colPanah);

  function appendClones() {
    const cols = Array.from(row.querySelectorAll(':scope > .col-12'));
    if (cols.length === 0) return;

    const frag = document.createDocumentFragment();
    cols.forEach(col => {
      if (col !== colPanah) { // jangan ikut clone tombol panah
        const clone = col.cloneNode(true);
        frag.appendChild(clone);
      }
    });
    row.insertBefore(frag, colPanah);
  }

  btnPanah.addEventListener('click', () => {
    imgPanah.style.opacity = '0.5';
    btnPanah.disabled = true;
    setTimeout(() => {
      appendClones();
      btnPanah.disabled = false;
      imgPanah.style.opacity = '1';
    }, 150);
  });

})();

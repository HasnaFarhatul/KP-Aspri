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
const monthNames = [
      "Januari","Februari","Maret","April","Mei","Juni",
      "Juli","Agustus","September","Oktober","November","Desember"
    ];
    let currentDate = new Date(2025, 7); // Agustus 2025 (index bulan 7)

    const monthlyIncome = {
      Januari: 120000,
      Februari: 150000,
      Maret: 170000,
      April: 200000,
      Mei: 180000,
      Juni: 160000,
      Juli: 190000,
      Agustus: 250000,
      September: 220000,
      Oktober: 210000,
      November: 230000,
      Desember: 300000
    };

    function renderCalendar(date) {
      const month = date.getMonth();
      const year = date.getFullYear();
      document.getElementById("monthYear").innerText = monthNames[month] + " " + year;

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month+1, 0).getDate();

      const calendarDays = document.getElementById("calendarDays");
      calendarDays.innerHTML = "";

      let total = 0;

      // Kotak kosong sebelum tanggal 1
      for (let i = 0; i < firstDay; i++) {
        calendarDays.innerHTML += `<div class="day-empty"></div>`;
      }

      // Isi tanggal
      for (let d = 1; d <= daysInMonth; d++) {
        let pendapatan = "";
        let highlight = "";
        if (d <= 5) {
          highlight = "highlight";
          pendapatan = `<div class="income">Rp ${(d*10000).toLocaleString()}</div>`;
          total += d*10000;
        }
        calendarDays.innerHTML += `<div class="day-box ${highlight}">${d}${pendapatan}</div>`;
      }

      document.getElementById("totalIncome").innerText = "Total Pendapatan: Rp " + total.toLocaleString();
    }

    function prevMonth() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    }
    function nextMonth() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    }

    function showPopup() {
      const yearlyList = document.getElementById("yearlyIncome");
      yearlyList.innerHTML = "";
      for (const [bulan, pendapatan] of Object.entries(monthlyIncome)) {
        yearlyList.innerHTML += `<li>${bulan}: Rp ${pendapatan.toLocaleString()}</li>`;
      }
      new bootstrap.Modal(document.getElementById('popupModal')).show();
    }

    renderCalendar(currentDate);


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


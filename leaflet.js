  const lokasiData = [
    {
      id: 'L001',
      nama: 'Jalan KHZ Mustofa',
      alamat: 'Jl. KHZ Mustofa, Cibeunying, Tasik',
      jenis: 'Tepi Jalan Umum',
      status: 'Aktif',
      koordinat: [-7.3283, 108.2228]
    },
    {
      id: 'L002',
      nama: 'Alun-Alun Kota Tasik',
      alamat: 'Jl. Otto Iskandardinata, Tasikmalaya',
      jenis: 'Tepi Jalan Umum',
      status: 'Tidak Aktif',
      koordinat: [-7.3245, 108.2143]
    },
    {
      id: 'L003',
      nama: 'Jl. Nagarawangi',
      alamat: 'Jl. Nagarawangi, Tasikmalaya',
      jenis: 'Tepi Jalan Umum',
      status: 'Aktif',
      koordinat: [-7.3260, 108.2200]
    }
  ];

  const map = L.map('map').setView([-7.3283, 108.2228], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const tableBody = document.getElementById('lokasiTable');

  lokasiData.forEach((lokasi, index) => {
    const marker = L.marker(lokasi.koordinat).addTo(map);
    marker.bindPopup(`<strong>${lokasi.nama}</strong><br>${lokasi.alamat}`);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${lokasi.id}</td>
      <td>${lokasi.nama}</td>
      <td>${lokasi.alamat}</td>
      <td>${lokasi.jenis}</td>
      <td><button class="status-btn ${lokasi.status === 'Aktif' ? 'aktif' : 'tidak-aktif'}">${lokasi.status}</button></td>
    `;
    tableBody.appendChild(tr);
  });
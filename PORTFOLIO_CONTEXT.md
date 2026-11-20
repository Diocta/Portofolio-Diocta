# Panduan Konteks Portofolio

Dokumen ini menjadi panduan untuk melanjutkan pengembangan situs portofolio Diocta. Dokumen ini melengkapi README, bukan menggantikannya. Perbarui setiap kali struktur, keputusan desain, data, atau perilaku situs berubah.

## Tujuan

Mengembangkan portofolio pribadi yang profesional, mudah dipindai, responsif, dan tetap mempertahankan tema gelap. Konten berfokus pada IoT, embedded systems, dan robotika.

## Arah Desain

- Arah aktif: studio IoT editorial dengan latar charcoal gelap, aksen mint dan amber, tipografi ekspresif, dan foto proyek sebagai fokus.
- Hero berputar melalui profil (9 detik), dua proyek terbaru (6 detik), dan dua prestasi terbaru (7 detik), lalu kembali ke profil.
- Scan line menandai durasi slide; panah, indikator kategori, swipe, pause saat pointer/focus, dan reduced-motion tetap tersedia.
- Showcase proyek dapat dipilih manual; tidak menampilkan hitungan indeks yang tidak dibutuhkan.
- Gunakan gerak yang memiliki fungsi: scan line, transisi foto, reveal saat scroll, dan menu navigasi mobile.
- Pastikan semua animasi tetap nyaman di ponsel dan menghormati `prefers-reduced-motion`.
- Referensi hanya untuk arah kualitas; jangan menyalin desain situs lain.
- Gunakan aset lokal yang sudah ada; jangan menambah ilustrasi generik atau klaim statistik yang belum terverifikasi.

## Tahapan Pengerjaan

### Tahap 1: Audit konten dan aset - selesai

- Inventaris dan cocokkan semua file gambar di `assets/` dengan penggunaan situs.
- Periksa duplikasi konten proyek/prestasi, placeholder tautan, teks, dan kebutuhan data baru.
- Catat rincian audit pada bagian Temuan Audit Tahap 1.

### Tahap 2: Rapikan sumber data - selesai untuk konten saat ini

- `projectsData`, `achievementsData`, `experienceData`, dan `skillsData` di `data.js` menjadi fallback lokal serta bentuk konten Supabase.
- Proyek, prestasi, pengalaman, dan keahlian dapat dimuat dari Supabase jika URL/key dikonfigurasi; gagal/konfig kosong memakai fallback lokal.
- Pendidikan belum memiliki data.
- Render preview, daftar, dan detail dari sumber bersama; jangan menambah kartu data secara manual ke HTML.
- Situs publik tetap statis tanpa server database lokal; pengelolaan remote memerlukan Supabase project.

### Tahap 3: Susun struktur konten dan navigasi

- Beranda: profil singkat, spesialisasi, tautan kontak, dan proyek pilihan.
- `experience.html` sudah ditambahkan sebagai halaman timeline; isi saat ini adalah Lorem Ipsum placeholder, bukan pengalaman nyata.
- Pendidikan, proyek, skill, prestasi/sertifikasi, dan kontak.
- Daftar proyek mengarah ke halaman detail yang datanya konsisten.

### Tahap 4: Perbarui tampilan

- Hero dan showcase beranda sudah didesain ulang; halaman pengalaman memiliki timeline dan slot bukti.
- Navigasi mobile sudah berupa menu lipat yang dipakai di semua halaman.
- Lanjutkan review visual halaman daftar proyek/prestasi dan penyesuaian akhir bila diperlukan.

### Tahap 5: Tambahkan fitur dan interaksi

- Carousel hero otomatis dan manual sudah dapat berpindah kategori, foto, judul, dan caption.
- Angka indeks pada showcase dan hitungan "x dari x proyek" sudah dihapus; filter dan empty state tetap ada.
- Timeline pengalaman memakai data terpusat dengan dua frame bukti per entri.
- `admin.html` menyediakan login email/password, reset password satu kali, dan CRUD proyek/pengalaman/skill/prestasi; media diunggah ke Supabase Storage.
- `supabase/schema.sql` menyiapkan tabel konten, bucket media, dan RLS; admin harus dimasukkan eksplisit ke `portfolio_admins`.
- Proyek pilihan dan, bila berguna untuk jumlah proyek yang ada, filter berdasarkan tag.
- Link kontak langsung seperti email, WhatsApp, GitHub, dan LinkedIn setelah alamatnya dikonfirmasi.
- Tombol CV hanya jika berkas CV tersedia.
- Animasi reveal, stagger ringan pada kartu, hover gambar, dan state fokus keyboard yang jelas.

### Tahap 6: Validasi

- Uji seluruh halaman, navigasi, gambar, tautan, data detail, dan error JavaScript.
- Uji ukuran desktop dan ponsel serta perilaku reduced motion.
- Catat pemeriksaan yang dijalankan dan hasilnya di dokumen ini.

## Struktur Saat Ini

- `index.html`: beranda, preview proyek, skill, dan preview prestasi.
- `experience.html`: halaman timeline pengalaman dan placeholder dokumentasi.
- `admin.html` / `admin.js` / `admin.css`: pengelola konten privat; tidak dimasukkan ke navigasi publik.
- `supabase-config.js`: URL Supabase dan publishable/anon key; kosong berarti fallback lokal.
- `supabase/schema.sql`: tabel konten, policy RLS, allowlist admin, dan bucket gambar.
- `SUPABASE_SETUP.md`: langkah setup Supabase, auth redirect, admin allowlist, dan impor data awal.
- Preview lokal saat ini: `http://127.0.0.1:4173/index.html` (server loopback).
- `projects.html`: daftar proyek.
- `project-detail.html`: kerangka halaman detail; konten diisi oleh `app.js` dari `projectsData`.
- `achievements.html`: daftar prestasi.
- `data.js`: sumber proyek (`projectsData`), contoh pengalaman (`experienceData`), dan prestasi (`achievementsData`).
- `app.js`: render carousel/daftar/detail, pengalaman, prestasi, skill; memuat konten Supabase dengan fallback lokal.
- `script.js`: menu mobile, reveal saat scroll, navigasi aktif, dan reduced-motion fallback.
- `style-common.css` dan stylesheet per halaman termasuk `style-experience.css`: CSS yang ditautkan oleh halaman.
- `style.css`: tidak ditautkan oleh halaman yang diperiksa pada audit awal; periksa sebelum menghapus atau menggunakannya.
- `assets/`: foto profil, gambar proyek, dan dokumentasi prestasi.

## Temuan Audit Tahap 1

- Seluruh 17 aset di `assets/` memiliki referensi di halaman atau data. Enam gambar proyek, sepuluh gambar prestasi, dan satu foto profil teridentifikasi.
- Enam proyek dan sepuluh prestasi kini dirender dari `data.js`; HTML menyediakan kontainer, bukan kartu data duplikat.
- Semua entri proyek masih menyimpan `githubUrl: "#"`; satu demo juga masih `#`. Renderer tidak menampilkan tombol untuk URL placeholder.
- Email footer kini memakai `mailto:`, dan tahun hak cipta diisi otomatis.
- Typo yang ditemukan pada judul/deskripsi lengan robot, Lettura, dan Autruck/Avto sudah diperbaiki. Klaim hasil sensor node yang tampak tidak sesuai proyek robot 4WD tidak dipublikasikan sambil menunggu konfirmasi.
- Halaman pengalaman menampilkan satu entri Lorem Ipsum yang jelas ditandai `KONTEN CONTOH`, dua ruang bukti, dan label periode/organisasi placeholder. Jangan publikasikan sebagai pengalaman nyata sebelum diganti pemilik.
- Pendidikan belum memiliki data.
- Tautan GitHub proyek masih perlu URL nyata. Konfirmasi juga alamat email publik, URL sosial, dan ketersediaan CV sebelum publikasi.

## Data yang Perlu Dikonfirmasi

Jangan mengarang informasi yang belum diberikan. Untuk pengalaman magang, minta nama perusahaan, posisi, periode, tugas, teknologi, hasil/kontribusi, dan bukti yang boleh ditampilkan. Konfirmasi juga pendidikan, alamat email publik, URL sosial, ketersediaan CV, serta tautan GitHub proyek yang saat ini masih kosong.

## Catatan Perubahan

### 2026-11-20 - Redesign Hero Carousel (Terminal HUD, Pixel Aesthetic & Centering)

- Hero Card Centering: Memperbaiki posisi hero terminal & single card yang sebelumnya condong ke kanan (`right: 8%`) menjadi 100% simetris di tengah (`left: 50%; transform: translateX(-50%)`) sehingga jarak ke tombol panah kiri dan kanan persis sama.
- Pixel Corner Brackets: Menyinkronkan 4 corner brackets `[ ]` dalam wrapper `.pixel-frame-corners` yang memeluk tepat di sekeliling kartu dengan jarak presisi.
- Hero Action Buttons: Merombak tombol "Lihat proyek" dan "Hubungi saya" mengikuti tema cyber-pixel tombol Detail (`.pixel-card-cta`), sudut tajam (tanpa rounded), tipografi monospace, efek laser shimmer sweep saat hover, tombol primary berlatar mint neon dengan forward arrow `→`, dan tombol secondary berlatar amber gold neon dengan diagonal arrow `↗`.
- Slide 1 (Profil): Mengganti foto lingkaran besar dengan panel "Terminal Bio / System HUD" bergaya hardware/embedded system (`SYS.CORE // PROFILE.DAT`). Dilengkapi status online dengan pulsing pixel dot, avatar berbingkai aksen sudut pixel, identitas & fokus, grid metrik pencapaian (6+ proyek, 10+ prestasi, 16+ skill), active stack badges (ESP32, Arduino, MQTT, Robotics, MicroPython, C/C++), dan command line terminal dengan blinking pixel cursor `_`.
- Slide 2 (Proyek) & Slide 3 (Prestasi): Mengubah format dua kartu vertikal yang terjepit menjadi Single Card yang luas (horizontal layout 16:9). Dilengkapi sub-pills interaktif `[ 01 ]` `[ 02 ]` untuk beralih antar proyek/prestasi terbaru, auto-switch di paruh durasi slide, tag overlay, dan tombol CTA langsung.
- Pixel Arrow & Frame Brackets: Mengganti tombol panah navigasi menjadi tombol persegi pixel art ber-SVG step chevron, serta menambahkan 4 corner brackets `[ ]` pixel style pada frame carousel.
- Animasi Pixel: Menambahkan animasi transisi `pixel-dissolve-in`, scanline berketebalan 2px dengan glow, dan blinking pixel cursor pada label kategori dan status bar.


### 2026-11-18

- Mengubah hero menjadi slideshow profil (9 detik), dua proyek terbaru (6 detik), dan dua prestasi terbaru (7 detik), dengan panah kiri/kanan, indikator kategori, swipe, pause hover/fokus, reduced-motion, serta scan line yang sinkron dengan timer.
- Menghapus indeks angka hero/showcase dan hitungan "x dari x proyek"; filter proyek dan empty state tetap berfungsi.
- Memusatkan skill di `skillsData`; data proyek, pengalaman, skill, dan prestasi memakai struktur yang dapat dirender dari fallback lokal atau Supabase.
- Menambahkan `admin.html` privat dengan password login, reset password satu kali, CRUD empat kategori, draft/publikasi, upload bukti, dan impor awal yang hanya berjalan jika database kosong.
- Menambahkan `supabase/schema.sql`, RLS, allowlist admin eksplisit, bucket media, konfigurasi kosong, dan panduan di `SUPABASE_SETUP.md`. Tidak menggunakan atau menyimpan `service_role` key.
- Memperbaiki refresh observer agar kartu hasil render async tidak tertinggal tersembunyi.
- Validasi browser: slideshow tampil profil dulu, 9 detik, lalu dua proyek dan dua prestasi; tombol panah berpindah kategori; reduced-motion menonaktifkan autoplay.
- Validasi browser pada 390 px: dua foto proyek/prestasi termuat tanpa overflow; indikator hitungan dihilangkan.
- Smoke test HTTP: beranda, daftar proyek (6), detail proyek, prestasi (10), pengalaman (1 placeholder/2 slot bukti), dan admin fallback berjalan tanpa error JavaScript.
- Preview berjalan di `http://127.0.0.1:4173/index.html`.
- Belum dapat diuji: auth password, CRUD remote, upload, dan RLS live, karena konfigurasi/project Supabase belum tersedia saat perubahan ini dibuat.

### 2026-11-18

- Mengubah hero menjadi carousel profil (9 dtk), 2 proyek terbaru (6 dtk), dan 2 prestasi terbaru (7 dtk); panah kiri/kanan, pilihan kategori, swipe mobile, pause hover/fokus, dan scan line progress.
- Menghapus indeks angka pada hero/showcase dan label hitungan hasil proyek; filter dan empty state tetap berfungsi.
- Menambahkan `skillsData` dan menghapus skill hardcoded dari HTML agar semua kelompok keahlian bisa dikelola sebagai data.
- Menyiapkan fallback Supabase di halaman publik dan halaman pengelola privat dengan password login, reset satu kali, allowlist admin, CRUD, draft/publikasi, upload gambar, serta impor data awal yang menolak database non-kosong.
- Menambahkan SQL dengan RLS dan bucket media; tidak ada `service_role` key di kode browser.
- Menambahkan panduan setup Supabase. URL/key kosong mempertahankan website pada data lokal.
- Validasi browser: urutan profil -> dua proyek terbaru -> dua prestasi terbaru; transisi manual; reduced-motion menghentikan autoplay; dua gambar tampil tanpa overflow pada 390 px.
- Validasi browser: tidak ada hitungan proyek, filter empty-state berjalan, konten fallback/skill tampil setelah render async, admin menunjukkan setup notice tanpa konfigurasi.
- Belum dapat diuji pada saat implementasi awal: auth, CRUD jarak jauh, kebijakan RLS live, dan upload, karena Supabase project belum dikonfigurasi.

### 2026-11-18 - Admin Password

- Mengganti login rutin admin dari magic-link ke email/password dengan `signInWithPassword`.
- Menambahkan alur reset password satu kali melalui email untuk user lama yang sebelumnya dibuat lewat OTP; password minimal 12 karakter.
- Mempertahankan allowlist `portfolio_admins`, pemeriksaan akses, RLS, dan session login; CRUD tidak mengirim email.
- Uji browser: form email/password dan tombol reset tampil tanpa error JavaScript. Login/reset aktual belum diuji dengan kredensial pemilik.

### 2026-11-18 - Pengurutan Tahun Konten

- Halaman proyek, prestasi, hero terbaru, dan admin mengurutkan konten berdasarkan tahun terbaru ke terlama.
- Tahun prestasi memakai field `year`; tahun proyek memakai `year` jika ada atau diekstrak dari judul untuk kompatibilitas data lama; pengalaman memakai tahun dari periode.
- Form proyek admin meminta tahun agar proyek baru tersortir konsisten.
- Data Supabase aktual berhasil diuji di browser: prestasi dimulai 2026, 2025, 2024; proyek dimulai 2026, 2025, 2024.
- Semua pemuatan `app.js` di halaman publik memakai query versi `?v=20261118-year-sort` untuk menghindari bundle sorter lama dari cache browser/CDN.
- Uji localhost setelah cache-bust: halaman prestasi tetap dimulai 2026 → 2025 → 2024 dan memuat URL script versi baru.

### 2026-11-16

- Membuat panduan konteks dan rencana pengerjaan berdasarkan pemeriksaan awal situs.
- Menyelesaikan audit Tahap 1: 17 aset terpetakan, duplikasi data, placeholder tautan, dan teks yang perlu ditinjau dicatat.
- Memusatkan enam proyek dan sepuluh prestasi di `data.js`; semua preview, daftar, dan detail proyek dirender dari sana.
- Memperbarui tema gelap, navigasi, hero, kartu, detail, responsivitas, serta animasi reveal dengan dukungan reduced motion.
- Menambah pencarian dan filter teknologi proyek, empty state, link email, dan tahun footer otomatis.
- Memperbaiki typo yang terlihat dan tidak menampilkan URL placeholder atau klaim hasil yang belum terkonfirmasi.
- Mengubah beranda menjadi hero editorial dengan foto proyek, scan line, jalur sirkuit, panel profil, serta showcase enam proyek yang dapat dipilih.
- Menambahkan menu mobile overlay dengan lima tautan, penutupan melalui Escape, dan halaman pengalaman berisi Lorem Ipsum placeholder serta dua slot bukti.
- Memakai aset foto lokal yang sudah ada; tidak ada unduhan eksternal.
- Validasi browser: preview 3 proyek/4 prestasi; 6 proyek/10 prestasi pada halaman lengkap; filter Robot menghasilkan 3 proyek, pencarian Lettura 1 proyek, dan empty state berfungsi.
- Validasi browser: halaman detail memuat gambar dan tag tanpa error JavaScript; breakpoint ponsel tidak overflow dan konten halaman mulai di bawah navbar.
- Validasi browser: memilih Lettura mengganti foto, judul, tag, indeks, dan URL detail; menu mobile terbuka dengan 5 tautan dan tertutup dengan Escape; halaman pengalaman memiliki 1 entri dan 2 slot bukti.
- Validasi layout: tidak ada horizontal overflow pada lebar 1440, 1100, 1024, 900, 768, dan 390 px; hero berubah menjadi satu kolom pada breakpoint tablet.
- Tidak mengunduh gambar atau aset animasi tambahan; gambar proyek/prestasi yang sudah ada digunakan.

## Status Berikutnya

- Selesai: Tahap 1; sumber data lokal/remote dan halaman admin sudah disiapkan; slideshow, filter, dan halaman pengalaman placeholder selesai.
- Belum selesai: ganti Lorem Ipsum pengalaman dengan data nyata dan isi pendidikan.
- Aktivasi backend: pemilik perlu membuat Supabase project, menjalankan `supabase/schema.sql`, mengundang akun admin, memasukkan user ID ke allowlist, mengisi `supabase-config.js`, dan mengatur redirect URL.
- Berikutnya: setelah Supabase disiapkan, set password awal melalui reset email satu kali, lalu uji password login, CRUD, upload, dan izin admin/non-admin secara end-to-end. Login rutin tidak memerlukan email; admin tetap terkunci jika akun belum masuk allowlist.

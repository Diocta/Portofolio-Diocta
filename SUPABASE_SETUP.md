# Setup Supabase untuk Portofolio

Dashboard pengelola memerlukan project Supabase online. Tidak perlu mengunduh database atau menjalankan server database di komputer. Situs publik tetap dapat menggunakan data lokal sebelum Supabase dikonfigurasi.

## 1. Buat project dan schema

1. Buat project di Supabase dan simpan password database di password manager Anda. Password database tidak dimasukkan ke file website.
2. Buka **SQL Editor**, lalu jalankan seluruh isi `supabase/schema.sql`.
3. Buka **Project Settings > API** dan salin **Project URL** serta **Publishable key** (atau legacy `anon` key). Jangan menyalin `service_role` / secret key ke website.

## 2. Buat akun pemilik

1. Di **Authentication > Users**, undang email Anda sebagai user. Matikan sign-up publik jika opsi itu tersedia.
2. Di **Authentication > URL Configuration**, set **Site URL** ke alamat website dan tambahkan redirect URL halaman admin, misalnya `http://localhost:5500/admin.html` untuk VS Code Live Server dan `https://DOMAIN-ANDA/admin.html` setelah deploy.
3. Setelah user dibuat, jalankan query berikut di SQL Editor dengan email Anda:

```sql
insert into public.portfolio_admins (user_id)
select id from auth.users where email = 'EMAIL-ADMIN-ANDA'
on conflict (user_id) do nothing;
```

Kebijakan RLS memeriksa tabel `portfolio_admins`; menyembunyikan atau mengetahui URL `admin.html` saja tidak memberikan hak mengelola data.

## 3. Atur password admin

Halaman admin menggunakan email dan password agar login rutin tidak mengirim email.

1. Buka `admin.html` melalui HTTP/HTTPS, masukkan email admin, lalu pilih **Atur atau lupa password**.
2. Ikuti satu email reset. Jika Supabase menunjukkan `email rate limit exceeded`, tunggu sampai jendela rate limit pulih atau konfigurasi custom SMTP, lalu minta satu email reset saja.
3. Tautan reset kembali ke halaman admin. Buat password unik minimal 12 karakter.
4. Login berikutnya gunakan email dan password; tidak perlu meminta tautan email lagi selama sesi/password masih berlaku.

Jika akun sudah lolos login tetapi menampilkan akses ditolak, pastikan user UUID-nya ada di `public.portfolio_admins`.

## 4. Hubungkan website

Isi `supabase-config.js` menggunakan Project URL dan Publishable/anon key:

```js
window.PORTFOLIO_SUPABASE = {
  url: "https://PROJECT-REF.supabase.co",
  anonKey: "sb_publishable_...",
};
```

Publishable/anon key memang dapat dibaca browser; keamanan bergantung pada autentikasi dan kebijakan RLS di database. Jangan pernah memakai `service_role` key pada file yang di-deploy.

Buka website melalui server lokal atau domain HTTPS. Jangan gunakan `file://` untuk login/reset password, karena callback Supabase perlu alamat HTTP/HTTPS yang terdaftar.

## 5. Masuk dan impor data awal

1. Buka `admin.html`, lalu masuk menggunakan email dan password admin.
2. Pilih **Impor data awal** satu kali saat tabel masih kosong. Tombol akan menolak impor jika database sudah berisi data agar tidak menggandakan atau menimpa konten.
3. Periksa proyek, pengalaman, keahlian, dan prestasi. Pengalaman Lorem Ipsum diimpor sebagai draft agar tidak tampil di website publik; edit dengan data nyata lalu centang publikasi jika siap.
4. Uji perubahan pada satu data, periksa halaman publik, lalu pastikan akun yang tidak terdaftar sebagai admin tidak dapat melakukan CRUD.

File gambar yang diunggah dibatasi maksimal 10 MB per file, format JPG/PNG/WebP. Gambar portofolio menjadi publik agar dapat dilihat pengunjung, tetapi kebijakan bucket membatasi upload, perubahan, dan penghapusan ke admin.

## Status aktivasi

Integrasi kode dan schema sudah disiapkan, tetapi login password, CRUD jarak jauh, kebijakan SQL, reset password, dan upload harus diuji setelah pemilik membuat project, menjalankan schema, membuat/allowlist akun admin, mengatur password, dan mengisi config. Sampai itu dilakukan, data lokal tetap menjadi fallback situs publik.

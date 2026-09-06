CARA EDIT WEBSITE INI
======================

Cuma perlu buka file data.js — semua teks, nama, foto, dan lagu
diatur dari situ. Nggak perlu sentuh index.html / style.css / script.js
kecuali mau ubah tampilan.

1. Foto
   - Taruh file foto kamu di folder /photos (contoh: photos/1.jpg)
   - Tulis nama filenya + caption di array `photos` pada data.js
   - Kalau file belum ada / salah nama, otomatis muncul kotak
     checkerboard placeholder (nggak bikin error/putih blank)

2. Lagu
   - Taruh file mp3 di folder /music (contoh: music/lagu1.mp3)
   - Tulis judul, artis, dan nama filenya di array `music` pada data.js
   - Boleh isi lebih dari satu lagu, nanti bisa gonta-ganti pakai
     tombol prev/next di window "Muter Lagu"
   - Browser butuh 1x klik play dulu sebelum audio bisa bunyi
     (aturan default browser, bukan bug)

3. Teks
   - openingLines -> baris ngetik-ngetik di window "Pesan Baru"
   - letterText   -> isi surat di window kartu profil
   - question     -> pertanyaan nembak di window "Pertanyaan.exe"
   - finalMessage -> pesan yang muncul setelah dia klik OK

4. Upload
   - Upload semua file (index.html, style.css, data.js, icons.js,
     script.js, folder photos/, folder music/) ke hosting statis
     mana aja: Netlify, Vercel, GitHub Pages, dst — drag & drop
     folder ini juga biasanya langsung jalan.

Kalau mau ubah warna/font/animasi, semua token warna ada di bagian
paling atas style.css (:root { ... }).

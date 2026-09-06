// ============================================================
// data.js — GANTI SEMUA ISI DI SINI. Jangan edit file lain
// kecuali mau ubah tampilan/behavior-nya.
// ============================================================
const CONFIG = {

  // Nama dia (muncul di title window & surat)
  toName: "Dia",

  // Nama kamu (muncul di footer & penutup surat)
  fromName: "Aku",

  // Judul tab browser
  pageTitle: "sebuah pesan untuk dia.exe",

  // Baris-baris yang muncul satu-satu (efek ngetik) di window "Pesan Baru"
  // Tambah/kurangi baris sesuka hati.
  openingLines: [
    "Hai...",
    "sebelum kamu scroll lebih jauh,",
    "aku mau kasih tau sesuatu.",
    "tapi nggak lewat chat biasa,",
    "aku bikinin kamu 'program' kecil ini.",
  ],

  // Foto-foto kenangan / foto dia. Taruh file-nya di folder /photos
  // lalu tulis nama filenya di sini. Kalau file belum ada,
  // otomatis muncul kotak checkerboard placeholder (nggak error).
  photos: [
    { src: "photos/foto1.jpg", caption: "waktu itu..." },
    { src: "photos/foto2.jpg", caption: "masih inget ini?" },
    { src: "photos/foto3.jpg", caption: "salah satu momen favorit" },
  ],

  // Lagu buat window "Muter Lagu". Taruh file mp3 di folder /music.
  // Boleh isi lebih dari satu, nanti bisa gonta-ganti pakai tombol prev/next.
  music: [
    { title: "Stying", artist: "Nama Lizzy", src: "music/soundTrack.mp3" },
  ],

  // Isi "surat" di window profil
  letterTitle: "Buat kamu",
  letterText:
    "Nggak tau harus mulai dari mana, tapi... udah lama aku mau bilang ini. " +
    "Kamu itu orang yang bikin hari-hari biasa jadi nggak biasa-biasa aja. " +
    "Ganti bagian ini di data.js sama cerita/perasaan kamu yang sebenarnya ya — " +
    "ini cuma contoh placeholder.",

  // Pertanyaan di window "OK" (bagian nembak/confess-nya)
  question: "Mau nggak jadi orang spesial buat aku?",

  // Muncul setelah dia klik OK
  finalMessage:
    "Yes! Makasih udah baca sampai sini. Ini bukan cuma website, " +
    "ini cara aku bilang: aku suka kamu. Semoga ini jadi awal cerita baru kita :)",

  // Nama file musik (opsional) yang muter otomatis pas final reveal — kosongkan "" kalau tidak perlu
  finalConfettiHearts: true,
};

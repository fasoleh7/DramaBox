# Dramabox API

Repository ini hanya berisi contoh penggunaan API Dramabox.
Silakan jalankan di server anda atau kreasikan sendiri berdasarkan contoh yang ada.

## Instalasi

```sh
git clone https://github.com/Sansekai/DramaBox-API
cd DramaBox-API
npm install
```

## Cara Menjalankan

Jalankan setiap file dengan perintah:
```sh
node nama_file.js
```

### Daftar File dan Fungsinya

1. `search.js`<br>
Mencari drama berdasarkan kata kunci.
Cara pakai:
- Ganti nilai `keyword` pada variabel `data` dengan kata kunci yang diinginkan.
2. `latest.js`<br>
Mendapatkan daftar drama terbaru.
3. `link-stream.js`<br>
Mendapatkan link dari episode tertentu.
Cara pakai:
- Ganti nilai `bookId` pada variabel `data` dengan ID drama yang diinginkan.
- Ganti nilai `index` pada variabel `data` dengan nomor episode yang diinginkan (dimulai dari 1).
Jumlah episode dapat dilihat pada hasil `latest.js` pada properti `chapterCount`.

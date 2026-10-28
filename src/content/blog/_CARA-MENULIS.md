# Cara menulis artikel blog

Satu artikel = satu file `.md` di folder ini. Nama file jadi alamatnya:
`foto-produk-pakai-hp.md` tayang di `/blog/foto-produk-pakai-hp`.
File yang namanya diawali `_` (seperti file ini) tidak ikut tayang.

## Isian di bagian atas file

```yaml
---
title: "Judul artikel"                 # wajib
excerpt: "Satu atau dua kalimat."      # wajib, tampil di kartu dan di bawah judul
category: Panduan                      # wajib: Panduan, Cerita brand, atau Update Belli
date: 2026-11-03                       # wajib, tanggal terbit (artikel terbaru tampil paling atas)
cover: ./covers/nama-foto.jpg          # opsional; tanpa cover, kartu jadi kotak biru dengan judul
featured: true                         # opsional; satu artikel jadi "Artikel pilihan" di atas /blog
author: Iqbal Hamdani                  # opsional, ini nilai bawaannya
products:                              # opsional, kartu produk di akhir artikel
  - name: Sprei Tencel Set
    meta: 4 ukuran · 4 warna
    price: Rp549rb
    image: ./covers/sprei.jpg
productsCaption: "Contoh produk yang dipasang di dalam artikel."
---
```

Foto cover dan foto produk disimpan di folder ini juga (misalnya `covers/`). Ukuran bebas;
Astro mengecilkannya otomatis saat build.

## Isi artikel

- Paragraf pertama tampil lebih besar sebagai pembuka.
- Setiap `## Judul bagian` masuk ke daftar "Di artikel ini" di samping artikel.
- Lama baca dihitung otomatis dari jumlah kata.
- Daftar bernomor (`1.`, `2.`) tampil dengan nomor bulat biru.
- Gambar: `![keterangan gambar](./covers/foto.jpg)`.
- Kotak chat WhatsApp: tulis sebagai kutipan. Paragraf pertama jadi label kecil, paragraf berikutnya jadi gelembung chat.

```md
> Pesan yang masuk ke WhatsApp-mu
>
> Halo Sleep Project, saya mau pesan **Sprei Tencel Set**, Queen, warna Sage. Masih ready?
```

Penulis lain (selain Iqbal Hamdani) ditambahkan di `AUTHORS` dalam `src/lib/blog.ts`,
lengkap dengan peran, bio, dan link LinkedIn.

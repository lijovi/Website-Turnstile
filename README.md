# TurnstileGate Indonesia

Website company profile dan katalog produk untuk **TurnstileGate Indonesia** — Solusi Keamanan Akses Terpercaya.

Website ini telah dimigrasikan menggunakan **Nuxt 4**, **Vue 3**, dan **Tailwind CSS v4** dengan desain yang modern, responsif, dinamis, dan teroptimasi SEO (Server-Side Rendering). Semua data konten (produk, kategori, portofolio, FAQ, testimoni, profil perusahaan) diatur menggunakan file JSON sehingga sangat mudah untuk di-update.

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3 Composition API & `<script setup>`)
- **Routing**: File-based Routing bawaan Nuxt
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/guide/packages/lucide-vue-next)
- **Bundler**: [Vite](https://vitejs.dev/) (Terintegrasi dengan Nuxt)
- **Package Manager**: [Bun](https://bun.sh/) (bisa juga menggunakan npm/pnpm/yarn)

## Struktur Data & Konten

Semua data website bisa diubah melalui folder `app/data/`:

- `company.json` : Profil perusahaan, kontak, jam operasional, link Google Maps.
- `navigation.json` : Pengaturan menu navigasi dan tombol CTA navbar.
- `hero.json` : Teks konten untuk banner utama di Beranda.
- `about.json` : Teks profil perusahaan (Sejarah, Visi, Misi).
- `products.json` : Database katalog produk (Nama produk, kategori, spesifikasi, galeri foto).
- `categories.json` : Daftar kategori produk.
- `projects.json` : Daftar portofolio klien/proyek.
- `testimonials.json` : Data testimoni klien.
- `faq.json` : Pertanyaan umum beserta jawabannya.
- `stats.json` : Angka pencapaian di Beranda (mis: jumlah instalasi, klien).

### Cara Menambah Produk & Kategori Baru
1. Jika ingin membuat kategori baru, tambahkan objek baru di `app/data/categories.json`.
2. Buka file `app/data/products.json` lalu tambahkan data produk baru dan pastikan properti `"category"` sesuai dengan *id* kategori yang baru.
3. Gambar produk bisa dimasukkan ke folder `app/assets/ProductImage/` dan nama filenya dipanggil pada properti `"image"`. Semua sistem pembacaan gambar sudah ditangani secara pintar berdasarkan nama file, jadi tidak perlu khawatir dengan perubahan *path* folder!

## Project Setup

Pastikan Anda sudah menginstal **Bun** (atau Node.js).

### Instalasi Dependensi
```bash
bun install
```

### Menjalankan Server Development (Hot-Reload)
```bash
bun run dev
```

### Build untuk Produksi (SSR & Compile)
```bash
bun run build
```

### Menjalankan Server Produksi
```bash
bun run start
```

### Generate Static Site (Pilihan Alternatif / SSG)
```bash
bun run generate
```

## Modifikasi Desain & Aset

- **Warna Utama**: Diatur secara global melalui file `app/assets/main.css` menggunakan variabel CSS (seperti `--color-success` untuk warna WhatsApp).
- **Gambar & Aset**: Seluruh gambar (foto proyek, perusahaan, banner) disimpan di dalam folder `app/assets/`.
- **Komponen**: Elemen UI yang sering digunakan berulang (seperti Tombol, Breadcrumb, Product Card) berada di dalam folder `app/components/`.
- **Halaman**: Konfigurasi dan *layout* halaman (*Routing*) diatur secara otomatis berdasarkan nama file yang ada di dalam folder `app/pages/`.
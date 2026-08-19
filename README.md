# Alvino Albas — Modern Full-Stack Portfolio

Website portofolio fullstack modern berbasis **Next.js 14 (App Router) + TypeScript + Tailwind CSS** dengan backend **Supabase** (Database, Auth, Storage, & RLS) dan sistem **2 Role** (Pengunjung & Admin).

---

## ✨ Fitur Utama

- **Craft Editorial Dark Theme:** Desain berkarakter tajam dengan latar Obsidian `#080B11`, surface cards elegan, dan aksen glowing *Cyber Emerald* `#10B981` & *Electric Amber* `#F59E0B`.
- **Data Nyata CV Alvino Albas:** Menampilkan karya unggulan seperti *Potongin (Barbershop Marketplace)*, *re:memory (Photobooth Web App)*, *Employee Leave System PT Semen Padang*, dan *Flutter Mobile Suite*.
- **Anti-AI Slop Copywriting:** Konten spesifik, padat, berorientasi hasil teknis nyata tanpa klise generik AI.
- **Sistem 2-Role:**
  - **Role 1 (Visitor / Public):** Akses landing page, showcase proyek dengan filter kategori, riwayat karier, matriks keahlian, dan form kontak interaktif.
  - **Role 2 (Admin / Owner):** Portal `/admin` terotentikasi Supabase Auth untuk CRUD proyek (lengkap dengan upload gambar ke Supabase Storage), edit profil bio/sosial media, dan inbox pesan masuk.
- **Supabase Backend:** Schema PostgreSQL, Row Level Security (RLS), Storage bucket `portfolio-media`, dan data seed awal di `supabase/schema.sql`.
- **Vercel Ready:** Optimal untuk deployment 1-klik di platform Vercel.

---

## 🚀 Panduan Memulai Cepat

### 1. Jalankan Lokal
```bash
# Jalankan development server
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

### 2. Hubungkan ke Supabase (Cloud Backend)

1. Buka [Supabase Dashboard](https://supabase.com/dashboard) dan buat project baru.
2. Buka menu **SQL Editor** &rarr; Buat query baru &rarr; Salin seluruh isi file [`supabase/schema.sql`](supabase/schema.sql) &rarr; Klik **Run**.
3. Buka menu **Project Settings &rarr; API**, lalu salin:
   - `Project URL`
   - `anon public key`
4. Masukkan ke file `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
5. Buka menu **Authentication &rarr; Users &rarr; Add User** di Supabase untuk membuat akun email & password Admin Anda.

---

### 3. Akses Admin Portal
- Kunjungi halaman `/admin/login` atau klik tombol **Admin** di header pojok kanan atas.
- Masuk dengan akun email dan password admin yang telah didaftarkan di Supabase.

---

### 4. Deploy ke Vercel

1. Push repository ini ke GitHub (`herplagi/pinoporto`).
2. Buka [Vercel Dashboard](https://vercel.com) &rarr; **Add New Project** &rarr; Pilih repository `pinoporto`.
3. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Klik **Deploy**!

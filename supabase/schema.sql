-- ==============================================================================
-- SUPABASE DATABASE SCHEMA & RLS POLICIES FOR PORTOFOLIO (ALVINO ALBAS)
-- ==============================================================================

-- 1. Create tables

-- Profile Table (Single row for website owner)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  headline TEXT NOT NULL,
  bio TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  available_for_hire BOOLEAN DEFAULT true,
  years_of_experience INT DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Projects Table (with background, core_tech, key_features, screenshots)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  background TEXT,
  image_url TEXT,
  screenshots TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'Fullstack',
  tags TEXT[] DEFAULT '{}',
  core_tech TEXT[] DEFAULT '{}',
  key_features TEXT[] DEFAULT '{}',
  metrics TEXT,
  status TEXT DEFAULT 'Completed',
  featured BOOLEAN DEFAULT false,
  is_private BOOLEAN DEFAULT false,
  confidentiality_note TEXT,
  live_url TEXT,
  github_url TEXT,
  github_repos JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  skills_used TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Frontend', 'Backend', 'Mobile', 'Database', 'DevOps & Tools', 'Architecture'
  proficiency INT DEFAULT 90, -- 1-100
  icon_name TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact Messages Table (Visitors can insert, only Admin can read/delete)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 3. DEFINE RLS POLICIES
-- ==============================================================================

-- PUBLIC POLICIES (Read-only for public portfolio visitors)
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Public projects are viewable by everyone" 
  ON public.projects FOR SELECT USING (true);

CREATE POLICY "Public experiences are viewable by everyone" 
  ON public.experiences FOR SELECT USING (true);

CREATE POLICY "Public skills are viewable by everyone" 
  ON public.skills FOR SELECT USING (true);

-- Visitors can insert contact messages, but CANNOT view or edit existing messages
CREATE POLICY "Anyone can submit a contact message" 
  ON public.messages FOR INSERT WITH CHECK (true);

-- ADMIN POLICIES (Full CRUD access for authenticated users / Admin)
CREATE POLICY "Admin full access on profiles" 
  ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access on projects" 
  ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access on experiences" 
  ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access on skills" 
  ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access on messages" 
  ON public.messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- 4. STORAGE BUCKET CONFIGURATION (portfolio-media)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read storage files
CREATE POLICY "Public can view portfolio media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

-- Authenticated users (Admin) can upload, update, and delete media
CREATE POLICY "Admin can upload portfolio media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portfolio-media');

CREATE POLICY "Admin can update portfolio media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'portfolio-media');

CREATE POLICY "Admin can delete portfolio media"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'portfolio-media');

-- ==============================================================================
-- 5. INITIAL SEED DATA (ALVINO ALBAS CV DATA WITH PROJECT PROOF & DETAILS)
-- ==============================================================================
INSERT INTO public.profiles (
  full_name,
  headline,
  bio,
  email,
  location,
  available_for_hire,
  years_of_experience,
  github_url,
  linkedin_url
) VALUES (
  'Alvino Albas',
  'Full-Stack Developer & Information Systems Graduate',
  'Information Systems Graduate from Andalas University, specializing in Full-Stack Web & Mobile Development. Experienced in building production systems with Laravel, Express.js, React Native, React.js, and Flutter.',
  'alvinoalbas@gmail.com',
  'Kuranji, Padang, West Sumatra, Indonesia',
  true,
  3,
  'https://github.com/alvinoalbas',
  'https://www.linkedin.com/in/alvinoalbas/'
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (
  title, 
  slug, 
  summary, 
  description, 
  background,
  category, 
  tags, 
  core_tech,
  key_features,
  metrics, 
  featured, 
  image_url,
  screenshots,
  live_url, 
  github_url, 
  sort_order
) VALUES
(
  'Potongin — Barbershop Marketplace Ecosystem',
  'potongin-marketplace',
  'Multi-platform barbershop marketplace ecosystem with React Native mobile app, React.js admin dashboard, and Express.js REST API.',
  'Engineered an end-to-end booking and service management marketplace. Built an Express.js RESTful API handling authentication and business logic, synchronized a centralized MySQL database across mobile and web platforms, and optimized operations using BPMN process analysis.',
  'Dikembangkan sebagai Tugas Akhir (Undergraduate Thesis) di Sistem Informasi Universitas Andalas. Proyek ini bertujuan untuk mengatasi inefisiensi sistem pemesanan dan manajemen antrean konvensional pada usaha barbershop dengan menyediakan ekosistem digital terintegrasi antara customer dan pemilik usaha.',
  'Fullstack & Mobile',
  ARRAY['React Native', 'React.js', 'Express.js', 'Node.js', 'MySQL', 'BPMN', 'REST API'],
  ARRAY['React Native (Mobile Customer App)', 'React.js (Web Admin & Merchant Dashboard)', 'Express.js & Node.js (RESTful API Server)', 'MySQL (Centralized Relational Database)', 'BPMN (Business Process Model & Notation)'],
  ARRAY['Pemesanan & penjadwalan antrean barbershop secara real-time via aplikasi mobile', 'Dashboard web admin untuk manajemen layanan, harga, capster, dan laporan transaksi', 'Autentikasi aman berbasis token JWT dan sinkronisasi data antar platform mobile & web', 'Analisis dan optimasi alur bisnis menggunakan standar notasi BPMN'],
  'React Native & Web Dashboard',
  true,
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80'
  ],
  NULL,
  'https://github.com/alvinoalbas',
  1
),
(
  're:memory — Web-Based Photobooth Application',
  'rememory-photobooth',
  'Collaborative web-based photobooth system for capturing, managing, and rendering digital memories at events.',
  'Co-developed a high-reliability event photobooth application utilizing PHP Laravel and MySQL. Designed normalized database schemas to handle active user sessions, photo metadata, and system logs, alongside building secure backend upload controllers.',
  'Dikembangkan sebagai proyek kolaboratif independen untuk menghadirkan pengalaman photobooth interaktif berbasis web pada berbagai event/acara. Sistem dirancang untuk menangani penangkapan foto digital, pemilihan template frame, dan pengelolaan metadata foto secara terorganisir.',
  'Fullstack',
  ARRAY['PHP Laravel', 'MySQL', 'JavaScript', 'TailwindCSS', 'REST API'],
  ARRAY['PHP Laravel (Backend Framework & MVC Controllers)', 'MySQL (Session, Photo Metadata, & Log Storage)', 'JavaScript & TailwindCSS (Interactive Frontend Interface)', 'REST API (Upload handling & Image processing pipelines)'],
  ARRAY['Antarmuka pengambilan dan pemilihan foto yang responsif dan user-friendly', 'Controller backend efisien untuk menangani upload gambar dan manajemen sesi pengguna', 'Skema database relasional untuk menyimpan metadata foto, timestamp, dan riwayat event', 'Sistem logging untuk memastikan keandalan pemrosesan foto selama event berlangsung'],
  'High-reliability event photo management',
  true,
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80'
  ],
  NULL,
  'https://github.com/alvinoalbas',
  2
),
(
  'Employee Leave Management System (PT Semen Padang)',
  'semen-padang-leave-system',
  'Enterprise employee leave request and approval portal built from the ground up for PT Semen Padang (SIG Group).',
  'Built a robust web application during internship at PT Semen Padang. Developed secure database schemas in MySQL, translated corporate HR business logic into automated request approval flows, and engineered an intuitive interface using Native PHP and Bootstrap.',
  'Dikerjakan saat menjalani program magang Web Developer di PT Semen Padang (pabrik semen tertua di Asia Tenggara, anak perusahaan SIG Group). Proyek ini menggantikan proses pengajuan izin/cuti karyawan yang sebelumnya manual menjadi sistem digital enterprise yang terotomatisasi.',
  'Web Applications',
  ARRAY['Native PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'Enterprise IT'],
  ARRAY['Native PHP (Vanilla Backend Architecture)', 'MySQL (Normalized Enterprise Employee & Leave Database)', 'Bootstrap & CSS (Enterprise Responsive UI)', 'JavaScript (Dynamic Form Validation & Approval State)'],
  ARRAY['Formulir digital pengajuan cuti dan izin kerja karyawan terstruktur', 'Alur persetujuan bertingkat (approval hierarchy) sesuai regulasi HR PT Semen Padang', 'Validasi kuota sisa cuti tahunan dan rekapitulasi riwayat pengajuan', 'Dashboard rekapitulasi data absensi dan izin untuk tim HR & IT'],
  'Enterprise Leave Portal',
  true,
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80'
  ],
  NULL,
  'https://github.com/alvinoalbas',
  3
),
(
  'Flutter Mobile Application Project',
  'flutter-mobile-app',
  'Cross-platform mobile application utilizing Flutter and Dart with reactive UI and REST API integration.',
  'Developed cross-platform mobile solutions in Flutter, connecting with external REST services, local SQLite caching, and modern Material Design aesthetics.',
  'Proyek eksplorasi dan pengembangan aplikasi mobile cross-platform berbasis Flutter/Dart untuk membangun aplikasi mobile yang mulus dengan arsitektur reaktif dan sinkronisasi data.',
  'Mobile',
  ARRAY['Flutter', 'Dart', 'Mobile Dev', 'REST API', 'SQLite'],
  ARRAY['Dart & Flutter (Cross-platform Framework)', 'SQLite (Local Mobile Caching & Offline Storage)', 'REST API Client (HTTP JSON serialization)', 'Material 3 Design System'],
  ARRAY['Antarmuka mobile modern dengan animasi transisi yang mulus', 'Penyimpanan lokal untuk dukungan offline menggunakan SQLite', 'Integrasi API backend dengan parsing data JSON yang efisien', 'Kompatibilitas penuh untuk Android dan iOS'],
  'Android & iOS Ready',
  false,
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80'
  ],
  NULL,
  'https://github.com/alvinoalbas',
  4
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.experiences (role, company, location, period, description, skills_used, sort_order) VALUES
(
  'Full Stack Developer (Undergraduate Thesis)',
  'Universitas Andalas',
  'Padang, Indonesia',
  'Oct 2025 — April 2026',
  'Led the architecture and fullstack development of Potongin, a barbershop marketplace ecosystem. Developed the React Native mobile app for customer bookings and React.js dashboard for admin management, supported by an Express.js API and MySQL database.',
  ARRAY['React Native', 'React.js', 'Express.js', 'Node.js', 'MySQL', 'BPMN'],
  1
),
(
  'Full Stack Developer (Independent Project)',
  'Independent Collaborative Project',
  'Padang, Indonesia',
  'Dec 2025 — Jan 2026',
  'Co-developed re:memory, an event-based photobooth web application. Designed the relational database schema for session tracking and photo metadata, and programmed backend upload controllers in PHP Laravel.',
  ARRAY['PHP Laravel', 'MySQL', 'Backend Architecture', 'JavaScript'],
  2
),
(
  'Web Developer Intern',
  'PT Semen Padang (SIG Group)',
  'Padang, West Sumatra, Indonesia',
  'Jan 2024 — Mar 2024',
  'Built a full-featured employee leave request web application from scratch using Native PHP, Bootstrap, and MySQL. Collaborated with the corporate IT team to translate business logic into a reliable internal system.',
  ARRAY['Native PHP', 'MySQL', 'Bootstrap', 'Enterprise IT'],
  3
),
(
  'Bachelor of Information Systems',
  'Universitas Andalas',
  'Padang, Indonesia',
  'Aug 2021 — April 2026',
  'Focused on Software Engineering, Database Systems, and IT Governance frameworks. Completed multiple software engineering and mobile development projects.',
  ARRAY['Software Engineering', 'IT Governance', 'MySQL', 'BPMN'],
  4
);

INSERT INTO public.skills (name, category, proficiency, sort_order) VALUES
('PHP (Laravel & Native)', 'Backend', 93, 1),
('Express.js & Node.js', 'Backend', 90, 2),
('JavaScript & TypeScript', 'Frontend', 92, 3),
('React.js & Next.js', 'Frontend', 90, 4),
('React Native', 'Mobile', 89, 5),
('Dart & Flutter', 'Mobile', 86, 6),
('MySQL & PostgreSQL', 'Database', 94, 7),
('Docker Containers', 'DevOps & Tools', 84, 8),
('Azure Cloud & Linux VMs', 'DevOps & Tools', 82, 9),
('Git & Version Control', 'DevOps & Tools', 90, 10),
('BPMN Process Analysis', 'Architecture', 88, 11);

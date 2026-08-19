import type { Metadata } from 'next';
import { Inter, Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alvino Albas — Full-Stack Web & Mobile Developer',
  description: 'Portfolio of Alvino Albas. Full-Stack Developer & Information Systems graduate from Andalas University, building production web & mobile systems with Laravel, Express.js, React Native, React.js, and Flutter.',
  keywords: ['Alvino Albas', 'Fullstack Developer', 'Laravel', 'Express.js', 'React Native', 'React.js', 'Flutter', 'MySQL', 'Next.js', 'Padang', 'Indonesia'],
  authors: [{ name: 'Alvino Albas' }],
  creator: 'Alvino Albas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://my-portfolio-omegablue-59.vercel.app/',
    title: 'Alvino Albas — Full-Stack Web & Mobile Developer',
    description: 'Scalable web and mobile engineering with Laravel, Express.js, React Native, and Flutter.',
    siteName: 'Alvino Albas Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alvino Albas — Full-Stack Developer',
    description: 'Scalable web and mobile engineering with Laravel, Express.js, React Native, and Flutter.',
  },
  icons: {
    icon: [
      { url: '/rick-favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: 'any' },
    ],
    shortcut: '/rick-favicon.png',
    apple: '/rick-favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans bg-background text-text-primary antialiased min-h-screen relative selection:bg-brand-emerald/20 selection:text-brand-emerald`}
      >
        {/* Subtle Ambient Mesh Glows */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-mesh-glow pointer-events-none z-0" />
        <div className="fixed top-1/3 right-0 w-[500px] h-[500px] bg-mesh-glow-amber pointer-events-none z-0 opacity-40" />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}

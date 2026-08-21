import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
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
    url: 'https://pinoporto.vercel.app/',
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
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-background text-text-primary antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

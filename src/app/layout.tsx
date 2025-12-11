import type { Metadata } from 'next';
import { Bowlby_One_SC, Poppins } from 'next/font/google';
import './globals.scss';

const bowlby = Bowlby_One_SC({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bowlby',
});

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'K.I.N.O Search',
  description: 'Chatbot pour rechercher des fichiers dans Google Drive',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${bowlby.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

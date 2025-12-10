import type { Metadata } from 'next';
import './globals.scss';

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
    <html lang="fr">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

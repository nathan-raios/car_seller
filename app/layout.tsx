import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'AutoPrestige - Vente de Véhicules Neufs et d\'Occasion',
  description:
    'Découvrez notre sélection exclusive de véhicules neufs et d\'occasion de prestige. Service haut de gamme et professionnel.',
  openGraph: {
    title: 'AutoPrestige - L\'Art de Conduire l\'Excellence',
    description:
      'Découvrez notre sélection exclusive de véhicules neufs et d\'occasion de prestige.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

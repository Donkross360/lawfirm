import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'UcheAnyanwu & Co. - Premier Law Firm',
  description: 'Exceptional legal services with integrity, expertise, and dedication to our clients\' success. Specializing in corporate law, M&A, intellectual property, and more.',
  keywords: 'law firm, attorney, legal services, corporate law, litigation, intellectual property',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
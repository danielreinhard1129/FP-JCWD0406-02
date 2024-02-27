import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { FooterComp } from '@/components/Footer';
import StoreProvider from './StoreProvider';
import { AuthContextProvider } from '../app/utils/context/authContext';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BORDL Smart Home',
  description: 'Web Penjualan Perangkat Rumah Pintar, Bukan Rumah "BORDIL"',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthContextProvider>
            <Navbar />
            {children}
            <Toaster
              duration={1500}
              expand={false}
              richColors
              position="top-right"
            />
            <FooterComp />
          </AuthContextProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

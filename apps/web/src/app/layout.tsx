import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { FooterComp } from '@/components/Footer';
import StoreProvider from './StoreProvider';
import { AuthContextProvider } from '../app/utils/context/authContext';
import { Toaster } from 'sonner';
import BottomNavbar from '@/components/navigations/components/Downbar';
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ['latin'] });

const clientId =
  '352320160630-9sk9lkbq2dvbb4f521ch0sv5b225ehe1.apps.googleusercontent.com';

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
          <GoogleOAuthProvider clientId="352320160630-9sk9lkbq2dvbb4f521ch0sv5b225ehe1.apps.googleusercontent.com">
            <AuthContextProvider>
              <Navbar />
              {children}
              <Toaster
                duration={1500}
                expand={false}
                richColors
                position="top-right"
              />
              <BottomNavbar />
              <FooterComp />
            </AuthContextProvider>
          </GoogleOAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

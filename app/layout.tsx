// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Next.js E-Commerce Store with Redux',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
            <div className="min-h-screen bg-gray-100">
              {/* <Header /> */}
              {children}
              <Toaster position='top-center' />
            </div>
        </Providers>
      </body>
    </html>
  );
}
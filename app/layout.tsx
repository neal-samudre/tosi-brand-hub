import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Tosi Brand Asset Hub',
  description: 'Internal brand asset library for Tosi Snacks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body text-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NerdWallet Coding Interview',
  description: 'NerdWallet Coding Interview',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

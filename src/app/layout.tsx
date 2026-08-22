import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yellow River Restaurant | Authentic Chinese Cuisine Nairobi',
  description: 'Experience genuine Lanzhou Beef Noodles, hand-crafted dumplings, and traditional Chinese dishes at Yellow River Restaurant on Kindaruma Rd, Nairobi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

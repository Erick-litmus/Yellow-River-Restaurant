import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://yellow-river-restaurant.vercel.app'),
  title: {
    default: 'Yellow River Restaurant | Authentic Chinese Cuisine & Lanzhou Noodles Nairobi',
    template: '%s | Yellow River Restaurant',
  },
  description: 'Yellow River Restaurant (黄河餐厅) - Nairobi’s top authentic Chinese restaurant serving hand-pulled Lanzhou beef noodles, dumplings, and flame-grilled skewers on Kindaruma Rd, Kilimani.',
  keywords: [
    'Yellow River Restaurant',
    'Yellow River Restaurant Nairobi',
    'Yellow River Restaurant Kilimani',
    'Yellow River Restaurant Menu',
    'Chinese Restaurant Nairobi',
    'Lanzhou Beef Noodles Nairobi',
    'Best Chinese food Kilimani',
    'Authentic Chinese Dumplings Nairobi',
    'Chinese Barbecue Nairobi',
    'Kindaruma Road Restaurants',
  ],
  authors: [{ name: 'Yellow River Restaurant' }],
  creator: 'Yellow River Restaurant',
  publisher: 'Yellow River Restaurant',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: 'https://yellow-river-restaurant.vercel.app/',
  },
  openGraph: {
    title: 'Yellow River Restaurant | Authentic Chinese Cuisine Nairobi',
    description: 'Experience genuine Lanzhou Beef Noodles, hand-crafted dumplings, and traditional Chinese barbecue at Yellow River Restaurant on Kindaruma Rd, Kilimani, Nairobi.',
    url: 'https://yellow-river-restaurant.vercel.app',
    siteName: 'Yellow River Restaurant',
    images: [
      {
        url: '/images/restaurant_hero.png',
        width: 1200,
        height: 630,
        alt: 'Yellow River Restaurant Storefront & Dining Area',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yellow River Restaurant | Authentic Chinese Cuisine Nairobi',
    description: 'Authentic Lanzhou beef noodles, dumplings, and Chinese BBQ at Yellow River Restaurant, Kindaruma Rd, Nairobi.',
    images: ['/images/restaurant_hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google6d33127da113c8a3',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Yellow River Restaurant',
  alternateName: '黄河餐厅',
  image: 'https://yellow-river-restaurant.vercel.app/images/restaurant_hero.png',
  '@id': 'https://yellow-river-restaurant.vercel.app/#restaurant',
  url: 'https://yellow-river-restaurant.vercel.app',
  telephone: '+254700000000',
  priceRange: 'KSh 600 - KSh 1500',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kindaruma Road, Kilimani',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi County',
    postalCode: '00100',
    addressCountry: 'KE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -1.2974,
    longitude: 36.7869,
  },
  servesCuisine: ['Chinese', 'Lanzhou Noodles', 'Dim Sum', 'Asian Barbecue'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:30',
      closes: '22:00',
    },
  ],
  hasMenu: 'https://yellow-river-restaurant.vercel.app/#menu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://yellow-river-restaurant.vercel.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

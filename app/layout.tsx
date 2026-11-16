import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Zerolt — Elite Freelancers & Automation Builders | Webflow, GoHighLevel, n8n, Shopify',
  description: 'Zerolt is a freelance collective building high-converting websites and marketing automations. We offer 50% lower market rates, 24/7 friend-first support, and proprietary automation platforms.',
  keywords: 'Zerolt, freelance agency, Webflow developer, GoHighLevel setup, n8n automation, affordable web design, LeadSpark marketing automation, Shopify Plus, Zoho CRM',
  authors: [{ name: 'Zerolt.com' }],
  robots: 'index, follow',
  metadataBase: new URL('https://zerolt.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    title: 'Zerolt — Elite Freelance Builders & Automation Specialists',
    description: 'We are not just an agency. We are freelance builders who work like friends on your team at fair market rates.',
    url: 'https://zerolt.com/',
    siteName: 'Zerolt',
    images: [
      {
        url: 'https://zerolt.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zerolt Web & Marketing Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zerolt — Elite Freelance Web & Automation Collective',
    description: 'Enterprise-grade Webflow, GHL, and n8n workflows at 50% lower market pricing.',
    images: ['https://zerolt.com/images/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#5e43f3" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Comfortaa:wght@600;700&family=Quicksand:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

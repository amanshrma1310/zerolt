import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Fredoka, Comfortaa, Quicksand } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-comfortaa',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
});

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
  openGraph: {
    type: 'website',
    title: 'Zerolt — Elite Freelance Builders & Automation Specialists',
    description: 'We are not just an agency. We are freelance builders who work like friends on your team at fair market rates.',
    url: 'https://zerolt.com/',
    siteName: 'Zerolt',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
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
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${fredoka.variable} ${comfortaa.variable} ${quicksand.variable}`}>
      <head>
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

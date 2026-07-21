import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://vithalvision.in"),

  title: {
    default:
      "Vithal Visions | Film Production, Virtual Production & Media-Tech Company India",
    template: "%s | Vithal Visions",
  },

  description:
    "Vithal Visions Private Limited is a film production, virtual production, post-production, and media-tech company in India. We create films, OTT content, music videos, and provide cutting-edge production technology solutions.",
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },
  keywords: [
    "film production company India",
    "virtual production studio India",
    "post production services India",
    "music production company India",
    "casting agency India",
    "film production Nagpur",
    "Vidarbha film production",
    "OTT production India",
    "Vithal Visions",
    "Kamal Meshram",
  ],

  authors: [
    {
      name: "Vithal Visions Private Limited",
    },
  ],

  creator: "Vithal Visions Private Limited",
  publisher: "Vithal Visions Private Limited",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vithalvision.in",
    siteName: "Vithal Visions",

    title:
      "Vithal Visions | Film Production, Virtual Production & Media-Tech Company India",

    description:
      "Creating Stories. Building Technology. Empowering Creators.",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vithal Visions Film Production Studio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vithal Visions | Film Production & Media-Tech Company",
    description:
      "Film production, virtual production, OTT content & music production India.",
    images: ["/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://vithalvision.in",
  },

  category: "entertainment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4DWBJRGB46"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4DWBJRGB46');
          `,
        }} />
      </head>
      <body className="bg-white text-gray-900 font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Spline_Sans,
  Spline_Sans_Mono,
  Fredoka,
  DM_Sans,
} from "next/font/google";
import { RESTAURANT } from "@/lib/data";
import { CartProvider } from "@/components/CartProvider";
import Texture from "@/components/Texture";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const sans = Spline_Sans({
  subsets: ["latin"],
  variable: "--font-spline",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-spline-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muestra.demo"),
  title: {
    default: `${RESTAURANT.name} · Brunch & Burgers en Sabaneta`,
    template: `%s · ${RESTAURANT.name}`,
  },
  description:
    "Pide directo, sin comisiones de terceros. Hamburguesas de autor, brunch y alitas en Sabaneta, Medellín. Domicilio, para recoger o en mesa.",
  keywords: [
    "hamburguesas Sabaneta",
    "brunch Medellín",
    "domicilios Sabaneta",
    "restaurante Muestra",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    title: `${RESTAURANT.name} · Brunch & Burgers`,
    description: "Pide directo y sin comisiones. Domicilio en el sur de Medellín.",
    siteName: RESTAURANT.name,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: RESTAURANT.name,
  servesCuisine: ["Burgers", "Brunch", "American"],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: RESTAURANT.address,
    addressLocality: "Sabaneta",
    addressRegion: "Antioquia",
    addressCountry: "CO",
  },
  telephone: RESTAURANT.phone,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: RESTAURANT.rating,
    reviewCount: RESTAURANT.reviewCount,
  },
  openingHours: "Tu-Su 11:00-21:30",
  acceptsReservations: "True",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-CO"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${fredoka.variable} ${dmsans.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Texture />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

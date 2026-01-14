import AppPreview from "@/components/AppPreview";
import Benefit from "@/components/Benefit";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function Home() {
  return (
    <div className="min-h-dvh bg-linear-to-b from-emerald-50 to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-black transition-colors text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NavBar />
      <Hero />
      <Features />
      <AppPreview />
      <Benefit />
      <CTA />
      <Footer />
    </div>
  );
}

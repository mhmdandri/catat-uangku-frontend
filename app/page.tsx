import AppPreview from "@/components/AppPreview";
import Benefit from "@/components/Benefit";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white">
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

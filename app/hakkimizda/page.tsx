import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "Hakkımızda | Kumbat Ajans®",
  description:
    "Kumbat Ajans: 2024'ten beri Ankara merkezli digital-first ajans. Kod, yapay zeka, otomasyon ve prodüksiyon tek çatı altında.",
};

export default function AboutPage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <AboutContent />
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}

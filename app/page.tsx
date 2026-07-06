import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FeaturedWork from "@/components/FeaturedWork";
import Statement from "@/components/Statement";
import Showcase from "@/components/Showcase";
import Services from "@/components/Services";
import Photography from "@/components/Photography";
import WebDesign from "@/components/WebDesign";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getSectionBackgrounds } from "@/lib/media";
import { getHeroVideoUrls } from "@/lib/capcut-hero";

export default function Home() {
  const heroVideos = getHeroVideoUrls();
  const sectionBackgrounds = getSectionBackgrounds();

  return (
    <SmoothScroll>
      <Loader />
      <Cursor />
      <Nav />
      <main>
        <Hero videos={heroVideos} />
        <Marquee />
        <FeaturedWork />
        <Statement />
        <Showcase />
        <Services />
        <Photography />
        <WebDesign />
        <Process bg={sectionBackgrounds.process} />
        <Marquee light />
        <Contact bg={sectionBackgrounds.contact} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { About } from "@/components/About";
import { Features } from "@/components/Features";
import { Menu } from "@/components/Menu";
import { Gallery } from "@/components/Gallery";
import { Locations } from "@/components/Locations";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MarqueeStrip />
        <About />
        <Features />
        <Menu />
        <Gallery />
        <Locations />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

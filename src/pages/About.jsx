import { useEffect } from "react";
import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import AboutEditorialIntro from "../components/AboutEditorialIntro";
import AboutCapabilitiesSection from "../components/AboutCapabilitiesSection";
import AboutCollaborationSection from "../components/AboutCollaborationSection";
import AboutPeopleSection from "../components/AboutPeopleSection";
import VerticalWheelCarousel from "../components/VerticalWheelCarousel";
import { WHEEL_SLIDES } from "../data/wheelSlidesData";

/**
 * TAVQO — About Page
 * 1. Global Navbar
 * 2. Cinematic full-width AboutHero section
 * 3. Spacious warm ivory (#F3F0E8) editorial introduction section
 * 4. Bold image-plus-editorial capabilities section (Electric Violet #5145D9)
 * 5. Pinned vertical 3D Ferris wheel presentation carousel
 * 6. Studio footer
 */
export default function About() {
  // Set SEO and document metadata
  useEffect(() => {
    document.title = "About TAVQO — Creative Technology Studio";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "We build websites, applications, digital products and intelligent systems that transform ideas into meaningful digital experiences."
      );
    }
  }, []);

  return (
    <div
      className="relative min-h-screen text-[#F5F4FF] overflow-x-hidden selection:bg-[#5268FF]/30 selection:text-white"
      style={{
        backgroundColor: "#07080D",
      }}
    >
      {/* 1. Global Navbar */}
      <Navbar currentRoute="about" isRevealed={true} />

      {/* Semantic H1 for SEO */}
      <h1 className="sr-only">
        About TAVQO — Creative Technology, Product Engineering & Digital Solutions Studio
      </h1>

      {/* 2. Cinematic About Hero Section */}
      <AboutHero />

      {/* 3. Spacious Editorial Introduction Section (Warm Ivory #F3F0E8) */}
      <AboutEditorialIntro />

      {/* 4. Bold Editorial Capabilities Section */}
      <AboutCapabilitiesSection />

      {/* 5. Built Through Collaboration Section (Custom Scroll Dissolve Reveal) */}
      <AboutCollaborationSection />

      {/* 6. The People Around TAVQO Carousel Section */}
      <AboutPeopleSection />

      {/* 6. Pinned Vertical 3D Ferris Wheel Carousel */}
      <VerticalWheelCarousel slides={WHEEL_SLIDES} />

      {/* 6. Post-Pin Studio Footer */}
      <footer className="relative z-20 w-full py-10 px-6 sm:px-10 lg:px-[6.5vw] bg-[#040508] border-t border-white/[0.08] text-white/60 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-3">
          <span className="text-white font-sans font-bold tracking-[0.2em]">TΛVQO</span>
          <span className="text-white/20">|</span>
          <span>© {new Date().getFullYear()} TAVQO STUDIO. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex items-center gap-6 text-[#8E8EA0] uppercase tracking-wider text-[11px]">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <a href="/about" className="text-white font-bold transition-colors">About</a>
          <a href="/#services" className="hover:text-white transition-colors">Services</a>
          <a href="/#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import AboutEditorialIntro from "../components/AboutEditorialIntro";
import AboutCapabilitiesSection from "../components/AboutCapabilitiesSection";
import AboutCollaborationSection from "../components/AboutCollaborationSection";
import Footer from "../components/Footer";

/**
 * TAVQO — About Page
 * 1. Global Navbar
 * 2. Cinematic full-width AboutHero section
 * 3. Spacious warm ivory (#F3F0E8) editorial introduction section
 * 4. Bold capabilities section (What We Build)
 * 5. Built Through Collaboration Section (Scroll Dissolve Reveal with 4 complete stages & 3D WebGL centerpieces)
 * 6. Official TAVQO Studio Footer
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

      {/* 5. Built Through Collaboration Section (Scroll Dissolve Reveal) */}
      <AboutCollaborationSection />

      {/* 6. Official TAVQO Studio Footer */}
      <Footer />
    </div>
  );
}

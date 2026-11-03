import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import AboutEditorialIntro from "../components/AboutEditorialIntro";
import AboutCapabilitiesSection from "../components/AboutCapabilitiesSection";
import AboutCollaborationSection from "../components/AboutCollaborationSection";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

/**
 * TAVQO — About Page
 * 1. Global Navbar
 * 2. Cinematic full-width AboutHero section (capsule-free)
 * 3. Spacious warm ivory (#F3F0E8) editorial introduction section
 * 4. Bold capabilities section (What We Build)
 * 5. Built Through Collaboration Section (Smooth Scroll Dissolve Reveal with 4 stages & 3D WebGL centerpieces)
 * 6. Official TAVQO Studio Footer
 *
 * Integrated with Lenis smooth scrolling and synchronized GSAP ticker for 60/120fps fluid transitions.
 */
export default function About() {
  const lenisRef = useRef(null);

  // Set SEO metadata and initialize Lenis smooth scroll
  useEffect(() => {
    document.title = "About TAVQO — Creative Technology Studio";
    window.scrollTo({ top: 0, behavior: "instant" });
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "We build websites, applications, digital products and intelligent systems that transform ideas into meaningful digital experiences."
      );
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
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

      {/* 5. Built Through Collaboration Section (Smooth Scroll Dissolve Reveal) */}
      <AboutCollaborationSection />

      {/* 6. Official TAVQO Studio Footer */}
      <Footer />
    </div>
  );
}

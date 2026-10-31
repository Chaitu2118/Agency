import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactHero from "../components/contact/ContactHero";
import ContactSection from "../components/contact/ContactSection";
import ContactProcess from "../components/contact/ContactProcess";
import ContactFAQ from "../components/contact/ContactFAQ";
import ContactCTA from "../components/contact/ContactCTA";

/**
 * TAVQO — Premium Contact Us Page (Enhanced with 3D UI Depth & Kinetic Typography)
 * 
 * 1. Global Navbar with "contact" route active
 * 2. Living ambient violet gradient background mesh (pure CSS, no 3D objects)
 * 3. Section 1: Cinematic Contact Hero with 3D Kinetic Typography & mouse parallax
 * 4. Section 2: Contact Information + 3D Tilt Glass Inquiry Form
 * 5. Section 3: "What Happens Next?" Process with 3D Tilt Phase Cards
 * 6. Section 4: Accordion FAQ with 3D Depth Elevations
 * 7. Section 5: Cinematic Final CTA with 3D Physical Button Depression
 * 8. TAVQO Studio Footer with giant watermark
 */
export default function Contact() {
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll and update document metadata
  useEffect(() => {
    document.title = "Contact TAVQO — Creative Technology Studio";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Have an idea? Let's make it happen. Start a project with TAVQO. We build websites, mobile apps, intelligent systems, and immersive digital experiences."
      );
    }

    // Scroll to top on initial page mount unless URL contains hash
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animId = requestAnimationFrame(raf);

    // If navigated with hash (e.g. /contact#inquiry-form)
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          lenis.scrollTo(el, { offset: -60, duration: 1.2 });
        }
      }, 200);
    }

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleStartProjectClick = () => {
    if (lenisRef.current) {
      const formEl = document.getElementById("inquiry-form");
      if (formEl) {
        lenisRef.current.scrollTo(formEl, { offset: -40, duration: 1.2 });
        return;
      }
    }
    const el = document.getElementById("inquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative min-h-screen text-[#F4F3FA] overflow-x-hidden selection:bg-[#8275FF] selection:text-[#050508] bg-[#050508]"
      style={{
        backgroundColor: "#050508",
      }}
    >
      {/* Living Ambient Violet Gradient Background Mesh (NO 3D OBJECTS) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      >
        <div
          className="absolute top-[8%] left-[18%] w-[950px] h-[950px] rounded-full blur-[170px] opacity-20 animate-violet-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(130, 117, 255, 0.24) 0%, rgba(23, 21, 47, 0.45) 55%, transparent 75%)",
          }}
        />
        <div
          className="absolute top-[52%] right-[8%] w-[900px] h-[900px] rounded-full blur-[170px] opacity-15 animate-indigo-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(82, 104, 255, 0.20) 0%, rgba(23, 21, 47, 0.5) 60%, transparent 80%)",
            animationDelay: "-8s",
          }}
        />
      </div>

      {/* 1. Global Studio Navbar */}
      <Navbar currentRoute="contact" isRevealed={true} />

      {/* Semantic H1 for SEO and screen readers */}
      <h1 className="sr-only">
        Contact TAVQO — Creative Technology, Product Engineering & Digital Solutions Studio
      </h1>

      {/* 2. Main Page Content */}
      <main className="relative z-10 w-full">
        {/* Section 1: Contact Hero */}
        <ContactHero onStartProjectClick={handleStartProjectClick} />

        {/* Section 2: Contact Information + Inquiry Form */}
        <ContactSection />

        {/* Section 3: What Happens Next? Process */}
        <ContactProcess />

        {/* Section 4: Accordion FAQ */}
        <ContactFAQ />

        {/* Section 5: Final CTA */}
        <ContactCTA />
      </main>

      {/* 3. Studio Footer */}
      <Footer />
    </div>
  );
}

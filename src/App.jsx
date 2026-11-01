import { useEffect, useRef, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/ServicesWithCube";
import AverageIsExpensive from "./components/AverageIsExpensive";
import ValuePropositionTrail from "./components/ValuePropositionTrail";
import GoodFit from "./components/GoodFit";
import Footer from "./components/Footer";

// Lazy-load secondary pages for optimal initial route performance
const About = lazy(() => import("./pages/About"));
const ServicesPage = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
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

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div
      className="relative min-h-screen text-[#F5F4FF] overflow-x-hidden bg-[#050508]"
      style={{
        backgroundColor: "#050508",
      }}
    >
      {/* 1. THE TAVQO EDITORIAL LUXURY NAVBAR */}
      <Navbar
        isRevealed={true}
        onNavigate={(href) => {
          if (lenisRef.current) {
            const offset = href === "#hero" ? 0 : -50;
            lenisRef.current.scrollTo(href, { duration: 1.2, offset });
          }
        }}
      />

      {/* 2. MAIN HOMEPAGE CONTENT — Directly visible with zero artificial delay */}
      <main className="opacity-100">
        {/* HERO SECTION */}
        <Hero isRevealed={true} />

        {/* SERVICES SECTION — Standardized 6 Services Showcase */}
        <Services />

        {/* AVERAGE IS EXPENSIVE — Why TAVQO Showcase */}
        <AverageIsExpensive />

        {/* VALUE PROPOSITION — Interactive Image Trail Editorial */}
        <ValuePropositionTrail />

        {/* GOOD FIT — Process & Fit Showcase */}
        <GoodFit />

        {/* FOOTER — Contact & Reference Design */}
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#050508]" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

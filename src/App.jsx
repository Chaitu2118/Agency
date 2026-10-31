import { useState, useCallback, useEffect, useRef } from "react";
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
import CinematicIntro from "./components/CinematicIntro";
import TheTavqoLogo from "./components/TheTavqoLogo";
import Preloader from "./components/Preloader";
import About from "./pages/About";
import ServicesPage from "./pages/Services";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHomepageRevealed, setIsHomepageRevealed] = useState(true);
  const [introKey, setIntroKey] = useState(1);
  const [isIntroRunning, setIsIntroRunning] = useState(false);
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

  // Pause Lenis scrolling during initial loading or logo intro replay
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isLoading || isIntroRunning) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isLoading, isIntroRunning]);

  // Preloader completion handler
  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Triggered when logo begins transitioning toward navbar
  const handleStartReveal = useCallback(() => {
    setIsHomepageRevealed(true);
  }, []);

  // Triggered when intro overlay completes and finishes handoff
  const handleIntroComplete = useCallback(() => {
    setIsIntroRunning(false);
  }, []);

  // Replay intro anytime (via button, footer, or navbar click)
  const handleReplayIntro = useCallback(() => {
    setIsHomepageRevealed(false);
    setIsIntroRunning(true);
    setIntroKey((prev) => prev + 1);
  }, []);

  return (
    <div
      className="relative min-h-screen text-[#F5F4FF] overflow-x-hidden bg-[#050508]"
      style={{
        backgroundColor: "#050508",
      }}
    >
      {/* 0. FULL-SCREEN LUXURY TYPOGRAPHY PRELOADER */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* 1. THE TAVQO ORGANIC CINEMATIC BRAND INTRO (Available on replay) */}
      {isIntroRunning && (
        <CinematicIntro
          key={introKey}
          forcePlay={true}
          onStartReveal={handleStartReveal}
          onComplete={handleIntroComplete}
        />
      )}

      {/* 2. THE TAVQO EDITORIAL LUXURY NAVBAR */}
      <Navbar
        isRevealed={isHomepageRevealed}
        onReplayIntro={handleReplayIntro}
        onNavigate={(href) => {
          if (lenisRef.current) {
            const offset = href === "#hero" ? 0 : -50;
            lenisRef.current.scrollTo(href, { duration: 1.2, offset });
          }
        }}
      />

      {/* 3. MAIN HOMEPAGE CONTENT */}
      <main
        className={`transition-opacity duration-700 ease-out ${
          isHomepageRevealed ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* HERO SECTION */}
        <Hero isRevealed={isHomepageRevealed} />

        {/* ========================================================= */}
        {/* SERVICES SECTION — Standardized 6 Services Showcase       */}
        {/* ========================================================= */}
        <Services />

        {/* ========================================================= */}
        {/* AVERAGE IS EXPENSIVE — Why TAVQO Showcase                 */}
        {/* ========================================================= */}
        <AverageIsExpensive />

        {/* ========================================================= */}
        {/* VALUE PROPOSITION — Interactive Image Trail Editorial     */}
        {/* ========================================================= */}
        <ValuePropositionTrail />

        {/* ========================================================= */}
        {/* GOOD FIT — Process & Fit Showcase                         */}
        {/* ========================================================= */}
        <GoodFit />

        {/* ========================================================= */}
        {/* FOOTER — Contact & Reference Design                       */}
        {/* ========================================================= */}
        <Footer onReplayIntro={handleReplayIntro} />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

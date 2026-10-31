import { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import { Check, Mail, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OneVisionSection from "../components/OneVisionSection";

/**
 * ManifestoTypingSection
 * Natural, viewport-triggered typewriter effect on the bold auto-layout headline only.
 * The supporting paragraph is rendered as clean static typography (no typewriter).
 * - Highlights "DIGITAL EXPERIENCES" in TAVQO's signature violet-purple (#8275FF).
 * - Pulsing insertion cursor follows the active typing stream and disappears on completion.
 */
const MANIFESTO_HEADLINE = "WE HELP TURN IDEAS INTO DIGITAL EXPERIENCES THAT MOVE BUSINESSES FORWARD.";
const MANIFESTO_PARAGRAPH = "TAVQO is a creative technology studio building websites, mobile applications and intelligent digital solutions. We combine thoughtful design, modern engineering and emerging technologies to turn ideas into meaningful products.";

function ManifestoTypingSection() {
  const [headlineCount, setHeadlineCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isHeadlineDone, setIsHeadlineDone] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHeadlineCount(MANIFESTO_HEADLINE.length);
      setIsHeadlineDone(true);
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 1. Headline typing effect (only on the bold auto-layout headline)
  useEffect(() => {
    if (!hasStarted) return;

    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      setHeadlineCount(idx);
      if (idx >= MANIFESTO_HEADLINE.length) {
        clearInterval(interval);
        setIsHeadlineDone(true);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [hasStarted]);

  // Dynamic slices for headline with #8275FF accent on "DIGITAL EXPERIENCES" (indices 24 to 43)
  const part1 = MANIFESTO_HEADLINE.slice(0, Math.min(headlineCount, 24));
  const partHighlight = headlineCount > 24 ? MANIFESTO_HEADLINE.slice(24, Math.min(headlineCount, 43)) : "";
  const part2 = headlineCount > 43 ? MANIFESTO_HEADLINE.slice(43, headlineCount) : "";

  return (
    <section
      ref={sectionRef}
      aria-label="TAVQO Studio Manifesto"
      className="relative w-full bg-[#FAFAFC] py-24 sm:py-32 md:py-40 lg:py-48 px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-center border-t border-black/[0.04] min-h-[440px]"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center w-full">
        {/* Natural Responsive Headline with Typing Effect */}
        <h2 className="font-sans font-black tracking-[-0.035em] text-[32px] sm:text-[46px] md:text-[58px] lg:text-[70px] xl:text-[76px] text-[#09090D] leading-[1.05] sm:leading-[1.0] lg:leading-[0.98] uppercase select-none m-0 p-0 max-w-5xl">
          <span>{part1}</span>
          {partHighlight && <span className="text-[#8275FF]">{partHighlight}</span>}
          <span>{part2}</span>
          {!isHeadlineDone && hasStarted && (
            <span
              aria-hidden="true"
              className="inline-block w-[3px] sm:w-[4px] h-[0.9em] bg-[#8275FF] ml-1.5 align-middle animate-pulse"
            />
          )}
        </h2>

        {/* Supporting Paragraph — Static Clean Typography (No Typewriter) */}
        <p
          className={`mt-8 sm:mt-10 md:mt-12 max-w-2xl font-sans text-[16px] sm:text-[18px] md:text-[20px] text-[#777681] leading-[1.65] font-normal text-center transition-opacity duration-700 ${
            hasStarted ? "opacity-100" : "opacity-0"
          }`}
        >
          {MANIFESTO_PARAGRAPH}
        </p>
      </div>
    </section>
  );
}

/**
 * TAVQO — Services Page
 * 
 * Hero Section:
 * - Off-white canvas (#FAFAFC) with bold editorial hierarchy.
 * - Headline: "IDEAS ENGINEERED INTO REALITY." (REALITY highlighted in #8275FF).
 * - Supporting copy: "We design, develop and deliver digital experiences that help businesses grow, adapt and lead."
 * - CTA: "Explore Our Services ↗" linking to catalog.
 * - Oversized proportional TAVQO bottom wordmark.
 */

/**
 * VerticalCapabilitiesSelector
 * Minimal interactive vertical service selector inspired by high-end design studio typography.
 * - Full-width near-black canvas (#0B0B10).
 * - Left/top: Small label "TAVQO / CAPABILITIES", large heading "WHAT WE BUILD.", progress counter "03 / 08".
 * - Main selector: 8 vertical services with smooth centering translation.
 * - Active service: pure white text, violet-blue (#6257F5) number and indicator, revealed description and arrow.
 * - Inactive services: muted grey, reduced opacity, subtle blur.
 * - Natural mouse-wheel navigation within boundaries without hijacking page scroll.
 * - Pointer hover and click selection.
 * - Touch swipe / tap support for mobile.
 * - Full keyboard navigation and reduced-motion support.
 */
const VERTICAL_SERVICES = [
  {
    num: "01",
    title: "Web Development",
    description: "We build high-performance websites and web applications tailored to business needs.",
  },
  {
    num: "02",
    title: "Mobile Applications",
    description: "Scalable mobile experiences for Android and iOS, designed around real user needs.",
  },
  {
    num: "03",
    title: "UI/UX & Product Design",
    description: "Thoughtful interfaces and intuitive experiences that make digital products easier to use.",
  },
  {
    num: "04",
    title: "Product Engineering",
    description: "From product architecture to development, we turn concepts into functional solutions.",
  },
  {
    num: "05",
    title: "Backend & API Integration",
    description: "Reliable backend systems, APIs and integrations that connect your digital ecosystem.",
  },
  {
    num: "06",
    title: "AI & Automation",
    description: "Practical AI solutions and intelligent workflows that reduce manual effort and improve efficiency.",
  },
  {
    num: "07",
    title: "IoT & Smart Systems",
    description: "Connected devices and intelligent systems that bring physical and digital environments together.",
  },
  {
    num: "08",
    title: "Immersive 3D Experiences",
    description: "Interactive 3D environments, motion and immersive web experiences.",
  },
];

function VerticalCapabilitiesSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const containerRef = useRef(null);
  const listWrapperRef = useRef(null);
  const itemRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const isWheelingRef = useRef(false);
  const wheelTimeoutRef = useRef(null);
  const touchStartYRef = useRef(null);
  const touchStartXRef = useRef(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  // Compute exact vertical offset to center the active item within the container viewport
  const updateOffset = useCallback(() => {
    if (!containerRef.current || !itemRefs.current[activeIndex]) return;
    const container = containerRef.current;
    const activeItem = itemRefs.current[activeIndex];

    const containerHeight = container.clientHeight;
    const itemTop = activeItem.offsetTop;
    const itemHeight = activeItem.clientHeight;

    const targetOffset = (containerHeight / 2) - (itemTop + itemHeight / 2);
    setOffsetY(targetOffset);
  }, [activeIndex]);

  useLayoutEffect(() => {
    updateOffset();
  }, [updateOffset, activeIndex]);

  useEffect(() => {
    const handleResize = () => updateOffset();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(updateOffset, 100);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [updateOffset]);

  // Non-hijacking Wheel Navigation: allows natural page scroll at boundaries
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      const delta = e.deltaY;
      if (Math.abs(delta) < 16) return;

      const now = Date.now();
      const isCooldown = now - lastWheelTimeRef.current < 420;

      // Scrolling DOWN
      if (delta > 0) {
        if (activeIndexRef.current < VERTICAL_SERVICES.length - 1) {
          // Within selector bounds: consume wheel and advance
          e.preventDefault();
          isWheelingRef.current = true;
          clearTimeout(wheelTimeoutRef.current);
          wheelTimeoutRef.current = setTimeout(() => {
            isWheelingRef.current = false;
          }, 450);

          if (!isCooldown) {
            lastWheelTimeRef.current = now;
            setActiveIndex((prev) => Math.min(VERTICAL_SERVICES.length - 1, prev + 1));
          }
        } else {
          // At bottom boundary (service 08): DO NOT preventDefault, let native page scroll take over
          isWheelingRef.current = false;
        }
      }
      // Scrolling UP
      else if (delta < 0) {
        if (activeIndexRef.current > 0) {
          // Within selector bounds: consume wheel and move back
          e.preventDefault();
          isWheelingRef.current = true;
          clearTimeout(wheelTimeoutRef.current);
          wheelTimeoutRef.current = setTimeout(() => {
            isWheelingRef.current = false;
          }, 450);

          if (!isCooldown) {
            lastWheelTimeRef.current = now;
            setActiveIndex((prev) => Math.max(0, prev - 1));
          }
        } else {
          // At top boundary (service 01): DO NOT preventDefault, let native page scroll take over
          isWheelingRef.current = false;
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Hover selection (active only when not currently in wheel animation)
  const handleItemHover = (idx) => {
    if (isWheelingRef.current) return;
    setActiveIndex(idx);
  };

  // Keyboard Navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(VERTICAL_SERVICES.length - 1, prev + 1));
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(VERTICAL_SERVICES.length - 1);
    }
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartYRef.current = e.touches[0].clientY;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartYRef.current === null) return;
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;

    if (Math.abs(deltaY) > 35 && Math.abs(deltaY) > Math.abs(deltaX) * 1.2) {
      if (deltaY > 0 && activeIndex < VERTICAL_SERVICES.length - 1) {
        setActiveIndex((prev) => Math.min(VERTICAL_SERVICES.length - 1, prev + 1));
      } else if (deltaY < 0 && activeIndex > 0) {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    }
    touchStartYRef.current = null;
    touchStartXRef.current = null;
  };

  return (
    <section
      id="what-we-build"
      aria-label="What We Build — TAVQO Capabilities Selector"
      className="relative w-full bg-white text-[#09090D] py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden select-none border-t border-black/[0.06]"
    >
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Editorial Anchor Column */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h2 className="font-sans font-black tracking-[-0.04em] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] text-[#09090D] uppercase leading-[0.92] select-none m-0 p-0">
            WHAT WE<br />
            <span>BUILD.</span>
          </h2>

          <p className="mt-6 sm:mt-8 font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#777681] leading-[1.65] max-w-md font-normal">
            We combine thoughtful design, modern engineering and emerging technologies to build high-performance websites, scalable applications and intelligent digital solutions.
          </p>
        </div>

        {/* Right Main Selector Viewport */}
        <div
          ref={containerRef}
          tabIndex={0}
          role="region"
          aria-label="Capabilities Service Selector"
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="lg:col-span-7 relative h-[520px] sm:h-[580px] lg:h-[640px] w-full overflow-hidden flex items-center select-none outline-none"
        >
          {/* Top Subtle Vignette */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-white to-transparent z-20" />

          {/* Bottom Subtle Vignette */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-white to-transparent z-20" />

          {/* Inner Translating List Wrapper */}
          <div
            ref={listWrapperRef}
            className="relative w-full will-change-transform"
            style={{
              transform: `translate3d(0, ${offsetY}px, 0)`,
              transition: prefersReducedMotion ? "none" : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {VERTICAL_SERVICES.map((item, idx) => {
              const isActive = idx === activeIndex;
              const dist = Math.abs(idx - activeIndex);

              let titleClass = "";
              let numberClass = "";

              if (isActive) {
                titleClass = "text-[#09090D] font-black text-2xl sm:text-3xl md:text-4xl lg:text-[44px]";
                numberClass = "text-[#09090D]";
              } else if (dist === 1) {
                titleClass = "text-[#09090D]/40 font-bold text-xl sm:text-2xl md:text-3xl lg:text-[34px] group-hover:text-[#09090D]/70";
                numberClass = "text-[#09090D]/30 group-hover:text-[#09090D]/50";
              } else {
                titleClass = "text-[#09090D]/20 font-semibold text-lg sm:text-xl md:text-2xl lg:text-[28px] group-hover:text-[#09090D]/40";
                numberClass = "text-[#09090D]/15 group-hover:text-[#09090D]/30";
              }

              return (
                <div
                  key={item.num}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  role="button"
                  tabIndex={0}
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => handleItemHover(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }
                  }}
                  className="group py-4 sm:py-5 lg:py-6 transition-all duration-400 ease-out cursor-pointer"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    {/* Service Number (Black) */}
                    <span
                      className={`font-sans text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300 shrink-0 ${numberClass}`}
                    >
                      {item.num}
                    </span>

                    {/* Service Title & Active Description */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3
                          className={`font-sans tracking-[-0.03em] transition-all duration-300 leading-tight ${titleClass}`}
                        >
                          {item.title}
                        </h3>

                        {/* Minimal Directional Arrow (Active Service only) */}
                        {isActive && (
                          <a
                            href="#booking"
                            aria-label={`Inquire about ${item.title}`}
                            className="text-[#09090D]/60 hover:text-[#09090D] transition-colors text-xl sm:text-2xl md:text-3xl font-light transform -translate-y-0.5 shrink-0"
                          >
                            ↗
                          </a>
                        )}
                      </div>

                      {/* Active Service Description */}
                      {isActive && (
                        <div className="mt-3 sm:mt-4 max-w-xl transition-all duration-400 ease-out">
                          <p className="font-sans text-[15px] sm:text-[16px] text-[#777681] leading-[1.65] font-normal">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default function ServicesPage() {
  const [selectedInquiryPill, setSelectedInquiryPill] = useState("Web App");
  const [isCopied, setIsCopied] = useState(false);
  const [wordmarkRevealed, setWordmarkRevealed] = useState(false);

  useEffect(() => {
    document.title = "Services — TAVQO | Creative Technology Studio";
    window.scrollTo({ top: 0, behavior: "instant" });
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore TAVQO's core services: Web Development, Mobile Apps, Product Engineering, AI Automation, IoT Smart Systems, and Immersive 3D Experiences."
      );
    }
    const timer = setTimeout(() => setWordmarkRevealed(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@tavqo.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFC] text-[#09090D] selection:bg-[#8275FF] selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. Global TAVQO Navbar */}
      <Navbar currentRoute="services" isRevealed={true} />

      {/* =================================================================== */}
      {/* 2. SERVICES HERO SECTION (EXACT 100SVH THREE-ZONE COMPOSITION)      */}
      {/* =================================================================== */}
      <section
        aria-label="TAVQO Services Hero"
        className="relative w-full h-[100svh] min-h-[640px] max-h-[100svh] flex flex-col justify-between bg-[#FAFAFC] text-[#09090D] select-none overflow-hidden pt-20 sm:pt-24 lg:pt-26 pb-0"
      >
        {/* Middle Content Area: Clean Editorial Headline & Copy */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:pl-[5.5vw] lg:pr-[5.5vw] my-auto">
          <div className="max-w-2xl flex flex-col justify-end">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] mb-4 sm:mb-5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8275FF]" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#09090D] font-semibold">
                TAVQO DIGITAL STUDIO
              </span>
            </div>

            <h1 className="font-sans font-black tracking-[-0.04em] text-[48px] sm:text-[64px] md:text-[76px] lg:text-[84px] xl:text-[92px] text-[#09090D] leading-[0.88] uppercase select-none m-0 p-0">
              IDEAS<br />
              ENGINEERED<br />
              INTO <span className="text-[#8275FF]">REALITY.</span>
            </h1>
            
            <p className="mt-5 sm:mt-6 max-w-[460px] font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#777681] leading-[1.45] font-normal">
              We design, develop and deliver digital experiences that help businesses grow, adapt and lead.
            </p>

            <div className="mt-6 sm:mt-8">
              <a
                href="#what-we-build"
                className="group inline-flex items-center gap-2.5 font-sans text-[15px] sm:text-[16px] font-semibold text-[#09090D] hover:text-[#8275FF] transition-colors duration-200 cursor-pointer"
              >
                <span className="border-b-2 border-[#09090D]/30 group-hover:border-[#8275FF] pb-0.5 transition-colors">
                  Explore Our Services
                </span>
                <span className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200 text-base">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Hero Title: Oversized Elaborate Wordmark Anchored to Bottom */}
        <div className="relative z-10 w-full overflow-hidden select-none pb-0 pt-0 flex items-end justify-center pointer-events-none shrink-0">
          <div
            className={`font-sans font-black tracking-[-0.04em] text-[17vw] sm:text-[18.5vw] md:text-[19.5vw] lg:text-[21vw] leading-[0.72] text-[#09090D] uppercase m-0 p-0 whitespace-nowrap transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              wordmarkRevealed
                ? "translate-y-[18%] sm:translate-y-[20%] opacity-100"
                : "translate-y-[85%] opacity-0"
            }`}
          >
            T<span className="inline-block transform scale-y-[0.96]">Λ</span>VQO
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. EDITORIAL INTRODUCTION SECTION WITH DYNAMIC TYPING EFFECT        */}
      {/* =================================================================== */}
      <ManifestoTypingSection />

      {/* =================================================================== */}
      {/* 3. WHAT WE BUILD — MINIMAL INTERACTIVE VERTICAL SELECTOR            */}
      {/* =================================================================== */}
      <VerticalCapabilitiesSelector />

      {/* =================================================================== */}
      {/* 4. ONE VISION. EVERY LAYER. — CINEMATIC 3D SCROLL EXPERIENCE        */}
      {/* =================================================================== */}
      <OneVisionSection />

      {/* =================================================================== */}
      {/* 5. CONSULTATION & "BOOK AN APPOINTMENT" INTERACTIVE SECTION          */}
      {/* =================================================================== */}
      <section
        id="booking"
        className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#0A0A0F] text-white overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div
              aria-hidden="true"
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] opacity-25 bg-[#5268FF] pointer-events-none"
            />

            <div className="relative z-10 max-w-2xl">
              <span className="font-mono text-xs tracking-[0.24em] uppercase text-[#8577FF] font-semibold block mb-3">
                03 / START A CONVERSATION
              </span>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
                Have an ambitious product in mind?
              </h2>
              <p className="font-sans text-[15px] sm:text-[16px] text-white/70 leading-relaxed font-light mb-8">
                Whether you need a complete ground-up platform, a mobile runtime, an AI workflow, or an immersive 3D spectacle — let's review your goals and map the path forward.
              </p>

              {/* Inquiry Discipline Selector Pills */}
              <div className="mb-8">
                <span className="font-mono text-[11px] tracking-wider uppercase text-white/40 block mb-3">
                  I am looking for:
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Web App", "Mobile App", "AI & Automation", "Product Engineering", "IoT System", "3D Experience"].map((pill) => (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => setSelectedInquiryPill(pill)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                        selectedInquiryPill === pill
                          ? "bg-[#5268FF] text-white font-semibold shadow-[0_0_12px_rgba(82,104,255,0.4)]"
                          : "bg-white/[0.06] text-white/70 hover:bg-white/[0.12]"
                      }`}
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={`mailto:hello@tavqo.com?subject=Project Inquiry — ${encodeURIComponent(selectedInquiryPill)}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0A0A0F] font-sans text-sm font-semibold hover:bg-[#EAE8FA] transition-all duration-200 shadow-md active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 text-[#5268FF]" />
                  <span>Book an Appointment</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-sans text-sm font-medium hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4 text-white/60" />
                  <span>{isCopied ? "Email Copied!" : "hello@tavqo.com"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6. OFFICIAL TAVQO STUDIO FOOTER                                     */}
      {/* =================================================================== */}
      <Footer />

    </div>
  );
}


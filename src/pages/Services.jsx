import { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OneVisionSection from "../components/OneVisionSection";

gsap.registerPlugin(ScrollTrigger);

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
  const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [headlineCount, setHeadlineCount] = useState(() => isReducedMotion ? MANIFESTO_HEADLINE.length : 0);
  const [hasStarted, setHasStarted] = useState(() => isReducedMotion);
  const [isHeadlineDone, setIsHeadlineDone] = useState(() => isReducedMotion);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion) return;

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
  }, [isReducedMotion]);

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
      className="relative w-full bg-[#FAFAFC] pt-20 sm:pt-28 md:pt-32 pb-10 sm:pb-14 md:pb-16 px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-center border-t border-black/[0.04]"
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
          className={`mt-6 sm:mt-8 md:mt-10 max-w-2xl font-sans text-[16px] sm:text-[18px] md:text-[20px] text-[#777681] leading-[1.65] font-normal text-center transition-opacity duration-700 ${hasStarted ? "opacity-100" : "opacity-0"
            }`}
        >
          {MANIFESTO_PARAGRAPH}
        </p>
      </div>
    </section>
  );
}

/**
 * VerticalCapabilitiesSelector
 * Minimal interactive vertical service selector inspired by high-end design studio typography.
 * - Left: Editorial header "WHAT WE BUILD." with supporting studio overview.
 * - Right: 8 vertical services with smooth centering translation.
 * - Pinned scroll experience (GSAP ScrollTrigger): Section sticks to viewport until user reaches
 *   08 Immersive 3D Experiences, advancing smoothly step-by-step with scroll progress.
 * - Releases cleanly to subsequent page content when the final capability is completed.
 * - Active service: prominent deep black text, revealed description, directional arrow.
 * - Inactive services: cleanly muted.
 * - Click and keyboard selection smoothly scrolls to that service.
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

  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const listWrapperRef = useRef(null);
  const itemRefs = useRef([]);
  const scrollTriggerRef = useRef(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Compute exact vertical offset to center the active item within the container viewport
  const updateOffset = useCallback(() => {
    if (!containerRef.current || !itemRefs.current[activeIndex]) return;
    const container = containerRef.current;
    const activeItem = itemRefs.current[activeIndex];

    const containerHeight = container.clientHeight;
    const itemTop = activeItem.offsetTop;
    const itemHeight = activeItem.clientHeight;

    const targetOffset = containerHeight / 2 - (itemTop + itemHeight / 2);
    setOffsetY(targetOffset);
  }, [activeIndex]);

  useLayoutEffect(() => {
    updateOffset();
    const rafId = requestAnimationFrame(updateOffset);
    return () => cancelAnimationFrame(rafId);
  }, [updateOffset, activeIndex]);

  useEffect(() => {
    const handleResize = () => {
      updateOffset();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateOffset]);

  // STICK WHAT WE BUILD UNTIL IT REACHES 08 IMMERSIVE 3D EXPERIENCES (DESKTOP ONLY)
  // Uses GSAP ScrollTrigger timeline with smooth scrub damping and entry/exit buffers
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // DESKTOP (>= 1024px): Pinned capabilities scrubber
    mm.add("(min-width: 1024px)", () => {
      const pinDistance = (VERTICAL_SERVICES.length - 1) * 380;
      const scrollProxy = { progress: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${pinDistance}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger;

      tl.to(scrollProxy, {
        progress: 1,
        ease: "none",
        duration: 1,
        onUpdate: () => {
          const p = scrollProxy.progress;
          const ENTRY_BUFFER = 0.08;
          const EXIT_BUFFER = 0.14;
          const ACTIVE_RANGE = 1 - ENTRY_BUFFER - EXIT_BUFFER;

          const normalizedProgress =
            p <= ENTRY_BUFFER
              ? 0
              : p >= 1 - EXIT_BUFFER
                ? 1
                : (p - ENTRY_BUFFER) / ACTIVE_RANGE;

          const rawIndex = Math.floor(normalizedProgress * VERTICAL_SERVICES.length);
          const nextIndex = Math.min(
            VERTICAL_SERVICES.length - 1,
            Math.max(0, rawIndex)
          );
          setActiveIndex(nextIndex);
        },
      });
    });

    // MOBILE & TABLET (< 1024px): Interactive touch selector without pinned trap
    mm.add("(max-width: 1023px)", () => {
      scrollTriggerRef.current = null;
    });

    return () => mm.revert();
  }, []);

  // Clicking a service smoothly scrolls to its pinned position within the timeline on desktop
  const handleItemClick = (idx) => {
    setActiveIndex(idx);
    if (scrollTriggerRef.current && window.innerWidth >= 1024) {
      const st = scrollTriggerRef.current;
      const ENTRY_BUFFER = 0.08;
      const EXIT_BUFFER = 0.14;
      const ACTIVE_RANGE = 1 - ENTRY_BUFFER - EXIT_BUFFER;
      const normalizedSlot = (idx + 0.5) / VERTICAL_SERVICES.length;
      const targetP = ENTRY_BUFFER + normalizedSlot * ACTIVE_RANGE;
      const targetScroll = st.start + targetP * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="what-we-build"
      aria-label="What We Build — TAVQO Capabilities Selector"
      className="relative w-full min-h-screen lg:h-screen bg-white text-[#09090D] px-6 sm:px-10 lg:px-16 overflow-visible lg:overflow-hidden select-none border-t border-black/[0.06] flex items-center justify-center py-16 lg:py-0"
    >
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
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
          className="lg:col-span-7 relative h-[480px] sm:h-[540px] lg:h-[600px] w-full overflow-hidden flex items-center select-none outline-none"
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

              const titleClass = isActive
                ? "text-[#09090D] font-black text-2xl sm:text-3xl md:text-4xl lg:text-[44px]"
                : dist === 1
                  ? "text-[#09090D]/40 font-bold text-xl sm:text-2xl md:text-3xl lg:text-[34px] group-hover:text-[#09090D]/70"
                  : "text-[#09090D]/20 font-semibold text-lg sm:text-xl md:text-2xl lg:text-[28px] group-hover:text-[#09090D]/40";

              const numberClass = isActive
                ? "text-[#09090D]"
                : dist === 1
                  ? "text-[#09090D]/30 group-hover:text-[#09090D]/50"
                  : "text-[#09090D]/15 group-hover:text-[#09090D]/30";

              return (
                <div
                  key={item.num}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  role="button"
                  tabIndex={0}
                  aria-selected={isActive}
                  onClick={() => handleItemClick(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleItemClick(idx);
                    }
                  }}
                  className="group py-4 sm:py-5 lg:py-6 transition-all duration-400 ease-out cursor-pointer"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    {/* Service Number */}
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
                            href="/contact"
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
            className={`font-sans font-black tracking-[-0.04em] text-[17vw] sm:text-[18.5vw] md:text-[19.5vw] lg:text-[21vw] leading-[0.72] text-[#09090D] uppercase m-0 p-0 whitespace-nowrap transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${wordmarkRevealed
                ? "translate-y-[18%] sm:translate-y-[20%] opacity-100"
                : "translate-y-[85%] opacity-0"
              }`}
          >
            T<span className="inline-block transform scale-y-[0.96]">Λ</span>VQO
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. EDITORIAL INTRODUCTION SECTION WITH DYNAMIC TYPING EFFECT        */}
      {/* =================================================================== */}
      <ManifestoTypingSection />

      {/* =================================================================== */}
      {/* 4. WHAT WE BUILD — PINNED SCROLL CAPABILITIES SELECTOR              */}
      {/* =================================================================== */}
      <VerticalCapabilitiesSelector />

      {/* =================================================================== */}
      {/* 5. ONE VISION. EVERY LAYER. — CINEMATIC 3D SCROLL EXPERIENCE        */}
      {/* =================================================================== */}
      <OneVisionSection />

      {/* =================================================================== */}
      {/* 6. OFFICIAL TAVQO STUDIO FOOTER                                     */}
      {/* =================================================================== */}
      <Footer />
    </div>
  );
}

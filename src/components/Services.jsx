import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// CLEAN MINIMAL TOOL ICONS
// ============================================================================

function FigmaIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-6-6a3 3 0 0 1 6 0v6H6a3 3 0 0 1 0-6Zm0 6a3 3 0 0 1 6 0v6H6a3 3 0 0 1 0-6Zm6-9a3 3 0 0 1 6 0 3 3 0 0 1-3 3h-3V3Zm0 15h3a3 3 0 1 1-3 3v-3Z" />
    </svg>
  );
}

function DiamondIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <line x1="12" y1="22" x2="8" y2="9" />
      <line x1="12" y1="22" x2="16" y2="9" />
    </svg>
  );
}

function XdBadge() {
  return (
    <span className="inline-flex items-center justify-center font-mono font-bold text-[10px] border border-current rounded px-1 leading-none h-4">
      Xd
    </span>
  );
}

function BlenderIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="14" r="5" />
      <line x1="12" y1="9" x2="12" y2="3" />
      <line x1="12" y1="3" x2="6" y2="6" />
      <line x1="12" y1="3" x2="18" y2="6" />
    </svg>
  );
}

function SplineIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function ReactIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  );
}

// ============================================================================
// DOTTED HALFTONE MATRIX PATTERN (EXACTLY AS IN REFERENCE CARD 02)
// ============================================================================

function DotMatrix({ className = "" }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      width="140"
      height="140"
      viewBox="0 0 140 140"
      fill="none"
    >
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => {
          const factor = (row + col) / 14;
          const opacity = Math.max(0.04, Math.pow(factor, 2) * 0.75);
          return (
            <circle
              key={`${row}-${col}`}
              cx={col * 17 + 8}
              cy={row * 17 + 8}
              r={1.75}
              fill="#C7C0FF"
              fillOpacity={opacity}
            />
          );
        })
      )}
    </svg>
  );
}

// ============================================================================
// SERVICES DATA MATCHING REFERENCE DESIGN
// First card is #37356D, remaining cards start transparent and light up on scroll
// ============================================================================

const servicesData = [
  {
    type: "detailed",
    num: "01",
    title: "Product Design",
    desc: "End-to-end product design — from research and UX flows to polished UI systems and developer-ready handoff.",
    servicesList: [
      "User Research & Strategy",
      "UX Flows & Wireframes",
      "UI Systems & Prototypes",
      "Design Ops & Dev Handoff",
    ],
    tools: ["figma", "diamond", "xd", "blender", "spline", "react"],
    initialBg: "#37356D",
    initialBorder: "rgba(255, 255, 255, 0.25)",
  },
  {
    type: "minimal",
    num: "02",
    title: "Development",
    desc: "Robust full-stack web and mobile applications engineered with modern frameworks, high performance and clean architecture.",
    capabilities: "Next.js · React Native · Node.js · TypeScript",
    initialBg: "transparent",
    initialBorder: "rgba(255, 255, 255, 0.12)",
  },
  {
    type: "detailed",
    num: "03",
    title: "AI & Automation",
    desc: "Practical AI-powered experiences, autonomous intelligent agents and automated pipelines that reduce friction and unlock scale.",
    servicesList: [
      "Intelligent Autonomous Agents",
      "LLM & Vector Search Pipelines",
      "Workflow Process Automation",
      "Predictive Analytics & ML",
    ],
    tools: ["python", "langchain", "openai", "pytorch", "supabase", "react"],
    initialBg: "transparent",
    initialBorder: "rgba(255, 255, 255, 0.12)",
  },
  {
    type: "minimal",
    num: "04",
    title: "Connected Systems",
    desc: "Connected IoT hardware fleets, real-time sensor streams and mission-critical telemetry built for 24/7 reliability.",
    capabilities: "Sensors · MQTT · Edge Networks · Telemetry",
    initialBg: "transparent",
    initialBorder: "rgba(255, 255, 255, 0.12)",
  },
  {
    type: "detailed",
    num: "05",
    title: "Immersive 3D",
    desc: "Memorable digital experiences using dimensional visuals, custom WebGL shaders, kinetic typography and interactive storytelling.",
    servicesList: [
      "3D Interactive WebGL",
      "Custom GLSL Shaders",
      "GSAP Scroll Choreography",
      "Real-Time Physics Simulations",
    ],
    tools: ["three", "webgl", "blender", "gsap", "shaders", "lenis"],
    initialBg: "transparent",
    initialBorder: "rgba(255, 255, 255, 0.12)",
  },
  {
    type: "minimal",
    num: "06",
    title: "Cloud & Dashboards",
    desc: "Scalable SaaS architectures, operational telemetry dashboards and resilient multi-region cloud infrastructures.",
    capabilities: "AWS · Kubernetes · Dashboards · CI/CD",
    initialBg: "transparent",
    initialBorder: "rgba(255, 255, 255, 0.12)",
  },
];

// ============================================================================
// MAIN SERVICES SECTION COMPONENT
// ============================================================================

export default function Services() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet (> 768px): Pinned Horizontal Scroll with Dynamic Spotlight Color Change
    mm.add("(min-width: 768px)", () => {
      const getScrollShift = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Shift enough so every card travels across the screen and vanishes off to the left
        return trackWidth - viewportWidth * 0.35 + 450;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollShift() + 500}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Smooth horizontal translation of the cards track
      tl.to(track, {
        x: () => -getScrollShift(),
        ease: "none",
        duration: 1,
      });

      // Card Choreography:
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // 1. DYNAMIC COLOR CHANGE:
        // First card starts with #37356D.
        // All subsequent cards start transparent, and as they enter the spotlight position,
        // they smoothly transition into the signature #37356D color!
        if (i > 0) {
          gsap.fromTo(
            card,
            {
              backgroundColor: "rgba(14, 15, 24, 0)", // transparent
              borderColor: "rgba(255, 255, 255, 0.12)",
            },
            {
              backgroundColor: "#37356D", // lights up in signature indigo-violet
              borderColor: "rgba(255, 255, 255, 0.28)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: "left 74%",
                end: "left 46%",
                scrub: true,
              },
            }
          );
        }

        // 2. VANISHING EFFECT:
        // As each card moves towards and past the left edge, it dissolves and vanishes cleanly off to the left!
        gsap.to(card, {
          opacity: 0,
          scale: 0.90,
          ease: "power1.in",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left 36%",
            end: "left 15%",
            scrub: true,
          },
        });
      });

      // Refresh ScrollTrigger to ensure all trigger boundaries match the pinned spacer
      ScrollTrigger.refresh();
    });

    // Mobile (< 768px): Natural horizontal touch swipe
    mm.add("(max-width: 767px)", () => {
      gsap.set(track, { clearProps: "all" });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full min-h-screen h-screen flex flex-col justify-center overflow-hidden select-text"
      style={{
        backgroundColor: "#050508", // Consistent dark canvas matching reference
        color: "#F5F4FF",
      }}
    >
      {/* Background radial spotlight falloff */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 60%, rgba(5, 5, 8, 0.95) 100%)",
        }}
      />

      <div className="w-full h-full max-w-[1720px] mx-auto flex flex-col lg:flex-row items-center px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* ========================================================= */}
        {/* 1. LEFT ZONE: RESERVED SPACE FOR 3D PARTICLE CENTERPIECE  */}
        {/* The Hero Particle Sphere descends directly into this area */}
        {/* Added top padding to match lowered content clear of navbar */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[38vw] lg:min-w-[400px] h-32 lg:h-full flex items-center justify-center shrink-0 relative pointer-events-none pt-24 lg:pt-32">
          {/* Subtle Atmospheric Violet Glow behind 3D Particle Visual */}
          <div
            aria-hidden="true"
            className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full blur-[100px] opacity-40 select-none"
            style={{
              background:
                "radial-gradient(circle, #5247FF 0%, #201D5C 45%, transparent 70%)",
            }}
          />
        </div>

        {/* ========================================================= */}
        {/* 2. RIGHT ZONE: HEADER + HORIZONTAL CARDS TRACK            */}
        {/* Generous top padding (pt-28 to pt-36) clears the navbar! */}
        {/* ========================================================= */}
        <div className="flex-1 w-full h-full min-w-0 flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-6 sm:pb-8 pl-0 lg:pl-4 relative">
          
          {/* Top Section Header comfortably below navbar */}
          <div className="w-full flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-5 lg:pb-7 border-b border-white/10">
            <div>
              <h2 className="font-sans text-[36px] sm:text-[44px] lg:text-[48px] font-semibold text-white tracking-tight leading-none">
                Our Services
              </h2>
            </div>

            <div className="max-w-[420px]">
              <p className="font-sans text-[13.5px] sm:text-[14px] text-[#A1A0B5] font-normal leading-[1.65]">
                We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint.
              </p>
            </div>
          </div>

          {/* Cards Track Container with Left-Edge Dissolve Mask */}
          <div
            className="w-full my-auto py-3 overflow-x-auto sm:overflow-visible no-scrollbar"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 50px), transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 50px), transparent 100%)",
            }}
          >
            <div
              ref={trackRef}
              className="flex gap-6 sm:gap-7 items-stretch min-w-max pl-4 sm:pl-8 pr-24 will-change-transform"
            >
              {servicesData.map((service, index) => {
                const isDetailed = service.type === "detailed";

                return (
                  <div
                    key={service.num}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="group relative w-[330px] sm:w-[370px] lg:w-[390px] h-[450px] sm:h-[480px] lg:h-[495px] rounded-[28px] border p-7 sm:p-8 flex flex-col justify-between shrink-0 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(55,53,109,0.35)] will-change-transform text-white"
                    style={{
                      backgroundColor: service.initialBg,
                      borderColor: service.initialBorder,
                      boxShadow: index === 0 ? "0 24px 60px rgba(0, 0, 0, 0.45)" : "none",
                    }}
                  >
                    {isDetailed ? (
                      // ==========================================
                      // CARD TYPE A: DETAILED (LIKE PRODUCT DESIGN)
                      // ==========================================
                      <>
                        {/* Top: Title + Arrow */}
                        <div className="flex items-start justify-between">
                          <h3 className="font-sans text-[24px] sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
                            {service.title}
                          </h3>
                          <a
                            href="#contact"
                            aria-label={`Learn more about ${service.title}`}
                            className="text-[20px] text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          >
                            ↗
                          </a>
                        </div>

                        {/* Mid: Description */}
                        <div className="my-auto py-2">
                          <p className="font-sans text-[13px] sm:text-[13.5px] text-white/80 font-normal leading-[1.6]">
                            {service.desc}
                          </p>
                        </div>

                        {/* Bottom: Split Columns (Services + Tools) */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/15">
                          {/* Left Column: Services list */}
                          <div>
                            <span className="block font-sans text-[12px] font-medium text-white/60 mb-2">
                              Services
                            </span>
                            <ul className="space-y-1 font-sans text-[11px] sm:text-[11.5px] text-white/90 font-light leading-tight">
                              {service.servicesList.map((item) => (
                                <li key={item} className="truncate">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Right Column: Tools */}
                          <div>
                            <span className="block font-sans text-[12px] font-medium text-white/60 mb-2">
                              Tools
                            </span>
                            <div className="grid grid-cols-3 gap-2.5 text-white/85 pt-1">
                              <FigmaIcon className="w-4 h-4 hover:text-white" />
                              <DiamondIcon className="w-4 h-4 hover:text-white" />
                              <XdBadge />
                              <BlenderIcon className="w-4 h-4 hover:text-white" />
                              <SplineIcon className="w-4 h-4 hover:text-white" />
                              <ReactIcon className="w-4 h-4 hover:text-white" />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      // ==========================================
                      // CARD TYPE B: MINIMAL (LIKE 02 DEVELOPMENT)
                      // ==========================================
                      <>
                        {/* Top: Number + Arrow */}
                        <div className="flex items-start justify-between">
                          <span className="font-sans text-[26px] sm:text-[30px] font-semibold text-white/90 leading-none">
                            {service.num}
                          </span>
                          <a
                            href="#contact"
                            aria-label={`Learn more about ${service.title}`}
                            className="text-[20px] text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          >
                            ↗
                          </a>
                        </div>

                        {/* Middle Description */}
                        <div className="my-auto py-2">
                          <p className="font-sans text-[13px] sm:text-[13.5px] text-[#A1A0B5] font-light leading-[1.6]">
                            {service.desc}
                          </p>
                        </div>

                        {/* Bottom: Halftone Dotted Matrix (Right) & Title (Left) */}
                        <div className="relative pt-6 flex items-end justify-between">
                          <div className="relative z-10 max-w-[200px]">
                            <h3 className="font-sans text-[24px] sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
                              {service.title}
                            </h3>
                            <span className="block text-[11px] font-mono text-[#C7C0FF]/80 uppercase tracking-wider mt-1.5">
                              {service.capabilities}
                            </span>
                          </div>

                          {/* Bottom-Right Halftone Dotted Matrix */}
                          <div className="absolute right-0 bottom-0 pointer-events-none overflow-hidden">
                            <DotMatrix />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Footer Info Bar */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-[#8E8E9F]/60 pt-3 border-t border-white/10">
            <span>TAVQO DIGITAL STUDIO</span>
            <span className="hidden sm:inline">SCROLL TO NAVIGATE ALL SERVICES</span>
            <span>06 CAPABILITIES</span>
          </div>

        </div>

      </div>
    </section>
  );
}

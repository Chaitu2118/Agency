import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// 5 DISTINCT, ART-DIRECTED EDITORIAL TILES (CLEAN, RESTRAINED, CONSISTENT)
// ============================================================================

// 1. Flagship Website Interface Preview
function TileWeb() {
  return (
    <div className="w-[250px] sm:w-[280px] lg:w-[300px] h-[170px] sm:h-[185px] rounded-2xl bg-[#10111A] border border-[#101117]/15 p-3.5 flex flex-col justify-between shadow-[0_20px_45px_-10px_rgba(16,17,23,0.25)] select-none">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
        </div>
        <span className="text-[9px] font-mono text-[#C7C0FF]/70 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
          tavqo.studio/flagship
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#5268FF]" />
      </div>
      <div className="flex-1 pt-2 flex gap-2 items-stretch">
        <div className="w-12 rounded-lg bg-white/[0.03] border border-white/5 p-2 flex flex-col gap-1.5">
          <div className="w-6 h-1.5 rounded bg-[#5268FF]" />
          <div className="w-8 h-1 rounded bg-white/20" />
          <div className="w-5 h-1 rounded bg-white/20" />
        </div>
        <div className="flex-1 rounded-lg bg-gradient-to-br from-[#1C1A38] to-[#0D0E18] border border-white/10 p-2.5 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-serif italic text-white/90 block">Unconventional Craft</span>
            <div className="w-16 h-1 rounded bg-gradient-to-r from-[#5268FF] to-[#7764F8]" />
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[8px] font-mono text-[#C7C0FF]/80">INDEX // 01</span>
            <span className="px-2 py-0.5 rounded bg-[#5268FF] text-[8px] font-sans font-medium text-white">
              Explore ↗
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Product Analytics & Telemetry Dashboard
function TileDashboard() {
  return (
    <div className="w-[260px] sm:w-[290px] lg:w-[310px] h-[165px] sm:h-[180px] rounded-2xl bg-[#0F101A] border border-[#101117]/15 p-3.5 flex flex-col justify-between shadow-[0_20px_45px_-10px_rgba(16,17,23,0.22)] select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5268FF] animate-pulse" />
          <span className="text-[9px] font-mono uppercase text-[#C7C0FF]">
            TELEMETRY // SYSTEM
          </span>
        </div>
        <span className="text-[8.5px] font-mono text-emerald-400">99.99% UP</span>
      </div>
      <div className="relative h-12 w-full my-auto flex items-end">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 260 50" preserveAspectRatio="none">
          <defs>
            <linearGradient id="aiDashGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5268FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7764F8" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M0,45 Q30,35 65,18 T130,28 T195,10 T260,16 L260,50 L0,50 Z"
            fill="url(#aiDashGrad)"
          />
          <path
            d="M0,45 Q30,35 65,18 T130,28 T195,10 T260,16"
            fill="none"
            stroke="#5268FF"
            strokeWidth="1.8"
          />
          <circle cx="195" cy="10" r="2.5" fill="#FFFFFF" stroke="#5268FF" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2 pt-1.5 border-t border-white/10 text-center">
        <div>
          <span className="text-[7.5px] font-mono text-white/40 block">LATENCY</span>
          <span className="text-[9.5px] font-mono font-bold text-white">12.4ms</span>
        </div>
        <div>
          <span className="text-[7.5px] font-mono text-white/40 block">THROUGHPUT</span>
          <span className="text-[9.5px] font-mono font-bold text-[#5268FF]">4.2 GB/s</span>
        </div>
        <div>
          <span className="text-[7.5px] font-mono text-white/40 block">CLUSTER</span>
          <span className="text-[9.5px] font-mono font-bold text-emerald-400">OPTIMAL</span>
        </div>
      </div>
    </div>
  );
}

// 3. Abstract 3D Technical Morphology
function Tile3D() {
  return (
    <div className="w-[195px] sm:w-[215px] lg:w-[230px] h-[195px] sm:h-[215px] lg:h-[230px] rounded-2xl bg-[#141328] border border-white/15 p-3.5 flex flex-col justify-between shadow-[0_20px_45px_rgba(82,104,255,0.18)] select-none">
      <div className="flex items-center justify-between">
        <span className="text-[8.5px] font-mono text-[#C7C0FF] uppercase tracking-wider">
          MORPHOLOGY // 3D
        </span>
        <span className="text-[8.5px] font-mono text-white/40">360° WEBGL</span>
      </div>
      <div className="relative w-24 h-24 mx-auto my-auto flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 120 120" fill="none">
          <ellipse
            cx="60"
            cy="60"
            rx="50"
            ry="18"
            stroke="rgba(199,192,255,0.25)"
            strokeWidth="1"
            strokeDasharray="3 3"
            transform="rotate(-25 60 60)"
          />
          <polygon
            points="60,15 25,60 60,82"
            fill="rgba(82,104,255,0.15)"
            stroke="rgba(82,104,255,0.5)"
            strokeWidth="1.2"
          />
          <polygon
            points="60,15 95,60 60,82"
            fill="rgba(119,100,248,0.25)"
            stroke="rgba(119,100,248,0.6)"
            strokeWidth="1.2"
          />
          <polygon
            points="60,105 25,60 60,82"
            fill="rgba(82,104,255,0.08)"
            stroke="rgba(82,104,255,0.35)"
            strokeWidth="1.2"
          />
          <polygon
            points="60,105 95,60 60,82"
            fill="rgba(119,100,248,0.15)"
            stroke="rgba(119,100,248,0.45)"
            strokeWidth="1.2"
          />
          <circle cx="60" cy="15" r="2.5" fill="#FFFFFF" />
          <circle cx="60" cy="105" r="2.5" fill="#C7C0FF" />
          <circle cx="25" cy="60" r="2.5" fill="#7764F8" />
          <circle cx="95" cy="60" r="2.5" fill="#5268FF" />
        </svg>
      </div>
      <div className="text-[8px] font-mono text-[#8E8E9F] text-center">
        DIMENSIONAL FIDELITY
      </div>
    </div>
  );
}

// 4. Mobile Application Experience Preview
function TileMobile() {
  return (
    <div className="w-[165px] sm:w-[180px] lg:w-[195px] h-[260px] sm:h-[285px] rounded-[26px] border-[2px] border-[#101117]/20 bg-[#121320] p-2 flex flex-col justify-between shadow-[0_25px_50px_-10px_rgba(16,17,23,0.3)] select-none">
      <div className="w-12 h-2.5 mx-auto rounded-full bg-black/90 flex items-center justify-end px-1.5">
        <span className="w-1 h-1 rounded-full bg-[#5268FF]" />
      </div>
      <div className="space-y-2 mt-1">
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#201D40] to-[#141528] border border-white/10">
          <span className="text-[7.5px] font-mono uppercase tracking-wider text-[#C7C0FF]/70 block">
            PORTFOLIO ASSETS
          </span>
          <span className="text-[14px] font-sans font-semibold text-white block mt-0.5">
            $248,500
          </span>
          <div className="w-full h-6 mt-1">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25">
              <path
                d="M0,20 Q25,8 50,15 T100,3"
                fill="none"
                stroke="#7764F8"
                strokeWidth="1.8"
              />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/5">
            <span className="text-[7px] font-mono text-white/50 block">GROWTH</span>
            <span className="text-[10px] font-sans font-bold text-white">+34.8%</span>
          </div>
          <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/5">
            <span className="text-[7px] font-mono text-white/50 block">RETENTION</span>
            <span className="text-[10px] font-sans font-bold text-[#5268FF]">98.2%</span>
          </div>
        </div>
      </div>
      <div className="w-10 h-1 mx-auto rounded-full bg-white/30" />
    </div>
  );
}

// 5. Autonomous AI & Neural Constellation
function TileAI() {
  return (
    <div className="w-[185px] sm:w-[205px] lg:w-[220px] h-[155px] sm:h-[170px] rounded-2xl bg-[#131226] border border-[#7764F8]/30 p-3 flex flex-col justify-between shadow-[0_20px_45px_rgba(82,104,255,0.18)] select-none">
      <div className="flex items-center justify-between">
        <span className="text-[8.5px] font-mono text-[#C7C0FF] uppercase tracking-wider">
          INTELLIGENT SYSTEMS
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#7764F8]" />
      </div>
      <div className="relative w-20 h-20 mx-auto my-auto flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <g stroke="rgba(119,100,248,0.35)" strokeWidth="1">
            <line x1="50" y1="50" x2="20" y2="25" />
            <line x1="50" y1="50" x2="25" y2="75" />
            <line x1="50" y1="50" x2="80" y2="25" />
            <line x1="50" y1="50" x2="75" y2="75" />
          </g>
          <circle cx="50" cy="50" r="14" stroke="rgba(82,104,255,0.25)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="20" cy="25" r="3" fill="#14152A" stroke="#7764F8" strokeWidth="1.2" />
          <circle cx="25" cy="75" r="3" fill="#14152A" stroke="#5268FF" strokeWidth="1.2" />
          <circle cx="80" cy="25" r="3" fill="#14152A" stroke="#7764F8" strokeWidth="1.2" />
          <circle cx="75" cy="75" r="3" fill="#14152A" stroke="#5268FF" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="6" fill="#7764F8" />
          <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>
      <div className="text-[8px] font-mono text-[#8E8E9F] text-center">
        AUTONOMOUS AGENTS
      </div>
    </div>
  );
}

// ============================================================================
// MAIN AVERAGE IS EXPENSIVE SECTION COMPONENT
// ============================================================================

export default function AverageIsExpensive() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const supportRef = useRef(null);
  const punchlinesRef = useRef(null);
  const closingRef = useRef(null);

  // 5 discrete tile references
  const tile1Ref = useRef(null);
  const tile2Ref = useRef(null);
  const tile3Ref = useRef(null);
  const tile4Ref = useRef(null);
  const tile5Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet (> 768px): Pinned Cinematic Scroll-Driven Choreography
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1700",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ----------------------------------------------------------------------
      // PHASE A — INITIAL STAGGERED ENTRANCE OF TILES (0.0 -> 0.20)
      // Central typography is already prominent; tiles gently phase in at peripheral quadrants
      // ----------------------------------------------------------------------
      tl.fromTo(
        [
          tile1Ref.current,
          tile3Ref.current,
          tile2Ref.current,
          tile4Ref.current,
          tile5Ref.current,
        ],
        { opacity: 0.35, scale: 0.94 },
        { opacity: 1, scale: 1.0, stagger: 0.05, ease: "power1.out", duration: 0.2 },
        0
      );

      // ----------------------------------------------------------------------
      // PHASE B — CONTROLLED SCROLL-DRIVEN MOTION ACROSS QUADRANTS (0.15 -> 0.85)
      // Tiles travel along deliberate paths without obscuring the central text
      // ----------------------------------------------------------------------

      // Tile 1 (Top-Left): Drifts horizontally rightward and down
      tl.to(
        tile1Ref.current,
        {
          x: "55px",
          y: "65px",
          rotation: -2,
          ease: "none",
          duration: 0.7,
        },
        0.15
      );

      // Tile 2 (Bottom-Left): Drifts up and slightly rightward
      tl.to(
        tile2Ref.current,
        {
          x: "45px",
          y: "-50px",
          rotation: 1.5,
          ease: "none",
          duration: 0.7,
        },
        0.15
      );

      // Tile 3 (Top-Right): Sweeps down and slightly leftward
      tl.to(
        tile3Ref.current,
        {
          x: "-45px",
          y: "60px",
          rotation: -2,
          ease: "none",
          duration: 0.7,
        },
        0.15
      );

      // Tile 4 (Bottom-Right): Travels up and leftward
      tl.to(
        tile4Ref.current,
        {
          x: "-35px",
          y: "-65px",
          rotation: 2,
          ease: "none",
          duration: 0.7,
        },
        0.15
      );

      // Tile 5 (Mid-Far-Right): Drifts inward
      tl.to(
        tile5Ref.current,
        {
          x: "-30px",
          y: "-40px",
          rotation: -1,
          ease: "none",
          duration: 0.7,
        },
        0.15
      );

      // Progressive reveal of the three follow-up punchlines during mid-scroll
      tl.fromTo(
        punchlinesRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
        0.35
      );

      // ----------------------------------------------------------------------
      // PHASE C — RESOLUTION & CLOSING STATEMENT (0.75 -> 1.0)
      // Tiles settle into final balanced frame; closing statement reveals cleanly
      // ----------------------------------------------------------------------
      tl.fromTo(
        closingRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.25 },
        0.75
      );
    });

    // Mobile (< 768px): Clean, non-pinned responsive composition
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        punchlinesRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: punchlinesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        closingRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: closingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="average-is-expensive"
      ref={sectionRef}
      className="relative w-full min-h-screen h-screen flex flex-col justify-center overflow-hidden select-text"
      style={{
        backgroundColor: "#F5F0E6", // Warm Vanilla Canvas
        color: "#101117",
      }}
    >
      {/* Subtle Warm Vanilla Ambient Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-50 select-none"
        style={{
          background:
            "radial-gradient(circle, #FAF7F0 0%, rgba(245,240,230,0.5) 50%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[6%] w-[450px] h-[450px] rounded-full blur-[160px] opacity-[0.06] select-none"
        style={{
          background: "radial-gradient(circle, #7764F8 0%, transparent 70%)",
        }}
      />

      {/* Main Grid Container with Consistent Padding */}
      <div className="relative w-full h-full max-w-[1720px] mx-auto flex flex-col justify-between py-10 sm:py-12 lg:py-14 px-6 sm:px-10 lg:px-14 z-10">
        
        {/* Top Header Grid Bar */}
        <div className="w-full flex items-center justify-between border-b border-[#101117]/14 pb-3 sm:pb-4">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#5268FF]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#101117]/70 font-semibold">
              TAVQO / PERSPECTIVE
            </span>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#101117]/50 hidden sm:inline">
            EDITORIAL MONOGRAPH
          </span>
        </div>

        {/* ========================================================= */}
        {/* CENTRAL EDITORIAL READING ZONE (CLEAR & UNOBSTRUCTED)     */}
        {/* Strictly confined to max-w-[720px] in center              */}
        {/* ========================================================= */}
        <div className="my-auto py-4 sm:py-6 text-center max-w-[720px] mx-auto relative z-20 pointer-events-none">
          
          {/* Main Monumental Headline */}
          <h2
            ref={headlineRef}
            className="font-serif text-[46px] sm:text-[66px] md:text-[80px] lg:text-[94px] font-normal leading-[1.0] tracking-[-0.035em] text-[#101117]"
          >
            Average is <span className="italic font-light text-[#5268FF]">expensive.</span>
          </h2>

          {/* Supporting Sentence (Directly Beneath Headline) */}
          <div ref={supportRef} className="mt-5 sm:mt-7 max-w-[560px] mx-auto">
            <p className="font-sans text-[15.5px] sm:text-[18px] lg:text-[20px] font-normal text-[#525160] leading-[1.5] tracking-[-0.01em]">
              “An ordinary digital experience can make an exceptional business easy to overlook.”
            </p>
          </div>

          {/* Follow-up Punchy Statements (Controlled Spacing Beneath Supporting Sentence) */}
          <div
            ref={punchlinesRef}
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.2em] text-[#7764F8] font-semibold"
          >
            <span>Lost attention.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#5268FF]/35" />
            <span>Weaker first impressions.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#5268FF]/35" />
            <span>Missed opportunities.</span>
          </div>

          {/* Closing Sentence in Dedicated Reserved Area */}
          <div ref={closingRef} className="mt-7 sm:mt-9 pt-4 sm:pt-5 border-t border-[#101117]/12 max-w-[520px] mx-auto">
            <p className="font-serif italic text-[18px] sm:text-[21px] lg:text-[23px] font-normal text-[#101117] leading-snug">
              “Your digital presence should reflect the value of your business.”
            </p>
          </div>

        </div>

        {/* Bottom Metadata Bar */}
        <div className="w-full flex items-center justify-between border-t border-[#101117]/14 pt-3 sm:pt-4 text-[11px] font-mono uppercase tracking-[0.18em] text-[#101117]/50">
          <span>VALUE-DRIVEN ENGINEERING</span>
          <span className="hidden sm:inline">PRECISION • IMPACT • DIFFERENTIATION</span>
          <span>EST. 2026</span>
        </div>

        {/* ========================================================= */}
        {/* 5 FLOATING TILES IN SURROUNDING QUADRANTS (DESKTOP)       */}
        {/* Carefully confined to outer edges away from center text   */}
        {/* ========================================================= */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-10 overflow-hidden">
          
          {/* Tile 1: Top-Left (Web Interface Preview) */}
          <div
            ref={tile1Ref}
            className="absolute top-[8%] left-[2%] xl:left-[3%] will-change-transform pointer-events-auto transition-shadow hover:shadow-2xl"
          >
            <TileWeb />
          </div>

          {/* Tile 2: Bottom-Left (Product Telemetry Dashboard) */}
          <div
            ref={tile2Ref}
            className="absolute bottom-[8%] left-[2%] xl:left-[3%] will-change-transform pointer-events-auto transition-shadow hover:shadow-2xl"
          >
            <TileDashboard />
          </div>

          {/* Tile 3: Top-Right (Abstract 3D Technical Morphology) */}
          <div
            ref={tile3Ref}
            className="absolute top-[8%] right-[2%] xl:right-[4%] will-change-transform pointer-events-auto transition-shadow hover:shadow-2xl"
          >
            <Tile3D />
          </div>

          {/* Tile 4: Bottom-Right (Mobile Application Preview) */}
          <div
            ref={tile4Ref}
            className="absolute bottom-[7%] right-[3%] xl:right-[4%] will-change-transform pointer-events-auto transition-shadow hover:shadow-2xl"
          >
            <TileMobile />
          </div>

          {/* Tile 5: Mid-Far-Right (Autonomous AI Constellation) */}
          <div
            ref={tile5Ref}
            className="absolute top-[42%] right-[1%] xl:right-[2%] will-change-transform pointer-events-auto transition-shadow hover:shadow-2xl"
          >
            <TileAI />
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* MOBILE RESPONSIVE TILES (NON-PINNED, STACKED BELOW TEXT)  */}
      {/* ========================================================= */}
      <div className="lg:hidden w-full px-6 pb-14 pt-2 space-y-5 flex flex-col items-center">
        <TileWeb />
        <div className="flex flex-col sm:flex-row gap-5 items-center">
          <Tile3D />
          <TileMobile />
        </div>
        <TileDashboard />
      </div>

    </section>
  );
}

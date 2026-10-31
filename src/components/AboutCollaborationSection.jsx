import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Storytelling stages data for "Built Through Collaboration"
 * Complete, premium editorial storytelling experience across all 4 stages.
 */
const STAGES = [
  {
    step: "01",
    tag: "LISTEN",
    indicator: "01 / LISTEN",
    headlineLead: "Before we build, we",
    headlineAccent: "understand.",
    description:
      "Every meaningful solution starts with understanding the business behind it. We explore your vision, audience, goals and challenges before deciding what needs to be built.",
    activities: [
      "Initial conversations",
      "Business and user requirements",
      "Problem identification",
      "Project objectives",
    ],
    outcome:
      "A shared understanding of the problem, goals and project direction.",
    deliverables: [
      "Defined requirements",
      "Project objectives",
      "User and business context",
    ],
    bgHue:
      "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(81, 69, 217, 0.15) 0%, rgba(8, 8, 16, 0) 75%)",
  },
  {
    step: "02",
    tag: "SHAPE",
    indicator: "02 / SHAPE",
    headlineLead: "Turn possibilities into a",
    headlineAccent: "clear direction.",
    description:
      "We transform requirements into a defined product experience and technical plan, making sure design decisions and engineering choices support the intended outcome.",
    activities: [
      "Product structure and planning",
      "User experience and interface direction",
      "Technology selection",
      "Scope and feature definition",
    ],
    outcome:
      "A clear roadmap that connects the idea to its implementation.",
    deliverables: [
      "Product structure",
      "Design direction",
      "Technical approach",
      "Development scope",
    ],
    bgHue:
      "radial-gradient(ellipse 75% 65% at 55% 45%, rgba(107, 91, 255, 0.17) 0%, rgba(8, 8, 16, 0) 75%)",
  },
  {
    step: "03",
    tag: "BUILD",
    indicator: "03 / BUILD",
    headlineLead: "From thoughtful design to",
    headlineAccent: "working technology.",
    description:
      "We bring the product to life through design, engineering and integration. Each part is developed, tested and refined with attention to functionality and experience.",
    activities: [
      "Interface and frontend development",
      "Backend and API integration",
      "Testing and refinement",
      "Feedback and iteration",
    ],
    outcome: "A tested, functional digital solution.",
    deliverables: [
      "Working interfaces",
      "Integrated functionality",
      "Tested features",
      "Deployment-ready product",
    ],
    bgHue:
      "radial-gradient(ellipse 75% 65% at 45% 55%, rgba(81, 69, 217, 0.20) 0%, rgba(8, 8, 16, 0) 75%)",
  },
  {
    step: "04",
    tag: "EVOLVE",
    indicator: "04 / EVOLVE",
    headlineLead: "Launch is a beginning,",
    headlineAccent: "not an ending.",
    description:
      "A digital product should continue to improve as its users, business and opportunities evolve. We help refine and strengthen solutions beyond their initial launch.",
    activities: [
      "Deployment and launch support",
      "Performance improvements",
      "Maintenance and enhancements",
      "Future feature development",
    ],
    outcome:
      "A solution that can adapt and grow with changing needs.",
    deliverables: [
      "Launch support",
      "Improved performance",
      "Ongoing refinements",
      "Future development direction",
    ],
    bgHue:
      "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(122, 108, 255, 0.18) 0%, rgba(8, 8, 16, 0) 75%)",
  },
];

/**
 * AboutCollaborationSection Component
 *
 * Premium Editorial Scroll Dissolve Reveal Experience:
 * - 100% Image-Free: No decorative spirals, no AI illustrations, no stock renders.
 * - Consistent Two-Column Content Hierarchy:
 *   - Left: Stage indicator, large editorial headline with Instrument Serif, supporting paragraph, "What happens" activities.
 *   - Right: "WHAT YOU GET" architectural outcome panel with concise summary and key outputs.
 * - Deep charcoal (#080810) canvas with subtle TAVQO electric violet and lavender ambient lighting.
 * - Controlled GSAP ScrollTrigger pinning and dissolve transitions without excessive blur.
 * - Clean progress indicator (01/04, 02/04, 03/04, 04/04) and synchronized hairline tracking.
 * - Accessible reduced-motion fallback.
 */
export default function AboutCollaborationSection() {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const stagesRef = useRef([]);
  const bgGlowRef = useRef(null);
  const progressBarRef = useRef(null);

  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // GSAP ScrollTrigger Dissolve Sequence
  useEffect(() => {
    if (isReducedMotion) return;
    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;
    if (!container || !pinWrapper) return;

    const ctx = gsap.context(() => {
      // Setup initial visual states for all 4 stages
      stagesRef.current.forEach((stageEl, i) => {
        if (!stageEl) return;
        if (i === 0) {
          gsap.set(stageEl, {
            opacity: 1,
            filter: "blur(0px)",
            pointerEvents: "auto",
          });
          gsap.set(stageEl.querySelectorAll(".word-reveal"), {
            y: "0%",
            opacity: 1,
          });
          gsap.set(stageEl.querySelectorAll(".fade-elem"), {
            y: "0px",
            opacity: 1,
          });
          gsap.set(stageEl.querySelectorAll(".right-panel-anim"), {
            y: "0px",
            opacity: 1,
          });
        } else {
          gsap.set(stageEl, {
            opacity: 0,
            filter: "blur(8px)",
            pointerEvents: "none",
          });
          gsap.set(stageEl.querySelectorAll(".word-reveal"), {
            y: "115%",
            opacity: 0,
          });
          gsap.set(stageEl.querySelectorAll(".fade-elem"), {
            y: "20px",
            opacity: 0,
          });
          gsap.set(stageEl.querySelectorAll(".right-panel-anim"), {
            y: "24px",
            opacity: 0,
          });
        }
      });

      // Master scrubbed timeline across the 4 stages
      const tl = gsap.timeline({
        defaults: { ease: "none" },
      });

      // STAGE 01 -> STAGE 02 TRANSITION (Time: 0.0 -> 1.0)
      tl.to(
        stagesRef.current[0].querySelectorAll(".word-reveal"),
        { y: "-35%", opacity: 0, stagger: 0.02, duration: 0.35 },
        0.15
      )
        .to(
          stagesRef.current[0].querySelectorAll(".fade-elem"),
          { y: "-16px", opacity: 0, duration: 0.3 },
          0.15
        )
        .to(
          stagesRef.current[0].querySelectorAll(".right-panel-anim"),
          { y: "-16px", opacity: 0, duration: 0.3 },
          0.18
        )
        .to(
          stagesRef.current[0],
          {
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.4,
            pointerEvents: "none",
          },
          0.2
        )
        .to(
          bgGlowRef.current,
          { background: STAGES[1].bgHue, duration: 0.5 },
          0.25
        )
        // Stage 02 enters
        .set(stagesRef.current[1], { pointerEvents: "auto" }, 0.45)
        .to(
          stagesRef.current[1],
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.45,
          },
          0.45
        )
        .to(
          stagesRef.current[1].querySelectorAll(".word-reveal"),
          { y: "0%", opacity: 1, stagger: 0.03, duration: 0.45 },
          0.48
        )
        .to(
          stagesRef.current[1].querySelectorAll(".fade-elem"),
          { y: "0px", opacity: 1, stagger: 0.04, duration: 0.4 },
          0.52
        )
        .to(
          stagesRef.current[1].querySelectorAll(".right-panel-anim"),
          { y: "0px", opacity: 1, duration: 0.45 },
          0.54
        );

      // STAGE 02 -> STAGE 03 TRANSITION (Time: 1.0 -> 2.0)
      tl.to(
        stagesRef.current[1].querySelectorAll(".word-reveal"),
        { y: "-35%", opacity: 0, stagger: 0.02, duration: 0.35 },
        1.15
      )
        .to(
          stagesRef.current[1].querySelectorAll(".fade-elem"),
          { y: "-16px", opacity: 0, duration: 0.3 },
          1.15
        )
        .to(
          stagesRef.current[1].querySelectorAll(".right-panel-anim"),
          { y: "-16px", opacity: 0, duration: 0.3 },
          1.18
        )
        .to(
          stagesRef.current[1],
          {
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.4,
            pointerEvents: "none",
          },
          1.2
        )
        .to(
          bgGlowRef.current,
          { background: STAGES[2].bgHue, duration: 0.5 },
          1.25
        )
        // Stage 03 enters
        .set(stagesRef.current[2], { pointerEvents: "auto" }, 1.45)
        .to(
          stagesRef.current[2],
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.45,
          },
          1.45
        )
        .to(
          stagesRef.current[2].querySelectorAll(".word-reveal"),
          { y: "0%", opacity: 1, stagger: 0.03, duration: 0.45 },
          1.48
        )
        .to(
          stagesRef.current[2].querySelectorAll(".fade-elem"),
          { y: "0px", opacity: 1, stagger: 0.04, duration: 0.4 },
          1.52
        )
        .to(
          stagesRef.current[2].querySelectorAll(".right-panel-anim"),
          { y: "0px", opacity: 1, duration: 0.45 },
          1.54
        );

      // STAGE 03 -> STAGE 04 TRANSITION (Time: 2.0 -> 3.0)
      tl.to(
        stagesRef.current[2].querySelectorAll(".word-reveal"),
        { y: "-35%", opacity: 0, stagger: 0.02, duration: 0.35 },
        2.15
      )
        .to(
          stagesRef.current[2].querySelectorAll(".fade-elem"),
          { y: "-16px", opacity: 0, duration: 0.3 },
          2.15
        )
        .to(
          stagesRef.current[2].querySelectorAll(".right-panel-anim"),
          { y: "-16px", opacity: 0, duration: 0.3 },
          2.18
        )
        .to(
          stagesRef.current[2],
          {
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.4,
            pointerEvents: "none",
          },
          2.2
        )
        .to(
          bgGlowRef.current,
          { background: STAGES[3].bgHue, duration: 0.5 },
          2.25
        )
        // Stage 04 enters
        .set(stagesRef.current[3], { pointerEvents: "auto" }, 2.45)
        .to(
          stagesRef.current[3],
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.45,
          },
          2.45
        )
        .to(
          stagesRef.current[3].querySelectorAll(".word-reveal"),
          { y: "0%", opacity: 1, stagger: 0.03, duration: 0.45 },
          2.48
        )
        .to(
          stagesRef.current[3].querySelectorAll(".fade-elem"),
          { y: "0px", opacity: 1, stagger: 0.04, duration: 0.4 },
          2.52
        )
        .to(
          stagesRef.current[3].querySelectorAll(".right-panel-anim"),
          { y: "0px", opacity: 1, duration: 0.45 },
          2.54
        );

      // Create pinning ScrollTrigger
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=320%",
        pin: pinWrapper,
        scrub: 0.8,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Update progress hairline
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.min(
              100,
              Math.max(0, self.progress * 100)
            )}%`;
          }

          // Compute active stage index based on progress
          const p = self.progress;
          let idx = 0;
          if (p >= 0.72) idx = 3;
          else if (p >= 0.42) idx = 2;
          else if (p >= 0.15) idx = 1;
          else idx = 0;

          setActiveStageIndex((prev) => (prev !== idx ? idx : prev));
        },
      });
    }, container);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="collaboration"
      aria-label="Built Through Collaboration"
      className="relative w-full bg-[#080810] text-[#F5F3FF]"
      style={{
        backgroundColor: "#080810",
      }}
    >
      {/* 0. INLINE CSS NOISE GRAIN (100% Vector, Zero External Assets) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.03] mix-blend-screen"
      >
        <filter id="tavqo-process-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#tavqo-process-grain)" />
      </svg>

      {/* PINNED VIEWPORT WRAPPER FOR SCROLL DISSOLVE SEQUENCE */}
      <div
        ref={pinWrapperRef}
        className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-6 sm:px-10 lg:px-16 py-8 sm:py-10"
      >
        {/* ========================================================= */}
        {/* BACKGROUND AMBIENT GLOW & FINE MESH (NO UNWANTED GRAPHICS)*/}
        {/* ========================================================= */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
        >
          {/* Dynamic Ambient Gradient Glow */}
          <div
            ref={bgGlowRef}
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              background: STAGES[0].bgHue,
            }}
          />

          {/* Precision Architectural Grid Hairline */}
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* ========================================================= */}
        {/* TOP BAR: SECTION LABEL + STAGE COUNTER                    */}
        {/* ========================================================= */}
        <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between border-b border-white/[0.08] pb-4 sm:pb-5">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#5145D9] shadow-[0_0_10px_#5145D9]" />
            <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.24em] text-[#B8B0FF] font-semibold">
              BUILT THROUGH COLLABORATION
            </span>
          </div>

          {/* Minimal Stage Progress Counter */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2">
              {STAGES.map((stg, i) => (
                <span
                  key={stg.tag}
                  className={`font-mono text-[10.5px] tracking-widest uppercase transition-colors duration-300 ${
                    activeStageIndex === i
                      ? "text-[#DDD8FF] font-semibold"
                      : "text-white/30"
                  }`}
                >
                  {stg.tag}
                  {i < STAGES.length - 1 && (
                    <span className="ml-2 text-white/20">/</span>
                  )}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[13px] sm:text-[14px]">
              <span className="text-white font-bold tracking-wider">
                {STAGES[activeStageIndex].step}
              </span>
              <span className="text-white/30">/</span>
              <span className="text-white/40">04</span>
            </div>
          </div>
        </header>

        {/* ========================================================= */}
        {/* CENTER VISUAL STAGE CANVAS: BALANCED TWO-COLUMN EDITORIAL */}
        {/* ========================================================= */}
        <main className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex items-center my-auto py-6 sm:py-8">
          {STAGES.map((stage, idx) => (
            <article
              key={stage.step}
              ref={(el) => (stagesRef.current[idx] = el)}
              className="absolute inset-0 flex items-center"
              style={{
                willChange: "opacity, transform, filter",
              }}
            >
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
                
                {/* ------------------------------------------------- */}
                {/* LEFT / PRIMARY CONTENT (7 Columns)               */}
                {/* ------------------------------------------------- */}
                <div className="lg:col-span-7 flex flex-col items-start text-left">
                  {/* Small Stage Indicator: 01 / LISTEN, etc. */}
                  <div className="fade-elem inline-flex items-center gap-2.5 mb-3 sm:mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5145D9]" />
                    <span className="font-mono text-[12px] sm:text-[13px] tracking-[0.24em] text-[#B8B0FF] font-semibold uppercase">
                      {stage.indicator}
                    </span>
                  </div>

                  {/* Large Editorial Headline */}
                  <h3 className="font-sans font-bold text-[32px] sm:text-[44px] md:text-[52px] lg:text-[56px] xl:text-[62px] leading-[1.08] tracking-[-0.035em] text-white mb-4 sm:mb-6 select-none">
                    {/* Lead Sans Words (staggered overflow mask) */}
                    {stage.headlineLead.split(" ").map((word, wIdx) => (
                      <span
                        key={wIdx}
                        className="inline-block overflow-hidden mr-[0.28em] align-top"
                      >
                        <span className="word-reveal inline-block font-sans font-bold text-[#F5F3FF]">
                          {word}
                        </span>
                      </span>
                    ))}
                    {/* Expressive Instrument Serif Accent Words */}
                    <span className="inline-block overflow-hidden align-top">
                      <span className="word-reveal inline-block font-instrument italic font-normal text-[#DDD8FF] tracking-normal drop-shadow-[0_0_24px_rgba(81,69,217,0.4)]">
                        {stage.headlineAccent}
                      </span>
                    </span>
                  </h3>

                  {/* Supporting Description Paragraph */}
                  <div className="fade-elem max-w-xl mb-6 sm:mb-8">
                    <p className="font-sans text-[15px] sm:text-[16px] lg:text-[17px] text-[#A2A0B8] font-light leading-[1.65]">
                      {stage.description}
                    </p>
                  </div>

                  {/* Practical Activities: "What happens" */}
                  <div className="fade-elem w-full pt-4 sm:pt-5 border-t border-white/[0.08]">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7A6CFF] font-semibold block mb-3 sm:mb-3.5">
                      WHAT HAPPENS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {stage.activities.map((activity, aIdx) => (
                        <div
                          key={aIdx}
                          className="flex items-center gap-2.5 text-[13px] sm:text-[13.5px] text-[#D8D5EE] font-light"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5145D9] shrink-0" />
                          <span>{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ------------------------------------------------- */}
                {/* RIGHT / SECONDARY CONTENT (5 Columns)            */}
                {/* Architectural "WHAT YOU GET" Outcome Panel        */}
                {/* ------------------------------------------------- */}
                <div className="lg:col-span-5 right-panel-anim w-full">
                  <div className="relative rounded-2xl bg-[#0D0D18]/85 border border-white/[0.1] p-6 sm:p-8 backdrop-blur-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65)] hover:border-[#5145D9]/40 transition-colors duration-300">
                    {/* Panel Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                      <span className="font-mono text-[11px] tracking-[0.24em] text-[#B8B0FF] uppercase font-semibold">
                        WHAT YOU GET
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#5145D9] shadow-[0_0_8px_#5145D9]" />
                    </div>

                    {/* Concise Outcome Description */}
                    <p className="font-sans text-[15px] sm:text-[16px] text-[#F5F3FF] font-medium leading-[1.55] mb-6">
                      {stage.outcome}
                    </p>

                    {/* Key Outputs Deliverables List */}
                    <div className="pt-5 border-t border-white/[0.06]">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#7A6CFF] block mb-3.5 font-semibold">
                        KEY OUTPUTS
                      </span>
                      <div className="flex flex-col gap-2.5">
                        {stage.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-center gap-3 text-[13px] sm:text-[13.5px] text-[#C2BFD9] font-light"
                          >
                            <span className="w-1.5 h-[1.5px] bg-[#B8B0FF]/70 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </main>

        {/* ========================================================= */}
        {/* BOTTOM BAR: SYNCHRONIZED PROGRESS HAIRLINE TRACK          */}
        {/* ========================================================= */}
        <footer className="relative z-10 w-full max-w-7xl mx-auto pt-4 sm:pt-6 border-t border-white/[0.08]">
          <div className="relative w-full h-[2px] bg-white/[0.08] overflow-hidden rounded-full">
            <div
              ref={progressBarRef}
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#5145D9] via-[#8577FF] to-[#DDD8FF] transition-all duration-100 ease-out"
              style={{ width: "25%" }}
            />
          </div>
        </footer>
      </div>

      {/* ========================================================= */}
      {/* ACCESSIBILITY FALLBACK FOR REDUCED MOTION (UNPINNED)      */}
      {/* ========================================================= */}
      {isReducedMotion && (
        <div className="w-full max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12">
          {STAGES.map((stg) => (
            <div
              key={stg.step}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 rounded-2xl bg-white/[0.02] border border-white/10"
            >
              <div className="lg:col-span-7 flex flex-col items-start">
                <span className="font-mono text-xs text-[#5145D9] font-bold block mb-2">
                  {stg.indicator}
                </span>
                <h4 className="font-sans text-2xl sm:text-3xl font-bold text-white mb-3">
                  {stg.headlineLead}{" "}
                  <span className="font-instrument italic font-normal text-[#DDD8FF]">
                    {stg.headlineAccent}
                  </span>
                </h4>
                <p className="text-sm text-[#A2A0B8] leading-relaxed mb-6">
                  {stg.description}
                </p>
                <div className="w-full pt-4 border-t border-white/[0.08]">
                  <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#7A6CFF] block mb-2 font-semibold">
                    WHAT HAPPENS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#D8D5EE]">
                    {stg.activities.map((act, i) => (
                      <span key={i}>• {act}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-xl bg-[#0D0D18] border border-white/10 p-6">
                <span className="font-mono text-[11px] tracking-wider text-[#B8B0FF] uppercase font-semibold block mb-3">
                  WHAT YOU GET
                </span>
                <p className="text-sm text-white font-medium mb-4">
                  {stg.outcome}
                </p>
                <div className="pt-3 border-t border-white/[0.06]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A6CFF] block mb-2">
                    KEY OUTPUTS
                  </span>
                  <div className="flex flex-col gap-1.5 text-xs text-[#C2BFD9]">
                    {stg.deliverables.map((item, i) => (
                      <span key={i}>— {item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

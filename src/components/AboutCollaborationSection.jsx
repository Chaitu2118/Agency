import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleCube from "./effects/ParticleCube";
import ParticleCodeSymbol from "./effects/ParticleCodeSymbol";

gsap.registerPlugin(ScrollTrigger);

/**
 * Storytelling stages data for "Built Through Collaboration"
 * Complete 4-stage editorial narrative:
 * - Stage 01 (LISTEN): Paired with 3D Particle Cube
 * - Stage 02 (SHAPE):  Paired with 3D Particle Cube
 * - Stage 03 (BUILD):  Paired with 3D Particle Code Symbol </>
 * - Stage 04 (EVOLVE): Paired with 3D Particle Code Symbol </>
 */
const STAGES = [
  {
    step: "01",
    tag: "LISTEN",
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
    bgHue:
      "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(81, 69, 217, 0.16) 0%, rgba(8, 8, 16, 0) 75%)",
  },
  {
    step: "02",
    tag: "SHAPE",
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
    bgHue:
      "radial-gradient(ellipse 75% 65% at 55% 45%, rgba(107, 91, 255, 0.18) 0%, rgba(8, 8, 16, 0) 75%)",
  },
  {
    step: "03",
    tag: "BUILD",
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
    bgHue:
      "radial-gradient(ellipse 75% 65% at 45% 55%, rgba(81, 69, 217, 0.20) 0%, rgba(8, 8, 16, 0) 75%)",
  },
  {
    step: "04",
    tag: "EVOLVE",
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
    bgHue:
      "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(122, 108, 255, 0.18) 0%, rgba(8, 8, 16, 0) 75%)",
  },
];

/**
 * AboutCollaborationSection Component
 *
 * Requirements:
 * 1. 1st and 2nd card: 3D Particle Cube on the right.
 * 2. 3rd and 4th card: 3D Particle Code Symbol </> icon on the right.
 * 3. Removed all AI-generated panels, mock IDEs, telemetry cards from the right side.
 * 4. Removed "BUILT THROUGH COLLABORATION" header line and the 01/02/03/04 navigation buttons.
 * 5. Full GSAP Scroll Dissolve reveal across all 4 stages with comfortable resting hold for Stage 04.
 */
export default function AboutCollaborationSection() {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const stagesRef = useRef([]);
  const bgGlowRef = useRef(null);
  const cubeWrapRef = useRef(null);
  const codeSymbolWrapRef = useRef(null);

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

  // GSAP ScrollTrigger Dissolve Sequence across all 4 stages
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
        }
      });

      // Initial state of 3D visual elements:
      // Cards 1 & 2: ParticleCube active
      // Cards 3 & 4: ParticleCodeSymbol active
      if (cubeWrapRef.current) {
        gsap.set(cubeWrapRef.current, {
          opacity: 1,
          pointerEvents: "auto",
        });
      }
      if (codeSymbolWrapRef.current) {
        gsap.set(codeSymbolWrapRef.current, {
          opacity: 0,
          pointerEvents: "none",
        });
      }

      // Master scrubbed timeline directly bound to ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=380%",
          pin: pinWrapper,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      // =======================================================
      // STAGE 01 -> STAGE 02 (Time: 0.0 -> 1.0)
      // Visual on right: ParticleCube remains active
      // =======================================================
      tl.to(
        stagesRef.current[0].querySelectorAll(".word-reveal"),
        { y: "-35%", opacity: 0, stagger: 0.02, duration: 0.25 },
        0.7
      )
        .to(
          stagesRef.current[0].querySelectorAll(".fade-elem"),
          { y: "-16px", opacity: 0, duration: 0.25 },
          0.7
        )
        .to(
          stagesRef.current[0],
          {
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.3,
            pointerEvents: "none",
          },
          0.75
        )
        .to(
          bgGlowRef.current,
          { background: STAGES[1].bgHue, duration: 0.4 },
          0.75
        )
        // Stage 02 enters at 1.0
        .set(stagesRef.current[1], { pointerEvents: "auto" }, 0.95)
        .to(
          stagesRef.current[1],
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.35,
          },
          1.0
        )
        .to(
          stagesRef.current[1].querySelectorAll(".word-reveal"),
          { y: "0%", opacity: 1, stagger: 0.02, duration: 0.35 },
          1.02
        )
        .to(
          stagesRef.current[1].querySelectorAll(".fade-elem"),
          { y: "0px", opacity: 1, stagger: 0.03, duration: 0.3 },
          1.05
        );

      // =======================================================
      // STAGE 02 -> STAGE 03 (Time: 1.0 -> 2.0)
      // Visual crossfade on right: ParticleCube -> ParticleCodeSymbol </>
      // =======================================================
      tl.to(
        stagesRef.current[1].querySelectorAll(".word-reveal"),
        { y: "-35%", opacity: 0, stagger: 0.02, duration: 0.25 },
        1.7
      )
        .to(
          stagesRef.current[1].querySelectorAll(".fade-elem"),
          { y: "-16px", opacity: 0, duration: 0.25 },
          1.7
        )
        .to(
          stagesRef.current[1],
          {
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.3,
            pointerEvents: "none",
          },
          1.75
        )
        .to(
          bgGlowRef.current,
          { background: STAGES[2].bgHue, duration: 0.4 },
          1.75
        )
        // Crossfade 3D Visual from ParticleCube to ParticleCodeSymbol </>
        .to(
          cubeWrapRef.current,
          {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.35,
          },
          1.75
        )
        .to(
          codeSymbolWrapRef.current,
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.35,
          },
          1.85
        )
        // Stage 03 enters at 2.0
        .set(stagesRef.current[2], { pointerEvents: "auto" }, 1.95)
        .to(
          stagesRef.current[2],
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.35,
          },
          2.0
        )
        .to(
          stagesRef.current[2].querySelectorAll(".word-reveal"),
          { y: "0%", opacity: 1, stagger: 0.02, duration: 0.35 },
          2.02
        )
        .to(
          stagesRef.current[2].querySelectorAll(".fade-elem"),
          { y: "0px", opacity: 1, stagger: 0.03, duration: 0.3 },
          2.05
        );

      // =======================================================
      // STAGE 03 -> STAGE 04 (Time: 2.0 -> 3.0)
      // Visual on right: ParticleCodeSymbol </> remains active
      // =======================================================
      tl.to(
        stagesRef.current[2].querySelectorAll(".word-reveal"),
        { y: "-35%", opacity: 0, stagger: 0.02, duration: 0.25 },
        2.7
      )
        .to(
          stagesRef.current[2].querySelectorAll(".fade-elem"),
          { y: "-16px", opacity: 0, duration: 0.25 },
          2.7
        )
        .to(
          stagesRef.current[2],
          {
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.3,
            pointerEvents: "none",
          },
          2.75
        )
        .to(
          bgGlowRef.current,
          { background: STAGES[3].bgHue, duration: 0.4 },
          2.75
        )
        // Stage 04 enters at 3.0
        .set(stagesRef.current[3], { pointerEvents: "auto" }, 2.95)
        .to(
          stagesRef.current[3],
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.35,
          },
          3.0
        )
        .to(
          stagesRef.current[3].querySelectorAll(".word-reveal"),
          { y: "0%", opacity: 1, stagger: 0.02, duration: 0.35 },
          3.02
        )
        .to(
          stagesRef.current[3].querySelectorAll(".fade-elem"),
          { y: "0px", opacity: 1, stagger: 0.03, duration: 0.3 },
          3.05
        );

      // STAGE 04 EXTENDED RESTING HOLD (Time: 3.0 -> 4.2)
      // Dedicated hold distance so Stage 04 and </> stay rock solid & comfortable to read!
      tl.to({}, { duration: 1.2 }, 3.0);
    }, container);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="collaboration"
      aria-label="Collaboration Process"
      className="relative w-full bg-[#080810] text-[#F5F3FF]"
      style={{
        backgroundColor: "#080810",
      }}
    >
      {/* Inline Subtle CSS Noise Grain */}
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
        className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 sm:px-10 lg:px-16 py-10 sm:py-16"
      >
        {/* Ambient Gradient Background Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
        >
          <div
            ref={bgGlowRef}
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              background: STAGES[0].bgHue,
            }}
          />
          {/* Subtle Architectural Hairline Grid */}
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
        {/* CENTER VISUAL STAGE CANVAS: BALANCED TWO-COLUMN EDITORIAL */}
        {/* Clean presentation with zero top bars or redundant labels */}
        {/* ========================================================= */}
        <main className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex items-center justify-center my-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-center">
            
            {/* ------------------------------------------------- */}
            {/* LEFT COLUMN: 4 DISSOLVING STAGES (7 Columns)      */}
            {/* ------------------------------------------------- */}
            <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[460px] flex items-center">
              {STAGES.map((stage, idx) => (
                <article
                  key={stage.step}
                  ref={(el) => (stagesRef.current[idx] = el)}
                  className="absolute inset-0 flex flex-col justify-center items-start text-left"
                  style={{
                    willChange: "opacity, transform, filter",
                  }}
                >
                  {/* Large Editorial Headline */}
                  <h3 className="font-sans font-bold text-[32px] sm:text-[44px] md:text-[50px] lg:text-[54px] xl:text-[60px] leading-[1.08] tracking-[-0.035em] text-white mb-4 sm:mb-6 select-none">
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
                </article>
              ))}
            </div>

            {/* ------------------------------------------------- */}
            {/* RIGHT COLUMN: DEDICATED 3D PARTICLE SHOWCASE      */}
            {/* Cards 1 & 2: ParticleCube                         */}
            {/* Cards 3 & 4: ParticleCodeSymbol </>               */}
            {/* ------------------------------------------------- */}
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[380px] sm:max-w-[450px] flex items-center justify-center">
                {/* Atmospheric Violet Glow behind 3D Particle Visuals */}
                <div
                  aria-hidden="true"
                  className="absolute w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full blur-[90px] opacity-45 select-none pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, #5848FF 0%, #221A65 48%, transparent 70%)",
                  }}
                />

                {/* Visual 1: 3D Volumetric Particle Cube (Active for Cards 1 & 2) */}
                <div
                  ref={cubeWrapRef}
                  className="absolute inset-0 flex items-center justify-center will-change-[opacity,transform,filter]"
                  style={{
                    opacity: 1,
                    pointerEvents: "auto",
                    animation: isReducedMotion
                      ? "none"
                      : "tavqoCubeFloat 7s ease-in-out infinite",
                  }}
                >
                  <ParticleCube
                    className="w-full h-full aspect-square"
                    size={1.48}
                    totalParticles={12000}
                  />
                </div>

                {/* Visual 2: 3D Volumetric Particle Code Symbol </> (Active for Cards 3 & 4) */}
                <div
                  ref={codeSymbolWrapRef}
                  className="absolute inset-0 flex items-center justify-center will-change-[opacity,transform,filter]"
                  style={{
                    opacity: 0,
                    pointerEvents: "none",
                    animation: isReducedMotion
                      ? "none"
                      : "tavqoCubeFloat 7s ease-in-out infinite",
                  }}
                >
                  <ParticleCodeSymbol
                    className="w-full h-full aspect-square"
                    scale={1.05}
                    totalParticles={12500}
                  />
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* ========================================================= */}
      {/* ACCESSIBILITY FALLBACK FOR REDUCED MOTION (UNPINNED)      */}
      {/* ========================================================= */}
      {isReducedMotion && (
        <div className="w-full max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12">
          {STAGES.map((stg, i) => (
            <div
              key={stg.step}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 rounded-2xl bg-white/[0.02] border border-white/10"
            >
              <div className="lg:col-span-7 flex flex-col items-start">
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
                    {stg.activities.map((act, aIdx) => (
                      <span key={aIdx}>• {act}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex items-center justify-center">
                {i < 2 ? (
                  <div className="w-full aspect-square max-w-[320px]">
                    <ParticleCube
                      className="w-full h-full"
                      size={1.4}
                      totalParticles={6000}
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square max-w-[320px]">
                    <ParticleCodeSymbol
                      className="w-full h-full"
                      scale={1.0}
                      totalParticles={6000}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Global Style for Keyframe Floating Animation */}
      <style>{`
        @keyframes tavqoCubeFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(1deg);
          }
        }
      `}</style>
    </section>
  );
}

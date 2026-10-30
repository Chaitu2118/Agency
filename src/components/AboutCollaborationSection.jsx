import FlexCarousel from "./ui/FlexCarousel";

const COLLABORATION_STAGES = [
  {
    id: 1,
    title: "LISTEN",
    headline: "Every great solution starts with understanding.",
    description:
      "We explore your vision, goals and challenges before deciding what to build.",
    bgColor: "#5145D9",
    borderColor: "rgba(255, 255, 255, 0.22)",
    aspect: 0.82,
  },
  {
    id: 2,
    title: "SHAPE",
    headline: "Turn possibilities into a clear direction.",
    description:
      "We define the concept, experience and technical approach.",
    bgColor: "#11111B",
    borderColor: "rgba(255, 255, 255, 0.14)",
    aspect: 0.82,
  },
  {
    id: 3,
    title: "BUILD",
    headline: "Ideas become real through engineering.",
    description:
      "We design, develop and refine your digital solution.",
    bgColor: "#5145D9",
    borderColor: "rgba(255, 255, 255, 0.22)",
    aspect: 0.82,
  },
  {
    id: 4,
    title: "EVOLVE",
    headline: "Launch is only the beginning.",
    description:
      "We help improve and grow your solution as opportunities change.",
    bgColor: "#11111B",
    borderColor: "rgba(255, 255, 255, 0.14)",
    aspect: 0.82,
  },
];

/**
 * AboutCollaborationSection Component
 * Content-only typographic FlexCarousel showcase on the TAVQO About Us page.
 * Powered by WebGL OGL liquid FlexCarousel:
 * - Four typographic content panels: Listen, Shape, Build, Evolve.
 * - Solid alternating backgrounds: Electric Violet (#5145D9) & Deep Charcoal (#11111B).
 * - Sharp DOM vector typography overlays tracking the 3D WebGL cards.
 * - Fluid liquid lens distortion, 3D tilt (62°), twist curl, and curve effects.
 * - Click-to-focus and manual drag/wheel navigation with autoplay disabled.
 * - Deep dark canvas (#07080D) with atmospheric violet radial glow.
 */
export default function AboutCollaborationSection() {
  return (
    <section
      aria-label="Built Through Collaboration"
      className="relative w-full py-20 sm:py-28 lg:py-32 overflow-hidden bg-[#07080D] text-white select-none"
      style={{
        backgroundColor: "#07080D",
      }}
    >
      {/* 1. Subtle Atmospheric Violet Glow & Blueprint Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[550px] rounded-full blur-[150px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, #5268FF 0%, #7764F8 40%, transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center">
        {/* ========================================================= */}
        {/* 2. SECTION HEADER (CENTERED)                              */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mb-10 sm:mb-14 lg:mb-16">
          {/* Small Section Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5268FF]" />
            <span className="font-mono text-[10.5px] sm:text-[11.5px] tracking-[0.24em] uppercase text-white/80 font-medium">
              OUR PROCESS
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-[38px] uppercase tracking-[-0.025em] text-white leading-[1.15] mb-4">
            BUILT THROUGH COLLABORATION.
          </h2>

          {/* Supporting Text */}
          <p className="font-sans text-[15px] sm:text-[16px] lg:text-[17px] text-[#A0A0B2] font-normal leading-[1.7] max-w-2xl mx-auto">
            Great digital products aren't built in isolation. They're shaped through conversations, shared ideas and continuous collaboration.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 3. CONTENT-ONLY FLEXCAROUSEL COMPONENT CONTAINER          */}
        {/* Generous vertical space to showcase WebGL lens distortion */}
        {/* ========================================================= */}
        <div className="relative w-full h-[540px] sm:h-[600px] lg:h-[650px] rounded-3xl overflow-hidden bg-white/[0.015] border border-white/[0.06] shadow-[0_30px_90px_-25px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.05)]">
          <FlexCarousel
            items={COLLABORATION_STAGES}
            preset="liquid"
            intro="rise"
            cardHeight={0.52}
            gap={14}
            squeeze={0.2}
            focusOnClick={true}
            captions={true}
            fit="natural"
            radius={0}
            lensWidth={0.74}
            lensHeight={1.18}
            tilt={62}
            roundness={1}
            bend={0.34}
            reach={0.38}
            curl="twist"
            dispersion={0.45}
            liquid={0}
            followCursor={false}
            autoplay={false}
            interval={4}
            captureWheel={true}
            className="w-full h-full text-white"
          />
        </div>

        {/* Minimal Interactive Hint */}
        <div className="mt-5 text-center">
          <p className="font-mono text-[11px] sm:text-[12px] uppercase tracking-widest text-[#707086]">
            Drag or scroll to navigate • Click card to focus
          </p>
        </div>
      </div>
    </section>
  );
}


import aboutHeroBg from "../../assets/76619afd-985b-4003-81f1-b55fa3778df7.png";
import TextAnimation from "@/components/ui/staggerText";

/**
 * AboutHero Component
 * Full-width cinematic hero section for the TAVQO About Us page.
 * Uses the exact selected photographic asset, subtle dark gradient overlays,
 * and high-contrast editorial typography.
 */
export default function AboutHero() {
  return (
    <section
      aria-label="About TAVQO Hero"
      className="relative w-full h-[85vh] min-h-[580px] max-h-[920px] overflow-hidden flex flex-col justify-between bg-[#07080D] text-white select-none"
    >
      {/* 1. Full-Width Background Photographic Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={aboutHeroBg}
          alt="TAVQO Studio cinematic hero background"
          className="w-full h-full object-cover object-[center_32%] sm:object-[center_35%]"
          loading="eager"
          decoding="async"
        />

        {/* Top Dark Gradient Scrim for Navbar Contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#07080D]/85 via-[#07080D]/40 to-transparent pointer-events-none"
          style={{ height: "35%" }}
        />

        {/* Soft Ambient Scrim to Maintain Depth and Contrast */}
        <div className="absolute inset-0 bg-[#07080D]/25 pointer-events-none" />

        {/* Lower Dark Gradient Scrim to Protect Headline and Supporting Text */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-[#07080D]/75 to-transparent pointer-events-none"
          style={{ top: "35%" }}
        />
      </div>

      {/* 2. Top Header Space (Navbar Clearance & Small Label) */}
      <div className="relative z-10 pt-28 sm:pt-32 px-6 sm:px-10 lg:px-[6.5vw]">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5268FF] animate-pulse" />
          <span className="text-[10px] sm:text-[11.5px] font-mono tracking-[0.24em] uppercase text-white/90 font-semibold">
            ABOUT TAVQO
          </span>
        </div>
      </div>

      {/* 3. Lower-Middle & Bottom Typography Hierarchy */}
      <div className="relative z-10 pb-8 sm:pb-12 lg:pb-14 px-6 sm:px-10 lg:px-[6.5vw] flex flex-col justify-end">
        {/* Main Headline Across Lower-Middle */}
        <div className="mb-6 sm:mb-8 lg:mb-10 max-w-5xl">
          <h1 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[78px] uppercase tracking-[-0.035em] text-white leading-[0.96]">
            <TextAnimation divideBy="word" delay={0.2}>
              WE TURN IDEAS INTO DIGITAL EXPERIENCES.
            </TextAnimation>
          </h1>
        </div>

        {/* Lower Bar: Supporting Headline Near Lower-Left, Description Near Lower-Right */}
        <div className="pt-5 sm:pt-6 border-t border-white/15 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 lg:gap-12 items-end">
          {/* Supporting Headline (Lower-Left) */}
          <div className="md:col-span-6 lg:col-span-5">
            <h2 className="font-sans font-normal text-base sm:text-lg lg:text-[19px] text-white/95 leading-snug">
              Design, engineering and technology —{" "}
              <span className="text-white font-medium">working together.</span>
            </h2>
          </div>

          {/* Spacer Column on Desktop */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Description (Lower-Right) */}
          <div className="md:col-span-6 lg:col-span-5 flex md:justify-end">
            <p className="font-sans font-light text-xs sm:text-[13px] lg:text-[14px] text-white/75 leading-relaxed max-w-md">
              We build websites, applications, digital products and intelligent systems that transform ideas into meaningful digital experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


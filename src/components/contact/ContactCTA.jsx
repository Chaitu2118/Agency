import { ArrowUp, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import KineticTypography, { KineticWord } from "./KineticTypography";

/**
 * Section 5: Final CTA
 * - Razor-sharp kinetic typography reveal without blur filters
 * - Ambient violet gradient atmosphere (NO 3D objects)
 * - Rock-solid, crystal-clear rendering on all displays
 */
export default function ContactCTA() {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const formEl = document.getElementById("inquiry-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Final Call to Action"
      className="relative w-full py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-[6.5vw] bg-[#050508] text-[#F4F3FA] overflow-hidden select-text border-t border-white/[0.08]"
    >
      {/* =================================================================== */}
      {/* 1. ATMOSPHERIC VIOLET LIGHTING DRIFT (NO 3D OBJECTS)                */}
      {/* =================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
      >
        {/* Central glowing dome with smooth drift */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[550px] rounded-full blur-[160px] opacity-25 animate-violet-drift"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(130, 117, 255, 0.32) 0%, rgba(81, 71, 255, 0.15) 40%, rgba(23, 21, 47, 0.08) 70%, transparent 80%)",
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* =================================================================== */}
      {/* 2. FOREGROUND CALL TO ACTION                                        */}
      {/* =================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[1000px] mx-auto text-center flex flex-col items-center"
      >
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.12] mb-6 sm:mb-8 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8275FF] animate-pulse" />
          <span className="text-[10.5px] sm:text-[11.5px] font-mono tracking-[0.22em] uppercase text-[#C7C0FF] font-semibold">
            GET IN TOUCH WITH TAVQO
          </span>
        </div>

        {/* Kinetic Heading */}
        <h2 className="font-sans font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight text-[#F4F3FA] leading-[1.08] max-w-4xl">
          <KineticTypography delay={0.1} stagger={0.06}>
            <KineticWord className="mr-[0.24em]">Great</KineticWord>
            <KineticWord className="mr-[0.24em]">things</KineticWord>
            <KineticWord className="font-instrument italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C7C0FF] to-[#8275FF]">
              start with a conversation.
            </KineticWord>
          </KineticTypography>
        </h2>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mt-8 sm:mt-11">
          {/* Main CTA */}
          <a
            href="#inquiry-form"
            onClick={handleScrollToForm}
            className="group inline-flex items-center gap-3 px-8 sm:px-9 py-4 rounded-full bg-[#8275FF] text-[#050508] font-sans font-semibold text-[14px] sm:text-[15px] hover:bg-[#968BFF] shadow-[0_12px_32px_rgba(130,117,255,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] hover:shadow-[0_18px_48px_rgba(130,117,255,0.7),inset_0_1px_0_rgba(255,255,255,0.6)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <span>Let&apos;s Talk</span>
            <span className="w-6 h-6 rounded-full bg-[#050508]/15 flex items-center justify-center text-xs font-bold transition-colors duration-300">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* Secondary Direct Email CTA */}
          <a
            href="mailto:hello@tavqo.com"
            className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#F4F3FA] border border-white/[0.12] hover:border-[#8275FF]/50 font-sans font-medium text-[14px] sm:text-[15px] transition-all duration-300 active:scale-[0.98] cursor-pointer backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_30px_rgba(130,117,255,0.15)]"
          >
            <span>Direct Email</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#9696A8] group-hover:text-white transition-colors duration-200" />
          </a>
        </div>

      </motion.div>
    </section>
  );
}

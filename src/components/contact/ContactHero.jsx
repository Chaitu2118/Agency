import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, Clock, MapPin } from "lucide-react";
import KineticTypography, { KineticWord } from "./KineticTypography";

/**
 * Section 1: Contact Hero
 * - Kinetic typography reveals with Instrument Serif + Manrope combination.
 * - Multi-stop animated violet gradient background (pure CSS, NO 3D objects).
 * - Rock-solid layout without hover tilt or translation shifts.
 */
export default function ContactHero({ onStartProjectClick }) {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    if (onStartProjectClick) {
      onStartProjectClick();
      return;
    }
    const formEl = document.getElementById("inquiry-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      aria-label="Contact TAVQO Hero"
      className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between pt-32 sm:pt-36 lg:pt-42 pb-16 sm:pb-20 px-6 sm:px-10 lg:px-[6.5vw] overflow-hidden select-text bg-[#050508] text-[#F4F3FA]"
    >
      {/* =================================================================== */}
      {/* 1. ANIMATED VIOLET GRADIENT BACKGROUND (NO 3D OBJECTS)              */}
      {/* =================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
      >
        {/* Living upper-center radial bloom drifting slowly */}
        <div
          className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1000px] h-[650px] rounded-full blur-[140px] animate-violet-drift"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(130, 117, 255, 0.28) 0%, rgba(81, 71, 255, 0.14) 40%, rgba(23, 21, 47, 0.08) 65%, transparent 80%)",
          }}
        />

        {/* Ambient indigo-violet side drift */}
        <div
          className="absolute top-[25%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[150px] animate-indigo-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(130, 117, 255, 0.18) 0%, rgba(23, 21, 47, 0.45) 55%, transparent 80%)",
          }}
        />

        {/* Ambient lower-right counter spotlight */}
        <div
          className="absolute top-[45%] -right-[15%] w-[650px] h-[650px] rounded-full blur-[160px] animate-violet-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(82, 104, 255, 0.16) 0%, rgba(23, 21, 47, 0.3) 55%, transparent 75%)",
            animationDelay: "-10s",
          }}
        />

        {/* Subtle architectural dot texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(244, 243, 250, 0.7) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* =================================================================== */}
      {/* 2. FOREGROUND EDITORIAL CONTENT                                    */}
      {/* =================================================================== */}
      <div className="relative z-10 max-w-[1360px] mx-auto w-full flex-1 flex flex-col justify-center">
        

        {/* 3D Kinetic Headline */}
        <div className="max-w-5xl">
          <h1 className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[82px] xl:text-[92px] tracking-[-0.035em] text-[#F4F3FA] leading-[1.04]">
            {/* Line 1: Have an idea? */}
            <div className="block overflow-hidden pb-1">
              <KineticTypography delay={0.05} stagger={0.06}>
                Have an idea?
              </KineticTypography>
            </div>

            {/* Line 2: Let's make it happen. (Manrope + Instrument Serif italic) */}
            <div className="block overflow-hidden pt-1">
              <KineticTypography delay={0.25} stagger={0.08}>
                <KineticWord className="mr-[0.22em]">
                  Let&apos;s
                </KineticWord>
                <KineticWord className="font-instrument italic font-normal tracking-[-0.015em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#DDD8FF] to-[#8275FF] drop-shadow-[0_10px_25px_rgba(130,117,255,0.25)]">
                  make it happen.
                </KineticWord>
              </KineticTypography>
            </div>
          </h1>
        </div>

        {/* Two CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 sm:gap-5 mt-8 sm:mt-12"
        >
          {/* Primary CTA: Start a Project */}
          <a
            href="#inquiry-form"
            onClick={handleScrollToForm}
            className="group relative inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#8275FF] text-[#050508] font-sans font-semibold text-[13.5px] sm:text-[14.5px] hover:bg-[#968BFF] shadow-[0_10px_30px_rgba(130,117,255,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_15px_45px_rgba(130,117,255,0.65),inset_0_1px_0_rgba(255,255,255,0.5)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <span>Start a Project</span>
            <span className="w-6 h-6 rounded-full bg-[#050508]/15 flex items-center justify-center text-xs font-bold transition-transform duration-300">
              <ArrowDown className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* Secondary CTA: Explore Our Services */}
          <a
            href="/#services"
            className="group inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#F4F3FA] border border-white/[0.12] hover:border-[#8275FF]/50 font-sans font-medium text-[13.5px] sm:text-[14.5px] active:scale-[0.98] transition-all duration-300 cursor-pointer backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_30px_rgba(130,117,255,0.15)]"
          >
            <span>Explore Our Services</span>
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white transition-colors duration-300">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </motion.div>

      </div>

      {/* =================================================================== */}
      {/* 3. LOWER EDITORIAL STUDIO METRICS & TRUST STRIP                     */}
      {/* =================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45 }}
        className="relative z-10 max-w-[1360px] mx-auto w-full pt-12 sm:pt-16 mt-8 border-t border-white/[0.08]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-[#9696A8] text-xs sm:text-[13px] font-sans">
          
          {/* Item 1 */}
          <div className="group flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-[#8275FF]/40 group-hover:bg-[#8275FF]/10 flex items-center justify-center text-[#8275FF] shrink-0 transition-colors duration-300 shadow-sm">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[#F4F3FA] font-medium group-hover:text-white transition-colors">Hyderabad, India</p>
              <p className="text-[#9696A8] text-[11px] font-mono">IST (UTC+5:30) • Global Clients</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="group flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-[#8275FF]/40 group-hover:bg-[#8275FF]/10 flex items-center justify-center text-[#8275FF] shrink-0 transition-colors duration-300 shadow-sm">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[#F4F3FA] font-medium group-hover:text-white transition-colors">Quick Turnaround</p>
              <p className="text-[#9696A8] text-[11px] font-mono">Replies within 24 business hours</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="group flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-[#8275FF]/40 group-hover:bg-[#8275FF]/10 flex items-center justify-center text-[#8275FF] shrink-0 transition-colors duration-300 shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[#F4F3FA] font-medium group-hover:text-white transition-colors">Current Status</p>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8275FF]">
                <span>Open for new projects</span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

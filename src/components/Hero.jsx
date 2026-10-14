import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import PredictiveArc from "./effects/PredictiveArc";

export default function Hero({ isRevealed = true }) {
  const heroRef = useRef(null);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null); // 'services' | 'discuss' | null

  // GSAP Cinematic Entrance Timeline
  useEffect(() => {
    if (!isRevealed) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.1
      )
        .fromTo(
          ".hero-headline-line",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          0.2
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.45
        )
        .fromTo(
          ".hero-cta-btn",
          { opacity: 0, y: 15, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1 },
          0.6
        )
        .fromTo(
          ".hero-stat-item",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 },
          0.75
        )
        .fromTo(
          ".hero-footer-item",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          0.9
        );
    }, heroRef);

    return () => ctx.revert();
  }, [isRevealed]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] w-full flex flex-col justify-between pt-24 sm:pt-28 lg:pt-28 pb-8 sm:pb-10 px-6 sm:px-10 overflow-hidden text-center select-text"
      style={{
        backgroundColor: "#FBF5EB",
        backgroundImage: "linear-gradient(115deg, #FBF5EB 0%, #F5E7D3 48%, #EBD7BB 100%)",
      }}
    >
      {/* OriginKit Predictive Arc Background Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 w-full h-full overflow-hidden"
      >
        <PredictiveArc
          interactiveTargetRef={heroRef}
          transparent={true}
          background="#FBF5EB"
          baseColor="#4A2612"
          accentColor="#C8945D"
          highlight="#E8C99A"
          density={100}
          dotSize={52}
          speed={32}
          arch={{
            peak: 43,
            archHeight: 75,
            thickness: 65,
            falloff: 300,
          }}
          pointer={{
            enabled: true,
            radius: 280,
            strength: 85,
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Subtle Atmospheric Radial-Gradient Veil for Contrast Behind Editorial Typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 72% 58% at 50% 43%, rgba(251, 245, 235, 0.84) 0%, rgba(251, 245, 235, 0.58) 42%, rgba(251, 245, 235, 0.16) 75%, transparent 100%)",
        }}
      />

      {/* ========================================================= */}
      {/* MAIN HERO CONTENT (AGENCY EDITORIAL POSITIONING)          */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-[980px] mx-auto flex-grow flex flex-col items-center justify-center my-auto py-2 sm:py-4">
        {/* Eyebrow (Clean Typographic Treatment Without Capsule) */}
        <div className="hero-eyebrow mb-5 sm:mb-7 flex items-center justify-center">
          <span className="text-[10.5px] sm:text-[11.5px] font-sans font-semibold tracking-[0.24em] uppercase text-[#815B3D]">
            DIGITAL SOLUTIONS · PRODUCT ENGINEERING · INTELLIGENT AUTOMATION
          </span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="font-serif text-[44px] sm:text-[64px] md:text-[76px] lg:text-[86px] font-normal tracking-[-0.035em] leading-[1.14] text-[#28170E] mb-5 sm:mb-6 select-none">
          <div className="hero-headline-line">
            <span>We Turn Ideas</span>
          </div>
          <div className="hero-headline-line">
            <span>Into Digital</span>
          </div>
          <div className="hero-headline-line pb-1.5 sm:pb-2">
            <span className="italic font-light text-[#89552F]">
              Experiences.
            </span>
          </div>
        </h1>

        {/* Agency Narrative Description */}
        <p className="hero-description max-w-[660px] text-[15.5px] sm:text-[17.5px] text-[#665344] font-sans font-light leading-[1.62] tracking-[-0.01em] mb-8 sm:mb-9">
          We design and build websites, mobile applications and intelligent digital
          solutions that help businesses grow, work smarter and stand apart.
        </p>

        {/* Action CTAs with Coordinated Inversion Hover */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
          {/* Primary CTA: Explore Our Services */}
          <a
            href="#services"
            onMouseEnter={() => setHoveredBtn("services")}
            onMouseLeave={() => setHoveredBtn(null)}
            className={`hero-cta-btn group relative overflow-hidden inline-flex items-center justify-center px-8 sm:px-9 py-3.5 sm:py-4 rounded-full text-[13px] font-sans font-medium tracking-[0.1em] uppercase border shadow-md active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out ${
              hoveredBtn === "services"
                ? "border-white shadow-xl shadow-[#49250F]/25 -translate-y-0.5 bg-[#49250F]"
                : hoveredBtn === "discuss"
                ? "bg-[#FAF4EB]/90 border-[#DDC6A9] text-[#49250F] shadow-sm"
                : "bg-[#49250F] text-[#FFF8EF] border-[#DDC6A9]/70 shadow-[#49250F]/20"
            }`}
          >
            {/* Left-to-right white fill on hover */}
            <span
              aria-hidden="true"
              className={`absolute inset-0 bg-white rounded-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                hoveredBtn === "services" ? "translate-x-0" : "-translate-x-full"
              }`}
            />
            <span
              className={`relative z-10 transition-colors duration-300 ${
                hoveredBtn === "services"
                  ? "text-[#28170E]"
                  : hoveredBtn === "discuss"
                  ? "text-[#49250F]"
                  : "text-[#FFF8EF]"
              }`}
            >
              Explore Our Services
            </span>
            <span
              className={`relative z-10 ml-2 text-[14px] transition-all duration-300 ${
                hoveredBtn === "services"
                  ? "text-[#28170E] translate-x-1.5"
                  : hoveredBtn === "discuss"
                  ? "text-[#89552F]"
                  : "text-[#E8C99A]"
              }`}
            >
              →
            </span>
          </a>

          {/* Secondary CTA: Discuss Your Project (Automatically inverts when Explore is hovered) */}
          <a
            href="#contact"
            onMouseEnter={() => setHoveredBtn("discuss")}
            onMouseLeave={() => setHoveredBtn(null)}
            className={`hero-cta-btn group inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-[13px] font-sans font-medium tracking-[0.09em] uppercase border active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out ${
              hoveredBtn === "services"
                ? "bg-[#49250F] text-[#FFF8EF] border-[#49250F] shadow-md shadow-[#49250F]/25"
                : hoveredBtn === "discuss"
                ? "bg-[#28170E] text-[#FFF8EF] border-[#28170E] shadow-xl shadow-[#49250F]/30 -translate-y-0.5"
                : "bg-[#FAF4EB]/90 text-[#49250F] border-[#DDC6A9] shadow-2xs"
            }`}
          >
            <span className="transition-colors duration-300">Discuss Your Project</span>
            <span
              className={`ml-2 text-[14px] transition-all duration-300 ${
                hoveredBtn === "services"
                  ? "text-[#D9B88F]"
                  : hoveredBtn === "discuss"
                  ? "text-[#FFF8EF] translate-x-1.5"
                  : "text-[#89552F]"
              }`}
            >
              →
            </span>
          </a>
        </div>

        {/* Capability / Services Statistics Row */}
        <div className="w-full max-w-[760px] grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 pt-8 border-t border-[#DDC6A9]/60">
          {[
            { value: "Web", label: "Websites & Digital Experiences" },
            { value: "Mobile", label: "Application Development" },
            { value: "AI + Automation", label: "Intelligent Workflows" },
            { value: "End-to-End", label: "Design to Deployment" },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className={`hero-stat-item flex flex-col items-center text-center ${idx !== 0 ? "sm:border-l sm:border-[#DDC6A9]/60 sm:pl-3" : ""
                }`}
            >
              <span className="font-serif text-[22px] sm:text-[25px] font-normal text-[#28170E] leading-none mb-1.5 whitespace-nowrap">
                {stat.value}
              </span>
              <span className="font-sans text-[11px] sm:text-[11.5px] text-[#665344] font-normal leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* HERO FOOTER SUB-BAR                                       */}
      {/* ========================================================= */}
      <div className="hero-footer-item relative z-10 w-full max-w-[1320px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DDC6A9]/40 text-[#665344]">
        {/* Left: Scroll to explore */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-7 rounded-full border border-[#89552F]/40 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 rounded-full bg-[#89552F] animate-bounce" />
          </div>
          <span className="text-[10.5px] font-sans tracking-[0.2em] uppercase font-semibold text-[#815B3D]">
            Scroll to explore
          </span>
          <div className="w-12 h-[1px] bg-[#DDC6A9]/60 hidden sm:block" />
        </div>

        {/* Right: Quote / Mission */}
        <div className="flex items-center gap-2 text-center sm:text-right">
          <span className="text-[#89552F] text-[8px]">●</span>
          <p className="text-[12.5px] sm:text-[13.5px] font-serif italic text-[#665344]">
            &ldquo;Partnering with founders and enterprises to engineer high-impact digital solutions.&rdquo;
          </p>
          <div className="w-12 h-[1px] bg-[#DDC6A9]/60 hidden sm:block" />
        </div>
      </div>

      {/* ========================================================= */}
      {/* AGENCY OVERVIEW MODAL (Available via button/links)        */}
      {/* ========================================================= */}
      {isIntroModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#23140A]/70 backdrop-blur-md animate-fade-slide-down"
        >
          <div className="relative w-full max-w-[620px] rounded-3xl bg-[#FBF5EB] border border-[#DDC6A9] p-6 sm:p-8 shadow-2xl text-left">
            <button
              type="button"
              onClick={() => setIsIntroModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF3E8] hover:bg-[#321A0C] text-[#321A0C] hover:text-[#FFF8EF] flex items-center justify-center transition-colors font-sans text-sm"
              aria-label="Close modal"
            >
              ✕
            </button>

            <span className="text-[10.5px] font-sans font-semibold tracking-[0.22em] uppercase text-[#815B3D] block mb-2">
              About TAVQO
            </span>
            <h3 className="font-serif text-[28px] sm:text-[34px] font-normal text-[#28170E] mb-4">
              We Turn Ideas Into Digital Experiences
            </h3>
            <p className="text-[15px] font-sans text-[#665344] leading-relaxed mb-6 font-light">
              TAVQO is a premier digital solutions and development agency partnering with founders,
              enterprises and growing brands to design bespoke websites, native mobile applications,
              intelligent workflow automations, and scalable cloud architectures.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-center">
              <div className="p-3 rounded-xl bg-[#FAF3E8] border border-[#DDC6A9]/60">
                <span className="text-[17px] font-serif font-bold text-[#28170E] block">
                  Web
                </span>
                <span className="text-[11px] font-sans text-[#815B3D]">
                  Experiences
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF3E8] border border-[#DDC6A9]/60">
                <span className="text-[17px] font-serif font-bold text-[#28170E] block">
                  Mobile
                </span>
                <span className="text-[11px] font-sans text-[#815B3D]">
                  Apps
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF3E8] border border-[#DDC6A9]/60">
                <span className="text-[17px] font-serif font-bold text-[#28170E] block">
                  AI & Auto
                </span>
                <span className="text-[11px] font-sans text-[#815B3D]">
                  Workflows
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF3E8] border border-[#DDC6A9]/60">
                <span className="text-[17px] font-serif font-bold text-[#28170E] block">
                  End-to-End
                </span>
                <span className="text-[11px] font-sans text-[#815B3D]">
                  Delivery
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <a
                href="#services"
                onClick={() => setIsIntroModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#49250F] text-[#FFF8EF] text-[12.5px] font-sans font-medium uppercase tracking-[0.1em]"
              >
                Explore Services ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

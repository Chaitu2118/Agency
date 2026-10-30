import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Mail,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { WHEEL_SLIDES } from "../data/wheelSlidesData";

gsap.registerPlugin(ScrollTrigger);

/**
 * VerticalWheelCarousel Component
 * Genuine Vertical 3D Ferris Wheel Carousel rotating around the X-axis in the Y-Z plane.
 * As user scrolls vertically, cards travel downward from the top of the wheel to front-center,
 * then downward around the bottom, behind the wheel, and back to the top.
 */
export default function VerticalWheelCarousel({ slides = WHEEL_SLIDES }) {
  const pinWrapperRef = useRef(null);
  const wheelStageRef = useRef(null);
  const cardElementsRef = useRef([]);
  const cardIndicatorRef = useRef(null);
  const cardNameRef = useRef(null);
  const progressFillRef = useRef(null);

  const totalCards = slides.length;
  // Angular step between cards around the vertical 360-degree circle
  const angleStep = 360 / totalCards; // ~51.42857 deg

  const [activeIndex, setActiveIndex] = useState(0);

  // Per-card interactive states
  const [activeDiscipline, setActiveDiscipline] = useState("design");
  const [activeApproachStage, setActiveApproachStage] = useState(0);
  const [selectedServiceId, setSelectedServiceId] = useState("web");
  const [activeProcessStage, setActiveProcessStage] = useState(0);
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Responsive dimensions for 3D Ferris Wheel
  const [dimensions, setDimensions] = useState(() => {
    if (typeof window === "undefined") {
      return { cardWidth: 840, cardHeight: 520, radius: 620, perspective: 1600 };
    }
    const w = window.innerWidth;
    if (w < 768) {
      return {
        cardWidth: Math.min(w * 0.92, 400),
        cardHeight: 510,
        radius: 470,
        perspective: 1100,
      };
    }
    if (w < 1024) {
      return { cardWidth: 700, cardHeight: 490, radius: 540, perspective: 1400 };
    }
    return { cardWidth: 840, cardHeight: 520, radius: 620, perspective: 1600 };
  });

  // Handle window resizing
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setDimensions({
          cardWidth: Math.min(w * 0.92, 400),
          cardHeight: 510,
          radius: 470,
          perspective: 1100,
        });
      } else if (w < 1024) {
        setDimensions({
          cardWidth: 700,
          cardHeight: 490,
          radius: 540,
          perspective: 1400,
        });
      } else {
        setDimensions({
          cardWidth: 840,
          cardHeight: 520,
          radius: 620,
          perspective: 1600,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Update 3D card transforms in the Y-Z plane around the X-axis
   */
  const updateWheelPositions = useCallback(
    (currentProgress) => {
      const clampedIdx = Math.max(0, Math.min(totalCards - 1, Math.round(currentProgress)));
      setActiveIndex(clampedIdx);

      // Update HUD elements
      if (cardIndicatorRef.current) {
        cardIndicatorRef.current.textContent = `${slides[clampedIdx].number} / 07`;
      }
      if (cardNameRef.current) {
        cardNameRef.current.textContent = slides[clampedIdx].title;
      }
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${((currentProgress + 1) / totalCards) * 100}%`;
      }

      const R = dimensions.radius;

      // Update each card's position in Y-Z plane
      cardElementsRef.current.forEach((el, i) => {
        if (!el) return;

        // Angle in degrees around the vertical wheel
        // When progress = i, theta = 0 deg (front-center, closest to viewer)
        // When progress < i, theta < 0 deg (above, towards top)
        // When progress > i, theta > 0 deg (below, towards bottom)
        const thetaDeg = (currentProgress - i) * angleStep;
        const thetaRad = (thetaDeg * Math.PI) / 180;

        // Y-Z Plane vertical coordinates
        // Y = R * sin(theta): moves downward as theta increases
        // Z = R * (cos(theta) - 1): front at Z = 0; recedes into depth as cos(theta) < 1
        const yPos = R * Math.sin(thetaRad);
        const zPos = R * (Math.cos(thetaRad) - 1);

        // Subtle rotational tilt around X-axis for genuine vertical 3D curvature
        // Keeps typography upright and readable without flipping upside-down
        const rotX = Math.max(-36, Math.min(36, thetaDeg * 0.44));

        const absDeg = Math.abs(thetaDeg);

        let opacity;
        let brightness;
        let scale;

        if (absDeg < 20) {
          // Front focal card
          opacity = 1;
          brightness = 1;
          scale = 1;
          el.style.pointerEvents = "auto";
        } else if (absDeg < 95) {
          // Visible top/bottom flanking cards in the Y-Z trajectory
          const factor = (absDeg - 20) / 75;
          opacity = Math.max(0.15, 1 - factor * 0.55);
          brightness = Math.max(0.4, 1 - factor * 0.45);
          scale = Math.max(0.78, 1 - factor * 0.18);
          el.style.pointerEvents = "auto";
        } else {
          // Behind the wheel: fully hidden
          opacity = 0;
          brightness = 0.2;
          scale = 0.7;
          el.style.pointerEvents = "none";
        }

        // Higher Z-index for cards closer to front
        const zIndex = 100 - Math.round(absDeg);

        el.style.transform = `translate3d(0px, ${yPos}px, ${zPos}px) rotateX(${rotX}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.filter = `brightness(${brightness})`;
        el.style.zIndex = `${zIndex}`;
        el.style.visibility = absDeg > 115 ? "hidden" : "visible";
      });
    },
    [slides, totalCards, angleStep, dimensions.radius]
  );

  /**
   * GSAP ScrollTrigger setup: maps vertical scroll directly to the vertical wheel's rotation
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    let scrollTriggerInstance = null;
    const isMobile = window.innerWidth < 768;
    const scrollDistance = isMobile ? "+=3000" : "+=4200";

    const ctx = gsap.context(() => {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: pinWrapperRef.current,
        start: "top top",
        end: scrollDistance,
        pin: true,
        scrub: 1.15,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Progress goes 0 -> 1 across the pin duration
          const currentProgress = self.progress * (totalCards - 1);
          updateWheelPositions(currentProgress);
        },
      });

      // Initial layout pass
      updateWheelPositions(0);
    }, pinWrapperRef);

    return () => {
      ctx.revert();
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, [totalCards, updateWheelPositions]);

  /**
   * Programmatic navigation: scroll directly to slide index on the vertical wheel
   */
  const navigateToSlide = (targetIdx) => {
    const clamped = Math.max(0, Math.min(totalCards - 1, targetIdx));
    const allTriggers = ScrollTrigger.getAll();
    const st = allTriggers.find((t) => t.trigger === pinWrapperRef.current);

    if (st) {
      const targetScroll = st.start + (clamped / (totalCards - 1)) * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      updateWheelPositions(clamped);
    }
  };

  const handleCopyEmail = (e, email) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div
      ref={pinWrapperRef}
      className="relative w-full h-screen overflow-hidden bg-[#07080D] text-[#F5F4FF] select-none flex flex-col justify-between"
      style={{
        backgroundColor: "#07080D",
      }}
    >
      {/* 1. Subtle Ambient Background Lighting & Architectural Whisper Grid */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Central Luminous Wheel Horizon Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[950px] sm:h-[950px] rounded-full blur-[180px] opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #5268FF 0%, #7764F8 40%, transparent 75%)",
          }}
        />
      </div>

      {/* 2. Top HUD Navigation & Wheel Status Bar */}
      <header className="relative z-30 pt-24 sm:pt-28 pb-3 px-6 sm:px-10 lg:px-[6.5vw] flex items-center justify-between border-b border-white/[0.08] backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5268FF] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#A596FF]">
              TAVQO STUDIO
            </span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span
            ref={cardNameRef}
            className="text-xs font-mono text-white/60 tracking-wider truncate max-w-[200px] sm:max-w-none hidden sm:inline uppercase"
          >
            WE ARE TAVQO.
          </span>
        </div>

        {/* Dynamic Card Indicator & Progress Fill */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#5268FF] font-semibold">
            <span ref={cardIndicatorRef}>01 / 07</span>
          </div>

          <div className="w-24 sm:w-36 h-[2px] bg-white/[0.1] rounded-full overflow-hidden">
            <div
              ref={progressFillRef}
              className="h-full bg-gradient-to-r from-[#5268FF] to-[#7764F8] transition-all duration-100 rounded-full"
              style={{ width: "14.28%" }}
            />
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 3. MAIN VERTICAL 3D FERRIS WHEEL CAROUSEL STAGE           */}
      {/* ========================================================= */}
      <main
        ref={wheelStageRef}
        aria-label="Vertical 3D Ferris Wheel Carousel"
        className="relative z-10 flex-1 w-full flex items-center justify-center overflow-hidden"
        style={{
          perspective: `${dimensions.perspective}px`,
          perspectiveOrigin: "50% 50%",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Vertical Wheel Center Stage Container */}
        <div
          className="relative flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            width: `${dimensions.cardWidth}px`,
            height: `${dimensions.cardHeight}px`,
          }}
        >
          {slides.map((slide, idx) => {
            const isWarmIvory = slide.theme === "warm-ivory";
            const isElectric = slide.theme === "electric-accent";
            const isMidnight = slide.theme === "midnight-luxury";

            return (
              <article
                key={slide.id}
                ref={(el) => (cardElementsRef.current[idx] = el)}
                onClick={() => navigateToSlide(idx)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigateToSlide(idx);
                  }
                }}
                className={`absolute inset-0 rounded-2xl sm:rounded-3xl border overflow-hidden flex flex-col justify-between cursor-pointer transition-shadow duration-300 select-none ${
                  isWarmIvory
                    ? "bg-[#F5F4EE] text-[#111218] border-black/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.06)]"
                    : isElectric
                    ? "bg-[#0A0D22] text-white border-[#5268FF]/35 shadow-[0_30px_90px_-20px_rgba(82,104,255,0.35),0_0_0_1px_rgba(255,255,255,0.1)]"
                    : isMidnight
                    ? "bg-[#090A1A] text-white border-[#7764F8]/30 shadow-[0_35px_100px_-20px_rgba(82,104,255,0.35),0_0_0_1px_rgba(255,255,255,0.12)]"
                    : "bg-[#090A10] text-[#F5F4FF] border-white/[0.12] shadow-[0_35px_90px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)]"
                }`}
                style={{
                  width: `${dimensions.cardWidth}px`,
                  height: `${dimensions.cardHeight}px`,
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity, filter",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* ------------------------------------------------- */}
                {/* CARD DECK TOP HEADER BAR                          */}
                {/* ------------------------------------------------- */}
                <div
                  className={`h-11 sm:h-12 border-b px-5 sm:px-8 flex items-center justify-between font-mono text-[11px] sm:text-[11.5px] uppercase tracking-[0.2em] shrink-0 ${
                    isWarmIvory
                      ? "border-black/10 bg-[#EAE8E0] text-[#555562]"
                      : isElectric
                      ? "border-white/10 bg-[#12163E] text-[#A596FF]"
                      : "border-white/[0.08] bg-[#0E0F17] text-[#8E8EA8]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold tracking-[0.22em]">{slide.badge}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isWarmIvory
                          ? "bg-[#3B4ECC]"
                          : isElectric
                          ? "bg-[#A596FF]"
                          : "bg-[#5268FF]"
                      }`}
                    />
                    <span>{slide.headerTopic}</span>
                  </div>
                  <div className="text-right text-[10px] font-mono opacity-60">
                    SLIDE {slide.number}
                  </div>
                </div>

                {/* Tactile Corner Pin Marks */}
                <span
                  className={`absolute top-14 left-4 text-[10px] font-mono pointer-events-none ${
                    isWarmIvory ? "text-black/30" : "text-white/20"
                  }`}
                >
                  +
                </span>
                <span
                  className={`absolute top-14 right-4 text-[10px] font-mono pointer-events-none ${
                    isWarmIvory ? "text-black/30" : "text-white/20"
                  }`}
                >
                  +
                </span>

                {/* ------------------------------------------------- */}
                {/* CARD SLIDE BODY CONTENT                           */}
                {/* ------------------------------------------------- */}
                <div className="flex-1 p-5 sm:p-7 lg:p-8 flex flex-col justify-between overflow-hidden relative">
                  {/* Large background numeral watermark */}
                  <span
                    className={`absolute right-4 bottom-[-10px] sm:bottom-0 text-[140px] sm:text-[200px] font-sans font-black leading-none select-none pointer-events-none ${
                      isWarmIvory ? "text-black/[0.035]" : "text-white/[0.03]"
                    }`}
                  >
                    {slide.number}
                  </span>

                  {/* =============================================== */}
                  {/* SLIDE 01: WHO IS TAVQO?                        */}
                  {/* =============================================== */}
                  {slide.id === "slide-1" && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                        <div className="lg:col-span-7 flex flex-col items-start">
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.26em] uppercase text-[#635BFF] font-semibold mb-2">
                            {slide.eyebrow}
                          </span>
                          <h2 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-[-0.035em] text-[#F5F4FF] leading-[0.92] mb-3">
                            WE ARE <br />
                            <span className="bg-gradient-to-r from-white via-[#E8E6FF] to-[#635BFF] bg-clip-text text-transparent">
                              TAVQO.
                            </span>
                          </h2>
                          <p className="text-xs sm:text-sm text-[#A2A1B8] font-light leading-relaxed max-w-md mb-5">
                            {slide.description}
                          </p>

                          {/* Interactive Explore Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToSlide(1);
                            }}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5268FF] to-[#7764F8] hover:shadow-[0_0_25px_rgba(82,104,255,0.45)] text-white font-sans text-xs sm:text-[12.5px] font-semibold tracking-wide transition-all group cursor-pointer"
                          >
                            <span>{slide.ctaText}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>

                        {/* Architectural Spatial Visual */}
                        <div className="lg:col-span-5 hidden lg:flex flex-col">
                          <div className="group relative rounded-xl border border-white/10 bg-[#12131F] p-2.5 overflow-hidden transition-all duration-500 hover:border-[#5268FF]/50 shadow-lg">
                            <div className="relative h-44 w-full rounded-lg overflow-hidden bg-black">
                              <img
                                src={slide.image}
                                alt="TAVQO spatial architecture concrete arch"
                                className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                              />
                            </div>
                            <div className="mt-2.5 flex items-center justify-between text-[9.5px] font-mono text-[#8E8EA8] px-1">
                              <span>TAVQO</span>
                              <span className="text-[#635BFF] font-semibold">{slide.imageCaption}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Authentic Core Areas Rail */}
                      <div className="pt-3 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] font-mono uppercase tracking-[0.16em] text-[#8E8EA8] relative z-10">
                        {slide.coreAreas.map((p) => (
                          <div key={p.label}>
                            <span className="text-white/40 block text-[9px]">{p.label}</span>
                            <span className="text-white font-medium">{p.desc}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* =============================================== */}
                  {/* SLIDE 02: WHAT DO WE BELIEVE? (Warm Ivory)     */}
                  {/* =============================================== */}
                  {slide.id === "slide-2" && (
                    <>
                      <div className="relative z-10">
                        <div className="max-w-xl mb-3 sm:mb-4">
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#3B4ECC] font-semibold mb-1 block">
                            {slide.eyebrow}
                          </span>
                          <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-[-0.03em] text-[#111218] leading-tight">
                            {slide.title}
                          </h2>
                          <p className="mt-1.5 text-xs sm:text-sm text-[#555562] font-light leading-relaxed max-w-lg">
                            {slide.description}
                          </p>
                        </div>

                        {/* Interactive Triad: Design, Technology, Engineering */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {slide.disciplines.map((d) => {
                            const isSelected = activeDiscipline === d.id;
                            const IconComponent = d.icon;
                            return (
                              <div
                                key={d.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveDiscipline(d.id);
                                }}
                                onMouseEnter={() => setActiveDiscipline(d.id)}
                                className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[145px] sm:min-h-[160px] ${
                                  isSelected
                                    ? "bg-white border-[#3B4ECC] shadow-[0_12px_28px_-8px_rgba(59,78,204,0.22)] scale-[1.02]"
                                    : "bg-white/60 hover:bg-white/90 border-black/10"
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono text-xs font-bold text-[#3B4ECC]">
                                      {d.num}
                                    </span>
                                    <IconComponent
                                      className={`w-4 h-4 ${
                                        isSelected ? "text-[#3B4ECC]" : "text-[#555562]"
                                      }`}
                                    />
                                  </div>
                                  <h3 className="font-sans text-xs sm:text-sm font-bold text-[#111218] uppercase tracking-wide mb-1">
                                    {d.name}
                                  </h3>
                                  <p className="text-[11px] text-[#555562] font-light leading-relaxed line-clamp-2">
                                    {d.desc}
                                  </p>
                                </div>

                                <div className="mt-2.5 pt-2 border-t border-black/[0.06] flex items-center justify-between text-[9px] font-mono text-[#3B4ECC] uppercase tracking-wider">
                                  <span>{isSelected ? "ACTIVE VIEW" : "EXPLORE"}</span>
                                  <ChevronRight className="w-3 h-3" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Bottom Active Deliverables Bar */}
                      <div className="pt-2.5 border-t border-black/10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#555562] relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="text-[#3B4ECC] font-bold">KEY DELIVERABLES:</span>
                          <span className="text-[#111218]">
                            {slide.disciplines
                              .find((d) => d.id === activeDiscipline)
                              ?.deliverables.join(" • ")}
                          </span>
                        </div>
                        <span className="text-[#3B4ECC] hidden lg:inline">DESIGN & TECHNOLOGY</span>
                      </div>
                    </>
                  )}

                  {/* =============================================== */}
                  {/* SLIDE 03: HOW DO WE APPROACH PROBLEMS?         */}
                  {/* =============================================== */}
                  {slide.id === "slide-3" && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                        <div className="lg:col-span-7 flex flex-col">
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#5268FF] font-semibold mb-1">
                            {slide.eyebrow}
                          </span>
                          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[-0.03em] text-white leading-tight mb-2">
                            {slide.title}
                          </h2>
                          <p className="text-xs text-[#9B9AAF] font-light leading-relaxed mb-4">
                            {slide.description}
                          </p>

                          {/* 3 Approach Stages Interactive Selector */}
                          <div className="flex flex-col gap-2">
                            {slide.stages.map((st, i) => {
                              const isSelected = activeApproachStage === i;
                              const IconComp = st.icon;
                              return (
                                <div
                                  key={st.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveApproachStage(i);
                                  }}
                                  className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                                    isSelected
                                      ? "bg-[#141738] border-[#5268FF] shadow-[0_4px_20px_rgba(82,104,255,0.25)]"
                                      : "bg-[#0E0F1A]/70 border-white/[0.08] hover:bg-[#121424]"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-xs font-bold text-[#5268FF]">
                                        {st.num}
                                      </span>
                                      <span className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                                        {st.title}
                                      </span>
                                      <span className="text-[9px] font-mono text-[#8E8EA8] tracking-widest hidden sm:inline">
                                        // {st.stepLabel}
                                      </span>
                                    </div>
                                    <IconComp
                                      className={`w-3.5 h-3.5 ${
                                        isSelected ? "text-[#5268FF]" : "text-white/40"
                                      }`}
                                    />
                                  </div>
                                  <p className="text-[11px] text-[#A2A1B8] font-light leading-snug">
                                    {st.summary}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Sculptural Visual Inset & Stage Focus */}
                        <div className="lg:col-span-5 hidden lg:flex flex-col">
                          <div className="relative rounded-2xl border border-white/10 bg-[#121422] p-3 shadow-md">
                            <div className="relative h-40 w-full rounded-xl overflow-hidden bg-black">
                              <img
                                src={slide.image}
                                alt="Sculptural form representing clarity and focus"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="mt-2.5 px-1">
                              <div className="flex items-center justify-between text-[9.5px] font-mono text-[#8E8EA8] mb-1.5">
                                <span>STAGE ACTIONS:</span>
                                <span className="text-[#5268FF]">
                                  {slide.stages[activeApproachStage].num} / 03
                                </span>
                              </div>
                              <ul className="text-[10.5px] text-[#C0BECE] font-light space-y-1">
                                {slide.stages[activeApproachStage].details.map((item, idx) => (
                                  <li key={idx} className="flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-[#5268FF]" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E8EA8] relative z-10">
                        <span>PRACTICAL METHODOLOGY</span>
                        <span className="text-[#5268FF]">UNDERSTAND • CREATE • EVOLVE</span>
                      </div>
                    </>
                  )}

                  {/* =============================================== */}
                  {/* SLIDE 04: WHAT DO WE BUILD? (Capabilities)     */}
                  {/* =============================================== */}
                  {slide.id === "slide-4" && (
                    <>
                      <div className="relative z-10">
                        <div className="max-w-2xl mb-2 sm:mb-3">
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#A596FF] font-semibold mb-0.5 block">
                            {slide.eyebrow}
                          </span>
                          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[-0.03em] text-white leading-tight">
                            {slide.title}
                          </h2>
                          <p className="text-[11px] sm:text-xs text-[#A2A1B8] font-light leading-snug mt-1">
                            {slide.description}
                          </p>
                        </div>

                        {/* 8 Services in 4x2 Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
                          {slide.services.map((srv) => {
                            const isSelected = selectedServiceId === srv.id;
                            const IconComp = srv.icon;
                            return (
                              <div
                                key={srv.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedServiceId(srv.id);
                                }}
                                onMouseEnter={() => setSelectedServiceId(srv.id)}
                                className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-200 cursor-pointer text-left flex flex-col justify-between min-h-[78px] sm:min-h-[86px] ${
                                  isSelected
                                    ? "bg-[#1B2050] border-[#5268FF] shadow-[0_0_20px_rgba(82,104,255,0.35)]"
                                    : "bg-[#111432]/70 hover:bg-[#161B40] border-white/10"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-mono text-[10px] text-[#A596FF] font-bold">
                                    {srv.num}
                                  </span>
                                  <IconComp
                                    className={`w-3.5 h-3.5 ${
                                      isSelected ? "text-white" : "text-[#5268FF]"
                                    }`}
                                  />
                                </div>
                                <h3 className="font-sans text-[11px] sm:text-xs font-bold text-white line-clamp-1 leading-snug">
                                  {srv.title}
                                </h3>
                                <p className="text-[9.5px] sm:text-[10px] text-[#8E8EA8] font-light truncate">
                                  {srv.desc}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        {/* Active Service Detailed Panel */}
                        {(() => {
                          const activeSrv = slide.services.find(
                            (s) => s.id === selectedServiceId
                          ) || slide.services[0];
                          return (
                            <div className="mt-2.5 p-2.5 sm:p-3 rounded-xl border border-[#5268FF]/30 bg-[#0F122E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#A596FF] font-semibold">
                                    SERVICE {activeSrv.num} // {activeSrv.title}
                                  </span>
                                </div>
                                <p className="text-[10.5px] sm:text-[11px] text-[#C6C4DC] font-light leading-snug">
                                  {activeSrv.fullDetail}
                                </p>
                              </div>
                              <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                                {activeSrv.tools.map((tool) => (
                                  <span
                                    key={tool}
                                    className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[9px] font-mono text-white/80"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#A596FF] relative z-10">
                        <span>8 CORE CAPABILITY DOMAINS</span>
                        <span className="text-white">FULL-STACK DESIGN & DEVELOPMENT</span>
                      </div>
                    </>
                  )}

                  {/* =============================================== */}
                  {/* SLIDE 05: HOW DO WE WORK? (Five-Stage Process) */}
                  {/* =============================================== */}
                  {slide.id === "slide-5" && (
                    <>
                      <div className="relative z-10">
                        <div className="max-w-xl mb-3 sm:mb-4">
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#3B4ECC] font-semibold mb-0.5 block">
                            {slide.eyebrow}
                          </span>
                          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[-0.03em] text-[#111218] leading-tight">
                            {slide.title}
                          </h2>
                          <p className="text-[11px] sm:text-xs text-[#555562] font-light leading-snug mt-1">
                            {slide.description}
                          </p>
                        </div>

                        {/* Five Connected Stages Timeline */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5 mb-3">
                          {slide.stages.map((st, i) => {
                            const isSelected = activeProcessStage === i;
                            return (
                              <div
                                key={st.num}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveProcessStage(i);
                                }}
                                onMouseEnter={() => setActiveProcessStage(i)}
                                className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[95px] sm:min-h-[110px] ${
                                  isSelected
                                    ? "bg-white border-[#3B4ECC] shadow-[0_8px_20px_-6px_rgba(59,78,204,0.25)] scale-[1.02]"
                                    : "bg-white/60 hover:bg-white/90 border-black/10"
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-1 pb-1 border-b border-black/[0.06]">
                                    <span className="font-mono text-xs font-bold text-[#3B4ECC]">
                                      {st.num}
                                    </span>
                                    <span className="text-[8.5px] font-mono uppercase tracking-wider text-[#6B6A78]">
                                      STAGE
                                    </span>
                                  </div>
                                  <h3 className="font-sans text-xs font-bold text-[#111218] mb-0.5">
                                    {st.name}
                                  </h3>
                                  <p className="text-[10px] text-[#6B6A78] font-light leading-snug line-clamp-2">
                                    {st.tagline}
                                  </p>
                                </div>

                                <div className="mt-1.5 text-[8.5px] font-mono text-[#3B4ECC] flex items-center justify-between">
                                  <span>{isSelected ? "VIEWING" : "SELECT"}</span>
                                  {i < 4 ? <span>→</span> : <CheckCircle2 className="w-2.5 h-2.5 text-[#3B4ECC]" />}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Active Stage Detailed Deliverables Banner */}
                        {(() => {
                          const currentStage = slide.stages[activeProcessStage] || slide.stages[0];
                          return (
                            <div className="p-3 rounded-xl border border-black/10 bg-white/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                              <div className="flex-1">
                                <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#3B4ECC] font-bold block mb-0.5">
                                  STAGE {currentStage.num}: {currentStage.name}
                                </span>
                                <p className="text-[11px] text-[#444452] font-light leading-snug">
                                  {currentStage.desc}
                                </p>
                              </div>
                              <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                                {currentStage.deliverables.map((item) => (
                                  <span
                                    key={item}
                                    className="px-2 py-0.5 rounded-md bg-[#3B4ECC]/10 border border-[#3B4ECC]/20 text-[9px] font-mono text-[#3B4ECC] font-medium"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#6B6A78] relative z-10">
                        <span>FIVE-STAGE WORKFLOW</span>
                        <span className="text-[#3B4ECC]">DISCOVER • DEFINE • DESIGN • DEVELOP • DELIVER</span>
                      </div>
                    </>
                  )}

                  {/* =============================================== */}
                  {/* SLIDE 06: WHAT PRINCIPLES GUIDE US?            */}
                  {/* =============================================== */}
                  {slide.id === "slide-6" && (
                    <>
                      <div className="relative z-10">
                        <div className="max-w-xl mb-3 sm:mb-4">
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#635BFF] font-semibold mb-0.5 block">
                            {slide.eyebrow}
                          </span>
                          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[-0.03em] text-white leading-tight">
                            {slide.title}
                          </h2>
                          <p className="text-[11px] sm:text-xs text-[#A2A1B8] font-light leading-snug mt-1">
                            {slide.description}
                          </p>
                        </div>

                        {/* Four Columns Principles Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                          {slide.principles.map((p, i) => {
                            const isSelected = activePrinciple === i;
                            const IconComponent = p.icon;
                            return (
                              <div
                                key={p.num}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePrinciple(i);
                                }}
                                onMouseEnter={() => setActivePrinciple(i)}
                                className={`p-3 sm:p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[140px] sm:min-h-[155px] ${
                                  isSelected
                                    ? "bg-[#15172C] border-[#635BFF] shadow-[0_8px_25px_rgba(99,91,255,0.3)] scale-[1.02]"
                                    : "bg-[#10111D]/80 hover:bg-[#131526] border-white/[0.08]"
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="font-mono text-xs font-bold text-[#635BFF]">
                                      {p.num}
                                    </span>
                                    <IconComponent
                                      className={`w-3.5 h-3.5 ${
                                        isSelected ? "text-[#635BFF]" : "text-white/40"
                                      }`}
                                    />
                                  </div>
                                  <h3 className="font-sans text-xs sm:text-sm font-bold text-white mb-1 leading-snug">
                                    {p.title}
                                  </h3>
                                  <p className="text-[10.5px] text-[#9B9AAF] font-light leading-snug mb-1">
                                    {p.summary}
                                  </p>
                                </div>

                                <div>
                                  <div
                                    className={`h-[1.5px] transition-all duration-300 ${
                                      isSelected ? "w-full bg-[#635BFF]" : "w-6 bg-white/20"
                                    }`}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Active Principle In-Depth Explanation */}
                        {(() => {
                          const activeP = slide.principles[activePrinciple] || slide.principles[0];
                          return (
                            <div className="mt-2.5 p-2.5 sm:p-3 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between gap-4">
                              <p className="text-[10.5px] sm:text-[11px] text-[#B8B7CC] font-light leading-relaxed">
                                <span className="font-semibold text-white uppercase mr-1">
                                  {activeP.title}:
                                </span>
                                {activeP.detail}
                              </p>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E8EA8] relative z-10">
                        <span>FOUR GUIDING PRINCIPLES</span>
                        <span className="text-[#A596FF]">CLARITY • PURPOSE • SCALABILITY • COLLABORATION</span>
                      </div>
                    </>
                  )}

                  {/* =============================================== */}
                  {/* SLIDE 07: HOW CAN SOMEONE WORK WITH US?        */}
                  {/* =============================================== */}
                  {slide.id === "slide-7" && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10 my-auto">
                        <div className="lg:col-span-8 flex flex-col items-start">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.26em] text-[#635BFF] font-semibold">
                              {slide.statusBadge}
                            </span>
                          </div>

                          <h2 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-[-0.035em] text-white leading-[0.92] mb-3">
                            LET'S BUILD <br />
                            <span className="bg-gradient-to-r from-white via-[#C7BFFF] to-[#5268FF] bg-clip-text text-transparent">
                              WHAT'S NEXT.
                            </span>
                          </h2>
                          <p className="text-xs sm:text-sm text-[#A2A1B8] font-light leading-relaxed max-w-lg mb-5">
                            {slide.description}
                          </p>

                          {/* Actionable Elements: Button & Direct Email */}
                          <div className="flex flex-wrap items-center gap-3 mb-5">
                            <a
                              href={slide.ctaPrimaryHref}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#5268FF] to-[#7764F8] hover:shadow-[0_0_30px_rgba(82,104,255,0.45)] text-white font-sans text-xs sm:text-[13px] font-semibold tracking-wide transition-all group"
                            >
                              <span>{slide.ctaPrimary}</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </a>

                            <button
                              type="button"
                              onClick={(e) => handleCopyEmail(e, slide.email)}
                              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/50 text-white font-mono text-xs tracking-wider transition-colors bg-white/[0.03] cursor-pointer"
                              title="Click to copy email address"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#635BFF]" />
                              <span>{copiedEmail ? "COPIED TO CLIPBOARD" : slide.email}</span>
                            </button>
                          </div>

                          {/* Quick Navigation Links */}
                          <div className="flex items-center gap-4 text-[10.5px] font-mono tracking-wider text-white/50">
                            <span className="text-white/30 uppercase text-[9px]">DIRECT NAVIGATION:</span>
                            {slide.navLinks.map((link) => (
                              <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => e.stopPropagation()}
                                className="text-[#A596FF] hover:text-white transition-colors flex items-center gap-1 uppercase"
                              >
                                <span>{link.label}</span>
                                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Abstract Centerpiece Composition */}
                        <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center">
                          <div className="relative w-44 h-44 rounded-full border border-white/10 p-2 bg-white/[0.02] shadow-[0_0_50px_rgba(82,104,255,0.2)]">
                            <div className="w-full h-full rounded-full overflow-hidden bg-black">
                              <img
                                src={slide.image}
                                alt="TAVQO studio visual — 3D luminous form"
                                className="w-full h-full object-cover opacity-90"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E8EA8] relative z-10">
                        <span>TAVQO CREATIVE TECHNOLOGY STUDIO</span>
                        <span className="text-[#5268FF]">HELLO@TAVQO.COM</span>
                      </div>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* ========================================================= */}
      {/* 4. BOTTOM TACTILE VERTICAL WHEEL CONTROLS                 */}
      {/* ========================================================= */}
      <footer className="relative z-30 pb-6 sm:pb-8 pt-3 px-6 sm:px-10 lg:px-[6.5vw] flex items-center justify-between border-t border-white/[0.08] backdrop-blur-xs">
        {/* Step Indicator Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => navigateToSlide(i)}
              className={`h-7 px-2.5 rounded-md font-mono text-[10.5px] transition-all cursor-pointer ${
                activeIndex === i
                  ? "bg-[#5268FF] text-white font-bold shadow-[0_0_15px_rgba(82,104,255,0.6)]"
                  : "bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
              }`}
              title={`Rotate wheel to Slide ${s.number}`}
            >
              0{i + 1}
            </button>
          ))}
        </div>

        {/* Previous (Up) / Next (Down) Vertical Wheel Rotation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            aria-label="Previous slide on vertical wheel (rotate upward)"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => navigateToSlide(activeIndex + 1)}
            disabled={activeIndex === totalCards - 1}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            aria-label="Next slide on vertical wheel (rotate downward)"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}

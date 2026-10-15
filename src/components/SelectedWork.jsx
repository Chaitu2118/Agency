import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// ============================================================================
// TAVQO SELECTED COMMISSIONS — REFERENCE ACCURATE DATA
// ============================================================================

const disciplineIndex = [
  { name: "DIGITAL EXPERIENCES", count: "(12)" },
  { name: "MOBILE APPLICATIONS", count: "(08)" },
  { name: "AI & AUTOMATION", count: "(06)" },
  { name: "SMART SYSTEMS", count: "(05)" },
  { name: "IMMERSIVE 3D WEB", count: "(04)" },
];

export default function SelectedWork() {
  const sectionRef = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(media.matches);
    const handler = (e) => setShouldReduceMotion(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver for entrance reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // GSAP entrance reveal
  useEffect(() => {
    if (!hasTriggered) return;

    if (shouldReduceMotion) {
      gsap.set(
        [
          ".work-header-anim",
          ".work-featured-anim",
          ".work-grid-anim",
          ".work-immersive-anim",
        ],
        { opacity: 1, y: 0, clearProps: "all" }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".work-header-anim",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, clearProps: "all" }
      )
        .fromTo(
          ".work-featured-anim",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: "all" },
          0.15
        )
        .fromTo(
          ".work-grid-anim",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.08, clearProps: "all" },
          0.3
        )
        .fromTo(
          ".work-immersive-anim",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, clearProps: "all" },
          0.45
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [hasTriggered, shouldReduceMotion]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-5 sm:px-8 lg:px-12 w-full overflow-hidden border-t border-white/12"
      style={{
        backgroundColor: "#08090D",
        color: "#F4F3FA",
      }}
    >
      {/* Dynamic Background Lighting & Subtle Violet Fluid Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[800px] h-[600px] opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, #8275FF 0%, #17152F 50%, transparent 75%)",
        }}
      />

      <div className="max-w-[1380px] mx-auto relative z-10">
        {/* ========================================================= */}
        {/* 1. THREE-COLUMN EDITORIAL HEADER                          */}
        {/* ========================================================= */}
        <div className="work-header-anim grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-white/12">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <div className="mb-4 sm:mb-5">
              <span className="text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-[#8275FF]">
                TAVQO / SELECTED COMMISSIONS
              </span>
            </div>
            <h2 className="font-serif text-[48px] sm:text-[64px] lg:text-[76px] font-normal tracking-[-0.03em] leading-[1.04] text-[#F4F3FA]">
              <div>Works of</div>
              <div>
                <span className="italic font-light text-[#8275FF]">
                  Distinction.
                </span>
              </div>
            </h2>
          </div>

          {/* Center Column: Curated Portfolio Narrative */}
          <div className="lg:col-span-4 lg:pl-10 lg:border-l lg:border-white/12 flex flex-col justify-end">
            <div className="mb-3">
              <span className="font-serif italic text-[22px] sm:text-[24px] text-[#8275FF] block leading-snug">
                Curated Portfolio
              </span>
              <span className="font-sans text-[13px] text-[#9696A8] tracking-wider uppercase font-light">
                2024 — 2026
              </span>
            </div>
            <p className="text-[14.5px] sm:text-[15.5px] font-sans text-[#9696A8] font-light leading-[1.7] max-w-[340px]">
              A selection of digital experiences, products and intelligent systems designed to solve real-world challenges.
            </p>
          </div>

          {/* Right Column: Compact Discipline Index */}
          <div className="lg:col-span-3 flex flex-col justify-end">
            <div className="space-y-0 text-[11px] font-sans border-t border-white/12 lg:border-t-0">
              {disciplineIndex.map((item, idx) => (
                <div
                  key={item.name}
                  className={`flex items-center justify-between py-2.5 transition-colors cursor-pointer group ${
                    idx !== disciplineIndex.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <span className="tracking-[0.18em] uppercase text-[#9696A8] group-hover:text-[#F4F3FA] font-medium">
                    {item.name}
                  </span>
                  <span className="font-mono text-[11px] text-[#8275FF] ml-3">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. LARGE FEATURED PANEL — 01 CONNECTED EXPERIENCES        */}
        {/* ========================================================= */}
        <div className="work-featured-anim mt-12 sm:mt-16 mb-8 sm:mb-10 rounded-2xl bg-[#10111B] border border-white/12 p-7 sm:p-10 lg:p-14 relative overflow-hidden group hover:border-[#8275FF]/50 transition-colors duration-500 shadow-2xl">
          {/* Subtle Ambient Radial Glow on Top-Right Corner */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 w-[450px] h-[450px] rounded-full blur-[100px] opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(130, 117, 255, 0.4) 0%, transparent 70%)",
            }}
          />

          {/* Top Right "HOVER TO EXPLORE" Badge with Subtle Violet Corner Glow */}
          <div className="absolute top-6 right-7 sm:top-8 sm:right-10 flex items-center gap-2 z-20">
            <span className="w-2.5 h-2.5 rounded-full border border-[#8275FF] flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-[#8275FF] animate-pulse" />
            </span>
            <span className="text-[10px] font-sans font-semibold tracking-[0.22em] uppercase text-[#9696A8] group-hover:text-[#8275FF] transition-colors">
              HOVER TO EXPLORE
            </span>
          </div>

          {/* Background Architectural Violet Ribbon Wave */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-25 select-none"
          >
            <svg viewBox="0 0 700 500" fill="none" className="w-full h-full">
              <path
                d="M 100 450 C 250 350, 350 150, 650 100"
                stroke="url(#violetGrad1)"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <path
                d="M 120 480 C 280 370, 400 170, 680 120"
                stroke="url(#violetGrad2)"
                strokeWidth="1"
                opacity="0.4"
              />
              <ellipse
                cx="580"
                cy="280"
                rx="260"
                ry="180"
                stroke="url(#violetGrad1)"
                strokeWidth="1"
                opacity="0.3"
                transform="rotate(-15 580 280)"
              />
              <defs>
                <linearGradient id="violetGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8275FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10111B" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="violetGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8275FF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10111B" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left Column: Narrative Details */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-7">
              {/* Number & Vertical Line & Category */}
              <div className="flex items-center gap-4">
                <span className="font-serif italic text-[36px] sm:text-[42px] text-[#8275FF] leading-none select-none">
                  01
                </span>
                <span className="h-7 w-[1px] bg-white/12" />
                <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#9696A8]">
                  MOBILE APPLICATIONS
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-[34px] sm:text-[44px] lg:text-[48px] font-normal text-[#F4F3FA] tracking-[-0.025em] leading-[1.12]">
                Connected Experiences
              </h3>

              {/* Description */}
              <p className="text-[15px] sm:text-[16px] font-sans text-[#9696A8] font-light leading-[1.7] max-w-[430px]">
                Cross-platform mobile products with real-time communication, account management and seamless user journeys.
              </p>

              {/* Capabilities */}
              <div className="flex flex-wrap items-center gap-y-2 text-[11px] sm:text-[11.5px] font-sans font-medium uppercase tracking-[0.16em] text-[#8275FF]">
                <span>REACT NATIVE</span>
                <span className="mx-3 text-white/12">|</span>
                <span>REAL-TIME INTEGRATION</span>
                <span className="mx-3 text-white/12">|</span>
                <span>API DEVELOPMENT</span>
              </div>

              {/* Circular Arrow & View Project CTA */}
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3.5 group/cta cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full border border-white/15 group-hover/cta:border-[#8275FF] flex items-center justify-center transition-colors">
                    <span className="text-[13px] text-[#8275FF] group-hover/cta:translate-x-0.5 transition-transform duration-200">
                      &rarr;
                    </span>
                  </div>
                  <span className="text-[11.5px] font-sans font-semibold tracking-[0.2em] uppercase text-[#9696A8] group-hover/cta:text-[#F4F3FA] transition-colors">
                    VIEW PROJECT
                  </span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Composition with Tablet & Overlapping Smartphone */}
            <div className="lg:col-span-7 flex items-center justify-center relative min-h-[360px] sm:min-h-[440px] lg:min-h-[480px]">
              {/* Large Desktop/Tablet Platform Window in Dark Glass Surface */}
              <div className="relative w-full max-w-[500px] sm:max-w-[560px] rounded-2xl bg-[#08090D] p-2.5 sm:p-3 shadow-2xl border border-white/12">
                {/* Inner Screen in Dark Indigo */}
                <div className="rounded-xl bg-[#10111B] text-[#F4F3FA] p-4 sm:p-6 overflow-hidden border border-white/8">
                  {/* Tablet Screen Grid: Left Mini Sidebar + Main Content Area */}
                  <div className="grid grid-cols-12 gap-4">
                    {/* Left Sidebar */}
                    <div className="col-span-3 border-r border-white/10 pr-3 space-y-4">
                      <div className="flex items-center gap-1.5 text-[10px] text-[#9696A8]">
                        <span>&larr;</span>
                      </div>
                      <div className="space-y-2 text-[10px] font-sans font-medium text-[#9696A8]">
                        <div className="p-1.5 rounded-md bg-[#17152F] text-[#F4F3FA] font-semibold flex items-center gap-2 border border-[#8275FF]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8275FF] shadow-[0_0_6px_#8275FF]" />
                          <span>Overview</span>
                        </div>
                        <div className="px-1.5 py-1 flex items-center gap-2 hover:text-[#F4F3FA] cursor-pointer">
                          <span>Messages</span>
                        </div>
                        <div className="px-1.5 py-1 flex items-center gap-2 hover:text-[#F4F3FA] cursor-pointer">
                          <span>Calendar</span>
                        </div>
                        <div className="px-1.5 py-1 flex items-center gap-2 hover:text-[#F4F3FA] cursor-pointer">
                          <span>Analytics</span>
                        </div>
                        <div className="px-1.5 py-1 flex items-center gap-2 hover:text-[#F4F3FA] cursor-pointer">
                          <span>Settings</span>
                        </div>
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="col-span-9 pl-1 space-y-4">
                      {/* Top Header of Main Area */}
                      <div className="flex justify-between items-center pb-2 border-b border-white/10">
                        <span className="font-serif text-[15px] sm:text-[17px] font-semibold text-[#F4F3FA]">
                          Overview
                        </span>
                        <div className="flex items-center gap-2 text-[9px] font-sans text-[#9696A8]">
                          <span className="px-2 py-0.5 rounded bg-[#17152F] border border-white/10 text-[#F4F3FA]">
                            Last 6 months &or;
                          </span>
                          <span className="w-5 h-5 rounded-full bg-[#8275FF] flex items-center justify-center text-[8px] font-bold text-[#08090D]">
                            TQ
                          </span>
                        </div>
                      </div>

                      {/* Top Wave Chart */}
                      <div className="rounded-lg bg-[#08090D] border border-white/10 p-2.5">
                        <div className="h-14 sm:h-16 w-full">
                          <svg viewBox="0 0 300 70" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                            <defs>
                              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8275FF" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="#8275FF" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M 0,45 Q 35,15 75,38 T 150,28 T 225,48 T 300,22 L 300,70 L 0,70 Z"
                              fill="url(#chartGrad)"
                            />
                            <path
                              d="M 0,45 Q 35,15 75,38 T 150,28 T 225,48 T 300,22"
                              fill="none"
                              stroke="#8275FF"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Metrics 3-Col & Mini Calendar */}
                      <div className="grid grid-cols-12 gap-3 items-start">
                        {/* 3 Metrics */}
                        <div className="col-span-7 grid grid-cols-3 gap-2">
                          <div className="p-2 rounded bg-[#08090D] border border-white/10">
                            <div className="text-[8px] font-sans text-[#9696A8]">Active Users</div>
                            <div className="text-[12px] sm:text-[13px] font-bold text-[#F4F3FA]">2.4k</div>
                            <div className="text-[7.5px] text-[#8275FF] font-semibold">+12%</div>
                          </div>
                          <div className="p-2 rounded bg-[#08090D] border border-white/10">
                            <div className="text-[8px] font-sans text-[#9696A8]">Sessions</div>
                            <div className="text-[12px] sm:text-[13px] font-bold text-[#F4F3FA]">18.6k</div>
                            <div className="text-[7.5px] text-[#8275FF] font-semibold">+8%</div>
                          </div>
                          <div className="p-2 rounded bg-[#08090D] border border-white/10 flex flex-col justify-between">
                            <div className="text-[8px] font-sans text-[#9696A8]">Completion</div>
                            <div className="flex items-center justify-between">
                              <span className="text-[12px] font-bold text-[#F4F3FA]">78%</span>
                              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                                <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none" />
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="9"
                                  stroke="#8275FF"
                                  strokeWidth="3"
                                  strokeDasharray="56.5"
                                  strokeDashoffset="12.5"
                                  strokeLinecap="round"
                                  fill="none"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Mini Calendar Widget */}
                        <div className="col-span-5 p-2 rounded bg-[#08090D] border border-white/10 text-[8px]">
                          <div className="flex justify-between items-center mb-1 text-[7.5px] font-bold text-[#F4F3FA]">
                            <span>April 2026</span>
                            <span className="text-[#8275FF]">&rsaquo;</span>
                          </div>
                          <div className="grid grid-cols-7 gap-0.5 text-center text-[#9696A8] text-[6.5px]">
                            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                            <span className="text-white/20">28</span><span className="text-white/20">29</span><span className="text-white/20">30</span>
                            <span>1</span><span>2</span><span>3</span><span>4</span>
                            <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                            <span className="bg-[#8275FF] text-[#08090D] rounded-full font-bold">11</span>
                          </div>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[8px] text-[#9696A8]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#17152F] border border-[#8275FF]/40 flex items-center justify-center text-[7px] text-[#8275FF]">
                            &check;
                          </span>
                          <span className="text-[#F4F3FA] font-medium">Telemetry pipeline live</span>
                          <span className="text-[#9696A8]">&bull; 2 hours ago</span>
                        </div>
                        <span className="text-[#8275FF] cursor-pointer hover:underline">View all</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. THREE EQUAL SECONDARY CARDS (02, 03, 04)                */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 mb-8 sm:mb-10">
          {/* Card 02: Connected Intelligence (Smart Systems) */}
          <div className="work-grid-anim rounded-2xl bg-[#10111B] border border-white/12 p-7 sm:p-9 flex flex-col justify-between group hover:border-[#8275FF]/50 transition-colors duration-300 shadow-xl">
            <div className="space-y-4">
              {/* Number & Vertical Line & Category */}
              <div className="flex items-center gap-3">
                <span className="font-serif italic text-[30px] sm:text-[34px] text-[#8275FF] leading-none select-none">
                  02
                </span>
                <span className="h-5 w-[1px] bg-white/12" />
                <span className="text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-[#9696A8]">
                  SMART SYSTEMS
                </span>
              </div>

              {/* Title */}
              <h4 className="font-serif text-[24px] sm:text-[26px] font-normal text-[#F4F3FA] leading-snug group-hover:text-[#8275FF] transition-colors">
                Connected Intelligence
              </h4>

              {/* Description */}
              <p className="text-[14px] font-sans text-[#9696A8] font-light leading-[1.7]">
                IoT platforms with sensor telemetry, edge processing and real-time operational dashboards.
              </p>
            </div>

            {/* Bottom: Capabilities */}
            <div className="pt-6 border-t border-white/10 mt-8">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-sans uppercase tracking-[0.18em] text-[#8275FF]">
                <span>IOT</span>
                <span className="text-white/15">|</span>
                <span>FASTAPI</span>
                <span className="text-white/15">|</span>
                <span>WEBSOCKETS</span>
              </div>
            </div>
          </div>

          {/* Card 03: Digital Learning (Learning Platforms) */}
          <div className="work-grid-anim rounded-2xl bg-[#10111B] border border-white/12 p-7 sm:p-9 flex flex-col justify-between group hover:border-[#8275FF]/50 transition-colors duration-300 shadow-xl">
            <div className="space-y-4">
              {/* Number & Vertical Line & Category */}
              <div className="flex items-center gap-3">
                <span className="font-serif italic text-[30px] sm:text-[34px] text-[#8275FF] leading-none select-none">
                  03
                </span>
                <span className="h-5 w-[1px] bg-white/12" />
                <span className="text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-[#9696A8]">
                  PLATFORMS &amp; CLOUD
                </span>
              </div>

              {/* Title */}
              <h4 className="font-serif text-[24px] sm:text-[26px] font-normal text-[#F4F3FA] leading-snug group-hover:text-[#8275FF] transition-colors">
                Intelligent Platforms
              </h4>

              {/* Description */}
              <p className="text-[14px] font-sans text-[#9696A8] font-light leading-[1.7]">
                Distributed cloud architectures, real-time media feeds and resilient digital user platforms.
              </p>
            </div>

            {/* Bottom: Capabilities */}
            <div className="pt-6 border-t border-white/10 mt-8">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-sans uppercase tracking-[0.18em] text-[#8275FF]">
                <span>NEXT.JS</span>
                <span className="text-white/15">|</span>
                <span>NODE / GO</span>
                <span className="text-white/15">|</span>
                <span>CLOUD OPS</span>
              </div>
            </div>
          </div>

          {/* Card 04: Intelligent Workflows (AI & Automation) */}
          <div className="work-grid-anim rounded-2xl bg-[#10111B] border border-white/12 p-7 sm:p-9 flex flex-col justify-between group hover:border-[#8275FF]/50 transition-colors duration-300 shadow-xl">
            <div className="space-y-4">
              {/* Number & Vertical Line & Category */}
              <div className="flex items-center gap-3">
                <span className="font-serif italic text-[30px] sm:text-[34px] text-[#8275FF] leading-none select-none">
                  04
                </span>
                <span className="h-5 w-[1px] bg-white/12" />
                <span className="text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-[#9696A8]">
                  AI &amp; AUTOMATION
                </span>
              </div>

              {/* Title */}
              <h4 className="font-serif text-[24px] sm:text-[26px] font-normal text-[#F4F3FA] leading-snug group-hover:text-[#8275FF] transition-colors">
                Intelligent Workflows
              </h4>

              {/* Description */}
              <p className="text-[14px] font-sans text-[#9696A8] font-light leading-[1.7]">
                Multi-agent AI workflows, autonomous data pipelines and intelligent system integrations.
              </p>
            </div>

            {/* Bottom: Capabilities */}
            <div className="pt-6 border-t border-white/10 mt-8">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-sans uppercase tracking-[0.18em] text-[#8275FF]">
                <span>AI AGENTS</span>
                <span className="text-white/15">|</span>
                <span>VECTOR DIVERGENCE</span>
                <span className="text-white/15">|</span>
                <span>AUTOMATION</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. CATEGORY 05 — IMMERSIVE 3D WEB EXPERIENCES             */}
        {/* ========================================================= */}
        <div className="work-immersive-anim rounded-2xl bg-[#10111B] border border-white/12 p-7 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:border-[#8275FF]/50 transition-colors duration-300 shadow-xl">
          <div className="flex items-center gap-5">
            <span className="font-serif italic text-[32px] sm:text-[36px] text-[#8275FF] leading-none select-none">
              05
            </span>
            <span className="h-8 w-[1px] bg-white/12" />
            <div>
              <span className="text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-[#8275FF] block mb-1">
                IMMERSIVE 3D WEB EXPERIENCES &bull; 2026
              </span>
              <h4 className="font-serif text-[20px] sm:text-[24px] font-normal text-[#F4F3FA]">
                Dimensional Visuals &amp; Scroll-Driven Creative Engineering
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="hidden sm:flex items-center gap-2 text-[10.5px] font-sans font-medium uppercase tracking-[0.14em] text-[#8275FF]">
              <span>THREE.JS</span>
              <span className="text-white/15">|</span>
              <span>GSAP</span>
              <span className="text-white/15">|</span>
              <span>LENIS</span>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 group/cta cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full border border-white/15 group-hover/cta:border-[#8275FF] flex items-center justify-center transition-colors">
                <span className="text-[12px] text-[#8275FF] group-hover/cta:translate-x-0.5 transition-transform duration-200">
                  &rarr;
                </span>
              </div>
              <span className="text-[10.5px] font-sans font-semibold tracking-[0.18em] uppercase text-[#9696A8] group-hover/cta:text-[#F4F3FA] transition-colors">
                VIEW PROJECT
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

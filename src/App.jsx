import { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CinematicIntro from "./components/CinematicIntro";
import TheTavqoLogo from "./components/TheTavqoLogo";

function App() {
  const [isHomepageRevealed, setIsHomepageRevealed] = useState(false);
  const [introKey, setIntroKey] = useState(1);
  const [isIntroRunning, setIsIntroRunning] = useState(true);

  // Triggered when logo begins transitioning toward navbar
  const handleStartReveal = useCallback(() => {
    setIsHomepageRevealed(true);
  }, []);

  // Triggered when intro overlay completes and finishes handoff
  const handleIntroComplete = useCallback(() => {
    setIsIntroRunning(false);
  }, []);

  // Replay intro anytime (via button, footer, or navbar click)
  const handleReplayIntro = useCallback(() => {
    setIsHomepageRevealed(false);
    setIsIntroRunning(true);
    setIntroKey((prev) => prev + 1);
  }, []);

  return (
    <div
      className={`relative min-h-screen text-[#47260E] overflow-x-hidden transition-colors duration-700 ${
        isHomepageRevealed ? "bg-[#FDF7EE]" : "bg-[#FDF7EE]"
      }`}
      style={{
        backgroundColor: "#FDF7EE",
        backgroundImage:
          "radial-gradient(at 0% 0%, rgba(247, 239, 226, 0.7) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(244, 233, 216, 0.5) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(247, 239, 226, 0.6) 0px, transparent 50%)",
      }}
    >
      {/* 1. THE TAVQO ORGANIC CINEMATIC BRAND INTRO */}
      <CinematicIntro
        key={introKey}
        forcePlay={true}
        onStartReveal={handleStartReveal}
        onComplete={handleIntroComplete}
      />

      {/* 2. THE TAVQO EDITORIAL LUXURY NAVBAR */}
      <Navbar
        isRevealed={isHomepageRevealed}
        onReplayIntro={handleReplayIntro}
      />

      {/* 3. MAIN HOMEPAGE CONTENT */}
      <main
        className={`transition-opacity duration-700 ease-out ${
          isHomepageRevealed ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* HERO SECTION */}
        <Hero isRevealed={isHomepageRevealed} />

        {/* ========================================================= */}
        {/* SERVICES SECTION — Editorial Numbered Showcase             */}
        {/* ========================================================= */}
        <section id="services" className="py-28 px-6 sm:px-10 max-w-[1320px] mx-auto border-t border-[#9F6D44]/20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
            <div>
              <span className="text-[11px] font-sans font-semibold tracking-[0.22em] uppercase text-[#9F6D44] block mb-3">
                Disciplines & Services
              </span>
              <h2 className="font-serif text-[38px] sm:text-[52px] font-normal tracking-tight text-[#47260E] leading-[1.12]">
                Thoughtful work.<br />
                <span className="italic font-light text-[#9F6D44]">Beautifully delivered.</span>
              </h2>
            </div>
            <p className="text-[16px] font-sans text-[#503017]/80 max-w-[460px] leading-relaxed font-light mt-6 md:mt-0">
              Every engagement is approached as a bespoke commission, harmonizing strategic clarity with tactile material refinement.
            </p>
          </div>

          <div className="divide-y divide-[#9F6D44]/25 border-y border-[#9F6D44]/25">
            {[
              {
                num: "01",
                title: "Bespoke Brand Identity & Direction",
                desc: "Iconic identity systems, bespoke typographic ligatures, and cohesive brand architectures designed to evoke quiet authority and cultural longevity.",
                deliverables: ["Visual Identity Systems", "Art & Editorial Direction", "Brand Guidelines & Heritage Books"],
              },
              {
                num: "02",
                title: "Editorial Digital Experiences",
                desc: "High-contrast digital flagship spaces built with cinematic pacing, spatial typography, and responsive micro-physics that feel warm and human.",
                deliverables: ["Flagship Digital Design", "Interactive Web Architecture", "Motion & Spatial Prototypes"],
              },
              {
                num: "03",
                title: "Tangible & Spatial Brand Expressions",
                desc: "Extending digital identity into physical realms through fine paper selection, blind debossing, tactile packaging, and spatial signage.",
                deliverables: ["Luxury Packaging", "Editorial Print & Monographs", "Exhibition & Spatial Collateral"],
              },
              {
                num: "04",
                title: "Strategic Advisory & Evolution",
                desc: "Partnering with leadership to deconstruct brand positioning, curate high-value partnerships, and guide evolutionary milestones.",
                deliverables: ["Positioning & Narrative", "Market Distinction Strategy", "Cultural Alignment"],
              },
            ].map((service) => (
              <div
                key={service.num}
                className="group py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:bg-[#F7EFE2]/50 transition-all duration-300 px-4 sm:px-6 rounded-2xl"
              >
                <div className="lg:col-span-1">
                  <span className="font-serif text-[28px] sm:text-[32px] text-[#9F6D44]/70 group-hover:text-[#9F6D44] transition-colors">
                    {service.num}
                  </span>
                </div>
                <div className="lg:col-span-5">
                  <h3 className="font-serif text-[26px] sm:text-[34px] font-normal text-[#47260E] group-hover:translate-x-1 transition-transform duration-300 leading-snug">
                    {service.title}
                  </h3>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[15px] font-sans text-[#503017]/85 leading-relaxed font-light mb-4">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.deliverables.map((item) => (
                      <span
                        key={item}
                        className="text-[11.5px] font-sans uppercase tracking-[0.08em] px-3 py-1 rounded-full bg-[#F4E9D8]/90 text-[#47260E] border border-[#9F6D44]/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-2 flex justify-start lg:justify-end items-center self-center">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-[12px] font-sans font-medium uppercase tracking-[0.14em] text-[#9F6D44] group-hover:text-[#47260E] transition-colors"
                  >
                    <span>Inquire</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* PORTFOLIO / PROJECTS — Asymmetric Editorial Rhythm        */}
        {/* ========================================================= */}
        <section id="projects" className="py-28 px-6 sm:px-10 max-w-[1320px] mx-auto border-t border-[#9F6D44]/20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[11px] font-sans font-semibold tracking-[0.22em] uppercase text-[#9F6D44] block mb-3">
                Selected Commissions
              </span>
              <h2 className="font-serif text-[38px] sm:text-[50px] font-normal tracking-tight text-[#47260E]">
                Works of Distinction
              </h2>
            </div>
            <span className="text-[13px] font-sans tracking-[0.1em] uppercase text-[#503017]/70 mt-4 md:mt-0">
              Curated Portfolio 2024 — 2026
            </span>
          </div>

          {/* Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Project 1 — Large Hero Card */}
            <div className="lg:col-span-8 group rounded-3xl bg-[#F7EFE2] border border-[#9F6D44]/25 p-8 sm:p-12 overflow-hidden flex flex-col justify-between min-h-[460px] relative shadow-2xs hover:shadow-md transition-all duration-500">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9F6D44]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex justify-between items-start mb-16">
                <span className="text-[12px] font-sans uppercase tracking-[0.16em] text-[#9F6D44] font-medium">
                  HOSPITALITY & ESTATE
                </span>
                <span className="text-[13px] font-serif italic text-[#503017]/70">2025</span>
              </div>
              <div className="relative z-10 max-w-[560px]">
                <h3 className="font-serif text-[34px] sm:text-[44px] font-normal text-[#47260E] leading-[1.15] mb-4">
                  Maison d'Hortense
                </h3>
                <p className="text-[15px] font-sans text-[#503017]/85 font-light leading-relaxed mb-6">
                  Complete brand architecture and digital sanctuary for a historic botanical estate in Provence, balancing ancestral heritage with contemporary guest curation.
                </p>
                <div className="flex items-center gap-3 text-[12px] font-sans tracking-wide uppercase text-[#503017]">
                  <span>Visual Identity</span> • <span>Editorial Web</span> • <span>Bespoke Signage</span>
                </div>
              </div>
            </div>

            {/* Project 2 — Complementary Vertical Card */}
            <div className="lg:col-span-4 group rounded-3xl bg-[#F4E9D8] border border-[#9F6D44]/25 p-8 sm:p-10 flex flex-col justify-between min-h-[460px] relative shadow-2xs hover:shadow-md transition-all duration-500">
              <div className="flex justify-between items-start mb-16">
                <span className="text-[12px] font-sans uppercase tracking-[0.16em] text-[#9F6D44] font-medium">
                  FINE OBJECTS
                </span>
                <span className="text-[13px] font-serif italic text-[#503017]/70">2026</span>
              </div>
              <div>
                <h3 className="font-serif text-[28px] sm:text-[34px] font-normal text-[#47260E] leading-snug mb-3">
                  Atelier Valery
                </h3>
                <p className="text-[14px] font-sans text-[#503017]/80 font-light leading-relaxed mb-6">
                  Tactile digital flagship and monographic catalogue for handcrafted bronze and ceramic objects.
                </p>
                <div className="text-[12px] font-sans tracking-wide uppercase text-[#503017]">
                  <span>Digital Flagship</span> • <span>Art Direction</span>
                </div>
              </div>
            </div>

            {/* Project 3 — Inverted Editorial Rhythm */}
            <div className="lg:col-span-5 group rounded-3xl bg-[#F4E9D8] border border-[#9F6D44]/25 p-8 sm:p-10 flex flex-col justify-between min-h-[440px] relative shadow-2xs hover:shadow-md transition-all duration-500">
              <div className="flex justify-between items-start mb-16">
                <span className="text-[12px] font-sans uppercase tracking-[0.16em] text-[#9F6D44] font-medium">
                  HIGH PERFUMERY
                </span>
                <span className="text-[13px] font-serif italic text-[#503017]/70">2025</span>
              </div>
              <div>
                <h3 className="font-serif text-[30px] sm:text-[36px] font-normal text-[#47260E] leading-snug mb-3">
                  Botanique Nocturne
                </h3>
                <p className="text-[14.5px] font-sans text-[#503017]/80 font-light leading-relaxed mb-6">
                  Scent narratives, luxury bottle packaging typography, and immersive sensory storytelling for a Paris-based perfumery house.
                </p>
                <div className="text-[12px] font-sans tracking-wide uppercase text-[#503017]">
                  <span>Packaging Architecture</span> • <span>Brand Voice</span>
                </div>
              </div>
            </div>

            {/* Project 4 — Wide Feature */}
            <div className="lg:col-span-7 group rounded-3xl bg-[#F7EFE2] border border-[#9F6D44]/25 p-8 sm:p-12 flex flex-col justify-between min-h-[440px] relative shadow-2xs hover:shadow-md transition-all duration-500">
              <div className="flex justify-between items-start mb-16">
                <span className="text-[12px] font-sans uppercase tracking-[0.16em] text-[#9F6D44] font-medium">
                  ARCHITECTURAL MONOGRAPH
                </span>
                <span className="text-[13px] font-serif italic text-[#503017]/70">2026</span>
              </div>
              <div className="max-w-[500px]">
                <h3 className="font-serif text-[32px] sm:text-[40px] font-normal text-[#47260E] leading-snug mb-3">
                  Solarium Archive
                </h3>
                <p className="text-[15px] font-sans text-[#503017]/85 font-light leading-relaxed mb-6">
                  A retrospective digital publication celebrating minimalist conservatory architecture, greenhouse botany, and natural light studies.
                </p>
                <div className="text-[12px] font-sans tracking-wide uppercase text-[#503017]">
                  <span>Editorial Design</span> • <span>Archive System</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* ABOUT SECTION — Editorial Storytelling & Purpose           */}
        {/* ========================================================= */}
        <section id="about" className="py-28 px-6 sm:px-10 max-w-[1320px] mx-auto border-t border-[#9F6D44]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-[11px] font-sans font-semibold tracking-[0.22em] uppercase text-[#9F6D44] block mb-3">
                Philosophy & Purpose
              </span>
              <h2 className="font-serif text-[36px] sm:text-[50px] font-normal tracking-tight text-[#47260E] leading-[1.12] mb-6">
                Built with intention.<br />
                <span className="italic font-light text-[#9F6D44]">Designed to endure.</span>
              </h2>
              <p className="text-[16px] font-sans text-[#503017]/85 font-light leading-relaxed mb-6">
                The Tavqo was founded on the conviction that the most resonant brands are neither noisy nor disposable. They are conceived like timeless botanical structures—rooted in principle, growing with organic grace, and engineered with unyielding craft.
              </p>
              <p className="text-[15px] font-sans text-[#503017]/80 font-light leading-relaxed mb-8">
                We work deliberately with a strictly limited roster of clients each season, providing intimate, senior-led attention to every typographical curve, spatial balance, and tactical execution.
              </p>

              <div className="flex items-center gap-8 pt-4 border-t border-[#9F6D44]/20">
                <div>
                  <span className="font-serif text-[32px] text-[#47260E] font-normal block">Single-Tier</span>
                  <span className="text-[12px] font-sans text-[#503017]/70 uppercase tracking-wider">Dedicated Atelier</span>
                </div>
                <div className="w-[1px] h-12 bg-[#9F6D44]/25" />
                <div>
                  <span className="font-serif text-[32px] text-[#47260E] font-normal block">Uncompromising</span>
                  <span className="text-[12px] font-sans text-[#503017]/70 uppercase tracking-wider">Material Standard</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-[#F7EFE2] border border-[#9F6D44]/20">
                <span className="font-serif italic text-[18px] text-[#9F6D44] block mb-3">I. Restraint</span>
                <h4 className="font-serif text-[20px] font-normal text-[#47260E] mb-2">The Power of Quiet</h4>
                <p className="text-[14px] font-sans text-[#503017]/80 leading-relaxed font-light">
                  True luxury never shouts. We distill ideas until only the essential and profound remains, creating spaces that command reverence.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#F7EFE2] border border-[#9F6D44]/20">
                <span className="font-serif italic text-[18px] text-[#9F6D44] block mb-3">II. Organic Craft</span>
                <h4 className="font-serif text-[20px] font-normal text-[#47260E] mb-2">Botanical Harmony</h4>
                <p className="text-[14px] font-sans text-[#503017]/80 leading-relaxed font-light">
                  Drawing subtle principles from natural morphology—proportions, organic asymmetry, and tactile balance that feel naturally inevitable.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#F7EFE2] border border-[#9F6D44]/20">
                <span className="font-serif italic text-[18px] text-[#9F6D44] block mb-3">III. Longevity</span>
                <h4 className="font-serif text-[20px] font-normal text-[#47260E] mb-2">Against Ephemera</h4>
                <p className="text-[14px] font-sans text-[#503017]/80 leading-relaxed font-light">
                  We reject the 6-month aesthetic cycle. What we build is meant to look as dignified in ten years as it does on the day of unveiling.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#F7EFE2] border border-[#9F6D44]/20">
                <span className="font-serif italic text-[18px] text-[#9F6D44] block mb-3">IV. Precision</span>
                <h4 className="font-serif text-[20px] font-normal text-[#47260E] mb-2">Sub-Pixel Rigor</h4>
                <p className="text-[14px] font-sans text-[#503017]/80 leading-relaxed font-light">
                  Every letterform kerning, line height rhythm, and interaction curve is tuned with microscopic care for seamless elegance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PROCESS SECTION — Methodology of The Tavqo               */}
        {/* ========================================================= */}
        <section id="process" className="py-28 px-6 sm:px-10 max-w-[1320px] mx-auto border-t border-[#9F6D44]/20">
          <div className="text-center max-w-[620px] mx-auto mb-20">
            <span className="text-[11px] font-sans font-semibold tracking-[0.22em] uppercase text-[#9F6D44] block mb-3">
              The Atelier Methodology
            </span>
            <h2 className="font-serif text-[38px] sm:text-[50px] font-normal tracking-tight text-[#47260E] mb-4">
              How We Create
            </h2>
            <p className="text-[16px] font-sans text-[#503017]/80 font-light leading-relaxed">
              A serene, phased pathway engineered to illuminate clarity and foster creative certainty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Immerse & Align",
                desc: "Uncovering the foundational essence, cultural heritage, and distinct narrative truth of your enterprise.",
              },
              {
                step: "02",
                title: "Conceive & Form",
                desc: "Exploring bespoke typography, botanical metaphors, and tactile materials through rigorous design studies.",
              },
              {
                step: "03",
                title: "Refine & Materialize",
                desc: "Engineering digital architectures and production collateral with uncompromising attention to detail.",
              },
              {
                step: "04",
                title: "Unveil & Endure",
                desc: "Strategic public reveal, guidance manuals, and ongoing custodial stewardship for lasting resonance.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-8 rounded-3xl bg-[#F7EFE2]/70 border border-[#9F6D44]/20 flex flex-col justify-between min-h-[260px]"
              >
                <div>
                  <span className="font-serif italic text-[24px] text-[#9F6D44] block mb-4">
                    {item.step}
                  </span>
                  <h4 className="font-serif text-[20px] font-normal text-[#47260E] mb-3">
                    {item.title}
                  </h4>
                  <p className="text-[13.5px] font-sans text-[#503017]/80 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* CONTACT SECTION — Elegant Consultation Inquiry            */}
        {/* ========================================================= */}
        <section id="contact" className="py-28 px-6 sm:px-10 max-w-[1100px] mx-auto border-t border-[#9F6D44]/20">
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <span className="text-[11px] font-sans font-semibold tracking-[0.22em] uppercase text-[#9F6D44] block mb-3">
              Consultation & Inquiries
            </span>
            <h2 className="font-serif text-[40px] sm:text-[56px] font-normal tracking-tight text-[#47260E] mb-4 leading-tight">
              Let's create something meaningful.
            </h2>
            <p className="text-[16px] font-sans text-[#503017]/80 font-light leading-relaxed">
              We welcome commissions from private estates, cultural leaders, and emerging visionaries. Share your aspirations below.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you. Your consultation inquiry has been received by The Tavqo atelier.");
            }}
            className="p-8 sm:p-14 rounded-3xl bg-[#F7EFE2] border border-[#9F6D44]/30 max-w-[840px] mx-auto shadow-2xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.16em] text-[#503017] mb-2 font-medium">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Katherine Vance"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FDF7EE] border border-[#9F6D44]/30 text-[#47260E] placeholder-[#9F6D44]/40 text-[14px] focus:outline-none focus:border-[#47260E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.16em] text-[#503017] mb-2 font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@institution.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FDF7EE] border border-[#9F6D44]/30 text-[#47260E] placeholder-[#9F6D44]/40 text-[14px] focus:outline-none focus:border-[#47260E] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.16em] text-[#503017] mb-2 font-medium">
                  Company / Institution
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vance & Partners"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FDF7EE] border border-[#9F6D44]/30 text-[#47260E] placeholder-[#9F6D44]/40 text-[14px] focus:outline-none focus:border-[#47260E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-[0.16em] text-[#503017] mb-2 font-medium">
                  Primary Discipline of Interest
                </label>
                <select className="w-full px-4 py-3.5 rounded-xl bg-[#FDF7EE] border border-[#9F6D44]/30 text-[#47260E] text-[14px] focus:outline-none focus:border-[#47260E] transition-colors">
                  <option>Bespoke Brand Identity</option>
                  <option>Editorial Digital Platform</option>
                  <option>Spatial & Packaging Architecture</option>
                  <option>Full Creative Commission</option>
                </select>
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-[11px] font-sans uppercase tracking-[0.16em] text-[#503017] mb-2 font-medium">
                Project Narrative & Objectives
              </label>
              <textarea
                rows={4}
                placeholder="Describe your vision, timeline, and aspirations..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#FDF7EE] border border-[#9F6D44]/30 text-[#47260E] placeholder-[#9F6D44]/40 text-[14px] focus:outline-none focus:border-[#47260E] transition-colors resize-none"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#47260E] hover:bg-[#503017] text-[#FDF7EE] text-[13px] font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 shadow-md active:scale-[0.98]"
              >
                Start a Conversation →
              </button>
            </div>
          </form>
        </section>

        {/* ========================================================= */}
        {/* FOOTER — Deep Rich Brown with Warm Ivory Typography        */}
        {/* ========================================================= */}
        <footer className="py-24 px-6 sm:px-10 bg-[#2E180C] text-[#FDF7EE] relative overflow-hidden">
          <div className="max-w-[1320px] mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 pb-16 border-b border-[#9F6D44]/20">
              {/* Brand Col */}
              <div className="md:col-span-5">
                <div className="h-10 w-[190px] mb-6">
                  {/* Footer logo in warm cream */}
                  <TheTavqoLogo className="w-full h-full object-contain brightness-200" />
                </div>
                <p className="text-[14.5px] font-sans text-[#F7EFE2]/75 max-w-[380px] leading-relaxed font-light mb-8">
                  The Tavqo is a luxury design atelier and digital studio crafting enduring brands, timeless interfaces, and intentional experiences.
                </p>
                <div className="text-[13px] font-sans text-[#9F6D44] tracking-wider uppercase">
                  Geneva • Paris • New York
                </div>
              </div>

              {/* Navigation Links */}
              <div className="md:col-span-2">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#9F6D44] block mb-4">
                  Navigation
                </span>
                <ul className="space-y-3 text-[14px] font-sans text-[#F7EFE2]/80 font-light">
                  <li><a href="#services" className="hover:text-[#FDF7EE] transition-colors">Services</a></li>
                  <li><a href="#about" className="hover:text-[#FDF7EE] transition-colors">About Atelier</a></li>
                  <li><a href="#projects" className="hover:text-[#FDF7EE] transition-colors">Selected Work</a></li>
                  <li><a href="#process" className="hover:text-[#FDF7EE] transition-colors">Methodology</a></li>
                  <li><a href="#contact" className="hover:text-[#FDF7EE] transition-colors">Consultation</a></li>
                </ul>
              </div>

              {/* Direct Contacts */}
              <div className="md:col-span-3">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#9F6D44] block mb-4">
                  Inquiries
                </span>
                <p className="text-[14px] font-sans text-[#F7EFE2]/80 font-light leading-relaxed mb-4">
                  General commissions & private consultations:
                </p>
                <a
                  href="mailto:concierge@thetavqo.com"
                  className="font-serif italic text-[17px] text-[#FDF7EE] hover:text-[#9F6D44] transition-colors block mb-2"
                >
                  concierge@thetavqo.com
                </a>
                <p className="text-[13px] font-sans text-[#F7EFE2]/60 font-light">
                  Direct reply within one business day.
                </p>
              </div>

              {/* Social / Editorial Archive */}
              <div className="md:col-span-2">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#9F6D44] block mb-4">
                  Connect
                </span>
                <ul className="space-y-2.5 text-[14px] font-sans text-[#F7EFE2]/80 font-light">
                  <li><a href="#contact" className="hover:text-[#9F6D44] transition-colors">Instagram</a></li>
                  <li><a href="#contact" className="hover:text-[#9F6D44] transition-colors">LinkedIn</a></li>
                  <li><a href="#contact" className="hover:text-[#9F6D44] transition-colors">Monograph Journal</a></li>
                  <li><a href="#contact" className="hover:text-[#9F6D44] transition-colors">Editorial Press</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] font-sans text-[#F7EFE2]/60 font-light">
              <span>© {new Date().getFullYear()} The Tavqo. All rights reserved.</span>
              <div className="flex items-center gap-6">
                <a href="#contact" className="hover:text-[#FDF7EE] transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="#contact" className="hover:text-[#FDF7EE] transition-colors">Terms of Engagement</a>
                <span>•</span>
                <button
                  type="button"
                  onClick={handleReplayIntro}
                  className="hover:text-[#9F6D44] transition-colors underline underline-offset-4"
                >
                  Replay Logo Intro ↺
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* FLOATING REPLAY CONTROLLER (Always accessible for easy testing & review) */}
      {!isIntroRunning && (
        <button
          type="button"
          onClick={handleReplayIntro}
          title="Replay The Tavqo Organic Logo Intro"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-[#47260E] text-[#FDF7EE] text-[12px] font-sans font-medium tracking-[0.12em] uppercase border border-[#9F6D44]/40 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 animate-fade-slide-down"
        >
          <span className="text-[13px]">↺</span>
          <span>Replay Intro</span>
        </button>
      )}
    </div>
  );
}

export default App;
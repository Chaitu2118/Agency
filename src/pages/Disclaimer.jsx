import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ChevronRight,
  ArrowRight,
  Copy,
  Check,
  Mail,
  Globe,
  HelpCircle,
} from "lucide-react";

/**
 * Section definitions for Table of Contents navigation & ScrollSpy
 */
const SECTIONS = [
  { id: "section-1", num: "01.", title: "Service Information" },
  { id: "section-2", num: "02.", title: "Portfolio and Demo Projects" },
  { id: "section-3", num: "03.", title: "Technical Results" },
  { id: "section-4", num: "04.", title: "Third-Party Services" },
  { id: "section-5", num: "05.", title: "External Links" },
  { id: "section-6", num: "06.", title: "No Professional Advice" },
  { id: "section-7", num: "07.", title: "Limitation of Disclaimer" },
  { id: "section-8", num: "08.", title: "Contact" },
];

export default function Disclaimer() {
  const [activeSection, setActiveSection] = useState("section-1");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Set page metadata and scroll to top
  useEffect(() => {
    document.title = "Disclaimer — TAVQO";
    window.scrollTo({ top: 0, behavior: "instant" });
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Official Disclaimer for TAVQO. Important information regarding our service descriptions, portfolio concepts, technical results, and third-party services."
      );
    }
  }, []);

  // Scrollspy observer to highlight current section in Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const element = document.getElementById(SECTIONS[i].id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@thetavqo.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative min-h-screen text-[#F5F4FF] overflow-x-clip bg-[#050508] selection:bg-white/20 selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar currentRoute="disclaimer" isRevealed={true} />

      {/* =================================================================== */}
      {/* HOMEPAGE HERO MATCHING ATMOSPHERIC ILLUMINATION & VOLUMETRIC SPOTLIGHT */}
      {/* =================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden select-none z-0"
      >
        {/* Concentrated upper-left volumetric spotlight beam with smooth falloff */}
        <div
          className="absolute -top-[80px] -left-[60px] w-[55vw] h-[75vh] max-w-[680px]"
          style={{
            background:
              "conic-gradient(from 125deg at 0% 0%, transparent 0deg, rgba(81, 71, 255, 0.75) 12deg, rgba(165, 155, 255, 0.95) 24deg, rgba(81, 71, 255, 0.45) 36deg, transparent 48deg)",
            filter: "blur(32px)",
            transform: "rotate(-10deg)",
            transformOrigin: "0% 0%",
            opacity: 0.85,
          }}
        />

        {/* Core bright light streak entering from top-left */}
        <div
          className="absolute -top-[20px] -left-[20px] w-[35vw] h-[55vh] max-w-[440px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(142, 131, 255, 0.80) 22%, rgba(81, 71, 255, 0.35) 48%, transparent 70%)",
            filter: "blur(18px)",
            transform: "rotate(-5deg)",
            transformOrigin: "0% 0%",
            opacity: 0.75,
          }}
        />

        {/* Hero Central Violet Nebula Glow (Radiating behind the hero banner card) */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] opacity-45 blur-[130px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(130, 117, 255, 0.35) 0%, rgba(96, 73, 226, 0.22) 45%, transparent 75%)",
          }}
        />

        {/* Persistent soft violet ambient glow across viewport */}
        <div
          className="absolute top-[40%] right-[5%] w-[650px] h-[650px] rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(130, 117, 255, 0.50) 0%, rgba(81, 69, 217, 0.20) 50%, transparent 75%)",
          }}
        />

        {/* Cinematic SVG film grain texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
        >
          <filter id="disclaimer-hero-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#disclaimer-hero-grain)" />
        </svg>
      </div>

      <main className="relative z-10 pt-32 sm:pt-36 md:pt-40 pb-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* ================================================================= */}
          {/* HERO BANNER SECTION (Matching Privacy Policy & Terms format)      */}
          {/* ================================================================= */}
          <div className="relative mb-14 sm:mb-20 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.015] backdrop-blur-2xl p-7 sm:p-10 md:p-12 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            {/* Ambient inner rim glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#8275FF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6049E2]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            <div className="relative max-w-3xl space-y-6">
              {/* Primary Page Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white font-sans">
                Disclaimer
              </h1>

              {/* Introductory Description */}
              <div className="space-y-3 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                <p>
                  The information provided on the TAVQO website at{" "}
                  <a
                    href="https://thetavqo.pages.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                  >
                    https://thetavqo.pages.dev
                  </a>{" "}
                  is for general informational and portfolio purposes.
                </p>
                <p className="text-white/60">
                  <strong className="text-white font-medium">TAVQO</strong> is an independent creative technology brand operated by an individual in India.
                </p>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* TWO-COLUMN LAYOUT: STICKY TOC SIDEBAR + 8 DETAILED SECTIONS       */}
          {/* ================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* --------------------------------------------------------------- */}
            {/* LEFT COLUMN: STICKY TABLE OF CONTENTS + HELP CARD (lg:col-span-4)*/}
            {/* --------------------------------------------------------------- */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              {/* Navigation Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5 sm:p-6">
                <div className="flex items-center justify-between pb-4 mb-3 border-b border-white/[0.08]">
                  <h2 className="text-xs uppercase tracking-wider text-white/60 font-sans font-medium">
                    Table of Contents
                  </h2>
                  <span className="text-xs text-white/40 font-sans">8 Sections</span>
                </div>

                {/* Table of contents links */}
                <nav className="space-y-1 max-h-[calc(100vh-22rem)] overflow-y-auto pr-1">
                  {SECTIONS.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        onClick={(e) => scrollToSection(e, section.id)}
                        className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-[13px] font-sans transition-colors ${
                          isActive
                            ? "bg-white/[0.08] text-white font-medium border border-white/20"
                            : "text-white/60 hover:text-white hover:bg-white/[0.03] border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span
                            className={`text-[12px] font-normal shrink-0 ${
                              isActive ? "text-white font-medium" : "text-white/40 group-hover:text-white/70"
                            }`}
                          >
                            {section.num}
                          </span>
                          <span className="truncate">{section.title}</span>
                        </div>
                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                            isActive
                              ? "text-white translate-x-0.5"
                              : "text-white/30 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                          }`}
                        />
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* "Have Questions?" Support Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5 sm:p-6">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/80 mb-3.5">
                  <HelpCircle className="w-4 h-4" />
                </div>

                <h3 className="text-sm font-medium text-white font-sans mb-1.5">Have Questions?</h3>
                <p className="text-xs text-white/60 font-sans leading-relaxed mb-4">
                  Need clarification regarding our service specifications or project terms?
                </p>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white text-[#050508] text-xs font-medium hover:bg-white/90 transition-colors font-sans"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>

            {/* --------------------------------------------------------------- */}
            {/* RIGHT COLUMN: 8 NUMBERED POLICY SECTIONS (lg:col-span-8)        */}
            {/* --------------------------------------------------------------- */}
            <div className="lg:col-span-8 space-y-8 sm:space-y-10">

              {/* ============================================================= */}
              {/* SECTION 1: SERVICE INFORMATION                                */}
              {/* ============================================================= */}
              <section
                id="section-1"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">01.</span>
                  <span>Service Information</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    We make reasonable efforts to describe our services and capabilities accurately. However, website content is general information and does not constitute a binding offer, project proposal, or guarantee of service availability.
                  </p>
                  <p className="text-white/60">
                    The scope, price, schedule, and suitability of a service will depend on the requirements of each project and must be confirmed separately.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 2: PORTFOLIO AND DEMO PROJECTS                        */}
              {/* ============================================================= */}
              <section
                id="section-2"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">02.</span>
                  <span>Portfolio and Demo Projects</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    The portfolio may contain client work, personal projects, demonstrations, experiments, and conceptual designs.
                  </p>
                  <p>
                    Demonstration projects are intended to illustrate design or technical capabilities. They may not represent completed commercial deployments, production-ready products, or actual client engagements.
                  </p>
                  <p className="text-white/60">
                    Project details and results should not be interpreted as guarantees of future project outcomes.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 3: TECHNICAL RESULTS                                  */}
              {/* ============================================================= */}
              <section
                id="section-3"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">03.</span>
                  <span>Technical Results</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    Software development, AI, automation, IoT, and interactive experiences involve technical dependencies and limitations.
                  </p>
                  <p>
                    Results may depend on third-party APIs, platforms, hardware, infrastructure, data quality, and client requirements.
                  </p>
                  <p className="text-white/60">
                    We do not guarantee that every solution will operate without interruption, error, or limitation. Specific requirements and acceptance criteria should be documented in the relevant project agreement.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 4: THIRD-PARTY SERVICES                               */}
              {/* ============================================================= */}
              <section
                id="section-4"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">04.</span>
                  <span>Third-Party Services</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    The website or projects may reference third-party platforms, software, APIs, libraries, or services.
                  </p>
                  <p>
                    Those services are operated independently and may change their features, availability, pricing, or terms.
                  </p>
                  <p className="text-white/60">
                    TAVQO is not responsible for third-party services beyond responsibilities imposed by applicable law or agreed in writing.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 5: EXTERNAL LINKS                                     */}
              {/* ============================================================= */}
              <section
                id="section-5"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">05.</span>
                  <span>External Links</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    External links are provided for convenience or reference. We do not control and are not responsible for the content, security, or privacy practices of external websites.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 6: NO PROFESSIONAL ADVICE                             */}
              {/* ============================================================= */}
              <section
                id="section-6"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">06.</span>
                  <span>No Professional Advice</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    Website content is not intended to constitute legal, financial, medical, or other regulated professional advice.
                  </p>
                  <p className="text-white/60">
                    Users should seek qualified professional advice where appropriate.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 7: LIMITATION OF DISCLAIMER                           */}
              {/* ============================================================= */}
              <section
                id="section-7"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">07.</span>
                  <span>Limitation of Disclaimer</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    Nothing in this Disclaimer excludes or limits any liability, warranty, or consumer right that cannot legally be excluded or limited under applicable law.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 8: CONTACT                                            */}
              {/* ============================================================= */}
              <section
                id="section-8"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">08.</span>
                  <span>Contact</span>
                </h2>

                <div className="space-y-5 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>For questions about this Disclaimer, contact:</p>

                  {/* Contact Info Card */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
                    <div className="text-white font-medium text-lg font-sans tracking-tight">
                      TAVQO
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-white/[0.08]">
                      <div className="flex items-center gap-2.5 text-sm text-white/80 font-sans">
                        <Mail className="w-4 h-4 text-white/60" />
                        <span>Email:</span>
                        <a
                          href="mailto:hello@thetavqo.com"
                          className="text-white hover:text-white/80 font-medium transition-colors"
                        >
                          hello@thetavqo.com
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs text-white transition-colors w-fit font-sans"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span className="text-white">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-white/60" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-white/80 pt-2 border-t border-white/[0.08] font-sans">
                      <Globe className="w-4 h-4 text-white/60" />
                      <span>Website:</span>
                      <a
                        href="https://thetavqo.pages.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-white/80 underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                      >
                        https://thetavqo.pages.dev
                      </a>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}


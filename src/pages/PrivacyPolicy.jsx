import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  ExternalLink,
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
  { id: "section-1", num: "01.", title: "Information We Collect" },
  { id: "section-2", num: "02.", title: "How We Use Information" },
  { id: "section-3", num: "03.", title: "Contact Form Provider" },
  { id: "section-4", num: "04.", title: "Website Hosting and Security" },
  { id: "section-5", num: "05.", title: "Cookies and Analytics" },
  { id: "section-6", num: "06.", title: "Sharing of Information" },
  { id: "section-7", num: "07.", title: "Data Retention" },
  { id: "section-8", num: "08.", title: "Your Privacy Requests" },
  { id: "section-9", num: "09.", title: "Children's Privacy" },
  { id: "section-10", num: "10.", title: "Third-Party Websites" },
  { id: "section-11", num: "11.", title: "Changes to This Policy" },
  { id: "section-12", num: "12.", title: "Contact" },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("section-1");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Set page metadata and scroll to top
  useEffect(() => {
    document.title = "Privacy Policy — TAVQO";
    window.scrollTo({ top: 0, behavior: "instant" });
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Official Privacy Policy for TAVQO. Learn how information is collected, processed, and handled."
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
      <Navbar currentRoute="privacy" isRevealed={true} />

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
          <filter id="privacy-hero-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#privacy-hero-grain)" />
        </svg>
      </div>

      <main className="relative z-10 pt-32 sm:pt-36 md:pt-40 pb-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* ================================================================= */}
          {/* HERO BANNER SECTION (Clean text-focused, no 3D graphic)          */}
          {/* ================================================================= */}
          <div className="relative mb-14 sm:mb-20 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.015] backdrop-blur-2xl p-7 sm:p-10 md:p-12 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            {/* Ambient inner rim glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#8275FF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6049E2]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            <div className="relative max-w-3xl space-y-6">
              

              {/* Primary Page Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white font-sans">
                Privacy Policy
              </h1>

              {/* Introductory Description */}
              <div className="space-y-3 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                <p>
                  <strong className="text-white font-medium">TAVQO</strong> (&ldquo;TAVQO,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is an independent creative technology brand operated by an individual in India. TAVQO is not currently represented as a registered company.
                </p>
                <p className="text-white/60">
                  This Privacy Policy explains how information may be collected, used, and handled when you visit{" "}
                  <a
                    href="https://thetavqo.pages.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                  >
                    https://thetavqo.pages.dev
                  </a>{" "}
                  or contact us through the website.
                </p>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* TWO-COLUMN LAYOUT: STICKY TOC SIDEBAR + 12 DETAILED SECTIONS      */}
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
                  <span className="text-xs text-white/40 font-sans">12 Sections</span>
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
                  Need clarification on our privacy practices or wish to submit a data request?
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
            {/* RIGHT COLUMN: 12 NUMBERED POLICY SECTIONS (lg:col-span-8)       */}
            {/* --------------------------------------------------------------- */}
            <div className="lg:col-span-8 space-y-8 sm:space-y-10">

              {/* ============================================================= */}
              {/* SECTION 1: INFORMATION WE COLLECT                             */}
              {/* ============================================================= */}
              <section
                id="section-1"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">01.</span>
                  <span>Information We Collect</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>When you use our contact form, you may provide:</p>

                  <ul className="space-y-2.5 pt-1">
                    {[
                      "Your name",
                      "Your email address",
                      "Project details or message content",
                      "Any other information you voluntarily include in your message",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Warning Box for Sensitive Data */}
                  <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 flex items-start gap-3.5">
                    <AlertTriangle className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
                    <p className="text-sm text-white/80 leading-relaxed font-normal font-sans">
                      <strong className="text-white font-medium">Important:</strong> Please do not submit passwords, payment details, government identification numbers, sensitive personal information, or confidential material through the contact form.
                    </p>
                  </div>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 2: HOW WE USE INFORMATION                             */}
              {/* ============================================================= */}
              <section
                id="section-2"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">02.</span>
                  <span>How We Use Information</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>We use information submitted through the website to:</p>

                  <ul className="space-y-2.5 pt-1">
                    {[
                      "Respond to inquiries and project requests",
                      "Communicate about potential or ongoing work",
                      "Understand the requirements you share with us",
                      "Prevent spam, abuse, and misuse of the contact form",
                      "Maintain the security and operation of the website",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="pt-2 text-white/60">
                    We do not use contact-form information for unrelated marketing campaigns unless you separately agree or the law permits it.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 3: CONTACT FORM PROVIDER                              */}
              {/* ============================================================= */}
              <section
                id="section-3"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">03.</span>
                  <span>Contact Form Provider</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    Our contact form uses <strong className="text-white font-medium">Web3Forms</strong>, a third-party form processing service.
                  </p>
                  <p>
                    When you submit the form, the information you enter is transmitted to Web3Forms so that it can process the submission and forward it to the configured recipient.
                  </p>
                  <p>Web3Forms may process information according to its own privacy policy and service terms:</p>

                  {/* External Links Buttons */}
                  <div className="flex flex-wrap gap-3 pt-1 pb-2">
                    <a
                      href="https://web3forms.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] text-xs sm:text-sm text-white transition-all group font-sans"
                    >
                      <span>Web3Forms Privacy Policy</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                    </a>

                    <a
                      href="https://web3forms.com/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] text-xs sm:text-sm text-white transition-all group font-sans"
                    >
                      <span>Web3Forms Terms of Service</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                    </a>
                  </div>

                  <p className="text-sm text-white/60">
                    Web3Forms may use infrastructure and service providers to process submissions. Please review its policy for details about retention, security, and subprocessors.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 4: WEBSITE HOSTING AND SECURITY                       */}
              {/* ============================================================= */}
              <section
                id="section-4"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">04.</span>
                  <span>Website Hosting and Security</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    Our website is hosted using <strong className="text-white font-medium">Cloudflare Pages</strong>. Cloudflare may process technical information such as IP addresses, browser information, request data, and security-related logs to deliver and protect the website.
                  </p>

                  <div className="pt-1 pb-1">
                    <a
                      href="https://www.cloudflare.com/privacypolicy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] text-xs sm:text-sm text-white transition-all group font-sans"
                    >
                      <span>Cloudflare Privacy Policy</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 5: COOKIES AND ANALYTICS                              */}
              {/* ============================================================= */}
              <section
                id="section-5"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">05.</span>
                  <span>Cookies and Analytics</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    We are reviewing whether analytics, cookies, or other tracking technologies are enabled on this website.
                  </p>

                  {/* Informational Callout Card */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                    <p className="text-sm sm:text-[15px] text-white font-normal leading-relaxed">
                      Before publishing this policy, TAVQO will confirm the actual analytics and cookie configuration and update this section accordingly.
                    </p>
                  </div>

                  <p className="text-white/60">
                    If analytics or tracking technologies are enabled in the future, this policy will be updated to identify the relevant services and explain their purpose.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 6: SHARING OF INFORMATION                             */}
              {/* ============================================================= */}
              <section
                id="section-6"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">06.</span>
                  <span>Sharing of Information</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.025] border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                    <p className="text-white font-medium text-[15px]">
                      We do not sell personal information submitted through our contact form.
                    </p>
                  </div>

                  <p>
                    Information may be processed by service providers necessary to operate the website and contact form, including Cloudflare and Web3Forms.
                  </p>
                  <p className="text-white/60">
                    Information may also be disclosed where required by applicable law or to protect the security, rights, or property of TAVQO or others.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 7: DATA RETENTION                                     */}
              {/* ============================================================= */}
              <section
                id="section-7"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">07.</span>
                  <span>Data Retention</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    We retain inquiry information only for as long as reasonably necessary to respond to the inquiry, manage a potential or actual project, maintain relevant business records, resolve disputes, or comply with applicable legal obligations.
                  </p>
                  <p className="text-white/60">
                    Web3Forms may have its own retention period for submitted form data. Please refer to its privacy policy for details.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 8: YOUR PRIVACY REQUESTS                              */}
              {/* ============================================================= */}
              <section
                id="section-8"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">08.</span>
                  <span>Your Privacy Requests</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    You may contact us to request access to, correction of, or deletion of personal information that you have provided, subject to applicable law and legitimate record-retention requirements.
                  </p>
                  <p className="text-white/60">
                    We may need to verify your identity before acting on a request.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 9: CHILDREN'S PRIVACY                                 */}
              {/* ============================================================= */}
              <section
                id="section-9"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">09.</span>
                  <span>Children&apos;s Privacy</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    This website is intended for general business and professional inquiries and is not specifically directed at children.
                  </p>
                  <p className="text-white/60">
                    Please do not submit children&apos;s personal information through the contact form.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 10: THIRD-PARTY WEBSITES                              */}
              {/* ============================================================= */}
              <section
                id="section-10"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">10.</span>
                  <span>Third-Party Websites</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for their privacy practices or content. Please review their respective privacy policies.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 11: CHANGES TO THIS POLICY                            */}
              {/* ============================================================= */}
              <section
                id="section-11"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">11.</span>
                  <span>Changes to This Policy</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    We may update this Privacy Policy when our website, services, or data practices change. The revised version will be published on this page with an updated date.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 12: CONTACT                                           */}
              {/* ============================================================= */}
              <section
                id="section-12"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">12.</span>
                  <span>Contact</span>
                </h2>

                <div className="space-y-5 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>For privacy questions or requests, contact:</p>

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

                  <p className="text-xs sm:text-sm text-white/50 pt-1 leading-relaxed font-sans">
                    This policy should be read alongside applicable privacy laws and does not replace any rights or obligations established by law.
                  </p>
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

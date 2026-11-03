import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  AlertTriangle,
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
  { id: "section-1", num: "01.", title: "Website Purpose" },
  { id: "section-2", num: "02.", title: "Services" },
  { id: "section-3", num: "03.", title: "Project Agreements" },
  { id: "section-4", num: "04.", title: "Portfolio and Demonstrations" },
  { id: "section-5", num: "05.", title: "Intellectual Property" },
  { id: "section-6", num: "06.", title: "Website Use" },
  { id: "section-7", num: "07.", title: "Contact Form" },
  { id: "section-8", num: "08.", title: "Third-Party Services and Links" },
  { id: "section-9", num: "09.", title: "Website Availability" },
  { id: "section-10", num: "10.", title: "Disclaimer of Website Information" },
  { id: "section-11", num: "11.", title: "Changes to These Terms" },
  { id: "section-12", num: "12.", title: "Governing Law" },
  { id: "section-13", num: "13.", title: "Contact" },
];

export default function Terms() {
  const [activeSection, setActiveSection] = useState("section-1");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Set page metadata and scroll to top
  useEffect(() => {
    document.title = "Terms & Conditions — TAVQO";
    window.scrollTo({ top: 0, behavior: "instant" });
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Official Terms and Conditions for TAVQO. Understand our website terms, project agreements, intellectual property guidelines, and governing law."
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
      <Navbar currentRoute="terms" isRevealed={true} />

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
          <filter id="terms-hero-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#terms-hero-grain)" />
        </svg>
      </div>

      <main className="relative z-10 pt-32 sm:pt-36 md:pt-40 pb-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* ================================================================= */}
          {/* HERO BANNER SECTION (Matching Privacy Policy format)              */}
          {/* ================================================================= */}
          <div className="relative mb-14 sm:mb-20 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.015] backdrop-blur-2xl p-7 sm:p-10 md:p-12 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            {/* Ambient inner rim glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#8275FF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6049E2]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            <div className="relative max-w-3xl space-y-6">
              {/* Primary Page Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white font-sans">
                Terms &amp; Conditions
              </h1>

              {/* Introductory Description */}
              <div className="space-y-3 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                <p className="text-white font-medium">Welcome to TAVQO.</p>
                <p>
                  <strong className="text-white font-medium">TAVQO</strong> is an independent creative technology brand operated by an individual in India. TAVQO is not currently represented as a registered company.
                </p>
                <p className="text-white/60">
                  By accessing{" "}
                  <a
                    href="https://thetavqo.pages.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                  >
                    https://thetavqo.pages.dev
                  </a>
                  , you agree to use the website lawfully and in accordance with these Terms.
                </p>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* TWO-COLUMN LAYOUT: STICKY TOC SIDEBAR + 13 DETAILED SECTIONS      */}
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
                  <span className="text-xs text-white/40 font-sans">13 Sections</span>
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
                  Need clarification regarding our terms, agreements, or service arrangements?
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
            {/* RIGHT COLUMN: 13 NUMBERED POLICY SECTIONS (lg:col-span-8)       */}
            {/* --------------------------------------------------------------- */}
            <div className="lg:col-span-8 space-y-8 sm:space-y-10">

              {/* ============================================================= */}
              {/* SECTION 1: WEBSITE PURPOSE                                    */}
              {/* ============================================================= */}
              <section
                id="section-1"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">01.</span>
                  <span>Website Purpose</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    This website provides information about TAVQO, its capabilities, services, portfolio, and ways to contact us.
                  </p>
                  <p className="text-white/60">
                    The website is intended for informational purposes and to facilitate inquiries about potential projects.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 2: SERVICES                                           */}
              {/* ============================================================= */}
              <section
                id="section-2"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">02.</span>
                  <span>Services</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>TAVQO may offer services including:</p>

                  <ul className="space-y-2.5 pt-1">
                    {[
                      "Website design and development",
                      "Mobile application development",
                      "UI/UX design",
                      "Backend development and API integration",
                      "AI and automation solutions",
                      "3D and interactive web experiences",
                      "IoT and smart-system development",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="pt-2 text-white/60">
                    The availability, scope, specifications, timeline, and price of any service depend on the individual project and must be agreed upon separately.
                  </p>
                  <p className="text-white/60">
                    A service description on this website does not constitute a guarantee that every listed service is available for every project.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 3: PROJECT AGREEMENTS                                 */}
              {/* ============================================================= */}
              <section
                id="section-3"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">03.</span>
                  <span>Project Agreements</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    Submitting an inquiry through the website does not create a client relationship or require either party to proceed with a project.
                  </p>
                  <p>Before work begins, the parties should agree in writing on relevant project details, which may include:</p>

                  <ul className="space-y-2.5 pt-1">
                    {[
                      "Scope and deliverables",
                      "Project milestones and timeline",
                      "Fees and payment schedule",
                      "Revisions and change requests",
                      "Ownership and licensing of deliverables",
                      "Maintenance and support arrangements",
                      "Cancellation or termination conditions",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="pt-2 text-white/60">
                    A separate written proposal, statement of work, or contract may supersede these general website Terms for a specific project.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 4: PORTFOLIO AND DEMONSTRATIONS                       */}
              {/* ============================================================= */}
              <section
                id="section-4"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">04.</span>
                  <span>Portfolio and Demonstrations</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    The website may display actual client projects, personal projects, experimental work, and demonstration concepts.
                  </p>
                  <p>
                    Demo projects and concepts are illustrative and may not represent completed client engagements or commercially deployed products.
                  </p>
                  <p className="text-white/60">
                    Client work will be identified where reasonably practicable. Client names, logos, testimonials, or confidential project information should not be used without appropriate permission.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 5: INTELLECTUAL PROPERTY                              */}
              {/* ============================================================= */}
              <section
                id="section-5"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">05.</span>
                  <span>Intellectual Property</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    Unless otherwise stated, the website’s original text, visual design, branding, graphics, and other content are owned by TAVQO or used with permission.
                  </p>
                  <p>
                    You may not reproduce, distribute, modify, or commercially exploit website content without prior permission, except where permitted by law.
                  </p>
                  <p>
                    Ownership and licensing of project deliverables created for a client will be determined by the applicable written project agreement.
                  </p>
                  <p className="text-white/60">
                    Third-party software, libraries, fonts, images, and other materials remain subject to their respective licenses.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 6: WEBSITE USE                                        */}
              {/* ============================================================= */}
              <section
                id="section-6"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">06.</span>
                  <span>Website Use</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>You agree not to:</p>

                  <ul className="space-y-2.5 pt-1">
                    {[
                      "Use the website for unlawful purposes",
                      "Attempt to disrupt or compromise website security",
                      "Submit spam, malicious code, or misleading inquiries",
                      "Attempt unauthorized access to website systems",
                      "Copy or misuse website content in violation of applicable rights",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="pt-2 text-white/60">
                    We may restrict access or take reasonable action against misuse.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 7: CONTACT FORM                                       */}
              {/* ============================================================= */}
              <section
                id="section-7"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">07.</span>
                  <span>Contact Form</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    The website contact form is provided to facilitate project inquiries.
                  </p>
                  <p>
                    Submitting a form does not guarantee acceptance of a project, a response within a particular timeframe, or the availability of services.
                  </p>

                  {/* Warning Box for Sensitive Info */}
                  <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 flex items-start gap-3.5">
                    <AlertTriangle className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
                    <p className="text-sm text-white/80 leading-relaxed font-normal font-sans">
                      <strong className="text-white font-medium">Notice:</strong> Please do not submit confidential, sensitive, or legally protected information through the form unless an appropriate arrangement has been made.
                    </p>
                  </div>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 8: THIRD-PARTY SERVICES AND LINKS                     */}
              {/* ============================================================= */}
              <section
                id="section-8"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">08.</span>
                  <span>Third-Party Services and Links</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    The website may rely on third-party services, including Cloudflare Pages and Web3Forms, and may link to external websites.
                  </p>
                  <p className="text-white/60">
                    Third-party services are subject to their own terms and policies. TAVQO does not control external websites and is not responsible for their content, availability, or policies.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 9: WEBSITE AVAILABILITY                               */}
              {/* ============================================================= */}
              <section
                id="section-9"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">09.</span>
                  <span>Website Availability</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    We aim to keep the website accessible and functional but do not guarantee uninterrupted availability, error-free operation, or permanent availability of any particular feature.
                  </p>
                  <p className="text-white/60">
                    We may update, suspend, or remove website content or functionality as needed.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 10: DISCLAIMER OF WEBSITE INFORMATION                 */}
              {/* ============================================================= */}
              <section
                id="section-10"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">10.</span>
                  <span>Disclaimer of Website Information</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    Service descriptions, portfolio information, and other website content are provided for general informational purposes.
                  </p>
                  <p>
                    Specific project outcomes, timelines, costs, and technical requirements depend on the circumstances of each engagement and should be confirmed in writing.
                  </p>
                  <p className="text-white/60">
                    Nothing in these Terms excludes any liability or consumer right that cannot legally be excluded or limited.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 11: CHANGES TO THESE TERMS                            */}
              {/* ============================================================= */}
              <section
                id="section-11"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">11.</span>
                  <span>Changes to These Terms</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    We may update these Terms from time to time. The updated version will be published on this page with a revised date.
                  </p>
                  <p className="text-white/60">
                    Continued use of the website after an update constitutes use subject to the updated Terms, to the extent permitted by applicable law.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 12: GOVERNING LAW                                     */}
              {/* ============================================================= */}
              <section
                id="section-12"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">12.</span>
                  <span>Governing Law</span>
                </h2>

                <div className="space-y-4 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>
                    These Terms are governed by the laws of India, subject to applicable mandatory legal protections and rights.
                  </p>
                  <p className="text-white/60">
                    Any dispute will be handled by the courts or dispute-resolution mechanism having jurisdiction under applicable law.
                  </p>
                </div>
              </section>

              {/* ============================================================= */}
              {/* SECTION 13: CONTACT                                           */}
              {/* ============================================================= */}
              <section
                id="section-13"
                className="scroll-mt-28 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-xl p-6 sm:p-8 md:p-9"
              >
                <h2 className="text-xl sm:text-2xl font-normal text-white font-sans flex items-baseline gap-3 mb-5">
                  <span className="text-white/40 font-normal text-lg sm:text-xl font-sans">13.</span>
                  <span>Contact</span>
                </h2>

                <div className="space-y-5 text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-light font-sans">
                  <p>For questions about these Terms, contact:</p>

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
                    These Terms should be read alongside applicable laws and do not replace any rights or obligations established by law.
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


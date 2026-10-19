import { memo } from "react";
import { ChevronRight } from "lucide-react";

/**
 * Clean SVG Social Icons: LinkedIn, Instagram, X (Twitter)
 */
function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Actual TAVQO Website Navigation Links
const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Why TAVQO", href: "#why-tavqo" },
  { label: "Process", href: "#good-fit" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  { label: "Websites & Digital Experiences", href: "#services" },
  { label: "Mobile App Development", href: "#services" },
  { label: "Product Engineering & Dashboards", href: "#services" },
  { label: "AI & Intelligent Automation", href: "#services" },
  { label: "IoT & Smart Systems", href: "#services" },
  { label: "Immersive 3D Experiences", href: "#services" },
];

const exploreLinks = [
  { label: "Client Inquiries", href: "mailto:hello@tavqo.com" },
  { label: "Careers", href: "#footer" },
  { label: "Privacy Policy", href: "#footer" },
  { label: "Terms of Service", href: "#footer" },
];

function FooterComponent() {
  return (
    <footer
      id="footer"
      className="relative z-30 w-full bg-[#050508] text-[#F4F3FA] pt-20 sm:pt-24 pb-14 sm:pb-20 px-6 sm:px-10 lg:px-16 overflow-hidden select-text border-t border-white/[0.08]"
      style={{
        backgroundColor: "#050508", // TAVQO deep dark canvas matching Hero theme
      }}
    >
      <div id="contact" className="absolute -top-24 pointer-events-none" />
      {/* =================================================================== */}
      {/* 1. BACKGROUND GLOWS & GIANT FADED TAVQO WATERMARK IN BG             */}
      {/* =================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
      >
        {/* Hero-themed atmospheric violet ambient glows */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(81,71,255,0.14)_0%,_rgba(130,117,255,0.05)_45%,_transparent_75%)] blur-3xl" />
        <div className="absolute top-[20%] left-1/3 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(130,117,255,0.07)_0%,_transparent_70%)] blur-2xl" />

        {/* Giant Faded TAVQO Wordmark in Background of Footer Elements:
            - Letters brought closer together ("doo little near the letters")
            - Perfectly centered behind the content
            - Ethereal gradient fading smoothly downwards without harsh box cuts */}
        <div className="absolute top-[12%] sm:top-[14%] md:top-[16%] inset-x-0 flex items-center justify-center select-none pointer-events-none z-0 px-4">
          <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 lg:gap-10 select-none pointer-events-none">
            {["T", "A", "V", "Q", "O"].map((char) => (
              <span
                key={char}
                className="font-sans font-black text-[15vw] sm:text-[16vw] md:text-[17vw] lg:text-[16vw] leading-none select-none block"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(216, 212, 255, 0.08) 55%, rgba(130, 117, 255, 0.01) 95%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. FOREGROUND FOOTER ELEMENTS (Z-10 ON TOP OF BACKGROUND WATERMARK) */}
      {/* =================================================================== */}
      <div className="relative z-10 max-w-[1360px] mx-auto">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start pb-16 sm:pb-20">
          
          {/* --------------------------------------------------------------- */}
          {/* COLUMN 1: TAVQO BRAND & CONNECT INFO (lg:col-span-4)            */}
          {/* --------------------------------------------------------------- */}
          <div className="lg:col-span-4 lg:pr-8">
            {/* Brand Logo & Wordmark (T logo icon removed as requested) */}
            <a
              href="#hero"
              className="inline-flex flex-col group focus-visible:outline-none"
              aria-label="TAVQO Home"
            >
              <span className="font-sans text-[20px] sm:text-[22px] font-semibold tracking-[0.24em] uppercase text-white group-hover:text-[#8275FF] transition-colors duration-200">
                T<span className="inline-block transform scale-y-[0.96]">Λ</span>VQO
              </span>
              <span className="text-[10.5px] font-sans tracking-[0.18em] uppercase text-[#9696A8] font-light mt-0.5">
                Creative Technology Studio
              </span>
            </a>

            {/* Brand Description Tagline */}
            <p className="text-[13.5px] sm:text-[14px] font-sans text-[#9696A8] font-light leading-[1.65] mt-5 mb-7 max-w-[320px]">
              We design, develop and engineer digital products, brands and systems that help businesses grow in a connected world.
            </p>

            {/* "Connect with us:" and inline social icons (website icon removed) */}
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-sans text-[#9696A8] font-normal">
                Connect with us:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.06] border border-white/10 text-[#C4C3D0] hover:text-white hover:border-[#8275FF]/60 hover:bg-[#8275FF]/20 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.06] border border-white/10 text-[#C4C3D0] hover:text-white hover:border-[#8275FF]/60 hover:bg-[#8275FF]/20 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.06] border border-white/10 text-[#C4C3D0] hover:text-white hover:border-[#8275FF]/60 hover:bg-[#8275FF]/20 transition-all duration-200"
                  aria-label="X (formerly Twitter)"
                >
                  <XIcon className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* COLUMN 2: QUICK LINKS (lg:col-span-2)                           */}
          {/* --------------------------------------------------------------- */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-[15px] font-medium text-white mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-0">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center justify-between py-2 border-b border-white/[0.06] text-[13px] font-sans text-[#9696A8] hover:text-white transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-3 h-3 text-[#5A5A6E] group-hover:text-[#8275FF] group-hover:translate-x-0.5 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* COLUMN 3: DIGITAL SERVICES (lg:col-span-3)                      */}
          {/* --------------------------------------------------------------- */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-[15px] font-medium text-white mb-3 sm:mb-4">
              Digital Services
            </h3>
            <ul className="space-y-0">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center justify-between py-2 border-b border-white/[0.06] text-[13px] font-sans text-[#9696A8] hover:text-white transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-3 h-3 text-[#5A5A6E] group-hover:text-[#8275FF] group-hover:translate-x-0.5 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* COLUMN 4: EXPLORE & POLICIES (lg:col-span-3)                    */}
          {/* --------------------------------------------------------------- */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-[15px] font-medium text-white mb-3 sm:mb-4">
              Explore
            </h3>
            <ul className="space-y-0">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center justify-between py-2 border-b border-white/[0.06] text-[13px] font-sans text-[#9696A8] hover:text-white transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-3 h-3 text-[#5A5A6E] group-hover:text-[#8275FF] group-hover:translate-x-0.5 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* --------------------------------------------------------------- */}
        {/* CLEAN COPYRIGHT ROW IN PROPER SANS FONT                         */}
        {/* (Built for what's next and replay intro removed)                */}
        {/* --------------------------------------------------------------- */}
        <div className="py-6 border-t border-white/[0.08] flex items-center justify-between">
          <p className="font-sans text-[13px] sm:text-[14px] text-[#9696A8] font-light tracking-normal">
            © {new Date().getFullYear()} TAVQO. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default memo(FooterComponent);

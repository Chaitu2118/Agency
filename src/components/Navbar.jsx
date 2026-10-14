import { useState, useEffect, useCallback } from "react";
import tavqoLogo from "../assets/Tavqo_Logo_Ivory_Gold_Transparent.svg";

const navLinks = [
  { num: "01", name: "Home", href: "#root", desc: "Return to beginning" },
  { num: "02", name: "Services", href: "#services", desc: "Identity, Digital & Spatial" },
  { num: "03", name: "Portfolio", href: "#projects", desc: "Selected Commissions" },
  { num: "04", name: "About", href: "#about", desc: "Studio & Philosophy" },
  { num: "05", name: "Process", href: "#process", desc: "Disciplined Craftsmanship" },
  { num: "06", name: "Contact", href: "#contact", desc: "Inquire & Start Project" },
];

export default function Navbar({ isRevealed = true, onReplayIntro }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track scroll position to subtly deepen elevation while keeping warm espresso tone
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle ESC key to dismiss the luxury navigation overlay
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when overlay is open to maintain scroll integrity
  useEffect(() => {
    if (isMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMenuOpen]);

  // Handle navigation click: dismiss overlay and smoothly scroll to target
  const handleLinkClick = (href) => {
    setIsMenuOpen(false);
    if (href === "#root" || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ========================================================= */}
      {/* 1. FLOATING PILL NAVBAR CONTAINER (WARM ESPRESSO ATELIER) */}
      {/* ========================================================= */}
      <header
        className={`fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none transition-opacity duration-700 ease-out px-3.5 sm:px-6 md:px-8 pt-3.5 sm:pt-6 ${
          isRevealed ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          style={{
            backgroundColor: isScrolled
              ? "rgba(60, 32, 12, 0.98)"
              : "rgba(71, 38, 14, 0.96)",
            borderColor: "rgba(222, 183, 136, 0.24)",
            boxShadow: isScrolled
              ? "0 12px 36px rgba(71, 38, 14, 0.16)"
              : "0 8px 30px rgba(71, 38, 14, 0.10)",
          }}
          className="pointer-events-auto w-full max-w-[1360px] h-[64px] sm:h-[74px] pl-6 sm:pl-8 md:pl-10 pr-3.5 sm:pr-6 md:pr-7 flex items-center justify-between rounded-[28px] sm:rounded-[32px] border backdrop-blur-md transition-all duration-300"
        >
          {/* LEFT: Preserved Official Brand Identity (Authentic Wordmark + Botanical Emblem) */}
          <a
            href="/"
            onClick={(e) => {
              if (onReplayIntro) {
                e.preventDefault();
                setIsMenuOpen(false);
                onReplayIntro();
              }
            }}
            title="The Tavqo — Click to replay intro"
            className="group flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEB788] rounded-full py-1"
          >
            {/* Preserved id="tavqo-nav-logo" for GSAP Cinematic Intro FLIP handoff */}
            <div
              id="tavqo-nav-logo"
              className="flex items-center shrink-0 h-[48px] sm:h-[54px] md:h-[58px] lg:h-[62px] w-auto overflow-visible cursor-pointer"
            >
              <img
                src={tavqoLogo}
                alt="The Tavqo — Botanical Luxe Atelier"
                className="h-full w-auto object-contain block shrink-0 select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]"
                width="1983"
                height="793"
              />
            </div>
          </a>

          {/* RIGHT: Start Project CTA + Circular Menu Button */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Refined Ivory Pill Button: Start Project */}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center justify-center h-[36px] sm:h-[40px] px-4 sm:px-6 rounded-full bg-[#FDF7EE] hover:bg-[#DEB788] text-[#47260E] text-[12.5px] sm:text-[13.5px] font-medium tracking-tight shadow-[0_2px_10px_rgba(71,38,14,0.12)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEB788] shrink-0"
            >
              Start Project
            </a>

            {/* Circular Menu Button: #F7EFE2 with #47260E Icon */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="navigation-overlay"
              className="relative flex items-center justify-center w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#F7EFE2] hover:bg-white text-[#47260E] shadow-[0_2px_8px_rgba(71,38,14,0.10)] transition-all duration-200 hover:scale-105 active:scale-95 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEB788] shrink-0 cursor-pointer"
            >
              {/* Menu Lines morphing into Close Icon (X) in #47260E */}
              <div className="relative w-4 h-3.5 flex flex-col justify-between items-center pointer-events-none">
                <span
                  className={`w-4 h-[1.75px] bg-[#47260E] rounded-full transition-all duration-300 origin-center ${
                    isMenuOpen
                      ? "translate-y-[6px] rotate-45"
                      : "translate-y-0 rotate-0"
                  }`}
                />
                <span
                  className={`w-4 h-[1.75px] bg-[#47260E] rounded-full transition-all duration-200 ${
                    isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                  }`}
                />
                <span
                  className={`w-4 h-[1.75px] bg-[#47260E] rounded-full transition-all duration-300 origin-center ${
                    isMenuOpen
                      ? "-translate-y-[6px] -rotate-45"
                      : "translate-y-0 rotate-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. FULLSCREEN LUXURY NAVIGATION OVERLAY                   */}
      {/* ========================================================= */}
      <div
        id="navigation-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`fixed inset-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Dark Espresso Backdrop with Radial Warmth */}
        <div
          className="absolute inset-0 backdrop-blur-2xl"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
          style={{
            backgroundColor: "#47260E",
            backgroundImage:
              "radial-gradient(circle at 50% 25%, rgba(85, 46, 17, 0.98) 0%, rgba(55, 30, 11, 0.99) 100%)",
          }}
        />

        {/* Fine Botanical Grid Pattern Texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(222, 183, 136, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(222, 183, 136, 0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        {/* Overlay Content Container */}
        <div className="relative z-10 max-w-[1360px] h-full mx-auto px-6 sm:px-10 md:px-14 pt-28 sm:pt-32 pb-8 sm:pb-12 flex flex-col justify-between overflow-y-auto">
          {/* Main Navigation Grid & Atelier Studio Information */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 my-auto">
            {/* Primary Editorial Navigation Links */}
            <nav
              className="lg:col-span-8 flex flex-col space-y-2 sm:space-y-4"
              aria-label="Overlay Navigation"
            >
              {navLinks.map((item, index) => (
                <a
                  key={item.num}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 45}ms` : "0ms",
                  }}
                  className={`group flex items-baseline gap-4 sm:gap-6 py-1.5 sm:py-2 transition-all duration-500 transform ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                >
                  {/* Botanical Gold Index Number (#DEB788) */}
                  <span className="text-[12px] sm:text-[13px] font-mono tracking-widest text-[#DEB788] group-hover:text-[#FDF7EE] transition-colors duration-200 w-6">
                    {item.num}
                  </span>

                  {/* Main Link Title (#FDF7EE) + Subtitle (#F7EFE2) */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <span className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FDF7EE] group-hover:text-[#DEB788] group-hover:translate-x-2 transition-all duration-300 font-normal tracking-tight">
                      {item.name}
                    </span>
                    <span className="text-[11px] sm:text-[13px] font-sans text-[#F7EFE2]/60 group-hover:text-[#F7EFE2] transition-colors uppercase tracking-[0.14em]">
                      {item.desc}
                    </span>
                  </div>
                </a>
              ))}
            </nav>

            {/* Atelier Studio Sidebar & Quick Inquiries */}
            <div
              style={{ borderColor: "rgba(222, 183, 136, 0.24)" }}
              className={`lg:col-span-4 flex flex-col justify-between pt-6 lg:pt-2 border-t lg:border-t-0 lg:border-l lg:pl-10 transition-all duration-700 delay-200 ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="space-y-8">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#DEB788] block mb-2">
                    Direct Inquiry
                  </span>
                  <a
                    href="mailto:inquiries@thetavqo.com"
                    className="text-[#FDF7EE] hover:text-[#DEB788] text-base sm:text-lg font-light tracking-wide transition-colors block"
                  >
                    inquiries@thetavqo.com
                  </a>
                  <p className="text-[#F7EFE2]/50 text-xs sm:text-sm mt-1 font-light">
                    Accepting bespoke commissions for 2026/2027
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#DEB788] block mb-2">
                    Studio Locations
                  </span>
                  <p className="text-[#FDF7EE]/90 text-sm sm:text-base font-light">
                    New York · Paris
                  </p>
                  <p className="text-[#F7EFE2]/50 text-xs sm:text-sm mt-0.5 font-light">
                    Global digital & spatial brand experiences
                  </p>
                </div>

                {/* Experience Replay Intro Option */}
                {onReplayIntro && (
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#DEB788] block mb-2">
                      Experience
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onReplayIntro();
                      }}
                      style={{ borderColor: "rgba(222, 183, 136, 0.24)" }}
                      className="inline-flex items-center gap-2 text-[#FDF7EE]/80 hover:text-[#FDF7EE] hover:bg-[#DEB788]/10 text-xs sm:text-sm tracking-wide uppercase font-sans border px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-[#DEB788]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Replay Brand Intro
                    </button>
                  </div>
                )}
              </div>

              {/* Start Project CTA Card inside Overlay */}
              <div
                style={{ borderColor: "rgba(222, 183, 136, 0.24)" }}
                className="mt-8 pt-6 border-t"
              >
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-[#FDF7EE] hover:bg-[#DEB788] text-[#47260E] font-medium text-sm transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  <span>Start a Project</span>
                  <svg
                    className="w-4 h-4 text-[#47260E]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Overlay Footer Bar */}
          <div
            style={{ borderColor: "rgba(222, 183, 136, 0.24)" }}
            className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs text-[#F7EFE2]/50 font-light gap-2"
          >
            <span>© {new Date().getFullYear()} The Tavqo Atelier. All rights reserved.</span>
            <span className="hidden sm:inline font-mono text-[11px] text-[#DEB788]/80">
              Press [ESC] to return to page
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
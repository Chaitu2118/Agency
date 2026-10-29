import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TheTavqoLogo from "./TheTavqoLogo";

/**
 * TAVQO Dark-Luxury Capsule Island Navigation
 * Inspired by reference design:
 * - Left: Abstract emblem mark + clean brand wordmark (TAVQO)
 * - Center: Floating dark-glass capsule island with animated active pill tab
 * - Right: Tactile dark pill CTA button ("Start Your Project") with precision rim light
 * - Fully responsive with an elegant dark drawer on mobile
 * - Supports multi-page navigation (Home & About) without regressions
 */
const navLinks = [
  { label: "Home", href: "#hero", pageHref: "/" },
  { label: "About", href: "/about", pageHref: "/about" },
  { label: "Services", href: "#services", pageHref: "/#services" },
  { label: "Projects", href: "#why-tavqo", pageHref: "/#why-tavqo" },
  { label: "Insights", href: "#good-fit", pageHref: "/#good-fit" },
  { label: "Contact", href: "#contact", pageHref: "/#contact" },
];

export default function Navbar({ 
  isRevealed = true, 
  onReplayIntro, 
  onNavigate,
  currentRoute = "home" 
}) {
  const isAbout = currentRoute === "about" || (typeof window !== "undefined" && window.location.pathname.startsWith("/about"));
  const [activeHref, setActiveHref] = useState(isAbout ? "/about" : "#hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const handleNavClick = (e, link) => {
    setIsMobileMenuOpen(false);

    // If navigating to /about
    if (link.href === "/about" || link.pageHref === "/about") {
      if (typeof window !== "undefined") {
        if (window.location.pathname === "/about") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          window.location.href = "/about";
        }
      }
      return;
    }

    // If currently on /about
    if (isAbout) {
      if (link.label === "Home") {
        window.location.href = "/";
        return;
      }
      if (link.href.startsWith("#")) {
        const localEl = document.querySelector(link.href);
        if (localEl) {
          e.preventDefault();
          localEl.scrollIntoView({ behavior: "smooth" });
          return;
        }
        window.location.href = `/${link.href}`;
        return;
      }
      window.location.href = link.pageHref || link.href;
      return;
    }

    // If on homepage
    if (link.href.startsWith("#")) {
      e.preventDefault();
      setActiveHref(link.href);
      if (onNavigate) {
        onNavigate(link.href);
      } else {
        const el = document.querySelector(link.href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      window.location.href = link.href;
    }
  };

  const handleLogoClick = (e) => {
    if (isAbout) {
      window.location.href = "/";
    } else {
      handleNavClick(e, { label: "Home", href: "#hero", pageHref: "/" });
    }
  };

  const handleCtaClick = (e) => {
    if (isAbout) {
      window.location.href = "/#contact";
    } else {
      handleNavClick(e, { label: "Contact", href: "#contact", pageHref: "/#contact" });
    }
  };

  // Active section tracking via scroll position
  useEffect(() => {
    if (isAbout) {
      setActiveHref("/about");
      setIsLightMode(false);
      return;
    }

    const sectionMap = [
      { id: "hero", href: "#hero" },
      { id: "services", href: "#services" },
      { id: "why-tavqo", href: "#why-tavqo" },
      { id: "average-is-expensive", href: "#why-tavqo" },
      { id: "good-fit", href: "#good-fit" },
      { id: "contact", href: "#contact" },
      { id: "footer", href: "#contact" },
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (const item of sectionMap) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveHref(item.href);
            break;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveHref("#hero");
      }

      // Check theme directly at Navbar elevation (y ~ 45px)
      const navY = 45;

      // 1. If reached Footer (#050508 dark), force dark navbar
      const footerEl = document.getElementById("footer");
      if (footerEl) {
        const fRect = footerEl.getBoundingClientRect();
        if (fRect.top <= navY) {
          setIsLightMode(false);
          return;
        }
      }

      // 2. If in Value Clarity / Image Trail (#000000 dark), force dark navbar
      const valueEl = document.getElementById("value-clarity");
      if (valueEl) {
        const vRect = valueEl.getBoundingClientRect();
        if (vRect.top <= navY && vRect.bottom > navY) {
          setIsLightMode(false);
          return;
        }
      }

      // 3. Check light sections (AverageIsExpensive / GoodFit)
      const lightIds = ["average-is-expensive", "good-fit", "why-tavqo"];
      let inLight = false;
      for (const id of lightIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navY && rect.bottom > navY) {
            inLight = true;
            break;
          }
        }
      }
      setIsLightMode(inLight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAbout]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 w-full px-6 sm:px-10 lg:px-[6.5vw] py-5 sm:py-6 flex items-center justify-between transition-all duration-500 ease-out select-none ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{
          background: "transparent",
        }}
      >
        {/* Left: TΛVQO Wordmark */}
        <div className="flex items-center shrink-0">
          <a
            href={isAbout ? "/" : "#hero"}
            onClick={handleLogoClick}
            className="group flex items-center focus-visible:outline-none cursor-pointer"
            aria-label="TAVQO Homepage"
          >
            <span
              className={`font-sans text-[21px] sm:text-[23px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 hover:opacity-90 ${
                isLightMode ? "text-[#0E0F14]" : "text-white"
              }`}
            >
              T<span className="inline-block transform scale-y-[0.96]">Λ</span>VQO
            </span>
          </a>
        </div>

        {/* Center: Transparent Floating Navigation Row */}
        <nav
          className={`hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-7 md:gap-9 lg:gap-11 text-[13px] sm:text-[13.5px] font-sans tracking-[0.04em] px-8 md:px-10 lg:px-12 py-2 rounded-full min-w-[520px] lg:min-w-[620px] transition-all duration-300 shadow-sm ${
            isLightMode
              ? "bg-[#0E0F14]/[0.05] backdrop-blur-md border border-black/[0.08]"
              : "bg-white/[0.04] backdrop-blur-md border border-white/[0.10]"
          }`}
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = isAbout
              ? (link.href === "/about" || link.pageHref === "/about")
              : (activeHref === link.href);

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative py-1 transition-colors duration-300 cursor-pointer ${
                  isLightMode
                    ? isActive
                      ? "text-[#0E0F14] font-semibold"
                      : "text-[#5A596E] hover:text-[#0E0F14]"
                    : isActive
                    ? "text-white font-medium"
                    : "text-[#9E9EB2] hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-11 flex items-center justify-center pointer-events-none"
                  >
                    <div
                      className={`w-full h-[1.5px] relative transition-colors duration-300 ${
                        isLightMode
                          ? "bg-gradient-to-r from-transparent via-[#0E0F14]/80 to-transparent"
                          : "bg-gradient-to-r from-transparent via-white/90 to-transparent"
                      }`}
                    >
                      <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          isLightMode
                            ? "bg-[#0E0F14] shadow-[0_0_6px_rgba(14,15,20,0.5)]"
                            : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                        }`}
                      />
                    </div>
                  </div>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Outlined Pill CTA & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={isAbout ? "/#contact" : "#contact"}
            onClick={handleCtaClick}
            className={`group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-[13px] font-sans font-medium tracking-[0.04em] transition-all duration-300 active:scale-[0.98] focus-visible:outline-none cursor-pointer ${
              isLightMode
                ? "bg-[#0E0F14] text-[#FAF9F6] border border-[#0E0F14] hover:bg-[#1C1D26] shadow-md"
                : "text-white border border-white/20 hover:border-white/50 bg-black/20 hover:bg-white/5"
            }`}
          >
            <span>Start Your Project</span>
            {/* Circular arrow badge */}
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-xs ${
                isLightMode
                  ? "bg-white/20 text-[#FAF9F6] group-hover:bg-white/30"
                  : "bg-[#D4CFFF] group-hover:bg-white text-[#050508]"
              }`}
            >
              ↗
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className={`md:hidden flex items-center justify-center w-9 h-9 rounded-full transition-colors focus-visible:outline-none ${
              isLightMode
                ? "text-[#0E0F14] border border-[#0E0F14]/25 bg-black/5 hover:bg-black/10"
                : "text-white border border-white/20 bg-[#090910] hover:bg-white/10"
            }`}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#050508]/85 backdrop-blur-md md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-4 top-[72px] z-50 bg-[#0a0a10]/95 border border-white/[0.12] rounded-2xl p-5 md:hidden shadow-2xl backdrop-blur-xl"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 20px 50px rgba(0, 0, 0, 0.6)",
              }}
            >
              <nav className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = isAbout
                    ? (link.href === "/about" || link.pageHref === "/about")
                    : (activeHref === link.href);

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-sans font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "text-white bg-[#1e1e26] border border-white/[0.14]"
                          : "text-[#88889a] hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      )}
                    </a>
                  );
                })}

                <div className="h-px bg-white/10 my-2" />

                <a
                  href={isAbout ? "/#contact" : "#contact"}
                  onClick={handleCtaClick}
                  className="flex items-center justify-center w-full py-3 rounded-full bg-[#14141e] hover:bg-white/10 text-white border border-white/[0.15] text-[13.5px] font-sans font-medium transition-all cursor-pointer"
                  style={{
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.18)",
                  }}
                >
                  <span>Start Your Project</span>
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

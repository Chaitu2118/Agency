import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TheTavqoLogo from "./TheTavqoLogo";

/**
 * TAVQO Dark-Luxury Capsule Island Navigation
 * Inspired by reference design:
 * - Left: Abstract emblem mark + clean brand wordmark (Tavqo)
 * - Center: Floating dark-glass capsule island with animated active pill tab
 * - Right: Tactile dark pill CTA button ("Start Your Project") with precision rim light
 * - Fully responsive with an elegant dark drawer on mobile
 */
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ isRevealed = true, onReplayIntro }) {
  const [activeHref, setActiveHref] = useState("#hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active section tracking via scroll position
  useEffect(() => {
    const sectionIds = ["hero", "services", "projects", "about", "process", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveHref(`#${id}`);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveHref("#hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 w-full px-6 sm:px-10 lg:px-[6.5vw] py-5 sm:py-6 flex items-center justify-between transition-all duration-700 ease-out select-none ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{
          background: "transparent",
        }}
      >
        {/* Left: TΛVQO Wordmark */}
        <div className="flex items-center shrink-0">
          <a
            href="#hero"
            className="group flex items-center focus-visible:outline-none"
            aria-label="TAVQO Homepage"
          >
            <span className="font-sans text-[21px] sm:text-[23px] font-medium tracking-[0.22em] text-white uppercase transition-opacity hover:opacity-90">
              T<span className="inline-block transform scale-y-[0.96]">Λ</span>VQO
            </span>
          </a>
        </div>

        {/* Center: Transparent Floating Navigation Row */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9 text-[13px] font-sans tracking-[0.04em]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-white font-medium"
                    : "text-[#9E9EB2] hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-9 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
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
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-[13px] font-sans font-medium tracking-[0.04em] text-white border border-white/20 hover:border-white/50 bg-black/20 hover:bg-white/5 transition-all duration-300 active:scale-[0.98] focus-visible:outline-none"
          >
            <span>Start Your Project</span>
            {/* Soft lilac circular arrow badge */}
            <span className="w-6 h-6 rounded-full bg-[#D4CFFF] group-hover:bg-white text-[#050508] flex items-center justify-center text-[12px] font-bold transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-xs">
              ↗
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-white border border-white/20 bg-[#090910] hover:bg-white/10 transition-colors focus-visible:outline-none"
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
                  const isActive = activeHref === link.href;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        setActiveHref(link.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-sans font-medium transition-colors ${
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
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-full bg-[#14141e] hover:bg-white/10 text-white border border-white/[0.15] text-[13.5px] font-sans font-medium transition-all"
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
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import TheTavqoLogo from "../TheTavqoLogo";

// Default agency navigation items
const defaultNavItems = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function NotchNavbar({
  className,
  logo,
  items = defaultNavItems,
  ...props
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#services");

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["services", "about", "projects", "process", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-15% 0px -65% 0px",
        threshold: [0, 0.2],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 h-[62px] flex items-start px-0 select-none",
          className
        )}
        {...props}
      >
        {/* Left Side Bar - Flexible width */}
        <div
          className="flex-1 h-10 relative min-w-0 z-20"
          style={{ backgroundColor: "#F8F0E4" }}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="39.5"
              x2="100%"
              y2="39.5"
              stroke="#DDC6A9"
              strokeWidth={1}
              strokeOpacity={0.75}
            />
            <line
              x1="0"
              y1="36.5"
              x2="100%"
              y2="36.5"
              stroke="#DDC6A9"
              strokeWidth={0.5}
              strokeOpacity={0.3}
            />
          </svg>
        </div>

        {/* Responsive Notch Container - 3 Slices */}
        <div className="flex h-[62px] relative z-10 shrink-0 w-full max-w-[1200px] -ml-px">
          {/* Left Corner Slice - Reduced width for tighter, refined curve */}
          <div className="w-[28px] h-full relative shrink-0">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 28 62"
              preserveAspectRatio="none"
            >
              {/* Background Fill matching warm ivory */}
              <path
                d="M0 0 H28 V62 C14 62 14 40 0 40 Z"
                fill="#F8F0E4"
              />
              {/* Primary border line */}
              <path
                d="M0 39.5 C14 39.5 14 61.5 28 61.5"
                fill="none"
                stroke="#DDC6A9"
                strokeWidth={1}
                strokeOpacity={0.75}
              />
              {/* Secondary subtle drafting line */}
              <path
                d="M0 36.5 C14 36.5 14 58.5 28 58.5"
                fill="none"
                stroke="#DDC6A9"
                strokeWidth={0.5}
                strokeOpacity={0.3}
              />
            </svg>
          </div>

          {/* Center Slice - Navigation Content Area */}
          <div
            className="flex-1 h-full relative min-w-0 -ml-px"
            style={{ backgroundColor: "#F8F0E4" }}
          >
            {/* Bottom outline lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="61.5"
                x2="100%"
                y2="61.5"
                stroke="#DDC6A9"
                strokeWidth={1}
                strokeOpacity={0.75}
              />
              <line
                x1="0"
                y1="58.5"
                x2="100%"
                y2="58.5"
                stroke="#DDC6A9"
                strokeWidth={0.5}
                strokeOpacity={0.3}
              />
            </svg>

            {/* Content Layer */}
            <div className="relative w-full h-full flex items-center justify-between pb-1 px-3 sm:px-6">
              {/* LEFT: Logo */}
              <div className="flex items-center shrink-0">
                {logo || (
                  <a
                    href="/"
                    className="flex items-center focus-visible:outline-none"
                  >
                    <div className="h-7 sm:h-8 w-[130px] sm:w-[155px] flex items-center">
                      <TheTavqoLogo className="w-full h-full object-contain" />
                    </div>
                  </a>
                )}
              </div>

              {/* CENTER: Navigation Links */}
              <nav
                className="hidden lg:flex items-center gap-1 xl:gap-2"
                aria-label="Main Navigation"
              >
                {items.map((item) => {
                  const isActive = activeHref === item.href;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setActiveHref(item.href)}
                      className={cn(
                        "relative px-3.5 py-1.5 text-[12.5px] font-sans tracking-[0.09em] uppercase transition-colors duration-200",
                        isActive
                          ? "text-[#49250F] font-semibold"
                          : "text-[#795D47] font-medium hover:text-[#49250F]"
                      )}
                    >
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>

              {/* RIGHT: Consultation CTA & Mobile Toggle */}
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <a
                  href="#contact"
                  className="hidden sm:inline-flex items-center justify-center px-4.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#49250F] hover:bg-[#321A0C] text-[#FFF8EF] text-[12px] font-sans font-medium tracking-[0.11em] uppercase border border-[#DDC6A9]/50 transition-all duration-300 shadow-2xs active:scale-[0.98]"
                >
                  Book a Consultation
                </a>

                {/* Mobile Menu Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMobileMenuOpen}
                  className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full text-[#321A0C] hover:bg-[#DDC6A9]/25 transition-colors focus-visible:outline-none"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Corner Slice - Reduced width for tighter, refined curve */}
          <div className="w-[28px] h-full relative shrink-0 -ml-px">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 28 62"
              preserveAspectRatio="none"
            >
              {/* Background Fill matching warm ivory */}
              <path
                d="M0 0 H28 V40 C14 40 14 62 0 62 Z"
                fill="#F8F0E4"
              />
              {/* Primary border line */}
              <path
                d="M0 61.5 C14 61.5 14 39.5 28 39.5"
                fill="none"
                stroke="#DDC6A9"
                strokeWidth={1}
                strokeOpacity={0.75}
              />
              {/* Secondary subtle drafting line */}
              <path
                d="M0 58.5 C14 58.5 14 36.5 28 36.5"
                fill="none"
                stroke="#DDC6A9"
                strokeWidth={0.5}
                strokeOpacity={0.3}
              />
            </svg>
          </div>
        </div>

        {/* Right Side Bar - Flexible width */}
        <div
          className="flex-1 h-10 relative min-w-0 z-20 -ml-px"
          style={{ backgroundColor: "#F8F0E4" }}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="39.5"
              x2="100%"
              y2="39.5"
              stroke="#DDC6A9"
              strokeWidth={1}
              strokeOpacity={0.75}
            />
            <line
              x1="0"
              y1="36.5"
              x2="100%"
              y2="36.5"
              stroke="#DDC6A9"
              strokeWidth={0.5}
              strokeOpacity={0.3}
            />
          </svg>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#321A0C]/25 backdrop-blur-xs lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-0 top-[62px] z-50 bg-[#F8F0E4] border-b border-[#DDC6A9] p-5 lg:hidden shadow-xl"
            >
              <nav className="flex flex-col gap-1.5">
                {items.map((item) => {
                  const isActive = activeHref === item.href;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        setActiveHref(item.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-xl text-[13px] font-sans tracking-[0.09em] uppercase transition-colors duration-200",
                        isActive
                          ? "text-[#49250F] font-semibold"
                          : "text-[#795D47] font-medium hover:text-[#49250F]"
                      )}
                    >
                      <span>{item.label}</span>
                    </a>
                  );
                })}

                <div className="h-px bg-[#DDC6A9]/50 my-2" />

                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-full bg-[#49250F] text-[#FFF8EF] text-[12.5px] font-sans font-medium tracking-[0.12em] uppercase shadow-xs"
                >
                  Book a Consultation
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
export default NotchNavbar;

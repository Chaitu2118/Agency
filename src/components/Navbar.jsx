import { useState, useEffect } from "react";
import TheTavqoLogo from "./TheTavqoLogo";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ isRevealed = true, onReplayIntro }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex justify-center transition-all duration-700 ease-out ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[-1] bg-[#47260E]/20 backdrop-blur-[2px]"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#FDF7EE]/95 backdrop-blur-md border-b border-[#9F6D44]/25 shadow-xs"
            : "bg-[#FDF7EE]/80 backdrop-blur-xs border-b border-[#9F6D44]/15"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 h-20 sm:h-22 flex items-center justify-between">
          {/* LEFT: The Tavqo Logo (Identified as #tavqo-nav-logo for FLIP transition) */}
          <a
            href="/"
            onClick={(e) => {
              if (onReplayIntro) {
                e.preventDefault();
                onReplayIntro();
              }
            }}
            title="The Tavqo — Click to replay intro"
            className="group flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9F6D44]"
          >
            <div
              id="tavqo-nav-logo"
              className="h-9 sm:h-10 w-[160px] sm:w-[200px] md:w-[220px] flex items-center"
            >
              <TheTavqoLogo className="w-full h-full object-contain" />
            </div>
          </a>

          {/* CENTER / RIGHT: Luxury Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-9" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-[13.5px] font-sans font-medium tracking-[0.08em] uppercase text-[#503017]/85 hover:text-[#47260E] transition-colors duration-200 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#9F6D44] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* RIGHTMOST: Premium CTA Button */}
          <div className="hidden sm:flex items-center gap-5">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#47260E] hover:bg-[#503017] text-[#FDF7EE] text-[12.5px] font-sans font-medium tracking-[0.12em] uppercase border border-[#9F6D44]/35 transition-all duration-300 hover:shadow-sm active:scale-[0.98]"
            >
              Book a Consultation
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full text-[#47260E] hover:bg-[#9F6D44]/10 transition-colors focus-visible:outline-none"
          >
            <span
              className={`w-5 h-[1.5px] bg-[#47260E] rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? "translate-y-[2px] rotate-45" : "-translate-y-[3px]"
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-[#47260E] rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? "-translate-y-[0.5px] -rotate-45" : "translate-y-[3px]"
              }`}
            />
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        <div
          className={`lg:hidden border-t border-[#9F6D44]/20 bg-[#FDF7EE]/98 backdrop-blur-md px-6 py-6 transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen
              ? "max-h-[380px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none py-0 border-transparent"
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[14px] font-sans font-medium tracking-[0.1em] uppercase text-[#503017] hover:text-[#9F6D44] transition-colors py-1"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-4 border-t border-[#9F6D44]/20 mt-2">
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-3 rounded-full bg-[#47260E] text-[#FDF7EE] text-[13px] font-sans font-medium tracking-[0.14em] uppercase"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
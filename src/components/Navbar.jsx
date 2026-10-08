import { useState, useEffect, useRef } from "react";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(pointer: fine)").matches;
    }
    return false;
  });

  const navRef = useRef(null);
  const lensCircleRef = useRef(null);
  const lensContentRef = useRef(null);

  // Animation and physics refs for 60 FPS performance without React re-renders
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const currentScale = useRef(0);
  const currentOpacity = useRef(0);
  const targetScale = useRef(0);
  const targetOpacity = useRef(0);
  const isHovering = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const handlePointerChange = (e) => {
      setIsPointerDevice(e.matches);
    };
    mediaQuery.addEventListener("change", handlePointerChange);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const updateDimensions = () => {
      if (navRef.current && lensContentRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        lensContentRef.current.style.width = `${rect.width}px`;
        lensContentRef.current.style.height = `${rect.height}px`;
      }
    };

    updateDimensions();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateDimensions);

    return () => {
      mediaQuery.removeEventListener("change", handlePointerChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // 60 FPS animation loop for smooth cursor-following and optical magnification
  useEffect(() => {
    if (!isPointerDevice) return;

    const LENS_RADIUS = 27; // 54px lens diameter / 2
    const MAGNIFICATION = 1.22; // 22% optical magnification

    const animate = () => {
      // Smooth interpolation (spring / lerp)
      const lerpPos = 0.18;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerpPos;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerpPos;

      const lerpFade = 0.15;
      currentScale.current += (targetScale.current - currentScale.current) * lerpFade;
      currentOpacity.current += (targetOpacity.current - currentOpacity.current) * lerpFade;

      const curX = currentPos.current.x;
      const curY = currentPos.current.y;
      const scale = currentScale.current;
      const opacity = currentOpacity.current;

      if (lensCircleRef.current && lensContentRef.current) {
        if (opacity > 0.005) {
          lensCircleRef.current.style.opacity = opacity.toFixed(4);
          lensCircleRef.current.style.transform = `translate3d(${(curX - LENS_RADIUS).toFixed(2)}px, ${(curY - LENS_RADIUS).toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;

          lensContentRef.current.style.transformOrigin = `${curX.toFixed(2)}px ${curY.toFixed(2)}px`;
          lensContentRef.current.style.transform = `translate3d(${(-(curX - LENS_RADIUS)).toFixed(2)}px, ${(-(curY - LENS_RADIUS)).toFixed(2)}px, 0) scale(${MAGNIFICATION})`;
        } else {
          lensCircleRef.current.style.opacity = "0";
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isPointerDevice]);

  // Mouse event handlers for the floating navbar
  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Gently stabilize vertical axis around text baseline (y = 32px) while allowing subtle vertical movement
    const stableY = 32 + (y - 32) * 0.35;
    mousePos.current = { x, y: stableY };

    // Ensure clone width/height matches base container if not already sized
    if (lensContentRef.current && !lensContentRef.current.style.width) {
      lensContentRef.current.style.width = `${rect.width}px`;
      lensContentRef.current.style.height = `${rect.height}px`;
    }

    if (!isHovering.current) {
      isHovering.current = true;
      targetScale.current = 1;
      targetOpacity.current = 1;
      if (currentOpacity.current < 0.1) {
        currentPos.current = { x, y: stableY };
      }
    }
  };

  const handleMouseEnter = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const stableY = 32 + (y - 32) * 0.35;

    if (lensContentRef.current) {
      lensContentRef.current.style.width = `${rect.width}px`;
      lensContentRef.current.style.height = `${rect.height}px`;
    }

    mousePos.current = { x, y: stableY };
    isHovering.current = true;
    targetScale.current = 1;
    targetOpacity.current = 1;

    if (currentOpacity.current < 0.1) {
      currentPos.current = { x, y: stableY };
    }
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    targetScale.current = 0.7;
    targetOpacity.current = 0;
  };

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      {/* Outside click backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[-1] pointer-events-auto bg-black/[0.04] backdrop-blur-[2px]"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="w-full max-w-[840px] pointer-events-auto animate-fade-slide-down">
        {/* Floating Glassmorphic Pill Navbar */}
        <nav
          ref={navRef}
          aria-label="Main Navigation"
          onMouseMove={isPointerDevice ? handleMouseMove : undefined}
          onMouseEnter={isPointerDevice ? handleMouseEnter : undefined}
          onMouseLeave={isPointerDevice ? handleMouseLeave : undefined}
          style={{
            background: isScrolled
              ? "rgba(255, 255, 255, 0.68)"
              : "rgba(255, 255, 255, 0.56)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.65)",
            boxShadow: isScrolled
              ? "0 14px 36px -4px rgba(0, 0, 0, 0.07), 0 2px 6px 0 rgba(0, 0, 0, 0.03), inset 0 1px 1px 0 rgba(255, 255, 255, 0.95), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"
              : "0 10px 32px -4px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.02), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 0 0 1px rgba(0, 0, 0, 0.04)",
          }}
          className="relative flex items-center justify-between h-[60px] sm:h-[64px] px-5 sm:px-7 rounded-full transition-all duration-300 select-none overflow-hidden"
        >
          {/* BASE LAYER (Real interactive content) */}

          {/* Left: Brand Identity */}
          <a
            href="#"
            className="group flex items-center text-[17px] sm:text-[18px] font-semibold tracking-[-0.03em] text-neutral-900 transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm z-10"
          >
            <span>Agency</span>
            <span className="text-neutral-900 transition-colors duration-200 group-hover:text-neutral-400">.</span>
          </a>

          {/* Center: Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-7 lg:gap-8 list-none m-0 p-0 z-10">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-[13px] font-medium tracking-tight text-neutral-500 hover:text-neutral-950 transition-colors duration-200 ease-out inline-block focus-visible:outline-none focus-visible:text-neutral-950"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: Desktop CTA Button */}
          <div className="hidden md:flex items-center z-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-4.5 py-2 text-[13px] font-medium tracking-tight text-white transition-all duration-200 ease-out hover:bg-neutral-800 active:scale-[0.98] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 rounded-full text-neutral-900 hover:bg-black/[0.04] active:bg-black/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 z-10"
          >
            <span
              className={`w-4 h-[1.5px] bg-neutral-900 rounded-full transition-all duration-300 ease-out ${
                isMobileMenuOpen
                  ? "translate-y-[2px] rotate-45"
                  : "-translate-y-[2px]"
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-neutral-900 rounded-full transition-all duration-300 ease-out ${
                isMobileMenuOpen
                  ? "-translate-y-[0.5px] -rotate-45"
                  : "translate-y-[2px]"
              }`}
            />
          </button>

          {/* ============================================================ */}
          {/* GLASS MAGNIFYING LENS (Only active on pointer devices)       */}
          {/* ============================================================ */}
          {isPointerDevice && (
            <div
              ref={lensCircleRef}
              className="pointer-events-none absolute left-0 top-0 w-[54px] h-[54px] rounded-full overflow-hidden z-20 opacity-0"
              style={{
                willChange: "transform, opacity",
                background: "rgba(255, 255, 255, 0.72)",
                backdropFilter: "blur(12px) saturate(190%)",
                WebkitBackdropFilter: "blur(12px) saturate(190%)",
                border: "1px solid rgba(255, 255, 255, 0.85)",
                boxShadow:
                  "0 8px 24px -2px rgba(0, 0, 0, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.06), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.08)",
              }}
            >
              {/* Subtle glass reflection highlight curve */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/45 via-white/5 to-transparent z-30"
                aria-hidden="true"
              />

              {/* Cloned, optically magnified navbar layer */}
              <div
                ref={lensContentRef}
                className="pointer-events-none absolute left-0 top-0 select-none"
                style={{
                  willChange: "transform",
                }}
                aria-hidden="true"
              >
                <div className="relative flex items-center justify-between h-[60px] sm:h-[64px] px-5 sm:px-7 rounded-full w-full h-full">
                  {/* Magnified Brand */}
                  <div className="flex items-center text-[17px] sm:text-[18px] font-semibold tracking-[-0.03em] text-neutral-900">
                    <span>Agency</span>
                    <span className="text-neutral-900">.</span>
                  </div>

                  {/* Magnified Navigation Links */}
                  <ul className="hidden md:flex items-center gap-7 lg:gap-8 list-none m-0 p-0">
                    {navLinks.map((item) => (
                      <li key={item.name}>
                        <span className="text-[13px] font-medium tracking-tight text-neutral-950 inline-block">
                          {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Magnified CTA Button */}
                  <div className="hidden md:flex items-center">
                    <span className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-4.5 py-2 text-[13px] font-medium tracking-tight text-white shadow-sm">
                      Let's Talk
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile Dropdown Menu Card (Refined Frosted Glass) */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            boxShadow:
              "0 16px 36px -4px rgba(0, 0, 0, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 0 0 1px rgba(0, 0, 0, 0.04)",
          }}
          className={`md:hidden mt-2.5 overflow-hidden rounded-2xl transition-all duration-300 ease-out origin-top ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 max-h-96"
              : "opacity-0 -translate-y-2 max-h-0 pointer-events-none"
          }`}
        >
          <div className="p-4 flex flex-col gap-1">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-950 rounded-xl hover:bg-black/[0.03] transition-colors"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-2.5 mt-1 border-t border-black/[0.06]">
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-2.5 px-4 rounded-full bg-neutral-950 text-white text-sm font-medium tracking-tight hover:bg-neutral-800 transition-all active:scale-[0.98]"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

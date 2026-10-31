import React, { useEffect, useRef, useState } from "react";
import MarbleSprite from "./MarbleSprite";

const CAPABILITY_ROWS = [
  {
    num: "01",
    title: "DESIGN & EXPERIENCE",
    description: "Intuitive interfaces and meaningful product experiences.",
  },
  {
    num: "02",
    title: "ENGINEERING & INTEGRATION",
    description: "Scalable applications, robust systems and seamless integrations.",
  },
  {
    num: "03",
    title: "INTELLIGENCE & AUTOMATION",
    description: "AI, automation and connected systems that work smarter.",
  },
  {
    num: "04",
    title: "LAUNCH & EVOLUTION",
    description: "From testing and deployment to ongoing improvements.",
  },
];

export default function OneVisionSection() {
  const sectionRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeRow, setActiveRow] = useState(0);

  // Viewport entrance observation for smooth scale-and-opacity reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Our Approach — TAVQO Architecture"
      className="relative w-full min-h-[100vh] py-16 sm:py-20 lg:py-0 px-6 sm:px-10 lg:px-12 xl:px-16 bg-[#FAFAFC] text-[#09090D] overflow-hidden border-t border-black/[0.06] flex items-center justify-center"
    >
      {/* 1200-1300px Content Container: Strict Two-Column Desktop Layout */}
      <div className="max-w-[1280px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-10 lg:gap-14 xl:gap-16 py-12 lg:py-16">
        
        {/* LEFT COLUMN: All Content (Approx 52-54% width on desktop, strictly left-aligned) */}
        <div className="w-full md:w-[54%] lg:w-[52%] flex flex-col items-start text-left z-10 shrink-0">
          
          {/* Eyebrow */}
            

          {/* Headline */}
          <h2 className="font-sans font-black tracking-[-0.035em] text-3xl sm:text-4xl md:text-[38px] lg:text-[48px] xl:text-[54px] text-[#09090D] uppercase leading-[0.96] sm:leading-[0.93] m-0 p-0 text-left select-none max-w-xl">
            WE TURN<br />
            COMPLEX IDEAS INTO<br />
            <span className="text-[#6257F5]">DIGITAL EXPERIENCES.</span>
          </h2>

          {/* Supporting paragraph */}
          <p className="mt-4 sm:mt-5 font-sans text-[14.5px] sm:text-[15.5px] lg:text-[16px] text-[#666675] leading-[1.65] max-w-[520px] font-normal text-left">
            Design, engineering and intelligent technology — brought together to create products that move businesses forward.
          </p>

          {/* The Four Capability Rows */}
          <div className="mt-8 sm:mt-10 w-full border-t border-black/[0.08] flex flex-col">
            {CAPABILITY_ROWS.map((row, idx) => {
              const isSelected = activeRow === idx;

              return (
                <div
                  key={row.num}
                  onMouseEnter={() => setActiveRow(idx)}
                  className="group py-3.5 sm:py-4 border-b border-black/[0.08] transition-colors duration-200 cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex items-baseline gap-3 sm:gap-4 flex-1">
                    {/* Number */}
                    <span
                      className={`font-mono text-xs sm:text-[13px] font-bold tracking-wider shrink-0 transition-colors duration-200 ${
                        isSelected ? "text-[#6257F5]" : "text-[#888898] group-hover:text-[#6257F5]"
                      }`}
                    >
                      {row.num}
                    </span>

                    <span className="text-black/20 text-xs shrink-0">—</span>

                    {/* Title and Description */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2.5">
                      <h3
                        className={`font-sans font-bold text-sm sm:text-[14.5px] tracking-tight uppercase transition-colors duration-200 shrink-0 ${
                          isSelected ? "text-[#6257F5]" : "text-[#09090D] group-hover:text-[#6257F5]"
                        }`}
                      >
                        {row.title}
                      </h3>
                      <span className="font-sans text-xs sm:text-[12.5px] text-[#777681] leading-relaxed">
                        {row.description}
                      </span>
                    </div>
                  </div>

                  {/* Small directional arrow on the far right */}
                  <span
                    className={`text-sm sm:text-base font-light transition-all duration-200 shrink-0 transform ${
                      isSelected
                        ? "text-[#6257F5] translate-x-1"
                        : "text-black/30 group-hover:text-[#6257F5] group-hover:translate-x-1"
                    }`}
                  >
                    →
                  </span>
                </div>
              );
            })}
          </div>

          {/* Text link underneath */}
          <div className="mt-6 sm:mt-8">
            <a
              href="#what-we-build"
              className="group inline-flex items-center gap-2 font-sans text-sm sm:text-[14.5px] font-semibold text-[#09090D] hover:text-[#6257F5] transition-colors duration-200"
            >
              <span className="border-b border-[#09090D]/30 group-hover:border-[#6257F5] pb-0.5 transition-colors">
                Explore our capabilities
              </span>
              <span className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200 text-sm">
                ↗
              </span>
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN: 3D MarbleSprite Orb Component (Approx 45-48% width, centered) */}
        <div className="w-full md:w-[46%] lg:w-[45%] flex items-center justify-center shrink-0">
          <div
            className={`w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] aspect-square relative transition-all duration-1000 ease-out ${
              isRevealed ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6"
            }`}
          >
            <MarbleSprite
              spriteColor="#6257F5"
              background="#FAFAFC"
              scale={96}
              frost={4.8}
              follow="page"
              reach={8.5}
              lean={0}
              blink={10}
              float={10}
              advanced={{
                restX: 0,
                restY: 0,
                roll: 0,
                seamAngle: 90,
                seamTilt: 75,
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

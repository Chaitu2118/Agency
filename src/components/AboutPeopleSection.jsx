import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PEOPLE = [
  { id: 1, name: "Chaitanya" },
  { id: 2, name: "Sai" },
  { id: 3, name: "Shiva" },
  { id: 4, name: "Jyotsna" },
  { id: 5, name: "Pravallika" },
];

/**
 * AboutPeopleSection Component
 * Clean, premium editorial carousel inspired by the "Hear From Our Clients" layout.
 * Adapted for TAVQO:
 * 1. Warm off-white background with generous whitespace.
 * 2. Centered heading & supporting description.
 * 3. Large light-grey testimonial-style content panel displaying the five collaborator names one by one.
 * 4. General TAVQO statement below each name (no fake quotes or designations).
 * 5. Minimal previous/next arrow buttons and pagination dots with smooth transitions.
 * 6. Keyboard navigation (ArrowLeft / ArrowRight) and accessibility.
 * 7. Closing CTA: "Have an idea you'd like to bring to life?" linking to "/#contact".
 */
export default function AboutPeopleSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const carouselContainerRef = useRef(null);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? PEOPLE.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === PEOPLE.length - 1 ? 0 : prev + 1));
  }, []);

  const handleSelect = useCallback(
    (index) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Keyboard navigation support when focused
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!carouselContainerRef.current) return;
      if (carouselContainerRef.current.contains(document.activeElement)) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  const currentPerson = PEOPLE[currentIndex];

  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 32 : -32,
      scale: 0.98,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -32 : 32,
      scale: 0.98,
      transition: {
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      aria-label="The People Around TAVQO"
      className="relative w-full py-24 sm:py-32 lg:py-36 px-6 sm:px-10 lg:px-12 select-none"
      style={{
        backgroundColor: "#FAF8F5",
        color: "#141416",
      }}
    >
      <div className="max-w-[1240px] mx-auto flex flex-col items-center">
        {/* ========================================================= */}
        {/* 1. SECTION HEADER (CENTERED)                              */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          {/* Small Section Label */}
          <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.24em] uppercase text-[#70707C] font-semibold block mb-4">
            COMMUNITY & COLLABORATION
          </span>

          {/* Main Heading */}
          <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-[38px] uppercase tracking-[-0.025em] text-[#141416] leading-[1.15] mb-5">
            THE PEOPLE AROUND TAVQO.
          </h2>

          {/* Supporting Text */}
          <p className="font-sans text-[15px] sm:text-[16px] lg:text-[17px] text-[#4A4A52] font-normal leading-[1.7] max-w-2xl mx-auto">
            Every meaningful idea grows through conversations, collaboration and shared perspectives. The people around us are part of the journey.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. LARGE LIGHT-GREY TESTIMONIAL-STYLE CONTENT PANEL        */}
        {/* ========================================================= */}
        <div
          ref={carouselContainerRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="The People Around TAVQO carousel"
          aria-live="polite"
          className="relative w-full max-w-[940px] bg-[#EBE8E1] border border-black/[0.06] rounded-2xl sm:rounded-3xl p-8 sm:p-14 lg:p-16 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.08)] outline-none focus-visible:ring-2 focus-visible:ring-[#141416]/30 transition-shadow"
        >
          {/* Subtle Top Metadata Bar inside Panel */}
          <div className="flex items-center justify-between border-b border-black/[0.08] pb-5 mb-8 sm:mb-10 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#787882]">
            <span>TAVQO PERSPECTIVE</span>
            <span>
              0{currentPerson.id} / 0{PEOPLE.length}
            </span>
          </div>

          {/* Dynamic Content Container with Fixed Height to Prevent Layout Shift */}
          <div className="relative min-h-[170px] sm:min-h-[190px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPerson.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center text-center w-full"
              >
                {/* Person's Name */}
                <h3 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[46px] text-[#141416] tracking-[-0.03em] uppercase leading-tight">
                  {currentPerson.name}
                </h3>

                {/* Subtle Decorative Rule */}
                <div className="w-10 h-[1.5px] bg-black/15 my-5 sm:my-6 rounded-full" />

                {/* Neutral TAVQO Statement (General statement, not a quote attributed to the person) */}
                <p className="font-sans text-[15px] sm:text-[17px] lg:text-[18px] text-[#3D3D45] font-normal leading-relaxed max-w-xl">
                  Good ideas grow through collaboration, conversations and different perspectives.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ========================================================= */}
          {/* 3. MINIMAL ARROWS & PAGINATION CONTROLS                   */}
          {/* ========================================================= */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-black/[0.08] flex items-center justify-between">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous person"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/15 bg-white/40 hover:bg-white text-[#141416] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer hover:shadow-xs"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#141416]" />
            </button>

            {/* Pagination Dots */}
            <div
              className="flex items-center gap-2 sm:gap-2.5"
              role="tablist"
              aria-label="Carousel pagination"
            >
              {PEOPLE.map((person, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={person.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${idx + 1}: ${person.name}`}
                    onClick={() => handleSelect(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "w-7 sm:w-8 bg-[#141416]"
                        : "w-2 bg-black/20 hover:bg-black/45"
                    }`}
                  />
                );
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next person"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/15 bg-white/40 hover:bg-white text-[#141416] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer hover:shadow-xs"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#141416]" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. CLOSING CTA UNDERNEATH                                 */}
        {/* ========================================================= */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center flex flex-col items-center">
          {/* Closing Headline */}
          <h3 className="font-sans font-bold text-xl sm:text-2xl lg:text-[28px] text-[#141416] tracking-[-0.02em] leading-snug">
            Have an idea you'd like to bring to life?
          </h3>

          {/* Supporting Text */}
          <p className="font-sans text-[14px] sm:text-[15.5px] text-[#555560] font-normal mt-2 sm:mt-2.5 mb-7 sm:mb-8 max-w-lg">
            Let's start a conversation and explore what's possible.
          </p>

          {/* Primary CTA Button */}
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#141416] text-[#FAF8F5] hover:bg-[#2B2B32] active:scale-[0.98] font-sans text-xs sm:text-[13px] font-semibold tracking-wider uppercase transition-all duration-200 group shadow-sm cursor-pointer"
          >
            <span>LET'S TALK</span>
            <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}


import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// User-provided 71Three exact image assets
import goodFit1 from "../../assets/good-fit-1.jpg";
import goodFit2 from "../../assets/good-fit-2.jpg";
import goodFit3 from "../../assets/good-fit-3.jpg";

gsap.registerPlugin(ScrollTrigger);

const fitCards = [
  {
    id: "card-1",
    image: goodFit1,
    imageAlt: "Fashion storefront window display with mannequins and passerby",
    imagePosition: "center center",
    statement: "You care how your business is perceived.",
    supporting:
      "We create thoughtful digital experiences that communicate your value, build trust, and make a lasting first impression.",
  },
  {
    id: "card-2",
    image: goodFit2,
    imageAlt: "Architectural concrete interior with dramatic angled light ray",
    imagePosition: "center center",
    statement: "You choose clarity and credibility over trends.",
    supporting:
      "Every design decision and technical choice has a purpose—from intuitive UX/UI to reliable software architecture and scalable integrations.",
  },
  {
    id: "card-3",
    image: goodFit3,
    imageAlt: "Low-angle perspective of modern blue glass skyscrapers reaching upwards",
    imagePosition: "center center",
    statement: "You see technology as a business asset.",
    supporting:
      "Whether it's a website, mobile application, AI-powered workflow, or connected IoT solution, you want technology that solves real problems and grows with your business.",
  },
];

export default function GoodFit() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // Reusable factory for the scroll-driven stacking card choreography
    const createScrollDeckTimeline = ({ endDistance, peekY1, peekY2, scrubSpeed }) => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          y: 0,
          scale: 1,
          opacity: 1,
        });
        return;
      }

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${endDistance}`,
          pin: true,
          scrub: scrubSpeed,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // INITIAL STAGING:
      // All 3 cards start completely below the viewport
      gsap.set(card1Ref.current, {
        y: "115vh",
        scale: 1,
        opacity: 1,
        zIndex: 10,
        transformOrigin: "center top",
      });
      gsap.set(card2Ref.current, {
        y: "115vh",
        scale: 1,
        opacity: 1,
        zIndex: 20,
        transformOrigin: "center top",
      });
      gsap.set(card3Ref.current, {
        y: "115vh",
        scale: 1,
        opacity: 1,
        zIndex: 30,
        transformOrigin: "center top",
      });

      // STAGE 0: Initial rest hold on the heading alone (0.00 -> 0.08)
      masterTl.to({}, { duration: 0.08 }, 0);

      // STAGE 1: Card 1 glides up smoothly into center (0.08 -> 0.32)
      masterTl.to(
        card1Ref.current,
        {
          y: 0,
          ease: "power2.out",
          duration: 0.24,
        },
        0.08
      );

      // STAGE 2: Rest hold on Card 1 for comfortable reading (0.32 -> 0.42)
      masterTl.to({}, { duration: 0.10 }, 0.32);

      // STAGE 3: Card 2 glides up to foreground, Card 1 peeks top (0.42 -> 0.66)
      masterTl.to(
        card2Ref.current,
        {
          y: 0,
          ease: "power2.out",
          duration: 0.24,
        },
        0.42
      );

      masterTl.to(
        card1Ref.current,
        {
          scale: 0.94,
          y: peekY1,
          filter: "brightness(0.75)",
          ease: "power2.out",
          duration: 0.24,
        },
        0.42
      );

      // STAGE 4: Rest hold on Card 2 for comfortable reading (0.66 -> 0.74)
      masterTl.to({}, { duration: 0.08 }, 0.66);

      // STAGE 5: Card 3 glides up to foreground, Cards 2 & 1 peek top in physical deck (0.74 -> 0.94)
      masterTl.to(
        card3Ref.current,
        {
          y: 0,
          ease: "power2.out",
          duration: 0.20,
        },
        0.74
      );

      masterTl.to(
        card2Ref.current,
        {
          scale: 0.94,
          y: peekY1,
          filter: "brightness(0.75)",
          ease: "power2.out",
          duration: 0.20,
        },
        0.74
      );

      masterTl.to(
        card1Ref.current,
        {
          scale: 0.88,
          y: peekY2,
          filter: "brightness(0.55)",
          ease: "power2.out",
          duration: 0.20,
        },
        0.74
      );

      // STAGE 6: Smooth final hold on 3-card stack before unpinning (0.94 -> 1.00)
      masterTl.to({}, { duration: 0.06 }, 0.94);
    };

    // Desktop (>= 1024px): Full desktop travel and depth
    mm.add("(min-width: 1024px)", () => {
      createScrollDeckTimeline({
        endDistance: 2400,
        peekY1: -34,
        peekY2: -62,
        scrubSpeed: 1.1,
      });
    });

    // Tablet (768px - 1023px): Smooth tablet scroll travel
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      createScrollDeckTimeline({
        endDistance: 1900,
        peekY1: -30,
        peekY2: -54,
        scrubSpeed: 1.0,
      });
    });

    // Mobile (< 768px): Calibrated scroll-driven tactile card stack for phones
    mm.add("(max-width: 767px)", () => {
      createScrollDeckTimeline({
        endDistance: 1100,
        peekY1: -20,
        peekY2: -38,
        scrubSpeed: 0.85,
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="good-fit"
      ref={sectionRef}
      className="relative w-full h-[100dvh] min-h-[520px] overflow-hidden bg-[#FAF9F6] text-[#0A0A0C] select-text border-t border-[#0A0A0C]/10 flex items-center justify-center"
      style={{
        backgroundColor: "#FAF9F6", // Clean light neutral canvas matching 71Three
      }}
    >
      <div id="process" className="absolute -top-24 pointer-events-none" />
      
      {/* Subtle Warm Canvas Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 select-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, #FFFFFF 0%, #FAF9F6 65%, #F0EAE1 100%)",
        }}
      />

      {/* =================================================================== */}
      {/* 1. OVERSIZED CENTERED HEADING (EXACTLY AS IN 71THREE)               */}
      {/* Centered in the screen; the cards stack directly in front of it!     */}
      {/* =================================================================== */}
      <div
        ref={headingRef}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none px-4 sm:px-6"
      >
        <h2 className="font-sans text-[34px] xs:text-[44px] sm:text-[68px] md:text-[88px] lg:text-[104px] xl:text-[116px] font-medium tracking-[-0.035em] text-[#0A0A0C] leading-[1.08] sm:leading-none sm:whitespace-nowrap text-center max-w-[94vw]">
          We're a good fit if…
        </h2>
      </div>

      {/* =================================================================== */}
      {/* 2. CENTERED STACKING CARDS STAGE (MOBILE, TABLET & DESKTOP)         */}
      {/* Scroll-driven physical card deck advancing into foreground          */}
      {/* =================================================================== */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-3 sm:px-4">
        <div className="relative w-[min(330px,calc(100vw-2rem))] xs:w-[350px] sm:w-[400px] md:w-[440px] lg:w-[460px] h-[400px] xs:h-[430px] sm:h-[500px] md:h-[550px] lg:h-[560px] pointer-events-auto">
          
          {/* --------------------------------------------------------------- */}
          {/* CARD 1: "You care how your business is perceived."              */}
          {/* --------------------------------------------------------------- */}
          <div
            ref={card1Ref}
            className="absolute inset-0 w-full h-full rounded-[24px] xs:rounded-[28px] sm:rounded-[38px] md:rounded-[40px] bg-[#000000] text-white p-2.5 xs:p-3 sm:p-4 flex flex-col justify-between border border-white/[0.14] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.65),0_0_1px_1px_rgba(255,255,255,0.12)] will-change-transform origin-top"
          >
            {/* Top Cropped Editorial Image */}
            <div className="w-full h-[170px] xs:h-[190px] sm:h-[250px] md:h-[290px] lg:h-[300px] rounded-[18px] xs:rounded-[20px] sm:rounded-[26px] overflow-hidden bg-black/50 border border-white/10 shrink-0">
              <img
                src={fitCards[0].image}
                alt={fitCards[0].imageAlt}
                className="w-full h-full object-cover"
                style={{ objectPosition: fitCards[0].imagePosition }}
              />
            </div>

            {/* Bottom Statement & Supporting Copy */}
            <div className="px-2 xs:px-3 sm:px-4 pt-1.5 xs:pt-2 pb-2 xs:pb-3 sm:pb-5 flex-1 flex flex-col items-center justify-center text-center my-auto">
              <h3 className="font-sans text-[15px] xs:text-[17px] sm:text-[22px] md:text-[24px] lg:text-[25px] font-medium text-white tracking-[-0.02em] leading-[1.25] text-center max-w-[340px]">
                {fitCards[0].statement}
              </h3>
              <p className="font-sans text-[11px] xs:text-[12px] sm:text-[13px] text-[#A2A1AC] font-light leading-[1.45] mt-1 xs:mt-1.5 text-center max-w-[340px]">
                {fitCards[0].supporting}
              </p>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* CARD 2: "You choose clarity and credibility over trends."       */}
          {/* --------------------------------------------------------------- */}
          <div
            ref={card2Ref}
            className="absolute inset-0 w-full h-full rounded-[24px] xs:rounded-[28px] sm:rounded-[38px] md:rounded-[40px] bg-[#000000] text-white p-2.5 xs:p-3 sm:p-4 flex flex-col justify-between border border-white/[0.14] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.65),0_0_1px_1px_rgba(255,255,255,0.12)] will-change-transform origin-top"
          >
            {/* Top Cropped Editorial Image */}
            <div className="w-full h-[170px] xs:h-[190px] sm:h-[250px] md:h-[290px] lg:h-[300px] rounded-[18px] xs:rounded-[20px] sm:rounded-[26px] overflow-hidden bg-black/50 border border-white/10 shrink-0">
              <img
                src={fitCards[1].image}
                alt={fitCards[1].imageAlt}
                className="w-full h-full object-cover"
                style={{ objectPosition: fitCards[1].imagePosition }}
              />
            </div>

            {/* Bottom Statement & Supporting Copy */}
            <div className="px-2 xs:px-3 sm:px-4 pt-1.5 xs:pt-2 pb-2 xs:pb-3 sm:pb-5 flex-1 flex flex-col items-center justify-center text-center my-auto">
              <h3 className="font-sans text-[15px] xs:text-[17px] sm:text-[22px] md:text-[24px] lg:text-[25px] font-medium text-white tracking-[-0.02em] leading-[1.25] text-center max-w-[340px]">
                {fitCards[1].statement}
              </h3>
              <p className="font-sans text-[11px] xs:text-[12px] sm:text-[13px] text-[#A2A1AC] font-light leading-[1.45] mt-1 xs:mt-1.5 text-center max-w-[340px]">
                {fitCards[1].supporting}
              </p>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* CARD 3: "You see technology as a business asset."               */}
          {/* --------------------------------------------------------------- */}
          <div
            ref={card3Ref}
            className="absolute inset-0 w-full h-full rounded-[24px] xs:rounded-[28px] sm:rounded-[38px] md:rounded-[40px] bg-[#000000] text-white p-2.5 xs:p-3 sm:p-4 flex flex-col justify-between border border-white/[0.14] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.65),0_0_1px_1px_rgba(255,255,255,0.12)] will-change-transform origin-top"
          >
            {/* Top Cropped Editorial Image */}
            <div className="w-full h-[170px] xs:h-[190px] sm:h-[250px] md:h-[290px] lg:h-[300px] rounded-[18px] xs:rounded-[20px] sm:rounded-[26px] overflow-hidden bg-black/50 border border-white/10 shrink-0">
              <img
                src={fitCards[2].image}
                alt={fitCards[2].imageAlt}
                className="w-full h-full object-cover"
                style={{ objectPosition: fitCards[2].imagePosition }}
              />
            </div>

            {/* Bottom Statement & Supporting Copy */}
            <div className="px-2 xs:px-3 sm:px-4 pt-1.5 xs:pt-2 pb-2 xs:pb-3 sm:pb-5 flex-1 flex flex-col items-center justify-center text-center my-auto">
              <h3 className="font-sans text-[15px] xs:text-[17px] sm:text-[22px] md:text-[24px] lg:text-[25px] font-medium text-white tracking-[-0.02em] leading-[1.25] text-center max-w-[340px]">
                {fitCards[2].statement}
              </h3>
              <p className="font-sans text-[11px] xs:text-[12px] sm:text-[13px] text-[#A2A1AC] font-light leading-[1.45] mt-1 xs:mt-1.5 text-center max-w-[340px]">
                {fitCards[2].supporting}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

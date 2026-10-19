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

    // ------------------------------------------------------------------------
    // DESKTOP & TABLET (>= 768px):
    // 71Three Exact Recreated Interaction:
    // 1. Heading is centered alone in the viewport (Screenshot 1).
    // 2. Card 1 glides up smoothly from the bottom to center (Screenshot 2).
    // 3. Card 2 glides up smoothly from bottom to foreground, Card 1 peeks top (Screenshot 3).
    // 4. Card 3 glides up smoothly from bottom to foreground, Card 1 & 2 peek top (Screenshot 4).
    // ------------------------------------------------------------------------
    mm.add("(min-width: 768px)", () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2600",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // INITIAL STAGING:
      // Heading is centered in the screen.
      // All 3 cards start completely below the viewport!
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
      // Matches Screenshot 1: Heading centered with nothing else on screen!
      masterTl.to({}, { duration: 0.08 }, 0);

      // STAGE 1: Card 1 glides up smoothly from the bottom into the exact center (0.08 -> 0.32)
      // Matches Screenshot 2: Card 1 covers the center of the heading!
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

      // STAGE 3: Card 2 glides up smoothly from bottom into foreground (0.42 -> 0.66)
      // Matches Screenshot 3: Card 2 lands on top, Card 1 peeks cleanly above!
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
          y: -34,
          filter: "brightness(0.75)",
          ease: "power2.out",
          duration: 0.24,
        },
        0.42
      );

      // STAGE 4: Rest hold on Card 2 for comfortable reading (0.66 -> 0.74)
      masterTl.to({}, { duration: 0.08 }, 0.66);

      // STAGE 5: Card 3 glides up smoothly from bottom into foreground (0.74 -> 0.94)
      // Matches Screenshot 4: Card 3 lands on top, Card 2 & Card 1 peek above in physical deck!
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
          y: -34,
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
          y: -62,
          filter: "brightness(0.55)",
          ease: "power2.out",
          duration: 0.20,
        },
        0.74
      );

      // STAGE 6: Smooth final hold on 3-card stack before unpinning (0.94 -> 1.00)
      masterTl.to({}, { duration: 0.06 }, 0.94);
    });

    // ------------------------------------------------------------------------
    // MOBILE (< 768px):
    // Responsive card stack layout
    // ------------------------------------------------------------------------
    mm.add("(max-width: 767px)", () => {
      // Clean mobile presentation
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="good-fit"
      ref={sectionRef}
      className="relative w-full h-screen min-h-screen bg-[#FAF9F6] text-[#0A0A0C] overflow-hidden select-text border-t border-[#0A0A0C]/10"
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
      {/* 1. OVERSIZED CENTERED HEADING (EXACTLY AS IN SCREENSHOT 1)          */}
      {/* Centered in the screen; the cards stack directly in front of it!     */}
      {/* =================================================================== */}
      <div
        ref={headingRef}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none px-6"
      >
        <h2 className="font-sans text-[48px] sm:text-[72px] md:text-[92px] lg:text-[108px] xl:text-[116px] font-medium tracking-[-0.035em] text-[#0A0A0C] leading-none whitespace-nowrap text-center">
          We're a good fit if…
        </h2>
      </div>

      {/* =================================================================== */}
      {/* 2. CENTERED STACKING CARDS STAGE (DESKTOP & TABLET >= 768px)        */}
      {/* Compact portrait cards advancing from the bottom into the foreground */}
      {/* =================================================================== */}
      <div className="hidden md:flex absolute inset-0 z-10 items-center justify-center pointer-events-none">
        <div className="relative w-[390px] sm:w-[420px] md:w-[440px] lg:w-[460px] h-[520px] sm:h-[540px] md:h-[560px] pointer-events-auto">
          
          {/* --------------------------------------------------------------- */}
          {/* CARD 1: "You care how your business is perceived."              */}
          {/* --------------------------------------------------------------- */}
          <div
            ref={card1Ref}
            className="absolute inset-0 w-full h-full rounded-[36px] sm:rounded-[40px] bg-[#000000] text-white p-3.5 sm:p-4 flex flex-col justify-between border border-white/[0.14] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.65),0_0_1px_1px_rgba(255,255,255,0.12)] will-change-transform origin-top"
          >
            {/* Top Cropped Editorial Image */}
            <div className="w-full h-[265px] sm:h-[285px] md:h-[300px] rounded-[24px] sm:rounded-[26px] overflow-hidden bg-black/50 border border-white/10 shrink-0">
              <img
                src={fitCards[0].image}
                alt={fitCards[0].imageAlt}
                className="w-full h-full object-cover"
                style={{ objectPosition: fitCards[0].imagePosition }}
              />
            </div>

            {/* Bottom Statement & Supporting Copy */}
            <div className="px-3 sm:px-4 pt-2.5 pb-4 sm:pb-5 flex-1 flex flex-col items-center justify-center text-center my-auto">
              <h3 className="font-sans text-[21px] sm:text-[23px] md:text-[25px] font-medium text-white tracking-[-0.02em] leading-[1.28] text-center max-w-[340px]">
                {fitCards[0].statement}
              </h3>
              <p className="font-sans text-[12.5px] sm:text-[13px] text-[#A2A1AC] font-light leading-[1.5] mt-2 text-center max-w-[340px]">
                {fitCards[0].supporting}
              </p>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* CARD 2: "You choose clarity and credibility over trends."       */}
          {/* --------------------------------------------------------------- */}
          <div
            ref={card2Ref}
            className="absolute inset-0 w-full h-full rounded-[36px] sm:rounded-[40px] bg-[#000000] text-white p-3.5 sm:p-4 flex flex-col justify-between border border-white/[0.14] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.65),0_0_1px_1px_rgba(255,255,255,0.12)] will-change-transform origin-top"
          >
            {/* Top Cropped Editorial Image */}
            <div className="w-full h-[265px] sm:h-[285px] md:h-[300px] rounded-[24px] sm:rounded-[26px] overflow-hidden bg-black/50 border border-white/10 shrink-0">
              <img
                src={fitCards[1].image}
                alt={fitCards[1].imageAlt}
                className="w-full h-full object-cover"
                style={{ objectPosition: fitCards[1].imagePosition }}
              />
            </div>

            {/* Bottom Statement & Supporting Copy */}
            <div className="px-3 sm:px-4 pt-2.5 pb-4 sm:pb-5 flex-1 flex flex-col items-center justify-center text-center my-auto">
              <h3 className="font-sans text-[21px] sm:text-[23px] md:text-[25px] font-medium text-white tracking-[-0.02em] leading-[1.28] text-center max-w-[340px]">
                {fitCards[1].statement}
              </h3>
              <p className="font-sans text-[12.5px] sm:text-[13px] text-[#A2A1AC] font-light leading-[1.5] mt-2 text-center max-w-[340px]">
                {fitCards[1].supporting}
              </p>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* CARD 3: "You see technology as a business asset."               */}
          {/* --------------------------------------------------------------- */}
          <div
            ref={card3Ref}
            className="absolute inset-0 w-full h-full rounded-[36px] sm:rounded-[40px] bg-[#000000] text-white p-3.5 sm:p-4 flex flex-col justify-between border border-white/[0.14] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.65),0_0_1px_1px_rgba(255,255,255,0.12)] will-change-transform origin-top"
          >
            {/* Top Cropped Editorial Image */}
            <div className="w-full h-[265px] sm:h-[285px] md:h-[300px] rounded-[24px] sm:rounded-[26px] overflow-hidden bg-black/50 border border-white/10 shrink-0">
              <img
                src={fitCards[2].image}
                alt={fitCards[2].imageAlt}
                className="w-full h-full object-cover"
                style={{ objectPosition: fitCards[2].imagePosition }}
              />
            </div>

            {/* Bottom Statement & Supporting Copy */}
            <div className="px-3 sm:px-4 pt-2.5 pb-4 sm:pb-5 flex-1 flex flex-col items-center justify-center text-center my-auto">
              <h3 className="font-sans text-[21px] sm:text-[23px] md:text-[25px] font-medium text-white tracking-[-0.02em] leading-[1.28] text-center max-w-[340px]">
                {fitCards[2].statement}
              </h3>
              <p className="font-sans text-[12.5px] sm:text-[13px] text-[#A2A1AC] font-light leading-[1.5] mt-2 text-center max-w-[340px]">
                {fitCards[2].supporting}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. MOBILE FALLBACK (< 768px): Vertical flowing stack                */}
      {/* =================================================================== */}
      <div className="md:hidden relative z-10 w-full px-5 py-16 flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="font-sans text-[34px] font-medium tracking-tight text-[#0A0A0C]">
            We're a good fit if…
          </h2>
        </div>

        <div className="w-full max-w-[360px] space-y-6">
          {fitCards.map((card) => (
            <div
              key={card.id}
              className="w-full rounded-[32px] bg-[#000000] text-white p-3.5 border border-white/[0.12] shadow-xl flex flex-col"
            >
              <div className="w-full aspect-[4/3] rounded-[22px] overflow-hidden bg-black/50 border border-white/10 mb-3">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: card.imagePosition }}
                />
              </div>
              <div className="px-2 pb-3 text-center">
                <h3 className="font-sans text-[19px] font-medium text-white tracking-tight leading-snug">
                  {card.statement}
                </h3>
                <p className="font-sans text-[12.5px] text-[#A2A1AC] font-light leading-relaxed mt-1.5 max-w-[300px] mx-auto">
                  {card.supporting}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


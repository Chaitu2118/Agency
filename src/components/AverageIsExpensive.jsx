import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ============================================================================
// EDITORIAL ASSETS (PAIRED SYMMETRICALLY ON LEFT AND RIGHT)
// ============================================================================
import goldenDunes from "../../assets/Golden Dunes of Light and Shadow.png";
import geometricPlaza from "../../assets/Geometric Plaza Shadows and Suited Figures.png";
import blueResinHand from "../../assets/Glossy Blue Resin on Black Hand.png";

import iridescentFace from "../../assets/Iridescent Chrome Face in Profile.png";
import swirlingInk from "../../assets/Swirling Amber and Teal Ink Clouds.png";
import marbleExplosion from "../../assets/soraya-silvestri-LmC65WoT3Rk-unsplash.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function AverageIsExpensive() {
  const sectionRef = useRef(null);
  const washRef = useRef(null);
  const textContainerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);

  // Left column card refs (aligned in order: Top, Middle, Bottom)
  const leftCard1Ref = useRef(null);
  const leftCard2Ref = useRef(null);
  const leftCard3Ref = useRef(null);

  // Right column card refs (aligned in order: Top, Middle, Bottom)
  const rightCard1Ref = useRef(null);
  const rightCard2Ref = useRef(null);
  const rightCard3Ref = useRef(null);

  const orbitsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // ------------------------------------------------------------------------
    // DESKTOP & TABLET (>= 768px):
    // 1. Initial State: Only text visible, all images staged below viewport
    // 2. Phase 1 (Scroll): Images rise slowly from bottom to top into symmetrical framing
    // 3. Phase 2 (Hold): Stable presentation for reading
    // 4. Phase 3 (Exit): ALL images exit upwards at once, canvas fades to black,
    //    and "Before we think" directly rises into view with ZERO white gap.
    // ------------------------------------------------------------------------
    mm.add("(min-width: 768px)", () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        gsap.set(
          [
            leftCard1Ref.current,
            leftCard2Ref.current,
            leftCard3Ref.current,
            rightCard1Ref.current,
            rightCard2Ref.current,
            rightCard3Ref.current,
          ],
          { opacity: 1, y: 0, x: 0 }
        );
        gsap.set(textContainerRef.current, { opacity: 1, y: 0 });
        return;
      }

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2200",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. INITIAL STAGING: FIRST ONLY TEXT
      // All cards staged below the bottom edge of the viewport
      gsap.set([leftCard3Ref.current, rightCard3Ref.current], {
        y: "50vh",
        x: (i) => (i === 0 ? -25 : 25),
        opacity: 0,
        rotateY: (i) => (i === 0 ? 6 : -6),
        transformPerspective: 1000,
        transformOrigin: "center center",
      });

      gsap.set([leftCard2Ref.current, rightCard2Ref.current], {
        y: "80vh",
        x: (i) => (i === 0 ? -30 : 30),
        opacity: 0,
        rotateY: (i) => (i === 0 ? 6 : -6),
        transformPerspective: 1000,
        transformOrigin: "center center",
      });

      gsap.set([leftCard1Ref.current, rightCard1Ref.current], {
        y: "115vh",
        x: (i) => (i === 0 ? -35 : 35),
        opacity: 0,
        rotateY: (i) => (i === 0 ? 6 : -6),
        transformPerspective: 1000,
        transformOrigin: "center center",
      });

      gsap.set(textContainerRef.current, { y: 0, opacity: 1 });
      gsap.set(orbitsRef.current, { opacity: 0.35, scale: 0.98 });
      gsap.set(washRef.current, { opacity: 0.8 });
      gsap.set(section, { backgroundColor: "#FAF9F6" });

      // PHASE 1: Pure Text Hold (Only centered editorial copy is visible at first)
      masterTl.to({}, { duration: 0.10 }, 0);

      // PHASE 2: Slowly the images come on scroll from bottom to top
      // Bottom pair (Card 3: Blue Resin Hand & Fluid Marble) enters first from bottom
      masterTl.to(
        [leftCard3Ref.current, rightCard3Ref.current],
        {
          y: 0,
          x: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 0.22,
        },
        0.10
      );

      // Middle pair (Card 2: Geometric Plaza & Swirling Ink) rises next
      masterTl.to(
        [leftCard2Ref.current, rightCard2Ref.current],
        {
          y: 0,
          x: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 0.22,
        },
        0.16
      );

      // Top pair (Card 1: Golden Dunes & Chrome Face) arrives into top slot
      masterTl.to(
        [leftCard1Ref.current, rightCard1Ref.current],
        {
          y: 0,
          x: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 0.22,
        },
        0.22
      );

      // Orbits guide softly illuminates to full clarity
      masterTl.to(
        orbitsRef.current,
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          duration: 0.34,
        },
        0.10
      );

      // PHASE 3: Reading Hold — symmetrical framing fully locked
      masterTl.to({}, { duration: 0.20 }, 0.44);

      // PHASE 4: Scrolling Exit — ALL images exit screen upwards at once,
      // canvas transitions smoothly to deep black, directly welcoming "Before we think"
      const allCards = [
        leftCard1Ref.current,
        leftCard2Ref.current,
        leftCard3Ref.current,
        rightCard1Ref.current,
        rightCard2Ref.current,
        rightCard3Ref.current,
      ];

      masterTl.to(
        allCards,
        {
          y: "-120vh",
          opacity: 0,
          ease: "power2.in",
          duration: 0.34,
          stagger: 0, // CRITICAL: All exit screen at once!
        },
        0.64
      );

      // Synchronized text and orbit release
      masterTl.to(
        textContainerRef.current,
        {
          y: -70,
          opacity: 0,
          ease: "power2.in",
          duration: 0.28,
        },
        0.64
      );

      masterTl.to(
        orbitsRef.current,
        {
          opacity: 0,
          scale: 0.95,
          ease: "power2.in",
          duration: 0.22,
        },
        0.64
      );

      // Completely eliminate white screen: wash fades out and canvas transitions to #000000
      masterTl.to(
        washRef.current,
        {
          opacity: 0,
          ease: "power1.inOut",
          duration: 0.28,
        },
        0.64
      );

      masterTl.to(
        section,
        {
          backgroundColor: "#000000",
          ease: "power1.inOut",
          duration: 0.32,
        },
        0.64
      );
    });

    // ------------------------------------------------------------------------
    // MOBILE (< 768px):
    // Smooth responsive bottom-to-top rise and synchronized direct exit to next section
    // ------------------------------------------------------------------------
    mm.add("(max-width: 767px)", () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        gsap.set(
          [
            leftCard1Ref.current,
            leftCard2Ref.current,
            leftCard3Ref.current,
            rightCard1Ref.current,
            rightCard2Ref.current,
            rightCard3Ref.current,
          ],
          { opacity: 1, y: 0, x: 0 }
        );
        gsap.set(textContainerRef.current, { opacity: 1, y: 0 });
        return;
      }

      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial Mobile Staging
      gsap.set([leftCard3Ref.current, rightCard3Ref.current], {
        y: "40vh",
        opacity: 0,
        rotateY: (i) => (i === 0 ? 5 : -5),
        transformPerspective: 800,
        transformOrigin: "center center",
      });

      gsap.set([leftCard2Ref.current, rightCard2Ref.current], {
        y: "70vh",
        opacity: 0,
        rotateY: (i) => (i === 0 ? 5 : -5),
        transformPerspective: 800,
        transformOrigin: "center center",
      });

      gsap.set([leftCard1Ref.current, rightCard1Ref.current], {
        y: "105vh",
        opacity: 0,
        rotateY: (i) => (i === 0 ? 5 : -5),
        transformPerspective: 800,
        transformOrigin: "center center",
      });

      gsap.set(textContainerRef.current, { y: 0, opacity: 1 });
      gsap.set(orbitsRef.current, { opacity: 0.25 });
      gsap.set(washRef.current, { opacity: 0.8 });
      gsap.set(section, { backgroundColor: "#FAF9F6" });

      // Mobile Phase 1: Text hold
      mobileTl.to({}, { duration: 0.08 }, 0);

      // Mobile Phase 2: Bottom to top rise
      mobileTl.to(
        [leftCard3Ref.current, rightCard3Ref.current],
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.22 },
        0.08
      );

      mobileTl.to(
        [leftCard2Ref.current, rightCard2Ref.current],
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.22 },
        0.15
      );

      mobileTl.to(
        [leftCard1Ref.current, rightCard1Ref.current],
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.22 },
        0.22
      );

      mobileTl.to(orbitsRef.current, { opacity: 0.8, duration: 0.36 }, 0.08);

      // Mobile Phase 3: Hold
      mobileTl.to({}, { duration: 0.20 }, 0.44);

      // Mobile Phase 4: All exit at once & canvas transitions to black
      const allCards = [
        leftCard1Ref.current,
        leftCard2Ref.current,
        leftCard3Ref.current,
        rightCard1Ref.current,
        rightCard2Ref.current,
        rightCard3Ref.current,
      ];

      mobileTl.to(
        allCards,
        {
          y: "-110vh",
          opacity: 0,
          ease: "power2.in",
          duration: 0.34,
          stagger: 0,
        },
        0.64
      );

      mobileTl.to(
        textContainerRef.current,
        {
          y: -50,
          opacity: 0,
          ease: "power2.in",
          duration: 0.26,
        },
        0.64
      );

      mobileTl.to(orbitsRef.current, { opacity: 0, duration: 0.20 }, 0.64);
      mobileTl.to(washRef.current, { opacity: 0, duration: 0.26 }, 0.64);
      mobileTl.to(section, { backgroundColor: "#000000", duration: 0.30 }, 0.64);
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="average-is-expensive"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden select-text"
      style={{
        backgroundColor: "#FAF9F6", // Warm Ivory clean editorial canvas
        color: "#0E0F14",
      }}
    >
      <div id="why-tavqo" className="absolute -top-24 pointer-events-none" />
      <div id="about" className="absolute -top-24 pointer-events-none" />
      {/* Subtle Warm Editorial Gradient Wash */}
      <div
        ref={washRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, #FFFFFF 0%, #FAF9F6 55%, #F2EEE5 100%)",
        }}
      />

      {/* Subtle Central Orbital Graphic (clean, no text, no crosshairs) */}
      <div
        ref={orbitsRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] select-none will-change-transform"
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <ellipse
            cx="720"
            cy="450"
            rx="560"
            ry="380"
            fill="none"
            stroke="#0E0F14"
            strokeOpacity="0.06"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* =================================================================== */}
      {/* LEFT COLUMN: 3 CARDS ALIGNED IN ORDER (TOP, MIDDLE, BOTTOM)        */}
      {/* =================================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-[2vw] sm:left-[3vw] lg:left-[4vw] xl:left-[5vw] z-10 pointer-events-none flex flex-col justify-between py-[7vh] sm:py-[8vh] w-[130px] sm:w-[170px] md:w-[200px] lg:w-[230px] xl:w-[260px]"
      >
        {/* Card 1 (Top Left): Golden Dunes */}
        <div
          ref={leftCard1Ref}
          className="w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_20px_45px_-12px_rgba(0,0,0,0.20)] border border-[#0E0F14]/10 will-change-transform opacity-0"
        >
          <img
            src={goldenDunes}
            alt="Golden Dunes"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 45%" }}
          />
        </div>

        {/* Card 2 (Middle Left): Geometric Plaza */}
        <div
          ref={leftCard2Ref}
          className="w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_20px_45px_-12px_rgba(0,0,0,0.20)] border border-[#0E0F14]/10 will-change-transform opacity-0"
        >
          <img
            src={geometricPlaza}
            alt="Geometric Plaza"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
        </div>

        {/* Card 3 (Bottom Left): Glossy Blue Resin Hand */}
        <div
          ref={leftCard3Ref}
          className="w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_20px_45px_-12px_rgba(0,0,0,0.20)] border border-[#0E0F14]/10 will-change-transform opacity-0"
        >
          <img
            src={blueResinHand}
            alt="Glossy Blue Resin Hand"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 45%" }}
          />
        </div>
      </div>

      {/* =================================================================== */}
      {/* RIGHT COLUMN: 3 CARDS ALIGNED IN ORDER (TOP, MIDDLE, BOTTOM)       */}
      {/* Exactly symmetrical and aligned with the left column               */}
      {/* =================================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-[2vw] sm:right-[3vw] lg:right-[4vw] xl:right-[5vw] z-10 pointer-events-none flex flex-col justify-between py-[7vh] sm:py-[8vh] w-[130px] sm:w-[170px] md:w-[200px] lg:w-[230px] xl:w-[260px]"
      >
        {/* Card 1 (Top Right): Iridescent Chrome Face */}
        <div
          ref={rightCard1Ref}
          className="w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_20px_45px_-12px_rgba(0,0,0,0.20)] border border-[#0E0F14]/10 will-change-transform opacity-0"
        >
          <img
            src={iridescentFace}
            alt="Iridescent Chrome Face"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 32%" }}
          />
        </div>

        {/* Card 2 (Middle Right): Swirling Amber and Teal Ink */}
        <div
          ref={rightCard2Ref}
          className="w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_20px_45px_-12px_rgba(0,0,0,0.20)] border border-[#0E0F14]/10 will-change-transform opacity-0"
        >
          <img
            src={swirlingInk}
            alt="Swirling Ink Clouds"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
        </div>

        {/* Card 3 (Bottom Right): Fluid Marble Texture */}
        <div
          ref={rightCard3Ref}
          className="w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_20px_45px_-12px_rgba(0,0,0,0.20)] border border-[#0E0F14]/10 will-change-transform opacity-0"
        >
          <img
            src={marbleExplosion}
            alt="Fluid Marble Texture"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 45%" }}
          />
        </div>
      </div>

      {/* =================================================================== */}
      {/* FIXED CENTER TEXT: PURE REQUESTED COPY (NO ADDITIONAL AI TEXT)     */}
      {/* Anchored in the open center corridor between left and right columns */}
      {/* =================================================================== */}
      <div
        ref={textContainerRef}
        className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="w-full max-w-[520px] sm:max-w-[600px] lg:max-w-[680px] flex flex-col items-center">
          {/* Monumental Headline */}
          <h2
            ref={headlineRef}
            className="font-serif text-[38px] sm:text-[50px] md:text-[62px] lg:text-[72px] xl:text-[80px] font-normal leading-[1.08] tracking-[-0.025em] text-[#0E0F14] select-none text-center"
          >
            <span className="block">Digital Solutions.</span>
            <span
              className="block italic font-light text-[#5953E2] drop-shadow-[0_4px_24px_rgba(89,83,226,0.22)] mt-1 sm:mt-1.5"
              style={{
                fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                fontStyle: "italic",
              }}
            >
              Built Around Your Ambition.
            </span>
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-5 sm:mt-6 font-sans text-[15px] sm:text-[17px] md:text-[18px] lg:text-[19px] font-normal text-[#383946] tracking-[-0.01em] max-w-[540px] select-none leading-relaxed text-center"
          >
            Strategic engineering and elevated design for businesses ready to innovate, scale, and lead.
          </p>
        </div>
      </div>
    </section>
  );
}

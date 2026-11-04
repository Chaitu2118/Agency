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

  // Mobile curated card refs (Left, Center, Right)
  const mobileCard1Ref = useRef(null);
  const mobileCard2Ref = useRef(null);
  const mobileCard3Ref = useRef(null);

  const orbitsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // ------------------------------------------------------------------------
    // DESKTOP (>= 1024px):
    // 1. Initial State: Only text visible, all images staged below viewport
    // 2. Phase 1 (Scroll): Images rise slowly from bottom to top into symmetrical framing
    // 3. Phase 2 (Hold): Stable presentation for reading
    // 4. Phase 3 (Exit): ALL images exit upwards at once, canvas fades to black,
    //    and "Before we think" directly rises into view with ZERO white gap.
    // ------------------------------------------------------------------------
    mm.add("(min-width: 1024px)", () => {
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
    // MOBILE & TABLET (< 1024px):
    // Naturally sized, fully responsive scroll-driven choreography.
    // Zero pinned scroll trap, zero merging, perfectly proportional on mobile!
    // ------------------------------------------------------------------------
    mm.add("(max-width: 1023px)", () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        gsap.set([mobileCard1Ref.current, mobileCard2Ref.current, mobileCard3Ref.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // Smooth scroll-driven scrub as user reaches the section
      gsap.fromTo(
        mobileCard2Ref.current,
        { y: 35, opacity: 0, scale: 0.94 },
        {
          y: -6,
          opacity: 1,
          scale: 1.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 85%",
            end: "center 55%",
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        mobileCard1Ref.current,
        { y: 40, opacity: 0, rotate: -5 },
        {
          y: 0,
          opacity: 1,
          rotate: -2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 85%",
            end: "center 55%",
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        mobileCard3Ref.current,
        { y: 40, opacity: 0, rotate: 5 },
        {
          y: 0,
          opacity: 1,
          rotate: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 85%",
            end: "center 55%",
            scrub: 0.8,
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="average-is-expensive"
      ref={sectionRef}
      className="relative w-full py-12 xs:py-16 sm:py-20 lg:py-0 lg:h-screen flex flex-col justify-center items-center overflow-hidden select-text"
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

      {/* Subtle Central Orbital Graphic (clean, no text, no crosshairs, desktop only) */}
      <div
        ref={orbitsRef}
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute inset-0 z-[2] select-none will-change-transform"
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
      {/* Visible on Desktop (lg >= 1024px)                                   */}
      {/* =================================================================== */}
      <div
        aria-hidden="true"
        className="hidden lg:flex absolute inset-y-0 left-[2vw] sm:left-[3vw] lg:left-[4vw] xl:left-[5vw] z-10 pointer-events-none flex-col justify-between py-[7vh] sm:py-[8vh] w-[130px] sm:w-[170px] md:w-[200px] lg:w-[230px] xl:w-[260px]"
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
      {/* Visible on Desktop (lg >= 1024px)                                   */}
      {/* =================================================================== */}
      <div
        aria-hidden="true"
        className="hidden lg:flex absolute inset-y-0 right-[2vw] sm:right-[3vw] lg:right-[4vw] xl:right-[5vw] z-10 pointer-events-none flex-col justify-between py-[7vh] sm:py-[8vh] w-[130px] sm:w-[170px] md:w-[200px] lg:w-[230px] xl:w-[260px]"
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
      {/* CENTER TEXT + MOBILE CARDS TRIPTYCH                                */}
      {/* Relative flow on mobile/tablet, centered corridor on desktop       */}
      {/* =================================================================== */}
      <div
        ref={textContainerRef}
        className="relative lg:absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center px-4 sm:px-6 text-center w-full"
      >
        <div className="w-full max-w-[360px] xs:max-w-[420px] md:max-w-[500px] lg:max-w-[680px] flex flex-col items-center mx-auto">
          {/* Monumental Headline */}
          <h2
            ref={headlineRef}
            className="font-serif text-[24px] xs:text-[28px] sm:text-[36px] md:text-[48px] lg:text-[72px] xl:text-[80px] font-normal leading-[1.12] tracking-[-0.025em] text-[#0E0F14] select-none text-center"
          >
            <span className="block">Digital Solutions.</span>
            <span
              className="block italic font-light text-[#5953E2] drop-shadow-[0_4px_24px_rgba(89,83,226,0.22)] mt-0.5 sm:mt-1.5"
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
            className="mt-2.5 xs:mt-3 sm:mt-4 font-sans text-[12.5px] xs:text-[13.5px] sm:text-[15px] md:text-[17px] lg:text-[19px] font-normal text-[#383946] tracking-[-0.01em] max-w-[340px] xs:max-w-[420px] select-none leading-relaxed text-center"
          >
            Strategic engineering and elevated design for businesses ready to innovate, scale, and lead.
          </p>

          {/* Mobile Curated Visuals Row (Visible on mobile < 1024px only, animated on scroll) */}
          <div className="flex lg:hidden items-center justify-center gap-2.5 xs:gap-3.5 mt-4 xs:mt-6 w-full max-w-[320px] xs:max-w-[360px] pointer-events-auto">
            {/* Card 1: Left Card (Golden Dunes) */}
            <div
              ref={mobileCard1Ref}
              className="flex-1 aspect-[4/5] rounded-xl overflow-hidden shadow-md border border-[#0E0F14]/10 will-change-transform opacity-0"
            >
              <img src={goldenDunes} alt="Golden Dunes" className="w-full h-full object-cover" />
            </div>

            {/* Card 2: Center Card (Geometric Plaza) - Elevated focal card */}
            <div
              ref={mobileCard2Ref}
              className="flex-1 aspect-[4/5] rounded-xl overflow-hidden shadow-xl border border-[#0E0F14]/12 will-change-transform z-10 opacity-0"
            >
              <img src={geometricPlaza} alt="Geometric Plaza" className="w-full h-full object-cover" />
            </div>

            {/* Card 3: Right Card (Blue Resin Hand) */}
            <div
              ref={mobileCard3Ref}
              className="flex-1 aspect-[4/5] rounded-xl overflow-hidden shadow-md border border-[#0E0F14]/10 will-change-transform opacity-0"
            >
              <img src={blueResinHand} alt="Blue Resin Hand" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

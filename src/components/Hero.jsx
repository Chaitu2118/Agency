import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero({ isRevealed = false }) {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const showcaseRef = useRef(null);

  useEffect(() => {
    if (!isRevealed) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Botanical Eyebrow Badge (0.05s)
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.05
      );

      // 2. Hero Typography: Heading (opacity 0 -> 1, y 30px -> 0)
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85 },
        0.15
      );

      // 3. Narrative Description (opacity 0 -> 1, y 20px -> 0)
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.75 },
        0.38
      );

      // 4. Action CTAs (opacity 0 -> 1, y 15px -> 0)
      tl.fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.58
      );

      // 5. Editorial Pillars Showcase
      tl.fromTo(
        showcaseRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.78
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isRevealed]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[94vh] flex flex-col items-center justify-center pt-32 sm:pt-40 pb-20 px-6 sm:px-10 text-center overflow-hidden bg-[#FDF7EE]"
    >
      {/* Subtle organic botanical ambient warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(159, 109, 68, 0.12) 0%, rgba(247, 239, 226, 0.35) 50%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-[1140px] mx-auto flex flex-col items-center">
        {/* Eyebrow badge */}
        <div
          ref={badgeRef}
          style={{ opacity: isRevealed ? 1 : 0 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#F7EFE2] border border-[#9F6D44]/30 shadow-2xs mb-8"
        >
          {/* Subtle Botanical Leaf Icon */}
          <svg className="w-3.5 h-3.5 text-[#9F6D44]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 15.5 3.8 18.57 6.55 20.35C6.2 19.33 6 18.2 6 17C6 11.48 10.48 7 16 7C17.2 7 18.33 7.2 19.35 7.55C18.57 3.8 15.5 2 12 2ZM17 9C12.58 9 9 12.58 9 17C9 18.06 9.21 19.07 9.58 20C10.36 20.64 11.27 21.1 12.26 21.36C12.1 20.93 12 20.47 12 20C12 17.79 13.79 16 16 16C16.47 16 16.93 16.1 17.36 16.26C18.42 14.54 19 12.54 19 10.42C18.35 9.54 17.5 9 17 9Z" />
          </svg>
          <span className="text-[11px] sm:text-[12px] font-sans font-medium tracking-[0.2em] uppercase text-[#47260E]">
            The Tavqo • Luxury Creative Atelier
          </span>
        </div>

        {/* Large Editorial Heading (heading: opacity 0 -> 1, y 30px -> 0) */}
        <h1
          ref={headingRef}
          style={{ opacity: isRevealed ? 1 : 0 }}
          className="font-serif text-[42px] sm:text-[68px] md:text-[84px] lg:text-[98px] font-normal tracking-[-0.03em] leading-[1.06] text-[#47260E] mb-8 select-none"
        >
          <span>Crafting exceptional</span>{" "}
          <span className="italic font-light text-[#9F6D44]">experiences with</span><br />
          <span>purpose and elegance.</span>
        </h1>

        {/* Supporting Narrative Description (description: opacity 0 -> 1, y 20px -> 0) */}
        <p
          ref={subtextRef}
          style={{ opacity: isRevealed ? 1 : 0 }}
          className="max-w-[700px] text-[17px] sm:text-[19px] md:text-[21px] text-[#503017]/85 font-sans font-light leading-[1.65] tracking-[-0.01em] mb-12"
        >
          The Tavqo is a bespoke design atelier and digital studio crafting enduring brand identities, thoughtful editorial interfaces, and timeless spatial expressions for discerning institutions worldwide.
        </p>

        {/* CTAs (CTA: opacity 0 -> 1, y 15px -> 0) */}
        <div
          ref={ctaGroupRef}
          style={{ opacity: isRevealed ? 1 : 0 }}
          className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto mb-20"
        >
          <a
            href="#contact"
            className="group inline-flex items-center justify-center w-full sm:w-auto px-9 py-4 rounded-full bg-[#47260E] text-[#FDF7EE] text-[13px] font-sans font-medium tracking-[0.14em] uppercase transition-all duration-300 hover:bg-[#503017] active:scale-[0.98] shadow-md shadow-[#47260E]/10"
          >
            <span>Book a Consultation</span>
            <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

          <a
            href="#projects"
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full bg-[#FDF7EE] hover:bg-[#F7EFE2] text-[#47260E] text-[13px] font-sans font-medium tracking-[0.14em] uppercase border border-[#9F6D44]/35 transition-all duration-300 hover:shadow-2xs active:scale-[0.98]"
          >
            Explore Portfolio
          </a>
        </div>

        {/* Editorial Pillars / Brand Statement */}
        <div
          ref={showcaseRef}
          style={{ opacity: isRevealed ? 1 : 0 }}
          className="w-full max-w-[1040px] pt-12 border-t border-[#9F6D44]/20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left"
        >
          <div className="p-6 rounded-2xl bg-[#F7EFE2]/70 border border-[#9F6D44]/20">
            <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-[#9F6D44] block mb-2">
              01 / BRAND IDENTITY
            </span>
            <h4 className="font-serif text-[19px] font-normal text-[#47260E] mb-2">
              Bespoke Distinction
            </h4>
            <p className="text-[13.5px] font-sans text-[#503017]/80 leading-relaxed font-light">
              Crafting iconic marks, high-contrast typography, and enduring systems designed to transcend passing trends.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7EFE2]/70 border border-[#9F6D44]/20">
            <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-[#9F6D44] block mb-2">
              02 / EDITORIAL DIGITAL
            </span>
            <h4 className="font-serif text-[19px] font-normal text-[#47260E] mb-2">
              Optical Craft
            </h4>
            <p className="text-[13.5px] font-sans text-[#503017]/80 leading-relaxed font-light">
              Digital environments designed with spatial rhythm, refined micro-physics, and museum-grade tactile restraint.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7EFE2]/70 border border-[#9F6D44]/20">
            <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-[#9F6D44] block mb-2">
              03 / ENDURING VALUE
            </span>
            <h4 className="font-serif text-[19px] font-normal text-[#47260E] mb-2">
              Heritage & Presence
            </h4>
            <p className="text-[13.5px] font-sans text-[#503017]/80 leading-relaxed font-light">
              Deep alignment with cultural legacy, strategic longevity, and uncompromising material execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

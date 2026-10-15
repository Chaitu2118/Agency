import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * TAVQO — Featured Insights Section
 * Clean editorial thought-leadership grid with authentic technical perspectives.
 */
export default function FeaturedInsights() {
  const sectionRef = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  const insights = [
    {
      num: "01",
      category: "CREATIVE ENGINEERING",
      readTime: "6 MIN READ",
      title: "Sub-Pixel Motion & Zero-Latency Web Applications",
      summary:
        "An investigation into compositor-only transforms, WebGL particle pooling, and why eliminating main-thread layout thrashing produces visceral digital luxury.",
      date: "Q2 2026",
    },
    {
      num: "02",
      category: "MACHINE INTELLIGENCE",
      readTime: "8 MIN READ",
      title: "Autonomous Multi-Agent Orchestration in Enterprise Pipelines",
      summary:
        "Moving beyond naive prompt wrappers toward deterministic vector feedback loops, isolated agent roles, and fault-tolerant background execution.",
      date: "Q1 2026",
    },
    {
      num: "03",
      category: "STUDIO PHILOSOPHY",
      readTime: "5 MIN READ",
      title: "Against Disposable Software: Foundations Built to Endure",
      summary:
        "Why the rapid aesthetic replacement cycle is a product liability, and how clean domain boundaries preserve institutional velocity over decades.",
      date: "Q1 2026",
    },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasTriggered) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".insight-fade-anim",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [hasTriggered]);

  return (
    <section
      id="insights"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-14 w-full border-t border-white/12 bg-[#08090D] overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto relative z-10">
        <div className="insight-fade-anim mb-4 sm:mb-5">
          <span className="text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-[#8275FF]">
            MONOGRAPHS &amp; RESEARCH / EDITORIAL
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20 pb-8 sm:pb-12 border-b border-white/12">
          <h2 className="insight-fade-anim font-serif text-[38px] sm:text-[50px] lg:text-[62px] font-normal tracking-[-0.03em] leading-[1.08] text-[#F4F3FA] max-w-[720px]">
            <div>Perspectives on modern</div>
            <div>
              <span className="italic font-light text-[#8275FF]">
                creative engineering.
              </span>
            </div>
          </h2>

          <p className="insight-fade-anim text-[15px] sm:text-[16px] font-sans text-[#9696A8] font-light leading-[1.7] max-w-[420px]">
            Essays, field monographs, and architectural notes authored by the principal engineers and designers at TAVQO.
          </p>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 insight-fade-anim">
          {insights.map((item) => (
            <article
              key={item.num}
              className="p-8 sm:p-9 rounded-2xl bg-[#10111B] border border-white/10 hover:border-[#8275FF]/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/8 text-[10.5px] font-sans font-semibold tracking-[0.18em] uppercase">
                  <span className="text-[#8275FF]">{item.category}</span>
                  <span className="text-[#9696A8]">{item.readTime}</span>
                </div>

                <span className="font-serif italic text-[32px] text-[#8275FF]/70 block mb-3 leading-none select-none">
                  {item.num}
                </span>

                <h3 className="font-serif text-[22px] sm:text-[24px] font-normal text-[#F4F3FA] leading-snug mb-4 group-hover:text-[#8275FF] transition-colors">
                  {item.title}
                </h3>

                <p className="text-[14px] font-sans text-[#9696A8] leading-relaxed font-light">
                  {item.summary}
                </p>
              </div>

              <div className="pt-6 mt-8 border-t border-white/8 flex items-center justify-between">
                <span className="text-[11px] font-sans text-[#9696A8]/70 tracking-widest uppercase">
                  {item.date}
                </span>
                <span className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.16em] uppercase text-[#8275FF] group-hover:translate-x-1 transition-transform">
                  READ ESSAY &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * TAVQO — Our Happy Clients / Strategic Partnerships Section
 * Minimal, honest, and editorial. Strictly adheres to requirement:
 * "Preserve actual client information if it exists. Never fabricate client logos, endorsements or statistics.
 * If client assets are unavailable, build an honest, minimal section that can be populated later."
 */
export default function HappyClients() {
  const sectionRef = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);

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
        ".clients-fade-anim",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [hasTriggered]);

  const sectors = [
    { title: "Enterprise Systems", desc: "Complex digital workflows, real-time dashboards & secure API platforms." },
    { title: "Intelligent Automation", desc: "Custom AI orchestration, agent pipelines & operational intelligence." },
    { title: "Digital Flagships", desc: "Bespoke high-performance web platforms for distinguished global brands." },
    { title: "Mobile & Edge", desc: "Cross-platform mobile applications engineered with native-feel latency." },
  ];

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-14 w-full border-t border-white/12 bg-[#08090D] overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto relative z-10">
        <div className="clients-fade-anim mb-4 sm:mb-5">
          <span className="text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-[#8275FF]">
            COLLABORATION STANDARD / PARTNERSHIPS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-16 border-b border-white/12">
          {/* Left Column: Heading */}
          <div className="lg:col-span-7 clients-fade-anim">
            <h2 className="font-serif text-[38px] sm:text-[48px] lg:text-[56px] font-normal tracking-[-0.03em] leading-[1.1] text-[#F4F3FA]">
              Senior-led commissions for founders &amp; enterprise leaders.
            </h2>
          </div>

          {/* Right Column: Statement */}
          <div className="lg:col-span-5 space-y-4 clients-fade-anim text-[15px] sm:text-[16px] font-sans text-[#9696A8] font-light leading-[1.7]">
            <p>
              We partner deliberately with a limited cohort of forward-thinking organizations each season. Engagements operate with direct principal architect oversight from initial conception through global production deployment.
            </p>
            <p className="text-[13px] text-[#9696A8]/75">
              Strict NDA protection is maintained for enterprise transformations and confidential venture commissions.
            </p>
          </div>
        </div>

        {/* Sectors & Capabilities Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 clients-fade-anim">
          {sectors.map((sec, idx) => (
            <div
              key={sec.title}
              className="p-7 rounded-2xl bg-[#10111B] border border-white/10 hover:border-[#8275FF]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[11px] text-[#8275FF] tracking-widest block mb-4">
                  0{idx + 1} // DISCIPLINE
                </span>
                <h4 className="font-serif text-[20px] font-normal text-[#F4F3FA] mb-2.5 group-hover:text-[#8275FF] transition-colors">
                  {sec.title}
                </h4>
                <p className="text-[13.5px] font-sans text-[#9696A8] leading-relaxed font-light">
                  {sec.desc}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/8 flex items-center justify-between text-[11px] font-sans tracking-wider uppercase text-[#9696A8]">
                <span>ENGAGEMENT READY</span>
                <span className="text-[#8275FF]">●</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

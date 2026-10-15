import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// ============================================================================
// TAVQO EDITORIAL SERVICES ACCORDION DATA (EXACT USER SPECIFICATION)
// ============================================================================

const servicesData = [
  {
    num: "01",
    title: "Websites & Digital Experiences",
    desc: "Distinctive websites and digital platforms designed to communicate your brand and turn visitors into customers.",
    capabilities: [
      "Website Development",
      "UI/UX Engineering",
      "Interactive Experiences",
      "Performance Optimization",
    ],
    cta: "EXPLORE SERVICE →",
    href: "#contact",
  },
  {
    num: "02",
    title: "Mobile Apps & Product Engineering",
    desc: "Scalable mobile applications, business tools and custom software built around real business needs.",
    capabilities: [
      "Mobile Applications",
      "Cross-Platform Development",
      "Backend & APIs",
      "Product Engineering",
    ],
    cta: "EXPLORE SERVICE →",
    href: "#contact",
  },
  {
    num: "03",
    title: "AI & Intelligent Automation",
    desc: "Connected workflows and intelligent integrations that reduce repetitive work and improve business efficiency.",
    capabilities: [
      "AI Integrations",
      "Workflow Automation",
      "System Integrations",
      "Intelligent Agents",
    ],
    cta: "EXPLORE SERVICE →",
    href: "#contact",
  },
  {
    num: "04",
    title: "Smart Systems & Infrastructure",
    desc: "Connected devices, real-time dashboards and integrated digital systems designed for real-world operations.",
    capabilities: [
      "IoT Solutions",
      "Data Dashboards",
      "Cloud Deployment",
      "System Integration",
    ],
    cta: "EXPLORE SERVICE →",
    href: "#contact",
  },
];

export default function Services() {
  // Service 01 expanded by default
  const [expandedIndex, setExpandedIndex] = useState(0);
  const sectionRef = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  // Detect reduced-motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(media.matches);
    const handler = (e) => setShouldReduceMotion(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Accordion behaviour: Only one service expanded at a time
  const toggleCard = (index) => {
    setExpandedIndex((prev) => (prev === index ? -1 : index));
  };

  // Trigger GSAP entrance animation once section enters viewport
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

  // GSAP entrance animation with full cleanup, layer clearProps, and reduced-motion support
  useEffect(() => {
    if (!hasTriggered) return;

    if (shouldReduceMotion) {
      gsap.set(
        [
          ".services-eyebrow-anim",
          ".services-heading-anim",
          ".services-desc-anim",
          ".services-row-anim",
        ],
        { opacity: 1, y: 0, clearProps: "all" }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".services-eyebrow-anim",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, clearProps: "all" }
      )
        .fromTo(
          ".services-heading-anim",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: "all" },
          0.1
        )
        .fromTo(
          ".services-desc-anim",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, clearProps: "all" },
          0.2
        )
        .fromTo(
          ".services-row-anim",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, clearProps: "all" },
          0.25
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [hasTriggered, shouldReduceMotion]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-14 w-full border-t border-white/12 overflow-hidden"
      style={{ backgroundColor: "#08090D" }}
    >
      {/* Subtle Atmospheric Violet Glow in Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
        style={{
          background: "radial-gradient(circle, #8275FF 0%, #17152F 50%, transparent 70%)",
        }}
      />

      <div className="max-w-[1360px] mx-auto relative z-10">
        {/* ========================================================= */}
        {/* 1. SECTION HEADER                                         */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20 pb-8 sm:pb-12 border-b border-white/12">
          <div className="services-heading-anim max-w-[720px]">
            <div className="services-eyebrow-anim mb-4 sm:mb-5">
              <span className="text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-[#8275FF]">
                TAVQO / SERVICES
              </span>
            </div>
            <h2 className="font-serif text-[38px] sm:text-[50px] lg:text-[62px] font-normal tracking-[-0.03em] leading-[1.08] text-[#F4F3FA]">
              <div>Thoughtful technology,</div>
              <div>
                <span className="italic font-light text-[#8275FF]">
                  beautifully engineered.
                </span>
              </div>
            </h2>
          </div>

          <div className="services-desc-anim max-w-[440px] lg:text-left">
            <p className="text-[15px] sm:text-[16px] font-sans text-[#9696A8] font-light leading-[1.7] tracking-[-0.01em]">
              From websites and mobile applications to intelligent automation and connected systems, we build digital solutions that help businesses grow, work smarter and stand apart.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. EDITORIAL ROWS MATCHING REFERENCE DESIGN               */}
        {/* ========================================================= */}
        <div className="border-t border-white/12">
          {servicesData.map((service, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={service.num}
                className="services-row-anim border-b border-white/12 transition-colors duration-200"
              >
                {/* Accordion Row Trigger Header Button */}
                <button
                  type="button"
                  id={`service-header-${index}`}
                  aria-controls={`service-panel-${index}`}
                  onClick={() => toggleCard(index)}
                  aria-expanded={isExpanded}
                  className="w-full text-left py-7 sm:py-9 lg:py-11 flex items-center group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8275FF]"
                >
                  {/* Left Number: Sloping Italic Serif in #8275FF */}
                  <div className="w-16 sm:w-24 md:w-32 lg:w-36 shrink-0 flex items-center justify-start">
                    <span className="font-serif italic text-[36px] sm:text-[44px] md:text-[52px] lg:text-[58px] font-normal leading-none text-[#8275FF] select-none">
                      {service.num}
                    </span>
                  </div>

                  {/* Left Vertical Divider */}
                  <div className="h-10 sm:h-12 w-[1px] bg-white/12 shrink-0 mr-6 sm:mr-10 lg:mr-12" />

                  {/* Center Service Title */}
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-serif text-[24px] sm:text-[32px] md:text-[40px] lg:text-[46px] font-normal tracking-[-0.025em] text-[#F4F3FA] leading-tight break-words group-hover:text-[#8275FF] transition-colors duration-200">
                      {service.title}
                    </h3>
                  </div>

                  {/* Right Vertical Divider */}
                  <div className="h-10 sm:h-12 w-[1px] bg-white/12 shrink-0 ml-4 mr-6 sm:mr-10 lg:mr-12" />

                  {/* Far-Right Plus / Minus Control */}
                  <div className="w-8 sm:w-10 shrink-0 flex items-center justify-center text-[#8275FF]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="overflow-visible"
                    >
                      <line
                        x1="2"
                        y1="10"
                        x2="18"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="10"
                        y1="2"
                        x2="10"
                        y2="18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        style={{
                          transformOrigin: "10px 10px",
                          transform: isExpanded ? "rotate(90deg) scale(0)" : "rotate(0deg) scale(1)",
                          opacity: isExpanded ? 0 : 1,
                          transition: shouldReduceMotion
                            ? "none"
                            : "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out",
                        }}
                      />
                    </svg>
                  </div>
                </button>

                {/* Native CSS Grid Expandable Drawer */}
                <div
                  id={`service-panel-${index}`}
                  role="region"
                  aria-labelledby={`service-header-${index}`}
                  className="grid transition-[grid-template-rows] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    gridTemplateRows: isExpanded ? "1fr" : "0fr",
                    transitionDuration: shouldReduceMotion ? "0ms" : "300ms",
                  }}
                >
                  <div className="overflow-hidden min-h-0">
                    <div
                      style={{
                        opacity: isExpanded ? 1 : 0,
                        transition: shouldReduceMotion
                          ? "none"
                          : isExpanded
                          ? "opacity 0.22s ease-out 0.06s"
                          : "opacity 0.12s ease-out",
                      }}
                    >
                      <div className="flex items-start">
                        {/* Spacer matching left number column */}
                        <div className="w-16 sm:w-24 md:w-32 lg:w-36 shrink-0" />
                        {/* Spacer matching left vertical divider */}
                        <div className="w-[1px] shrink-0 mr-6 sm:mr-10 lg:mr-12" />

                        {/* Expanded details container */}
                        <div className="flex-1 min-w-0 pb-9 sm:pb-12 pr-12 sm:pr-24 space-y-6 sm:space-y-7">
                          {/* Supporting Description */}
                          <p className="text-[15px] sm:text-[16.5px] font-sans text-[#9696A8] font-light leading-[1.65] max-w-[680px]">
                            {service.desc}
                          </p>

                          {/* Minimal Capabilities */}
                          <div className="flex flex-wrap items-center gap-y-2.5 text-[11px] sm:text-[12px] font-sans font-medium uppercase tracking-[0.16em] text-[#9696A8]">
                            {service.capabilities.map((cap, capIdx) => (
                              <span key={cap} className="inline-flex items-center">
                                {capIdx > 0 && (
                                  <span
                                    aria-hidden="true"
                                    className="mx-3.5 sm:mx-5 h-3.5 w-[1px] bg-white/15 select-none"
                                  />
                                )}
                                <span className="hover:text-[#F4F3FA] transition-colors">
                                  {cap}
                                </span>
                              </span>
                            ))}
                          </div>

                          {/* Underlined Editorial Link CTA */}
                          <div className="pt-1">
                            <a
                              href={service.href}
                              className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-sans font-semibold tracking-[0.16em] uppercase text-[#8275FF] hover:text-[#F4F3FA] underline underline-offset-6 decoration-[#8275FF]/40 hover:decoration-[#8275FF] transition-all"
                            >
                              <span>{service.cta}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

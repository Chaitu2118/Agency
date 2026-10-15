import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * TAVQO — Innovative Technologies Section
 * Highly sophisticated presentation of engineering capabilities.
 * Avoids a generic wall of logos; uses an interactive architectural matrix with telemetry benchmarks.
 */
export default function InnovativeTechnologies() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);

  const categories = [
    {
      id: "3d-graphics",
      name: "Real-Time 3D & WebGL",
      tagline: "Sub-pixel spatial rendering & high-fidelity shaders",
      benchmark: "<16.6ms Frame Budget (60 FPS)",
      description:
        "Custom GLSL fragment shaders, procedural particle geometries, Keplerian orbital math, and lightweight 3D canvas runtimes designed to preserve performance on mobile and desktop without frame jitter.",
      stack: ["Three.js", "WebGL 2.0", "GLSL Shaders", "WebGPU Ready", "BufferGeometry"],
      metrics: [
        { label: "Target Render Rate", value: "60 FPS" },
        { label: "Max Memory Ceiling", value: "< 45 MB" },
        { label: "Particle Cap", value: "90,000+" },
      ],
    },
    {
      id: "ai-automation",
      name: "AI & Autonomous Systems",
      tagline: "Orchestrated agent pipelines & cognitive workflows",
      benchmark: "99.4% Workflow Reliability",
      description:
        "Deterministic agent systems, semantic embeddings, real-time context retrieval, and autonomous workflow loops that remove operational drag and automate critical enterprise decisions.",
      stack: ["Autonomous Agents", "Vector Embeddings", "FastAPI", "n8n Pipelines", "Local LLMs"],
      metrics: [
        { label: "Median Inference", value: "140 ms" },
        { label: "Automation Scope", value: "End-to-End" },
        { label: "Data Isolation", value: "Enterprise NDA" },
      ],
    },
    {
      id: "distributed-backends",
      name: "High-Concurrency Backends",
      tagline: "Scalable API fabrics & low-latency streaming",
      benchmark: "Sub-40ms P99 API Latency",
      description:
        "Fault-tolerant microservices, bidirectional WebSocket streaming channels, resilient relational schemas, and global edge caching delivering deterministic performance under heavy concurrency.",
      stack: ["Go", "Node.js", "PostgreSQL", "Redis Caching", "WebSockets"],
      metrics: [
        { label: "Concurrent Conns", value: "50,000+" },
        { label: "Uptime SLA", value: "99.98%" },
        { label: "Cold Start", value: "< 25 ms" },
      ],
    },
    {
      id: "cross-platform-apps",
      name: "Mobile & Edge Applications",
      tagline: "Fluid native-feel runtimes & offline sync",
      benchmark: "Native 120Hz Interaction Curves",
      description:
        "Unified cross-platform architectures for iOS and Android featuring local-first caching, background syncing, biometric encryption, and bespoke gesture physics.",
      stack: ["React Native", "Expo Prebuild", "Tailwind CSS", "SQLite Local", "Secure Enclave"],
      metrics: [
        { label: "Bundle Size", value: "Optimized" },
        { label: "Crash-Free Rate", value: "99.95%" },
        { label: "Touch Latency", value: "< 8 ms" },
      ],
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
        ".tech-fade-anim",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [hasTriggered]);

  const current = categories[activeCategory];

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-14 w-full border-t border-white/12 bg-[#08090D] overflow-hidden"
    >
      {/* Background Subtle Violet Ambient Illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/4 w-[700px] h-[500px] rounded-full blur-[160px] opacity-15"
        style={{
          background: "radial-gradient(circle, #8275FF 0%, #17152F 60%, transparent 80%)",
        }}
      />

      <div className="max-w-[1360px] mx-auto relative z-10">
        {/* Header */}
        <div className="tech-fade-anim mb-4 sm:mb-5">
          <span className="text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-[#8275FF]">
            ENGINEERING CAPABILITIES / STACK ARCHITECTURE
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20 pb-8 sm:pb-12 border-b border-white/12">
          <h2 className="tech-fade-anim font-serif text-[38px] sm:text-[50px] lg:text-[62px] font-normal tracking-[-0.03em] leading-[1.08] text-[#F4F3FA] max-w-[720px]">
            <div>Precision architectures,</div>
            <div>
              <span className="italic font-light text-[#8275FF]">
                engineered for scale.
              </span>
            </div>
          </h2>

          <p className="tech-fade-anim text-[15px] sm:text-[16px] font-sans text-[#9696A8] font-light leading-[1.7] max-w-[420px]">
            We select and configure technologies with rigorous purpose — maximizing throughput, eliminating unnecessary abstraction, and delivering lasting digital resilience.
          </p>
        </div>

        {/* Interactive Architecture Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Category Selectors */}
          <div className="lg:col-span-5 space-y-3 tech-fade-anim">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === idx;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(idx)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? "bg-[#10111B] border-[#8275FF] shadow-[0_0_30px_rgba(130,117,255,0.18)]"
                      : "bg-[#08090D] border-white/10 hover:border-white/20 hover:bg-[#10111B]/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-[12px] transition-colors ${
                        isActive ? "text-[#8275FF]" : "text-[#9696A8]"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <h4
                        className={`font-serif text-[18px] sm:text-[20px] transition-colors ${
                          isActive ? "text-[#F4F3FA]" : "text-[#9696A8] group-hover:text-[#F4F3FA]"
                        }`}
                      >
                        {cat.name}
                      </h4>
                      <span className="text-[11.5px] font-sans text-[#9696A8]/75 block mt-0.5">
                        {cat.benchmark}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? "bg-[#8275FF] shadow-[0_0_8px_#8275FF] scale-125" : "bg-white/15"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Telemetry View */}
          <div className="lg:col-span-7 tech-fade-anim">
            <div className="rounded-3xl bg-[#10111B] border border-white/12 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
              {/* Subtle Ambient Violet Corner Light */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[90px] opacity-25"
                style={{
                  background: "radial-gradient(circle, #8275FF 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10 space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#8275FF] animate-pulse" />
                    <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8275FF]">
                      LIVE BENCHMARK · {current.benchmark}
                    </span>
                  </div>
                  <h3 className="font-serif text-[28px] sm:text-[34px] font-normal text-[#F4F3FA] leading-tight">
                    {current.tagline}
                  </h3>
                </div>

                <p className="text-[15px] sm:text-[16px] font-sans text-[#9696A8] font-light leading-[1.75]">
                  {current.description}
                </p>

                {/* Stack Tags */}
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#9696A8] block mb-3 font-medium">
                    Core Technical Foundation
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {current.stack.map((item) => (
                      <span
                        key={item}
                        className="px-3.5 py-1.5 rounded-full bg-[#17152F] border border-[#8275FF]/30 text-[#F4F3FA] text-[12px] font-sans font-medium tracking-wide"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Telemetry Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {current.metrics.map((m) => (
                    <div key={m.label} className="p-3.5 rounded-xl bg-[#08090D] border border-white/8">
                      <span className="text-[10px] font-sans uppercase tracking-wider text-[#9696A8] block mb-1">
                        {m.label}
                      </span>
                      <span className="font-mono text-[14px] sm:text-[16px] font-semibold text-[#8275FF]">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

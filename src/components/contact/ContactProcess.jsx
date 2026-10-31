import { CheckCircle2, MessageSquare, PhoneCall, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import KineticTypography, { KineticWord } from "./KineticTypography";

/**
 * Section 3: What Happens Next? (Enhanced with 3D UI Depth & Tilt)
 * - 3D Kinetic typography reveals for heading
 * - Individual cards with 3D mouse perspective tilt and elevated depth layers
 * - Subtle ambient gradient drift in background (NO 3D objects)
 */
export default function ContactProcess() {
  const steps = [
    {
      num: "01",
      title: "You Reach Out",
      quote: "Share your idea, requirements and goals with our team.",
      desc: "Submit your inquiry form or direct email. Our technology leads personally review your specifications within 24 hours.",
      icon: <MessageSquare className="w-4 h-4 text-[#8275FF]" />,
      badge: "Step 01",
    },
    {
      num: "02",
      title: "We Connect",
      quote: "We review your inquiry and arrange a conversation to understand your vision.",
      desc: "We schedule a dedicated discovery video call with technical specialists—not sales representatives—to explore feasibility.",
      icon: <PhoneCall className="w-4 h-4 text-[#8275FF]" />,
      badge: "Step 02",
    },
    {
      num: "03",
      title: "We Build Together",
      quote: "We define the approach and take the next steps towards bringing your idea to life.",
      desc: "We deliver an architectural blueprint, transparent milestone schedule, and initiate sprint-based development.",
      icon: <Rocket className="w-4 h-4 text-[#8275FF]" />,
      badge: "Step 03",
    },
  ];

  return (
    <section
      aria-label="What Happens Next Process"
      className="relative w-full py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-[6.5vw] bg-[#050508] text-[#F4F3FA] overflow-hidden select-text border-t border-white/[0.08]"
    >
      {/* Ambient background glow drifting smoothly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[400px] rounded-full blur-[150px] opacity-20 animate-violet-drift"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(130, 117, 255, 0.28) 0%, rgba(23, 21, 47, 0.5) 45%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-18">
          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[46px] tracking-tight text-[#F4F3FA] leading-[1.12]">
            <KineticTypography delay={0.1} stagger={0.07}>
              <KineticWord className="mr-[0.22em]">What</KineticWord>
              <KineticWord className="mr-[0.22em]">happens</KineticWord>
              <KineticWord className="font-instrument italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C7C0FF] to-[#8275FF]">
                next?
              </KineticWord>
            </KineticTypography>
          </h2>
        </div>

        {/* Horizontal Process Grid */}
        <div className="relative">
          
          {/* Connecting line between steps on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1.5px] z-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(130, 117, 255, 0.1) 0%, rgba(130, 117, 255, 0.45) 50%, rgba(130, 117, 255, 0.1) 100%)",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full"
              >
                <div className="h-full flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-[#08090D]/90 border border-white/[0.08] hover:border-[#8275FF]/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_20px_45px_rgba(130,117,255,0.18)]">
                  <div>
                    {/* Top Bar: Minimal Number + Step Badge */}
                    <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
                      <span className="font-sans font-bold text-3xl sm:text-4xl text-[#8275FF]/40 group-hover:text-[#8275FF] transition-colors duration-300 block">
                        {step.num}
                      </span>
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
                        {step.icon}
                        <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#9696A8]">
                          {step.badge}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans font-semibold text-xl sm:text-[22px] text-[#F4F3FA] group-hover:text-white tracking-tight">
                      {step.title}
                    </h3>

                    {/* Highlight Quote */}
                    <p className="font-sans text-[14px] sm:text-[14.5px] text-[#C7C0FF] font-medium leading-snug mt-2.5 mb-4">
                      &ldquo;{step.quote}&rdquo;
                    </p>

                    {/* Supporting Description */}
                    <p className="font-sans font-light text-xs sm:text-[13px] text-[#9696A8] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Step Indicator */}
                  <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#5A5A6E] group-hover:text-[#8275FF] transition-colors">
                    <span>PHASE {step.num}</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

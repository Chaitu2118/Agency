import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import KineticTypography, { KineticWord } from "./KineticTypography";

const FAQ_ITEMS = [
  {
    question: "What types of projects does TAVQO work on?",
    answer:
      "TAVQO is a creative technology and product engineering studio. We build custom high-performance websites, Android and iOS mobile applications, SaaS products, operational dashboards, production-grade AI & intelligent automations, IoT/embedded device systems, and immersive WebGL/3D digital experiences.",
  },
  {
    question: "How do I get started with a project?",
    answer:
      "Getting started is simple. Fill out our project inquiry form above or email us at hello@tavqo.com. Tell us a bit about your goals, timelines, and requirements. We will review your brief within 24 hours and arrange a discovery conversation to explore scope, technical feasibility, and next steps.",
  },
  {
    question: "Do you work with startups and established businesses?",
    answer:
      "Yes, we collaborate with both early-stage venture-backed founders looking to design and build an MVP from 0 to 1, as well as established mid-market enterprises looking to modernize legacy software, engineer intelligent automation pipelines, or build new consumer-facing digital flagships.",
  },
  {
    question: "Can you work with an existing website or application?",
    answer:
      "Absolutely. We frequently take over existing codebases to perform comprehensive architectural audits, UI/UX redesigns, performance optimizations, bug refactoring, and feature expansion. We work alongside your internal engineering team or manage the delivery end-to-end.",
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "Yes. We offer post-launch SLA retainers including proactive security patches, server infrastructure monitoring, framework updates, database optimizations, and ongoing sprint hours for continuous feature development.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary depending on project complexity. A high-end marketing website or interactive prototype typically takes 2 to 4 weeks. A full custom web or mobile platform, dashboard, or AI integration typically ranges between 6 to 12 weeks. We map out precise milestones before writing any code.",
  },
];

/**
 * Section 4: FAQ Section (Enhanced with 3D Typography & Depth Transitions)
 * - 3D Kinetic typography reveal for heading
 * - Individual accordion cards with physical 3D depth elevations when expanded
 * - Subtle ambient gradient drift (NO 3D objects)
 */
export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      aria-label="Frequently Asked Questions"
      className="relative w-full py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-[6.5vw] bg-[#08090D] text-[#F4F3FA] overflow-hidden select-text border-t border-white/[0.08]"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
      >
        <div
          className="absolute -bottom-20 left-1/3 w-[700px] h-[500px] rounded-full blur-[150px] opacity-20 animate-violet-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(130, 117, 255, 0.28) 0%, rgba(23, 21, 47, 0.5) 50%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8275FF]" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#C7C0FF]">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>

          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[44px] tracking-tight text-[#F4F3FA] leading-[1.15]">
            <KineticTypography delay={0.1} stagger={0.06}>
              <KineticWord className="mr-[0.22em]">Everything</KineticWord>
              <KineticWord className="mr-[0.22em]">you</KineticWord>
              <KineticWord className="mr-[0.22em]">need</KineticWord>
              <KineticWord className="mr-[0.22em]">to</KineticWord>
              <KineticWord className="mr-[0.22em]">know</KineticWord>
              <KineticWord className="mr-[0.22em]">before</KineticWord>
              <KineticWord className="font-instrument italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C7C0FF] to-[#8275FF]">
                starting.
              </KineticWord>
            </KineticTypography>
          </h2>
        </div>

        {/* Accordion List with 3D Depth Elevation */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#10111B] border border-[#8275FF]/45 shadow-[0_16px_40px_rgba(130,117,255,0.18),inset_0_1px_0_rgba(255,255,255,0.14)]"
                    : "bg-[#050508]/80 border border-white/[0.08] hover:border-white/[0.2] hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus-visible:outline-none"
                >
                  <span className={`font-sans font-medium text-[16px] sm:text-[18px] pr-2 transition-colors duration-200 ${
                    isOpen ? "text-white" : "text-[#F4F3FA]"
                  }`}>
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-[#8275FF]/20 border-[#8275FF]/50 text-[#8275FF] rotate-180 shadow-[0_0_12px_rgba(130,117,255,0.3)]"
                        : "bg-white/[0.04] border-white/[0.08] text-[#9696A8]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-[15px] font-sans font-light text-[#9696A8] leading-relaxed border-t border-white/[0.04]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Helper Bar with Depth */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#8275FF]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#9696A8] transition-all duration-300 shadow-sm">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-[#8275FF]" />
            <span>Have a technical specification or RFP ready for review?</span>
          </div>
          <a
            href="mailto:hello@tavqo.com?subject=RFP%20Submission%20-%20TAVQO"
            className="inline-flex items-center gap-1.5 text-[#F4F3FA] hover:text-[#8275FF] font-medium transition-colors cursor-pointer group"
          >
            <span>Send your RFP directly</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-colors duration-200" />
          </a>
        </div>

      </div>
    </section>
  );
}

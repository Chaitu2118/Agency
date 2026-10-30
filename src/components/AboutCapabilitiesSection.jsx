import { motion } from "framer-motion";
import TextAnimation from "@/components/ui/staggerText";

const SERVICES_LIST = [
  "Web Development",
  "Mobile Applications",
  "UI/UX & Product Design",
  "Product Engineering",
  "AI & Automation",
  "IoT & Smart Systems",
  "Immersive 3D Experiences",
];

/**
 * AboutCapabilitiesSection Component
 * StaggerText typographical animation for TAVQO capabilities:
 * 1. Clean editorial "What We Build" label (regular 400 weight, 15-17px sans-serif).
 * 2. Solid homepage dark canvas (#07080D) with atmospheric violet radial glow.
 * 3. Transparent glassmorphism content panel.
 * 4. Word-by-word staggered typographical entrance using VengeanceUI StaggerText.
 * 5. Sequential stagger across service lines triggered when scrolled into view.
 * 6. Interactive hover transitions with electric lavender accents and arrow cues.
 */
export default function AboutCapabilitiesSection() {
  return (
    <section
      aria-label="What We Build"
      className="relative w-full min-h-[580px] lg:min-h-[640px] flex flex-col justify-center overflow-hidden bg-[#07080D] text-[#F5F4FF] py-20 lg:py-28"
      style={{
        backgroundColor: "#07080D",
      }}
    >
      {/* 1. Subtle Atmospheric Violet Glow & Whisper Grid matching TAVQO Homepage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[550px] rounded-full blur-[150px] opacity-25"
          style={{
            background:
              "radial-gradient(circle, #5268FF 0%, #7764F8 40%, transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* 2. Transparent Glassmorphism Panel for the Content */}
      <div className="relative z-10 w-full min-h-[420px] px-6 sm:px-12 lg:px-[70px] py-12 lg:py-[55px] bg-white/[0.025] backdrop-blur-2xl border-y border-white/[0.08] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.06)]">
        <div className="w-full flex flex-col md:flex-row items-start">
          {/* LEFT COLUMN: ~25% Width */}
          <div className="w-full md:w-[25%] shrink-0 mb-8 md:mb-0">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-sans font-normal text-[15px] sm:text-[16px] lg:text-[17px] text-white/90 tracking-normal block"
            >
              What We Build
            </motion.span>
          </div>

          {/* RIGHT COLUMN: ~75% Width — Aligned to Left Edge */}
          <div className="w-full md:w-[75%] flex flex-col items-start">
            {/* Service List with StaggerText word-by-word animation */}
            <div className="flex flex-col items-start space-y-2 sm:space-y-2.5 lg:space-y-3 text-[26px] sm:text-[32px] lg:text-[36px] xl:text-[38px] font-normal text-white leading-[1.05] tracking-[-0.025em]">
              {SERVICES_LIST.map((service, idx) => (
                <div key={service} className="w-full">
                  <a
                    href="/#services"
                    className="group inline-flex items-center gap-3 text-white hover:text-[#A596FF] hover:translate-x-2.5 transition-all duration-200 cursor-pointer"
                  >
                    <span className="service-title-text transition-colors duration-300">
                      <TextAnimation
                        divideBy="word"
                        delay={0.12 + idx * 0.08}
                      >
                        {service}
                      </TextAnimation>
                    </span>
                    <span className="text-xl opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-[#A596FF]">
                      ↗
                    </span>
                  </a>
                </div>
              ))}

              {/* + More Line with StaggerText */}
              <div className="w-full">
                <span className="inline-block text-white/40 cursor-default select-none pt-0.5">
                  <TextAnimation
                    divideBy="word"
                    delay={0.12 + SERVICES_LIST.length * 0.08}
                  >
                    + More
                  </TextAnimation>
                </span>
              </div>
            </div>

            {/* Small White Pill Services Button */}
            <div className="mt-8 sm:mt-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + (SERVICES_LIST.length + 1) * 0.08,
                }}
              >
                <a
                  href="/#services"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#07080D] hover:bg-[#F5F4FF] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] active:scale-95 text-[13px] font-semibold tracking-normal transition-all duration-150 shadow-md cursor-pointer"
                >
                  <span>Services</span>
                  <span className="text-sm leading-none">↗</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

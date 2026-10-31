import { motion } from "framer-motion";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

/**
 * Section 2: Contact Information + Inquiry Form
 * Two-column visually balanced layout enhanced with 3D perspective transitions.
 */
export default function ContactSection() {
  return (
    <section
      id="contact-form-section"
      aria-label="Contact Information and Project Inquiry Form"
      className="relative w-full py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-[6.5vw] bg-[#08090D] text-[#F4F3FA] overflow-hidden select-text border-t border-white/[0.08]"
    >
      {/* =================================================================== */}
      {/* BACKGROUND ACCENTS & ANIMATED VIOLET AMBIENT GLOWS (NO 3D OBJECTS)  */}
      {/* =================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
      >
        {/* Soft violet spotlight drifting behind form */}
        <div
          className="absolute top-1/3 -right-20 w-[650px] h-[650px] rounded-full blur-[140px] opacity-25 animate-violet-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(130, 117, 255, 0.24) 0%, rgba(23, 21, 47, 0.45) 50%, transparent 75%)",
          }}
        />

        {/* Ambient indigo wash drifting behind info column */}
        <div
          className="absolute bottom-10 -left-20 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 animate-indigo-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(82, 104, 255, 0.20) 0%, rgba(23, 21, 47, 0.35) 55%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[1360px] mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Contact Information (Col span 5 on desktop) */}
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>

          {/* RIGHT SIDE: Contact Form (Col span 7 on desktop) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </motion.div>
    </section>
  );
}

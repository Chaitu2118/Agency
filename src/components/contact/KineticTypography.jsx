import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * KineticTypography Component
 * Provides clean, masked editorial text reveals with staggered word animation.
 * Zero blur filters, zero 3D projective degradation — ensuring 100% razor-sharp typography.
 * Works with Manrope bold and Instrument Serif italic seamlessly.
 */
export default function KineticTypography({
  children,
  className = "",
  delay = 0,
  stagger = 0.05,
  once = true,
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once, margin: "0px 0px -5% 0px" });
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // If plain string, split into words
  const isString = typeof children === "string";
  const words = isString ? children.split(" ") : null;

  if (reducedMotion) {
    return <span className={className}>{children}</span>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: "100%",
    },
    visible: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  if (isString) {
    return (
      <motion.span
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`inline-block ${className}`}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-top mr-[0.24em] last:mr-0 pb-1"
          >
            <motion.span
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    );
  }

  // If children is complex JSX (e.g. combination of Manrope & Instrument Serif spans)
  return (
    <motion.span
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

/**
 * KineticWord Component
 * Individual word item for custom compound headings.
 */
export function KineticWord({
  children,
  className = "",
  delay = 0,
}) {
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: "100%",
    },
    visible: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <span className="inline-block overflow-hidden align-top pb-1">
      <motion.span
        variants={wordVariants}
        className={`inline-block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

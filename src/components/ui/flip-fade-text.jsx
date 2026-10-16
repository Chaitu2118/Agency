"use client";

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const defaultWords = ["LOADING", "COMPUTING", "SEARCHING", "RETRIEVING", "ASSEMBLING"];

// Memoized Letter component for performance
const Letter = memo(function Letter({
  char,
  index,
  total,
  letterDuration,
  renderChar,
  letterClassName,
  letterStyle,
}) {
  return (
    <motion.span
      style={{ transformStyle: "preserve-3d", ...letterStyle }}
      variants={{
        initial: {
          rotateX: 90,
          y: 12,
          opacity: 0,
          filter: "blur(4px)",
        },
        animate: {
          rotateX: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            duration: letterDuration,
            ease: [0.16, 1, 0.3, 1],
          },
        },
        exit: {
          rotateX: -90,
          y: -12,
          opacity: 0,
          filter: "blur(4px)",
          transition: {
            duration: letterDuration * 0.67,
            ease: "easeIn",
          },
        },
      }}
      className={cn("inline-block", letterClassName)}
    >
      {renderChar ? renderChar(char, index, total) : char}
    </motion.span>
  );
});

// Memoized Word component for performance
const Word = memo(function Word({
  text,
  staggerDelay,
  exitStaggerDelay,
  letterDuration,
  textClassName,
  renderChar,
  letterClassName,
  letterStyle,
}) {
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <motion.div
      className={cn(
        "flex items-center justify-center select-none",
        textClassName ||
          "gap-[0.1em] text-4xl md:text-6xl font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-100"
      )}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 1 },
        animate: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
        exit: {
          opacity: 1,
          transition: {
            staggerChildren: exitStaggerDelay,
          },
        },
      }}
    >
      {letters.map((char, i) => (
        <Letter
          key={`${char}-${i}`}
          char={char}
          index={i}
          total={letters.length}
          letterDuration={letterDuration}
          renderChar={renderChar}
          letterClassName={letterClassName}
          letterStyle={
            typeof letterStyle === "function"
              ? letterStyle(char, i, letters.length)
              : letterStyle
          }
        />
      ))}
    </motion.div>
  );
});

export function FlipFadeText({
  words = defaultWords,
  interval = 2500,
  className,
  textClassName,
  letterDuration = 0.6,
  staggerDelay = 0.1,
  exitStaggerDelay = 0.05,
  renderChar,
  letterClassName,
  letterStyle,
  style,
}) {
  const [index, setIndex] = useState(0);

  // Memoize the interval callback
  const updateIndex = useCallback(() => {
    if (words.length <= 1) return;
    setIndex((prev) => (prev + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = setInterval(updateIndex, interval);
    return () => clearInterval(timer);
  }, [updateIndex, interval, words.length]);

  // Memoize the current word
  const currentWord = useMemo(() => words[index] || words[0] || "", [words, index]);

  return (
    <div
      className={cn("flex items-center justify-center", className || "min-h-[200px]")}
      style={style}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence mode="wait">
          <Word
            key={currentWord}
            text={currentWord}
            staggerDelay={staggerDelay}
            exitStaggerDelay={exitStaggerDelay}
            letterDuration={letterDuration}
            textClassName={textClassName}
            renderChar={renderChar}
            letterClassName={letterClassName}
            letterStyle={letterStyle}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FlipFadeText;

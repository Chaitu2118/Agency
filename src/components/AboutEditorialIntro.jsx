/**
 * AboutEditorialIntro Component
 * Spacious editorial introduction section positioned immediately below the About hero.
 * Features a warm ivory background (#F3F0E8), generous whitespace,
 * a prominent upper-left headline, two balanced text columns, and an action CTA.
 */
export default function AboutEditorialIntro() {
  return (
    <section
      aria-label="About TAVQO Introduction"
      className="relative w-full py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-12"
      style={{
        backgroundColor: "#F3F0E8",
        color: "#141416",
      }}
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Prominent Heading near Upper-Left */}
        <div className="mb-10 sm:mb-14 lg:mb-16">
          <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-[38px] uppercase tracking-[-0.025em] text-[#141416] leading-[1.15]">
            A CREATIVE TECHNOLOGY STUDIO.
          </h2>
        </div>

        {/* Two-Column Descriptive Text Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          {/* Column 1: First Paragraph + CTA */}
          <div className="flex flex-col items-start justify-between">
            <p className="font-sans text-[15px] sm:text-[16px] lg:text-[17px] text-[#383840] font-normal leading-[1.75] sm:leading-[1.8]">
              TAVQO brings together design, technology and engineering to turn ideas into meaningful digital experiences. We work across websites, applications and digital products, creating solutions around real business needs.
            </p>

            {/* CTA Button below Column 1 */}
            <div className="mt-8 sm:mt-10 lg:mt-12">
              <a
                href="/#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#141416] text-[#F3F0E8] hover:bg-[#2B2B32] active:scale-[0.98] font-sans text-xs sm:text-[13.5px] font-medium tracking-wide transition-all duration-200 group shadow-xs cursor-pointer"
              >
                <span>Explore Our Work</span>
                <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Column 2: Second Paragraph */}
          <div>
            <p className="font-sans text-[15px] sm:text-[16px] lg:text-[17px] text-[#383840] font-normal leading-[1.75] sm:leading-[1.8]">
              From shaping an initial concept to developing and delivering a complete solution, we focus on thoughtful design, reliable engineering and technology that creates practical value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


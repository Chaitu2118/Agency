import { ImageTrail } from "@/components/ui/image-trail";

import iridescentFace from "../../assets/Iridescent Chrome Face in Profile.png";
import geometricPlaza from "../../assets/Geometric Plaza Shadows and Suited Figures.png";
import swirlingInk from "../../assets/Swirling Amber and Teal Ink Clouds.png";
import blueResinHand from "../../assets/Glossy Blue Resin on Black Hand.png";
import goldenDunes from "../../assets/Golden Dunes of Light and Shadow.png";
import abstractPaint from "../../assets/jene-stephaniuk--MCrF6hnojU-unsplash.jpg";
import marbleExplosion from "../../assets/soraya-silvestri-LmC65WoT3Rk-unsplash.jpg";

const trailImages = [
  { src: iridescentFace, alt: "Iridescent Chrome Profile" },
  { src: geometricPlaza, alt: "Architectural Suited Figures" },
  { src: swirlingInk, alt: "Swirling Amber and Teal Ink" },
  { src: blueResinHand, alt: "Glossy Blue Resin Hand" },
  { src: goldenDunes, alt: "Golden Dunes of Light" },
  { src: abstractPaint, alt: "Vibrant Abstract Artwork" },
  { src: marbleExplosion, alt: "Fluid Monochrome Marble" },
];

export default function ValuePropositionTrail() {
  return (
    <section
      id="value-clarity"
      className="relative z-20 w-full min-h-screen bg-[#000000] text-white overflow-hidden select-text border-t border-white/10 -mt-[100vh]"
      style={{
        backgroundColor: "#000000",
      }}
    >
      <ImageTrail
        images={trailImages}
        threshold={74}
        minDelay={45}
        duration={1100}
        maxItems={9}
        rotationRange={34}
        imageClassName="w-32 rounded-xl md:w-44 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/20"
        className="flex min-h-[640px] sm:min-h-[740px] lg:min-h-[820px] items-center justify-center bg-[#000000] py-28 sm:py-36 px-6 sm:px-10 lg:px-16"
      >
        <div className="max-w-[880px] mx-auto text-center pointer-events-none">
          <p className="font-sans text-[22px] sm:text-[30px] md:text-[38px] lg:text-[44px] font-normal text-white leading-[1.32] tracking-[-0.02em] select-none">
            Before we think about layouts, animations,
            <br className="hidden sm:inline" /> or colors, we get clear on what
            makes your
            <br className="hidden sm:inline" /> company valuable — and what buyers
            need
            <br className="hidden sm:inline" /> to understand before they'll choose
            you.
          </p>
        </div>
      </ImageTrail>
    </section>
  );
}

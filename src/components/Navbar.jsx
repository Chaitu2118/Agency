import { NotchNavbar } from "@/components/ui/notch-navbar";
import TheTavqoLogo from "./TheTavqoLogo";

export default function Navbar({ isRevealed = true, onReplayIntro }) {
  return (
    <NotchNavbar
      className={`transition-all duration-700 ease-out ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
      logo={
        <a
          href="/"
          onClick={(e) => {
            if (onReplayIntro) {
              e.preventDefault();
              onReplayIntro();
            }
          }}
          title="The Tavqo — Click to replay intro"
          className="group flex items-center focus-visible:outline-none"
        >
          <div
            id="tavqo-nav-logo"
            className="h-7 sm:h-8 w-[130px] sm:w-[155px] flex items-center"
          >
            <TheTavqoLogo className="w-full h-full object-contain" />
          </div>
        </a>
      }
    />
  );
}
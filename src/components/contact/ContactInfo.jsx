import { useState } from "react";
import { Mail, MapPin, Sparkles, Copy, Check, ShieldCheck, ArrowUpRight } from "lucide-react";
import KineticTypography, { KineticWord } from "./KineticTypography";

/**
 * Clean SVG Social Icons matching TAVQO Footer system
 */
function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/**
 * Left Side – Contact Information Component
 * Displays TAVQO direct contact points, studio location, availability, and social links.
 * Enhanced with 3D Kinetic Typography and 3D Tilt perspective depth.
 */
export default function ContactInfo() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@tavqo.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/tavqo",
      icon: <LinkedinIcon className="w-4 h-4" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/tavqo.studio",
      icon: <InstagramIcon className="w-4 h-4" />,
    },
    {
      name: "X",
      href: "https://x.com/tavqostudio",
      icon: <XIcon className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full space-y-10 lg:pr-6">
      <div>
        

        {/* 3D Kinetic Heading */}
        <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] tracking-tight text-[#F4F3FA] leading-[1.12]">
          <KineticTypography delay={0.1} stagger={0.06}>
            <KineticWord className="mr-[0.24em]">Let&apos;s</KineticWord>
            <KineticWord className="mr-[0.24em]">start</KineticWord>
            <KineticWord className="mr-[0.24em]">a</KineticWord>
            <KineticWord className="font-instrument italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C7C0FF] to-[#8275FF]">
              conversation.
            </KineticWord>
          </KineticTypography>
        </h2>

        {/* Contact Cards Grid */}
        <div className="space-y-4 mt-8 sm:mt-10">
          
          {/* 1. Email Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#10111B]/70 border border-white/[0.1] hover:border-[#8275FF]/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_15px_35px_rgba(130,117,255,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#8275FF]/10 border border-[#8275FF]/25 flex items-center justify-center text-[#8275FF] shrink-0 mt-0.5 shadow-sm transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#9696A8]">
                    Direct Email
                  </span>
                  <a
                    href="mailto:hello@tavqo.com"
                    className="font-sans text-[16px] sm:text-[17px] font-semibold text-[#F4F3FA] hover:text-[#8275FF] transition-colors mt-0.5 block"
                  >
                    hello@tavqo.com
                  </a>
                </div>
              </div>

              {/* Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="shrink-0 p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#9696A8] hover:text-[#F4F3FA] border border-white/[0.08] hover:border-white/[0.2] transition-all cursor-pointer active:scale-95"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-[#8275FF]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* 2. Studio Location Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#10111B]/70 border border-white/[0.1] hover:border-[#8275FF]/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_15px_35px_rgba(130,117,255,0.18)]">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#8275FF]/10 border border-[#8275FF]/25 flex items-center justify-center text-[#8275FF] shrink-0 mt-0.5 shadow-sm transition-colors duration-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#9696A8]">
                  Studio Location
                </span>
                <span className="font-sans text-[16px] sm:text-[17px] font-semibold text-[#F4F3FA] mt-0.5 block">
                  Hyderabad, India
                </span>
              </div>
            </div>
          </div>

          {/* 3. Availability Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#10111B]/70 border border-white/[0.1] hover:border-[#8275FF]/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_15px_35px_rgba(130,117,255,0.18)]">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#8275FF]/10 border border-[#8275FF]/25 flex items-center justify-center text-[#8275FF] shrink-0 mt-0.5 shadow-sm transition-colors duration-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#9696A8]">
                  Current Status
                </span>
                <div className="mt-0.5">
                  <span className="font-sans text-[16px] sm:text-[17px] font-semibold text-[#F4F3FA]">
                    Open for new projects
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Social Links & Trust Footer */}
      <div className="pt-6 border-t border-white/[0.08] space-y-6">
        <div>
          <span className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#9696A8] block mb-3">
            Connect on social networks
          </span>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#10111B] border border-white/[0.1] text-[#9696A8] hover:text-white hover:border-[#8275FF]/60 hover:bg-[#8275FF]/10 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(130,117,255,0.15)] text-xs font-sans font-medium"
                aria-label={`Visit TAVQO on ${social.name}`}
              >
                <span>{social.icon}</span>
                <span>{social.name}</span>
                <ArrowUpRight className="w-3 h-3 text-[#5A5A6E] group-hover:text-[#8275FF] transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* NDA / Trust Note */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[#9696A8] hover:border-white/[0.12] transition-colors">
          <ShieldCheck className="w-4 h-4 text-[#8275FF] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#F4F3FA] font-medium">Strict Confidentiality:</strong> Non-disclosure agreements (NDAs) are signed prior to reviewing proprietary designs or codebases.
          </p>
        </div>
      </div>
    </div>
  );
}

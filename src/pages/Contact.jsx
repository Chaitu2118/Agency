import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import ClayRobot from "../components/ClayRobot";
import { Mail, Copy, Check, Upload, FileText, X, ArrowRight, Loader2 } from "lucide-react";

/**
 * TAVQO — Contact Us Page
 * Connected Editorial Composition:
 * - Left side: Large headline "Let's Build What's Next.", description and direct email CTA
 *   positioned ~8% from left edge, vertically aligned around upper-middle viewport.
 * - Upper centre-right: Interactive 3D ClayRobot with transparent background (no black box),
 *   slightly overlapping the top edge of the form.
 * - Lower centre-right: Large transparent glassmorphic contact form panel (850–1000px wide,
 *   subtle transparent glass, thin border, soft ambient violet glow, 28–36px rounded corners).
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    organisation: "",
    email: "",
    role: "",
    message: "",
  });
  const [attachment, setAttachment] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  // Document metadata for Contact page
  useEffect(() => {
    document.title = "Contact TAVQO — Let's Build What's Next";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Have an idea, a challenge, or a product in mind? Contact TAVQO Creative Technology Studio. We'd love to explore what we can build together."
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setAttachment(file);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@thetavqo.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreedToTerms) return;

    setIsSubmitting(true);
    // Real submission simulation / webhook connection point
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      organisation: "",
      email: "",
      role: "",
      message: "",
    });
    setAttachment(null);
    setAgreedToTerms(false);
    setSubmitted(false);
  };

  return (
    <div
      className="relative min-h-screen text-[#F5F4FF] overflow-x-hidden selection:bg-[#5268FF]/30 selection:text-white"
      style={{
        backgroundColor: "#050508",
      }}
    >
      {/* 1. Global Navigation */}
      <Navbar currentRoute="contact" isRevealed={true} />

      {/* =================================================================== */}
      {/* HOMEPAGE-MATCHING ATMOSPHERIC ILLUMINATION & VOLUMETRIC SPOTLIGHT   */}
      {/* =================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
      >
        {/* Concentrated upper-left volumetric spotlight beam with smooth falloff */}
        <div
          className="absolute -top-[10%] -left-[6%] w-[38vw] h-[70vh] max-w-[560px]"
          style={{
            background:
              "conic-gradient(from 125deg at 0% 0%, transparent 0deg, rgba(81, 71, 255, 0.60) 12deg, rgba(165, 155, 255, 0.85) 24deg, rgba(81, 71, 255, 0.35) 36deg, transparent 48deg)",
            filter: "blur(32px)",
            transform: "rotate(-10deg)",
            transformOrigin: "0% 0%",
            opacity: 0.65,
          }}
        />

        {/* Core bright light streak entering from top-left */}
        <div
          className="absolute -top-[3%] -left-[3%] w-[26vw] h-[48vh] max-w-[380px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(142, 131, 255, 0.70) 22%, rgba(81, 71, 255, 0.25) 48%, transparent 70%)",
            filter: "blur(18px)",
            transform: "rotate(-5deg)",
            transformOrigin: "0% 0%",
            opacity: 0.60,
          }}
        />

        {/* Subtle indigo atmosphere matching homepage */}
        <div
          className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full blur-[100px] opacity-25"
          style={{
            background:
              "radial-gradient(circle, #382ad8 0%, #130f42 55%, transparent 75%)",
          }}
        />

        {/* Soft violet ambient glow behind the centre-right form area */}
        <div
          className="absolute top-[30%] right-[10%] w-[580px] h-[580px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(130, 117, 255, 0.45) 0%, rgba(81, 69, 217, 0.15) 50%, transparent 75%)",
          }}
        />

        {/* Edge falloff vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 92% 88% at 50% 50%, transparent 55%, rgba(5, 5, 8, 0.75) 100%)",
          }}
        />

        {/* Cinematic SVG film grain texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
        >
          <filter id="contact-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#contact-grain)" />
        </svg>
      </div>

      {/* =================================================================== */}
      {/* MAIN CONNECTED COMPOSITION                                          */}
      {/* =================================================================== */}
      <main className="relative z-10 w-full max-w-[1620px] mx-auto px-6 sm:px-10 lg:pl-[8vw] lg:pr-10 xl:pr-12 pt-32 sm:pt-36 lg:pt-36 pb-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-14 xl:gap-16">

          {/* =============================================================== */}
          {/* 1. LEFT-SIDE CONTENT — Positioned ~8% from left edge,            */}
          {/*    vertically aligned around upper-middle viewport               */}
          {/* =============================================================== */}
          <div className="w-full lg:w-[36%] xl:w-[34%] shrink-0 lg:sticky lg:top-36 xl:top-40 flex flex-col justify-start">

            {/* Large Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-medium tracking-tight text-white leading-[1.08] mb-6">
              Let&apos;s Build What&apos;s{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B5A1FF] via-[#8275FF] to-[#6049E2]">
                Next.
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#9696A8] text-base sm:text-lg leading-relaxed max-w-md xl:max-w-lg mb-8 font-light">
              Have an idea, a challenge, or a product in mind? Tell us what you&apos;re looking to build. We&apos;d love to explore it with you.
            </p>

            {/* Direct Email Address CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-white/40">Email us on:</span>
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#8275FF]/60 hover:bg-white/[0.05] transition-all group">
                <Mail className="w-4 h-4 text-[#8275FF] shrink-0" />
                <a
                  href="mailto:hello@thetavqo.com"
                  className="text-sm font-medium text-white hover:text-[#B5A1FF] transition-colors"
                >
                  hello@thetavqo.com
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="ml-1.5 p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              {copied && (
                <span className="text-xs text-emerald-400 font-mono transition-opacity">
                  Copied!
                </span>
              )}
            </div>

          </div>

          {/* =============================================================== */}
          {/* 2. CENTRE-RIGHT REGION — Robot Above + Transparent Form Panel   */}
          {/* =============================================================== */}
          <div className="w-full lg:w-[64%] xl:w-[66%] flex flex-col items-center lg:items-end">

            {/* ------------------------------------------------------------- */}
            {/* UPPER CENTRE-RIGHT: Interactive ClayRobot                     */}
            {/* 100% Transparent WebGL background, no black box,              */}
            {/* slightly overlapping the top edge of the contact form panel.  */}
            {/* ------------------------------------------------------------- */}
            <div className="relative z-20 w-[300px] sm:w-[340px] lg:w-[380px] h-[280px] sm:h-[310px] lg:h-[330px] -mb-12 sm:-mb-14 lg:-mb-16 pointer-events-auto select-none mx-auto lg:mr-16 xl:mr-24 bg-transparent">
              <ClayRobot
                transparent={true}
                walk={false}
                animate={true}
                blink={true}
                wave={true}
                scale={108}
                response={{
                  track: "page",
                  headTurn: 8,
                  eyeTravel: 6,
                  followSpeed: 6,
                  hop: 6,
                }}
                background={{
                  top: "transparent",
                  bottom: "transparent",
                  shadow: "#141126",
                  shadowDepth: 35,
                }}
                colors={{
                  clay: "#B5A1FF",
                  eyes: "#FFFFFF",
                  visor: "#22225E",
                }}
              />
            </div>

            {/* ------------------------------------------------------------- */}
            {/* LOWER CENTRE-RIGHT: Transparent Glassmorphic Contact Form     */}
            {/* Width: 850–1000px, transparent glassmorphism, thin violet     */}
            {/* border, soft violet ambient glow, 28–36px rounded corners.    */}
            {/* ------------------------------------------------------------- */}
            <div className="relative z-10 w-full max-w-[850px] lg:max-w-[940px] xl:max-w-[1000px]">
              {/* Soft violet ambient glow behind the panel */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 sm:-inset-3 rounded-[32px] lg:rounded-[36px] bg-[radial-gradient(ellipse_at_top,_rgba(130,117,255,0.18)_0%,_rgba(81,69,217,0.05)_50%,_transparent_75%)] blur-xl pointer-events-none -z-10"
              />

              {/* Main Transparent Glass Panel */}
              <div className="relative rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] bg-white/[0.025] backdrop-blur-2xl border border-white/10 hover:border-[#8275FF]/30 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)] p-7 sm:p-10 lg:p-12 xl:p-14 overflow-hidden transition-colors">
                {/* Precision top edge violet accent light */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8275FF]/60 to-transparent pointer-events-none" />

                {submitted ? (
                  /* Submission Confirmation */
                  <div className="py-12 sm:py-16 px-4 sm:px-8 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                      Thank You for Reaching Out
                    </h3>
                    <p className="text-[#9696A8] text-sm sm:text-base leading-relaxed max-w-md mb-8">
                      We&apos;ve received your inquiry and project details. A partner from the TAVQO team will review them and get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* Main Contact Form */
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                    <div>
                      <h2 className="text-2xl sm:text-[1.75rem] font-medium text-white mb-2">
                        Tell us about your project
                      </h2>
                      <p className="text-xs sm:text-sm text-[#9696A8] font-light">
                        Fill out the form below and we&apos;ll get back to you with insights and next steps.
                      </p>
                    </div>

                    {/* Row 1: Name and Organisation (Two Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                          Your Name <span className="text-[#8275FF]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter Your Name "
                          className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-[#8275FF] focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-[#8275FF]/50 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                          Organisation / Company
                        </label>
                        <input
                          type="text"
                          name="organisation"
                          value={formData.organisation}
                          onChange={handleInputChange}
                          placeholder="Enter your Organization/Company name"
                          className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-[#8275FF] focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-[#8275FF]/50 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email and Role Dropdown (Two Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                          Email Address <span className="text-[#8275FF]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="enter your email address"
                          className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-[#8275FF] focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-[#8275FF]/50 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                          Your Role <span className="text-[#8275FF]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="role"
                            required
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-[#8275FF] focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-[#8275FF]/50 rounded-xl px-4 py-3.5 text-white text-sm transition-all appearance-none cursor-pointer pr-10"
                          >
                            <option value="" disabled className="text-white/40 bg-[#090A12]">
                              Select your role...
                            </option>
                            <option value="Founder / Executive" className="bg-[#090A12] text-white">
                              Founder / Executive
                            </option>
                            <option value="Product Lead / Manager" className="bg-[#090A12] text-white">
                              Product Lead / Manager
                            </option>
                            <option value="Engineering / Technical Director" className="bg-[#090A12] text-white">
                              Engineering / Technical Director
                            </option>
                            <option value="Design / Creative Director" className="bg-[#090A12] text-white">
                              Design / Creative Director
                            </option>
                            <option value="Brand / Marketing Director" className="bg-[#090A12] text-white">
                              Brand / Marketing Director
                            </option>
                            <option value="Investor / Partner" className="bg-[#090A12] text-white">
                              Investor / Partner
                            </option>
                            <option value="Other" className="bg-[#090A12] text-white">
                              Other
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Optional Project Brief Attachment */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                        Project Brief / Attachment (optional)
                      </label>
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border border-dashed rounded-xl p-4 transition-all cursor-pointer text-center ${isDragging
                          ? "border-[#8275FF] bg-[#8275FF]/10"
                          : "border-white/10 hover:border-white/25 bg-white/[0.015] hover:bg-white/[0.03]"
                          }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          onChange={handleFileSelect}
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                        />
                        {attachment ? (
                          <div className="flex items-center justify-between px-2 py-1">
                            <div className="flex items-center gap-2.5 text-left truncate">
                              <FileText className="w-4 h-4 text-[#8275FF] shrink-0" />
                              <div className="truncate">
                                <p className="text-xs font-medium text-white truncate">{attachment.name}</p>
                                <p className="text-[10px] text-white/40 font-mono">
                                  {(attachment.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setAttachment(null);
                              }}
                              className="p-1 hover:text-red-400 text-white/40 transition-colors"
                              title="Remove file"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-2.5">
                            <Upload className="w-5 h-5 text-white/40 mb-1.5" />
                            <p className="text-xs text-white/70">
                              <span className="text-[#8275FF] font-medium">Upload project brief</span> or drag and drop
                            </p>
                            <p className="text-[10px] text-white/40 font-mono mt-0.5">
                              PDF, DOC, PNG, JPG or ZIP up to 25MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Row 4: Message Textarea */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                        Message <span className="text-[#8275FF]">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Share details about your objectives, timeline, scope, or challenges..."
                        className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-[#8275FF] focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-[#8275FF]/50 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm transition-all resize-none"
                      />
                    </div>

                    {/* Row 5: Terms & Privacy Checkbox */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer group select-none">
                        <input
                          type="checkbox"
                          required
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-[#8275FF] focus:ring-[#8275FF] focus:ring-offset-0 cursor-pointer accent-[#8275FF]"
                        />
                        <span className="text-xs text-[#9696A8] leading-normal group-hover:text-white/80 transition-colors">
                          I agree to the processing of personal data in accordance with TAVQO&apos;s Privacy Policy.
                        </span>
                      </label>
                    </div>

                    {/* Row 6: Send Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting || !agreedToTerms}
                        className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#6049E2] via-[#8275FF] to-[#6049E2] bg-[length:200%_auto] hover:bg-right transition-all duration-500 py-4 px-6 text-white text-sm font-medium shadow-[0_4px_24px_rgba(130,117,255,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending Message...
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2">
                            <span>Send Message</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Studio Footer */}
      <footer className="relative z-20 w-full py-10 px-6 sm:px-10 lg:px-[6.5vw] bg-[#040508] border-t border-white/[0.08] text-white/60 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 font-mono mt-12 sm:mt-16 lg:mt-24">
        <div className="flex items-center gap-3">
          <span className="text-white font-sans font-bold tracking-[0.2em]">TΛVQO</span>
          <span className="text-white/20">|</span>
          <span>© {new Date().getFullYear()} TAVQO STUDIO. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex items-center gap-6 text-[#8E8EA0] uppercase tracking-wider text-[11px]">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <a href="/about" className="hover:text-white transition-colors">About</a>
          <a href="/#services" className="hover:text-white transition-colors">Services</a>
          <a href="/contact" className="text-white font-bold transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}

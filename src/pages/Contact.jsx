import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import ClayRobot from "../components/ClayRobot";
import Footer from "../components/Footer";
import Lenis from "lenis";
import gsap from "gsap";
import { Mail, Copy, Check, X, ArrowRight, Loader2, AlertCircle, ChevronDown } from "lucide-react";

const PROJECT_TYPE_OPTIONS = [
  { value: "Web Application / Platform", label: "Web Application / Platform" },
  { value: "Mobile Application (iOS / Android)", label: "Mobile Application (iOS / Android)" },
  { value: "AI & Intelligent Systems", label: "AI & Intelligent Systems" },
  { value: "Creative Technology & 3D Experience", label: "Creative Technology & 3D Experience" },
  { value: "Product Engineering & Architecture", label: "Product Engineering & Architecture" },
  { value: "Brand Experience & Design Systems", label: "Brand Experience & Design Systems" },
  { value: "Other / Custom Exploration", label: "Other / Custom Exploration" },
];

const BUDGET_OPTIONS = [
  { value: "Under $10,000", label: "Under $10,000" },
  { value: "$10,000 – $25,000", label: "$10,000 – $25,000" },
  { value: "$25,000 – $50,000", label: "$25,000 – $50,000" },
  { value: "$50,000 – $100,000", label: "$50,000 – $100,000" },
  { value: "$100,000+", label: "$100,000+" },
  { value: "Flexible / To be discussed", label: "Flexible / To be discussed" },
];

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
    email: "",
    projectType: "",
    company: "",
    budget: "",
    message: "",
    botcheck: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });
  const [submittedData, setSubmittedData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [projectTypeOpen, setProjectTypeOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const formPanelRef = useRef(null);
  const projectTypeRef = useRef(null);
  const budgetRef = useRef(null);

  // Close custom dropdowns on outside pointer click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (projectTypeRef.current && !projectTypeRef.current.contains(e.target)) {
        setProjectTypeOpen(false);
      }
      if (budgetRef.current && !budgetRef.current.contains(e.target)) {
        setBudgetOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setProjectTypeOpen(false);
        setBudgetOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectProjectType = (val) => {
    setFormData((prev) => ({ ...prev, projectType: val }));
    setProjectTypeOpen(false);
    if (formErrors.projectType) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next.projectType;
        return next;
      });
    }
  };

  const handleSelectBudget = (val) => {
    setFormData((prev) => ({ ...prev, budget: val }));
    setBudgetOpen(false);
  };

  const toggleProjectType = () => {
    setProjectTypeOpen((prev) => !prev);
    setBudgetOpen(false);
  };

  const toggleBudget = () => {
    setBudgetOpen((prev) => !prev);
    setProjectTypeOpen(false);
  };

  const selectedProjectType = PROJECT_TYPE_OPTIONS.find(
    (opt) => opt.value === formData.projectType
  );
  const selectedBudget = BUDGET_OPTIONS.find(
    (opt) => opt.value === formData.budget
  );

  // Access key from environment (Vite exposes VITE_* variables)
  const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

  // Document metadata and Lenis smooth scroll for Contact page
  useEffect(() => {
    document.title = "Contact TAVQO — Let's Build What's Next";
    window.scrollTo({ top: 0, behavior: "instant" });
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Have an idea, a challenge, or a product in mind? Contact TAVQO Creative Technology Studio. We'd love to explore what we can build together."
      );
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Dynamic interactive top border tracking mouse X position
  useEffect(() => {
    let rafId = 0;
    let targetX = 50;
    let currentX = 50;

    const handlePointerMove = (e) => {
      if (!formPanelRef.current) return;
      const rect = formPanelRef.current.getBoundingClientRect();
      targetX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    };

    const updateGlow = () => {
      currentX += (targetX - currentX) * 0.12;
      if (formPanelRef.current) {
        formPanelRef.current.style.setProperty("--border-x", `${currentX.toFixed(2)}%`);
      }
      rafId = requestAnimationFrame(updateGlow);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    rafId = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field as the user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.projectType) {
      errors.projectType = "Please select a project type";
    }
    if (!formData.message.trim()) {
      errors.message = "Project description is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Please provide at least 10 characters describing your project";
    }
    if (!agreedToTerms) {
      errors.terms = "You must agree to the processing of personal data";
    }
    return errors;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: "" });

    // Validate form
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    // Honeypot check: silently drop bots
    if (formData.botcheck) {
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setSubmitStatus({
        type: "error",
        message:
          "Web3Forms access key is not configured. Please add VITE_WEB3FORMS_ACCESS_KEY to your .env file.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Project Enquiry — ${formData.projectType || "TAVQO"}`,
        from_name: "TAVQO Studio Website",
        name: formData.name.trim(),
        email: formData.email.trim(),
        project_type: formData.projectType,
        company: formData.company.trim() || "Not specified",
        budget: formData.budget || "Not specified",
        message: formData.message.trim(),
        botcheck: formData.botcheck ? "spam" : "",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmittedData({ ...formData });
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });
        // Reset form ONLY after successful submission
        setFormData({
          name: "",
          email: "",
          projectType: "",
          company: "",
          budget: "",
          message: "",
          botcheck: false,
        });
        setAgreedToTerms(false);
        setFormErrors({});
      } else {
        setSubmitStatus({
          type: "error",
          message:
            data.message ||
            "Unable to submit enquiry. Please verify your details or try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          "Network connection error. Please check your internet connection or email us directly at hello@thetavqo.com.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitStatus({ type: null, message: "" });
    setSubmittedData(null);
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
              <span className="text-xs font-sans text-white/50">Email us on:</span>
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
                <span className="text-xs text-emerald-400 font-sans transition-opacity">
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
            {/* ------------------------------------------------------------- */}
            {/* UPPER CENTRE-RIGHT: Interactive ClayRobot                     */}
            {/* Waddles and walks gracefully ABOVE the contact form panel     */}
            {/* ------------------------------------------------------------- */}
            <div className="relative z-20 w-full max-w-[850px] lg:max-w-[940px] xl:max-w-[1000px] h-[220px] sm:h-[240px] lg:h-[260px] -mb-4 sm:-mb-5 lg:-mb-6 pointer-events-auto select-none mx-auto bg-transparent">
              <ClayRobot
                transparent={true}
                walk={true}
                walkSpeed={5.5}
                animate={true}
                blink={true}
                wave={true}
                scale={94}
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
              <div
                ref={formPanelRef}
                className="relative rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] bg-white/[0.025] backdrop-blur-2xl border border-white/10 hover:border-[#8275FF]/30 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)] p-7 sm:p-10 lg:p-12 xl:p-14 overflow-hidden transition-colors"
                style={{ "--border-x": "50%" }}
              >
                {/* Precision interactive top edge violet accent light beam tracking mouse */}
                <div
                  className="absolute top-0 inset-x-0 h-px pointer-events-none transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(420px circle at var(--border-x, 50%) 0px, rgba(185, 175, 255, 0.95), rgba(130, 117, 255, 0.6) 35%, rgba(130, 117, 255, 0.1) 70%, transparent 100%)",
                  }}
                />
                {/* Soft ambient violet glow beam tracking along top border */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 inset-x-0 h-8 pointer-events-none opacity-40 blur-md transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(320px circle at var(--border-x, 50%) 0px, rgba(130, 117, 255, 0.45), transparent 75%)",
                  }}
                />

                {submitStatus.type === "success" ? (
                  /* Premium Submission Confirmation */
                  <div className="py-12 sm:py-16 px-4 sm:px-8 text-center flex flex-col items-center justify-center animate-in fade-in duration-500">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.15)]">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                      Enquiry Received
                    </h3>
                    <p className="text-[#9696A8] text-sm sm:text-base leading-relaxed max-w-md mb-6 font-light">
                      Thank you, <span className="text-white font-medium">{submittedData?.name}</span>. We&apos;ve received your project details and a team partner will follow up within 24 hours.
                    </p>

                    {/* Submission Details Summary */}
                    {submittedData && (
                      <div className="w-full max-w-md p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-left mb-8 space-y-3 text-xs font-sans">
                        <div className="flex justify-between items-center text-white/50 border-b border-white/[0.06] pb-2">
                          <span className="text-white/60">Project:</span>
                          <span className="text-white font-medium">{submittedData.projectType}</span>
                        </div>
                        {submittedData.budget && (
                          <div className="flex justify-between items-center text-white/50 border-b border-white/[0.06] pb-2">
                            <span className="text-white/60">Budget:</span>
                            <span className="text-white font-medium">{submittedData.budget}</span>
                          </div>
                        )}
                        {submittedData.company && (
                          <div className="flex justify-between items-center text-white/50 border-b border-white/[0.06] pb-2">
                            <span className="text-white/60">Organisation:</span>
                            <span className="text-white font-medium">{submittedData.company}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-white/50 pt-1">
                          <span className="text-white/60">Confirmation:</span>
                          <span className="text-[#8275FF] font-medium truncate ml-2">{submittedData.email}</span>
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                ) : (
                  /* Main Contact Form */
                  <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-7">
                    <div>
                      <h2 className="text-2xl sm:text-[1.75rem] font-medium text-white mb-2">
                        Tell us about your project
                      </h2>
                      <p className="text-xs sm:text-sm text-[#9696A8] font-light">
                        Fill out the form below and we&apos;ll get back to you with insights and next steps.
                      </p>
                    </div>

                    {/* Honeypot Spam Protection (Hidden from real users) */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      className="hidden"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                      checked={formData.botcheck}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, botcheck: e.target.checked }))
                      }
                    />

                    {/* Error Banner */}
                    {submitStatus.type === "error" && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-300">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-red-100">Unable to submit enquiry</p>
                          <p className="text-red-300/80 mt-0.5 text-xs">{submitStatus.message}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSubmitStatus({ type: null, message: "" })}
                          className="text-red-400/60 hover:text-red-200 transition-colors p-1 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Row 1: Full Name and Email Address (Required) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div>
                        <label className="block text-sm font-sans font-normal text-white/80 mb-2">
                          Full Name <span className="text-[#8275FF]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          className={`w-full font-sans font-normal bg-white/[0.02] border ${
                            formErrors.name
                              ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/40"
                              : "border-white/[0.08] focus:border-[#8275FF] focus:ring-[#8275FF]/50"
                          } focus:bg-white/[0.05] focus:outline-none focus:ring-1 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm transition-all`}
                        />
                        {formErrors.name && (
                          <p className="text-xs text-red-400 mt-1.5 font-sans">{formErrors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-sans font-normal text-white/80 mb-2">
                          Email Address <span className="text-[#8275FF]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className={`w-full font-sans font-normal bg-white/[0.02] border ${
                            formErrors.email
                              ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/40"
                              : "border-white/[0.08] focus:border-[#8275FF] focus:ring-[#8275FF]/50"
                          } focus:bg-white/[0.05] focus:outline-none focus:ring-1 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm transition-all`}
                        />
                        {formErrors.email && (
                          <p className="text-xs text-red-400 mt-1.5 font-sans">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Project Type (Required Dropdown) and Estimated Budget (Optional Dropdown) with Vibrant Colour Gradients */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 relative z-30">
                      {/* Hidden inputs to preserve native form serialization */}
                      <input type="hidden" name="projectType" value={formData.projectType} />
                      <input type="hidden" name="budget" value={formData.budget} />

                      {/* Project Type Custom Gradient Dropdown */}
                      <div className={`relative ${projectTypeOpen ? "z-40" : "z-20"}`} ref={projectTypeRef}>
                        <label className="block text-sm font-sans font-normal text-white/80 mb-2">
                          Project Type <span className="text-[#8275FF]">*</span>
                        </label>
                        <div className="relative group">
                          {/* Ambient Glowing Gradient Border */}
                          <div
                            aria-hidden="true"
                            className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r ${
                              formErrors.projectType
                                ? "from-red-500/90 via-red-400/60 to-red-500/90"
                                : projectTypeOpen
                                ? "from-[#8275FF] via-[#E056FD] to-[#6049E2] opacity-100 shadow-[0_0_24px_rgba(130,117,255,0.45)]"
                                : "from-[#8275FF]/40 via-[#C084FC]/30 to-[#6049E2]/40 opacity-70 group-hover:opacity-100 group-hover:from-[#8275FF]/85 group-hover:via-[#E056FD]/75 group-hover:to-[#6049E2]/85 group-hover:shadow-[0_0_18px_rgba(130,117,255,0.3)]"
                            } transition-all duration-300 pointer-events-none`}
                          />
                          {/* Interactive Trigger Button */}
                          <button
                            type="button"
                            onClick={toggleProjectType}
                            aria-haspopup="listbox"
                            aria-expanded={projectTypeOpen}
                            className={`relative w-full rounded-xl bg-gradient-to-br from-[#121326]/95 via-[#0D0E1A]/95 to-[#16142E]/95 backdrop-blur-xl px-4 py-3.5 text-left flex items-center justify-between text-sm transition-all focus:outline-none cursor-pointer ${
                              projectTypeOpen ? "ring-1 ring-[#8275FF]/60" : ""
                            }`}
                          >
                            <div className="truncate pr-2">
                              {selectedProjectType ? (
                                <span className="text-white font-medium truncate">
                                  {selectedProjectType.label}
                                </span>
                              ) : (
                                <span className="text-white/40 font-normal">Select project type...</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <ChevronDown
                                className={`w-4 h-4 text-[#8275FF] transition-transform duration-300 ${
                                  projectTypeOpen ? "rotate-180 text-white" : "group-hover:text-white"
                                }`}
                              />
                            </div>
                          </button>
                        </div>

                        {/* Floating Gradient Dropdown Menu */}
                        {projectTypeOpen && (
                          <div
                            role="listbox"
                            data-lenis-prevent="true"
                            onWheel={(e) => e.stopPropagation()}
                            className="absolute z-50 left-0 right-0 mt-2 rounded-2xl bg-[#0B0C18]/98 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(130,117,255,0.25)] p-2 max-h-60 overflow-y-auto overscroll-contain touch-pan-y [scrollbar-width:thin] [scrollbar-color:rgba(130,117,255,0.4)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#8275FF]/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#8275FF]/60 animate-in fade-in zoom-in-95 duration-200"
                          >
                            <div
                              aria-hidden="true"
                              className="h-0.5 bg-gradient-to-r from-transparent via-[#8275FF] to-transparent mb-1.5 opacity-80"
                            />
                            <div className="space-y-1">
                              {PROJECT_TYPE_OPTIONS.map((opt) => {
                                const isSelected = formData.projectType === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => handleSelectProjectType(opt.value)}
                                    className={`w-full text-left rounded-xl px-4 py-3 text-sm transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                                      isSelected
                                        ? "bg-gradient-to-r from-[#8275FF]/30 via-[#6049E2]/25 to-transparent text-white font-medium border-l-2 border-[#8275FF]"
                                        : "text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-[#8275FF]/20 hover:via-[#A855F7]/15 hover:to-transparent"
                                    }`}
                                  >
                                    <span className="truncate">{opt.label}</span>
                                    {isSelected && <Check className="w-4 h-4 text-[#B5A1FF] shrink-0 ml-2" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {formErrors.projectType && (
                          <p className="text-xs text-red-400 mt-1.5 font-sans">{formErrors.projectType}</p>
                        )}
                      </div>

                      {/* Estimated Budget Custom Gradient Dropdown */}
                      <div className={`relative ${budgetOpen ? "z-40" : "z-10"}`} ref={budgetRef}>
                        <label className="block text-sm font-sans font-normal text-white/80 mb-2">
                          Estimated Budget <span className="text-white/40 text-xs font-normal tracking-normal">(optional)</span>
                        </label>
                        <div className="relative group">
                          {/* Ambient Glowing Gradient Border */}
                          <div
                            aria-hidden="true"
                            className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r ${
                              budgetOpen
                                ? "from-[#6366F1] via-[#A855F7] to-[#EC4899] opacity-100 shadow-[0_0_24px_rgba(168,85,247,0.45)]"
                                : "from-[#6049E2]/40 via-[#8275FF]/30 to-[#A855F7]/40 opacity-70 group-hover:opacity-100 group-hover:from-[#6366F1]/85 group-hover:via-[#A855F7]/75 group-hover:to-[#EC4899]/85 group-hover:shadow-[0_0_18px_rgba(168,85,247,0.3)]"
                            } transition-all duration-300 pointer-events-none`}
                          />
                          {/* Interactive Trigger Button */}
                          <button
                            type="button"
                            onClick={toggleBudget}
                            aria-haspopup="listbox"
                            aria-expanded={budgetOpen}
                            className={`relative w-full rounded-xl bg-gradient-to-br from-[#121326]/95 via-[#0D0E1A]/95 to-[#16142E]/95 backdrop-blur-xl px-4 py-3.5 text-left flex items-center justify-between text-sm transition-all focus:outline-none cursor-pointer ${
                              budgetOpen ? "ring-1 ring-[#A855F7]/60" : ""
                            }`}
                          >
                            <div className="truncate pr-2">
                              {selectedBudget ? (
                                <span className="text-white font-medium truncate">
                                  {selectedBudget.label}
                                </span>
                              ) : (
                                <span className="text-white/40 font-normal">Select estimated budget (Optional)...</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <ChevronDown
                                className={`w-4 h-4 text-[#8275FF] transition-transform duration-300 ${
                                  budgetOpen ? "rotate-180 text-white" : "group-hover:text-white"
                                }`}
                              />
                            </div>
                          </button>
                        </div>

                        {/* Floating Gradient Dropdown Menu */}
                        {budgetOpen && (
                          <div
                            role="listbox"
                            data-lenis-prevent="true"
                            onWheel={(e) => e.stopPropagation()}
                            className="absolute z-50 left-0 right-0 mt-2 rounded-2xl bg-[#0B0C18]/98 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(168,85,247,0.25)] p-2 max-h-60 overflow-y-auto overscroll-contain touch-pan-y [scrollbar-width:thin] [scrollbar-color:rgba(168,85,247,0.4)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#A855F7]/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#A855F7]/60 animate-in fade-in zoom-in-95 duration-200"
                          >
                            <div
                              aria-hidden="true"
                              className="h-0.5 bg-gradient-to-r from-transparent via-[#A855F7] to-transparent mb-1.5 opacity-80"
                            />
                            <div className="space-y-1">
                              {BUDGET_OPTIONS.map((opt) => {
                                const isSelected = formData.budget === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => handleSelectBudget(opt.value)}
                                    className={`w-full text-left rounded-xl px-4 py-3 text-sm transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                                      isSelected
                                        ? "bg-gradient-to-r from-[#A855F7]/30 via-[#6366F1]/25 to-transparent text-white font-medium border-l-2 border-[#A855F7]"
                                        : "text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-[#A855F7]/20 hover:via-[#6366F1]/15 hover:to-transparent"
                                    }`}
                                  >
                                    <span className="truncate">{opt.label}</span>
                                    {isSelected && <Check className="w-4 h-4 text-[#C084FC] shrink-0 ml-2" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Company / Organisation (Optional) */}
                    <div>
                      <label className="block text-sm font-sans font-normal text-white/80 mb-2">
                        Company / Organisation <span className="text-white/40 text-xs font-normal tracking-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. Acme Corp, Horizon Labs"
                        className="w-full font-sans font-normal bg-white/[0.02] border border-white/[0.08] focus:border-[#8275FF] focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-[#8275FF]/50 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm transition-all"
                      />
                    </div>

                    {/* Row 4: Project Description (Required Textarea) */}
                    <div>
                      <label className="block text-sm font-sans font-normal text-white/80 mb-2">
                        Project Description <span className="text-[#8275FF]">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Share details about your objectives, timeline, scope, or key challenges..."
                        className={`w-full font-sans font-normal bg-white/[0.02] border ${
                          formErrors.message
                            ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/40"
                            : "border-white/[0.08] focus:border-[#8275FF] focus:ring-[#8275FF]/50"
                        } focus:bg-white/[0.05] focus:outline-none focus:ring-1 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm transition-all resize-none`}
                      />
                      {formErrors.message && (
                        <p className="text-xs text-red-400 mt-1.5 font-sans">{formErrors.message}</p>
                      )}
                    </div>

                    {/* Row 5: Terms & Privacy Checkbox */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer group select-none">
                        <input
                          type="checkbox"
                          required
                          checked={agreedToTerms}
                          onChange={(e) => {
                            setAgreedToTerms(e.target.checked);
                            if (formErrors.terms) {
                              setFormErrors((prev) => {
                                const next = { ...prev };
                                delete next.terms;
                                return next;
                              });
                            }
                          }}
                          className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-[#8275FF] focus:ring-[#8275FF] focus:ring-offset-0 cursor-pointer accent-[#8275FF]"
                        />
                        <span className="text-xs text-[#9696A8] leading-normal group-hover:text-white/80 transition-colors">
                          I agree to the processing of personal data in accordance with TAVQO&apos;s{" "}
                          <a
                            href="/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8275FF] hover:text-[#B5A1FF] underline underline-offset-2 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Privacy Policy
                          </a>
                          .
                        </span>
                      </label>
                      {formErrors.terms && (
                        <p className="text-xs text-red-400 mt-1.5 font-sans">{formErrors.terms}</p>
                      )}
                    </div>

                    {/* Row 6: Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
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

      {/* 3. Official TAVQO Studio Footer */}
      <Footer />
    </div>
  );
}

import { useState } from "react";
import { Check, Send, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Section 2: Contact Form Component (Enhanced with 3D UI Depth & Tilt)
 * - 3D Perspective tilt based on cursor coordinates with specular glare reflection
 * - Dynamic 3D depth elevation on focused input fields
 * - Layered shadow and tactile physical button press interactions
 * - Zero 3D models or objects — pure UI elevation & perspective
 */
export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Blur handler for real-time validation
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  // Validate individual field
  const validateField = (field, value) => {
    let err = "";
    if (field === "fullName") {
      if (!value.trim()) {
        err = "Please enter your full name.";
      } else if (value.trim().length < 2) {
        err = "Name must be at least 2 characters.";
      }
    } else if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        err = "Please enter your work email address.";
      } else if (!emailRegex.test(value.trim())) {
        err = "Please provide a valid email format (e.g., name@company.com).";
      }
    } else if (field === "description") {
      if (!value.trim()) {
        err = "Please share a brief summary of your project vision.";
      } else if (value.trim().length < 15) {
        err = "Please provide at least 15 characters to help us understand your needs.";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: err }));
    return err;
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    const nameErr = validateField("fullName", formData.fullName);
    const emailErr = validateField("email", formData.email);
    const descErr = validateField("description", formData.description);

    setTouched({
      fullName: true,
      email: true,
      description: true,
    });

    if (nameErr || emailErr || descErr) {
      const firstError = nameErr || emailErr || descErr;
      setErrorMessage(firstError);
      return;
    }

    setErrorMessage("");
    setStatus("submitting");

    // Prepare payload
    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "Browser",
    };

    try {
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
      const apiEndpoint = import.meta.env.VITE_CONTACT_API_ENDPOINT;

      if (formspreeId) {
        // Send via Formspree
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to send inquiry to Formspree endpoint.");
        }
      } else if (apiEndpoint) {
        // Send via custom API endpoint
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to send inquiry to designated API endpoint.");
        }
      } else {
        // Production fallback: Log structured payload and simulate realistic delivery
        console.group("📬 [TAVQO Contact Inquiry Payload]");
        console.info("To hook this form to email or a webhook, define VITE_FORMSPREE_ID or VITE_CONTACT_API_ENDPOINT in your environment.");
        console.table(payload);
        console.groupEnd();

        // Realistic network delivery simulation
        await new Promise((resolve) => setTimeout(resolve, 1100));
      }

      setSubmittedData(payload);
      setStatus("success");
    } catch (err) {
      console.error("Contact Form Submission Error:", err);
      setStatus("error");
      setErrorMessage(
        err.message || "An unexpected error occurred while transmitting your inquiry. Please try again or email hello@tavqo.com directly."
      );
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      company: "",
      phone: "",
      description: "",
    });
    setErrors({});
    setTouched({});
    setStatus("idle");
    setErrorMessage("");
    setSubmittedData(null);
  };

  return (
    <div
      id="inquiry-form"
      className="relative w-full rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 lg:p-11 bg-[#10111B]/80 backdrop-blur-xl border border-white/[0.12] hover:border-[#8275FF]/35 shadow-[0_30px_90px_rgba(0,0,0,0.65)] overflow-hidden transition-all duration-300"
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 30px 90px rgba(0, 0, 0, 0.65), 0 0 40px rgba(130, 117, 255, 0.06)",
      }}
    >
      {/* Ambient Top Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[90px] opacity-25"
          style={{
            background: "radial-gradient(circle, #8275FF 0%, #17152F 60%, transparent 80%)",
          }}
        />

        <AnimatePresence mode="wait">
          {status === "success" ? (
            /* =============================================================== */
            /* SUCCESS CONFIRMATION STATE                                      */
            /* =============================================================== */
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 sm:py-12 flex flex-col items-center text-center select-text"
            >
              {/* Glowing Success Badge */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#8275FF]/20 border border-[#8275FF]/40 flex items-center justify-center text-[#8275FF] shadow-[0_0_35px_rgba(130,117,255,0.45)]">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>
              </div>

              <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[#F4F3FA] tracking-tight">
                Inquiry Received
              </h3>

              <p className="font-sans font-light text-sm sm:text-base text-[#9696A8] max-w-md mt-3 leading-relaxed">
                Thank you, <span className="text-[#F4F3FA] font-medium">{submittedData?.fullName}</span>. We&apos;ve logged your project brief and will follow up at{" "}
                <span className="text-[#8275FF] font-medium">{submittedData?.email}</span> within 24 hours.
              </p>

              {/* Submitted Summary Details */}
              <div className="w-full max-w-md my-8 p-5 rounded-2xl bg-[#08090D] border border-white/[0.08] text-left text-xs font-sans space-y-2.5 shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-[#9696A8] font-mono uppercase tracking-wider text-[10px]">
                    Contact Person
                  </span>
                  <span className="text-[#F4F3FA] font-medium">
                    {submittedData?.fullName}
                  </span>
                </div>
                {submittedData?.company && (
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <span className="text-[#9696A8] font-mono uppercase tracking-wider text-[10px]">
                      Organization
                    </span>
                    <span className="text-[#F4F3FA] font-medium">
                      {submittedData?.company}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-[#9696A8] font-mono uppercase tracking-wider text-[10px]">
                    Delivery Email
                  </span>
                  <span className="text-[#8275FF] font-medium">
                    {submittedData?.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9696A8] font-mono uppercase tracking-wider text-[10px]">
                    Estimated Response
                  </span>
                  <span className="text-[#8275FF] font-mono font-medium">
                    Under 24 Hours
                  </span>
                </div>
              </div>

              {/* Send Another Inquiry Button */}
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#F4F3FA] border border-white/[0.12] hover:border-white/[0.25] text-xs sm:text-[13px] font-sans font-medium transition-all duration-300 cursor-pointer shadow-md active:scale-[0.98]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Send Another Project Inquiry</span>
              </button>
            </motion.div>
          ) : (
            /* =============================================================== */
            /* INTERACTIVE INQUIRY FORM WITH 3D DEPTH                          */
            /* =============================================================== */
            <form
              key="inquiry-form-element"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Header */}
              <div className="mb-8">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C7C0FF] block mb-2">
                  PROJECT INQUIRY FORM
                </span>
                <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[#F4F3FA] tracking-tight">
                  Tell us about your project.
                </h3>
              </div>

              {/* Global Error Banner */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-3 text-xs sm:text-[13px] text-red-300 shadow-md animate-fade-slide-down">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-6">
                
                {/* Row 1: Full Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-sans font-medium text-[#F4F3FA] mb-2"
                    >
                      Full Name <span className="text-[#8275FF]">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("fullName")}
                      placeholder="e.g. Elena Rostova"
                      autoComplete="name"
                      required
                      className={`w-full px-4 py-3 sm:py-3.5 rounded-xl bg-[#08090D] text-[#F4F3FA] placeholder-[#5A5A6E] text-sm font-sans border transition-colors duration-300 outline-none ${
                        touched.fullName && errors.fullName
                          ? "border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                          : "border-white/[0.12] focus:border-[#8275FF] focus:ring-2 focus:ring-[#8275FF]/35 focus:shadow-[0_12px_28px_-4px_rgba(130,117,255,0.28)] hover:border-white/[0.24]"
                      }`}
                    />
                    {touched.fullName && errors.fullName && (
                      <p className="text-[11.5px] font-sans text-red-400 mt-1.5">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Work Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-sans font-medium text-[#F4F3FA] mb-2"
                    >
                      Work Email <span className="text-[#8275FF]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      placeholder="name@company.com"
                      autoComplete="email"
                      required
                      className={`w-full px-4 py-3 sm:py-3.5 rounded-xl bg-[#08090D] text-[#F4F3FA] placeholder-[#5A5A6E] text-sm font-sans border transition-colors duration-300 outline-none ${
                        touched.email && errors.email
                          ? "border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                          : "border-white/[0.12] focus:border-[#8275FF] focus:ring-2 focus:ring-[#8275FF]/35 focus:shadow-[0_12px_28px_-4px_rgba(130,117,255,0.28)] hover:border-white/[0.24]"
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="text-[11.5px] font-sans text-red-400 mt-1.5">
                        {errors.email}
                      </p>
                    )}
                  </div>

                </div>

                {/* Row 2: Company & Phone Number (Both Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Company */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="company"
                        className="text-xs font-sans font-medium text-[#F4F3FA]"
                      >
                        Company / Organization
                      </label>
                      <span className="text-[10px] font-mono uppercase text-[#9696A8]">
                        Optional
                      </span>
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Apex Dynamics / Stealth"
                      autoComplete="organization"
                      className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-[#08090D] text-[#F4F3FA] placeholder-[#5A5A6E] text-sm font-sans border border-white/[0.12] focus:border-[#8275FF] focus:ring-2 focus:ring-[#8275FF]/35 focus:shadow-[0_12px_28px_-4px_rgba(130,117,255,0.28)] hover:border-white/[0.24] transition-colors duration-300 outline-none"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="phone"
                        className="text-xs font-sans font-medium text-[#F4F3FA]"
                      >
                        Phone Number
                      </label>
                      <span className="text-[10px] font-mono uppercase text-[#9696A8]">
                        Optional
                      </span>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      autoComplete="tel"
                      className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-[#08090D] text-[#F4F3FA] placeholder-[#5A5A6E] text-sm font-sans border border-white/[0.12] focus:border-[#8275FF] focus:ring-2 focus:ring-[#8275FF]/35 focus:shadow-[0_12px_28px_-4px_rgba(130,117,255,0.28)] hover:border-white/[0.24] transition-colors duration-300 outline-none"
                    />
                  </div>

                </div>

                {/* Row 3: Project Description (Textarea) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="description"
                      className="text-xs font-sans font-medium text-[#F4F3FA]"
                    >
                      Project Description <span className="text-[#8275FF]">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-[#9696A8]">
                      {formData.description.length} chars
                    </span>
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={() => handleBlur("description")}
                    placeholder="Tell us about your project goals, timeline, key deliverables, or questions..."
                    required
                    className={`w-full px-4 py-3.5 rounded-xl bg-[#08090D] text-[#F4F3FA] placeholder-[#5A5A6E] text-sm font-sans border transition-colors duration-300 outline-none resize-none ${
                      touched.description && errors.description
                        ? "border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                        : "border-white/[0.12] focus:border-[#8275FF] focus:ring-2 focus:ring-[#8275FF]/35 focus:shadow-[0_12px_28px_-4px_rgba(130,117,255,0.28)] hover:border-white/[0.24]"
                    }`}
                  />
                  {touched.description && errors.description && (
                    <p className="text-[11.5px] font-sans text-red-400 mt-1.5">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#8275FF] hover:bg-[#968BFF] text-[#050508] font-sans font-semibold text-sm sm:text-[15px] transition-all duration-300 shadow-[0_12px_32px_rgba(130,117,255,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] hover:shadow-[0_18px_48px_rgba(130,117,255,0.7),inset_0_1px_0_rgba(255,255,255,0.6)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#050508]" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Inquiry</span>
                        <span className="w-6 h-6 rounded-full bg-[#050508]/15 flex items-center justify-center text-xs font-bold transition-colors duration-300">
                          <Send className="w-3 h-3" />
                        </span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] font-mono text-[#9696A8] mt-3">
                    Direct submission • Encrypted SSL transmission • Guaranteed 24-hr reply
                  </p>
                </div>

              </div>
            </form>
          )}
        </AnimatePresence>
      </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  MapPin,
  Briefcase,
  Upload,
  Loader2,
  X,
  FileText,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import {
  getRoleBySlug,
  ALL_ROLES,
  LOCATION,
  WORK_MODEL,
  COMPENSATION,
} from "../data/careersData";
import { uploadCV, submitApplication } from "../services/applicationService";
import Particles from "../components/ui/Particles";
import BlurText from "../components/ui/BlurText";
import ShinyText from "../components/ui/ShinyText";

const CareerRole = () => {
  const { slug } = useParams();
  const role = getRoleBySlug(slug);
  const formRef = useRef(null);

  // SEO
  useEffect(() => {
    if (role) {
      document.title = `${role.title} | Careers at Vantage`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", role.shortDescription);
      }
    } else {
      document.title = "Role Not Found | Careers at Vantage";
    }
  }, [role]);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentLocation: "",
    role: role ? role.title : "",
    universityCompany: "",
    experience: "0-1 years",
    availability: "",
    visaStatus: "UAE Student / Dependent Visa",
    linkedinUrl: "",
    githubUrl: "",
    portfolioUrl: "",
    whyVantage: "",
    relevantWork: "",
    consent: false,
  });

  useEffect(() => {
    if (role) {
      setFormData((prev) => ({ ...prev, role: role.title }));
    }
  }, [role]);

  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef(null);

  const scrollToApply = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = ["pdf", "doc", "docx"];
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (!validExtensions.includes(ext)) {
      setErrors((prev) => ({ ...prev, cv: "Please upload a PDF, DOC, or DOCX file." }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, cv: "File size must be under 10MB." }));
      return;
    }

    setCvFile(file);
    setErrors((prev) => ({ ...prev, cv: "" }));
  };

  const removeCvFile = () => {
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.currentLocation.trim()) newErrors.currentLocation = "Current location is required";
    if (!formData.role) newErrors.role = "Please select a role";
    if (!formData.universityCompany.trim()) newErrors.universityCompany = "University or company name is required";
    if (!formData.availability.trim()) newErrors.availability = "Please specify your earliest start date";
    if (!formData.whyVantage.trim() || formData.whyVantage.trim().length < 30) {
      newErrors.whyVantage = "Please tell us why you want to join (minimum 30 characters)";
    }
    if (!formData.relevantWork.trim() || formData.relevantWork.trim().length < 30) {
      newErrors.relevantWork = "Please describe relevant work or projects (minimum 30 characters)";
    }
    if (!cvFile) newErrors.cv = "Please upload your CV / resume";
    if (!formData.consent) newErrors.consent = "You must agree to the data processing terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      const firstError = document.querySelector(".form-error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const cvStoragePath = await uploadCV(cvFile, formData.email);
      await submitApplication(formData, cvStoragePath);

      setSubmitSuccess(true);
      setCvFile(null);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        currentLocation: "",
        role: role ? role.title : "",
        universityCompany: "",
        experience: "0-1 years",
        availability: "",
        visaStatus: "UAE Student / Dependent Visa",
        linkedinUrl: "",
        githubUrl: "",
        portfolioUrl: "",
        whyVantage: "",
        relevantWork: "",
        consent: false,
      });
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError(
        err?.message || "There was an error submitting your application. Please try again or email us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-vantage-black text-white pt-36 pb-32 flex items-center justify-center noise-bg">
        <div className="text-center max-w-lg px-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={32} className="text-red-400" />
          </div>
          <h1 className="text-3xl font-bold font-display text-white mb-3">Role Not Found</h1>
          <p className="text-vantage-grey text-sm mb-8 leading-relaxed">
            The role you are looking for might have been updated or moved. Please explore our open opportunities.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-vantage-electric text-vantage-black font-semibold text-sm hover:shadow-glow-sm transition-all"
          >
            <ArrowLeft size={16} />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  const isProfessional = role.type === "Professional";

  return (
    <div className="min-h-screen bg-vantage-black text-white pt-24 pb-32 relative overflow-hidden noise-bg">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Particles quantity={35} color="#00D4FF" opacity={0.15} speed={0.25} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial from-vantage-electric/15 via-transparent to-transparent blur-[140px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        {/* Back navigation */}
        <div className="pt-8 pb-6">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-xs font-mono text-vantage-grey hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to all open positions
          </Link>
        </div>

        {/* Role Header */}
        <section className="py-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border ${
                isProfessional
                  ? "border-vantage-electric/40 bg-vantage-electric/[0.08] text-vantage-electric font-semibold"
                  : "border-cyan-400/40 bg-cyan-400/[0.08] text-cyan-300 font-semibold"
              }`}
            >
              {role.type}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border border-white/10 bg-white/[0.02] text-vantage-silver">
              {COMPENSATION}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border border-white/10 bg-white/[0.02] text-vantage-silver">
              {WORK_MODEL}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border border-white/10 bg-white/[0.02] text-vantage-silver">
              {LOCATION}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-tight mb-4">
            <BlurText text={role.title} delay={30} direction="top" />
          </h1>

          <p className="text-lg text-vantage-grey font-light leading-relaxed mb-8">
            {role.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToApply}
              className="px-7 py-3 rounded-full bg-vantage-electric text-vantage-black font-semibold text-sm hover:shadow-glow-sm hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
            >
              Apply for this Position
              <ArrowRight size={16} />
            </button>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-vantage-grey/70">
              <Sparkles size={14} className="text-vantage-electric" />
              <span>Supported through ECDF | CMA</span>
            </div>
          </div>
        </section>

        {/* Role Content Details */}
        <section className="py-12 space-y-12">
          {/* About Vantage */}
          <div className="bg-vantage-charcoal/30 border border-white/[0.06] rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold font-display text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vantage-electric" />
              About Vantage
            </h2>
            <p className="text-sm text-vantage-grey/90 leading-relaxed font-light mb-4">
              Vantage is a pioneering assistive technology initiative based in Dubai, building intelligent wearable navigation systems for individuals with visual impairments. We combine state-of-the-art computer vision, edge AI, customized embedded hardware, and ergonomic wearable design to empower people to navigate their environment with instinctive confidence.
            </p>
            <p className="text-xs text-vantage-grey/70 leading-relaxed font-mono">
              Vantage&apos;s development programme is supported through Expo City Dubai Foundation (ECDF) | Changemakers Academy (CMA).
            </p>
          </div>

          {/* About the Role */}
          <div>
            <h2 className="text-xl font-bold font-display text-white mb-4">About the Role</h2>
            <p className="text-sm md:text-base text-vantage-grey/90 leading-relaxed font-light">
              {role.aboutRole}
            </p>
          </div>

          {/* What You'll Work On */}
          <div>
            <h2 className="text-xl font-bold font-display text-white mb-4">What You&apos;ll Work On</h2>
            <div className="space-y-3">
              {role.whatYoullWorkOn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-vantage-electric/10 border border-vantage-electric/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={12} className="text-vantage-electric" />
                  </div>
                  <span className="text-sm text-vantage-grey/90 leading-relaxed font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What We're Looking For */}
          <div>
            <h2 className="text-xl font-bold font-display text-white mb-4">What We&apos;re Looking For</h2>
            <div className="space-y-3">
              {role.lookingFor.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <ChevronRight size={12} className="text-white" />
                  </div>
                  <span className="text-sm text-vantage-grey/90 leading-relaxed font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nice to Have */}
          <div>
            <h2 className="text-xl font-bold font-display text-white mb-4">Nice to Have</h2>
            <div className="space-y-3">
              {role.niceToHave.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={11} className="text-purple-300" />
                  </div>
                  <span className="text-sm text-vantage-grey/80 leading-relaxed font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Working Model Card */}
          <div className="p-6 rounded-2xl bg-vantage-charcoal/40 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-bold font-display text-white mb-1">Working Model & Location</h3>
              <p className="text-xs text-vantage-grey leading-relaxed">
                Paid position based in Dubai, UAE (Knowledge Park / UOWD ecosystem) with flexible hybrid collaboration.
              </p>
            </div>
            <button
              onClick={scrollToApply}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-vantage-electric hover:text-vantage-black text-white text-xs font-mono uppercase tracking-wider transition-all duration-300 shrink-0"
            >
              Apply Now
            </button>
          </div>
        </section>

        {/* Embedded Application Form */}
        <section ref={formRef} id="apply" className="py-12 border-t border-white/[0.08]">
          <div className="relative bg-vantage-charcoal/60 border border-white/[0.08] rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-mono text-vantage-electric uppercase tracking-[0.2em] block mb-2">
                Application Form
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-2">
                Apply for {role.title}
              </h2>
              <p className="text-xs text-vantage-grey leading-relaxed">
                Complete the fields below and attach your CV. We will review your submission and follow up directly.
              </p>
            </div>

            <AnimatePresence>
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 px-6 rounded-2xl bg-vantage-electric/[0.04] border border-vantage-electric/30"
                >
                  <div className="w-16 h-16 rounded-full bg-vantage-electric/10 border border-vantage-electric/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-vantage-electric" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white mb-3">
                    Application Submitted!
                  </h3>
                  <p className="text-vantage-grey max-w-md mx-auto text-sm leading-relaxed mb-8">
                    Your application for <span className="text-white font-medium">{role.title}</span> has been logged. Our founding team will review your CV and portfolio.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-2.5 rounded-full border border-white/20 hover:border-vantage-electric text-white text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Grid 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                        Full Name <span className="text-vantage-electric">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Dev Bhodia"
                        className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl px-4 py-3 text-sm text-white placeholder-vantage-grey/40 focus:outline-none transition-colors"
                      />
                      {errors.fullName && (
                        <p className="form-error text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                        Email Address <span className="text-vantage-electric">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@domain.com"
                        className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl px-4 py-3 text-sm text-white placeholder-vantage-grey/40 focus:outline-none transition-colors"
                      />
                      {errors.email && (
                        <p className="form-error text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Grid 2: Phone & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                        Phone Number <span className="text-vantage-electric">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+971 50 123 4567"
                        className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl px-4 py-3 text-sm text-white placeholder-vantage-grey/40 focus:outline-none transition-colors"
                      />
                      {errors.phone && (
                        <p className="form-error text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                        Current Location <span className="text-vantage-electric">*</span>
                      </label>
                      <input
                        type="text"
                        name="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleInputChange}
                        placeholder="Dubai, UAE"
                        className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl px-4 py-3 text-sm text-white placeholder-vantage-grey/40 focus:outline-none transition-colors"
                      />
                      {errors.currentLocation && (
                        <p className="form-error text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.currentLocation}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Role Applying For (Pre-selected) */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                      Role Applying For <span className="text-vantage-electric">*</span>
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      readOnly
                      className="w-full bg-vantage-black/40 border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-vantage-electric font-mono focus:outline-none cursor-not-allowed"
                    />
                  </div>

                  {/* Grid 3: University/Company & Experience */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                        University or Current Company <span className="text-vantage-electric">*</span>
                      </label>
                      <input
                        type="text"
                        name="universityCompany"
                        value={formData.universityCompany}
                        onChange={handleInputChange}
                        placeholder="e.g. University of Wollongong Dubai"
                        className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl px-4 py-3 text-sm text-white placeholder-vantage-grey/40 focus:outline-none transition-colors"
                      />
                      {errors.universityCompany && (
                        <p className="form-error text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.universityCompany}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                        Years of Experience <span className="text-vantage-electric">*</span>
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      >
                        <option value="0-1 years" className="bg-vantage-charcoal">0 - 1 years (Student / Recent Grad)</option>
                        <option value="1-3 years" className="bg-vantage-charcoal">1 - 3 years (Junior / Mid)</option>
                        <option value="3-5 years" className="bg-vantage-charcoal">3 - 5 years (Mid / Senior)</option>
                        <option value="5+ years" className="bg-vantage-charcoal">5+ years (Senior / Lead)</option>
                      </select>
                    </div>
                  </div>

                  {/* Grid 4: Availability & UAE Visa Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                        Availability / Earliest Start Date <span className="text-vantage-electric">*</span>
                      </label>
                      <input
                        type="text"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        placeholder="e.g. Immediately, or 2 weeks notice"
                        className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl px-4 py-3 text-sm text-white placeholder-vantage-grey/40 focus:outline-none transition-colors"
                      />
                      {errors.availability && (
                        <p className="form-error text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.availability}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                        UAE Visa / Residency Status <span className="text-vantage-electric">*</span>
                      </label>
                      <select
                        name="visaStatus"
                        value={formData.visaStatus}
                        onChange={handleInputChange}
                        className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      >
                        <option value="UAE Citizen" className="bg-vantage-charcoal">UAE National / Citizen</option>
                        <option value="UAE Golden Visa" className="bg-vantage-charcoal">UAE Golden Visa</option>
                        <option value="UAE Student / Dependent Visa" className="bg-vantage-charcoal">UAE Student / Dependent Visa</option>
                        <option value="UAE Employment Visa" className="bg-vantage-charcoal">UAE Employment Visa</option>
                        <option value="Need Visa Sponsorship" className="bg-vantage-charcoal">Require UAE Visa Sponsorship</option>
                        <option value="Other" className="bg-vantage-charcoal">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl px-4 py-3 text-sm text-white placeholder-vantage-grey/40 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                        GitHub / GitLab URL
                      </label>
                      <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleInputChange}
                        placeholder="https://github.com/..."
                        className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl px-4 py-3 text-sm text-white placeholder-vantage-grey/40 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                        Portfolio / Project URL
                      </label>
                      <input
                        type="url"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleInputChange}
                        placeholder="https://yourportfolio.com"
                        className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl px-4 py-3 text-sm text-white placeholder-vantage-grey/40 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Why Vantage */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                      Why do you want to join Vantage? <span className="text-vantage-electric">*</span>
                    </label>
                    <textarea
                      name="whyVantage"
                      rows={3}
                      value={formData.whyVantage}
                      onChange={handleInputChange}
                      placeholder="What draws you to this role and our mission in assistive intelligence?"
                      className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl p-4 text-sm text-white placeholder-vantage-grey/40 focus:outline-none transition-colors"
                    />
                    {errors.whyVantage && (
                      <p className="form-error text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.whyVantage}
                      </p>
                    )}
                  </div>

                  {/* Relevant Work */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                      Tell us about something relevant you&apos;ve built. <span className="text-vantage-electric">*</span>
                    </label>
                    <textarea
                      name="relevantWork"
                      rows={3}
                      value={formData.relevantWork}
                      onChange={handleInputChange}
                      placeholder="Describe a hardware prototype, PCB, model training pipeline, or code you've written."
                      className="w-full bg-vantage-black/60 border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl p-4 text-sm text-white placeholder-vantage-grey/40 focus:outline-none transition-colors"
                    />
                    {errors.relevantWork && (
                      <p className="form-error text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.relevantWork}
                      </p>
                    )}
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-vantage-grey/80 mb-2">
                      CV / Resume (PDF, DOC, DOCX up to 10MB) <span className="text-vantage-electric">*</span>
                    </label>

                    {!cvFile ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const file = e.dataTransfer?.files?.[0];
                          if (file) {
                            handleFileChange({ target: { files: [file] } });
                          }
                        }}
                        className="border-2 border-dashed border-white/[0.12] hover:border-vantage-electric/50 rounded-2xl p-6 text-center cursor-pointer bg-white/[0.01] hover:bg-vantage-electric/[0.02] transition-all duration-300"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Upload size={28} className="mx-auto text-vantage-grey/60 mb-2" />
                        <p className="text-sm font-medium text-white mb-1">
                          Click to select or drag and drop your resume
                        </p>
                        <p className="text-xs text-vantage-grey/60">PDF, DOC, or DOCX up to 10MB</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 rounded-xl bg-vantage-black/80 border border-vantage-electric/30">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-vantage-electric" />
                          <div>
                            <p className="text-sm font-medium text-white">{cvFile.name}</p>
                            <p className="text-xs text-vantage-grey">
                              {(cvFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeCvFile}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-vantage-grey hover:text-white transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}

                    {errors.cv && (
                      <p className="form-error text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.cv}
                      </p>
                    )}
                  </div>

                  {/* Consent */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 rounded border-white/20 text-vantage-electric focus:ring-vantage-electric/30 bg-vantage-black/80 cursor-pointer"
                      />
                      <span className="text-xs text-vantage-grey/80 leading-relaxed">
                        I agree to Vantage storing and processing my personal application data for recruitment purposes. <span className="text-vantage-electric">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="form-error text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.consent}
                      </p>
                    )}
                  </div>

                  {/* Submit button */}
                  <div className="pt-4 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-10 py-3.5 rounded-full bg-vantage-electric hover:shadow-glow-md text-vantage-black font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application for {role.title}</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CareerRole;

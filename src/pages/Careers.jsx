import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Upload,
  Loader2,
  AlertCircle,
  X,
  FileText,
  ChevronRight,
} from "lucide-react";
import {
  PROFESSIONAL_ROLES,
  INTERNSHIP_ROLES,
  ALL_ROLES,
  LOCATION,
  WORK_MODEL,
} from "../data/careersData";
import { uploadCV, submitApplication } from "../services/applicationService";
import Particles from "../components/ui/Particles";

// ── Tiny reusable form field ─────────────────────────────────────────────────
const Field = ({ label, required, error, children }) => (
  <div>
    <label className="block text-[11px] font-mono uppercase tracking-[0.18em] text-white/40 mb-1.5">
      {label}{required && <span className="text-vantage-electric ml-1">*</span>}
    </label>
    {children}
    {error && (
      <p className="form-error text-[11px] text-red-400 mt-1 flex items-center gap-1">
        <AlertCircle size={10} /> {error}
      </p>
    )}
  </div>
);

const inputCls =
  "w-full bg-white/[0.03] border border-white/[0.08] focus:border-vantage-electric/50 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors";

// ── Role Card ────────────────────────────────────────────────────────────────
const RoleCard = ({ role, type, onApply, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay }}
    className="group bg-white/[0.02] border border-white/[0.07] hover:border-vantage-electric/30 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/[0.04] transition-all duration-400"
  >
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border font-semibold ${
          type === 'Professional'
            ? 'border-vantage-electric/30 bg-vantage-electric/[0.05] text-vantage-electric'
            : 'border-cyan-400/30 bg-cyan-400/[0.05] text-cyan-300'
        }`}>
          {type}
        </span>
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Paid · Hybrid · Dubai</span>
      </div>
      <h4 className="text-base font-semibold font-display text-white mb-2 group-hover:text-vantage-electric transition-colors leading-snug">
        {role.title}
      </h4>
      <p className="text-sm text-white/45 leading-relaxed font-light line-clamp-3">
        {role.shortDescription}
      </p>
    </div>
    <div className="pt-4 mt-4 border-t border-white/[0.05] flex items-center justify-between">
      <Link
        to={`/careers/${role.slug}`}
        className="inline-flex items-center gap-1 text-xs font-mono text-white/50 hover:text-white transition-colors"
      >
        View role <ChevronRight size={12} />
      </Link>
      <button
        onClick={() => onApply(role.title)}
        className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
          type === 'Professional'
            ? 'border border-vantage-electric/25 text-vantage-electric hover:bg-vantage-electric/10'
            : 'border border-cyan-400/25 text-cyan-300 hover:bg-cyan-400/10'
        }`}
      >
        Apply
      </button>
    </div>
  </motion.div>
);

// ── Main Page ────────────────────────────────────────────────────────────────
const Careers = () => {
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.title = "Careers at Vantage | AI, Hardware & Accessibility Jobs in Dubai";
  }, []);

  const [activeTab, setActiveTab] = useState("all");
  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", currentLocation: "",
    role: "", universityCompany: "", experience: "0-1 years",
    availability: "", visaStatus: "UAE Student / Dependent Visa",
    linkedinUrl: "", githubUrl: "", portfolioUrl: "",
    whyVantage: "", relevantWork: "", consent: false,
  });

  const scrollToApply = (roleTitle = "") => {
    if (roleTitle) setFormData(p => ({ ...p, role: roleTitle }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(p => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const handleFile = (e) => {
    const file = e.target?.files?.[0] || e;
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "doc", "docx"].includes(ext)) return setErrors(p => ({ ...p, cv: "Upload PDF, DOC or DOCX" }));
    if (file.size > 10 * 1024 * 1024) return setErrors(p => ({ ...p, cv: "Max file size is 10MB" }));
    setCvFile(file);
    setErrors(p => ({ ...p, cv: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = "Required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Valid email required";
    if (!formData.phone.trim()) e.phone = "Required";
    if (!formData.currentLocation.trim()) e.currentLocation = "Required";
    if (!formData.role) e.role = "Select a role";
    if (!formData.universityCompany.trim()) e.universityCompany = "Required";
    if (!formData.availability.trim()) e.availability = "Required";
    if (formData.whyVantage.trim().length < 30) e.whyVantage = "Minimum 30 characters";
    if (formData.relevantWork.trim().length < 30) e.relevantWork = "Minimum 30 characters";
    if (!cvFile) e.cv = "Upload your CV";
    if (!formData.consent) e.consent = "Please agree to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) {
      document.querySelector(".form-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setIsSubmitting(true);
    try {
      const path = await uploadCV(cvFile, formData.email);
      await submitApplication(formData, path);
      setSubmitSuccess(true);
      setCvFile(null);
      setFormData({ fullName: "", email: "", phone: "", currentLocation: "", role: "", universityCompany: "", experience: "0-1 years", availability: "", visaStatus: "UAE Student / Dependent Visa", linkedinUrl: "", githubUrl: "", portfolioUrl: "", whyVantage: "", relevantWork: "", consent: false });
    } catch (err) {
      setSubmitError(err?.message || "Submission failed. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = activeTab === "all" ? ALL_ROLES : activeTab === "professional" ? PROFESSIONAL_ROLES : INTERNSHIP_ROLES;

  return (
    <div className="min-h-screen bg-vantage-black text-white pt-24 pb-32 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Particles quantity={35} color="#00D4FF" opacity={0.15} speed={0.25} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-radial from-vantage-electric/10 to-transparent blur-[130px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="text-center max-w-3xl mx-auto pt-16 pb-20">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-vantage-electric/25 bg-vantage-electric/[0.04] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-vantage-electric animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-vantage-electric/80">
              Paid · {WORK_MODEL} · {LOCATION}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-display text-white mb-5 leading-[1.08]"
          >
            Build for the{" "}
            <span className="text-vantage-electric">250 million</span>{" "}
            who can't see what you take for granted.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base text-white/50 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Vantage is building next-generation assistive wearables combining AI, computer vision, LiDAR and haptic feedback. Join the founding team in Dubai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#roles" className="px-6 py-2.5 rounded-full bg-vantage-electric text-vantage-black font-semibold text-sm hover:shadow-[0_0_24px_rgba(0,212,255,0.3)] hover:scale-[1.02] transition-all duration-300 flex items-center gap-2">
              View Open Roles <ArrowRight size={14} />
            </a>
            <button
              onClick={() => scrollToApply()}
              className="px-6 py-2.5 rounded-full border border-white/12 text-white/70 font-medium text-sm hover:border-white/25 hover:text-white transition-all duration-300"
            >
              Apply Directly
            </button>
          </motion.div>
        </section>

        {/* ── Roles ──────────────────────────────────────────────────────── */}
        <section id="roles" className="pb-24 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-mono text-vantage-electric uppercase tracking-[0.22em] mb-1">Open Positions</p>
              <h2 className="text-2xl font-bold font-display text-white">
                {filtered.length} Role{filtered.length !== 1 ? 's' : ''} Available
              </h2>
            </div>
            <div className="inline-flex p-1 bg-white/[0.03] border border-white/[0.07] rounded-xl">
              {[['all', `All (${ALL_ROLES.length})`], ['professional', `Pro (${PROFESSIONAL_ROLES.length})`], ['internship', `Intern (${INTERNSHIP_ROLES.length})`]].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setActiveTab(val)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-250 ${
                    activeTab === val
                      ? 'bg-vantage-electric text-vantage-black font-bold'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((role, i) => (
                <RoleCard
                  key={role.slug}
                  role={role}
                  type={role.type}
                  onApply={scrollToApply}
                  delay={i * 0.06}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ── Application Form ────────────────────────────────────────────── */}
        <section ref={formRef} id="apply" className="scroll-mt-24 max-w-3xl mx-auto">
          <div className="relative bg-white/[0.02] border border-white/[0.08] rounded-3xl p-8 md:p-12 backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-vantage-electric/[0.06] rounded-full blur-[80px] pointer-events-none" />

            <div className="mb-10">
              <p className="text-xs font-mono text-vantage-electric uppercase tracking-[0.22em] mb-2">Apply</p>
              <h2 className="text-2xl font-bold font-display text-white mb-2">Join Vantage</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                We review every application personally. Attach your CV and tell us what you've built.
              </p>
            </div>

            <AnimatePresence>
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-14 px-6"
                >
                  <div className="w-14 h-14 rounded-full bg-vantage-electric/10 border border-vantage-electric/30 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={28} className="text-vantage-electric" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-2">Application Received</h3>
                  <p className="text-sm text-white/40 max-w-sm mx-auto mb-8 leading-relaxed">
                    We've logged your application and will be in touch if there's an alignment with our current roadmap.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-5 py-2 rounded-full border border-white/15 hover:border-vantage-electric text-white/60 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    Submit Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-500/[0.08] border border-red-500/25 text-red-300 text-sm flex items-start gap-3">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" /> {submitError}
                    </div>
                  )}

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Full Name" required error={errors.fullName}>
                      <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your name" className={inputCls} />
                    </Field>
                    <Field label="Email" required error={errors.email}>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@domain.com" className={inputCls} />
                    </Field>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Phone" required error={errors.phone}>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+971 50 000 0000" className={inputCls} />
                    </Field>
                    <Field label="Current Location" required error={errors.currentLocation}>
                      <input name="currentLocation" value={formData.currentLocation} onChange={handleChange} placeholder="Dubai, UAE" className={inputCls} />
                    </Field>
                  </div>

                  {/* Role */}
                  <Field label="Role Applying For" required error={errors.role}>
                    <select name="role" value={formData.role} onChange={handleChange} className={inputCls}>
                      <option value="" className="bg-[#111]">Select a role...</option>
                      <optgroup label="Professional Roles" className="bg-[#111] text-vantage-electric">
                        {PROFESSIONAL_ROLES.map(r => <option key={r.slug} value={r.title} className="bg-[#111] text-white">{r.title}</option>)}
                      </optgroup>
                      <optgroup label="Paid Internships" className="bg-[#111] text-cyan-300">
                        {INTERNSHIP_ROLES.map(r => <option key={r.slug} value={r.title} className="bg-[#111] text-white">{r.title}</option>)}
                      </optgroup>
                      <option value="General Open Application" className="bg-[#111] text-white">General Open Application</option>
                    </select>
                  </Field>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="University / Company" required error={errors.universityCompany}>
                      <input name="universityCompany" value={formData.universityCompany} onChange={handleChange} placeholder="University or employer" className={inputCls} />
                    </Field>
                    <Field label="Experience">
                      <select name="experience" value={formData.experience} onChange={handleChange} className={inputCls}>
                        <option value="0-1 years" className="bg-[#111]">0–1 years (Student / Recent Grad)</option>
                        <option value="1-3 years" className="bg-[#111]">1–3 years (Junior / Mid)</option>
                        <option value="3-5 years" className="bg-[#111]">3–5 years (Mid / Senior)</option>
                        <option value="5+ years" className="bg-[#111]">5+ years (Senior / Lead)</option>
                      </select>
                    </Field>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Earliest Start Date" required error={errors.availability}>
                      <input name="availability" value={formData.availability} onChange={handleChange} placeholder="Immediately / 2 weeks notice" className={inputCls} />
                    </Field>
                    <Field label="UAE Visa Status">
                      <select name="visaStatus" value={formData.visaStatus} onChange={handleChange} className={inputCls}>
                        <option value="UAE Citizen" className="bg-[#111]">UAE National / Citizen</option>
                        <option value="UAE Golden Visa" className="bg-[#111]">UAE Golden Visa</option>
                        <option value="UAE Student / Dependent Visa" className="bg-[#111]">Student / Dependent Visa</option>
                        <option value="UAE Employment Visa" className="bg-[#111]">Employment Visa</option>
                        <option value="Need Visa Sponsorship" className="bg-[#111]">Need Sponsorship</option>
                        <option value="Other" className="bg-[#111]">Other</option>
                      </select>
                    </Field>
                  </div>

                  {/* Links */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Field label="LinkedIn">
                      <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} placeholder="linkedin.com/in/..." className={inputCls} />
                    </Field>
                    <Field label="GitHub / GitLab">
                      <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="github.com/..." className={inputCls} />
                    </Field>
                    <Field label="Portfolio">
                      <input type="url" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} placeholder="yoursite.com" className={inputCls} />
                    </Field>
                  </div>

                  {/* Why Vantage */}
                  <Field label="Why Vantage?" required error={errors.whyVantage}>
                    <textarea name="whyVantage" rows={3} value={formData.whyVantage} onChange={handleChange} placeholder="What draws you to our mission in assistive intelligence?" className={inputCls} />
                  </Field>

                  {/* Relevant work */}
                  <Field label="Something Relevant You've Built" required error={errors.relevantWork}>
                    <textarea name="relevantWork" rows={3} value={formData.relevantWork} onChange={handleChange} placeholder="Describe a project, ML pipeline, PCB, firmware module or app you've created..." className={inputCls} />
                  </Field>

                  {/* CV upload */}
                  <Field label="CV / Resume (PDF, DOC, DOCX — max 10MB)" required error={errors.cv}>
                    {!cvFile ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={e => { e.preventDefault(); const f = e.dataTransfer?.files?.[0]; if (f) handleFile(f); }}
                        className="border-2 border-dashed border-white/[0.09] hover:border-vantage-electric/40 rounded-2xl p-6 text-center cursor-pointer hover:bg-vantage-electric/[0.02] transition-all duration-300"
                      >
                        <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
                        <Upload size={22} className="mx-auto text-white/25 mb-2" />
                        <p className="text-sm text-white/50">Click to upload or drag & drop</p>
                        <p className="text-xs text-white/25 mt-0.5">PDF, DOC or DOCX</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 rounded-xl bg-vantage-electric/[0.04] border border-vantage-electric/20">
                        <div className="flex items-center gap-3">
                          <FileText size={18} className="text-vantage-electric" />
                          <div>
                            <p className="text-sm font-medium text-white">{cvFile.name}</p>
                            <p className="text-xs text-white/35">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => { setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </Field>

                  {/* Consent */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="mt-0.5 w-4 h-4 rounded border-white/20 text-vantage-electric focus:ring-vantage-electric/30 bg-transparent cursor-pointer" />
                      <span className="text-xs text-white/35 leading-relaxed">
                        I agree to Vantage storing and processing my application data for recruitment purposes.
                        <span className="text-vantage-electric ml-1">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="form-error text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.consent}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-vantage-electric hover:shadow-[0_0_28px_rgba(0,212,255,0.35)] text-vantage-black font-bold text-sm transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                      ) : (
                        <>Submit Application <ArrowRight size={16} /></>
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

export default Careers;

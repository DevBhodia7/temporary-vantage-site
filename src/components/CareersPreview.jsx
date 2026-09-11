import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Sparkles, ChevronRight, Cpu, Layers } from "lucide-react";
import ShinyText from "./ui/ShinyText";
import BlurText from "./ui/BlurText";
import { PROFESSIONAL_ROLES, INTERNSHIP_ROLES } from "../data/careersData";

const featuredRoles = [
  PROFESSIONAL_ROLES[0], // Senior Embedded Engineer / PCB Architect
  PROFESSIONAL_ROLES[4], // Senior AI Engineer / Edge Computing Specialist
  INTERNSHIP_ROLES[0],   // Embedded Hardware Intern
  INTERNSHIP_ROLES[4],   // AI / Firmware Development Intern
].filter(Boolean);

const CareersPreview = () => {
  return (
    <section className="py-28 bg-vantage-black relative overflow-hidden border-t border-white/[0.06] noise-bg">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-radial from-vantage-electric/10 via-cyan-900/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-vantage-electric/30 bg-vantage-electric/[0.04] mb-4"
            >
              <Sparkles size={13} className="text-vantage-electric" />
              <ShinyText text="We're Hiring in Dubai" className="text-xs font-mono tracking-wider uppercase text-vantage-electric font-semibold" speed={3} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight leading-tight"
            >
              Build the future of assistive intelligence.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-base text-vantage-grey font-light leading-relaxed"
            >
              We are expanding our hardware, AI, and software engineering teams. Explore paid hybrid opportunities at Vantage in Dubai, supported through Expo City Dubai Foundation (ECDF) | CMA.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="shrink-0"
          >
            <Link
              to="/careers"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-vantage-electric text-vantage-black font-semibold text-sm hover:shadow-glow-sm hover:scale-[1.02] transition-all duration-300 group"
            >
              <span>Explore All 12 Roles</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Featured Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredRoles.map((role, idx) => {
            const isProf = role.type === "Professional";
            return (
              <motion.div
                key={role.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-vantage-charcoal/50 border border-white/[0.08] hover:border-vantage-electric/40 rounded-2xl p-6 flex flex-col justify-between hover:shadow-glow-sm transition-all duration-500"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border ${
                        isProf
                          ? "border-vantage-electric/30 bg-vantage-electric/[0.05] text-vantage-electric font-semibold"
                          : "border-cyan-400/30 bg-cyan-400/[0.05] text-cyan-300 font-semibold"
                      }`}
                    >
                      {role.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase border border-white/10 text-vantage-silver">
                      Paid
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase border border-white/10 text-vantage-silver">
                      Dubai
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-vantage-electric transition-colors line-clamp-2">
                    {role.title}
                  </h3>

                  <p className="text-xs text-vantage-grey leading-relaxed font-light line-clamp-3 mb-6">
                    {role.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    to={`/careers/${role.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono text-white group-hover:text-vantage-electric transition-colors"
                  >
                    <span>View Role</span>
                    <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/careers"
                    state={{ selectedRole: role.title }}
                    className="text-[11px] font-mono text-vantage-electric/80 hover:text-vantage-electric transition-colors"
                  >
                    Quick Apply →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vantage-electric/10 border border-vantage-electric/20 flex items-center justify-center shrink-0">
              <Briefcase size={18} className="text-vantage-electric" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Don&apos;t see an exact match for your background?
              </p>
              <p className="text-xs text-vantage-grey">
                We welcome general open applications from talented engineers, designers, and researchers.
              </p>
            </div>
          </div>
          <Link
            to="/careers#apply"
            className="px-5 py-2.5 rounded-full border border-white/15 text-white hover:border-vantage-electric hover:text-vantage-electric text-xs font-mono uppercase tracking-wider transition-colors shrink-0"
          >
            Submit General Application
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersPreview;

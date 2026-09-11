/**
 * ProblemStatement — upgraded with:
 * - Vengeance UI GlowBorderCard on each problem card
 * - Animista slide-in-blurred-bottom on card entrance
 * - Scroll-driven line reveal
 */
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GlowBorderCard from './ui/GlowBorderCard';

const STATS = [
  { value: '250M+', label: 'People with severe visual impairment worldwide' },
  { value: '90%', label: 'Live in low-to-middle income countries' },
  { value: '$4B+', label: 'Market for assistive vision tech by 2030' },
];

const PROBLEMS = [
  {
    number: '01',
    title: 'The cane only maps the ground.',
    body: 'Traditional white canes detect ground-level obstacles. Head-height hazards — overhanging branches, open cabinet doors, construction scaffolding — remain completely invisible.',
  },
  {
    number: '02',
    title: 'Audio narration is cognitively exhausting.',
    body: 'Existing solutions bombard users with constant verbal alerts, hijacking their hearing — the primary sense blind people rely on to understand the world around them.',
  },
  {
    number: '03',
    title: 'Dependence, not independence.',
    body: '70% of visually impaired adults rely on a sighted guide for daily navigation. Technology should close this gap, not enforce it.',
  },
];

const ProblemStatement = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#060606] overflow-hidden border-t border-white/[0.04]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-radial from-red-900/10 via-transparent to-transparent blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.08) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.08) 40px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="max-w-2xl mb-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono text-red-400/70 tracking-[0.3em] uppercase mb-5"
          >
            The Problem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-[1.05] tracking-tight"
          >
            The world is built for
            <br />
            <span className="text-white/35">those who can see it.</span>
          </motion.h2>
          <motion.div
            style={{ scaleX: lineScale, transformOrigin: 'left' }}
            className="mt-8 h-px w-full bg-gradient-to-r from-red-500/40 via-orange-400/20 to-transparent"
          />
        </div>

        {/* Problem Cards — Vengeance UI GlowBorderCard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-24">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlowBorderCard
                colorPreset="ember"
                animationDuration={5 + i}
                borderRadius="1rem"
                borderWidth="2px"
                blurAmount="14px"
              >
                <div className="relative bg-[#080808] rounded-2xl p-10 group hover:bg-white/[0.015] transition-colors duration-500 h-full">
                  <span className="text-[80px] font-bold font-display text-white/[0.04] leading-none select-none absolute top-6 right-8">
                    {p.number}
                  </span>
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-lg border border-red-500/20 bg-red-500/5 flex items-center justify-center mb-6">
                      <div className="w-2 h-2 rounded-full bg-red-400/60" />
                    </div>
                    <h3 className="text-lg font-semibold font-display text-white mb-3 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm text-vantage-grey/75 leading-relaxed font-light">
                      {p.body}
                    </p>
                  </div>
                </div>
              </GlowBorderCard>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/[0.06] pt-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col gap-3"
            >
              <p className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-vantage-grey/70 leading-relaxed max-w-[220px]">
                {stat.label}
              </p>
            </motion.div>
          ))}

          {/* Divider pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="md:col-span-3 mt-6 flex items-center gap-3"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-vantage-electric/30 to-transparent" />
            <span className="text-xs font-mono text-vantage-electric/50 tracking-[0.25em] uppercase">
              Vantage is changing that
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-vantage-electric/30 to-transparent" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ProblemStatement;

/**
 * Benefits — upgraded with:
 * - Vengeance UI StaggeredGrid layout (odd cards offset down)
 * - Vengeance UI GlowBorderCard with electric preset on hover
 * - Animista scale-up-center on card entrance
 */
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, MessageSquareOff, Flag } from 'lucide-react';
import GlowBorderCard from './ui/GlowBorderCard';

const CARDS = [
  {
    icon: ShieldCheck,
    title: 'Unprecedented Safety',
    desc: 'Unlike standard canes, our LiDAR & AI Vision detect head-level obstacles (branches) and \'negative obstacles\' like drop-offs — the most dangerous hazards for blind pedestrians.',
  },
  {
    icon: UserCheck,
    title: 'True Independence',
    desc: 'By providing a reliable, 360-degree environmental model, Vantage reduces reliance on sighted guides, empowering users to commute and socialize on their own terms.',
  },
  {
    icon: MessageSquareOff,
    title: 'Cognitive Freedom',
    desc: 'Intuitive haptic language offloads navigation from the ears. No constant audio chatter means users can focus on conversations and ambient sounds.',
  },
  {
    icon: Flag,
    title: 'National Impact',
    desc: 'A direct enabler of the UAE National Policy for Empowering People of Determination, transforming policy goals into tangible, scalable reality.',
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-28 bg-vantage-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 glow-line" />

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-vantage-electric/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-vantage-electric/60 tracking-widest uppercase mb-4 block"
          >
            Impact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-4 font-display"
          >
            Why Vantage Matters
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-vantage-grey"
          >
            Transforming accessibility into autonomy.
          </motion.p>
        </div>

        {/* Staggered grid — Vengeance UI pattern: odd cards shift down */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:items-start">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 + (i % 2 === 1 ? 32 : 0) }}
              whileInView={{ opacity: 1, y: i % 2 === 1 ? 40 : 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <GlowBorderCard
                colorPreset="electric"
                animationDuration={5 + i * 0.7}
                borderRadius="1rem"
                borderWidth="1.5px"
                blurAmount="12px"
              >
                <div className="relative p-8 bg-vantage-black rounded-2xl overflow-hidden group-hover:bg-white/[0.02] transition-colors duration-500 h-full">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-vantage-electric/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-vantage-grey mb-6 group-hover:border-vantage-electric/20 group-hover:text-vantage-electric group-hover:shadow-[0_0_16px_rgba(0,212,255,0.2)] transition-all duration-500">
                      <card.icon size={22} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 font-display group-hover:text-vantage-electric transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-vantage-grey text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </GlowBorderCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

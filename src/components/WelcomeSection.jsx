import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Aurora from './ui/Aurora';

const WelcomeSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full py-36 overflow-hidden border-t border-white/[0.04]">
            {/* Aurora canvas background (React Bits) */}
            <Aurora
                colorStops={["#001122", "#00334D", "#00D4FF"]}
                amplitude={55}
                blend={0.35}
                speed={0.4}
            />

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-[#050505]/70" />

            {/* Grid mesh overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.022]"
                style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.15) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.15) 40px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Central glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gradient-radial from-vantage-electric/[0.1] via-transparent to-transparent blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6 max-w-3xl mx-auto">

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-lg md:text-2xl font-light font-display text-white/35 tracking-wide leading-relaxed"
                >
                    The problem was right under our noses —
                    <br />
                    <span className="text-white/70">so we built a solution above it.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="w-20 h-px bg-gradient-to-r from-transparent via-vantage-electric/50 to-transparent"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col gap-3 items-center"
                >
                    <h2 className="text-5xl md:text-7xl font-bold font-display text-white tracking-tight">
                        Vantage Vision.
                    </h2>
                    <p className="text-sm font-light text-vantage-electric tracking-[0.3em] uppercase">
                        Navigate with Instinct.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="flex items-center gap-4 mt-4"
                >
                    <button
                        onClick={() => navigate('/vantage-vision-halo')}
                        className="px-7 py-3 rounded-full bg-vantage-electric text-vantage-black font-semibold text-sm hover:shadow-[0_0_28px_rgba(0,212,255,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Meet the Vision Halo <ArrowRight size={15} />
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                    <button
                        onClick={() => navigate('/impact')}
                        className="px-7 py-3 rounded-full border border-white/10 text-white/55 font-medium text-sm hover:border-white/20 hover:text-white transition-all duration-300"
                    >
                        Our Impact
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default WelcomeSection;

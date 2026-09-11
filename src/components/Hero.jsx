/**
 * Hero — upgraded with:
 * - Vengeance UI AnimatedRays background
 * - React Bits Aurora canvas layer
 * - Animista text-focus-in and tracking-in-expand entrances
 * - BlurText (React Bits) on VANTAGE headline
 */
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import Particles from './ui/Particles';
import ShinyText from './ui/ShinyText';
import Aurora from './ui/Aurora';
import AnimatedRays from './ui/AnimatedRays';

const Hero = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Trigger animista classes after mount
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

            {/* ── Background Layers ────────────────────────────── */}
            <div className="absolute inset-0 z-0 pointer-events-none">

                {/* Aurora canvas (React Bits) */}
                <Aurora
                    colorStops={["#001A33", "#003366", "#00D4FF"]}
                    amplitude={60}
                    blend={0.4}
                    speed={0.3}
                />

                {/* Vengeance UI AnimatedRays */}
                <AnimatedRays
                    numRays={14}
                    color="rgba(0,212,255,0.09)"
                    duration={22}
                />

                {/* Logo watermark */}
                <motion.img
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.05, scale: 1 }}
                    transition={{ duration: 3, ease: 'easeOut' }}
                    src="/images/vantage-eye-logo.png"
                    alt=""
                    className="absolute inset-0 m-auto max-w-[70vw] md:max-w-[50vw] max-h-[72vh] object-contain"
                />

                {/* Edge vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-vantage-black/70 via-transparent to-vantage-black/95" />
                <div className="absolute inset-0 bg-gradient-to-r from-vantage-black/50 via-transparent to-vantage-black/50" />

                {/* Central electric orb — breathing animation */}
                <motion.div
                    animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0.28, 0.15] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,212,255,0.18) 0%, rgba(0,212,255,0.04) 50%, transparent 70%)',
                        filter: 'blur(35px)',
                    }}
                />

                {/* Particles */}
                <Particles quantity={45} color="#00D4FF" opacity={0.2} speed={0.25} />
            </div>

            {/* ── Content ─────────────────────────────────────── */}
            <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">

                {/* Eyebrow pill — Animista slide-in-top */}
                <div
                    className={`mb-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-vantage-electric/20 bg-vantage-electric/[0.05] backdrop-blur-sm ${mounted ? 'anim-slide-in-top' : 'opacity-0'}`}
                    style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-vantage-electric animate-pulse" />
                    <ShinyText
                        text="Assistive Intelligence — Dubai, UAE"
                        className="text-[11px] font-mono tracking-[0.22em] uppercase text-vantage-electric/80"
                        speed={4}
                    />
                </div>

                {/* Main headline — React Bits BlurText style via Animista text-focus-in */}
                <div className="overflow-visible mb-7">
                    <h1
                        className={`text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-[-0.055em] text-white font-display leading-none ${mounted ? 'anim-text-focus-in' : 'opacity-0'}`}
                        style={{ animationDelay: '0.3s', animationDuration: '0.9s', animationFillMode: 'both' }}
                    >
                        VANTAGE
                    </h1>
                </div>

                {/* Sub-headline — Animista tracking-in-expand */}
                <div
                    className={`mb-14 ${mounted ? 'anim-tracking-expand' : 'opacity-0'}`}
                    style={{ animationDelay: '0.65s', animationDuration: '0.9s', animationFillMode: 'both' }}
                >
                    <p className="text-base md:text-lg text-vantage-grey/60 font-light tracking-[0.28em] uppercase">
                        Navigate with Instinct
                    </p>
                </div>

                {/* CTA pills — Animista fade-in + scale-up */}
                <div
                    className={`flex items-center gap-4 mb-20 ${mounted ? 'anim-scale-up' : 'opacity-0'}`}
                    style={{ animationDelay: '1s', animationDuration: '0.6s', animationFillMode: 'both' }}
                >
                    <a
                        href="/vantage-vision-halo"
                        className="px-7 py-3 rounded-full bg-vantage-electric text-vantage-black font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-[1.03] transition-all duration-300 relative overflow-hidden group"
                    >
                        <span className="relative z-10">Explore the Vision Halo</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                    <a
                        href="#benefits"
                        className="px-7 py-3 rounded-full border border-white/12 text-white/70 font-medium text-sm hover:border-vantage-electric/30 hover:text-white hover:bg-vantage-electric/[0.05] transition-all duration-300"
                    >
                        Our Mission
                    </a>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.4, delay: 1.6 }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] text-vantage-grey/35 tracking-[0.32em] uppercase font-mono">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 7, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ArrowDown className="text-vantage-electric/35" size={16} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

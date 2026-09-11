/**
 * Navbar — upgraded with Vengeance UI Spotlight effect
 * A glowing spotlight follows the cursor across the nav bar
 */
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [spotlightX, setSpotlightX] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseMove = (e) => {
        if (!navRef.current) return;
        const rect = navRef.current.getBoundingClientRect();
        setSpotlightX(e.clientX - rect.left);
    };

    const navLinks = [
        { name: 'Vantage Vision Halo', path: '/vantage-vision-halo' },
        { name: 'Vantage Lucid', path: '/vantage-lucid' },
        { name: 'Manifesto', path: '/manifesto' },
        { name: 'Careers', path: '/careers' },
    ];

    return (
        <nav
            ref={navRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => { setIsHovering(false); setSpotlightX(null); }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-hidden ${
                scrolled ? 'glass-dark py-3' : 'bg-transparent py-6'
            }`}
        >
            {/* ── Spotlight ─────────────────────────────────────── */}
            <AnimatePresence>
                {isHovering && spotlightX !== null && (
                    <motion.div
                        key="spotlight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-0 bottom-0 pointer-events-none z-0"
                        style={{
                            left: spotlightX - 120,
                            width: 240,
                            background:
                                'radial-gradient(ellipse 120px 100% at 50% 50%, rgba(0,212,255,0.09) 0%, transparent 100%)',
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Glow line when scrolled */}
            {scrolled && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vantage-electric/20 to-transparent" />
            )}

            <div className="container mx-auto px-6 flex items-center justify-between relative z-10">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2 cursor-pointer group anim-slide-in-top"
                    style={{ animationDelay: '0.1s' }}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <span className="text-2xl font-bold tracking-[-0.05em] text-white group-hover:text-vantage-electric transition-all duration-300 font-display">
                        VANTAGE VISION
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`relative text-sm font-medium tracking-wide transition-all duration-300 anim-slide-in-top ${
                                location.pathname === link.path
                                    ? 'text-white'
                                    : 'text-vantage-grey hover:text-white'
                            }`}
                            style={{ animationDelay: `${0.1 + i * 0.06}s` }}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute -bottom-1 left-0 right-0 h-px bg-vantage-electric"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:block anim-slide-in-top" style={{ animationDelay: '0.35s' }}>
                    <Link
                        to="/contact"
                        className="relative flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-vantage-electric/40 hover:bg-vantage-electric/[0.05] hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-400 text-sm font-medium group overflow-hidden"
                    >
                        <span className="relative z-10">Get in Touch</span>
                        <ArrowRight size={15} className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white relative z-50" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="fixed inset-0 bg-vantage-black/92 z-40 md:hidden"
                    >
                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-vantage-electric/5 rounded-full blur-[120px] pointer-events-none" />
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-3xl font-bold text-white hover:text-vantage-electric transition-colors font-display"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                            >
                                <Link
                                    to="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="mt-4 px-8 py-3 rounded-full border border-vantage-electric/30 text-vantage-electric text-lg font-medium hover:bg-vantage-electric/10 transition-colors"
                                >
                                    Get in Touch
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

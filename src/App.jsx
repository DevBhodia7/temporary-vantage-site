import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Manifesto from './pages/Manifesto';
import VantageVisionHalo from './pages/VantageVisionHalo';
import Contact from './pages/Contact';
import VantageLucid from './pages/VantageLucid';
import PitchDeck from './pages/PitchDeck';
import Impact from './pages/Impact';
import Careers from './pages/Careers';
import CareerRole from './pages/CareerRole';
import { useEffect } from 'react';
import './animations.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Page transition wrapper — smooth fade + subtle upward slide between routes
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// AnimatedRoutes must be inside Router to access useLocation
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/manifesto" element={<PageTransition><Manifesto /></PageTransition>} />
        <Route path="/vantage-vision-halo" element={<PageTransition><VantageVisionHalo /></PageTransition>} />
        <Route path="/vantage-lucid" element={<PageTransition><VantageLucid /></PageTransition>} />
        <Route path="/pitch-deck" element={<PageTransition><PitchDeck /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/impact" element={<PageTransition><Impact /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/careers/:slug" element={<PageTransition><CareerRole /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-vantage-black min-h-screen text-white selection:bg-vantage-electric/30 selection:text-white">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

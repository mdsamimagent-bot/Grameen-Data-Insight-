
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SiteConfig } from '../types';
import { Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  config: SiteConfig;
  onStartProject: () => void;
}

const Header: React.FC<HeaderProps> = ({ config, onStartProject }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const textRotation = useTransform(scrollY, [0, 500], [0, -10]);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Verification', id: 'verification' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'inquiry' },
  ];

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src={config.logoUrl} 
            alt="Logo" 
            className="w-12 h-12 object-cover rounded-xl shadow-md border-2 border-green-500 bg-white" 
          />
          <motion.h1 
            style={{ rotateX: textRotation }}
            className={`font-outfit font-bold text-xl whitespace-nowrap hidden lg:block ${
              isScrolled ? 'text-green-700' : 'text-white'
            } three-d-text`}
          >
            Grameen Data Insight (GDI)
          </motion.h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-sm font-semibold transition-colors hover:text-green-500 flex items-center gap-1 ${
                isScrolled ? 'text-slate-600' : 'text-white'
              }`}
            >
              {item.id === 'verification' && <ShieldCheck size={14} className="text-green-500" />}
              {item.label}
            </a>
          ))}
          <button 
            onClick={onStartProject}
            className="ml-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Start Project
          </button>
        </nav>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-slate-800' : 'text-white'}`}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <a 
                  key={item.label}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-slate-600 font-bold hover:text-green-600 flex items-center gap-2"
                >
                  {item.id === 'verification' && <ShieldCheck size={18} className="text-green-500" />}
                  {item.label}
                </a>
              ))}
              <button 
                onClick={() => {
                  onStartProject();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-green-600 text-white font-bold rounded-xl mt-2"
              >
                Start Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

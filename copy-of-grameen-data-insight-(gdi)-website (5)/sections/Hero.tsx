
import React from 'react';
import { motion } from 'framer-motion';
import { SiteConfig } from '../types';
import { Users, Map, ShieldCheck, Database } from 'lucide-react';

interface HeroProps {
  config: SiteConfig;
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  const stats = [
    { label: 'Household Surveys', value: config.householdCount, icon: <Users size={20} className="text-white" /> },
    { label: 'Active Agents', value: config.activeAgentsCount, icon: <Map size={20} className="text-white" /> },
    { label: 'Districts Covered', value: config.districtCount, icon: <ShieldCheck size={20} className="text-white" /> },
    { label: 'Data Accuracy', value: config.accuracyRate, icon: <Database size={20} className="text-white" /> }
  ];

  return (
    <section id="hero" className="relative min-h-[100vh] lg:min-h-[110vh] w-full flex flex-col items-center justify-center overflow-hidden pb-24">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 scale-110"
        style={{
          backgroundImage: `url(${config.heroImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center perspective-1000 mt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="preserve-3d"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-outfit font-extrabold mb-6 tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-green-500 three-d-text block md:inline">
              {config.heroTitle}
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-10"
          >
            {config.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20"
          >
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95"
            >
              Explore Our Services
            </button>
            <button 
              onClick={() => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 backdrop-blur-md transition-all transform hover:-translate-y-1"
            >
              Contact Us
            </button>
          </motion.div>
        </motion.div>

        {/* Stats Section Overlayed on Cover - High Transparency Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/10 flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-2 hover:bg-white/15 hover:border-white/30"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-500/40 transition-colors">
                {stat.icon}
              </div>
              <h4 className="text-3xl font-outfit font-extrabold text-white tracking-tight">{stat.value}</h4>
              <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.2em] mt-2 group-hover:text-white/80 transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3D Floating Elements */}
      <motion.div 
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 right-[5%] w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] hidden lg:block"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-[5%] w-80 h-80 bg-green-500/10 rounded-full blur-[120px] hidden lg:block"
      />
    </section>
  );
};

export default Hero;


import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { SiteConfig } from '../types';
import { motion } from 'framer-motion';

interface IntroProps {
  config: SiteConfig;
}

const Intro: React.FC<IntroProps> = ({ config }) => {
  return (
    <section id="intro" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader title={config.introTitle} />
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative group perspective-1000">
              <motion.img 
                whileHover={{ rotateY: 10, rotateX: 10 }}
                src={config.introImageUrl} // Now customizable
                alt="Market Research" 
                className="rounded-2xl shadow-2xl transition-transform duration-500 w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-100 rounded-2xl -z-10 transition-transform group-hover:translate-x-4 group-hover:translate-y-4"></div>
            </div>
            
            <div className="space-y-6">
              <p className="text-xl text-slate-600 leading-relaxed font-light italic">
                "{config.introDescription}"
              </p>
              <div className="flex items-center gap-4 text-green-600">
                <div className="w-12 h-1 bg-green-600"></div>
                <span className="font-bold tracking-widest uppercase text-sm">Empowering Business Decisions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Intro;

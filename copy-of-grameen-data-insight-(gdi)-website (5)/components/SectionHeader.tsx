
import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, light }) => {
  return (
    <div className="mb-12 text-center perspective-1000">
      <motion.h2 
        initial={{ opacity: 0, y: 20, rotateX: 20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`text-4xl md:text-5xl font-outfit font-extrabold mb-4 ${
          light ? 'text-white' : 'text-slate-800'
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={`text-lg max-w-2xl mx-auto ${
            light ? 'text-white/80' : 'text-slate-500'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
      <div className="w-24 h-1.5 bg-green-500 mx-auto mt-6 rounded-full shadow-lg shadow-green-500/30"></div>
    </div>
  );
};

export default SectionHeader;

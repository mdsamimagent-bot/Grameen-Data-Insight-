
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Partner } from '../types';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface PartnersProps {
  partners: Partner[];
}

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  return (
    <section id="partners" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <SectionHeader title="Our Partners & Clients" subtitle="Collaborating with industry leaders to deliver actionable insights across Bangladesh." />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 group hover:border-green-200 transition-colors flex flex-col sm:flex-row gap-8 items-start sm:items-center"
            >
              <div className="w-24 h-24 shrink-0 p-4 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-green-50 transition-colors shadow-inner">
                <img 
                  src={partner.logoUrl} 
                  alt={partner.name} 
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-slate-800 mb-2">{partner.name}</h4>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{partner.description}</p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-green-700 text-[10px] font-black uppercase tracking-widest mb-2">
                    <Briefcase size={14} />
                    <span>Collaboration Impact</span>
                  </div>
                  <p className="text-slate-700 text-sm italic leading-relaxed">"{partner.completedWork}"</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {partners.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold uppercase tracking-widest italic">Our prestigious partners will appear here soon.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Partners;

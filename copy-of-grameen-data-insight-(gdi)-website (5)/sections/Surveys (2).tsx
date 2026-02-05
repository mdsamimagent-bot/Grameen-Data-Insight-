
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { Survey } from '../types';
import { ExternalLink } from 'lucide-react';

interface SurveysProps {
  surveys: Survey[];
}

const Surveys: React.FC<SurveysProps> = ({ surveys }) => {
  return (
    <section id="surveys" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionHeader title="Active & Recent Surveys" subtitle="Participate in our ongoing research or view past results." />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {surveys.map((survey, index) => (
            <motion.div
              key={survey.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    survey.status === 'Running' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {survey.status}
                  </span>
                  {survey.status === 'Running' && (
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-green-600 transition-colors">
                  {survey.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {survey.description}
                </p>
              </div>
              <a 
                href={survey.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-50 hover:bg-green-600 hover:text-white py-4 px-8 border-t border-slate-100 flex items-center justify-between font-bold text-slate-700 transition-all"
              >
                <span>Go to Survey</span>
                <ExternalLink size={18} />
              </a>
            </motion.div>
          ))}
          
          {surveys.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No surveys available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Surveys;

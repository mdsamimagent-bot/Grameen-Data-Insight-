
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Globe, Target } from 'lucide-react';

const WhoWeServe: React.FC = () => {
  const points = [
    { icon: <Target className="text-blue-600" />, title: "Who We Serve", text: "Global corporations, local startups, NGOs, and government agencies seeking ground-level truth in Bangladesh." },
    { icon: <ShieldCheck className="text-green-600" />, title: "Why Trust GDI", text: "Verified field agent network across all 64 districts ensures authentic, unbiased, and high-quality data collection." },
    { icon: <TrendingUp className="text-blue-600" />, title: "Power of Data", text: "In a rapidly evolving economy, data is the compass for risk mitigation and strategic scaling for your organization." },
    { icon: <Globe className="text-green-600" />, title: "Total Coverage", text: "From urban household surveys to deep rural market analysis, we bridge the gap between complex dynamics and clarity." }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-green-600 via-green-700 to-blue-800 text-white overflow-hidden relative">
      {/* 3D Background Decals */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader title="Who We Serve & Why Data Matters" light />
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {points.map((p, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  {p.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{p.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-2xl text-slate-800 perspective-1000 transform hover:rotate-y-0 transition-transform duration-700 md:rotate-y-[-5]"
          >
            <h3 className="text-3xl font-outfit font-bold mb-6 text-green-600">Actionable Intelligence</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We specialize in rural, urban, local market, business, and household-level data collection. Our mission is to transform raw observations into strategic assets for your sustainable decision-making.
            </p>
            <div className="space-y-4">
              {[
                'Real-time verification of field agent activity',
                'Multi-layered data cleaning & validation',
                'Integrity-first research methodologies',
                'Comprehensive reporting & visualization'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  </div>
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <button className="mt-10 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-600/20">
              Request a Consultation
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;


import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { SiteConfig } from '../types';
import { Rocket, Eye, Target, CheckCircle2, Map } from 'lucide-react';

interface AboutProps {
  config: SiteConfig;
}

const BulletList: React.FC<{ text: string }> = ({ text }) => {
  const points = text.split('\n').filter(p => p.trim() !== '');
  return (
    <ul className="text-left space-y-2 mt-4">
      {points.map((point, i) => (
        <li key={i} className="flex items-start gap-2 text-slate-500 text-sm leading-relaxed">
          <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
          <span>{point.replace(/^•\s*/, '')}</span>
        </li>
      ))}
    </ul>
  );
};

const About: React.FC<AboutProps> = ({ config }) => {
  const items = [
    { title: 'Mission', content: config.mission, icon: <Rocket className="text-green-600" />, color: 'bg-green-50' },
    { title: 'Vision', content: config.vision, icon: <Eye className="text-blue-600" />, color: 'bg-blue-50' },
    { title: 'Goals', content: config.goals, icon: <Target className="text-purple-600" />, color: 'bg-purple-50' },
  ];

  const districts = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogra", "Brahmanbaria", "Chandpur", 
    "Chattogram", "Chuadanga", "Comilla", "Cox's Bazar", "Dhaka", "Dinajpur", "Faridpur", "Feni", 
    "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", 
    "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", 
    "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", 
    "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", 
    "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", 
    "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", 
    "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <SectionHeader title={config.aboutTitle} subtitle="Strategic objectives driving our excellence in data collection and research." />
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
              className="p-8 rounded-3xl shadow-xl shadow-slate-100 border border-slate-50 flex flex-col h-full bg-white transition-all duration-300"
            >
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-outfit font-bold text-slate-800 mb-2">{item.title}</h3>
              <BulletList text={item.content} />
            </motion.div>
          ))}
        </div>

        {/* Why Choose GDI Section */}
        <div className="mt-20">
          <SectionHeader title="Why Choose GDI?" subtitle="Unmatched quality and reliability for every research project." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Local Expertise', text: 'Deep knowledge of Bangladesh’s diverse regional markets.' },
              { title: 'Accuracy & Reliability', text: 'Data quality is our absolute top priority.' },
              { title: 'Professional & Ethical', text: 'Strict adherence to global ethical research standards.' },
              { title: 'Client-Centric', text: 'Tailored services to meet your specific project goals.' }
            ].map((reason, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center"
              >
                <h4 className="font-bold text-slate-800 mb-2">{reason.title}</h4>
                <p className="text-slate-500 text-sm">{reason.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Growth Strategy Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-10 bg-gradient-to-r from-slate-900 to-slate-800 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative"
        >
          <div className="relative z-10">
            <h4 className="text-3xl font-outfit font-bold mb-2">Future Growth Strategy</h4>
            <p className="text-white/60 max-w-xl">{config.futureGrowth}</p>
          </div>
          <button 
            onClick={() => document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative z-10 px-10 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Partner With Us
          </button>
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>

        {/* District Coverage Section - Added per user request */}
        <div id="districts" className="mt-32 p-12 bg-slate-50 rounded-[4rem] border border-slate-100 shadow-inner overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
          
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Map size={14} /> Global Standards, Local Reach
            </div>
            <h2 className="text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 mb-6 tracking-tight">
              Survey Coverage Across Bangladesh
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-light">
              We conduct surveys and data collection in all <span className="font-bold text-green-600">64 districts of Bangladesh</span>, ensuring accurate and comprehensive insights for businesses, NGOs, and government projects.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {districts.map((district, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 20) * 0.03 }}
                whileHover={{ y: -5, backgroundColor: '#ffffff', scale: 1.05 }}
                className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white shadow-sm flex items-center justify-center text-center transition-all group"
              >
                <span className="text-sm font-bold text-slate-700 group-hover:text-green-600 transition-colors">
                  {district}
                </span>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Total National Footprint • GDI Field Network</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

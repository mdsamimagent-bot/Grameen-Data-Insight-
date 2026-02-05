
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { Service, SiteConfig } from '../types';
import { BarChart, ClipboardCheck, Users, Database, Lightbulb } from 'lucide-react';

interface ServicesProps {
  services: Service[];
  config: SiteConfig;
}

const IconMap: Record<string, any> = {
  BarChart,
  ClipboardCheck,
  Users,
  Database,
  Lightbulb
};

const Services: React.FC<ServicesProps> = ({ services, config }) => {
  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader title="Our Services" subtitle="Tailored research solutions designed for the unique landscape of Bangladesh." />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = IconMap[service.icon] || BarChart;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/30 border border-slate-100 flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner border border-green-100">
                  <Icon size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-outfit font-bold text-slate-800 mb-4">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">{service.description}</p>
                  {service.link && (
                    <a 
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 font-bold gap-2 hover:gap-4 transition-all"
                    >
                      <span>Explore Project</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

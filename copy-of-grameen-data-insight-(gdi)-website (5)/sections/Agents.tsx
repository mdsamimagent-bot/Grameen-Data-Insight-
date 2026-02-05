
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Agent } from '../types';
import { motion } from 'framer-motion';
import { BadgeCheck, MapPin } from 'lucide-react';

interface AgentsProps {
  agents: Agent[];
}

const Agents: React.FC<AgentsProps> = ({ agents }) => {
  return (
    <section id="agents" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <SectionHeader title="Our Agent Network" subtitle="Over 500+ verified field agents across Bangladesh." />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, rotateX: 5 }}
              className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-100 border border-slate-50 flex flex-col items-center text-center perspective-1000 group"
            >
              <div className="relative mb-6">
                <img 
                  src={agent.photoUrl} 
                  alt={agent.name} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-green-50 shadow-lg group-hover:border-green-500 transition-colors"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
                  <BadgeCheck size={16} />
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-slate-800 mb-1">{agent.name}</h4>
              <p className="text-green-600 font-bold text-sm mb-4">{agent.agentId}</p>
              
              <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-4 py-2 rounded-full text-xs font-semibold">
                <MapPin size={14} className="text-blue-500" />
                <span>{agent.workingArea}</span>
              </div>
            </motion.div>
          ))}
          
          {agents.length === 0 && (
            <div className="col-span-full text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
              Agent data is currently restricted.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Agents;

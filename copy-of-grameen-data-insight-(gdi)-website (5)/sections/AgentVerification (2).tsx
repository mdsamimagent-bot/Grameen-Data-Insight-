
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BadgeCheck, ShieldAlert, User, MapPin, Phone } from 'lucide-react';
import { Agent } from '../types';
import SectionHeader from '../components/SectionHeader';

interface AgentVerificationProps {
  agents: Agent[];
}

const AgentVerification: React.FC<AgentVerificationProps> = ({ agents }) => {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState<Agent | null | 'not_found'>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    
    const found = agents.find(a => a.agentId.toLowerCase() === searchId.trim().toLowerCase());
    setResult(found || 'not_found');
  };

  return (
    <section id="verification" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* 3D background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader title="Agent Verification" subtitle="Enter an Agent ID to verify the authenticity of a GDI representative." light />
        
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleVerify} className="relative mb-12">
            <input 
              type="text" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Agent ID (e.g. GDI-001)"
              className="w-full pl-12 pr-32 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-xl"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
            >
              Verify
            </button>
          </form>

          <AnimatePresence mode="wait">
            {result === 'not_found' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-8 bg-red-500/20 border border-red-500/30 rounded-3xl text-center backdrop-blur-md"
              >
                <ShieldAlert size={48} className="text-red-500 mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Unverified ID</h4>
                <p className="text-red-200">The ID "{searchId}" is not associated with any active GDI agent. Please be cautious.</p>
              </motion.div>
            )}

            {result && result !== 'not_found' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-8 bg-white/10 border border-green-500/30 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <BadgeCheck size={14} /> Verified Agent
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <img 
                    src={result.photoUrl} 
                    alt={result.name} 
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-green-500/50"
                  />
                  <div className="text-center md:text-left space-y-3">
                    <div>
                      <h4 className="text-2xl font-bold text-white">{result.name}</h4>
                      <p className="text-green-400 font-bold tracking-widest">{result.agentId}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/70 text-sm justify-center md:justify-start">
                        <MapPin size={14} /> <span>{result.workingArea}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70 text-sm justify-center md:justify-start">
                        <User size={14} /> <span>{result.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AgentVerification;

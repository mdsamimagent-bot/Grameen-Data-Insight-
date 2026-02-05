
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { ProjectSubmission } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<ProjectSubmission, 'id' | 'date'>) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    projectType: '',
    targetAudience: '',
    country: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ projectType: '', targetAudience: '', country: '', name: '', email: '', phone: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="bg-green-600 p-8 text-white relative">
              <h2 className="text-3xl font-outfit font-bold">Start Your Project</h2>
              <p className="text-green-100">Tell us about your research goals and let's build insights together.</p>
              <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Project Type / Details</label>
                  <input 
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="e.g. Market Analysis"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Target Audience</label>
                  <input 
                    required
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="e.g. Urban Youth"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Country</label>
                  <input 
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="e.g. Bangladesh"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input 
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="+880..."
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                Submit Project Details
                <CheckCircle2 size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

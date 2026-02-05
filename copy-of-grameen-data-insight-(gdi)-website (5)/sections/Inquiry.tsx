
import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { SiteConfig, ContactSubmission } from '../types';
import { Mail, Phone, MapPin, Send, MessageCircle, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

interface InquiryProps {
  config: SiteConfig;
  onSubmit: (data: Omit<ContactSubmission, 'id' | 'date'>) => void;
}

const Inquiry: React.FC<InquiryProps> = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  return (
    <section id="inquiry" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader title="Contact Us" subtitle="We're here to help you navigate the complexities of data research in Bangladesh." />
        
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden"
            >
              <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-green-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email Us</p>
                    <p className="font-semibold text-sm break-all">{config.contactEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Call Us</p>
                    <p className="font-semibold">{config.contactPhone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-green-500">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">WhatsApp</p>
                    <p className="font-semibold">{config.contactWhatsapp}</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-500">
                    <Facebook size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Facebook</p>
                    <a href={config.contactFacebookLink} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-blue-400 transition-colors">
                      {config.contactFacebookName}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-purple-400 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Location</p>
                    <p className="font-semibold leading-relaxed text-sm">{config.contactAddress}</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-500/10 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-xl"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={40} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h4>
                  <p className="text-slate-500">Thank you for your inquiry. Our team will contact you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-green-600 font-bold hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none"
                        placeholder="Your Name"
                      />
                    </div>
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
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send size={18} />}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inquiry;

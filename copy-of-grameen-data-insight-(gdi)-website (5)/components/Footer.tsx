
import React from 'react';
import { SiteConfig } from '../types';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, ShieldCheck } from 'lucide-react';

interface FooterProps {
  config: SiteConfig;
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ config, onAdminClick }) => {
  return (
    <footer id="footer" className="bg-slate-50 pt-24 pb-8 border-t border-slate-200 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={config.logoUrl} alt="Logo" className="w-10 h-10 object-cover rounded-lg shadow-md" />
              <h3 className="text-xl font-outfit font-bold text-green-700">GDI</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Professional market research company dedicated to high-quality data and actionable insights across Bangladesh.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-700 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-800 mb-6 border-b border-green-200 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#hero" className="hover:text-green-600 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-green-600 transition-colors">About GDI</a></li>
              <li><a href="#services" className="hover:text-green-600 transition-colors">Our Services</a></li>
              <li><a href="#surveys" className="hover:text-green-600 transition-colors">Active Surveys</a></li>
              <li><a href="#inquiry" className="hover:text-green-600 transition-colors">Business Inquiry</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-800 mb-6 border-b border-green-200 pb-2 inline-block">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#verification" className="hover:text-green-600 transition-colors">Agent Verification</a></li>
              <li><a href="#" className="hover:text-green-600 transition-colors">Become a Partner</a></li>
              <li><a href="#" className="hover:text-green-600 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-800 mb-6 border-b border-green-200 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-6 text-sm text-slate-500">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-green-600 mt-1 shrink-0" />
                <span>{config.contactAddress}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-green-600 shrink-0" />
                <span>{config.contactPhone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-green-600 shrink-0" />
                <span>{config.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} Grameen Data Insight (GDI). All rights reserved.</p>
          <div className="flex items-center gap-6">
             <button 
                onClick={onAdminClick}
                className="flex items-center gap-1.5 text-[10px] font-black text-slate-300 hover:text-slate-400 uppercase tracking-[0.2em] transition-colors"
             >
                <ShieldCheck size={12} />
                GDI Panel
             </button>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Designed for Excellence.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

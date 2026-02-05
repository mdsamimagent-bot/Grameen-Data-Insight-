
import React, { useState } from 'react';
// Added missing import for motion
import { motion } from 'framer-motion';
import { SiteConfig, Survey, Agent, Partner, Service, ProjectSubmission, ContactSubmission } from '../types';
import { X, Plus, Trash2, Globe, Users, Briefcase, FileText, BarChart, Inbox, MessageSquare, BadgeCheck, Phone, MapPin, Lock, ShieldCheck, Rocket, Eye, Target, Lightbulb, MessageCircle, Facebook } from 'lucide-react';

interface AdminPanelProps {
  isAuthenticated: boolean;
  onLoginSuccess: () => void;
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  surveys: Survey[];
  setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>;
  agents: Agent[];
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
  partners: Partner[];
  setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
  projectSubmissions: ProjectSubmission[];
  setProjectSubmissions: React.Dispatch<React.SetStateAction<ProjectSubmission[]>>;
  contactSubmissions: ContactSubmission[];
  setContactSubmissions: React.Dispatch<React.SetStateAction<ContactSubmission[]>>;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  isAuthenticated,
  onLoginSuccess,
  config, setConfig,
  services, setServices,
  surveys, setSurveys,
  agents, setAgents,
  partners, setPartners,
  projectSubmissions, setProjectSubmissions,
  contactSubmissions, setContactSubmissions,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'services' | 'about' | 'surveys' | 'agents' | 'partners' | 'submissions' | 'messages'>('general');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin_gdi' && password === 'GDI_Secure_2024!') {
      onLoginSuccess();
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: 'New Service',
      description: 'Describe the research service here.',
      icon: 'BarChart'
    };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addPartner = () => {
    const newPartner: Partner = { 
      id: Date.now().toString(), 
      name: 'New Partner Name', 
      logoUrl: 'https://picsum.photos/seed/partner/120/80', 
      description: 'Describe partner here...', 
      completedWork: 'Details of collaboration...' 
    };
    setPartners(prev => [...prev, newPartner]);
  };

  const updatePartner = (id: string, field: keyof Partner, value: string) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addAgent = () => {
    const newAgent: Agent = { 
      id: Date.now().toString(), 
      name: 'New Agent', 
      agentId: `GDI-${Math.floor(Math.random()*900)+100}`, 
      workingArea: 'Dhaka', 
      photoUrl: 'https://picsum.photos/seed/agent/200/200', 
      phone: '', 
      address: '' 
    };
    setAgents(prev => [...prev, newAgent]);
  };

  const updateAgent = (id: string, field: keyof Agent, value: string) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const addSurvey = () => {
    const newSurvey: Survey = { id: Date.now().toString(), title: 'New Survey', description: '', status: 'Running', link: '#' };
    setSurveys(prev => [...prev, newSurvey]);
  };

  const updateSurvey = (id: string, field: keyof Survey, value: string) => {
    setSurveys(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[70] bg-slate-900 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          <div className="bg-green-600 p-10 text-white text-center">
            <ShieldCheck size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl font-outfit font-bold">GDI Panel</h2>
            <p className="text-green-100 text-sm">Secure Administrative Access</p>
          </div>
          <form onSubmit={handleLogin} className="p-10 space-y-6">
            {error && <p className="text-red-500 text-sm text-center font-bold bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Username</label>
                <div className="relative">
                  <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    placeholder="Enter admin username"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    placeholder="Enter password"
                  />
                </div>
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95"
            >
              Unlock Access
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-2 text-slate-400 text-xs font-bold hover:text-slate-600 transition-colors uppercase tracking-widest"
            >
              Return to Website
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] bg-slate-100 flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-slate-900 text-white p-6 flex flex-col shadow-2xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-green-500/20">GDI</div>
          <h2 className="text-xl font-outfit font-bold uppercase tracking-widest">Admin</h2>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {[
            { id: 'general', label: 'Main Content', icon: Globe },
            { id: 'about', label: 'Mission & Strategy', icon: Target },
            { id: 'surveys', label: 'Live Surveys', icon: FileText },
            { id: 'agents', label: 'Agent Database', icon: Users },
            { id: 'partners', label: 'Partners/Clients', icon: Briefcase },
            { id: 'services', label: 'Core Services', icon: BarChart },
            { id: 'submissions', label: 'Project Leads', icon: Inbox },
            { id: 'messages', label: 'Contact Inbox', icon: MessageSquare },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-green-600 text-white shadow-xl shadow-green-600/20' : 'text-slate-400 hover:bg-white/5'}`}
            >
              <tab.icon size={18} />
              <span className="text-sm font-semibold">{tab.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={onClose} className="mt-6 flex items-center gap-3 p-4 bg-white/5 hover:bg-red-600/20 hover:text-red-400 rounded-2xl transition-all text-slate-400 border border-white/5">
          <X size={20} />
          <span className="font-semibold">Logout & Exit</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-white">
        <div className="max-w-5xl mx-auto pb-24">
          
          {activeTab === 'general' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h3 className="text-3xl font-outfit font-bold text-slate-800">Branding & Contact Details</h3>
              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Logo URL</label>
                    <input name="logoUrl" value={config.logoUrl} onChange={handleConfigChange} className="w-full p-4 rounded-xl border border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cover Photo URL</label>
                    <input name="heroImageUrl" value={config.heroImageUrl} onChange={handleConfigChange} className="w-full p-4 rounded-xl border border-slate-200" />
                  </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Website Title</label>
                    <input name="heroTitle" value={config.heroTitle} onChange={handleConfigChange} className="w-full p-4 rounded-xl border border-slate-200 font-bold" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Main Slogan</label>
                    <textarea rows={2} name="heroSubtitle" value={config.heroSubtitle} onChange={handleConfigChange} className="w-full p-4 rounded-xl border border-slate-200 resize-none" />
                </div>

                <div className="pt-8 border-t border-slate-200 space-y-6">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2"><Phone size={18} /> Contact Information</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                      <input name="contactPhone" value={config.contactPhone} onChange={handleConfigChange} className="w-full p-3 rounded-xl border border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                      <input name="contactEmail" value={config.contactEmail} onChange={handleConfigChange} className="w-full p-3 rounded-xl border border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">WhatsApp Number</label>
                      <input name="contactWhatsapp" value={config.contactWhatsapp} onChange={handleConfigChange} className="w-full p-3 rounded-xl border border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location Address</label>
                      <input name="contactAddress" value={config.contactAddress} onChange={handleConfigChange} className="w-full p-3 rounded-xl border border-slate-200" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Facebook Page Name</label>
                      <input name="contactFacebookName" value={config.contactFacebookName} onChange={handleConfigChange} className="w-full p-3 rounded-xl border border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Facebook Page Link</label>
                      <input name="contactFacebookLink" value={config.contactFacebookLink} onChange={handleConfigChange} className="w-full p-3 rounded-xl border border-slate-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h3 className="text-3xl font-outfit font-bold text-slate-800">Mission, Vision & About</h3>
              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 space-y-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">About Section Image</label>
                  <div className="flex gap-4 items-center">
                    <img src={config.introImageUrl} className="w-24 h-24 object-cover rounded-2xl border-4 border-white shadow-md" />
                    <input name="introImageUrl" value={config.introImageUrl} onChange={handleConfigChange} className="flex-1 p-4 rounded-xl border border-slate-200" placeholder="Image URL" />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Rocket size={14} className="text-green-500"/> Mission Statement</label>
                    <textarea rows={4} name="mission" value={config.mission} onChange={handleConfigChange} className="w-full p-4 rounded-xl border border-slate-200 resize-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Eye size={14} className="text-blue-500"/> Vision Statement</label>
                    <textarea rows={4} name="vision" value={config.vision} onChange={handleConfigChange} className="w-full p-4 rounded-xl border border-slate-200 resize-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Target size={14} className="text-purple-500"/> Strategic Goals</label>
                    <textarea rows={4} name="goals" value={config.goals} onChange={handleConfigChange} className="w-full p-4 rounded-xl border border-slate-200 resize-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Future Growth Plan</label>
                    <textarea rows={3} name="futureGrowth" value={config.futureGrowth} onChange={handleConfigChange} className="w-full p-4 rounded-xl border border-slate-200 resize-none" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-outfit font-bold text-slate-800">Business Stats & Services</h3>
                <button onClick={addService} className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl transition-all">
                  <Plus size={20} /> Add New Service
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-6 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Household Count</label>
                  <input name="householdCount" value={config.householdCount} onChange={handleConfigChange} className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-black text-xl text-green-600 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Agents Count</label>
                  <input name="activeAgentsCount" value={config.activeAgentsCount} onChange={handleConfigChange} className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-black text-xl text-blue-600 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Districts Count</label>
                  <input name="districtCount" value={config.districtCount} onChange={handleConfigChange} className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-black text-xl text-slate-800 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accuracy Rate</label>
                  <input name="accuracyRate" value={config.accuracyRate} onChange={handleConfigChange} className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-black text-xl text-purple-600 outline-none" />
                </div>
              </div>

              <div className="grid gap-6">
                {services.map(s => (
                  <div key={s.id} className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col md:flex-row gap-8 items-center relative group">
                    <button onClick={() => setServices(prev => prev.filter(x => x.id !== s.id))} className="absolute top-6 right-6 text-red-500 hover:bg-red-50 p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={24} />
                    </button>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-200 shrink-0">
                      <BarChart size={32} className="text-green-600" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <input value={s.title} onChange={e => updateService(s.id, 'title', e.target.value)} className="w-full p-4 bg-white rounded-xl font-bold border border-slate-200" placeholder="Service Name" />
                      <textarea value={s.description} onChange={e => updateService(s.id, 'description', e.target.value)} className="w-full p-4 bg-white rounded-xl border border-slate-200 resize-none" rows={2} placeholder="Service details..." />
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Icon Type:</label>
                        <select 
                          value={s.icon} 
                          onChange={e => updateService(s.id, 'icon', e.target.value)}
                          className="p-2 bg-white rounded-lg border border-slate-200 text-xs"
                        >
                          <option value="BarChart">BarChart</option>
                          <option value="ClipboardCheck">ClipboardCheck</option>
                          <option value="Database">Database</option>
                          <option value="Users">Users</option>
                          <option value="Lightbulb">Lightbulb</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'surveys' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-outfit font-bold text-slate-800">Live Surveys</h3>
                <button onClick={addSurvey} className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:bg-green-700 transition-all">
                  <Plus size={20} /> Create Project
                </button>
              </div>
              <div className="space-y-6">
                {surveys.map(s => (
                  <div key={s.id} className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col md:flex-row gap-6 relative">
                    <button onClick={() => setSurveys(prev => prev.filter(x => x.id !== s.id))} className="absolute top-6 right-6 text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={24} />
                    </button>
                    <div className="flex-1 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <input value={s.title} onChange={e => updateSurvey(s.id, 'title', e.target.value)} className="w-full p-3 bg-white rounded-xl border border-slate-200 font-bold" placeholder="Survey Title" />
                        <select 
                          value={s.status} 
                          onChange={e => updateSurvey(s.id, 'status', e.target.value as any)}
                          className="w-full p-3 bg-white rounded-xl border border-slate-200"
                        >
                          <option value="Running">Running</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                      <input value={s.link} onChange={e => updateSurvey(s.id, 'link', e.target.value)} className="w-full p-3 bg-white rounded-xl border border-slate-200 text-sm" placeholder="URL" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-outfit font-bold text-slate-800">Agent Network</h3>
                <button onClick={addAgent} className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:bg-green-700 transition-all">
                  <Plus size={20} /> Register Agent
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {agents.map(a => (
                  <div key={a.id} className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] space-y-6 relative">
                    <button onClick={() => setAgents(prev => prev.filter(x => x.id !== a.id))} className="absolute top-6 right-6 text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={20} />
                    </button>
                    <div className="flex items-center gap-4">
                      <img src={a.photoUrl} className="w-16 h-16 rounded-2xl object-cover border-2 border-green-500/20" />
                      <div className="flex-1">
                        <input value={a.name} onChange={e => updateAgent(a.id, 'name', e.target.value)} className="w-full p-2 bg-transparent font-bold text-lg border-b border-slate-200 outline-none" placeholder="Agent Name" />
                        <input value={a.agentId} onChange={e => updateAgent(a.id, 'agentId', e.target.value)} className="w-full p-2 bg-transparent text-sm text-green-600 font-black outline-none uppercase" placeholder="GDI-XXX" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-100">
                        <Phone size={14} className="text-blue-500" />
                        <input value={a.phone} onChange={e => updateAgent(a.id, 'phone', e.target.value)} className="w-full text-xs outline-none" placeholder="Phone" />
                      </div>
                      <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-100">
                        <MapPin size={14} className="text-green-500" />
                        <input value={a.workingArea} onChange={e => updateAgent(a.id, 'workingArea', e.target.value)} className="w-full text-xs outline-none" placeholder="Area" />
                      </div>
                      <textarea value={a.address} onChange={e => updateAgent(a.id, 'address', e.target.value)} className="w-full p-3 bg-white rounded-xl border border-slate-100 text-xs outline-none resize-none" rows={2} placeholder="Address" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-outfit font-bold text-slate-800">Partners & Clients</h3>
                <button onClick={addPartner} className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:bg-green-700 transition-all">
                  <Plus size={20} /> Add Partner
                </button>
              </div>
              <div className="grid gap-6">
                {partners.map(p => (
                  <div key={p.id} className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col md:flex-row gap-8 relative group">
                    <button onClick={() => setPartners(prev => prev.filter(x => x.id !== p.id))} className="absolute top-6 right-6 text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={24} />
                    </button>
                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-4 border border-slate-100 shrink-0 shadow-inner">
                      <img src={p.logoUrl} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <input value={p.name} onChange={e => updatePartner(p.id, 'name', e.target.value)} className="w-full p-3 bg-white rounded-xl border border-slate-200 font-bold" placeholder="Name" />
                        <input value={p.logoUrl} onChange={e => updatePartner(p.id, 'logoUrl', e.target.value)} className="w-full p-3 bg-white rounded-xl border border-slate-200 text-xs" placeholder="Logo URL" />
                      </div>
                      <textarea value={p.description} onChange={e => updatePartner(p.id, 'description', e.target.value)} className="w-full p-3 bg-white rounded-xl border border-slate-200 text-sm" placeholder="Description" rows={2} />
                      <textarea value={p.completedWork} onChange={e => updatePartner(p.id, 'completedWork', e.target.value)} className="w-full p-3 bg-white rounded-xl border border-slate-200 text-sm italic" placeholder="Project details" rows={2} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h3 className="text-3xl font-outfit font-bold text-slate-800">Incoming Project Leads</h3>
              <div className="grid gap-6">
                {projectSubmissions.map(s => (
                  <div key={s.id} className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl relative">
                    <button onClick={() => setProjectSubmissions(prev => prev.filter(x => x.id !== s.id))} className="absolute top-8 right-8 text-red-400 hover:text-red-600">
                      <Trash2 size={20} />
                    </button>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">{s.date}</div>
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">{s.projectType}</h4>
                    <p className="text-slate-500 text-sm mb-6 bg-slate-50 p-4 rounded-xl">Target: {s.targetAudience}</p>
                    <div className="grid md:grid-cols-3 gap-6 text-sm pt-6 border-t border-slate-100">
                      <div className="font-bold text-slate-700">{s.name}</div>
                      <div className="text-slate-700">{s.email}</div>
                      <div className="text-slate-700">{s.phone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h3 className="text-3xl font-outfit font-bold text-slate-800">Contact Inbox</h3>
              <div className="grid gap-6">
                {contactSubmissions.map(m => (
                  <div key={m.id} className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl relative">
                    <button onClick={() => setContactSubmissions(prev => prev.filter(x => x.id !== m.id))} className="absolute top-8 right-8 text-red-400 hover:text-red-600">
                      <Trash2 size={20} />
                    </button>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xl font-bold text-slate-800">{m.name}</h4>
                        <p className="text-slate-400 text-xs font-bold">{m.email} | {m.phone}</p>
                      </div>
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{m.date}</div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-700 shadow-inner">
                      {m.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;


import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SiteConfig, Survey, Agent, Partner, Service, ViewType, ProjectSubmission, ContactSubmission } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Services from './sections/Services';
import WhoWeServe from './sections/WhoWeServe';
import About from './sections/About';
import Surveys from './sections/Surveys';
import Inquiry from './sections/Inquiry';
import Partners from './sections/Partners';
import Agents from './sections/Agents';
import AgentVerification from './sections/AgentVerification';
import AdminPanel from './components/AdminPanel';
import ProjectModal from './components/ProjectModal';
import ChatBot from './components/ChatBot';

const INITIAL_CONFIG: SiteConfig = {
  logoUrl: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=200',
  heroImageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2426',
  heroTitle: 'Grameen Data Insight (GDI)',
  heroSubtitle: 'Professional Market Research & Survey Services Across Bangladesh',
  introTitle: 'About Us',
  introDescription: 'Grameen Data Insight (GDI) is a leading data-driven organization in Bangladesh, specializing in market research, surveys, and data collection. We help businesses, NGOs, and government agencies make informed decisions by providing accurate, timely, and actionable insights. With a focus on rural and urban Bangladesh, GDI combines modern research methods with local knowledge to ensure high-quality, reliable data for all our clients.',
  introImageUrl: 'https://picsum.photos/seed/research/600/400',
  aboutTitle: 'Our Strategic Foundation',
  mission: '• Empower businesses and organizations with precise and actionable market insights.\n• Bridge the gap between data and decision-making, enabling sustainable growth in Bangladesh.\n• Deliver professional, ethical, and accurate data collection services across all sectors.',
  vision: '• Become the most trusted and innovative market research organization in Bangladesh.\n• Enable data-driven strategies that support economic growth, social development, and business excellence.\n• Make market insights accessible and understandable for every stakeholder in the country.',
  goals: '• Conduct high-quality surveys across all districts of Bangladesh.\n• Provide real-time, accurate, and actionable insights.\n• Innovate data collection methods using technology and local expertise.\n• Build long-term partnerships with clients.\n• Maintain highest standards of integrity and professionalism.',
  futureGrowth: 'Expanding our digital infrastructure to provide 24/7 real-time analytics dashboards for global stakeholders, while deepening our physical presence in remote rural clusters.',
  contactEmail: 'grameendatainsight.gdi@gmail.com',
  contactPhone: '01869469237',
  contactAddress: 'Bhola, Barishal, Bangladesh',
  contactWhatsapp: '01869469237',
  contactFacebookName: 'Grameen Data Insight - GDI',
  contactFacebookLink: 'https://web.facebook.com/profile.php?id=61578913630748',
  householdCount: '45,000+',
  activeAgentsCount: '500+',
  districtCount: '64',
  accuracyRate: '99.8%'
};

const INITIAL_SERVICES: Service[] = [
  { id: '1', title: 'Market Research', description: 'Comprehensive analysis of consumer behavior, market trends, and competition. Custom reports for businesses, NGOs, and government projects.', icon: 'BarChart' },
  { id: '2', title: 'Surveys & Data Collection', description: 'Household surveys, agent-based surveys, and field data collection across Bangladesh. Both quantitative and qualitative research methods.', icon: 'ClipboardCheck' },
  { id: '3', title: 'Data Analysis & Insights', description: 'Transform raw data into actionable insights for better decision-making. Trend identification, reporting, and visualization.', icon: 'Database' },
  { id: '4', title: 'Custom Projects & Consultations', description: 'Tailored survey and research projects to meet client-specific goals. Support in project design and strategic recommendations.', icon: 'Lightbulb' }
];

const INITIAL_SURVEYS: Survey[] = [
  { id: '1', title: 'Retail Consumer Preference 2024', description: 'A nationwide survey on grocery shopping habits.', status: 'Running', link: 'https://forms.gle/sample1' },
];

const INITIAL_AGENTS: Agent[] = [
  { id: '1', name: 'Tanvir Hossain', agentId: 'GDI-001', workingArea: 'Dhaka North', photoUrl: 'https://picsum.photos/seed/agent1/200/200', phone: '01700000001', address: 'Uttara, Dhaka' },
];

const INITIAL_PARTNERS: Partner[] = [
  { id: '1', name: 'Bangladesh Trade Hub', logoUrl: 'https://picsum.photos/seed/p1/120/80', description: 'Strategic trade development partner.', completedWork: '5 Nationwide export surveys completed.' },
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('gdi_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('gdi_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });
  const [surveys, setSurveys] = useState<Survey[]>(() => {
    const saved = localStorage.getItem('gdi_surveys');
    return saved ? JSON.parse(saved) : INITIAL_SURVEYS;
  });
  const [agents, setAgents] = useState<Agent[]>(() => {
    const saved = localStorage.getItem('gdi_agents');
    return saved ? JSON.parse(saved) : INITIAL_AGENTS;
  });
  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('gdi_partners');
    return saved ? JSON.parse(saved) : INITIAL_PARTNERS;
  });
  const [projectSubmissions, setProjectSubmissions] = useState<ProjectSubmission[]>(() => {
    const saved = localStorage.getItem('gdi_project_submissions');
    return saved ? JSON.parse(saved) : [];
  });
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>(() => {
    const saved = localStorage.getItem('gdi_contact_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('gdi_config', JSON.stringify(config));
    localStorage.setItem('gdi_services', JSON.stringify(services));
    localStorage.setItem('gdi_surveys', JSON.stringify(surveys));
    localStorage.setItem('gdi_agents', JSON.stringify(agents));
    localStorage.setItem('gdi_partners', JSON.stringify(partners));
    localStorage.setItem('gdi_project_submissions', JSON.stringify(projectSubmissions));
    localStorage.setItem('gdi_contact_submissions', JSON.stringify(contactSubmissions));
  }, [config, services, surveys, agents, partners, projectSubmissions, contactSubmissions]);

  const handleProjectSubmit = (data: Omit<ProjectSubmission, 'id' | 'date'>) => {
    const newSub: ProjectSubmission = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toLocaleString()
    };
    setProjectSubmissions(prev => [newSub, ...prev]);
    alert('Project submission successful! Our team will review your details in the admin panel.');
  };

  const handleContactSubmit = (data: Omit<ContactSubmission, 'id' | 'date'>) => {
    const newSub: ContactSubmission = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toLocaleString()
    };
    setContactSubmissions(prev => [newSub, ...prev]);
    alert('Message sent! Admin will see this in the console.');
  };

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
  };

  const toggleView = () => setView(view === 'home' ? 'admin' : 'home');

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {view === 'home' ? (
        <div className="flex flex-col">
          <Header config={config} onStartProject={() => setIsProjectModalOpen(true)} />
          <main>
            <Hero config={config} />
            <AgentVerification agents={agents} />
            <Intro config={config} />
            <Services services={services} config={config} />
            <WhoWeServe />
            <About config={config} />
            <Surveys surveys={surveys} />
            <Inquiry config={config} onSubmit={handleContactSubmit} />
            <Partners partners={partners} />
            <Agents agents={agents} />
          </main>
          <Footer config={config} onAdminClick={toggleView} />
          <ProjectModal 
            isOpen={isProjectModalOpen} 
            onClose={() => setIsProjectModalOpen(false)} 
            onSubmit={handleProjectSubmit} 
          />
          <ChatBot config={config} />
        </div>
      ) : (
        <AdminPanel 
          isAuthenticated={isAuthenticated}
          onLoginSuccess={() => handleLogin(true)}
          config={config} setConfig={setConfig}
          services={services} setServices={setServices}
          surveys={surveys} setSurveys={setSurveys}
          agents={agents} setAgents={setAgents}
          partners={partners} setPartners={setPartners}
          projectSubmissions={projectSubmissions} setProjectSubmissions={setProjectSubmissions}
          contactSubmissions={contactSubmissions} setContactSubmissions={setContactSubmissions}
          onClose={toggleView}
        />
      )}
    </div>
  );
};

export default App;

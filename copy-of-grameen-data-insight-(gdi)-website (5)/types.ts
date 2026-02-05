
export interface SiteConfig {
  logoUrl: string;
  heroImageUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introDescription: string;
  introImageUrl: string;
  aboutTitle: string;
  mission: string;
  vision: string;
  goals: string;
  futureGrowth: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  contactWhatsapp: string;
  contactFacebookName: string;
  contactFacebookLink: string;
  // Stats
  householdCount: string;
  activeAgentsCount: string;
  districtCount: string;
  accuracyRate: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  status: 'Running' | 'Closed';
  link: string;
}

export interface Agent {
  id: string;
  name: string;
  agentId: string;
  workingArea: string;
  photoUrl: string;
  phone: string;     // Added
  address: string;   // Added
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  completedWork: string;
}

export interface ProjectSubmission {
  id: string;
  projectType: string;
  targetAudience: string;
  country: string;
  name: string;
  email: string;
  phone: string;
  date: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export type ViewType = 'home' | 'admin';

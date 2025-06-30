
export interface UserPreferences {
  id: string;
  techStack: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'expert';
  industryFocus: string;
  preferredJobTitles: string[];
  skills: string[];
  location: string;
  personalInfo: {
    fullName?: string;
    email?: string;
    phone?: string;
    website?: string;
    linkedin?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PreferencesStep {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'select' | 'multiselect' | 'radio';
  options?: string[];
  field: keyof UserPreferences | string;
  required: boolean;
}

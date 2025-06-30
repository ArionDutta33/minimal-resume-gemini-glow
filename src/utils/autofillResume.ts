
import { UserPreferences } from '@/types/preferences';
import { ResumeData } from '@/types/resume';

export const autofillResumeFromPreferences = (
  preferences: UserPreferences,
  currentResumeData: ResumeData
): ResumeData => {
  return {
    ...currentResumeData,
    personalInfo: {
      ...currentResumeData.personalInfo,
      fullName: preferences.personalInfo.fullName || currentResumeData.personalInfo.fullName,
      email: preferences.personalInfo.email || currentResumeData.personalInfo.email,
      phone: preferences.personalInfo.phone || currentResumeData.personalInfo.phone,
      location: preferences.location || currentResumeData.personalInfo.location,
      website: preferences.personalInfo.website || currentResumeData.personalInfo.website,
      linkedin: preferences.personalInfo.linkedin || currentResumeData.personalInfo.linkedin,
    },
    skills: [
      ...currentResumeData.skills,
      ...preferences.skills.map((skill, index) => ({
        id: `pref-skill-${index}`,
        name: skill,
        category: 'Technical'
      }))
    ],
  };
};


import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Check, X, Plus } from 'lucide-react';
import { UserPreferences, PreferencesStep } from '@/types/preferences';
import { useToast } from '@/hooks/use-toast';

interface PreferencesWizardProps {
  onComplete: (preferences: UserPreferences) => void;
  onCancel: () => void;
  existingPreferences?: UserPreferences | null;
}

const PreferencesWizard: React.FC<PreferencesWizardProps> = ({
  onComplete,
  onCancel,
  existingPreferences
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>(
    existingPreferences || {
      techStack: [],
      skills: [],
      preferredJobTitles: [],
      personalInfo: {}
    }
  );
  const [tempInput, setTempInput] = useState('');
  const { toast } = useToast();

  const steps: PreferencesStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Let\'s start with your basic information',
      type: 'text',
      field: 'personalInfo',
      required: true
    },
    {
      id: 'experience',
      title: 'Experience Level',
      description: 'What\'s your current experience level?',
      type: 'radio',
      options: ['entry', 'mid', 'senior', 'expert'],
      field: 'experienceLevel',
      required: true
    },
    {
      id: 'industry',
      title: 'Industry Focus',
      description: 'Which industry do you primarily work in?',
      type: 'text',
      field: 'industryFocus',
      required: true
    },
    {
      id: 'jobTitles',
      title: 'Preferred Job Titles',
      description: 'What job titles are you interested in?',
      type: 'multiselect',
      field: 'preferredJobTitles',
      required: true
    },
    {
      id: 'techStack',
      title: 'Tech Stack',
      description: 'What technologies do you work with?',
      type: 'multiselect',
      field: 'techStack',
      required: true
    },
    {
      id: 'skills',
      title: 'Core Skills',
      description: 'What are your key skills?',
      type: 'multiselect',
      field: 'skills',
      required: true
    },
    {
      id: 'location',
      title: 'Location',
      description: 'Where are you based?',
      type: 'text',
      field: 'location',
      required: false
    }
  ];

  const updatePreference = (field: string, value: any) => {
    if (field === 'personalInfo') {
      setPreferences(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, ...value }
      }));
    } else {
      setPreferences(prev => ({ ...prev, [field]: value }));
    }
  };

  const addToArray = (field: string, value: string) => {
    if (!value.trim()) return;
    
    const currentArray = (preferences as any)[field] || [];
    if (!currentArray.includes(value.trim())) {
      updatePreference(field, [...currentArray, value.trim()]);
    }
    setTempInput('');
  };

  const removeFromArray = (field: string, value: string) => {
    const currentArray = (preferences as any)[field] || [];
    updatePreference(field, currentArray.filter((item: string) => item !== value));
  };

  const handleNext = () => {
    const step = steps[currentStep];
    const value = (preferences as any)[step.field];
    
    if (step.required && (!value || (Array.isArray(value) && value.length === 0))) {
      toast({
        title: "Required Field",
        description: "Please complete this step before continuing.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    const finalPreferences: UserPreferences = {
      id: existingPreferences?.id || Date.now().toString(),
      techStack: preferences.techStack || [],
      experienceLevel: preferences.experienceLevel || 'entry',
      industryFocus: preferences.industryFocus || '',
      preferredJobTitles: preferences.preferredJobTitles || [],
      skills: preferences.skills || [],
      location: preferences.location || '',
      personalInfo: preferences.personalInfo || {},
      createdAt: existingPreferences?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onComplete(finalPreferences);
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'personal':
        return (
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={preferences.personalInfo?.fullName || ''}
                onChange={(e) => updatePreference('personalInfo', { fullName: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={preferences.personalInfo?.email || ''}
                onChange={(e) => updatePreference('personalInfo', { email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={preferences.personalInfo?.phone || ''}
                onChange={(e) => updatePreference('personalInfo', { phone: e.target.value })}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        );
      
      case 'experience':
        return (
          <div className="space-y-3">
            {step.options?.map((option) => (
              <div
                key={option}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  preferences.experienceLevel === option
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
                onClick={() => updatePreference('experienceLevel', option)}
              >
                <div className="flex items-center justify-between">
                  <span className="capitalize font-medium">{option} Level</span>
                  {preferences.experienceLevel === option && (
                    <Check className="w-5 h-5 text-amber-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'industry':
        return (
          <div>
            <Textarea
              value={preferences.industryFocus || ''}
              onChange={(e) => updatePreference('industryFocus', e.target.value)}
              placeholder="e.g., Software Development, Healthcare, Finance..."
              rows={3}
            />
          </div>
        );
      
      case 'location':
        return (
          <div>
            <Input
              value={preferences.location || ''}
              onChange={(e) => updatePreference('location', e.target.value)}
              placeholder="e.g., San Francisco, CA or Remote"
            />
          </div>
        );
      
      default:
        // Multi-select fields (jobTitles, techStack, skills)
        const currentArray = (preferences as any)[step.field] || [];
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                placeholder={`Add ${step.title.toLowerCase()}...`}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addToArray(step.field, tempInput);
                  }
                }}
              />
              <Button
                onClick={() => addToArray(step.field, tempInput)}
                variant="outline"
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentArray.map((item: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-red-100"
                  onClick={() => removeFromArray(step.field, item)}
                >
                  {item}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-stone-800">Setup Your Preferences</h2>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-stone-200 rounded-full h-2 mb-4">
            <div
              className="bg-amber-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          
          <div className="text-sm text-stone-600 mb-2">
            Step {currentStep + 1} of {steps.length}
          </div>
          <h3 className="text-xl font-semibold text-stone-800 mb-2">
            {steps[currentStep].title}
          </h3>
          <p className="text-stone-600">{steps[currentStep].description}</p>
        </div>

        <div className="mb-8">
          {renderStepContent()}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button onClick={handleNext} className="bg-amber-600 hover:bg-amber-700">
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PreferencesWizard;

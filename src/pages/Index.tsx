
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Settings, Zap } from 'lucide-react';
import { ResumeData, TemplateType } from '@/types/resume';
import { UserPreferences } from '@/types/preferences';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import AIAssistant from '@/components/AIAssistant';
import PreferencesWizard from '@/components/PreferencesWizard';
import { generatePDF } from '@/utils/pdfGenerator';
import { loadPreferences, savePreferences, hasPreferences } from '@/utils/preferencesStorage';
import { autofillResumeFromPreferences } from '@/utils/autofillResume';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showPreferencesWizard, setShowPreferencesWizard] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const { toast } = useToast();

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
  });

  useEffect(() => {
    const preferences = loadPreferences();
    setUserPreferences(preferences);
  }, []);

  const handleDownloadPDF = async () => {
    if (!resumeData.personalInfo.fullName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name before downloading.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPDF(true);
    try {
      const filename = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      await generatePDF('resume-preview', filename);
      toast({
        title: "Success!",
        description: "Your resume has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePreferencesComplete = (preferences: UserPreferences) => {
    savePreferences(preferences);
    setUserPreferences(preferences);
    setShowPreferencesWizard(false);
    
    toast({
      title: "Preferences Saved!",
      description: "Your preferences have been saved successfully.",
    });
  };

  const handleAutofill = () => {
    if (userPreferences) {
      const autofilledData = autofillResumeFromPreferences(userPreferences, resumeData);
      setResumeData(autofilledData);
      toast({
        title: "Autofilled!",
        description: "Resume has been populated with your preferences.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-amber-600 mr-3" />
              <h1 className="text-2xl font-bold text-stone-900">AI Resume Builder</h1>
            </div>
            <div className="flex items-center gap-3">
              {userPreferences && (
                <Button
                  onClick={handleAutofill}
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Autofill
                </Button>
              )}
              <Button
                onClick={() => setShowPreferencesWizard(true)}
                variant="outline"
                className="border-stone-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                {userPreferences ? 'Edit Preferences' : 'Setup Preferences'}
              </Button>
              <Button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="xl:col-span-2 space-y-6">
            <ResumeForm resumeData={resumeData} onDataChange={setResumeData} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* AI Assistant */}
            <AIAssistant resumeData={resumeData} onDataChange={setResumeData} />
            
            {/* Preview Section */}
            <div className="bg-white rounded-lg border border-stone-200 p-4">
              <h3 className="text-lg font-medium text-stone-800 mb-4">Live Preview</h3>
              <ResumePreview resumeData={resumeData} template={selectedTemplate} />
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Wizard Modal */}
      {showPreferencesWizard && (
        <PreferencesWizard
          onComplete={handlePreferencesComplete}
          onCancel={() => setShowPreferencesWizard(false)}
          existingPreferences={userPreferences}
        />
      )}
    </div>
  );
};

export default Index;

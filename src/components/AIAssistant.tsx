
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, Brain, Target, Lightbulb } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { 
  generateProfessionalSummary, 
  analyzeJobDescription, 
  suggestSkills, 
  optimizeResume 
} from '@/lib/gemini';
import { useToast } from '@/hooks/use-toast';

interface AIAssistantProps {
  resumeData: ResumeData;
  onDataChange: (data: ResumeData) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ resumeData, onDataChange }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string>('');
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsLoading('summary');
    try {
      const summary = await generateProfessionalSummary(
        resumeData.personalInfo,
        resumeData.experience,
        resumeData.skills
      );
      
      onDataChange({
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          summary: summary
        }
      });
      
      toast({
        title: "Summary Generated!",
        description: "AI has created a professional summary for your resume.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleAnalyzeJob = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please enter a job description to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading('analyze');
    try {
      const analysis = await analyzeJobDescription(jobDescription);
      const suggestionText = `
**Required Skills:** ${analysis.requiredSkills?.join(', ') || 'None found'}

**Keywords to Include:** ${analysis.keywords?.join(', ') || 'None found'}

**Suggestions:** ${analysis.suggestions || 'No suggestions available'}
      `;
      setSuggestions(suggestionText);
      
      toast({
        title: "Job Analysis Complete!",
        description: "Check the suggestions below to optimize your resume.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze job description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleSuggestSkills = async () => {
    if (resumeData.experience.length === 0) {
      toast({
        title: "Experience Required",
        description: "Please add your work experience first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading('skills');
    try {
      const latestJob = resumeData.experience[0]?.position || 'Professional';
      const currentSkills = resumeData.skills.map(skill => skill.name);
      const suggestedSkills = await suggestSkills(latestJob, currentSkills);
      
      const newSkills = suggestedSkills.map(skillName => ({
        id: Date.now().toString() + Math.random(),
        name: skillName,
        category: 'Technical'
      }));
      
      onDataChange({
        ...resumeData,
        skills: [...resumeData.skills, ...newSkills]
      });
      
      toast({
        title: "Skills Added!",
        description: `Added ${newSkills.length} relevant skills to your resume.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to suggest skills. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleOptimizeResume = async () => {
    setIsLoading('optimize');
    try {
      const optimization = await optimizeResume(resumeData);
      setSuggestions(optimization);
      
      toast({
        title: "Resume Optimized!",
        description: "Check the suggestions below to improve your resume.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to optimize resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <Card className="p-6 bg-white border-stone-200">
      <div className="flex items-center mb-4">
        <Brain className="w-5 h-5 text-amber-600 mr-2" />
        <h3 className="text-lg font-medium text-stone-800">AI Assistant</h3>
      </div>
      
      <div className="space-y-4">
        {/* Generate Summary */}
        <div>
          <Button
            onClick={handleGenerateSummary}
            disabled={isLoading === 'summary' || !resumeData.personalInfo.fullName}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isLoading === 'summary' ? 'Generating...' : 'Generate Professional Summary'}
          </Button>
        </div>

        {/* Job Description Analysis */}
        <div>
          <Label htmlFor="jobDescription">Analyze Job Description</Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste a job description here to get tailored suggestions..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            className="border-stone-300 mb-2"
          />
          <Button
            onClick={handleAnalyzeJob}
            disabled={isLoading === 'analyze'}
            variant="outline"
            className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <Target className="w-4 h-4 mr-2" />
            {isLoading === 'analyze' ? 'Analyzing...' : 'Analyze & Get Suggestions'}
          </Button>
        </div>

        {/* Skill Suggestions */}
        <div>
          <Button
            onClick={handleSuggestSkills}
            disabled={isLoading === 'skills'}
            variant="outline"
            className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {isLoading === 'skills' ? 'Suggesting...' : 'Suggest Relevant Skills'}
          </Button>
        </div>

        {/* Resume Optimization */}
        <div>
          <Button
            onClick={handleOptimizeResume}
            disabled={isLoading === 'optimize'}
            variant="outline"
            className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <Brain className="w-4 h-4 mr-2" />
            {isLoading === 'optimize' ? 'Optimizing...' : 'Optimize Entire Resume'}
          </Button>
        </div>

        {/* Suggestions Display */}
        {suggestions && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-medium text-stone-800 mb-2">AI Suggestions:</h4>
            <div className="text-sm text-stone-700 whitespace-pre-line">
              {suggestions}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AIAssistant;

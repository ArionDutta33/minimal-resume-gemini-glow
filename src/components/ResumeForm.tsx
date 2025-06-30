
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, X, Sparkles } from 'lucide-react';
import { ResumeData, Experience, Education, Skill } from '@/types/resume';
import { improveBulletPoint } from '@/lib/gemini';
import { useToast } from '@/hooks/use-toast';

interface ResumeFormProps {
  resumeData: ResumeData;
  onDataChange: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, onDataChange }) => {
  const [isImprovingBullet, setIsImprovingBullet] = useState<string | null>(null);
  const { toast } = useToast();

  const updatePersonalInfo = (field: string, value: string) => {
    onDataChange({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value },
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
    };
    onDataChange({
      ...resumeData,
      experience: [...resumeData.experience, newExp],
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    const updated = resumeData.experience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onDataChange({ ...resumeData, experience: updated });
  };

  const removeExperience = (id: string) => {
    onDataChange({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  const addBulletPoint = (expId: string) => {
    const updated = resumeData.experience.map((exp) =>
      exp.id === expId ? { ...exp, description: [...exp.description, ''] } : exp
    );
    onDataChange({ ...resumeData, experience: updated });
  };

  const updateBulletPoint = (expId: string, index: number, value: string) => {
    const updated = resumeData.experience.map((exp) =>
      exp.id === expId
        ? {
            ...exp,
            description: exp.description.map((desc, i) => (i === index ? value : desc)),
          }
        : exp
    );
    onDataChange({ ...resumeData, experience: updated });
  };

  const improveBullet = async (expId: string, index: number) => {
    const experience = resumeData.experience.find((exp) => exp.id === expId);
    if (!experience) return;

    const bulletId = `${expId}-${index}`;
    setIsImprovingBullet(bulletId);

    try {
      const improved = await improveBulletPoint(
        experience.description[index],
        experience.position
      );
      updateBulletPoint(expId, index, improved);
      toast({
        title: "Bullet point improved!",
        description: "AI has enhanced your bullet point.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to improve bullet point. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsImprovingBullet(null);
    }
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    onDataChange({
      ...resumeData,
      education: [...resumeData.education, newEdu],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const updated = resumeData.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onDataChange({ ...resumeData, education: updated });
  };

  const removeEducation = (id: string) => {
    onDataChange({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      category: 'Technical',
    };
    onDataChange({
      ...resumeData,
      skills: [...resumeData.skills, newSkill],
    });
  };

  const updateSkill = (id: string, field: string, value: string) => {
    const updated = resumeData.skills.map((skill) =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    onDataChange({ ...resumeData, skills: updated });
  };

  const removeSkill = (id: string) => {
    onDataChange({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="p-6 bg-white border-stone-200">
        <h3 className="text-lg font-medium text-stone-800 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={resumeData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              className="border-stone-300"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={resumeData.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              className="border-stone-300"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={resumeData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              className="border-stone-300"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={resumeData.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              className="border-stone-300"
            />
          </div>
          <div>
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              value={resumeData.personalInfo.website || ''}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
              className="border-stone-300"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
            <Input
              id="linkedin"
              value={resumeData.personalInfo.linkedin || ''}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              className="border-stone-300"
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={resumeData.personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
            rows={3}
            className="border-stone-300"
          />
        </div>
      </Card>

      {/* Experience */}
      <Card className="p-6 bg-white border-stone-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-stone-800">Experience</h3>
          <Button
            onClick={addExperience}
            variant="outline"
            size="sm"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="border rounded-lg p-4 mb-4 bg-stone-50">
            <div className="flex justify-between items-start mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="border-stone-300"
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    className="border-stone-300"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="border-stone-300"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="border-stone-300"
                  />
                </div>
              </div>
              <Button
                onClick={() => removeExperience(exp.id)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-4"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Key Achievements</Label>
              {exp.description.map((bullet, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={bullet}
                    onChange={(e) => updateBulletPoint(exp.id, index, e.target.value)}
                    rows={2}
                    className="border-stone-300"
                  />
                  <Button
                    onClick={() => improveBullet(exp.id, index)}
                    disabled={isImprovingBullet === `${exp.id}-${index}` || !bullet.trim()}
                    variant="outline"
                    size="sm"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => addBulletPoint(exp.id)}
                variant="ghost"
                size="sm"
                className="text-stone-600 hover:text-stone-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Achievement
              </Button>
            </div>
          </div>
        ))}
      </Card>

      {/* Education */}
      <Card className="p-6 bg-white border-stone-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-stone-800">Education</h3>
          <Button
            onClick={addEducation}
            variant="outline"
            size="sm"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="border rounded-lg p-4 mb-4 bg-stone-50">
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="border-stone-300"
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="border-stone-300"
                  />
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    className="border-stone-300"
                  />
                </div>
                <div>
                  <Label>Graduation Year</Label>
                  <Input
                    type="number"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="border-stone-300"
                  />
                </div>
              </div>
              <Button
                onClick={() => removeEducation(edu.id)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-4"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </Card>

      {/* Skills */}
      <Card className="p-6 bg-white border-stone-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-stone-800">Skills</h3>
          <Button
            onClick={addSkill}
            variant="outline"
            size="sm"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumeData.skills.map((skill) => (
            <div key={skill.id} className="flex gap-2">
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                placeholder="Skill name"
                className="border-stone-300"
              />
              <Button
                onClick={() => removeSkill(skill.id)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ResumeForm;

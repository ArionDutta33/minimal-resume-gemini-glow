
import React from 'react';
import { ResumeData, TemplateType } from '@/types/resume';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: TemplateType;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm">
      <div id="resume-preview" className="transform scale-75 origin-top-left w-[133%] h-auto">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;

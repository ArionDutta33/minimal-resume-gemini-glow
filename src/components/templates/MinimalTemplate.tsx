
import React from 'react';
import { ResumeData } from '@/types/resume';

interface MinimalTemplateProps {
  data: ResumeData;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  return (
    <div className="w-[8.5in] h-[11in] bg-white p-8 text-gray-800 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-900 mb-3">{data.personalInfo.fullName}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          <div>{data.personalInfo.email}</div>
          <div>{data.personalInfo.phone}</div>
          <div>{data.personalInfo.location}</div>
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
          {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-sm">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="mb-2">
                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-sm">{exp.company}</p>
                  <span className="text-xs text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                {exp.description.map((bullet, index) => (
                  <li key={index} className="leading-relaxed">• {bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-600 text-xs">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-500">{edu.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            Skills
          </h2>
          <div className="text-xs text-gray-700 leading-relaxed">
            {data.skills.map((skill, index) => (
              <span key={skill.id}>
                {skill.name}
                {index < data.skills.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;

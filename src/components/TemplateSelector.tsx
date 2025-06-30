
import React from 'react';
import { Card } from '@/components/ui/card';
import { TemplateType } from '@/types/resume';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  const templates = [
    {
      id: 'modern' as TemplateType,
      name: 'Modern',
      description: 'Clean design with accent colors',
      preview: (
        <div className="w-full h-32 bg-white border rounded p-2 text-xs">
          <div className="h-4 bg-amber-100 rounded mb-1"></div>
          <div className="h-2 bg-amber-50 rounded mb-1 w-3/4"></div>
          <div className="h-2 bg-amber-50 rounded mb-1 w-1/2"></div>
          <div className="space-y-1">
            <div className="h-1 bg-gray-200 rounded"></div>
            <div className="h-1 bg-gray-200 rounded w-4/5"></div>
            <div className="h-1 bg-gray-200 rounded w-3/5"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'classic' as TemplateType,
      name: 'Classic',
      description: 'Traditional professional layout',
      preview: (
        <div className="w-full h-32 bg-white border rounded p-2 text-xs">
          <div className="h-3 bg-gray-800 rounded mb-2"></div>
          <div className="space-y-1 mb-2">
            <div className="h-1 bg-gray-300 rounded"></div>
            <div className="h-1 bg-gray-300 rounded w-4/5"></div>
          </div>
          <div className="h-2 bg-gray-600 rounded mb-1 w-1/3"></div>
          <div className="space-y-1">
            <div className="h-1 bg-gray-200 rounded"></div>
            <div className="h-1 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'minimal' as TemplateType,
      name: 'Minimal',
      description: 'Clean and simple design',
      preview: (
        <div className="w-full h-32 bg-white border rounded p-2 text-xs">
          <div className="h-3 bg-stone-200 rounded mb-2 w-3/4"></div>
          <div className="h-1 bg-stone-100 rounded mb-2"></div>
          <div className="space-y-1 mb-2">
            <div className="h-1 bg-gray-200 rounded"></div>
            <div className="h-1 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="space-y-1">
            <div className="h-1 bg-gray-100 rounded"></div>
            <div className="h-1 bg-gray-100 rounded w-2/3"></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-stone-800">Choose Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedTemplate === template.id
                ? 'ring-2 ring-amber-400 bg-amber-50'
                : 'hover:bg-stone-50'
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="p-4">
              <div className="mb-3">{template.preview}</div>
              <h4 className="font-medium text-stone-800 mb-1">{template.name}</h4>
              <p className="text-sm text-stone-600">{template.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;

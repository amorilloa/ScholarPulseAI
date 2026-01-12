
import React from 'react';
import { SectionId } from '../types';

interface SectionSelectorProps {
  selectedSections: SectionId[];
  onToggle: (id: SectionId) => void;
}

const SECTIONS: { id: SectionId; label: string; description: string }[] = [
  { id: 'keywords', label: 'Keywords', description: 'Core research phrases' },
  { id: 'nonExpert', label: 'Non-Expert Explanation', description: 'For family and friends' },
  { id: 'universityStudent', label: 'Student Explanation', description: 'For university students' },
  { id: 'professionalColleague', label: 'Technical Explanation', description: 'For professional colleagues' },
  { id: 'potentialApplications', label: 'Potential Applications', description: 'Real-world impact' },
  { id: 'strengthsAndLimitations', label: 'Strengths & Limitations', description: 'Critical analysis' },
  { id: 'creativeExtensions', label: 'Creative Extensions', description: 'Future directions' },
  { id: 'summaries', label: 'Summaries', description: 'Tweet & bullet points' },
];

const SectionSelector: React.FC<SectionSelectorProps> = ({ selectedSections, onToggle }) => {
  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Select Output Sections</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SECTIONS.map((s) => (
          <label 
            key={s.id} 
            className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${
              selectedSections.includes(s.id) 
                ? 'border-indigo-600 bg-indigo-50/50' 
                : 'border-slate-100 hover:border-slate-200'
            }`}
          >
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                checked={selectedSections.includes(s.id)}
                onChange={() => onToggle(s.id)}
              />
            </div>
            <div className="ml-3 text-sm">
              <span className="block font-semibold text-slate-800">{s.label}</span>
              <span className="block text-slate-500 text-xs mt-0.5">{s.description}</span>
            </div>
          </label>
        ))}
      </div>
      {selectedSections.length === 0 && (
        <p className="mt-4 text-xs text-amber-600 font-medium">Please select at least one section to generate.</p>
      )}
    </div>
  );
};

export default SectionSelector;

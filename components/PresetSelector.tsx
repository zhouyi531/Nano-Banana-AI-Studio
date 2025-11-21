import React, { useState } from 'react';
import { PRESETS, KIDS_PRESETS } from '../constants';
import { PresetScenario } from '../types';

interface PresetSelectorProps {
  selectedPresetId: string | null;
  onSelect: (preset: PresetScenario) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ selectedPresetId, onSelect }) => {
  const [activeTab, setActiveTab] = useState<'standard' | 'kids'>('standard');

  const currentPresets = activeTab === 'standard' ? PRESETS : KIDS_PRESETS;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-medium text-slate-300">
          2. Choose Style (Optional)
        </label>

        <div className="flex space-x-2 bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('standard')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === 'standard'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
          >
            Standard
          </button>
          <button
            onClick={() => setActiveTab('kids')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === 'kids'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
          >
            Kids
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {currentPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset)}
            className={`relative group overflow-hidden rounded-lg border-2 transition-all duration-200 text-left aspect-[3/4]
              ${selectedPresetId === preset.id
                ? 'border-brand-500 ring-2 ring-brand-500/50'
                : 'border-slate-700/50 hover:border-slate-500'}
            `}
          >
            <div className="w-full h-full relative">
              <img
                src={preset.thumbnailUrl}
                alt={preset.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Gradient Overlay - made stronger at bottom for text readability */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300
                ${selectedPresetId === preset.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-90'}
              `} />

              <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col justify-end h-full">
                <p className="text-white text-sm font-bold leading-tight line-clamp-2 mb-1 shadow-black drop-shadow-md">
                  {preset.name}
                </p>
                {/* Description only visible on hover or selected, and if space permits */}
                <p className="text-slate-300 text-xs leading-tight line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  {preset.description}
                </p>
              </div>

              {/* Selected Indicator */}
              {selectedPresetId === preset.id && (
                <div className="absolute top-2 right-2 bg-brand-500 rounded-full p-1 shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.8);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 1);
        }
      `}</style>
    </div>
  );
};
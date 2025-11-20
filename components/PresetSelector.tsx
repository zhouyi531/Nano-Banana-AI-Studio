import React from 'react';
import { PRESETS } from '../constants';
import { PresetScenario } from '../types';

interface PresetSelectorProps {
  selectedPresetId: string | null;
  onSelect: (preset: PresetScenario) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ selectedPresetId, onSelect }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        2. Choose Style (Optional)
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset)}
            className={`relative group overflow-hidden rounded-lg border-2 transition-all duration-200 text-left aspect-[4/5]
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
              
              <div className="absolute bottom-0 left-0 right-0 p-2 flex flex-col justify-end h-full">
                <p className="text-white text-[11px] font-bold leading-tight line-clamp-2 mb-0.5 shadow-black drop-shadow-md">
                  {preset.name}
                </p>
                {/* Description only visible on hover or selected, and if space permits */}
                <p className="text-slate-300 text-[9px] leading-tight line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 hidden sm:block">
                  {preset.description}
                </p>
              </div>
              
              {/* Selected Indicator */}
              {selectedPresetId === preset.id && (
                <div className="absolute top-2 right-2 bg-brand-500 rounded-full p-0.5 shadow-lg">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
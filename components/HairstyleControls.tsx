import React, { useState } from 'react';
import { HairstyleParams } from '../types';
import { HAIRSTYLE_OPTIONS, HAIRSTYLE_PRESETS, HairstylePreset } from '../constants/hairstyleOptions';

interface HairstyleControlsProps {
    hairstyleParams: HairstyleParams;
    onChange: (params: HairstyleParams) => void;
}

export const HairstyleControls: React.FC<HairstyleControlsProps> = ({ hairstyleParams, onChange }) => {
    const [activeTab, setActiveTab] = useState<'browse' | 'presets'>('browse');
    const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('female');

    const handleHairstyleChange = (hairstyle: string) => {
        onChange({ hairstyle });
    };

    const applyPreset = (preset: HairstylePreset) => {
        onChange(preset.params);
    };

    return (
        <div className="space-y-6">
            {/* Tab Switcher */}
            <div className="flex p-1 bg-slate-800/50 rounded-xl border border-slate-700">
                <button
                    onClick={() => setActiveTab('browse')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'browse'
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    Browse Styles
                </button>
                <button
                    onClick={() => setActiveTab('presets')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'presets'
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    Quick Presets
                </button>
            </div>

            {activeTab === 'browse' ? (
                <div className="space-y-4 animate-fadeIn">
                    {/* Gender Filter */}
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setSelectedGender('female')}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedGender === 'female'
                                ? 'bg-pink-500/20 border-pink-500 text-pink-200'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                                }`}
                        >
                            👩 Female Styles
                        </button>
                        <button
                            onClick={() => setSelectedGender('male')}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedGender === 'male'
                                ? 'bg-blue-500/20 border-blue-500 text-blue-200'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                                }`}
                        >
                            👨 Male Styles
                        </button>
                    </div>

                    {/* Hairstyle Grid */}
                    <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {HAIRSTYLE_OPTIONS[selectedGender].map((style) => {
                            const isSelected = hairstyleParams.hairstyle === style.id;

                            return (
                                <button
                                    key={style.id}
                                    onClick={() => handleHairstyleChange(style.id)}
                                    className={`group relative p-4 rounded-xl border text-left transition-all ${isSelected
                                        ? 'bg-brand-600 border-brand-500 shadow-lg shadow-brand-500/20'
                                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-brand-500'
                                        }`}
                                >
                                    <div className={`font-medium text-sm mb-1 transition-colors ${isSelected ? 'text-white' : 'text-white group-hover:text-brand-400'
                                        }`}>
                                        {style.label}
                                    </div>
                                    <div className={`text-[10px] line-clamp-2 ${isSelected ? 'text-brand-100' : 'text-slate-400'
                                        }`}>
                                        {style.desc}
                                    </div>
                                    {isSelected && (
                                        <div className="absolute top-2 right-2">
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="animate-fadeIn">
                    {/* Gender Filter */}
                    <div className="flex space-x-2 mb-4">
                        <button
                            onClick={() => setSelectedGender('female')}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedGender === 'female'
                                ? 'bg-pink-500/20 border-pink-500 text-pink-200'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                                }`}
                        >
                            👩 Female Presets
                        </button>
                        <button
                            onClick={() => setSelectedGender('male')}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedGender === 'male'
                                ? 'bg-blue-500/20 border-blue-500 text-blue-200'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                                }`}
                        >
                            👨 Male Presets
                        </button>
                    </div>

                    {/* Preset Grid */}
                    <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {HAIRSTYLE_PRESETS.filter(p => p.gender === selectedGender).map((preset) => {
                            const isSelected = hairstyleParams.hairstyle === preset.params.hairstyle;

                            return (
                                <button
                                    key={preset.id}
                                    onClick={() => applyPreset(preset)}
                                    className={`group relative p-4 rounded-xl border text-left transition-all ${isSelected
                                        ? 'bg-brand-600 border-brand-500 shadow-lg shadow-brand-500/20'
                                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-brand-500'
                                        }`}
                                >
                                    <div className={`font-medium text-sm mb-1 transition-colors ${isSelected ? 'text-white' : 'text-white group-hover:text-brand-400'
                                        }`}>
                                        {preset.name}
                                    </div>
                                    <div className={`text-[10px] line-clamp-2 ${isSelected ? 'text-brand-100' : 'text-slate-400'
                                        }`}>
                                        {preset.description}
                                    </div>
                                    {isSelected && (
                                        <div className="absolute top-2 right-2">
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-xs text-blue-200">
                <div className="flex items-start">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <strong>Face Preservation:</strong> Only the hairstyle will be modified. Your facial features, expression, and all other elements will remain unchanged.
                    </div>
                </div>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { TattooParams } from '../types';
import { TATTOO_POSITIONS, TATTOO_DESIGNS, TATTOO_PRESETS, TattooPreset } from '../constants/tattooOptions';

interface TattooControlsProps {
    tattooParams: TattooParams;
    onChange: (params: TattooParams) => void;
}

export const TattooControls: React.FC<TattooControlsProps> = ({ tattooParams, onChange }) => {
    const [activeTab, setActiveTab] = useState<'custom' | 'presets'>('custom');

    const handlePositionChange = (position: string) => {
        onChange({ ...tattooParams, position });
    };

    const handleDesignChange = (design: string) => {
        onChange({ ...tattooParams, design, customDesign: design === 'custom' ? tattooParams.customDesign : undefined });
    };

    const handleCustomDesignChange = (customDesign: string) => {
        onChange({ ...tattooParams, customDesign });
    };

    const applyPreset = (preset: TattooPreset) => {
        onChange(preset.params);
    };

    return (
        <div className="space-y-6">
            {/* Tab Switcher */}
            <div className="flex p-1 bg-slate-800/50 rounded-xl border border-slate-700">
                <button
                    onClick={() => setActiveTab('custom')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'custom'
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    Custom Design
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

            {activeTab === 'custom' ? (
                <div className="space-y-5 animate-fadeIn">
                    {/* Position Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            1. Select Tattoo Position
                        </label>
                        <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                            {TATTOO_POSITIONS.map((pos) => {
                                const isSelected = tattooParams.position === pos.id;

                                return (
                                    <button
                                        key={pos.id}
                                        onClick={() => handlePositionChange(pos.id)}
                                        className={`relative p-3 rounded-lg border text-left transition-all ${isSelected
                                            ? 'bg-brand-600 border-brand-500 shadow-lg shadow-brand-500/20'
                                            : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-brand-500'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xl">{pos.icon}</span>
                                            <div className="flex-1">
                                                <div className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-white'}`}>
                                                    {pos.label}
                                                </div>
                                                <div className={`text-[10px] ${isSelected ? 'text-brand-100' : 'text-slate-400'}`}>
                                                    {pos.desc}
                                                </div>
                                            </div>
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

                    {/* Design Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            2. Choose Tattoo Design
                        </label>
                        <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                            {TATTOO_DESIGNS.map((design) => {
                                const isSelected = tattooParams.design === design.id;

                                return (
                                    <button
                                        key={design.id}
                                        onClick={() => handleDesignChange(design.id)}
                                        className={`relative p-3 rounded-lg border text-left transition-all ${isSelected
                                            ? 'bg-brand-600 border-brand-500 shadow-lg shadow-brand-500/20'
                                            : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-brand-500'
                                            }`}
                                    >
                                        <div className={`font-medium text-sm mb-1 ${isSelected ? 'text-white' : 'text-white'}`}>
                                            {design.label}
                                        </div>
                                        <div className={`text-[10px] line-clamp-2 ${isSelected ? 'text-brand-100' : 'text-slate-400'}`}>
                                            {design.desc}
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

                    {/* Custom Design Input */}
                    {tattooParams.design === 'custom' && (
                        <div className="animate-fadeIn">
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                3. Describe Your Custom Tattoo
                            </label>
                            <textarea
                                value={tattooParams.customDesign || ''}
                                onChange={(e) => handleCustomDesignChange(e.target.value)}
                                placeholder="Describe your tattoo design in detail... (e.g., 'A small lotus flower with watercolor effect' or 'Chinese characters meaning strength')"
                                className="w-full h-24 bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all placeholder-slate-500 resize-none"
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="animate-fadeIn">
                    {/* Preset Grid */}
                    <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {TATTOO_PRESETS.map((preset) => {
                            const isSelected =
                                tattooParams.position === preset.params.position &&
                                tattooParams.design === preset.params.design;

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
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-xs text-purple-200">
                <div className="flex items-start">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <strong>Full-Body Preview:</strong> The AI will generate a full-body photo in appropriate swimwear (swim trunks for men, swimsuit for women) to show the tattoo placement while preserving your face and body shape.
                    </div>
                </div>
            </div>
        </div>
    );
};

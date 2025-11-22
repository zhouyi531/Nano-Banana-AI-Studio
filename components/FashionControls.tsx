import React, { useState } from 'react';
import { FashionParams } from '../types';
import { FASHION_OPTIONS, CLASSIC_PRESETS, FashionPreset } from '../constants/fashionOptions';

interface FashionControlsProps {
    fashionParams: FashionParams;
    onChange: (params: FashionParams) => void;
}

export const FashionControls: React.FC<FashionControlsProps> = ({ fashionParams, onChange }) => {
    const [activeTab, setActiveTab] = useState<'custom' | 'presets'>('custom');
    const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('female');

    const handleParamChange = (key: keyof FashionParams, value: string) => {
        onChange({ ...fashionParams, [key]: value });
    };

    const applyPreset = (preset: FashionPreset) => {
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
                    Custom Style
                </button>
                <button
                    onClick={() => setActiveTab('presets')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'presets'
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    Classic Presets
                </button>
            </div>

            {activeTab === 'custom' ? (
                <div className="space-y-4 animate-fadeIn">
                    {/* Clothing */}
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Clothing</label>
                        <select
                            value={fashionParams.clothing}
                            onChange={(e) => handleParamChange('clothing', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        >
                            {FASHION_OPTIONS.clothing.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Hairstyle */}
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Hairstyle</label>
                        <select
                            value={fashionParams.hairstyle}
                            onChange={(e) => handleParamChange('hairstyle', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        >
                            {FASHION_OPTIONS.hairstyle.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Glasses */}
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Glasses</label>
                        <select
                            value={fashionParams.glasses}
                            onChange={(e) => handleParamChange('glasses', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        >
                            {FASHION_OPTIONS.glasses.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Hat */}
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Hat</label>
                        <select
                            value={fashionParams.hat}
                            onChange={(e) => handleParamChange('hat', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        >
                            {FASHION_OPTIONS.hat.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Shoes */}
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Shoes</label>
                        <select
                            value={fashionParams.shoes}
                            onChange={(e) => handleParamChange('shoes', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        >
                            {FASHION_OPTIONS.shoes.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.label}</option>
                            ))}
                        </select>
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
                            Female Styles
                        </button>
                        <button
                            onClick={() => setSelectedGender('male')}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedGender === 'male'
                                ? 'bg-blue-500/20 border-blue-500 text-blue-200'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                                }`}
                        >
                            Male Styles
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {CLASSIC_PRESETS.filter(p => p.gender === selectedGender).map((preset) => {
                            const isSelected =
                                fashionParams.clothing === preset.params.clothing &&
                                fashionParams.hairstyle === preset.params.hairstyle &&
                                fashionParams.hat === preset.params.hat &&
                                fashionParams.glasses === preset.params.glasses &&
                                fashionParams.shoes === preset.params.shoes;

                            return (
                                <button
                                    key={preset.id}
                                    onClick={() => applyPreset(preset)}
                                    className={`group relative p-3 rounded-xl border text-left transition-all ${isSelected
                                            ? 'bg-brand-600 border-brand-500 shadow-lg shadow-brand-500/20'
                                            : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-brand-500'
                                        }`}
                                >
                                    <div className={`font-medium text-sm transition-colors ${isSelected ? 'text-white' : 'text-white group-hover:text-brand-400'
                                        }`}>
                                        {preset.name}
                                    </div>
                                    <div className={`text-[10px] mt-1 line-clamp-2 ${isSelected ? 'text-brand-100' : 'text-slate-400'
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
        </div>
    );
};

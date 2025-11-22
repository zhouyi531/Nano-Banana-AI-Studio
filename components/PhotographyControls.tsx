import React, { useState } from 'react';
import { PhotographyParams } from '../types';
import {
    APERTURE_OPTIONS,
    FOCAL_LENGTH_OPTIONS,
    ISO_OPTIONS,
    SHUTTER_SPEED_OPTIONS,
    LENS_TYPE_OPTIONS,
    EXPRESSION_OPTIONS,
    ATMOSPHERE_OPTIONS,
    WEATHER_OPTIONS,
    LIGHTING_OPTIONS,
    PHOTOGRAPHY_PRESETS,
    SUBJECT_EXAMPLES,
    LOCATION_EXAMPLES,
    ACTION_EXAMPLES,
    BACKGROUND_EXAMPLES
} from '../constants/photographyOptions';

interface PhotographyControlsProps {
    photographyParams: PhotographyParams;
    onChange: (params: PhotographyParams) => void;
    onBackgroundImageChange: (image: string | null) => void;
}

export const PhotographyControls: React.FC<PhotographyControlsProps> = ({
    photographyParams,
    onChange,
    onBackgroundImageChange
}) => {
    const [activeTab, setActiveTab] = useState<'guided' | 'camera' | 'presets'>('guided');

    const updateParam = (key: keyof PhotographyParams, value: any) => {
        onChange({ ...photographyParams, [key]: value });
    };

    const applyPreset = (preset: typeof PHOTOGRAPHY_PRESETS[0]) => {
        onChange({ ...photographyParams, ...preset.params });
    };

    const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                updateParam('backgroundImage', base64);
                onBackgroundImageChange(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const renderCameraSettings = () => (
        <div className="space-y-4 animate-fadeIn">
            {/* Aperture */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Aperture (Depth of Field)
                </label>
                <div className="grid grid-cols-4 gap-2">
                    {APERTURE_OPTIONS.map((aperture) => {
                        const isSelected = photographyParams.aperture === aperture.id;
                        return (
                            <button
                                key={aperture.id}
                                onClick={() => updateParam('aperture', aperture.id)}
                                className={`p-2 rounded-lg border text-center transition-all ${isSelected
                                    ? 'bg-brand-600 border-brand-500 shadow-lg'
                                    : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                                    }`}
                            >
                                <div className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-white'}`}>
                                    {aperture.label}
                                </div>
                                <div className={`text-[10px] ${isSelected ? 'text-brand-100' : 'text-slate-400'}`}>
                                    {aperture.desc}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Focal Length */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Focal Length (Perspective)
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {FOCAL_LENGTH_OPTIONS.map((focal) => {
                        const isSelected = photographyParams.focalLength === focal.id;
                        return (
                            <button
                                key={focal.id}
                                onClick={() => updateParam('focalLength', focal.id)}
                                className={`p-2 rounded-lg border text-center transition-all ${isSelected
                                    ? 'bg-brand-600 border-brand-500 shadow-lg'
                                    : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                                    }`}
                            >
                                <div className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-white'}`}>
                                    {focal.label}
                                </div>
                                <div className={`text-[10px] ${isSelected ? 'text-brand-100' : 'text-slate-400'}`}>
                                    {focal.desc}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* ISO */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        ISO (Sensitivity)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {ISO_OPTIONS.map((iso) => {
                            const isSelected = photographyParams.iso === iso.id;
                            return (
                                <button
                                    key={iso.id}
                                    onClick={() => updateParam('iso', iso.id)}
                                    className={`p-2 rounded-lg border text-center transition-all ${isSelected
                                        ? 'bg-brand-600 border-brand-500 shadow-lg'
                                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className={`font-medium text-xs ${isSelected ? 'text-white' : 'text-white'}`}>
                                        {iso.label}
                                    </div>
                                    <div className={`text-[10px] ${isSelected ? 'text-brand-100' : 'text-slate-400'}`}>
                                        {iso.desc}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Shutter Speed */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Shutter Speed (Motion)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {SHUTTER_SPEED_OPTIONS.map((shutter) => {
                            const isSelected = photographyParams.shutterSpeed === shutter.id;
                            return (
                                <button
                                    key={shutter.id}
                                    onClick={() => updateParam('shutterSpeed', shutter.id)}
                                    className={`p-2 rounded-lg border text-center transition-all ${isSelected
                                        ? 'bg-brand-600 border-brand-500 shadow-lg'
                                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className={`font-medium text-xs ${isSelected ? 'text-white' : 'text-white'}`}>
                                        {shutter.label}
                                    </div>
                                    <div className={`text-[10px] ${isSelected ? 'text-brand-100' : 'text-slate-400'}`}>
                                        {shutter.desc}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Lens Type */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Lens Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {LENS_TYPE_OPTIONS.map((lens) => {
                        const isSelected = photographyParams.lensType === lens.id;
                        return (
                            <button
                                key={lens.id}
                                onClick={() => updateParam('lensType', lens.id)}
                                className={`p-2 rounded-lg border text-center transition-all ${isSelected
                                    ? 'bg-brand-600 border-brand-500 shadow-lg'
                                    : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                                    }`}
                            >
                                <div className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-white'}`}>
                                    {lens.label}
                                </div>
                                <div className={`text-[10px] ${isSelected ? 'text-brand-100' : 'text-slate-400'}`}>
                                    {lens.desc}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Generation Mode Switcher */}
            <div className="flex p-1 bg-slate-800/50 rounded-xl border border-slate-700">
                <button
                    onClick={() => updateParam('generationMode', 'image-to-image')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${photographyParams.generationMode === 'image-to-image'
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    📸 Image-to-Image
                </button>
                <button
                    onClick={() => updateParam('generationMode', 'text-to-image')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${photographyParams.generationMode === 'text-to-image'
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    ✍️ Text-to-Image
                </button>
            </div>

            {/* Image-to-Image Mode */}
            {photographyParams.generationMode === 'image-to-image' && (
                <div className="space-y-6 animate-fadeIn">
                    {/* Background Reference */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Background Reference (Optional)
                        </label>
                        <div className="text-xs text-slate-500 mb-2">
                            Upload a background image to place the subject in a specific scene.
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundImageUpload}
                            className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-600 file:text-white hover:file:bg-brand-700 cursor-pointer"
                        />
                        {photographyParams.backgroundImage && (
                            <div className="mt-2 relative">
                                <img
                                    src={photographyParams.backgroundImage}
                                    alt="Background"
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="border-t border-slate-700 pt-4">
                        <h3 className="text-sm font-medium text-slate-300 mb-4">Camera Settings</h3>
                        {renderCameraSettings()}
                    </div>
                </div>
            )}

            {/* Text-to-Image Mode Tabs */}
            {photographyParams.generationMode === 'text-to-image' && (
                <>
                    <div className="flex p-1 bg-slate-800/50 rounded-xl border border-slate-700">
                        <button
                            onClick={() => setActiveTab('guided')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'guided'
                                ? 'bg-brand-600 text-white shadow-md'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Guided Prompts
                        </button>
                        <button
                            onClick={() => setActiveTab('camera')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'camera'
                                ? 'bg-brand-600 text-white shadow-md'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Camera Settings
                        </button>
                        <button
                            onClick={() => setActiveTab('presets')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'presets'
                                ? 'bg-brand-600 text-white shadow-md'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Presets
                        </button>
                    </div>

                    {/* Guided Prompts Tab */}
                    {activeTab === 'guided' && (
                        <div className="space-y-4 animate-fadeIn">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Subject */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Subject (Who)
                                    </label>
                                    <input
                                        type="text"
                                        value={photographyParams.subject}
                                        onChange={(e) => updateParam('subject', e.target.value)}
                                        placeholder="e.g., A young woman in her 20s"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                    />
                                    <div className="mt-1 text-[10px] text-slate-500">
                                        Examples: {SUBJECT_EXAMPLES.slice(0, 2).join(', ')}
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Location (Where)
                                    </label>
                                    <input
                                        type="text"
                                        value={photographyParams.location}
                                        onChange={(e) => updateParam('location', e.target.value)}
                                        placeholder="e.g., Urban street corner"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                    />
                                    <div className="mt-1 text-[10px] text-slate-500">
                                        Examples: {LOCATION_EXAMPLES.slice(0, 2).join(', ')}
                                    </div>
                                </div>

                                {/* Expression */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Expression
                                    </label>
                                    <select
                                        value={photographyParams.expression}
                                        onChange={(e) => updateParam('expression', e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                    >
                                        {EXPRESSION_OPTIONS.map((exp) => (
                                            <option key={exp} value={exp}>
                                                {exp}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Action */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Action
                                    </label>
                                    <input
                                        type="text"
                                        value={photographyParams.action}
                                        onChange={(e) => updateParam('action', e.target.value)}
                                        placeholder="e.g., Walking confidently"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                    />
                                    <div className="mt-1 text-[10px] text-slate-500">
                                        Examples: {ACTION_EXAMPLES.slice(0, 2).join(', ')}
                                    </div>
                                </div>

                                {/* Background */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Background
                                    </label>
                                    <input
                                        type="text"
                                        value={photographyParams.background}
                                        onChange={(e) => updateParam('background', e.target.value)}
                                        placeholder="e.g., Blurred city lights"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                    />
                                    <div className="mt-1 text-[10px] text-slate-500">
                                        Examples: {BACKGROUND_EXAMPLES.slice(0, 2).join(', ')}
                                    </div>
                                </div>

                                {/* Atmosphere */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Atmosphere
                                    </label>
                                    <select
                                        value={photographyParams.atmosphere}
                                        onChange={(e) => updateParam('atmosphere', e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                    >
                                        {ATMOSPHERE_OPTIONS.map((atm) => (
                                            <option key={atm} value={atm}>
                                                {atm}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Weather */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Weather
                                    </label>
                                    <select
                                        value={photographyParams.weather}
                                        onChange={(e) => updateParam('weather', e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                    >
                                        {WEATHER_OPTIONS.map((weather) => (
                                            <option key={weather} value={weather}>
                                                {weather}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Lighting */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Lighting
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {LIGHTING_OPTIONS.map((light) => {
                                            const isSelected = photographyParams.lighting === light.id;
                                            return (
                                                <button
                                                    key={light.id}
                                                    onClick={() => updateParam('lighting', light.id)}
                                                    className={`p-2 rounded-lg border text-left transition-all ${isSelected
                                                        ? 'bg-brand-600 border-brand-500 shadow-lg'
                                                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-brand-500'
                                                        }`}
                                                >
                                                    <div className={`font-medium text-xs ${isSelected ? 'text-white' : 'text-white'}`}>
                                                        {light.label}
                                                    </div>
                                                    <div className={`text-[10px] ${isSelected ? 'text-brand-100' : 'text-slate-400'}`}>
                                                        {light.desc}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Camera Settings Tab */}
                    {activeTab === 'camera' && renderCameraSettings()}

                    {/* Presets Tab */}
                    {activeTab === 'presets' && (
                        <div className="animate-fadeIn">
                            <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {PHOTOGRAPHY_PRESETS.map((preset) => (
                                    <button
                                        key={preset.id}
                                        onClick={() => applyPreset(preset)}
                                        className="group relative p-4 rounded-xl border bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-brand-500 text-left transition-all"
                                    >
                                        <div className="font-medium text-sm mb-1 text-white group-hover:text-brand-400">
                                            {preset.name}
                                        </div>
                                        <div className="text-[10px] text-slate-400 line-clamp-2">
                                            {preset.description}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-xs text-blue-200">
                <div className="flex items-start">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <strong>Professional Photography Mode:</strong> {photographyParams.generationMode === 'image-to-image'
                            ? 'Use the main "Reference Face" to upload your subject, and upload a background here. The AI will compose a professional photo preserving the subject\'s identity.'
                            : 'Use guided prompts and camera settings to generate professional-quality photographs. You can optionally upload a "Reference Face" to preserve identity.'}
                    </div>
                </div>
            </div>
        </div>
    );
};

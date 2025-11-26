import React from 'react';
import { GroupPhotoParams } from '../types';
import { MultiImageUploader } from './MultiImageUploader';

interface GroupPhotoControlsProps {
    groupPhotoParams: GroupPhotoParams;
    onChange: (params: GroupPhotoParams) => void;
}

export const GroupPhotoControls: React.FC<GroupPhotoControlsProps> = ({
    groupPhotoParams,
    onChange
}) => {
    const handleImagesChange = (images: string[]) => {
        onChange({ ...groupPhotoParams, images });
    };

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({ ...groupPhotoParams, customPrompt: e.target.value });
    };

    const presets = [
        {
            id: 'office_team',
            name: 'Office',
            description: 'Modern office environment',
            prompt: 'Modern office background with glass walls and bright lighting.'
        },
        {
            id: 'family_home',
            name: 'Cozy Home',
            description: 'Warm living room setting',
            prompt: 'Cozy living room background with warm lighting and comfortable furniture.'
        },
        {
            id: 'party',
            name: 'Party',
            description: 'Festive party atmosphere',
            prompt: 'Festive party background with balloons, confetti, and colorful lights.'
        },
        {
            id: 'campus',
            name: 'Campus',
            description: 'University campus grounds',
            prompt: 'University campus background with green lawns and academic buildings.'
        },
        {
            id: 'stage',
            name: 'Stage',
            description: 'Concert stage with lights',
            prompt: 'Concert stage background with dramatic spotlights and equipment.'
        },
        {
            id: 'city_skyline',
            name: 'City Skyline',
            description: 'Epic city view at night',
            prompt: 'Dramatic city skyline background at twilight with city lights.'
        },
        {
            id: 'park',
            name: 'Nature Park',
            description: 'Sunny outdoor park',
            prompt: 'Beautiful outdoor park background with trees, grass, and sunlight.'
        },
        {
            id: 'beach',
            name: 'Beach',
            description: 'Sunny tropical beach',
            prompt: 'Sunny tropical beach background with blue ocean and white sand.'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-400 mb-2">👥 Group Photo Mode</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                    Upload multiple photos (faces) to create a group picture.
                    Select a background preset or describe your own!
                </p>
            </div>

            {/* Image Uploader */}
            <MultiImageUploader
                images={groupPhotoParams.images}
                onImagesChange={handleImagesChange}
                maxImages={10}
                label="Upload People (Faces)"
            />

            {/* Preset Selector */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                    Choose Background
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {presets.map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => onChange({ ...groupPhotoParams, selectedPreset: preset.id, customPrompt: preset.prompt })}
                            className={`p-3 rounded-lg border text-left transition-all ${groupPhotoParams.selectedPreset === preset.id
                                ? 'bg-brand-600 border-brand-500 text-white'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                }`}
                        >
                            <div className="font-medium text-sm">{preset.name}</div>
                            <div className="text-[10px] opacity-70">{preset.description}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Prompt Input */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Custom Prompt (Optional)
                </label>
                <textarea
                    value={groupPhotoParams.customPrompt || ''}
                    onChange={handlePromptChange}
                    placeholder="Describe the group scene..."
                    rows={3}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
            </div>
        </div>
    );
};

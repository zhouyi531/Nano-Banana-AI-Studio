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
            name: 'Office Team',
            description: 'Professional group photo in an office setting',
            prompt: 'An office group photo of these people, they are making funny faces.'
        },
        {
            id: 'family_portrait',
            name: 'Family Portrait',
            description: 'Warm and cozy family photo in a living room',
            prompt: 'A warm family portrait of these people sitting together in a cozy living room, smiling naturally.'
        },
        {
            id: 'friends_party',
            name: 'Friends Party',
            description: 'Fun party atmosphere with balloons and confetti',
            prompt: 'A group of friends at a party, laughing and having fun, colorful background with balloons.'
        },
        {
            id: 'graduation',
            name: 'Graduation',
            description: 'Wearing graduation gowns and holding diplomas',
            prompt: 'A graduation group photo, wearing gowns and caps, holding diplomas, university campus background.'
        },
        {
            id: 'band_group',
            name: 'Music Band',
            description: 'Cool rock band posing with instruments',
            prompt: 'A cool rock band group photo, posing with musical instruments, dramatic lighting, stage background.'
        },
        {
            id: 'superheroes',
            name: 'Superheroes',
            description: 'Epic superhero team pose',
            prompt: 'An epic team of superheroes posing together, wearing unique costumes, dramatic city skyline background.'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-400 mb-2">👥 Group Photo Mode</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                    Upload multiple photos (faces) to create a group picture.
                    Select a scenario preset or describe your own!
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
                    Choose Scenario
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

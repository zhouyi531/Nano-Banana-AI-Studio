import React, { useState } from 'react';
import { PoseParams } from '../types';
import { POSE_CATEGORIES, POSE_PRESETS, getPosesByCategory, getPoseById } from '../constants/poseOptions';

interface PoseControlsProps {
    poseParams: PoseParams;
    onChange: (params: PoseParams) => void;
    onPoseReferenceChange: (image: string | null) => void;
}

export const PoseControls: React.FC<PoseControlsProps> = ({
    poseParams,
    onChange,
    onPoseReferenceChange
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('standing');

    const handlePoseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                onChange({ ...poseParams, poseReferenceImage: base64, selectedPreset: undefined });
                onPoseReferenceChange(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearPoseImage = () => {
        onChange({ ...poseParams, poseReferenceImage: undefined });
        onPoseReferenceChange(null);
    };

    const handlePresetSelect = (presetId: string) => {
        onChange({ ...poseParams, selectedPreset: presetId, poseReferenceImage: undefined });
    };

    const filteredPresets = getPosesByCategory(selectedCategory);
    const hasCustomPose = !!poseParams.poseReferenceImage;

    return (
        <div className="space-y-6">
            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-400 mb-2">📌 How Pose Transfer Works</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                    Upload a reference person image (your main upload), then either upload a custom pose reference
                    or select a preset pose. The AI will transfer the pose to your person while preserving their
                    facial identity perfectly.
                </p>
                <p className="text-xs text-slate-400 mt-2">
                    💡 <strong>Tip:</strong> For best results, use clear pose references where the body position
                    is easily visible.
                </p>
            </div>

            {/* Custom Pose Upload */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-300">
                    Custom Pose Reference (Optional)
                </label>
                <p className="text-xs text-slate-400">
                    Upload your own pose reference image, or choose from presets below
                </p>

                {!hasCustomPose ? (
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePoseImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id="pose-upload"
                        />
                        <label
                            htmlFor="pose-upload"
                            className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-lg hover:border-brand-500 hover:bg-brand-500/5 transition-all cursor-pointer"
                        >
                            <div className="text-center">
                                <svg className="mx-auto h-8 w-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="mt-2 text-sm text-slate-400">Click to upload pose reference</p>
                            </div>
                        </label>
                    </div>
                ) : (
                    <div className="relative group">
                        {poseParams.poseReferenceImage && poseParams.poseReferenceImage.startsWith('data:image') && (
                            <img
                                src={poseParams.poseReferenceImage}
                                alt="Pose reference"
                                className="w-full h-64 object-contain bg-slate-800 rounded-lg"
                            />
                        )}
                        <button
                            onClick={handleClearPoseImage}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            Clear
                        </button>
                    </div>
                )}
            </div>

            {/* Preset Pose Selector - Only show if no custom pose */}
            {!hasCustomPose && (
                <div className="space-y-4">
                    <div className="border-t border-slate-700 pt-4">
                        <h3 className="text-sm font-medium text-slate-300 mb-3">Preset Poses</h3>

                        {/* Category Tabs */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {POSE_CATEGORIES.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === category.id
                                        ? 'bg-brand-600 text-white'
                                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>

                        {/* Pose Grid */}
                        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                            {filteredPresets.map((pose) => {
                                const isSelected = poseParams.selectedPreset === pose.id;
                                return (
                                    <button
                                        key={pose.id}
                                        onClick={() => handlePresetSelect(pose.id)}
                                        className={`group relative border rounded-lg overflow-hidden transition-all ${isSelected
                                            ? 'border-brand-500 ring-2 ring-brand-500/50'
                                            : 'border-slate-600 hover:border-brand-400'
                                            }`}
                                    >
                                        {/* Pose Preview Image - Placeholder for now */}
                                        <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                            <div className="text-center p-4">
                                                <span className="text-4xl mb-2 block">🤸</span>
                                                <p className="text-xs text-slate-400">{pose.name}</p>
                                            </div>
                                        </div>

                                        {/* Pose Info */}
                                        <div className={`p-2 ${isSelected ? 'bg-brand-600/20' : 'bg-slate-800'}`}>
                                            <p className="text-xs font-medium text-slate-200">{pose.name}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{pose.description}</p>
                                        </div>

                                        {/* Selected Indicator */}
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 bg-brand-500 text-white rounded-full p-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

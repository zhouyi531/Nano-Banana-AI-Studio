import React from 'react';
import { ImageModParams } from '../types';
import { IMAGE_MOD_PRESETS } from '../constants/imageModOptions';

interface ImageModControlsProps {
    params: ImageModParams;
    onChange: (params: ImageModParams) => void;
}

export const ImageModControls: React.FC<ImageModControlsProps> = ({
    params,
    onChange
}) => {
    const handlePresetChange = (presetId: string) => {
        onChange({ ...params, selectedPreset: presetId });
    };

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({ ...params, customPrompt: e.target.value });
    };

    return (
        <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-400 mb-2">🖼️ Image Modification Mode</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                    Enhance and modify your images with AI.
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                    Choose Modification Type
                </label>
                <div className="grid grid-cols-1 gap-3">
                    {IMAGE_MOD_PRESETS.map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => handlePresetChange(preset.id)}
                            className={`p-4 rounded-lg border text-left transition-all ${params.selectedPreset === preset.id
                                ? 'bg-blue-600/20 border-blue-500 text-white'
                                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
                                }`}
                        >
                            <div className="font-medium mb-1">{preset.name}</div>
                            <div className="text-xs opacity-70">{preset.description}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Additional Instructions (Optional)
                </label>
                <textarea
                    value={params.customPrompt || ''}
                    onChange={handlePromptChange}
                    placeholder="Add specific details or overrides..."
                    className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
            </div>
        </div>
    );
};

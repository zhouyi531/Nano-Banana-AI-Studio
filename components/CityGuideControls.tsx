import React from 'react';
import { CityGuideParams } from '../types';

interface CityGuideControlsProps {
    params: CityGuideParams;
    onChange: (params: CityGuideParams) => void;
}

export const CityGuideControls: React.FC<CityGuideControlsProps> = ({
    params,
    onChange
}) => {
    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({ ...params, customPrompt: e.target.value });
    };

    return (
        <div className="space-y-6">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-purple-400 mb-2">🏙️ 城市女子图鉴 City Girl Guide</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                    Upload a portrait to generate a hyper-real character diagram.
                    The AI will analyze the style and match it to a city, creating a detailed layout with deconstructed items.
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Additional Instructions (Optional)
                </label>
                <textarea
                    value={params.customPrompt || ''}
                    onChange={handlePromptChange}
                    placeholder="e.g., Make the background more rainy, or specify a specific city preference..."
                    rows={3}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
            </div>
        </div>
    );
};

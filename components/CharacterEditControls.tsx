import React from 'react';
import { CharacterEditParams } from '../types';

interface CharacterEditControlsProps {
    params: CharacterEditParams;
    onChange: (params: CharacterEditParams) => void;
}

export const CharacterEditControls: React.FC<CharacterEditControlsProps> = ({ params, onChange }) => {
    const handleChange = (key: keyof CharacterEditParams, value: string) => {
        onChange({ ...params, [key]: value });
    };

    return (
        <div className="space-y-6">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                    <span className="mr-2">✏️</span> Character Details
                </h3>

                <div className="space-y-4">
                    {/* Expression */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Expression
                        </label>
                        <textarea
                            value={params.expression}
                            onChange={(e) => handleChange('expression', e.target.value)}
                            placeholder="e.g., cute puffed-cheeks angry pout, bright smile..."
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent h-20 resize-none"
                        />
                        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                            <button
                                onClick={() => handleChange('expression', 'create a cute “puffed-cheeks angry pout,” but with a much brighter and clearly visible cute smile')}
                                className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded whitespace-nowrap"
                            >
                                Pun-Pun Pout
                            </button>
                            <button
                                onClick={() => handleChange('expression', 'gentle warm smile, soft gaze')}
                                className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded whitespace-nowrap"
                            >
                                Gentle Smile
                            </button>
                        </div>
                    </div>

                    {/* Hairstyle */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Hairstyle
                        </label>
                        <input
                            type="text"
                            value={params.hairstyle}
                            onChange={(e) => handleChange('hairstyle', e.target.value)}
                            placeholder="e.g., realistic twin-tails, long wavy hair..."
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                            <button
                                onClick={() => handleChange('hairstyle', 'convert her existing hair into realistic twin-tails')}
                                className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded whitespace-nowrap"
                            >
                                Twin-Tails
                            </button>
                        </div>
                    </div>

                    {/* Pose */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Pose / Action
                        </label>
                        <textarea
                            value={params.pose}
                            onChange={(e) => handleChange('pose', e.target.value)}
                            placeholder="e.g., raise both arms with small clenched fists near her head..."
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent h-20 resize-none"
                        />
                        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                            <button
                                onClick={() => handleChange('pose', 'raise both arms with small clenched fists near her head (pun-pun pose)')}
                                className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded whitespace-nowrap"
                            >
                                Pun-Pun Pose
                            </button>
                        </div>
                    </div>

                    {/* Clothing */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Clothing
                        </label>
                        <input
                            type="text"
                            value={params.clothing}
                            onChange={(e) => handleChange('clothing', e.target.value)}
                            placeholder="e.g., school uniform, casual hoodie..."
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                    </div>

                    {/* Skin Tone */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Skin Tone / Complexion
                        </label>
                        <input
                            type="text"
                            value={params.skinTone}
                            onChange={(e) => handleChange('skinTone', e.target.value)}
                            placeholder="e.g., fair, tanned, natural blush..."
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                    </div>

                    {/* Props */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Props / Toys
                        </label>
                        <input
                            type="text"
                            value={params.props}
                            onChange={(e) => handleChange('props', e.target.value)}
                            placeholder="e.g., holding a plush toy, wearing glasses..."
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

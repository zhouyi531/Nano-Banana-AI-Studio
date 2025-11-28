import React from 'react';
import { FreeModeParams } from '../types';
import { MultiImageUploader } from './MultiImageUploader';

interface FreeModeControlsProps {
    freeModeParams: FreeModeParams;
    onChange: (params: FreeModeParams) => void;
}

export const FreeModeControls: React.FC<FreeModeControlsProps> = ({
    freeModeParams,
    onChange
}) => {
    const handleImagesChange = (images: string[]) => {
        onChange({ ...freeModeParams, images });
    };

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({ ...freeModeParams, prompt: e.target.value });
    };

    const insertImageRef = (index: number) => {
        const refText = `[Image ${index + 1}]`;
        const newPrompt = freeModeParams.prompt + (freeModeParams.prompt ? ' ' : '') + refText;
        onChange({ ...freeModeParams, prompt: newPrompt });
    };

    const applyTemplate = (templatePrompt: string) => {
        onChange({ ...freeModeParams, prompt: templatePrompt });
    };

    const templates = [
        {
            label: "Face Swap + Style",
            prompt: "Generate a portrait using the face from [Image 1] and the artistic style of [Image 2]."
        },
        {
            label: "Character + Action + Bg",
            prompt: "A scene showing the character from [Image 1] performing the action shown in [Image 2], set in the background environment of [Image 3]."
        },
        {
            label: "Group Composition",
            prompt: "A group photo with the person from [Image 1] on the left and the person from [Image 2] on the right, interacting naturally."
        },
        {
            label: "Fashion Mix",
            prompt: "A model wearing the top from [Image 1] and the pants from [Image 2], posing in a studio setting."
        },
        {
            label: "Group Photo + Bg Swap",
            prompt: "A group photo of the people from [Image 1] and [Image 2] standing together in the location shown in [Image 3]."
        },
        {
            label: "Couple Portrait",
            prompt: "A romantic couple portrait of the person from [Image 1] and the person from [Image 2], looking at each other."
        },
        {
            label: "Movie Scene",
            prompt: "A cinematic shot of the character from [Image 1] in the style of the movie scene in [Image 2]."
        },
        {
            label: "Fantasy Art",
            prompt: "A fantasy illustration of the subject from [Image 1] as a warrior, with the background style of [Image 2]."
        },
        {
            label: "Face + Outfit + Bg",
            prompt: "The person from [Image 1] wearing the outfit from [Image 2] in the background of [Image 3]."
        },
        {
            label: "Poster Style",
            prompt: "把 [Image 1]的风格变成 [Image 2]的风格，人物替换成 [Image 2]的人物"
        }
    ];

    return (
        <div className="space-y-6">
            {/* Info Box */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-purple-400 mb-2">🎨 自由创作模式 Free Creative Mode</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                    Upload up to 5 images and reference them in your prompt using [Image 1], [Image 2], etc.
                    Combine elements, styles, and characters freely!
                </p>
            </div>

            {/* Image Uploader */}
            <MultiImageUploader
                images={freeModeParams.images}
                onImagesChange={handleImagesChange}
                maxImages={5}
            />

            {/* Prompt Input */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Creative Prompt
                    </label>
                    <div className="flex gap-1">
                        {freeModeParams.images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => insertImageRef(idx)}
                                className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded transition-colors"
                                title={`Insert reference to Image ${idx + 1}`}
                            >
                                +[Img {idx + 1}]
                            </button>
                        ))}
                    </div>
                </div>
                <textarea
                    value={freeModeParams.prompt}
                    onChange={handlePromptChange}
                    placeholder="Describe what you want to generate. Example: Person from [Image 1] sitting on the chair from [Image 2]..."
                    rows={4}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
            </div>

            {/* Templates */}
            <div>
                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                    Quick Templates
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {templates.map((t, idx) => (
                        <button
                            key={idx}
                            onClick={() => applyTemplate(t.prompt)}
                            className="text-left p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all group"
                        >
                            <div className="text-xs font-medium text-slate-300 group-hover:text-white mb-1">{t.label}</div>
                            <div className="text-[10px] text-slate-500 truncate">{t.prompt}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

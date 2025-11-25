import React, { useState, useEffect } from 'react';
import { StyleCopyParams, StylePreset } from '../types';
import { ImageUploader } from './ImageUploader';
import { analyzeStyle } from '../services/geminiService';

interface StyleCopyControlsProps {
    styleCopyParams: StyleCopyParams;
    onChange: (params: StyleCopyParams) => void;
}

export const StyleCopyControls: React.FC<StyleCopyControlsProps> = ({ styleCopyParams, onChange }) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    const [presetName, setPresetName] = useState('');
    const [presets, setPresets] = useState<StylePreset[]>([]);
    const [isLoadingPresets, setIsLoadingPresets] = useState(false);

    useEffect(() => {
        fetchPresets();
    }, []);

    const fetchPresets = async () => {
        setIsLoadingPresets(true);
        try {
            const res = await fetch('http://localhost:3001/api/styles');
            const data = await res.json();
            setPresets(data);
        } catch (err) {
            console.error("Failed to fetch presets:", err);
        } finally {
            setIsLoadingPresets(false);
        }
    };

    const handleImageChange = (image: string) => {
        onChange({ ...styleCopyParams, styleImage: image, styleJSON: undefined }); // Clear JSON when image changes
        setAnalysisError(null);
    };

    const handleAnalyze = async () => {
        if (!styleCopyParams.styleImage) return;
        setIsAnalyzing(true);
        setAnalysisError(null);
        try {
            const json = await analyzeStyle(styleCopyParams.styleImage);
            onChange({ ...styleCopyParams, styleJSON: json });
        } catch (err: any) {
            setAnalysisError(err.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSavePreset = async () => {
        if (!presetName || !styleCopyParams.styleJSON) return;
        try {
            const res = await fetch('http://localhost:3001/api/save-style', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: presetName, data: styleCopyParams.styleJSON })
            });
            if (res.ok) {
                setPresetName('');
                fetchPresets(); // Refresh list
                alert('Style preset saved!');
            } else {
                alert('Failed to save preset.');
            }
        } catch (err) {
            console.error("Error saving preset:", err);
            alert('Error saving preset.');
        }
    };

    const handlePresetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const presetId = e.target.value;
        if (!presetId) return;
        const preset = presets.find(p => p.id === presetId);
        if (preset) {
            onChange({ ...styleCopyParams, styleJSON: preset.data });
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Style Reference Image
                </label>
                <ImageUploader
                    onImageSelect={handleImageChange}
                    selectedImage={styleCopyParams.styleImage}
                />
                <p className="text-xs text-gray-500 mt-1">
                    Upload an image to copy its style (lighting, colors, mood).
                </p>
            </div>

            {/* Preset Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Load Saved Style
                </label>
                <select
                    className="w-full p-2 border border-slate-600 bg-slate-900 text-slate-200 rounded-md"
                    onChange={handlePresetSelect}
                    disabled={isLoadingPresets}
                >
                    <option value="">Select a preset...</option>
                    {presets.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>

            {/* Analysis Section */}
            <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Style Analysis (JSON)
                    </label>
                    <button
                        onClick={handleAnalyze}
                        disabled={!styleCopyParams.styleImage || isAnalyzing}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isAnalyzing ? 'Analyzing...' : 'Analyze Style'}
                    </button>
                </div>

                {analysisError && (
                    <p className="text-xs text-red-500 mb-2">{analysisError}</p>
                )}

                <textarea
                    className="w-full h-32 p-2 border border-slate-600 bg-slate-900 text-slate-200 rounded-md text-xs font-mono"
                    value={styleCopyParams.styleJSON || ''}
                    onChange={(e) => onChange({ ...styleCopyParams, styleJSON: e.target.value })}
                    placeholder="Analysis result will appear here..."
                />
            </div>

            {/* Save Preset Section */}
            {styleCopyParams.styleJSON && (
                <div className="flex gap-2 items-end">
                    <div className="flex-grow">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Save as Preset
                        </label>
                        <input
                            type="text"
                            value={presetName}
                            onChange={(e) => setPresetName(e.target.value)}
                            placeholder="Enter preset name"
                            className="w-full p-2 border border-slate-600 bg-slate-900 text-slate-200 rounded-md text-sm"
                        />
                    </div>
                    <button
                        onClick={handleSavePreset}
                        disabled={!presetName}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

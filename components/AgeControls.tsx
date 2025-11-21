import React from 'react';
import { AgeTransformParams } from '../types';

interface AgeControlsProps {
    ageParams: AgeTransformParams;
    onChange: (params: AgeTransformParams) => void;
}

export const AgeControls: React.FC<AgeControlsProps> = ({ ageParams, onChange }) => {
    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...ageParams, targetAge: parseInt(e.target.value, 10) });
    };

    const getAgeLabel = (age: number) => {
        if (age < 5) return 'Toddler';
        if (age < 13) return 'Child';
        if (age < 20) return 'Teenager';
        if (age < 30) return 'Young Adult';
        if (age < 50) return 'Adult';
        if (age < 70) return 'Middle Aged';
        return 'Elderly';
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex justify-between items-end mb-4">
                    <label className="block text-sm font-medium text-slate-300">
                        Target Age
                    </label>
                    <div className="text-right">
                        <span className="text-3xl font-bold text-brand-400">{ageParams.targetAge}</span>
                        <span className="text-sm text-slate-500 ml-1">years old</span>
                    </div>
                </div>

                <div className="relative h-12 flex items-center">
                    <input
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        value={ageParams.targetAge}
                        onChange={handleAgeChange}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400 transition-all"
                    />
                </div>

                <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                    <span>Baby</span>
                    <span>Teen</span>
                    <span>Adult</span>
                    <span>Elderly</span>
                </div>

                <div className="mt-6 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 text-center">
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Current Stage</span>
                    <div className="text-lg font-medium text-white mt-1">
                        {getAgeLabel(ageParams.targetAge)}
                    </div>
                </div>
            </div>
        </div>
    );
};

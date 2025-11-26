import React from 'react';
import { ObjectDecompositionParams } from '../types';

interface ObjectDecompositionControlsProps {
    params: ObjectDecompositionParams;
    onChange: (params: ObjectDecompositionParams) => void;
}

export const ObjectDecompositionControls: React.FC<ObjectDecompositionControlsProps> = ({
    params,
    onChange,
}) => {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Target Object
                    </label>
                    <input
                        type="text"
                        value={params.objectName}
                        onChange={(e) => onChange({ ...params, objectName: e.target.value })}
                        placeholder="e.g., Mechanical Watch, Vintage Camera, Lipstick"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                    />
                    <p className="mt-2 text-xs text-slate-500">
                        Enter the object you want to decompose. The AI will automatically choose between "Industrial Precision" and "Luxury Narrative" styles.
                    </p>
                </div>
            </div>
        </div>
    );
};

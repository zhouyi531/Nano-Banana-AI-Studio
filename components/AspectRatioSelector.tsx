import React from 'react';
import { AspectRatio } from '../types';
import { ASPECT_RATIOS } from '../constants';

interface AspectRatioSelectorProps {
    value: AspectRatio;
    onChange: (ratio: AspectRatio) => void;
    className?: string;
}

const getRatioIconClass = (ratio: string) => {
    switch (ratio) {
        case '3:4': return 'w-[18px] h-[24px]';
        case '4:3': return 'w-[24px] h-[18px]';
        case '1:1': return 'w-[20px] h-[20px]';
        case '9:16': return 'w-[14px] h-[24px]';
        case '16:9': return 'w-[24px] h-[14px]';
        default: return 'w-[20px] h-[20px]';
    }
};

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({
    value,
    onChange,
    className = ''
}) => {
    return (
        <div className={`mb-8 ${className}`}>
            <label className="block text-sm font-medium text-slate-300 mb-2">
                Aspect Ratio
            </label>
            <div className="grid grid-cols-5 gap-2">
                {ASPECT_RATIOS.map((ratio) => (
                    <button
                        key={ratio.value}
                        onClick={() => onChange(ratio.value)}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all
              ${value === ratio.value
                                ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-500/25'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-500'}
            `}
                        title={ratio.label}
                    >
                        <div className={`mb-1 border-2 rounded-sm ${value === ratio.value ? 'border-white' : 'border-current'
                            } ${getRatioIconClass(ratio.value)}`} />
                        <span className="text-[10px] font-medium">{ratio.value}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

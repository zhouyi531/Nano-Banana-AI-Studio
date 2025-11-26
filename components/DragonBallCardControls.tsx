
import React from 'react';
import { DragonBallParams } from '../types';
import { DRAGON_BALL_CHARACTERS } from '../constants/dragonBallData';

interface DragonBallCardControlsProps {
    params: DragonBallParams;
    onChange: (params: DragonBallParams) => void;
}

export const DragonBallCardControls: React.FC<DragonBallCardControlsProps> = ({
    params,
    onChange,
}) => {
    return (
        <div className="space-y-6">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                <h3 className="text-lg font-bold text-yellow-400 mb-2">Dragon Ball Card Gacha</h3>
                <p className="text-sm text-slate-400 mb-4">
                    Click "Draw Card" to summon a random character from the Dragon Ball universe!
                    Each card comes with unique visual effects based on its rarity.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
                        <span>UR (Ultra Rare)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                        <span>SSR (Super Super Rare)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                        <span>SR (Super Rare)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-amber-700"></span>
                        <span>R (Rare)</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                <h4 className="text-sm font-medium text-slate-300 mb-3">Character Pool Preview</h4>
                <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {DRAGON_BALL_CHARACTERS.map((char) => (
                        <div
                            key={char.id}
                            className={`p-2 rounded-lg border text-center transition-all ${params.characterId === char.id
                                    ? 'bg-brand-600/20 border-brand-500'
                                    : 'bg-slate-800 border-slate-700 opacity-70'
                                }`}
                        >
                            <div className={`text-[10px] font-bold mb-1 ${char.rarity === 'UR' ? 'text-purple-400' :
                                    char.rarity === 'SSR' ? 'text-yellow-400' :
                                        char.rarity === 'SR' ? 'text-slate-200' :
                                            char.rarity === 'R' ? 'text-amber-600' : 'text-slate-500'
                                }`}>
                                {char.rarity}
                            </div>
                            <div className="text-xs truncate">{char.name.en}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

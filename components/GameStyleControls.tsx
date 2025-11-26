import React from 'react';
import { GameStyleParams } from '../types';

interface GameStyleControlsProps {
    params: GameStyleParams;
    onChange: (params: GameStyleParams) => void;
}

export const GameStyleControls: React.FC<GameStyleControlsProps> = ({
    params,
    onChange
}) => {
    const handleStyleChange = (preset: typeof presets[0]) => {
        onChange({
            ...params,
            selectedStyle: preset.englishName,
            keywords: preset.keywords
        });
    };

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({ ...params, customPrompt: e.target.value });
    };

    const presets = [
        // Pixel & Retro
        { id: '8bit', name: '8位像素', englishName: '8-BIT PIXEL ART', keywords: 'FC红白机, 有限色板, 方块美学' },
        { id: '16bit', name: '16位像素', englishName: '16-BIT PIXEL ART', keywords: 'SFC时代, 丰富细节, 怀旧情怀' },
        { id: 'gba', name: 'GBA风格', englishName: 'GBA STYLE', keywords: '掌机色彩, 明亮柔和, 日式RPG' },
        { id: 'lowpoly', name: '低多边形', englishName: 'LOW POLY STYLE', keywords: '几何简约, 棱角分明, PS1质感' },
        { id: 'voxel', name: '体素风格', englishName: 'VOXEL ART STYLE', keywords: '3D像素, Minecraft感, 积木世界' },
        { id: 'vaporwave', name: '蒸汽波', englishName: 'VAPORWAVE STYLE', keywords: '80s怀旧, 霓虹粉紫, 网格山脉' },
        { id: 'y2k', name: 'Y2K美学', englishName: 'Y2K AESTHETIC', keywords: '千禧未来, 金属质感, 科技乐观' },
        { id: 'synthwave', name: '合成器波', englishName: 'SYNTHWAVE STYLE', keywords: '复古未来, 日落渐变, 跑车剪影' },

        // 3A Game Styles
        { id: 'cyberpunk', name: '赛博朋克', englishName: 'CYBERPUNK STYLE', keywords: '霓虹都市, 高科技低生活, 雨夜氛围' },
        { id: 'zelda', name: '塞尔达风格', englishName: 'ZELDA BOTW STYLE', keywords: '卡通渲染, 开放世界, 清新自然' },
        { id: 'darksouls', name: '黑暗之魂', englishName: 'DARK SOULS STYLE', keywords: '哥特建筑, 阴郁氛围, 史诗废墟' },
        { id: 'genshin', name: '原神风格', englishName: 'GENSHIN IMPACT STYLE', keywords: '二次元3D, 明亮色彩, 奇幻冒险' },
        { id: 'eldenring', name: '艾尔登法环', englishName: 'ELDEN RING STYLE', keywords: '奇幻史诗, 苍凉大陆, 神秘建筑' },
        { id: 'godofwar', name: '战神风格', englishName: 'GOD OF WAR STYLE', keywords: '北欧神话, 粗犷写实, 史诗场景' },
        { id: 'finalfantasy', name: '最终幻想', englishName: 'FINAL FANTASY STYLE', keywords: '华丽奇幻, 精致角色, 魔法科技' },
        { id: 'witcher', name: '巫师风格', englishName: 'THE WITCHER STYLE', keywords: '斯拉夫奇幻, 暗黑中世纪, 写实沧桑' },

        // Western & Sci-Fi
        { id: 'westerncomics', name: '美漫风格', englishName: 'WESTERN COMICS STYLE', keywords: '明明线条, 强烈阴影, 英雄气概' },
        { id: 'minions', name: '小黄人风格', englishName: 'MINIONS STYLE', keywords: '香蕉狂热, 黄色军团, 搞怪卖萌' },
        { id: 'steampunk', name: '蒸汽朋克', englishName: 'STEAMPUNK STYLE', keywords: '维多利亚工业, 齿轮机械, 复古未来' },
        { id: 'spaceopera', name: '太空歌剧', englishName: 'SPACE OPERA STYLE', keywords: '宏大叙事, 星际舰队, 外星奇观' },
        { id: 'wasteland', name: '废土风格', englishName: 'WASTELAND STYLE', keywords: '末日余生, 荒芜世界, 生存挑战' },
        { id: 'biopunk', name: '生物朋克', englishName: 'BIOPUNK STYLE', keywords: '基因改造, 有机技术, 异形生物' },
        { id: 'artnouveau', name: '新艺术风格', englishName: 'ART NOUVEAU STYLE', keywords: '流线装饰, 自然元素, 女性之美' },
        { id: 'popart', name: '波普艺术', englishName: 'POP ART STYLE', keywords: '大众文化, 鲜艳色彩, 重复图案' },

        // Anime Styles
        { id: 'ghibli', name: '吉卜力风格', englishName: 'GHIBLI STYLE', keywords: '温暖治愈, 手绘质感, 自然光影' },
        { id: 'shinkai', name: '新海诚风格', englishName: 'MAKOTO SHINKAI STYLE', keywords: '极致光影, 细腻云层, 唯美青春' },
        { id: 'satoshi', name: '今敏风格', englishName: 'SATOSHI KON STYLE', keywords: '现实交织, 精细人物, 心理深度' },
        { id: '90sanime', name: '90年代动画', englishName: '90S ANIME STYLE', keywords: '赛璐珞质感, 复古色调, 锐利线条' },
        { id: 'trigger', name: 'Trigger风格', englishName: 'STUDIO TRIGGER STYLE', keywords: '热血炸裂, 强烈对比, 超越极限' },
        { id: 'kyoto', name: '京都动画', englishName: 'KYOTO ANIMATION STYLE', keywords: '精致日常, 柔和光线, 细腻表情' },
        { id: 'shoujo', name: '少女漫画', englishName: 'SHOUJO MANGA STYLE', keywords: '大眼睛, 花瓣背景, 浪漫柔美' },
        { id: 'shonen', name: '战斗番风格', englishName: 'SHONEN ANIME STYLE', keywords: '热血战斗, 夸张动作, 速度线' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-purple-400 mb-2">🎮 Game Style Mode</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                    Transform your photo into a video game character!
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                    Choose Game Style
                </label>
                <div className="grid grid-cols-2 gap-3 h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {presets.map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => handleStyleChange(preset)}
                            className={`p-3 rounded-lg border text-left transition-all ${params.selectedStyle === preset.englishName
                                ? 'bg-brand-600 border-brand-500 text-white'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                }`}
                        >
                            <div className="font-medium text-sm">{preset.name}</div>
                            <div className="text-[10px] opacity-70 mt-0.5">{preset.englishName}</div>
                            <div className="text-[10px] opacity-50 mt-1">{preset.keywords}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Custom Prompt (Optional)
                </label>
                <textarea
                    value={params.customPrompt || ''}
                    onChange={handlePromptChange}
                    placeholder="Add specific details (e.g., holding a sword, wearing power armor)..."
                    rows={3}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
            </div>
        </div>
    );
};

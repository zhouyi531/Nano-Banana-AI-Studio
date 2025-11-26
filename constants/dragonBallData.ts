
export type Rarity = 'UR' | 'SSR' | 'SR' | 'R' | 'N';

export interface DragonBallCharacter {
    id: string;
    name: {
        cn: string;
        en: string;
        jp: string;
    };
    rarity: Rarity;
    description: string;
    promptKeywords: string; // Specific visual descriptors for the character and state
    type: 'good' | 'bad' | 'neutral';
}

export const DRAGON_BALL_CHARACTERS: DragonBallCharacter[] = [
    {
        id: 'goku_ui',
        name: {
            cn: '孙悟空 (自在极意功)',
            en: 'Son Goku (Ultra Instinct)',
            jp: '孫悟空 (身勝手の極意)'
        },
        rarity: 'UR',
        description: '在力量大会上觉醒的究极形态，身体可以自动对任何危险做出反应。',
        promptKeywords: 'son goku, ultra instinct, silver hair, silver eyes, torn orange pants, shirtless, muscular upper body, calm but intense expression, dodging movement, (aura shaped like a giant avatar behind:0.5)',
        type: 'good'
    },
    {
        id: 'vegeta_majin',
        name: {
            cn: '魔人贝吉塔',
            en: 'Majin Vegeta',
            jp: '魔人ベジータ'
        },
        rarity: 'SSR',
        description: '为了与悟空一战，自愿接受巴比迪控制的贝吉塔，展现出高傲的赛亚人王子尊严。',
        promptKeywords: 'vegeta, majin vegeta, majin mark on forehead, blue spandex, white armor damaged, super saiyan, golden hair, smirk expression, side profile, saluting pose',
        type: 'bad'
    },
    {
        id: 'gohan_ssj2',
        name: {
            cn: '孙悟饭 (超级赛亚人2)',
            en: 'Son Gohan (Super Saiyan 2)',
            jp: '孫悟飯 (超サイヤ人2)'
        },
        rarity: 'UR',
        description: '目睹人造人16号被破坏后，愤怒爆发超越了超级赛亚人的极限。',
        promptKeywords: 'son gohan, super saiyan 2, purple piccolo gi, tears in eyes, angry, (one arm hanging:1.2), crackling electricity, kamehameha preparation',
        type: 'good'
    },
    {
        id: 'frieza_final',
        name: {
            cn: '弗利萨 (最终形态)',
            en: 'Frieza (Final Form)',
            jp: 'フリーザ (最終形態)'
        },
        rarity: 'SSR',
        description: '宇宙帝王弗利萨的真实面目，拥有令人绝望的恐怖力量。',
        promptKeywords: 'frieza, final form, white and purple skin, sleek design, evil smirk, death beam finger, purple aura, destroyed namek background',
        type: 'bad'
    },
    {
        id: 'cell_perfect',
        name: {
            cn: '沙鲁 (完全体)',
            en: 'Cell (Perfect Form)',
            jp: 'セル (完全体)'
        },
        rarity: 'SSR',
        description: '吸收了17号和18号后的究极人造人，追求完美的战斗。',
        promptKeywords: 'perfect cell, green and black spotted armor, confident smirk, crossed arms, golden aura, cell games arena background',
        type: 'bad'
    },
    {
        id: 'piccolo',
        name: {
            cn: '比克',
            en: 'Piccolo',
            jp: 'ピッコロ'
        },
        rarity: 'SR',
        description: '那美克星的战士，悟空的劲敌兼良师益友。',
        promptKeywords: 'piccolo, green skin, white turban, white cape, purple gi, special beam cannon pose, intense focus, rocky wasteland background',
        type: 'good'
    },
    {
        id: 'majin_buu_fat',
        name: {
            cn: '魔人布欧 (善)',
            en: 'Majin Buu (Good)',
            jp: '魔人ブウ (善)'
        },
        rarity: 'SR',
        description: '虽然拥有可怕的力量，但性格像孩子一样天真贪吃。',
        promptKeywords: 'majin buu, fat, pink skin, purple cape, yellow gloves, happy expression, eating chocolate, steam coming from head holes',
        type: 'neutral'
    },
    {
        id: 'krillin',
        name: {
            cn: '克林',
            en: 'Krillin',
            jp: 'クリリン'
        },
        rarity: 'R',
        description: '悟空最好的朋友，最强的地球人战士。',
        promptKeywords: 'krillin, bald, orange gi, turtle school uniform, destructo disc pose, determined expression, battle stance',
        type: 'good'
    },
    {
        id: 'roshi',
        name: {
            cn: '龟仙人',
            en: 'Master Roshi',
            jp: '亀仙人'
        },
        rarity: 'R',
        description: '武术之神，创造了龟派气功的传奇武道家。',
        promptKeywords: 'master roshi, sunglasses, turtle shell on back, orange shirt, holding staff, peace sign, kame house background',
        type: 'good'
    },
    {
        id: 'bulma',
        name: {
            cn: '布尔玛',
            en: 'Bulma',
            jp: 'ブルマ'
        },
        rarity: 'N',
        description: '天才科学家，龙珠雷达的发明者，寻找龙珠冒险的开始。',
        promptKeywords: 'bulma, pink dress, blue hair, holding dragon radar, surprised expression, holding a capsule, roadside background',
        type: 'good'
    },
    {
        id: 'goku_child',
        name: {
            cn: '孙悟空 (幼年)',
            en: 'Son Goku (Child)',
            jp: '孫悟空 (少年期)'
        },
        rarity: 'N',
        description: '在大山里长大的奇怪少年，拥有惊人的怪力。',
        promptKeywords: 'son goku (child), blue gi, holding power pole, red tail, happy smile, looking at viewer, simple landscape background',
        type: 'good'
    }
];

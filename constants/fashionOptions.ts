import { FashionParams } from '../types';

export const FASHION_OPTIONS = {
    glasses: [
        { id: 'none', label: 'No Glasses' },
        { id: 'aviator', label: 'Aviator Sunglasses' },
        { id: 'wayfarer', label: 'Wayfarer Sunglasses' },
        { id: 'round_metal', label: 'Round Metal Glasses' },
        { id: 'cat_eye', label: 'Cat Eye Sunglasses' },
        { id: 'rimless', label: 'Rimless Business Glasses' },
        { id: 'oversized', label: 'Oversized Fashion Glasses' },
    ],
    hairstyle: [
        { id: 'short_undercut', label: 'Short Undercut' },
        { id: 'long_wavy', label: 'Long Wavy Hair' },
        { id: 'bob_cut', label: 'Bob Cut' },
        { id: 'buzz_cut', label: 'Buzz Cut' },
        { id: 'ponytail', label: 'High Ponytail' },
        { id: 'messy_bun', label: 'Messy Bun' },
        { id: 'side_part', label: 'Classic Side Part' },
        { id: 'afro', label: 'Afro' },
        { id: 'braids', label: 'Braids' },
    ],
    hat: [
        { id: 'none', label: 'No Hat' },
        { id: 'fedora', label: 'Fedora' },
        { id: 'baseball_cap', label: 'Baseball Cap' },
        { id: 'beanie', label: 'Beanie' },
        { id: 'bucket_hat', label: 'Bucket Hat' },
        { id: 'beret', label: 'Beret' },
        { id: 'panama', label: 'Panama Hat' },
    ],
    clothing: [
        { id: 'business_suit', label: 'Business Suit' },
        { id: 'tshirt_jeans', label: 'White T-Shirt & Jeans' },
        { id: 'summer_dress', label: 'Floral Summer Dress' },
        { id: 'leather_jacket', label: 'Leather Jacket & Black Jeans' },
        { id: 'hoodie_sweatpants', label: 'Hoodie & Sweatpants' },
        { id: 'evening_gown', label: 'Elegant Evening Gown' },
        { id: 'tuxedo', label: 'Classic Tuxedo' },
        { id: 'boho_chic', label: 'Boho Chic Outfit' },
        { id: 'cyberpunk', label: 'Cyberpunk Techwear' },
    ],
    shoes: [
        { id: 'sneakers', label: 'White Sneakers' },
        { id: 'loafers', label: 'Leather Loafers' },
        { id: 'boots', label: 'Ankle Boots' },
        { id: 'heels', label: 'High Heels' },
        { id: 'sandals', label: 'Summer Sandals' },
        { id: 'oxfords', label: 'Classic Oxfords' },
        { id: 'combat_boots', label: 'Combat Boots' },
    ]
};

export interface FashionPreset {
    id: string;
    name: string;
    gender: 'male' | 'female' | 'unisex';
    params: FashionParams;
    description: string;
}

export const CLASSIC_PRESETS: FashionPreset[] = [
    {
        id: 'male_business',
        name: 'Modern Executive',
        gender: 'male',
        description: 'Sharp business suit with a clean side part.',
        params: {
            glasses: 'none',
            hairstyle: 'side_part',
            hat: 'none',
            clothing: 'business_suit',
            shoes: 'oxfords'
        }
    },
    {
        id: 'female_chic',
        name: 'City Chic',
        gender: 'female',
        description: 'Stylish leather jacket look with wavy hair.',
        params: {
            glasses: 'cat_eye',
            hairstyle: 'long_wavy',
            hat: 'none',
            clothing: 'leather_jacket',
            shoes: 'boots'
        }
    },
    {
        id: 'male_casual',
        name: 'Weekend Casual',
        gender: 'male',
        description: 'Relaxed t-shirt and jeans with sneakers.',
        params: {
            glasses: 'wayfarer',
            hairstyle: 'messy_bun',
            hat: 'none',
            clothing: 'tshirt_jeans',
            shoes: 'sneakers'
        }
    },
    {
        id: 'female_summer',
        name: 'Summer Breeze',
        gender: 'female',
        description: 'Light floral dress with a sun hat.',
        params: {
            glasses: 'oversized',
            hairstyle: 'braids',
            hat: 'panama',
            clothing: 'summer_dress',
            shoes: 'sandals'
        }
    },
    {
        id: 'male_street',
        name: 'Street Hype',
        gender: 'male',
        description: 'Trendy hoodie and cap combination.',
        params: {
            glasses: 'none',
            hairstyle: 'buzz_cut',
            hat: 'baseball_cap',
            clothing: 'hoodie_sweatpants',
            shoes: 'sneakers'
        }
    },
    {
        id: 'female_gala',
        name: 'Red Carpet',
        gender: 'female',
        description: 'Glamorous evening gown for special events.',
        params: {
            glasses: 'none',
            hairstyle: 'ponytail',
            hat: 'none',
            clothing: 'evening_gown',
            shoes: 'heels'
        }
    }
];

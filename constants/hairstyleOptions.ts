import { HairstyleParams } from '../types';

export const HAIRSTYLE_OPTIONS = {
    male: [
        { id: 'short_undercut', label: 'Short Undercut', desc: 'Clean sides, longer on top' },
        { id: 'buzz_cut', label: 'Buzz Cut', desc: 'Very short all around' },
        { id: 'side_part', label: 'Classic Side Part', desc: 'Professional and timeless' },
        { id: 'pompadour', label: 'Pompadour', desc: 'Voluminous swept-back style' },
        { id: 'man_bun', label: 'Man Bun', desc: 'Long hair tied back' },
        { id: 'crew_cut', label: 'Crew Cut', desc: 'Short military style' },
        { id: 'slicked_back', label: 'Slicked Back', desc: 'Smooth and polished' },
        { id: 'curly_top', label: 'Curly Top', desc: 'Natural curls on top' },
        { id: 'fade', label: 'Fade', desc: 'Gradual length transition' },
        { id: 'long_hair', label: 'Long Hair', desc: 'Shoulder-length or longer' },
        { id: 'mohawk', label: 'Mohawk', desc: 'Bold center strip' },
        { id: 'quiff', label: 'Quiff', desc: 'Textured volume on top' },
    ],
    female: [
        { id: 'long_wavy', label: 'Long Wavy', desc: 'Flowing waves past shoulders' },
        { id: 'bob_cut', label: 'Bob Cut', desc: 'Chin-length classic style' },
        { id: 'pixie_cut', label: 'Pixie Cut', desc: 'Short and chic' },
        { id: 'high_ponytail', label: 'High Ponytail', desc: 'Sleek and sporty' },
        { id: 'messy_bun', label: 'Messy Bun', desc: 'Casual updo' },
        { id: 'beach_waves', label: 'Beach Waves', desc: 'Relaxed textured waves' },
        { id: 'straight_long', label: 'Straight Long', desc: 'Sleek and smooth' },
        { id: 'curly_afro', label: 'Curly Afro', desc: 'Natural voluminous curls' },
        { id: 'braids', label: 'Braids', desc: 'Intricate woven style' },
        { id: 'half_up_half_down', label: 'Half-Up Half-Down', desc: 'Versatile mixed style' },
        { id: 'shag_cut', label: 'Shag Cut', desc: 'Layered and textured' },
        { id: 'layered', label: 'Layered', desc: 'Multi-dimensional cut' },
    ]
};

export interface HairstylePreset {
    id: string;
    name: string;
    gender: 'male' | 'female';
    params: HairstyleParams;
    description: string;
}

export const HAIRSTYLE_PRESETS: HairstylePreset[] = [
    // Male Presets
    {
        id: 'male_professional',
        name: 'Professional',
        gender: 'male',
        description: 'Clean side part for business settings',
        params: {
            hairstyle: 'side_part'
        }
    },
    {
        id: 'male_modern',
        name: 'Modern Edge',
        gender: 'male',
        description: 'Trendy undercut with texture',
        params: {
            hairstyle: 'short_undercut'
        }
    },
    {
        id: 'male_classic',
        name: 'Classic Gentleman',
        gender: 'male',
        description: 'Timeless pompadour style',
        params: {
            hairstyle: 'pompadour'
        }
    },
    {
        id: 'male_casual',
        name: 'Casual Cool',
        gender: 'male',
        description: 'Relaxed man bun look',
        params: {
            hairstyle: 'man_bun'
        }
    },
    {
        id: 'male_athletic',
        name: 'Athletic',
        gender: 'male',
        description: 'Low-maintenance buzz cut',
        params: {
            hairstyle: 'buzz_cut'
        }
    },
    {
        id: 'male_trendy',
        name: 'Trendy Fade',
        gender: 'male',
        description: 'Contemporary fade style',
        params: {
            hairstyle: 'fade'
        }
    },

    // Female Presets
    {
        id: 'female_romantic',
        name: 'Romantic Waves',
        gender: 'female',
        description: 'Soft flowing wavy hair',
        params: {
            hairstyle: 'long_wavy'
        }
    },
    {
        id: 'female_chic',
        name: 'Chic Bob',
        gender: 'female',
        description: 'Sophisticated bob cut',
        params: {
            hairstyle: 'bob_cut'
        }
    },
    {
        id: 'female_bold',
        name: 'Bold Pixie',
        gender: 'female',
        description: 'Confident short pixie',
        params: {
            hairstyle: 'pixie_cut'
        }
    },
    {
        id: 'female_elegant',
        name: 'Elegant Updo',
        gender: 'female',
        description: 'Polished high ponytail',
        params: {
            hairstyle: 'high_ponytail'
        }
    },
    {
        id: 'female_casual',
        name: 'Casual Bun',
        gender: 'female',
        description: 'Effortless messy bun',
        params: {
            hairstyle: 'messy_bun'
        }
    },
    {
        id: 'female_beachy',
        name: 'Beach Vibes',
        gender: 'female',
        description: 'Relaxed beach waves',
        params: {
            hairstyle: 'beach_waves'
        }
    },
    {
        id: 'female_sleek',
        name: 'Sleek & Straight',
        gender: 'female',
        description: 'Smooth straight hair',
        params: {
            hairstyle: 'straight_long'
        }
    },
    {
        id: 'female_natural',
        name: 'Natural Curls',
        gender: 'female',
        description: 'Beautiful afro curls',
        params: {
            hairstyle: 'curly_afro'
        }
    }
];

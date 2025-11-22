import { TattooParams } from '../types';

export const TATTOO_POSITIONS = [
    { id: 'upper_arm', label: 'Upper Arm', icon: '💪', desc: 'Bicep/Tricep area' },
    { id: 'forearm', label: 'Forearm', icon: '🦾', desc: 'Lower arm' },
    { id: 'shoulder', label: 'Shoulder', icon: '🫱', desc: 'Shoulder cap' },
    { id: 'chest', label: 'Chest', icon: '🫀', desc: 'Upper chest area' },
    { id: 'back', label: 'Back', icon: '🔙', desc: 'Upper/Mid back' },
    { id: 'ribcage', label: 'Ribcage', icon: '🫁', desc: 'Side of torso' },
    { id: 'thigh', label: 'Thigh', icon: '🦵', desc: 'Upper leg' },
    { id: 'calf', label: 'Calf', icon: '🦿', desc: 'Lower leg' },
    { id: 'ankle', label: 'Ankle', icon: '👣', desc: 'Ankle area' },
    { id: 'neck', label: 'Neck', icon: '🧣', desc: 'Side/Back of neck' },
    { id: 'wrist', label: 'Wrist', icon: '⌚', desc: 'Wrist area' },
];

export const TATTOO_DESIGNS = [
    { id: 'dragon', label: 'Dragon', desc: 'Traditional Asian dragon' },
    { id: 'phoenix', label: 'Phoenix', desc: 'Rising phoenix bird' },
    { id: 'tribal', label: 'Tribal', desc: 'Bold tribal patterns' },
    { id: 'floral', label: 'Floral', desc: 'Flowers and botanicals' },
    { id: 'geometric', label: 'Geometric', desc: 'Sacred geometry patterns' },
    { id: 'script', label: 'Script/Text', desc: 'Meaningful words or quotes' },
    { id: 'minimalist', label: 'Minimalist', desc: 'Simple line art' },
    { id: 'traditional', label: 'Traditional', desc: 'Classic American style' },
    { id: 'watercolor', label: 'Watercolor', desc: 'Artistic watercolor style' },
    { id: 'biomechanical', label: 'Biomechanical', desc: 'Mechanical/cyborg style' },
    { id: 'custom', label: 'Custom Design', desc: 'Describe your own tattoo' },
];

export interface TattooPreset {
    id: string;
    name: string;
    params: TattooParams;
    description: string;
}

export const TATTOO_PRESETS: TattooPreset[] = [
    {
        id: 'dragon_arm',
        name: 'Dragon Sleeve',
        description: 'Traditional dragon wrapping around upper arm',
        params: {
            position: 'upper_arm',
            design: 'dragon'
        }
    },
    {
        id: 'phoenix_back',
        name: 'Phoenix Rising',
        description: 'Large phoenix across upper back',
        params: {
            position: 'back',
            design: 'phoenix'
        }
    },
    {
        id: 'tribal_shoulder',
        name: 'Tribal Shoulder',
        description: 'Bold tribal pattern on shoulder',
        params: {
            position: 'shoulder',
            design: 'tribal'
        }
    },
    {
        id: 'floral_ribcage',
        name: 'Floral Ribcage',
        description: 'Delicate flowers along ribcage',
        params: {
            position: 'ribcage',
            design: 'floral'
        }
    },
    {
        id: 'geometric_forearm',
        name: 'Geometric Forearm',
        description: 'Sacred geometry on forearm',
        params: {
            position: 'forearm',
            design: 'geometric'
        }
    },
    {
        id: 'minimalist_wrist',
        name: 'Minimalist Wrist',
        description: 'Simple line art on wrist',
        params: {
            position: 'wrist',
            design: 'minimalist'
        }
    },
    {
        id: 'traditional_chest',
        name: 'Traditional Chest',
        description: 'Classic American style on chest',
        params: {
            position: 'chest',
            design: 'traditional'
        }
    },
    {
        id: 'watercolor_thigh',
        name: 'Watercolor Thigh',
        description: 'Artistic watercolor on thigh',
        params: {
            position: 'thigh',
            design: 'watercolor'
        }
    },
];

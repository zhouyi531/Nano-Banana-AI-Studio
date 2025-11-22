import { PhotographyParams } from '../types';

// Camera Settings
export const APERTURE_OPTIONS = [
    { id: 'f1.4', label: 'f/1.4', desc: 'Very shallow depth of field' },
    { id: 'f1.8', label: 'f/1.8', desc: 'Shallow depth of field' },
    { id: 'f2.8', label: 'f/2.8', desc: 'Moderate depth of field' },
    { id: 'f4', label: 'f/4', desc: 'Balanced depth of field' },
    { id: 'f5.6', label: 'f/5.6', desc: 'Good depth of field' },
    { id: 'f8', label: 'f/8', desc: 'Deep depth of field' },
    { id: 'f11', label: 'f/11', desc: 'Very deep depth of field' },
    { id: 'f16', label: 'f/16', desc: 'Maximum depth of field' },
];

export const FOCAL_LENGTH_OPTIONS = [
    { id: '24mm', label: '24mm', desc: 'Wide angle' },
    { id: '35mm', label: '35mm', desc: 'Moderate wide' },
    { id: '50mm', label: '50mm', desc: 'Standard' },
    { id: '85mm', label: '85mm', desc: 'Portrait' },
    { id: '135mm', label: '135mm', desc: 'Telephoto' },
    { id: '200mm', label: '200mm', desc: 'Long telephoto' },
];

export const ISO_OPTIONS = [
    { id: '100', label: 'ISO 100', desc: 'Lowest noise' },
    { id: '200', label: 'ISO 200', desc: 'Very low noise' },
    { id: '400', label: 'ISO 400', desc: 'Low noise' },
    { id: '800', label: 'ISO 800', desc: 'Moderate noise' },
    { id: '1600', label: 'ISO 1600', desc: 'Noticeable grain' },
    { id: '3200', label: 'ISO 3200', desc: 'High grain' },
];

export const SHUTTER_SPEED_OPTIONS = [
    { id: '1000', label: '1/1000s', desc: 'Freeze fast motion' },
    { id: '500', label: '1/500s', desc: 'Freeze motion' },
    { id: '250', label: '1/250s', desc: 'Sharp handheld' },
    { id: '125', label: '1/125s', desc: 'Standard handheld' },
    { id: '60', label: '1/60s', desc: 'Slow handheld' },
    { id: '30', label: '1/30s', desc: 'Motion blur' },
];

export const LENS_TYPE_OPTIONS = [
    { id: 'prime', label: 'Prime Lens', desc: 'Sharp, fixed focal length' },
    { id: 'zoom', label: 'Zoom Lens', desc: 'Versatile focal range' },
    { id: 'wide', label: 'Wide-angle', desc: 'Expansive view' },
    { id: 'telephoto', label: 'Telephoto', desc: 'Compressed perspective' },
    { id: 'macro', label: 'Macro', desc: 'Extreme close-up' },
    { id: 'fisheye', label: 'Fisheye', desc: 'Ultra-wide distortion' },
];

// Guided Prompt Options
export const EXPRESSION_OPTIONS = [
    'Smiling', 'Serious', 'Surprised', 'Thoughtful', 'Joyful',
    'Confident', 'Mysterious', 'Playful', 'Peaceful', 'Intense'
];

export const ATMOSPHERE_OPTIONS = [
    'Peaceful', 'Energetic', 'Mysterious', 'Romantic', 'Dramatic',
    'Serene', 'Vibrant', 'Moody', 'Cheerful', 'Melancholic'
];

export const WEATHER_OPTIONS = [
    'Sunny', 'Cloudy', 'Overcast', 'Rainy', 'Foggy',
    'Snowy', 'Stormy', 'Misty', 'Clear', 'Hazy'
];

export const LIGHTING_OPTIONS = [
    { id: 'golden_hour', label: 'Golden Hour', desc: 'Warm, soft light at sunrise/sunset' },
    { id: 'blue_hour', label: 'Blue Hour', desc: 'Cool, blue light before sunrise/after sunset' },
    { id: 'harsh_midday', label: 'Harsh Midday', desc: 'Strong overhead sunlight' },
    { id: 'soft_overcast', label: 'Soft Overcast', desc: 'Diffused cloudy light' },
    { id: 'studio', label: 'Studio Lighting', desc: 'Controlled artificial light' },
    { id: 'natural_window', label: 'Natural Window', desc: 'Soft directional indoor light' },
    { id: 'dramatic_side', label: 'Dramatic Side Light', desc: 'Strong side lighting with shadows' },
    { id: 'backlight', label: 'Backlight', desc: 'Light from behind subject' },
];

// Photography Presets
export interface PhotographyPreset {
    id: string;
    name: string;
    description: string;
    params: Partial<PhotographyParams>;
}

export const PHOTOGRAPHY_PRESETS: PhotographyPreset[] = [
    {
        id: 'portrait_golden',
        name: 'Golden Hour Portrait',
        description: 'Warm portrait with shallow depth of field',
        params: {
            generationMode: 'text-to-image',
            expression: 'Smiling',
            atmosphere: 'Peaceful',
            weather: 'Clear',
            lighting: 'golden_hour',
            aperture: 'f1.8',
            focalLength: '85mm',
            iso: '100',
            shutterSpeed: '250',
            lensType: 'prime'
        }
    },
    {
        id: 'landscape_wide',
        name: 'Landscape Vista',
        description: 'Wide landscape with deep depth of field',
        params: {
            generationMode: 'text-to-image',
            atmosphere: 'Serene',
            weather: 'Sunny',
            lighting: 'golden_hour',
            aperture: 'f11',
            focalLength: '24mm',
            iso: '100',
            shutterSpeed: '125',
            lensType: 'wide'
        }
    },
    {
        id: 'street_candid',
        name: 'Street Photography',
        description: 'Candid street moment with standard lens',
        params: {
            generationMode: 'text-to-image',
            expression: 'Natural',
            atmosphere: 'Vibrant',
            weather: 'Cloudy',
            lighting: 'soft_overcast',
            aperture: 'f5.6',
            focalLength: '35mm',
            iso: '400',
            shutterSpeed: '250',
            lensType: 'prime'
        }
    },
    {
        id: 'fashion_studio',
        name: 'Fashion Studio',
        description: 'Professional studio fashion shot',
        params: {
            generationMode: 'text-to-image',
            expression: 'Confident',
            atmosphere: 'Dramatic',
            weather: 'Indoor',
            lighting: 'studio',
            aperture: 'f8',
            focalLength: '85mm',
            iso: '100',
            shutterSpeed: '125',
            lensType: 'prime'
        }
    },
    {
        id: 'moody_portrait',
        name: 'Moody Portrait',
        description: 'Dramatic portrait with side lighting',
        params: {
            generationMode: 'text-to-image',
            expression: 'Serious',
            atmosphere: 'Moody',
            weather: 'Overcast',
            lighting: 'dramatic_side',
            aperture: 'f2.8',
            focalLength: '50mm',
            iso: '800',
            shutterSpeed: '125',
            lensType: 'prime'
        }
    },
    {
        id: 'action_sports',
        name: 'Action Shot',
        description: 'Fast-moving subject with motion freeze',
        params: {
            generationMode: 'text-to-image',
            expression: 'Intense',
            atmosphere: 'Energetic',
            weather: 'Sunny',
            lighting: 'harsh_midday',
            aperture: 'f4',
            focalLength: '200mm',
            iso: '800',
            shutterSpeed: '1000',
            lensType: 'telephoto'
        }
    },
];

// Example prompts for guidance
export const SUBJECT_EXAMPLES = [
    'A young woman in her 20s',
    'An elderly man with a beard',
    'A professional athlete',
    'A fashion model',
    'A child playing'
];

export const LOCATION_EXAMPLES = [
    'Urban street corner',
    'Mountain summit',
    'Beach at sunset',
    'Modern office',
    'Cozy cafe',
    'Forest clearing'
];

export const ACTION_EXAMPLES = [
    'Walking confidently',
    'Sitting and reading',
    'Jumping in the air',
    'Looking at the camera',
    'Dancing gracefully',
    'Running through field'
];

export const BACKGROUND_EXAMPLES = [
    'Blurred city lights',
    'Mountain landscape',
    'Ocean waves',
    'Minimalist white studio',
    'Colorful graffiti wall',
    'Natural forest'
];

export interface ImageModPreset {
    id: string;
    name: string;
    description: string;
    prompt: string;
}

export const IMAGE_MOD_PRESETS: ImageModPreset[] = [
    {
        id: 'hd_upscale',
        name: '高清放大 (HD Upscale)',
        description: 'Enhance resolution and detail using artistic super-resolution.',
        prompt: 'Upscale this image using an artistic super-resolution process. Enrich it with micro-textures, fine-grain detail, depth enhancements, and creative accents that elevate visual complexity without distorting the core subject. Colorize the image. Adjust saturation, contrast, and white balance to achieve a master-level quality.'
    }
];

export const DEFAULT_IMAGE_MOD_PARAMS = {
    selectedPreset: 'hd_upscale',
    customPrompt: ''
};

import { GenerationContext, GenerationStrategy } from './types';
import { IMAGE_MOD_PRESETS } from '../../constants/imageModOptions';

export class ImageModStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, imageModParams, ratio } = context;

        if (!referenceImageBase64) {
            throw new Error("Reference image is required for Image Modification mode.");
        }

        const { selectedPreset, customPrompt } = imageModParams || { selectedPreset: 'hd_upscale' };

        // Clean base64 string
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const imagePart = {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        };

        const preset = IMAGE_MOD_PRESETS.find(p => p.id === selectedPreset);
        const basePrompt = preset ? preset.prompt : '';

        const prompt = `Task: Image Modification

    ${basePrompt}

    ${customPrompt ? `Additional Instructions: ${customPrompt}` : ''}

    Aspect Ratio: ${ratio}
    `;

        return [imagePart, { text: prompt }];
    }
}

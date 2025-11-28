import { GenerationContext, GenerationStrategy } from './types';

export class GameStyleStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, gameStyleParams, ratio } = context;

        if (!referenceImageBase64) {
            throw new Error("Reference image is required for Game Style mode.");
        }

        const { selectedStyle, keywords, customPrompt } = gameStyleParams || { selectedStyle: 'Cyberpunk', keywords: 'High-tech, neon' };

        // Clean base64 string
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const imagePart = {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        };

        const prompt = `Task: Change the style of the reference image to [${selectedStyle}], characterized by [${keywords}].
    ${customPrompt ? `Additional Details: ${customPrompt}` : ''}

    CRITICAL CONSTRAINTS:
    1. COMPOSITION PRESERVATION: You MUST preserve the original composition, pose, and placement of all elements. Do NOT change the scene layout.
    2. ELEMENT PRESERVATION: Keep all objects and elements from the original image. Only change their rendering style.
    3. IDENTITY PRESERVATION: Keep the person's facial features recognizable.
    4. STYLE ADAPTATION: Apply the ${selectedStyle} aesthetic to textures, lighting, and shading ONLY.
    5. Aspect Ratio: ${ratio}
    `;

        return [imagePart, { text: prompt }];
    }
}

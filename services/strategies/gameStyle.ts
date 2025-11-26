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

        const prompt = `Task: 把图1风格转换为[${selectedStyle}],特点是[${keywords}]
    ${customPrompt ? `Additional Details: ${customPrompt}` : ''}

    Instructions:
    1. Keep the person's facial features recognizable.
    2. Adapt their clothing and appearance to fit the ${selectedStyle} aesthetic.
    3. Generate a background consistent with the game style.
    4. Maintain high quality and artistic coherence.
    5. Aspect Ratio: ${ratio}
    `;

        return [imagePart, { text: prompt }];
    }
}

import { GenerationContext, GenerationStrategy } from './types';

export class FreeModeStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, freeModeParams, ratio } = context;

        if (!freeModeParams) {
            throw new Error("Free Mode params are missing.");
        }

        const { images, prompt: userPrompt } = freeModeParams;

        // Clean base64 strings
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const parts: any[] = [];
        let imageIndexDescription = "";
        let currentImageIndex = 0;

        // 1. Add Reference Face if present
        if (referenceImageBase64) {
            parts.push({
                inlineData: {
                    mimeType: 'image/png',
                    data: cleanBase64(referenceImageBase64),
                },
            });
            imageIndexDescription += `Image ${currentImageIndex + 1}: [Reference Face] (Primary Subject/Identity)\n`;
            currentImageIndex++;
        }

        // 2. Add Free Mode Reference Images
        if (images && images.length > 0) {
            images.forEach((img: string, idx: number) => {
                parts.push({
                    inlineData: {
                        mimeType: 'image/png',
                        data: cleanBase64(img),
                    },
                });
                // In UI, these are labeled Image 1, Image 2...
                // But in the sequence sent to Gemini, they follow the Reference Face.
                // To avoid confusion, we map them explicitly.
                imageIndexDescription += `Image ${currentImageIndex + 1}: [Image ${idx + 1}] (From User Upload)\n`;
                currentImageIndex++;
            });
        }

        if (parts.length === 0) {
            throw new Error("Free Mode requires at least one image (Reference Face or Reference Image).");
        }

        // 3. Construct Prompt
        const fullPrompt = `
Task: Creative Image Generation based on multiple reference images.

Input Images Mapping:
${imageIndexDescription}

User Instructions:
${userPrompt}

General Constraints:
1. Follow the User Instructions strictly regarding which image to use for what (face, style, pose, etc.).
2. If the user refers to "[Reference Face]", use the identity from the first image labeled [Reference Face].
3. If the user refers to "[Image N]", use the image labeled [Image N] above.
4. High quality, detailed generation.
5. Aspect Ratio: ${ratio}
`;

        parts.push({ text: fullPrompt });

        return parts;
    }
}

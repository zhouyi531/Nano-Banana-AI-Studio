import { GenerationContext, GenerationStrategy } from './types';

export class GroupPhotoStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { groupPhotoParams, ratio } = context;

        if (!groupPhotoParams || !groupPhotoParams.images || groupPhotoParams.images.length === 0) {
            throw new Error("Group Photo mode requires at least one image.");
        }

        const { images, selectedPreset, customPrompt } = groupPhotoParams;

        // Clean base64 strings
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const imageParts = images.map(img => ({
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(img),
            },
        }));

        let prompt = `Task: Generate a realistic group photo using the provided ${images.length} reference images.
    
    Scenario: ${selectedPreset}
    ${customPrompt ? `Additional Details: ${customPrompt}` : ''}
    
    Instructions:
    1. Identify the person in each reference image.
    2. Generate a single cohesive group photo containing ALL these people.
    3. Ensure they are interacting naturally according to the scenario.
    4. Maintain facial likeness for each person as much as possible.
    5. The style should be high-quality photography.
    6. Aspect Ratio: ${ratio}
    `;

        return [...imageParts, { text: prompt }];
    }
}

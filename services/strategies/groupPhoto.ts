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

        let prompt = `Task: Create a realistic group photo featuring EXACTLY the ${images.length} people shown in the attached reference images.

    Input: You have received ${images.length} reference images. Each image represents one person who MUST appear in the final group photo.

    Setting/Background: ${selectedPreset}
    ${customPrompt ? `Additional Context: ${customPrompt}` : ''}

    CRITICAL REQUIREMENTS:
    1.  **Identity Preservation**: The faces in the generated group photo MUST be recognizable as the specific individuals from the reference images. Do not generate random faces.
    2.  **Inclusion**: ALL ${images.length} people from the reference images must be present.
    3.  **Exclusivity**: Do NOT add any extra people. The group should consist ONLY of the individuals provided.
    4.  **Natural Interaction**: Arrange the people naturally within the specified setting (e.g., standing together, sitting, talking) as appropriate for the background.
    5.  **Visual Consistency**: Ensure consistent lighting and style across all subjects to make the group photo look cohesive and realistic.

    Strict Rules for Identity:
    - Do not change facial features, bone structure, or skin tone.
    - Maintain the age and gender of each person exactly as seen in their reference image.

    Output Specification:
    - Style: High-quality, photorealistic group photography.
    - Aspect Ratio: ${ratio}
    `;

        return [...imageParts, { text: prompt }];
    }
}

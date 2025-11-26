import { GenerationContext, GenerationStrategy } from './types';

export class CharacterEditStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, characterEditParams } = context;

        if (!referenceImageBase64) {
            throw new Error("Reference image is required for Character Edit mode.");
        }

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        };

        const { expression, hairstyle, skinTone, pose, clothing, props } = characterEditParams || {
            expression: '',
            hairstyle: '',
            skinTone: '',
            pose: '',
            clothing: '',
            props: ''
        };

        const editPrompt = `
      Task: Character Editing with Strict Identity Preservation.
      
      Base Image: The attached image is the SOURCE.
      
      Goal: Modify specific attributes (Expression, Hairstyle, Pose, etc.) while keeping the character's identity and core features EXACTLY the same.
      
      Strict Rules:
      1. Use the attached woman as the base image.
      2. Do not change her facial features, bone structure, makeup style, skin tone (unless specified), lighting direction, clothing (unless specified), background, or overall photorealistic beauty.
      3. Apply the following changes:
      
      ${expression ? `Expression:\n- ${expression}` : ''}
      ${hairstyle ? `Hairstyle:\n- ${hairstyle}\n- IMPORTANT: keep the original hair color, shade, highlight pattern, and texture EXACTLY as in the base image (unless the new style requires a change, but prefer keeping texture).` : ''}
      ${skinTone ? `Skin Tone/Complexion:\n- ${skinTone}` : ''}
      ${pose ? `Pose:\n- ${pose}` : ''}
      ${clothing ? `Clothing:\n- ${clothing}` : ''}
      ${props ? `Props/Accessories:\n- ${props}` : ''}
      
      4. If an attribute is NOT specified above, keep it EXACTLY as it is in the original image.
      5. Output must be high-definition, photorealistic, and free of noise or artifacts.
      6. Absolutely NO sweat, NO moisture, NO droplets, NO wet highlights unless explicitly requested.
    `;

        console.log('Generated Character Edit Prompt:', editPrompt);

        return [refImagePart, { text: editPrompt }];
    }
}

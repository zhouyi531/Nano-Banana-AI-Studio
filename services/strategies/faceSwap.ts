import { GenerationContext, GenerationStrategy } from './types';

export class FaceSwapStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { targetImageBase64, referenceImageBase64, faceDescription } = context;

        if (!targetImageBase64) {
            throw new Error("Target image is required for Face Swap mode.");
        }

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const targetImagePart = {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(targetImageBase64),
            },
        };

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Order matters for "Edit" tasks:
        // 1. The Image to be modified (Target Scene)
        // 2. The Reference Image (Source of Face)
        const parts: any[] = [targetImagePart, refImagePart];

        const targetFaceDesc = faceDescription ? faceDescription : "the main person";

        // A direct, command-style prompt works best for editing
        const faceSwapPrompt = `
      Operation: Face Swap & Enhancement.
      
      The first image is the TARGET SCENE.
      The second image is the SOURCE IDENTITY.
      
      Instruction:
      Replace the face of ${targetFaceDesc} in the first image with the facial identity of the person shown in the second image.
      Simultaneously improve the image quality: enhance resolution, correct lighting and color balance, and fix artifacts/flaws.
      
      Strict Rules:
      1. CRITICAL: The facial identity MUST match the SOURCE IDENTITY exactly.
      2. Identity Preservation: Use the attached woman (Source Identity) as the base image for the face. Do not change her facial features, bone structure, makeup style, skin tone, lighting direction, clothing, background, or overall photorealistic beauty (Note: 'clothing, background' refers to the source image's style if applicable, but primarily preserve the face details. For the final output, blend this face into the Target Scene).
      3. ASPECT RATIO: The output image MUST have the EXACT SAME aspect ratio as the TARGET SCENE (first image). Do not crop or resize the canvas.
      4. RESOLUTION: Generate a high-resolution image with the long edge approximately 2048px.
      5. Keep the first image's composition, pose, and clothing EXACTLY as they are (except for the face swap).
      6. Seamlessly blend the new face with the target environment's lighting and skin tone.
      7. Output must be high-definition, photorealistic, and free of noise or artifacts.
    `;

        console.log('Generated Face Swap Prompt:', faceSwapPrompt);

        parts.push({ text: faceSwapPrompt });
        return parts;
    }
}

import { GenerationContext, GenerationStrategy } from './types';
import { BEAUTY_OPTIONS } from '../../constants/beautyOptions';

export class BeautyStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, beautyParams } = context;
        const { selectedOptions } = beautyParams || { selectedOptions: [] };

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        // Collect selected prompts
        const selectedPrompts = selectedOptions.map(id => {
            const option = BEAUTY_OPTIONS.find(opt => opt.id === id);
            return option ? option.prompt : '';
        }).filter(p => p !== '');

        // Remove duplicates if any (though IDs should be unique)
        const uniquePrompts = [...new Set(selectedPrompts)];

        const beautyPrompt = `
      Task: Portrait Beauty Retouching - Enhance the subject based on the instructions below.
      
      Constraints:
      1. IDENTITY CONSISTENCY: You MUST preserve the facial features, identity, and likeness of the person in the reference image. The generated face must look exactly like the person provided.
      2. NATURAL LOOK: The result should look like a high-end camera shot with natural lighting. Avoid plastic or over-smoothed skin unless specified.
      3. RESOLUTION: High resolution, extremely detailed, long edge approx 2048px quality.
      
      Retouching Instructions:
      ${uniquePrompts.length > 0 ? uniquePrompts.map((p, index) => `${index + 1}. ${p}`).join('\n') : 'Apply general beauty enhancement: clear skin, bright eyes, natural lighting.'}
      
      Ensure the lighting and composition matches the requested style while keeping the subject's identity intact.
    `;

        return [refImagePart, { text: beautyPrompt }].filter(part => part !== null);
    }
}

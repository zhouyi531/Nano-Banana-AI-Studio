import { GenerationContext, GenerationStrategy } from './types';

export class PoseTransferStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, poseParams, ratio } = context;
        const poseReferenceImage = poseParams?.poseReferenceImage;

        const prompt = `让[Image 1]的角色模仿 [Image 2]的动作。
        
Technical Specs:
Aspect Ratio: ${ratio}.
`;

        const parts: any[] = [{ text: prompt }];

        // Image 1: Character Reference
        if (referenceImageBase64) {
            let mimeType = "image/png";
            let data = referenceImageBase64;

            if (referenceImageBase64.includes('data:')) {
                const matches = referenceImageBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
                if (matches && matches.length === 3) {
                    mimeType = matches[1];
                    data = matches[2];
                } else {
                    data = referenceImageBase64.split(',')[1] || referenceImageBase64;
                }
            }

            parts.push({
                inlineData: {
                    mimeType: mimeType,
                    data: data
                }
            });
        }

        // Image 2: Pose Reference
        if (poseReferenceImage) {
            let mimeType = "image/png";
            let data = poseReferenceImage;

            if (poseReferenceImage.includes('data:')) {
                const matches = poseReferenceImage.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
                if (matches && matches.length === 3) {
                    mimeType = matches[1];
                    data = matches[2];
                } else {
                    data = poseReferenceImage.split(',')[1] || poseReferenceImage;
                }
            }

            parts.push({
                inlineData: {
                    mimeType: mimeType,
                    data: data
                }
            });
        }

        return parts;
    }
}

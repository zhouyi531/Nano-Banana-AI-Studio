import { GenerationContext, GenerationStrategy } from './types';
import { GoogleGenAI, Modality } from "@google/genai";

declare const process: any;

export class StyleCopyStrategy implements GenerationStrategy {
    private getClient() {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY;
        if (!apiKey) {
            throw new Error("Missing API Key for Style Analysis");
        }
        return new GoogleGenAI({ apiKey });
    }

    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, styleCopyParams, ratio } = context;

        if (!styleCopyParams) {
            throw new Error("Style Copy mode requires style parameters.");
        }

        const { styleImage, styleJSON } = styleCopyParams;
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        let analysisText = styleJSON;

        // If no JSON provided, analyze the image (fallback)
        if (!analysisText) {
            if (!styleImage) {
                throw new Error("Style Copy mode requires either a style reference image or a style preset.");
            }

            // Step 1: Analyze Style Image using Gemini 1.5 Flash (fast and good for VQA)
            const ai = this.getClient();

            console.log("[StyleCopy] Analyzing style image...");

            try {
                const analysisResponse = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: {
                        parts: [
                            {
                                inlineData: {
                                    mimeType: 'image/png',
                                    data: cleanBase64(styleImage)
                                }
                            },
                            {
                                text: "给我json类型的结构化提示词. Analyze this image and provide a structured JSON description of the style, lighting, colors, composition, and mood. Return ONLY the JSON."
                            }
                        ]
                    },
                    config: {
                        responseModalities: [Modality.TEXT]
                    }
                });

                analysisText = analysisResponse.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!analysisText) {
                    throw new Error("Failed to analyze style image. No text returned.");
                }

                console.log("[StyleCopy] Analysis result:", analysisText);

            } catch (e: any) {
                console.error("[StyleCopy] Error analyzing style:", e);
                if (e.response) {
                    console.error("[StyleCopy] Error response:", JSON.stringify(e.response, null, 2));
                }
                if (e.message) {
                    console.error("[StyleCopy] Error message:", e.message);
                }
                throw new Error(`Failed to analyze style image: ${e.message || "Unknown error"}`);
            }
        } else {
            console.log("[StyleCopy] Using provided style JSON.");
        }

        // Step 2: Construct final prompt with Reference Face + Style Description
        let styleObj;
        try {
            // Remove markdown code blocks if present
            const cleanJson = analysisText.replace(/```json\n?|\n?```/g, '').trim();
            styleObj = JSON.parse(cleanJson);
        } catch (e) {
            console.warn("Failed to parse style JSON, using raw text", e);
            styleObj = { description: analysisText };
        }

        const promptStructure = {
            face: "image1",
            style: styleObj,
            instructions: {
                identity: "Preserve the identity of the person in image1 exactly.",
                application: "Apply the style defined in the 'style' object to the generated portrait.",
                aspectRatio: ratio,
                quality: "High quality, detailed, photorealistic"
            }
        };

        const prompt = `
Task: Generate a portrait based on the following structured request.
Reference Image 1 is provided.

Request:
${JSON.stringify(promptStructure, null, 2)}
`;

        const parts = [
            {
                inlineData: {
                    mimeType: 'image/png',
                    data: cleanBase64(referenceImageBase64)
                }
            },
            { text: prompt }
        ];

        return parts;
    }
}

import { GoogleGenAI, Modality } from "@google/genai";
import { AspectRatio, AppMode } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generatePortrait = async (
  referenceImageBase64: string,
  prompt: string,
  ratio: AspectRatio,
  mode: AppMode = 'portrait',
  targetImageBase64?: string,
  faceDescription?: string
): Promise<string> => {
  const ai = getClient();

  // Clean the base64 string if it has the data prefix
  const cleanBase64 = (str: string) => str.split(',')[1] || str;
  
  const refImagePart = {
    inlineData: {
      mimeType: 'image/png',
      data: cleanBase64(referenceImageBase64),
    },
  };

  let parts: any[] = [];

  if (mode === 'faceswap') {
    if (!targetImageBase64) {
      throw new Error("Target image is required for Face Swap mode.");
    }

    const targetImagePart = {
      inlineData: {
        mimeType: 'image/png',
        data: cleanBase64(targetImageBase64),
      },
    };

    // Order matters for "Edit" tasks:
    // 1. The Image to be modified (Target Scene)
    // 2. The Reference Image (Source of Face)
    parts = [targetImagePart, refImagePart];
    
    const targetFaceDesc = faceDescription ? faceDescription : "the main person";

    // A direct, command-style prompt works best for editing
    const faceSwapPrompt = `
      Operation: Face Swap.
      
      The first image is the TARGET SCENE.
      The second image is the SOURCE IDENTITY.
      
      Instruction:
      Replace the face of ${targetFaceDesc} in the first image with the facial identity of the person shown in the second image.
      
      Strict Rules:
      1. Keep the first image's composition, background, lighting, pose, and clothing EXACTLY as they are.
      2. ONLY change the face to match the person in the second image.
      3. Match the skin tone and lighting of the new face to the first image's environment seamlessly.
      4. Output must be a high-quality, photorealistic image.
    `;

    parts.push({ text: faceSwapPrompt });

  } else {
    // Portrait Mode
    const portraitPrompt = `
      Task: Generate a high-quality, photorealistic portrait based on the attached reference image.
      
      Constraints:
      1. IDENTITY CONSISTENCY: You MUST preserve the facial features, identity, and likeness of the person in the reference image. The generated face must look exactly like the person provided.
      2. ASPECT RATIO: The output image MUST have an aspect ratio of ${ratio}.
      3. RESOLUTION: High resolution, extremely detailed, long edge approx 2048px quality.
      
      Style & Scene Description:
      ${prompt}
      
      Ensure the lighting and composition matches the requested style while keeping the subject's identity intact.
    `;

    parts = [refImagePart, { text: portraitPrompt }];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const resultParts = response.candidates?.[0]?.content?.parts;
    if (!resultParts || resultParts.length === 0) {
      throw new Error("No image generated.");
    }

    // Handle the image response
    for (const part of resultParts) {
      if (part.inlineData) {
        const base64ImageBytes = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }

    throw new Error("Unexpected response format: No inline image data found.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate image");
  }
};

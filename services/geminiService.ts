import { GoogleGenAI, Modality } from "@google/genai";
import { AspectRatio, AppMode, GroupPhotoParams } from "../types";
import { GenerationContext, GenerationStrategy } from "./strategies/types";
import { FaceSwapStrategy } from "./strategies/faceSwap";
import { StyleTransferStrategy } from "./strategies/styleTransfer";
import { FashionStrategy } from "./strategies/fashion";
import { AgeTransformStrategy } from "./strategies/ageTransform";
import { HairstyleStrategy } from "./strategies/hairstyle";
import { TattooStrategy } from "./strategies/tattoo";
import { PhotographyStrategy } from "./strategies/photography";
import { SceneGenStrategy } from "./strategies/sceneGen";
import { PortraitStrategy } from "./strategies/portrait";
import { HanfuStrategy } from "./strategies/hanfu";
import { TravelStrategy } from "./strategies/travel";
import { TriptychStrategy } from "./strategies/triptych";
import { PetMerchStrategy } from "./strategies/petMerch";
import { ProductFoodStrategy } from "./strategies/productFood";
import { FigureStrategy } from "./strategies/figure";
import { BeautyStrategy } from "./strategies/beauty";
import { GroupPhotoStrategy } from "./strategies/groupPhoto";

declare const process: any;

const getClient = () => {
  console.log('[DEBUG] API Key Check:');
  console.log('  import.meta.env.VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY ? 'EXISTS' : 'UNDEFINED');
  console.log('  process.env.GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'EXISTS' : 'UNDEFINED');
  console.log('  process.env.API_KEY:', process.env.API_KEY ? 'EXISTS' : 'UNDEFINED');

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY;

  if (!apiKey) {
    console.error("Missing API Key. Checked: VITE_GEMINI_API_KEY, GEMINI_API_KEY, API_KEY");
    console.error("All import.meta.env:", import.meta.env);
    throw new Error("GEMINI_API_KEY is not defined in environment variables. Please check your .env file.");
  }

  console.log('[DEBUG] Using API key from:',
    import.meta.env.VITE_GEMINI_API_KEY ? 'VITE_GEMINI_API_KEY' :
      process.env.GEMINI_API_KEY ? 'GEMINI_API_KEY' : 'API_KEY');

  return new GoogleGenAI({ apiKey });
};

// Strategy Registry
const strategies: Record<string, GenerationStrategy> = {
  'portrait': new PortraitStrategy(),
  'faceswap': new FaceSwapStrategy(),
  'style_transfer': new StyleTransferStrategy(),
  'fashion': new FashionStrategy(),
  'age_transform': new AgeTransformStrategy(),
  'hairstyle': new HairstyleStrategy(),
  'tattoo': new TattooStrategy(),
  'photography': new PhotographyStrategy(),
  'scene_gen': new SceneGenStrategy(),
  'hanfu': new HanfuStrategy(),
  'travel': new TravelStrategy(),
  'triptych': new TriptychStrategy(),
  'pet_merch': new PetMerchStrategy(),
  'product_food': new ProductFoodStrategy(),
  'figure': new FigureStrategy(),
  'beauty': new BeautyStrategy(),
  'group_photo': new GroupPhotoStrategy(),
  // Map undefined modes to PortraitStrategy for now (replicating original behavior)
  'free_mode': new PortraitStrategy(),
  'pose_transfer': new PortraitStrategy(),
};

export const generatePortrait = async (
  referenceImageBase64: string,
  prompt: string,
  ratio: AspectRatio,
  mode: AppMode = 'portrait',
  targetImageBase64?: string,
  faceDescription?: string,
  model: string = 'gemini-2.5-flash-image',
  styleDirection?: 'photo_to_cartoon' | 'cartoon_to_photo',
  cartoonStyle?: string,
  ethnicity?: string,
  fashionParams?: any,
  ageParams?: any,
  hairstyleParams?: any,
  tattooParams?: any,
  photographyParams?: any,
  poseParams?: any,
  sceneGenParams?: any,
  freeModeParams?: any,
  hanfuParams?: any,
  travelParams?: any,
  triptychParams?: any,
  petMerchParams?: any,
  productFoodParams?: any,
  figureParams?: any,
  beautyParams?: any,
  groupPhotoParams?: GroupPhotoParams
): Promise<string> => {
  const ai = getClient();

  const strategy = strategies[mode] || strategies['portrait'];

  const context: GenerationContext = {
    referenceImageBase64,
    prompt,
    ratio,
    targetImageBase64,
    faceDescription,
    styleDirection,
    cartoonStyle,
    ethnicity,
    fashionParams,
    ageParams,
    hairstyleParams,
    tattooParams,
    photographyParams,
    poseParams,
    sceneGenParams,
    freeModeParams,
    hanfuParams,
    travelParams,
    triptychParams,
    petMerchParams,
    productFoodParams,
    figureParams,
    beautyParams,
    groupPhotoParams
  };

  try {
    const parts = await strategy.buildParts(context);

    // Map our aspect ratio format to Gemini API format
    const aspectRatioMap: Record<string, string> = {
      '3:4': '3:4',
      '4:3': '4:3',
      '1:1': '1:1',
      '9:16': '9:16',
      '16:9': '16:9'
    };

    const isFlashImage = model === 'gemini-2.5-flash-image';

    const config: any = {
      responseModalities: isFlashImage ? [Modality.IMAGE] : [Modality.TEXT, Modality.IMAGE],
      imageConfig: {
        aspectRatio: aspectRatioMap[ratio] || '1:1',
      },
    };

    if (!isFlashImage) {
      config.thinkingConfig = {
        includeThoughts: true
      };

      // For Pro model, set image size from env or default to 2K
      if (model === 'gemini-3-pro-image-preview') {
        const imageSize = import.meta.env.VITE_GEMINI_IMAGE_SIZE || '2K';
        config.imageConfig.imageSize = imageSize;
      }
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts },
      config: config,
    });

    const resultParts = response.candidates?.[0]?.content?.parts;
    if (!resultParts || resultParts.length === 0) {
      throw new Error("No image generated.");
    }

    // Handle the response
    for (const part of resultParts) {
      if (part.text) {
        console.log(`[Nano Banana Thought]: ${part.text}`);
      }
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

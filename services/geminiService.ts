import { GoogleGenAI, Modality } from "@google/genai";
import { AspectRatio, AppMode, GroupPhotoParams, CharacterEditParams, GameStyleParams, ImageModParams, DoodleBombingParams, OOTDParams, LiteracyCardParams, CharacterDesignParams } from "../types";
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
import { GroupPhotoStrategy } from "./strategies/groupPhoto";
import { FreeModeStrategy } from "./strategies/freeMode";
import { StyleCopyStrategy } from "./strategies/styleCopy";
import { CharacterEditStrategy } from "./strategies/characterEdit";
import { GameStyleStrategy } from "./strategies/gameStyle";
import { ImageModStrategy } from "./strategies/imageMod";
import { DragonBallStrategy } from "./strategies/dragonBallStrategy";
import { ObjectDecompositionStrategy } from "./strategies/objectDecompositionStrategy";
import { TriptychStrategy } from "./strategies/triptych";
import { PetMerchStrategy } from "./strategies/petMerch";
import { ProductFoodStrategy } from "./strategies/productFood";
import { FigureStrategy } from "./strategies/figure";
import { BeautyStrategy } from "./strategies/beauty";
import { DoodleBombingStrategy } from "./strategies/doodleBombingStrategy";
import { OOTDStrategy } from "./strategies/ootdStrategy";
import { LiteracyCardStrategy } from "./strategies/literacyCardStrategy";
import { CharacterDesignStrategy } from "./strategies/characterDesignStrategy";
import { PoseTransferStrategy } from "./strategies/poseTransferStrategy";

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
  'free_mode': new FreeModeStrategy(),
  'style_copy': new StyleCopyStrategy(),
  'character_edit': new CharacterEditStrategy(),
  'game_style': new GameStyleStrategy(),
  'image_modification': new ImageModStrategy(),
  'dragon_ball': new DragonBallStrategy(),
  'object_decomposition': new ObjectDecompositionStrategy(),
  'doodle_bombing': new DoodleBombingStrategy(),
  'ootd': new OOTDStrategy(),
  'literacy_card': new LiteracyCardStrategy(),
  'character_design': new CharacterDesignStrategy(),
  'pose_transfer': new PoseTransferStrategy(),
};

export const generatePortrait = async (
  referenceImageBase64: string,
  prompt: string,
  ratio: AspectRatio,
  mode: AppMode = 'portrait',
  targetImageBase64?: string,
  faceDescription?: string,
  model: string = 'gemini-2.0-flash-exp',
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
  groupPhotoParams?: GroupPhotoParams,
  styleCopyParams?: any,
  characterEditParams?: CharacterEditParams,
  gameStyleParams?: GameStyleParams,
  imageModParams?: ImageModParams,
  dragonBallParams?: any,
  objectDecompositionParams?: any,
  doodleBombingParams?: DoodleBombingParams,
  ootdParams?: OOTDParams,
  literacyCardParams?: LiteracyCardParams,
  characterDesignParams?: CharacterDesignParams
): Promise<string> => {
  const client = getClient();

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
    groupPhotoParams,
    styleCopyParams,
    characterEditParams,
    gameStyleParams,
    imageModParams,
    dragonBallParams,
    objectDecompositionParams,
    doodleBombingParams,
    ootdParams,
    literacyCardParams,
    characterDesignParams
  };

  const strategy = strategies[mode];
  if (!strategy) {
    throw new Error(`Strategy not implemented for mode: ${mode}`);
  }

  try {
    const parts = await strategy.buildParts(context);

    console.log(`[DEBUG] Generating with model: ${model} for mode: ${mode}`);

    const response = await client.models.generateContent({
      model: model,
      contents: [
        {
          parts: parts
        }
      ],
      config: {
        responseModalities: [Modality.IMAGE],
        safetySettings: [
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
        ],
      }
    });

    const generatedImage = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!generatedImage) {
      throw new Error("No image generated");
    }

    return generatedImage;
  } catch (error: any) {
    console.error("Error generating portrait:", error);
    throw new Error(`Failed to generate portrait: ${error.message || "Unknown error"}`);
  }
};

export const analyzeStyle = async (image: string): Promise<string> => {
  const client = getClient();
  const cleanBase64 = (str: string) => str.split(',')[1] || str;

  try {
    const analysisResponse = await client.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(image)
              }
            },
            {
              text: "给我json类型的结构化提示词. Analyze this image and provide a structured JSON description of the style, lighting, colors, composition, and mood. Return ONLY the JSON."
            }
          ]
        }
      ],
      config: {
        responseModalities: [Modality.TEXT]
      }
    });

    const analysisText = analysisResponse.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!analysisText) {
      throw new Error("Failed to analyze style image. No text returned.");
    }

    return analysisText;
  } catch (error: any) {
    console.error("Error analyzing style:", error);
    throw new Error(`Failed to analyze style: ${error.message || "Unknown error"}`);
  }
};

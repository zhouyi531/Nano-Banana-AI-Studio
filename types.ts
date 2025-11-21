export enum AspectRatio {
  Ratio_3_4 = '3:4',
  Ratio_4_3 = '4:3',
  Ratio_1_1 = '1:1',
  Ratio_9_16 = '9:16',
  Ratio_16_9 = '16:9',
}

export type AppMode = 'portrait' | 'faceswap' | 'style_transfer' | 'fashion' | 'age_transform' | 'hairstyle' | 'tattoo';

export interface FashionParams {
  glasses: string;
  hairstyle: string;
  hat: string;
  clothing: string;
  shoes: string;
}

export interface AgeTransformParams {
  targetAge: number;
}

export interface HairstyleParams {
  hairstyle: string;
}

export interface TattooParams {
  position: string;
  design: string;
  customDesign?: string;
}

export interface PresetScenario {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
  thumbnailUrl: string;
}

export interface GenerationRequest {
  referenceImageBase64: string;
  targetImageBase64?: string;
  prompt: string;
  aspectRatio: AspectRatio;
  mode: AppMode;
}

export interface GenerationResponse {
  imageUrl: string | null;
  error?: string;
}

export interface HistoryItem {
  id: string;
  imageUrl: string;
  prompt: string;
  timestamp: number;
  mode: AppMode;
  referenceImage?: string;
  targetImage?: string;
  aspectRatio?: AspectRatio;
}
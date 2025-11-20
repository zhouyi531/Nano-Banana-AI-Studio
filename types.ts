export enum AspectRatio {
  Ratio_3_4 = '3:4',
  Ratio_4_3 = '4:3',
  Ratio_1_1 = '1:1',
  Ratio_9_16 = '9:16',
  Ratio_16_9 = '16:9',
}

export type AppMode = 'portrait' | 'faceswap';

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
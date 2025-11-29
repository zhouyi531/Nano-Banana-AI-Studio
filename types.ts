export type AppMode =
  | 'portrait'
  | 'faceswap'
  | 'style_transfer'
  | 'fashion'
  | 'age_transform'
  | 'hairstyle'
  | 'tattoo'
  | 'photography'
  | 'pose_transfer'
  | 'scene_gen'
  | 'free_mode'
  | 'hanfu'
  | 'travel'
  | 'triptych'
  | 'pet_merch'
  | 'product_food'
  | 'figure'
  | 'beauty'
  | 'group_photo'
  | 'style_copy'
  | 'character_edit'
  | 'game_style'
  | 'dragon_ball'
  | 'object_decomposition'
  | 'doodle_bombing'
  | 'ootd'
  | 'literacy_card'
  | 'character_design'
  | 'city_guide';

export enum AspectRatio {
  Ratio_1_1 = '1:1',
  Ratio_3_4 = '3:4',
  Ratio_4_3 = '4:3',
  Ratio_9_16 = '9:16',
  Ratio_16_9 = '16:9'
}

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

export interface PhotographyParams {
  generationMode: 'image-to-image' | 'text-to-image';
  backgroundImage?: string;
  subject: string;
  location: string;
  expression: string;
  action: string;
  background: string;
  atmosphere: string;
  weather: string;
  lighting: string;
  aperture: string;
  focalLength: string;
  iso: string;
  shutterSpeed: string;
  lensType: string;
}

export interface PoseParams {
  poseReferenceImage?: string;
  selectedPreset?: string;
}

export interface SceneGenParams {
  // Character
  referenceImage?: string;
  characterAge: number;
  characterType: string;
  ethnicity: string;
  eyeSize: string;
  skinTone: string;
  expression: string;
  gazeDirection: string;

  // Pose & Action
  bodyPose: string;
  bodyOrientation: string;
  headDirection: string;
  action: string;

  // Clothing
  topType: string;
  topColor: string;
  topStyle: string;
  bottomType: string;
  bottomStyle: string;
  shoesType: string;
  shoesColor: string;

  // Scene
  locationType: string;
  surface: string;
  props: string[];

  // Camera & Style
  cameraAngle: string;
  shotType: string;
  photoStyle: string;
  quality: string;

  // Lighting
  lightingType: string;
  timeOfDay: string;
  weather: string;
  atmosphere: string;

  selectedTemplateId?: string;
}

export interface FreeModeParams {
  images: string[];
  prompt: string;
}

export interface GroupPhotoParams {
  images: string[];
  selectedPreset: string;
  customPrompt?: string;
}

export interface HanfuParams {
  description: string;
  imagePrompt: string;
}

export interface MakeupOption {
  id: string;
  name: string;
  description: string;
  promptDetail: string;
}

export interface AccessoryOption {
  id: string;
  name: string;
  description: string;
  promptDetail: string;
}

export interface HanfuBackgroundOption {
  id: string;
  name: string;
  description: string;
  promptDetail: string;
}

export interface CharacterPreset {
  id: string;
  displayName: string;    // 显示给用户
  promptName: string;      // 在prompt中使用（含定语）
  ethnicity: string;
  ageGroup: string;
  gender: string;
}

export interface PresetScenario {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
  thumbnailUrl: string;
}

export interface GameStyleParams {
  selectedStyle: string;
  keywords: string;
  customPrompt?: string;
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

export interface TravelParams {
  country: string;
  season: string;
  festival: string;
  landmark: string;
  timeOfDay: string;
  cameraPosition: string;
  lens: string;
  pitchAngle: string;
  shotType: string;
}

export interface TriptychParams {
  selectedPreset: string;
  customPrompt?: string;
}

export interface BeautyParams {
  selectedOptions: string[];
}

export interface PetMerchParams {
  selectedPreset: string;
}

export interface ProductFoodParams {
  selectedPreset: string;
}

export interface FigureParams {
  selectedPreset: string;
  prompt: string;
}

export interface DragonBallParams {
  characterId?: string;
  customPrompt?: string;
}

export interface ObjectDecompositionParams {
  objectName: string;
}

export interface StyleCopyParams {
  styleImage: string;
  styleJSON?: string;
}

export interface StylePreset {
  id: string;
  name: string;
  data: string;
  timestamp: number;
}

export interface CharacterEditParams {
  expression: string;
  hairstyle: string;
  skinTone: string;
  pose: string;
  clothing: string;
  props: string;
  design?: string;
  customDesign?: string;
}

export interface ImageModParams {
  selectedPreset: string;
  customPrompt?: string;
}

export interface DoodleBombingParams {
  doodleStyle: string;
  background: string;
  expression: string;
  bodyPose: string;
  timeOfDay: string;
}

export interface OOTDParams {
  selectedStyle: string;
  clothing?: string;
  location?: string;
  doll?: string;
  timeOfDay?: string;
}

export interface LiteracyCardParams {
  theme: string;
}

export interface CharacterDesignParams {
  customPrompt?: string;
}

export interface CityGuideParams {
  customPrompt?: string;
}
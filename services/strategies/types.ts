import { AspectRatio } from '../../types';

export interface GenerationContext {
    referenceImageBase64: string;
    prompt: string;
    ratio: AspectRatio;
    targetImageBase64?: string;
    faceDescription?: string;

    // Mode-specific params
    styleDirection?: 'photo_to_cartoon' | 'cartoon_to_photo';
    cartoonStyle?: string;
    ethnicity?: string;
    fashionParams?: any;
    ageParams?: any;
    hairstyleParams?: any;
    tattooParams?: any;
    photographyParams?: any;
    poseParams?: any;
    sceneGenParams?: any;
    hanfuParams?: any;
    freeModeParams?: any;
    travelParams?: any;
    triptychParams?: any;
    petMerchParams?: any;
    productFoodParams?: any;
    figureParams?: any;
    beautyParams?: any;
    groupPhotoParams?: any;
    styleCopyParams?: any;
}

export interface GenerationStrategy {
    buildParts(context: GenerationContext): Promise<any[]>;
}

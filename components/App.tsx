import React, { useState, useEffect } from 'react';
import { ImageUploader } from './ImageUploader';
import { PresetSelector } from './PresetSelector';
import { HistoryGallery } from './HistoryGallery';
import { generatePortrait } from '../services/geminiService';
import { TravelControls } from './TravelControls';
import { TriptychControls } from './TriptychControls';
import { PetMerchControls } from './PetMerchControls';
import { ProductFoodControls } from './ProductFoodControls';
import { FigureControls } from './FigureControls';
import { BeautyControls } from './BeautyControls';
import { ImageModControls } from './ImageModControls';
import { DEFAULT_IMAGE_MOD_PARAMS } from '../constants/imageModOptions';
import { PRESETS } from '../constants';
import {
  AppMode,
  AspectRatio,
  PresetScenario,
  HistoryItem,
  FashionParams,
  AgeTransformParams,
  HairstyleParams,
  TattooParams,
  PhotographyParams,
  PoseParams,
  SceneGenParams,
  FreeModeParams,
  HanfuParams,
  TravelParams,
  TriptychParams,
  PetMerchParams,
  ProductFoodParams,
  FigureParams,
  BeautyParams,
  GroupPhotoParams,
  StyleCopyParams,
  CharacterEditParams,
  GameStyleParams,
  ImageModParams,
  DragonBallParams,
  DoodleBombingParams,
  OOTDParams,
  LiteracyCardParams,
  CharacterDesignParams,
  ObjectDecompositionParams
} from '../types';
import { FashionControls } from './FashionControls';
import { AgeControls } from './AgeControls';
import { HairstyleControls } from './HairstyleControls';
import { TattooControls } from './TattooControls';
import { PhotographyControls } from './PhotographyControls';
import { PoseControls } from './PoseControls';
import { SceneGenControls } from './SceneGenControls';
import { FreeModeControls } from './FreeModeControls';
import { HanfuControls } from './HanfuControls';
import { GroupPhotoControls } from './GroupPhotoControls';
import { StyleCopyControls } from './StyleCopyControls';
import { CharacterEditControls } from './CharacterEditControls';
import { GameStyleControls } from './GameStyleControls';
import { DragonBallCardControls } from './DragonBallCardControls';
import { ObjectDecompositionControls } from './ObjectDecompositionControls';
import { DoodleBombingControls } from './DoodleBombingControls';
import { OOTDControls } from './OOTDControls';
import { LiteracyCardControls } from './LiteracyCardControls';
import CharacterDesignControls from './CharacterDesignControls';
import { DRAGON_BALL_CHARACTERS } from '../constants/dragonBallData';
import { compositeDragonBallCard } from '../utils/dragonBallCompositor';
import { ASPECT_RATIOS } from '../constants';
import { DEFAULT_FIGURE_PROMPT } from '../constants/figureOptions';

import { AspectRatioSelector } from './AspectRatioSelector';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('portrait');
  const [activeTab, setActiveTab] = useState<'generator' | 'history'>('generator');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [faceDescription, setFaceDescription] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Ratio_3_4);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [selectedModel, setSelectedModel] = useState<string>('gemini-2.5-flash-image');
  const [styleDirection, setStyleDirection] = useState<'photo_to_cartoon' | 'cartoon_to_photo'>('photo_to_cartoon');
  const [cartoonStyle, setCartoonStyle] = useState<string>('3d_cartoon');
  const [ethnicity, setEthnicity] = useState<string>('east_asian');
  const [fashionParams, setFashionParams] = useState<FashionParams>({
    glasses: 'none',
    hairstyle: 'short_undercut',
    hat: 'none',
    clothing: 'business_suit',
    shoes: 'sneakers'
  });
  const [ageParams, setAgeParams] = useState<AgeTransformParams>({
    targetAge: 30
  });
  const [hairstyleParams, setHairstyleParams] = useState<HairstyleParams>({
    hairstyle: 'long_wavy'
  });
  const [tattooParams, setTattooParams] = useState<TattooParams>({
    position: 'upper_arm',
    design: 'dragon'
  });
  const [photographyParams, setPhotographyParams] = useState<PhotographyParams>({
    generationMode: 'text-to-image',
    subject: '',
    location: '',
    expression: 'Smiling',
    action: '',
    background: '',
    atmosphere: 'Peaceful',
    weather: 'Sunny',
    lighting: 'golden_hour',
    aperture: 'f2.8',
    focalLength: '50mm',
    iso: '100',
    shutterSpeed: '250',
    lensType: 'prime'
  });
  const [poseParams, setPoseParams] = useState<PoseParams>({
    poseReferenceImage: undefined,
    selectedPreset: undefined
  });
  const [sceneGenParams, setSceneGenParams] = useState<SceneGenParams>({
    characterAge: 22,
    characterType: 'young_woman',
    ethnicity: 'east_asian',
    eyeSize: 'large',
    skinTone: 'fair',
    expression: 'shy_smile',
    gazeDirection: 'at_camera',
    bodyPose: 'standing',
    bodyOrientation: 'facing_forward',
    headDirection: 'forward',
    action: 'static',
    topType: 'tshirt',
    topColor: 'white',
    topStyle: 'short_sleeve',
    bottomType: 'jeans',
    bottomStyle: 'casual',
    shoesType: 'sneakers',
    shoesColor: 'white',
    locationType: 'park',
    surface: 'grass',
    props: [],
    cameraAngle: 'eye_level',
    shotType: 'medium_shot',
    photoStyle: 'candid',
    quality: '4k',
    lightingType: 'natural',
    timeOfDay: 'afternoon',
    weather: 'sunny',
    atmosphere: 'casual'
  });

  const [freeModeParams, setFreeModeParams] = useState<FreeModeParams>({
    images: [],
    prompt: ''
  });

  const [hanfuParams, setHanfuParams] = useState<HanfuParams>({
    selectedDynasty: 'tang',
    selectedMakeup: 'natural',
    selectedAccessory: 'minimal',
    selectedBackground: 'garden'
  });

  const [travelParams, setTravelParams] = useState<TravelParams>({
    country: 'china',
    season: 'spring',
    festival: 'none',
    landmark: '',
    timeOfDay: 'afternoon',
    cameraPosition: 'eye_level',
    lens: 'standard_50mm',
    pitchAngle: 'level_0',
    shotType: 'half_body'
  });

  const [triptychParams, setTriptychParams] = useState<TriptychParams>({
    selectedPreset: 'snow_triptych'
  });

  const [petMerchParams, setPetMerchParams] = useState<PetMerchParams>({
    selectedPreset: 'pet_stamp'
  });

  const [productFoodParams, setProductFoodParams] = useState<ProductFoodParams>({
    selectedPreset: 'ultimate_rice_bowl'
  });

  const [figureParams, setFigureParams] = useState<FigureParams>({
    selectedPreset: 'scale_figure',
    prompt: DEFAULT_FIGURE_PROMPT
  });

  const [beautyParams, setBeautyParams] = useState<BeautyParams>({
    selectedOptions: []
  });
  const [groupPhotoParams, setGroupPhotoParams] = useState<GroupPhotoParams>({
    images: [],
    selectedPreset: 'office_team',
    customPrompt: ''
  });
  const [styleCopyParams, setStyleCopyParams] = useState<StyleCopyParams>({
    styleImage: ''
  });
  const [characterEditParams, setCharacterEditParams] = useState<CharacterEditParams>({
    expression: '',
    hairstyle: '',
    skinTone: '',
    pose: '',
    clothing: '',
    props: ''
  });
  const [gameStyleParams, setGameStyleParams] = useState<GameStyleParams>({
    selectedStyle: 'CYBERPUNK STYLE',
    keywords: '霓虹都市, 高科技低生活, 雨夜氛围',
    customPrompt: ''
  });
  const [imageModParams, setImageModParams] = useState<ImageModParams>(DEFAULT_IMAGE_MOD_PARAMS);
  const [dragonBallParams, setDragonBallParams] = useState<DragonBallParams>({});
  const [objectDecompositionParams, setObjectDecompositionParams] = useState<ObjectDecompositionParams>({
    objectName: ''
  });
  const [doodleBombingParams, setDoodleBombingParams] = useState<DoodleBombingParams>({
    doodleStyle: 'cute_monsters',
    background: 'graffiti_alley',
    expression: 'playful',
    bodyPose: 'standing',
    timeOfDay: 'noon'
  });
  const [ootdParams, setOOTDParams] = useState<OOTDParams>({
    selectedStyle: 'monster_twin'
  });
  const [literacyCardParams, setLiteracyCardParams] = useState<LiteracyCardParams>({
    theme: 'Animal World'
  });
  const [characterDesignParams, setCharacterDesignParams] = useState<CharacterDesignParams>({
    customPrompt: ''
  });

  // Load history from server on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/history');
      if (response.ok) {
        const data = await response.json();
        // Prepend server URL to image paths if they are relative
        const historyWithUrls = data.map((item: HistoryItem) => ({
          ...item,
          imageUrl: item.imageUrl.startsWith('http') ? item.imageUrl : `http://localhost:3001${item.imageUrl}`
        }));
        setHistory(historyWithUrls);
      } else {
        console.error("Failed to fetch history");
      }
    } catch (e) {
      console.error("Error fetching history:", e);
    }
  };

  const handlePresetSelect = (preset: PresetScenario) => {
    setSelectedPresetId(preset.id);
    setPrompt(preset.promptModifier);
  };

  const handleDeleteHistory = (id: string) => {
    // TODO: Add delete endpoint on server if needed, for now just remove from UI
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setGeneratedImage(item.imageUrl);
    setActiveTab('generator');
    // Optionally restore other settings
    setMode(item.mode);
    setPrompt(item.prompt);
    if (item.referenceImage) setReferenceImage(item.referenceImage);
    if (item.targetImage) setTargetImage(item.targetImage);
    if (item.aspectRatio) setAspectRatio(item.aspectRatio);
  };

  const handleGenerate = async () => {
    setError(null);

    if (!referenceImage && mode !== 'scene_gen' && mode !== 'free_mode' && mode !== 'travel' && mode !== 'group_photo' && mode !== 'dragon_ball' && mode !== 'object_decomposition' && mode !== 'doodle_bombing' && mode !== 'ootd' && mode !== 'literacy_card') {
      setError("Please upload a reference face.");
      return;
    }

    if (mode === 'free_mode') {
      if (freeModeParams.images.length === 0) {
        setError("Please upload at least one reference image.");
        return;
      }
      if (!freeModeParams.prompt.trim()) {
        setError("Please enter a prompt describing how to use the images.");
        return;
      }
    }

    if (mode === 'group_photo') {
      if (groupPhotoParams.images.length < 1) {
        setError("Please upload at least one person's photo.");
        return;
      }
    }

    if (mode === 'style_copy') {
      if (!styleCopyParams.styleImage) {
        setError("Please upload a style reference image.");
        return;
      }
    }

    if (mode === 'portrait') {
      if (!prompt.trim()) {
        setError("Please enter a prompt or select a style.");
        return;
      }
    } else if (mode === 'faceswap') {
      if (!targetImage) {
        setError("Please upload a target image for the face swap.");
        return;
      }
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    let currentDragonBallParams = dragonBallParams;
    if (mode === 'dragon_ball') {
      const randomChar = DRAGON_BALL_CHARACTERS[Math.floor(Math.random() * DRAGON_BALL_CHARACTERS.length)];
      currentDragonBallParams = { ...dragonBallParams, characterId: randomChar.id };
      setDragonBallParams(currentDragonBallParams);
    }

    try {
      const resultUrl = await generatePortrait(
        referenceImage,
        prompt,
        aspectRatio,
        mode,
        targetImage || undefined,
        faceDescription,
        selectedModel,
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
        mode === 'dragon_ball' ? currentDragonBallParams : dragonBallParams,
        objectDecompositionParams,
        doodleBombingParams,
        ootdParams,
        literacyCardParams,
        characterDesignParams
      );
      let finalImageUrl = resultUrl;

      // For Dragon Ball mode, composite the card with UI elements
      if (mode === 'dragon_ball' && currentDragonBallParams.characterId) {
        const char = DRAGON_BALL_CHARACTERS.find(c => c.id === currentDragonBallParams.characterId);
        if (char) {
          try {
            finalImageUrl = await compositeDragonBallCard(resultUrl, char);
          } catch (e) {
            console.error('Failed to composite Dragon Ball card:', e);
            // Fallback to original image if composition fails
          }
        }
      }

      setGeneratedImage(finalImageUrl);

      // Save to local server
      let savedImageUrl = finalImageUrl;
      try {
        const response = await fetch('/api/save-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: resultUrl,
            timestamp: Date.now(),
            prompt,
            mode,
            aspectRatio,
            referenceImage: referenceImage || undefined,
            targetImage: targetImage || undefined,
            model: selectedModel,

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
            triptychParams,
            petMerchParams,
            productFoodParams,
            figureParams,
            beautyParams,
            groupPhotoParams,
            styleCopyParams,
            characterEditParams,
            dragonBallParams: mode === 'dragon_ball' ? currentDragonBallParams : undefined,
            objectDecompositionParams,
            doodleBombingParams,
            ootdParams,
            literacyCardParams
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.url) {
            savedImageUrl = `http://localhost:3001${data.url}`;
          }
          // Refresh history from server to ensure sync
          fetchHistory();
        } else {
          console.error('Failed to save image to server');
        }
      } catch (serverError) {
        console.error('Error connecting to save server:', serverError);
        // Fallback to using the base64 URL if server save fails
      }

      setGeneratedImage(savedImageUrl);

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 pb-20">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0f172a]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/20 text-xl">
              🍌
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">
              Nano Banana Studio
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'generator'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              Generator
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'history'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              History
            </button>
          </div>

          {/* Model Selector */}
          <div className="hidden sm:block">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="text-xs bg-slate-900 border border-slate-700 rounded-full px-3 py-1 text-slate-300 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            >
              <option value="gemini-2.5-flash-image">Nano Banana</option>
              <option value="gemini-3-pro-image-preview">Nano Banana Pro</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">

        {activeTab === 'history' ? (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Generation History</h2>
              <button
                onClick={() => setHistory([])}
                className="text-sm text-red-400 hover:text-red-300 px-3 py-1 rounded hover:bg-red-900/20 transition-colors"
                disabled={history.length === 0}
              >
                Clear All
              </button>
            </div>
            <HistoryGallery
              history={history}
              onDelete={handleDeleteHistory}
              onSelect={handleSelectHistory}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            {/* Left Column: Controls */}
            <div className="lg:col-span-5 space-y-6">

              {/* Mode Switcher */}
              <div className="bg-slate-800/50 p-2 rounded-xl shadow-inner border border-slate-700">
                <div className="grid grid-cols-3 gap-2 text-sm font-medium">
                  <button
                    onClick={() => { setMode('portrait'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'portrait'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🎨</span>
                      <span className="text-xs">Portrait</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('faceswap'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'faceswap'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🔄</span>
                      <span className="text-xs">Face Swap</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('style_transfer'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'style_transfer'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">✨</span>
                      <span className="text-xs">动漫风格</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('fashion'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'fashion'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">👔</span>
                      <span className="text-xs">Fashion</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('age_transform'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'age_transform'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">⏳</span>
                      <span className="text-xs">Age</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('hairstyle'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'hairstyle'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">💇</span>
                      <span className="text-xs">Hairstyle</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('tattoo'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'tattoo'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">💉</span>
                      <span className="text-xs">Tattoo</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('photography'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'photography'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">📷</span>
                      <span className="text-xs">Photography</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('pose_transfer'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'pose_transfer'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🤸</span>
                      <span className="text-xs">Pose</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('scene_gen'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'scene_gen'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🎬</span>
                      <span className="text-xs">网红</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('free_mode'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'free_mode'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">✨</span>
                      <span className="text-xs">Free Mode</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('hanfu'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'hanfu'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🏮</span>
                      <span className="text-xs">汉服</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('travel'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'travel'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">✈️</span>
                      <span className="text-xs">旅行</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('triptych'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'triptych'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🎞️</span>
                      <span className="text-xs">三连拍</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('pet_merch'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'pet_merch'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🐾</span>
                      <span className="text-xs">萌宠周边</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('product_food'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'product_food'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🛍️</span>
                      <span className="text-xs">商品美食</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('figure'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'figure'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🧸</span>
                      <span className="text-xs">手办</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('beauty'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'beauty'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">✨</span>
                      <span className="text-xs">美颜</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('group_photo'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'group_photo'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">👥</span>
                      <span className="text-xs">Group Photo</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('style_copy'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'style_copy'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🎨</span>
                      <span className="text-xs">Style Copy</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('character_edit'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'character_edit'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">✏️</span>
                      <span className="text-xs">人物修改</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('game_style'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'game_style'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🎮</span>
                      <span className="text-xs">Game Style</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('image_modification'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'image_modification'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🖼️</span>
                      <span className="text-xs">高清修复Upscale</span>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setMode('dragon_ball');
                      setError(null);
                    }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'dragon_ball'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🐉</span>
                      <span className="text-xs">Dragon Ball</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('object_decomposition'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'object_decomposition'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🧩</span>
                      <span className="text-xs">Decompose</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('doodle_bombing'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'doodle_bombing'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🎨</span>
                      <span className="text-xs">Doodle</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('ootd'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'ootd'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">👗</span>
                      <span className="text-xs">OOTD</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('literacy_card'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'literacy_card'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">🔤</span>
                      <span className="text-xs">识字卡片</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setMode('character_design'); setError(null); }}
                    className={`py-2.5 px-3 rounded-lg transition-all duration-200 ${mode === 'character_design'
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-base mb-0.5">📐</span>
                      <span className="text-xs">角色设定集</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-xl backdrop-blur-sm">

                {/* Reference Face (Common to both) - Hidden for Group Photo and Literacy Card */}
                {mode !== 'group_photo' && mode !== 'literacy_card' && (
                  <ImageUploader
                    id="ref-img"
                    label="1. Reference Face (Source)"
                    selectedImage={referenceImage}
                    onImageSelect={setReferenceImage}
                    helpText="Upload clear photo of face to use"
                  />
                )}

                {mode === 'portrait' ? (
                  <>
                    {/* Portrait Mode Controls */}
                    <PresetSelector
                      selectedPresetId={selectedPresetId}
                      onSelect={handlePresetSelect}
                    />



                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-slate-300">
                          3. Refine Prompt
                        </label>
                        {selectedPresetId && (
                          <button
                            onClick={() => setPrompt('')}
                            className="text-xs text-slate-500 hover:text-slate-300"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <textarea
                        value={prompt}
                        onChange={(e) => {
                          setPrompt(e.target.value);
                          if (selectedPresetId) {
                            // Keep preset selected but allow editing
                          }
                        }}
                        placeholder="Describe the scene, clothing, lighting..."
                        className="w-full h-24 bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all placeholder-slate-500 resize-none"
                      />
                    </div>

                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'beauty' ? (
                  <>
                    <BeautyControls
                      params={beautyParams}
                      onChange={setBeautyParams}
                    />
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'faceswap' ? (
                  <>
                    {/* Face Swap Mode Controls */}
                    <ImageUploader
                      id="target-img"
                      label="2. Target Photo (Destination)"
                      selectedImage={targetImage}
                      onImageSelect={setTargetImage}
                      helpText="Upload the photo you want to paste face into"
                    />

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        3. Which face to replace?
                      </label>
                      <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700">
                        <p className="text-xs text-slate-400 mb-2">
                          If the target photo has multiple people, identify which one to swap.
                        </p>
                        <input
                          type="text"
                          value={faceDescription}
                          onChange={(e) => setFaceDescription(e.target.value)}
                          placeholder="e.g., 'the man on the left', 'child in red'"
                          className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'style_transfer' ? (
                  <>
                    {/* Style Converter Mode Controls */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-slate-300 mb-4">
                        2. Choose Direction
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setStyleDirection('photo_to_cartoon')}
                          className={`p-4 rounded-xl border-2 transition-all ${styleDirection === 'photo_to_cartoon'
                            ? 'border-brand-500 bg-brand-500/10 text-white'
                            : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                            }`}
                        >
                          <div className="text-2xl mb-2">📸 ➡️ 🎨</div>
                          <div className="font-bold text-sm">Photo to Cartoon</div>
                          <div className="text-xs opacity-70 mt-1">Turn photo into 3D art</div>
                        </button>

                        <button
                          onClick={() => setStyleDirection('cartoon_to_photo')}
                          className={`p-4 rounded-xl border-2 transition-all ${styleDirection === 'cartoon_to_photo'
                            ? 'border-brand-500 bg-brand-500/10 text-white'
                            : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                            }`}
                        >
                          <div className="text-2xl mb-2">🎨 ➡️ 📸</div>
                          <div className="font-bold text-sm">Cartoon to Photo</div>
                          <div className="text-xs opacity-70 mt-1">Turn art into realism</div>
                        </button>
                      </div>
                    </div>

                    {styleDirection === 'photo_to_cartoon' ? (
                      <div className="mb-8">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          3. Choose Cartoon Style
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: '3d_cartoon', name: '3D Cartoon', desc: 'Pixar/Disney Style' },
                            { id: 'ghibli', name: 'Ghibli', desc: 'Miyazaki Anime Style' },
                            { id: 'toriyama', name: 'Toriyama', desc: 'Dragon Ball Style' },
                            { id: 'katsura', name: 'Katsura', desc: 'Video Girl Ai / I"s' },
                            { id: 'shinkai', name: 'Shinkai', desc: 'Your Name Style' },
                            { id: 'jojo', name: 'JoJo', desc: 'JoJo\'s Bizarre Adventure' },
                            { id: 'saint_seiya', name: 'Saint Seiya', desc: 'Saint Seiya Style' },
                            { id: 'gintama', name: 'Gintama', desc: 'Gintama Style' },
                            { id: 'shin_chan', name: 'Shin-chan', desc: 'Crayon Shin-chan' },
                            { id: 'peppa', name: 'Peppa Pig', desc: 'Peppa Pig Style' },
                            { id: 'sailor_moon', name: 'Sailor Moon', desc: 'Sailor Moon Style' },
                            { id: 'aot', name: 'Attack on Titan', desc: 'Attack on Titan Style' },
                            { id: 'marvel', name: 'Marvel', desc: 'Marvel Comic Style' },
                            { id: 'junji_ito', name: 'Junji Ito', desc: 'Junji Ito Horror Style' },
                          ].map((style) => (
                            <button
                              key={style.id}
                              onClick={() => setCartoonStyle(style.id)}
                              className={`p-3 rounded-lg border text-left transition-all ${cartoonStyle === style.id
                                ? 'bg-brand-600 border-brand-500 text-white'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                }`}
                            >
                              <div className="font-medium text-sm">{style.name}</div>
                              <div className="text-[10px] opacity-70">{style.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'age_transform' ? (
                  <>
                    {/* Age Transformation Mode Controls */}
                    <div className="mb-8">
                      <AgeControls
                        ageParams={ageParams}
                        onChange={setAgeParams}
                      />
                      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>
                  </>
                ) : mode === 'hairstyle' ? (
                  <>
                    {/* Hairstyle Mode Controls */}
                    <div className="mb-8">
                      <HairstyleControls
                        hairstyleParams={hairstyleParams}
                        onChange={setHairstyleParams}
                      />
                      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>
                  </>
                ) : mode === 'tattoo' ? (
                  <>
                    {/* Tattoo Mode Controls */}
                    <div className="mb-8">
                      <TattooControls
                        tattooParams={tattooParams}
                        onChange={setTattooParams}
                      />
                      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>
                  </>
                ) : mode === 'photography' ? (
                  <>
                    {/* Photography Mode Controls */}
                    <div className="mb-8">
                      <PhotographyControls
                        photographyParams={photographyParams}
                        onChange={setPhotographyParams}
                        onBackgroundImageChange={(img) => setTargetImage(img)}
                      />
                      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>
                  </>
                ) : mode === 'pose_transfer' ? (
                  <>
                    {/* Pose Transfer Mode Controls */}
                    <div className="mb-8">
                      <PoseControls
                        poseParams={poseParams}
                        onChange={setPoseParams}
                        onPoseReferenceChange={() => { }}
                      />
                      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>
                  </>
                ) : mode === 'scene_gen' ? (
                  <>
                    {/* Scene Generator Mode Controls */}
                    <div className="mb-8">
                      <SceneGenControls
                        sceneGenParams={sceneGenParams}
                        onChange={setSceneGenParams}
                      />
                      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>
                  </>
                ) : mode === 'free_mode' ? (
                  <>
                    {/* Free Mode Controls */}
                    <div className="mb-8">
                      <FreeModeControls
                        freeModeParams={freeModeParams}
                        onChange={setFreeModeParams}
                      />
                      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>
                  </>
                ) : mode === 'hanfu' ? (
                  <>
                    {/* Hanfu Dress-up Controls */}
                    <div className="mb-8">
                      <HanfuControls
                        hanfuParams={hanfuParams}
                        onChange={setHanfuParams}
                      />
                      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>
                  </>
                ) : mode === 'travel' ? (
                  <>
                    <TravelControls
                      travelParams={travelParams}
                      onChange={setTravelParams}
                    />

                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'triptych' ? (
                  <>
                    <TriptychControls
                      triptychParams={triptychParams}
                      onChange={setTriptychParams}
                    />
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'pet_merch' ? (
                  <>
                    <PetMerchControls
                      petMerchParams={petMerchParams}
                      onChange={setPetMerchParams}
                    />
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'product_food' ? (
                  <>
                    <ProductFoodControls
                      productFoodParams={productFoodParams}
                      onChange={setProductFoodParams}
                    />
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'figure' ? (
                  <>
                    <FigureControls
                      figureParams={figureParams}
                      onChange={setFigureParams}
                    />
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'beauty' ? (
                  <>
                    <BeautyControls
                      params={beautyParams}
                      onChange={setBeautyParams}
                    />
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'group_photo' ? (
                  <>
                    <GroupPhotoControls
                      groupPhotoParams={groupPhotoParams}
                      onChange={setGroupPhotoParams}
                    />
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'style_copy' ? (
                  <>
                    <StyleCopyControls
                      styleCopyParams={styleCopyParams}
                      onChange={setStyleCopyParams}
                    />
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'fashion' ? (
                  <>
                    {/* Fashion Studio Mode Controls */}
                    <div className="mb-8">
                      <FashionControls
                        fashionParams={fashionParams}
                        onChange={setFashionParams}
                      />
                      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>
                  </>
                ) : mode === 'game_style' ? (
                  <>
                    {/* Game Style Mode Controls */}
                    <div className="mb-8">
                      <GameStyleControls
                        params={gameStyleParams}
                        onChange={setGameStyleParams}
                      />
                      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>
                  </>
                ) : mode === 'image_modification' ? (
                  <>
                    {/* Image Modification Mode Controls */}
                    <div className="mb-8">
                      <ImageModControls
                        params={imageModParams}
                        onChange={setImageModParams}
                      />
                      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>
                  </>
                ) : mode === 'dragon_ball' ? (
                  <>
                    <div className="mb-8">
                      <DragonBallCardControls
                        params={dragonBallParams}
                        onChange={setDragonBallParams}
                      />
                    </div>
                  </>
                ) : mode === 'object_decomposition' ? (
                  <>
                    <ObjectDecompositionControls
                      params={objectDecompositionParams}
                      onChange={setObjectDecompositionParams}
                    />
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'doodle_bombing' ? (
                  <>
                    <DoodleBombingControls
                      params={doodleBombingParams}
                      onChange={setDoodleBombingParams}
                    />
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'ootd' ? (
                  <>
                    <OOTDControls
                      params={ootdParams}
                      onChange={setOOTDParams}
                    />
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </>
                ) : mode === 'character_edit' ? (
                  <>
                    {/* Character Edit Mode Controls */}
                    <div className="mb-8">
                      <CharacterEditControls
                        params={characterEditParams}
                        onChange={setCharacterEditParams}
                      />
                      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>
                  </>
                ) : null}



                {mode === 'literacy_card' && (
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <span className="mr-2">🔤</span> Literacy Card Settings
                    </h3>
                    <LiteracyCardControls
                      params={literacyCardParams}
                      onChange={setLiteracyCardParams}
                    />
                  </div>
                )}

                {mode === 'character_design' && (
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <span className="mr-2">📐</span> Character Design Settings
                    </h3>
                    <CharacterDesignControls
                      params={characterDesignParams}
                      onChange={setCharacterDesignParams}
                    />
                    <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || (mode !== 'scene_gen' && mode !== 'free_mode' && mode !== 'travel' && mode !== 'group_photo' && mode !== 'dragon_ball' && mode !== 'object_decomposition' && mode !== 'doodle_bombing' && mode !== 'ootd' && mode !== 'literacy_card' && mode !== 'character_design' && mode !== 'pose_transfer' && !referenceImage) || (mode === 'faceswap' && !targetImage) || (mode === 'style_copy' && !styleCopyParams.styleImage) || (mode === 'pose_transfer' && !poseParams.poseReferenceImage && !poseParams.selectedPreset)}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center transition-all transform active:scale-[0.98]
                    ${isGenerating || (mode !== 'scene_gen' && mode !== 'free_mode' && mode !== 'travel' && mode !== 'group_photo' && mode !== 'dragon_ball' && mode !== 'object_decomposition' && mode !== 'doodle_bombing' && mode !== 'ootd' && mode !== 'literacy_card' && mode !== 'character_design' && mode !== 'pose_transfer' && !referenceImage) || (mode === 'faceswap' && !targetImage) || (mode === 'style_copy' && !styleCopyParams.styleImage) || (mode === 'pose_transfer' && !poseParams.poseReferenceImage && !poseParams.selectedPreset)
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white shadow-brand-500/25 hover:shadow-brand-500/40'}
                  `}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {mode === 'portrait' ? 'Generating...' : mode === 'faceswap' ? 'Swapping Face...' : mode === 'age_transform' ? 'Transforming Age...' : mode === 'hairstyle' ? 'Changing Hairstyle...' : mode === 'tattoo' ? 'Creating Tattoo Preview...' : mode === 'photography' ? 'Generating Photo...' : mode === 'pose_transfer' ? 'Transferring Pose...' : mode === 'scene_gen' ? 'Generating Scene...' : mode === 'travel' ? 'Traveling...' : mode === 'style_copy' ? 'Analyzing & Generating...' : mode === 'character_edit' ? 'Editing Character...' : mode === 'dragon_ball' ? 'Summoning...' : 'Converting...'}
                    </>
                  ) : (
                    <>
                      <span className="mr-2">✨</span> {mode === 'portrait' ? 'Generate Portrait' : mode === 'faceswap' ? 'Swap Face' : mode === 'style_transfer' ? 'Convert Style' : mode === 'age_transform' ? 'Transform Age' : mode === 'hairstyle' ? 'Change Hairstyle' : mode === 'tattoo' ? 'Preview Tattoo' : mode === 'photography' ? 'Generate Photo' : mode === 'pose_transfer' ? 'Transfer Pose' : mode === 'scene_gen' ? 'Generate Scene' : mode === 'free_mode' ? 'Creative Generate' : mode === 'travel' ? 'Start Travel' : mode === 'triptych' ? 'Generate Triptych' : mode === 'pet_merch' ? 'Generate Merch' : mode === 'product_food' ? 'Generate Product' : mode === 'group_photo' ? 'Generate Group Photo' : mode === 'style_copy' ? 'Copy Style' : mode === 'character_edit' ? 'Edit Character' : mode === 'dragon_ball' ? 'Draw Card' : 'Create Look'}
                    </>
                  )}
                </button>

                {error && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-start">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Preview */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 h-full min-h-[600px] flex flex-col relative shadow-2xl overflow-hidden">

                {/* Background decoration */}
                <div className="absolute top-0 left-0 right-0 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-slate-900/0 to-slate-900/0 pointer-events-none" />

                <div className="flex-1 flex items-center justify-center p-6 z-10 relative">
                  {generatedImage ? (
                    <div className="relative group inline-block max-w-full max-h-full">
                      <img
                        src={generatedImage}
                        alt="Result"
                        className="block max-w-full max-h-[700px] rounded-lg shadow-2xl object-contain"
                      />
                      <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <a
                          href={generatedImage}
                          download={`portrait-genius-${Date.now()}.png`}
                          className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </a>
                      </div>

                      {mode === 'dragon_ball' && dragonBallParams.characterId && (
                        <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                          {/* Overlay removed as it is now composited into the image */}
                        </div>
                      )}
                    </div>
                  ) : isGenerating ? (
                    <div className="text-center space-y-4">
                      <div className="inline-block w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-slate-400 animate-pulse font-medium">
                        {mode === 'portrait' ? 'Creating your masterpiece...' : 'Blending identities...'}
                      </p>
                      <p className="text-slate-600 text-xs">This usually takes 5-10 seconds</p>
                    </div>
                  ) : (
                    <div className="text-center text-slate-600">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center justify-center">
                        <svg className="w-10 h-10 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="font-medium text-lg text-slate-500">No image generated yet</p>
                      <p className="text-sm mt-2 max-w-xs mx-auto">
                        {mode === 'portrait'
                          ? 'Upload a reference face and select a style to see the magic happen.'
                          : mode === 'faceswap'
                            ? 'Upload a reference face and a target scene to swap identities.'
                            : mode === 'style_transfer'
                              ? 'Upload an image and choose a conversion direction.'
                              : mode === 'age_transform'
                                ? 'Upload a photo and see yourself at any age.'
                                : mode === 'hairstyle'
                                  ? 'Upload a photo and try different hairstyles instantly.'
                                  : mode === 'tattoo'
                                    ? 'Upload a photo and preview tattoos on your body.'
                                    : mode === 'photography'
                                      ? 'Create professional photos with guided prompts or image references.'
                                      : mode === 'triptych'
                                        ? 'Create cinematic 3-panel compositions from your photo.'
                                        : mode === 'pet_merch'
                                          ? 'Turn your pet or character into cute merchandise like stamps and gachapon.'
                                          : mode === 'product_food'
                                            ? 'Create professional product and food photography with perfect lighting.'
                                            : mode === 'figure'
                                              ? 'Turn your character into a high-quality 1/7 scale commercial figure.'
                                              : mode === 'character_edit'
                                                ? 'Upload a character and modify their expression, pose, or style.'
                                                : mode === 'dragon_ball'
                                                  ? 'Click "Draw Card" to summon a random Dragon Ball character!'
                                                  : 'Upload a face and design your perfect outfit.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div >
        )}
      </main >
    </div >
  );
};

export default App;
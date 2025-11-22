import React, { useState, useEffect } from 'react';
import { ImageUploader } from './ImageUploader';
import { PresetSelector } from './PresetSelector';
import { HistoryGallery } from './HistoryGallery';
import { generatePortrait } from '../services/geminiService';
import { AspectRatio, PresetScenario, AppMode, HistoryItem, FashionParams, AgeTransformParams, HairstyleParams, TattooParams, PhotographyParams, PoseParams, SceneGenParams } from '../types';
import { FashionControls } from './FashionControls';
import { AgeControls } from './AgeControls';
import { HairstyleControls } from './HairstyleControls';
import { TattooControls } from './TattooControls';
import { PhotographyControls } from './PhotographyControls';
import { PoseControls } from './PoseControls';
import { SceneGenControls } from './SceneGenControls';
import { ASPECT_RATIOS } from '../constants';

const getRatioIconClass = (ratio: string) => {
  switch (ratio) {
    case '3:4': return 'w-[18px] h-[24px]';
    case '4:3': return 'w-[24px] h-[18px]';
    case '1:1': return 'w-[20px] h-[20px]';
    case '9:16': return 'w-[14px] h-[24px]';
    case '16:9': return 'w-[24px] h-[14px]';
    default: return 'w-[20px] h-[20px]';
  }
};

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

  // Load history from server on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/history');
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

    if (!referenceImage) {
      setError("Please upload a reference face.");
      return;
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
        sceneGenParams
      );

      // Save to local server
      let savedImageUrl = resultUrl;
      try {
        const response = await fetch('http://localhost:3001/api/save-image', {
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
            photographyParams
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
            <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              PortraitGenius AI
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
              <option value="gemini-2.5-flash-image">Gemini 2.5 Flash</option>
              <option value="gemini-3-pro-image-preview">Gemini 3 Pro</option>
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
                      <span className="text-xs">Converter</span>
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
                    <div className="flex flexcol items-center">
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
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-xl backdrop-blur-sm">

                {/* Reference Face (Common to both) */}
                <ImageUploader
                  id="ref-img"
                  label="1. Reference Face (Source)"
                  selectedImage={referenceImage}
                  onImageSelect={setReferenceImage}
                  helpText="Upload clear photo of face to use"
                />

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

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        4. Aspect Ratio
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {ASPECT_RATIOS.map((ratio) => (
                          <button
                            key={ratio.value}
                            onClick={() => setAspectRatio(ratio.value)}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all
                              ${aspectRatio === ratio.value
                                ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-500/25'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-500'}
                            `}
                            title={ratio.label}
                          >
                            <div className={`mb-1 border-2 rounded-sm ${aspectRatio === ratio.value ? 'border-white' : 'border-current'
                              } ${getRatioIconClass(ratio.value)}`} />
                            <span className="text-[10px] font-medium">{ratio.value}</span>
                          </button>
                        ))}
                      </div>
                    </div>
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
                    ) : (
                      <div className="mb-8">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          3. Choose Target Ethnicity
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: 'east_asian', name: 'East Asian', desc: 'Chinese/Japanese/Korean' },
                            { id: 'caucasian', name: 'Caucasian', desc: 'European/White' },
                            { id: 'african', name: 'African', desc: 'Black/African Descent' },
                            { id: 'south_asian', name: 'South Asian', desc: 'Indian/Pakistani' },
                            { id: 'hispanic', name: 'Hispanic', desc: 'Latino/Hispanic' },
                          ].map((eth) => (
                            <button
                              key={eth.id}
                              onClick={() => setEthnicity(eth.id)}
                              className={`p-3 rounded-lg border text-left transition-all ${ethnicity === eth.id
                                ? 'bg-brand-600 border-brand-500 text-white'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                                }`}
                            >
                              <div className="font-medium text-sm">{eth.name}</div>
                              <div className="text-[10px] opacity-70">{eth.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : mode === 'age_transform' ? (
                  <>
                    {/* Age Transformation Mode Controls */}
                    <div className="mb-8">
                      <AgeControls
                        ageParams={ageParams}
                        onChange={setAgeParams}
                      />
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
                    </div>
                  </>
                ) : mode === 'pose_transfer' ? (
                  <>
                    {/* Pose Transfer Mode Controls */}
                    <div className="mb-8">
                      <PoseControls
                        poseParams={poseParams}
                        onChange={setPoseParams}
                        onPoseReferenceChange={(img) => setTargetImage(img)}
                      />
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
                    </div>
                  </>
                ) : (
                  <>
                    {/* Fashion Studio Mode Controls */}
                    <div className="mb-8">
                      <FashionControls
                        fashionParams={fashionParams}
                        onChange={setFashionParams}
                      />
                    </div>
                  </>
                )}

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !referenceImage || (mode === 'faceswap' && !targetImage)}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center transition-all transform active:scale-[0.98]
                    ${isGenerating || !referenceImage || (mode === 'faceswap' && !targetImage)
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
                      {mode === 'portrait' ? 'Generating...' : mode === 'faceswap' ? 'Swapping Face...' : mode === 'age_transform' ? 'Transforming Age...' : mode === 'hairstyle' ? 'Changing Hairstyle...' : mode === 'tattoo' ? 'Creating Tattoo Preview...' : mode === 'photography' ? 'Generating Photo...' : mode === 'pose_transfer' ? 'Transferring Pose...' : mode === 'scene_gen' ? 'Generating Scene...' : 'Converting...'}
                    </>
                  ) : (
                    <>
                      <span className="mr-2">✨</span> {mode === 'portrait' ? 'Generate Portrait' : mode === 'faceswap' ? 'Swap Face' : mode === 'style_transfer' ? 'Convert Style' : mode === 'age_transform' ? 'Transform Age' : mode === 'hairstyle' ? 'Change Hairstyle' : mode === 'tattoo' ? 'Preview Tattoo' : mode === 'photography' ? 'Generate Photo' : mode === 'pose_transfer' ? 'Transfer Pose' : mode === 'scene_gen' ? 'Generate Scene' : 'Create Look'}
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
                    <div className="relative group w-full h-full flex items-center justify-center">
                      <img
                        src={generatedImage}
                        alt="Result"
                        className="max-w-full max-h-[700px] rounded-lg shadow-2xl object-contain"
                      />
                      <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
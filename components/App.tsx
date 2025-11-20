import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { PresetSelector } from './PresetSelector';
import { generatePortrait } from '../services/geminiService';
import { AspectRatio, PresetScenario, AppMode } from '../types';
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
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [faceDescription, setFaceDescription] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Ratio_3_4);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePresetSelect = (preset: PresetScenario) => {
    setSelectedPresetId(preset.id);
    setPrompt(preset.promptModifier);
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
    } else {
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
        faceDescription
      );
      setGeneratedImage(resultUrl);
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
          <div className="text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1">
            Gemini 2.5 Flash
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Mode Switcher */}
          <div className="bg-slate-800/50 p-1 rounded-xl flex text-sm font-medium shadow-inner border border-slate-700">
            <button
              onClick={() => { setMode('portrait'); setError(null); }}
              className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                mode === 'portrait' 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              Portrait Generator
            </button>
            <button
              onClick={() => { setMode('faceswap'); setError(null); }}
              className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                mode === 'faceswap' 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              Face Swap
            </button>
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
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    3. Refine Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value);
                      setSelectedPresetId(null);
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
                        <div className={`mb-1 border-2 rounded-sm ${
                          aspectRatio === ratio.value ? 'border-white' : 'border-current'
                        } ${getRatioIconClass(ratio.value)}`} />
                        <span className="text-[10px] font-medium">{ratio.value}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
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
                  {mode === 'portrait' ? 'Generating...' : 'Swapping Face...'}
                </>
              ) : (
                <>
                  <span className="mr-2">✨</span> {mode === 'portrait' ? 'Generate Portrait' : 'Swap Face'}
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
                      : 'Upload a reference face and a target scene to swap identities.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;
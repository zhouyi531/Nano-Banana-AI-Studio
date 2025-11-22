import { GoogleGenAI, Modality } from "@google/genai";
import { AspectRatio, AppMode } from "../types";

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
  sceneGenParams?: any
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
      Operation: Face Swap & Enhancement.
      
      The first image is the TARGET SCENE.
      The second image is the SOURCE IDENTITY.
      
      Instruction:
      Replace the face of ${targetFaceDesc} in the first image with the facial identity of the person shown in the second image.
      Simultaneously improve the image quality: enhance resolution, correct lighting and color balance, and fix artifacts/flaws.
      
      Strict Rules:
      1. CRITICAL: The facial identity MUST match the SOURCE IDENTITY exactly. Do NOT alter facial features.
      2. ASPECT RATIO: The output image MUST have the EXACT SAME aspect ratio as the TARGET SCENE (first image). Do not crop or resize the canvas.
      3. RESOLUTION: Generate a high-resolution image with the long edge approximately 2048px.
      4. Keep the first image's composition, pose, and clothing EXACTLY as they are.
      5. Seamlessly blend the new face with the target environment's lighting and skin tone.
      6. Output must be high-definition, photorealistic, and free of noise or artifacts.
      7. Correct any color discrepancies and lighting issues to make the image look professional.
    `;

    parts.push({ text: faceSwapPrompt });

  } else if (mode === 'style_transfer') {
    // Style Transfer Mode
    let stylePrompt = '';

    if (styleDirection === 'photo_to_cartoon') {
      let styleDesc = "high-quality 3D animated movie style (Pixar/Disney style)";
      let styleRules = "Use soft lighting, vibrant colors, smooth textures, and large expressive eyes typical of 3D animation.";

      if (cartoonStyle === 'ghibli') {
        styleDesc = "Studio Ghibli anime style (Hayao Miyazaki)";
        styleRules = "Use hand-drawn aesthetic, lush backgrounds, soft natural lighting, and characteristic Ghibli character design.";
      } else if (cartoonStyle === 'toriyama') {
        styleDesc = "Akira Toriyama anime style (Dragon Ball Z)";
        styleRules = "Use bold outlines, dynamic shading, distinct muscular definition (if applicable), and Toriyama's signature eye and face shapes.";
      } else if (cartoonStyle === 'katsura') {
        styleDesc = "Masakazu Katsura manga/anime style (Video Girl Ai, I\"s)";
        styleRules = "Use delicate line work, realistic yet stylized facial features, detailed hair, and soft, romantic shading.";
      } else if (cartoonStyle === 'shinkai') {
        styleDesc = "Makoto Shinkai anime style (Your Name, Weathering with You)";
        styleRules = "Use hyper-realistic backgrounds, dramatic lighting (lens flares, sunsets), high contrast, and detailed character designs.";
      }

      stylePrompt = `
        Task: Style Transfer - Photo to ${cartoonStyle === '3d_cartoon' ? '3D Cartoon' : 'Anime/Manga'}.
        
        Instruction:
        Convert the attached photo into a ${styleDesc}.
        
        Strict Rules:
        1. IDENTITY: Keep the person's facial features, expression, and pose recognizable.
        2. STYLE: ${styleRules}
        3. BACKGROUND: Adapt the background to match the chosen art style.
        4. OUTPUT: High-quality render/illustration.
      `;
    } else {
      const targetEthnicity = ethnicity ? ethnicity.replace('_', ' ') : 'East Asian';
      stylePrompt = `
        Task: Style Transfer - Cartoon to Realistic Photo.
        
        Instruction:
        Convert the attached cartoon/anime/drawing into a photorealistic photograph of a real person.
        
        Strict Rules:
        1. ETHNICITY (CRITICAL): The person MUST be of ${targetEthnicity} descent. This is a priority constraint. Adjust skin tone, facial structure, and features to clearly reflect ${targetEthnicity} ethnicity.
        2. IDENTITY: Translate the cartoon features into realistic human features while preserving the character's essence.
        3. REALISM: The result must look like a real photograph, not a 3D render.
        4. EXPRESSION & POSE: Keep the exact same expression and pose as the original image.
        5. TEXTURE: Add realistic skin texture (pores, imperfections), hair details, and fabric textures.
        6. LIGHTING: Use realistic, cinematic lighting.
        7. OUTPUT: High-definition photograph, 8k resolution.
      `;
    }

    parts = [refImagePart, { text: stylePrompt }];

  } else if (mode === 'fashion') {
    // Fashion Studio Mode
    const { glasses, hairstyle, hat, clothing, shoes } = fashionParams || {};

    const fashionPrompt = `
      Task: Fashion Studio - Generate a photorealistic portrait with specific styling.
      
      Reference Image: The attached image provides the FACE/IDENTITY of the person.
      
      Styling Requirements:
      - Clothing: ${clothing ? clothing.replace(/_/g, ' ') : 'Stylish outfit'}
      - Hairstyle: ${hairstyle ? hairstyle.replace(/_/g, ' ') : 'Styled hair'}
      - Hat: ${hat && hat !== 'none' ? hat.replace(/_/g, ' ') : 'No hat'}
      - Glasses: ${glasses && glasses !== 'none' ? glasses.replace(/_/g, ' ') : 'No glasses'}
      - Shoes: ${shoes ? shoes.replace(/_/g, ' ') : 'Matching shoes'}
      
      Constraints:
      1. IDENTITY (CRITICAL): The face of the person in the generated image MUST MATCH the reference image exactly. Do not change the face.
      2. OUTFIT: The person must be wearing the requested items.
      3. COMPOSITION: Full body or 3/4 body shot to show the outfit.
      4. STYLE: High fashion photography, professional lighting, studio or suitable outdoor background.
      5. QUALITY: 8k resolution, highly detailed textures.
      6. MODIFICATION: Only modify the clothing, hair, and accessories. Keep the facial features 100% unchanged.
    `;

    parts = [refImagePart, { text: fashionPrompt }];

  } else if (mode === 'age_transform') {
    // Age Transformation Mode
    const age = ageParams?.targetAge || 30;

    const agePrompt = `
      Task: Age Transformation - Re-imagine the person at age ${age}.
      
      Instruction:
      Generate a photorealistic portrait of the person in the reference image as if they were ${age} years old.
      
      Strict Rules:
      1. IDENTITY (CRITICAL): The facial features (eyes, nose, mouth shape, bone structure) MUST remain recognizable as the SAME PERSON.
      2. AGE MARKERS: Adjust skin texture, wrinkles, hair color/thickness, and facial maturity to match the age of ${age}.
      3. EXPRESSION & POSE: Keep the same expression and pose as the reference image.
      4. CLOTHING: Keep the clothing style consistent or age-appropriate if necessary, but prefer preserving original style.
      5. OUTPUT: High-quality, realistic photography.
    `;

    parts = [refImagePart, { text: agePrompt }];

  } else if (mode === 'hairstyle') {
    // Hairstyle Modification Mode
    const { hairstyle } = hairstyleParams || {};

    const hairstylePrompt = `
      Task: Hairstyle Modification - Change only the hairstyle while preserving everything else.
      
      Reference Image: The attached image shows the person whose hairstyle needs to be changed.
      
      Target Hairstyle: ${hairstyle ? hairstyle.replace(/_/g, ' ') : 'Modern styled hair'}
      
      CRITICAL Constraints:
      1. FACE PRESERVATION (ABSOLUTE PRIORITY): The facial features, face shape, eyes, nose, mouth, skin tone, and overall facial identity MUST remain EXACTLY the same as the reference image. DO NOT alter the face in ANY way.
      2. HAIRSTYLE ONLY: ONLY change the hairstyle to match the requested style. The hair color should complement the person's natural appearance.
      3. EVERYTHING ELSE UNCHANGED: Keep the clothing, accessories, background, pose, expression, and all other elements EXACTLY as they appear in the reference image.
      4. NATURAL INTEGRATION: The new hairstyle must look natural and realistic, properly integrated with the person's face and head shape.
      5. QUALITY: Generate a high-quality, photorealistic image with detailed hair texture.
      6. ASPECT RATIO: Maintain the same aspect ratio as the reference image.
      7. SEAMLESS BLEND: Ensure the hairline and hair edges blend naturally with the forehead and face.
      
      Remember: This is ONLY a hairstyle change. The person's face and identity must be perfectly preserved.
    `;

    parts = [refImagePart, { text: hairstylePrompt }];

  } else if (mode === 'tattoo') {
    // Tattoo Preview Mode
    const { position, design, customDesign } = tattooParams || {};

    // Determine the tattoo description
    let tattooDescription = '';
    if (design === 'custom' && customDesign) {
      tattooDescription = customDesign;
    } else {
      tattooDescription = design ? design.replace(/_/g, ' ') + ' tattoo' : 'decorative tattoo';
    }

    const positionDescription = position ? position.replace(/_/g, ' ') : 'upper arm';

    const tattooPrompt = `
      Task: Tattoo Preview - Generate a full-body photo with a tattoo at a specific location.
      
      Reference Image: The attached image shows the person's face and identity.
      
      Tattoo Specifications:
      - Location: ${positionDescription}
      - Design: ${tattooDescription}
      
      CRITICAL Constraints:
      1. FACE PRESERVATION (ABSOLUTE PRIORITY): The facial features, face shape, eyes, nose, mouth, skin tone, and overall facial identity MUST remain EXACTLY the same as the reference image. DO NOT alter the face in ANY way.
      2. FULL-BODY COMPOSITION: Generate a full-body, front-facing photo showing the person from head to toe.
      3. APPROPRIATE ATTIRE: The person should be wearing appropriate swimwear:
         - For males: swim trunks/board shorts
         - For females: one-piece swimsuit or athletic two-piece swimsuit
         This allows clear visibility of the tattoo while maintaining modesty and appropriateness.
      4. BODY SHAPE PRESERVATION: Keep the person's body shape, build, and proportions consistent with what would be expected from their face and reference image.
      5. TATTOO PLACEMENT: Place the ${tattooDescription} precisely on the ${positionDescription}. The tattoo should be clearly visible and appropriately sized for the body location.
      6. REALISTIC TATTOO: The tattoo must look like real ink on skin - with proper shading, depth, and integration with skin texture. It should appear as if it's actually tattooed on the person.
      7. NATURAL POSE: Use a natural standing pose that clearly shows the tattoo location. The person should be facing forward or slightly angled to display the tattoo.
      8. QUALITY: High-quality, photorealistic image with professional lighting.
      9. BACKGROUND: Use a neutral, clean background (studio setting or simple outdoor setting) that doesn't distract from the tattoo.
      
      Remember: This is a tattoo preview to help visualize how the tattoo would look. The person's face and body shape must be perfectly preserved from the reference image.
    `;

    parts = [refImagePart, { text: tattooPrompt }];

  } else if (mode === 'photography') {
    // Professional Photography Mode
    const {
      generationMode,
      backgroundImage,
      subject,
      location,
      expression,
      action,
      background,
      atmosphere,
      weather,
      lighting,
      aperture,
      focalLength,
      iso,
      shutterSpeed,
      lensType
    } = photographyParams || {};

    // Prepare background image part if it exists
    const bgImagePart = backgroundImage ? {
      inlineData: {
        data: backgroundImage.split(',')[1],
        mimeType: "image/jpeg"
      }
    } : null;

    if (generationMode === 'image-to-image') {
      // Image-to-Image Mode: Use character (main reference) and background references
      const photographyPrompt = `
        Task: Professional Photography - Image Composition
        
        Mode: Image-to-Image Composition
        
        Reference Images:
        - Character Reference (Image 1): Use this person's facial identity and body characteristics (Main Reference Image)
        - Background Reference (Image 2): Use this scene/environment as the setting (Second Image if provided)
        
        Camera Settings:
        - Aperture: ${aperture || 'f/2.8'} (controls depth of field)
        - Focal Length: ${focalLength || '50mm'} (controls perspective and field of view)
        - ISO: ${iso || '100'} (affects image grain and noise)
        - Shutter Speed: 1/${shutterSpeed || '250'}s (affects motion blur)
        - Lens Type: ${lensType || 'prime'} lens
        
        CRITICAL Requirements:
        1. FACIAL IDENTITY PRESERVATION (ABSOLUTE PRIORITY): The person's face from the Character Reference MUST be preserved EXACTLY - same facial features, expressions, skin tone, and identity.
        2. SCENE COMPOSITION: Place the person naturally within the background scene from the Background Reference image.
        3. PHOTOREALISTIC QUALITY: Generate a professional, high-quality photograph that looks like it was taken with the specified camera settings.
        4. DEPTH OF FIELD: Apply appropriate depth of field based on aperture (${aperture}):
           - f/1.4-f/2.8: Very shallow, blurred background
           - f/4-f/5.6: Moderate blur
           - f/8-f/16: Sharp background
        5. PERSPECTIVE: Use ${focalLength} focal length perspective:
           - 24-35mm: Wide angle, expansive view
           - 50mm: Natural human eye perspective
           - 85-200mm: Compressed, telephoto look
        6. LIGHTING: Natural, professional lighting that matches the scene
        7. NATURAL INTEGRATION: The person should look naturally placed in the scene, not composited
        8. TECHNICAL ACCURACY: Image should reflect the technical characteristics of the camera settings
        
        Generate a professional photograph that seamlessly combines the character with the background scene.
      `;

      // Construct parts: Character (refImagePart) + Background (bgImagePart) + Prompt
      parts = [];
      if (refImagePart) parts.push(refImagePart);
      if (bgImagePart) parts.push(bgImagePart);
      parts.push({ text: photographyPrompt });

    } else {
      // Text-to-Image Mode (with optional Character Reference)
      const photographyPrompt = `
        Task: Professional Photography - Text-to-Image Generation
        
        Scene Description:
        - Subject: ${subject || 'A person'}
        - Location: ${location || 'Outdoor setting'}
        - Expression: ${expression || 'Natural'}
        - Action: ${action || 'Standing naturally'}
        - Background: ${background || 'Natural environment'}
        - Atmosphere: ${atmosphere || 'Peaceful'}
        - Weather: ${weather || 'Clear'}
        - Lighting: ${lighting || 'Natural daylight'}
        
        Camera Settings:
        - Aperture: ${aperture || 'f/2.8'} (controls depth of field)
        - Focal Length: ${focalLength || '50mm'} (controls perspective)
        - ISO: ${iso || '100'} (affects grain/noise)
        - Shutter Speed: 1/${shutterSpeed || '250'}s (affects motion)
        - Lens Type: ${lensType || 'prime'} lens
        
        Technical Requirements:
        1. PHOTOREALISTIC QUALITY: Generate a professional, high-quality photograph that looks like it was captured with real camera equipment.
        2. DEPTH OF FIELD: Apply appropriate depth of field based on ${aperture}:
           - f/1.4-f/2.8: Very shallow depth, beautifully blurred background (bokeh)
           - f/4-f/5.6: Moderate depth, some background blur
           - f/8-f/16: Deep depth, sharp throughout
        3. FOCAL LENGTH PERSPECTIVE: Use ${focalLength} perspective:
           - 24-35mm: Wide angle with slight distortion, expansive view
           - 50mm: Natural perspective matching human vision
           - 85-135mm: Portrait compression, flattering perspective
           - 200mm+: Strong compression, isolated subject
        4. ISO CHARACTERISTICS: Reflect ISO ${iso} grain:
           - 100-400: Clean, minimal grain
           - 800-1600: Slight visible grain
           - 3200+: Noticeable film-like grain
        5. LIGHTING QUALITY: Professional ${lighting} lighting with proper shadows, highlights, and color temperature
        6. COMPOSITION: Professional composition following rule of thirds, leading lines, and proper framing
        7. ATMOSPHERE: Capture the ${atmosphere} mood through lighting, color grading, and scene elements
        8. WEATHER EFFECTS: Include ${weather} weather conditions with appropriate atmospheric effects
        
        Generate a professional photograph that looks like it was taken by an experienced photographer with high-end equipment.
      `;

      parts = [refImagePart, { text: photographyPrompt }];
    }

  } else if (mode === 'scene_gen') {
    // Scene Generator Mode - Build ultra-realistic scenes from detailed parameters
    if (!sceneGenParams) {
      throw new Error("Scene generation parameters are required");
    }

    const {
      characterAge, characterType, ethnicity, eyeSize, skinTone, expression, gazeDirection,
      bodyPose, bodyOrientation, headDirection, action,
      topType, topColor, topStyle, bottomType, bottomStyle, shoesType, shoesColor,
      locationType, surface, props, customProps,
      cameraAngle, shotType, photoStyle, quality,
      lightingType, timeOfDay, weather, atmosphere
    } = sceneGenParams;

    // Build clothing description
    const topDesc = `${topColor.replace('_', ' ')} ${topType.replace('_', ' ')} with ${topStyle.replace('_', ' ')} style`;
    const bottomDesc = `${bottomStyle.replace('_', ' ')} ${bottomType.replace('_', ' ')}`;
    const shoesDesc = `${shoesColor.replace('_', ' ')} ${shoesType.replace('_', ' ')}`;

    // Build props list
    let propsDesc = '';
    if (props && props.length > 0) {
      const propsList = props.map(p => p.replace('_', ' ')).join(', ');
      propsDesc = `Scene props: ${propsList}`;
      if (customProps) {
        propsDesc += `, ${customProps}`;
      }
    } else if (customProps) {
      propsDesc = `Scene props: ${customProps}`;
    }

    const sceneGenPrompt = `
      Task: Generate an Ultra-Realistic Influencer Scene Photo with Professional Beauty Enhancement
      
      ${referenceImageBase64 ? 'REFERENCE FACE PROVIDED: Use the attached image to preserve facial identity exactly.' : 'NO REFERENCE IMAGE: Generate character from description below.'}
      
      CHARACTER SPECIFICATIONS:
      - Age: ${characterAge} years old
      - Type: ${characterType.replace('_', ' ')}
      - Ethnicity: ${ethnicity.replace('_', ' ')} with authentic ethnic features
      - Eye Size: ${eyeSize.replace('_', ' ')} eyes
      - Skin Tone: ${skinTone.replace('_', ' ')} complexion
      - Expression: ${expression.replace('_', ' ')}
      - Gaze: Looking ${gazeDirection.replace('_', ' ')}
      
      POSE & ACTION:
      - Body Pose: ${bodyPose.replace('_', ' ')}
      - Body Orientation: ${bodyOrientation.replace('_', ' ')}
      - Head Direction: ${headDirection.replace('_', ' ')}
      - Action: ${action.replace('_', ' ')}
      
      OUTFIT:
      - Top: ${topDesc}
      - Bottom: ${bottomDesc}
      - Shoes: ${shoesDesc}
      
      SCENE & ENVIRONMENT:
      - Location: ${locationType.replace('_', ' ')}
      - Surface/Ground: ${surface.replace('_', ' ')}
      ${propsDesc}
      - Lighting: ${lightingType.replace('_', ' ')} lighting
      - Time of Day: ${timeOfDay.replace('_', ' ')}
      - Weather: ${weather.replace('_', ' ')}
      - Atmosphere: ${atmosphere.replace('_', ' ')} mood
      
      CAMERA & STYLE:
      - Camera Angle: ${cameraAngle.replace('_', ' ')}
      - Shot Type: ${shotType.replace('_', ' ')}
      - Photo Style: ${photoStyle.replace('_', ' ')}
      - Quality: ${quality} ultra-high resolution
      
      CRITICAL REQUIREMENTS:
      ${referenceImageBase64 ?
        `1. FACIAL IDENTITY (ABSOLUTE PRIORITY): The person's face MUST match the reference image's identity and bone structure. Keep the same facial features and recognizable identity while applying beauty enhancements.` :
        `1. FACIAL GENERATION: Generate a realistic ${characterAge}-year-old ${characterType.replace('_', ' ')} with ${ethnicity.replace('_', ' ')} ethnicity.`
      }
      2. PROFESSIONAL BEAUTY ENHANCEMENT (CRITICAL FOR INFLUENCER QUALITY):
         - Apply subtle, natural beauty retouching that preserves facial identity
         - Smooth skin texture while maintaining natural pores and realistic detail
         - Enhance eyes to be brighter, clearer, and more expressive
         - Optimize facial features to be more photogenic (slightly enhanced cheekbones, defined jawline)
         - Use flattering, soft lighting that minimizes imperfections
         - Apply professional color grading with warm, flattering tones
         - Subtle enhancement to make the person look their absolute best while staying natural
         - Think: "Best professional photo vs casual snapshot" - polished but believable
      3. ULTRA-REALISM: This must look like a real photograph taken with professional equipment. NO illustration, NO 3D rendering, NO artistic interpretation.
      4. INSTAGRAM/INFLUENCER QUALITY: Professional influencer photo quality with perfect lighting, composition, and color grading similar to high-end Instagram/TikTok influencer content.
      5. NATURAL AUTHENTICITY: The enhancements should be subtle enough that the photo still looks real and natural, not overly filtered or fake.
      6. PRECISE SCENE: Follow ALL scene parameters exactly - location, surface, props, lighting, weather.
      7. PROPER OUTFIT: The clothing must match the specifications precisely - colors, types, and styles.
      8. CINEMATIC QUALITY: Professional color grading, proper depth of field, natural bokeh where appropriate, flattering soft focus on background.
      9. FLATTERING LIGHTING: Use lighting that naturally slims and flatters facial features - soft diffused light, slight rim lighting, avoid harsh shadows on face.
      10. ACCURATE PHYSICS: Realistic fabric draping, proper shadows, correct perspective, natural lighting physics.
      11. ASPECT RATIO: Output must be ${ratio} aspect ratio.
      12. DETAIL LEVEL: 8K quality with extreme detail, beautiful skin texture (smooth but real), crisp eyes, sharp focus on face.
      
      BEAUTY RETOUCHING GUIDELINES:
      - Skin: Even tone, subtle glow, minimized blemishes, natural smoothness (NOT plastic or airbrushed)
      - Eyes: Bright, clear whites, enhanced iris detail, natural sparkle, slightly enlarged if flattering
      - Face: Subtle contouring through lighting, enhanced bone structure, natural symmetry optimization
      - Overall: Should look like a professionally shot and edited influencer photo - polished, flattering, but still believable and natural
      
      STYLE NOTES:
      - This is for social media/influencer content
      - Should look like a high-end lifestyle photo with professional editing
      - Natural yet flawless aesthetic (like top Instagram influencers)
      - Professional yet authentic and relatable
      - Perfect for Instagram/TikTok/social platforms
      - The kind of photo that gets thousands of likes
      
      Generate a stunning, ultra-realistic photograph that looks like a professionally shot and retouched influencer photo - the person should look their absolute best while maintaining natural believability and facial identity.
    `;

    parts = [refImagePart, { text: sceneGenPrompt }];

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
      model: model,
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

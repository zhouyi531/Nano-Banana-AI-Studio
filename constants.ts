import { AspectRatio, PresetScenario } from './types';

export const ASPECT_RATIOS = [
  { value: AspectRatio.Ratio_3_4, label: '3:4 Portrait', icon: '▭' },
  { value: AspectRatio.Ratio_4_3, label: '4:3 Landscape', icon: '▬' },
  { value: AspectRatio.Ratio_1_1, label: '1:1 Square', icon: '□' },
  { value: AspectRatio.Ratio_9_16, label: '9:16 Mobile', icon: '▯' },
  { value: AspectRatio.Ratio_16_9, label: '16:9 Cinema', icon: '▭' },
];

export const PRESETS: PresetScenario[] = [
  // --- Everyday & Lifestyle ---
  {
    id: 'cafe_lifestyle',
    name: 'Coffee Shop',
    description: 'Casual, window light, cozy cafe vibe.',
    promptModifier: 'Candid lifestyle photography, sitting in a cozy coffee shop, soft natural light coming from a window illuminating the face evenly, blurred cafe background with warm tones, casual clothing, authentic look, sharp focus on face, high resolution, 35mm lens style.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'urban_minimal',
    name: 'Urban Minimalist',
    description: 'Clean street, soft overcast light.',
    promptModifier: 'Modern street photography, standing on a clean city street, soft overcast lighting (no harsh shadows), neutral concrete or building background, minimalist aesthetic, smart casual outfit, high quality portrait.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'golden_hour',
    name: 'Golden Hour',
    description: 'Warm sunset light, outdoor park.',
    promptModifier: 'Outdoor portrait during golden hour, warm soft sunlight illuminating the face, bokeh nature background with trees, soft lens flare, cinematic warm color grading, casual and relaxed pose.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'cozy_home',
    name: 'Cozy Home',
    description: 'Relaxed indoor, bright living room.',
    promptModifier: 'Relaxed indoor portrait, sitting in a bright sunlit living room, soft daylight filling the room, comfortable casual clothes, intimate and welcoming atmosphere, natural pose, photorealistic.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1687946628944-67265aca2b07?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'bright_beach',
    name: 'Sunny Beach',
    description: 'Blue sky, ocean, summer vibe.',
    promptModifier: 'Bright beach portrait, clear blue sky and ocean in background, bright natural sunlight, happy and energetic vibe, summer clothing, travel photography style, high definition, vibrant colors.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'rainy_window',
    name: 'Rainy Window',
    description: 'Melancholic, rain drops, soft mood.',
    promptModifier: 'Portrait through a rainy window, rain droplets on glass, soft moody lighting, blue and grey tones, contemplative expression, cozy indoor atmosphere, cinematic depth of field.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571631991440-7c337530733e?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'winter_snow',
    name: 'Winter Snow',
    description: 'Snowy background, winter coat.',
    promptModifier: 'Outdoor winter portrait, falling snow, wearing a warm stylish winter coat and scarf, soft white lighting, snowy forest or street background, cold breath visible, sharp focus.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'autumn_park',
    name: 'Autumn Park',
    description: 'Fall colors, leaves, sweater.',
    promptModifier: 'Portrait in an autumn park, surrounded by orange and yellow leaves, wearing a cozy knit sweater, soft diffused light, warm fall color palette, depth of field.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1671780167950-9d4e6a92b31d?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'library_study',
    name: 'Library',
    description: 'Bookshelves, quiet, academic.',
    promptModifier: 'Portrait in an old library, rows of books in background, warm ambient lighting, wearing smart academic clothing or glasses, intellectual and quiet atmosphere.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'gym_fitness',
    name: 'Fitness/Gym',
    description: 'Workout gear, energetic, gym setting.',
    promptModifier: 'Fitness portrait in a modern gym, wearing athletic workout gear, energetic lighting, gym equipment in blurred background, healthy and active look, slight sweat sheen, motivational.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'kitchen_chef',
    name: 'Chef/Cooking',
    description: 'Apron, kitchen, preparing food.',
    promptModifier: 'Portrait in a bright kitchen, wearing a chef apron, fresh ingredients in background, warm lighting, culinary lifestyle photography, authentic and engaging.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'garden_flowers',
    name: 'Spring Garden',
    description: 'Flowers, nature, blooming.',
    promptModifier: 'Portrait in a blooming flower garden, surrounded by colorful spring flowers, soft sunlight, wearing light spring clothing, romantic and fresh atmosphere, bokeh.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'travel_roadtrip',
    name: 'Road Trip',
    description: 'In car, open road, adventure.',
    promptModifier: 'Portrait sitting in the driver seat of a car, sunset visible through windshield, open road trip vibe, sunglasses, casual wear, sense of adventure and freedom.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=150&h=150&fit=crop&q=80'
  },

  // --- Professional ---
  {
    id: 'professional',
    name: 'Professional Headshot',
    description: 'Studio lighting, suit/smart casual.',
    promptModifier: 'Professional corporate headshot, neutral grey studio background, soft consistent lighting, wearing a business suit or smart casual attire, confident and approachable expression, high-end photography.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'tech_startup',
    name: 'Tech Entrepreneur',
    description: 'Modern office, casual professional.',
    promptModifier: 'Modern tech entrepreneur portrait, open plan office background with glass walls, smart casual hoodie or t-shirt with blazer, natural light, confident and innovative look.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'medical_doctor',
    name: 'Medical/Doctor',
    description: 'White coat, hospital setting.',
    promptModifier: 'Portrait of a medical professional wearing a white doctor\'s coat and stethoscope, bright clean hospital corridor background, professional and trustworthy expression, cool white lighting.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'creative_studio',
    name: 'Creative Artist',
    description: 'Art studio, messy creative space.',
    promptModifier: 'Portrait of an artist in a creative studio, art supplies and paintings in background, paint splattered apron, soft natural light, creative and intense expression.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'lawyer_legal',
    name: 'Legal/Lawyer',
    description: 'Books, suit, formal office.',
    promptModifier: 'Portrait of a lawyer in a formal office, law books in background, wearing a sharp dark suit, dramatic but professional lighting, serious and competent look.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'construction',
    name: 'Industrial/Site',
    description: 'Safety vest, hard hat, outdoor.',
    promptModifier: 'Portrait on a construction site, wearing a high-visibility vest and hard hat, industrial background with steel structures, daylight, rugged and professional.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'stage_speaker',
    name: 'TED Talk Speaker',
    description: 'On stage, spotlight, microphone.',
    promptModifier: 'Portrait speaking on a conference stage, dark background with stage spotlights, wearing a headset microphone, smart casual, passionate and engaging expression.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563807894768-f28bee0d37b6?w=150&h=150&fit=crop&q=80'
  },

  // --- Artistic & Studio ---
  {
    id: 'studio_bw',
    name: 'Black & White',
    description: 'Classic monochrome, high contrast.',
    promptModifier: 'Classic black and white studio portrait, high contrast lighting, deep blacks and bright highlights, plain black background, dramatic and timeless look, Leica style.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'film_grain',
    name: 'Vintage Film',
    description: 'Analog look, grain, nostalgic.',
    promptModifier: 'Vintage film photography style, Kodak Portra 400 aesthetic, soft film grain, nostalgic color palette, flash photography look, candid moment, retro vibe.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1625446540672-acdd9397fccb?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'rembrandt',
    name: 'Rembrandt Light',
    description: 'Chiaroscuro, painting style.',
    promptModifier: 'Studio portrait with Rembrandt lighting, triangular light on the cheek, dark moody background, painterly aesthetic, rich colors, fine art photography style.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'neon_noir',
    name: 'Neon Noir',
    description: 'Dark, pink/blue neon lights.',
    promptModifier: 'Neon noir portrait, illuminated by pink and blue neon signs, dark rainy street background, wet reflections, dramatic shadows, cinematic and moody.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1698614083129-15e976a503fe?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'double_exposure',
    name: 'Double Exposure',
    description: 'Artistic overlay with nature.',
    promptModifier: 'Artistic double exposure portrait, silhouette of the face blended with a forest or mountain landscape, white background, surreal and dreamy, fine art style.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1553775927-a071d5a6a39a?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'fashion_editorial',
    name: 'High Fashion',
    description: 'Bold makeup, avant-garde.',
    promptModifier: 'High fashion editorial portrait, bold makeup (if female) or styling, avant-garde clothing, studio lighting, confident pose, Vogue magazine cover style.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'pastel_dream',
    name: 'Pastel Dream',
    description: 'Soft pink/blue, dreamy, airy.',
    promptModifier: 'Soft pastel aesthetic portrait, shades of pale pink and baby blue, dreamy diffused lighting, ethereal atmosphere, soft focus edges, romantic and gentle.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1658003937179-9b11cd675d99?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'silhouette',
    name: 'Silhouette',
    description: 'Backlit, dark outline, sunset.',
    promptModifier: 'Silhouette portrait against a vibrant sunset sky, face in shadow with rim lighting outlining the profile, dramatic and mysterious, high contrast.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498558263790-a9555e3d002d?w=150&h=150&fit=crop&q=80'
  },

  // --- Era & Period ---
  {
    id: '1920s_gatsby',
    name: '1920s Gatsby',
    description: 'Art Deco, glamour, b&w or sepia.',
    promptModifier: '1920s Great Gatsby style portrait, vintage evening wear, art deco background, soft focus, black and white or sepia tone, glamorous and opulent.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583325722036-7003a1daa251?w=150&h=150&fit=crop&q=80'
  },
  {
    id: '1950s_diner',
    name: '1950s Retro',
    description: 'Rockabilly, diner, milkshake.',
    promptModifier: '1950s retro style portrait, sitting in a classic American diner, colorful vintage clothing, rockabilly aesthetic, bright and cheerful.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=150&h=150&fit=crop&q=80'
  },
  {
    id: '1980s_synthwave',
    name: '80s Retro',
    description: 'Neon, workout gear, VHS style.',
    promptModifier: '1980s retro portrait, bright neon clothing or windbreaker, VHS tape artifact effect, studio backdrop with lasers, fun and nostalgic.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1684402363285-1ef2ff8c45b8?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'victorian',
    name: 'Victorian Era',
    description: 'Formal, corset/suit, antique.',
    promptModifier: 'Victorian era portrait, wearing formal period clothing (suit or gown), antique photography style, sepia or desaturated colors, stern or formal expression, oval vignette.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1646189985810-b2adb304d18f?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'western_cowboy',
    name: 'Western',
    description: 'Cowboy hat, desert, rustic.',
    promptModifier: 'Western style portrait, wearing a cowboy hat and denim/leather, desert landscape background, warm sunlight, rugged and adventurous look.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1683741173915-a9711b0e7fe2?w=150&h=150&fit=crop&q=80'
  },

  // --- Fantasy & Sci-Fi ---
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Futuristic city, neon, tech.',
    promptModifier: 'Cyberpunk style, neon lights reflecting on face, futuristic night city background, vibrant cyan and magenta colors, high tech clothing or cybernetics, cinematic.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677097608923-a0c4645775cd?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'medieval_knight',
    name: 'Medieval Knight',
    description: 'Armor, castle, dramatic.',
    promptModifier: 'Medieval fantasy portrait, wearing intricate plate armor or chainmail, castle or battlefield background, dramatic lighting, heroic and epic atmosphere.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1657954563624-25c38c199f3b?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'elven_fantasy',
    name: 'Elven Fantasy',
    description: 'Ethereal, forest, magic.',
    promptModifier: 'High fantasy elf portrait, wearing elegant nature-inspired robes, mystical forest background, glowing magic effects, ethereal and beautiful, long ears hint.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'space_explorer',
    name: 'Astronaut',
    description: 'Space suit, stars, sci-fi.',
    promptModifier: 'Sci-fi astronaut portrait, wearing a futuristic space suit, stars and nebula in background, cool blue lighting, reflection in visor, cinematic space movie style.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541873676-a18131494184?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'steampunk',
    name: 'Steampunk',
    description: 'Gears, goggles, brass.',
    promptModifier: 'Steampunk inventor portrait, wearing brass goggles and Victorian-mod clothing, background of gears and steam machinery, warm copper tones.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'wizard_witch',
    name: 'Wizard/Witch',
    description: 'Robes, magic, dark mood.',
    promptModifier: 'Fantasy wizard or witch portrait, wearing dark hooded robes, holding a glowing staff or orb, magical library or dark forest background, mysterious lighting.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1698074220225-0ef86ac1d7f6?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'zombie_apocalypse',
    name: 'Survivor',
    description: 'Gritty, dirt, ruined city.',
    promptModifier: 'Post-apocalyptic survivor portrait, rugged clothing with dirt and wear, abandoned city ruins in background, dramatic desaturated lighting, intense survivalist look.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542596594-649edbc13630?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'superhero',
    name: 'Superhero',
    description: 'Costume, epic pose, city.',
    promptModifier: 'Cinematic superhero portrait, wearing a custom superhero suit with emblem, overlooking a city skyline at night, dramatic rim lighting, heroic pose.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558507652-2d9626c4e67a?w=150&h=150&fit=crop&q=80'
  },

  // --- Event & Formal ---
  {
    id: 'red_carpet',
    name: 'Red Carpet',
    description: 'Gala, flash photography, glam.',
    promptModifier: 'Red carpet event portrait, wearing luxurious evening gown or tuxedo, paparazzi flash photography style, blurred crowd in background, glamorous and celebrity vibe.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'wedding_day',
    name: 'Wedding',
    description: 'White dress/suit, romantic.',
    promptModifier: 'Wedding day portrait, wearing bridal gown or groom suit, soft romantic lighting, floral background or church arch, pure and joyful atmosphere, high key.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'royal_portrait',
    name: 'Royal Portrait',
    description: 'Crown, throne, painting style.',
    promptModifier: 'Regal royal portrait, wearing a crown and velvet robes, sitting on a throne or in a palace hall, oil painting style, majestic and powerful.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677537946831-4590ff82359c?w=150&h=150&fit=crop&q=80'
  },

  // --- Cinematic Styles ---
  {
    id: 'wes_anderson',
    name: 'Symmetrical',
    description: 'Pastel, centered, quirky.',
    promptModifier: 'Wes Anderson movie style, perfectly symmetrical composition, pastel color palette (pink/yellow/blue), quirky deadpan expression, retro clothing, distinctive aesthetic.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'cinematic_teal_orange',
    name: 'Blockbuster',
    description: 'Teal & orange grading, dramatic.',
    promptModifier: 'Cinematic movie close-up, teal and orange color grading, anamorphic lens flares, dramatic lighting, high production value, action movie star look.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'horror_movie',
    name: 'Horror/Thriller',
    description: 'Dark, shadow, scary.',
    promptModifier: 'Horror movie style portrait, face half in shadow, cool blue moonlight, terrified or menacing expression, dark foggy background, suspenseful atmosphere.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'anime_style',
    name: 'Anime/Manga',
    description: '2D style, colorful.',
    promptModifier: 'High quality anime style portrait, vivid colors, large expressive eyes, cel shading, dramatic background, Makoto Shinkai art style.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'pixar_style',
    name: '3D Animation',
    description: 'Cute, 3D render, soft.',
    promptModifier: '3D animated movie style (Pixar/Disney), cute and expressive features, soft render, bright colors, friendly and charming character design.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1637416067365-2b5e7e8fe8fa?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'oil_painting',
    name: 'Oil Painting',
    description: 'Brush strokes, classic art.',
    promptModifier: 'Classic oil painting style, visible brush strokes, rich texture, canvas texture, artistic interpretation, museum quality portrait.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft, dripping, paper texture.',
    promptModifier: 'Watercolor painting style, soft bleeding colors, white paper texture background, artistic splashes, delicate and dreamy.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=150&h=150&fit=crop&q=80'
  }
];

export const KIDS_PRESETS: PresetScenario[] = [
  // --- Realistic Kids ---
  {
    id: 'kids_sunny_park',
    name: 'Sunny Park',
    description: 'Bright, playful, outdoor fun.',
    promptModifier: 'Happy child portrait in a sunny park, bright natural sunlight, colorful playground background, playful and energetic vibe, laughing expression, high quality photography.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'kids_studio_soft',
    name: 'Studio Soft',
    description: 'Clean, innocent, high-key.',
    promptModifier: 'Professional studio portrait of a child, soft high-key lighting, white or light pastel background, innocent and sweet expression, sharp focus on eyes, angelic look.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1722219139994-b52fe7246b79?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'kids_birthday',
    name: 'Birthday Fun',
    description: 'Balloons, party, colorful.',
    promptModifier: 'Birthday party portrait, child surrounded by colorful balloons and confetti, wearing a party hat, bright and festive lighting, joyful celebration atmosphere.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1763634708735-003d172bf637?w=150&h=150&fit=crop&q=80'
  },

  // --- Artistic Kids ---
  {
    id: 'kids_3d_animation',
    name: '3D Animation',
    description: 'Pixar style, cute, round.',
    promptModifier: '3D animated movie style (Pixar/Disney) portrait of a child, cute big eyes, round features, soft render, vibrant colors, friendly and charming character design.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'kids_storybook',
    name: 'Storybook',
    description: 'Watercolor, dreamy, soft.',
    promptModifier: 'Children\'s storybook illustration style, soft watercolor and ink, dreamy pastel colors, magical atmosphere, whimsical and gentle.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'kids_anime',
    name: 'Cute Anime',
    description: 'Big eyes, chibi, vibrant.',
    promptModifier: 'Cute anime style portrait of a child, large expressive eyes, vibrant colors, chibi-esque proportions, sparkling background, kawaii aesthetic.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=150&h=150&fit=crop&q=80'
  },
  {
    id: 'kids_superhero',
    name: 'Little Hero',
    description: 'Cape, brave, fun.',
    promptModifier: 'Child dressed as a superhero with a cape, standing bravely on a rooftop (safe looking), dramatic but fun lighting, comic book movie style, heroic pose.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=150&h=150&fit=crop&q=80'
  }
];

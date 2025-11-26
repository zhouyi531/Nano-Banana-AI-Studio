import { GenerationContext, GenerationStrategy } from './types';

export class StyleTransferStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, styleDirection, cartoonStyle, ethnicity } = context;

        // Clean the base64 string if it has the data prefix
        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const refImagePart = referenceImageBase64 ? {
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        } : null;

        let stylePrompt = '';

        if (styleDirection === 'photo_to_cartoon') {
            let styleDesc = "high-quality 3D animated movie style (Pixar/Disney style)";
            let styleRules = "Use soft lighting, vibrant colors, smooth textures, and large expressive eyes typical of 3D animation.";

            if (cartoonStyle === 'ghibli') {
                styleDesc = "Studio Ghibli anime style (Hayao Miyazaki)";
                styleRules = "Use hand-drawn aesthetic, lush backgrounds, soft natural lighting, and characteristic Ghibli character design. Focus on the sense of wonder and nostalgia.";
            } else if (cartoonStyle === 'toriyama') {
                styleDesc = "Akira Toriyama anime style (Dragon Ball Z)";
                styleRules = "Use bold outlines, dynamic shading, distinct muscular definition (if applicable), and Toriyama's signature eye and face shapes. High contrast and vibrant colors.";
            } else if (cartoonStyle === 'katsura') {
                styleDesc = "Masakazu Katsura manga/anime style (Video Girl Ai, I\"s)";
                styleRules = "Use delicate line work, realistic yet stylized facial features, detailed hair, and soft, romantic shading. Focus on the beauty and emotion of the character.";
            } else if (cartoonStyle === 'shinkai') {
                styleDesc = "Makoto Shinkai anime style (Your Name, Weathering with You)";
                styleRules = "Use hyper-realistic backgrounds, dramatic lighting (lens flares, sunsets), high contrast, and detailed character designs. Emphasize the atmospheric and emotional quality.";
            } else if (cartoonStyle === 'jojo') {
                styleDesc = "JoJo's Bizarre Adventure style (Hirohiko Araki)";
                styleRules = "Use heavy shading, bold lines, dramatic poses, 'menacing' sound effect text (katakana), and high-fashion inspired outfits. Distinctive facial features with strong jawlines and detailed eyes. Use vibrant, unnatural color palettes.";
            } else if (cartoonStyle === 'saint_seiya') {
                styleDesc = "Saint Seiya style (Masami Kurumada)";
                styleRules = "Use 80s anime aesthetic, shiny metallic armor textures (Cloths), big expressive eyes with highlights, dramatic hair, and cosmic/starry backgrounds. Emphasize the heroic and mythological atmosphere.";
            } else if (cartoonStyle === 'gintama') {
                styleDesc = "Gintama anime style (Hideaki Sorachi)";
                styleRules = "Use clean lines, slightly satirical or exaggerated expressions, traditional Japanese clothing mixed with sci-fi elements, and a distinct color palette. Capture the comedic yet cool vibe.";
            } else if (cartoonStyle === 'shin_chan') {
                styleDesc = "Crayon Shin-chan style (Yoshito Usui)";
                styleRules = "Use very simple, thick distinct outlines, distorted/wobbly character shapes, flat colors, and the signature 'butt-chin' or cheek shapes. Minimal shading. Capture the playful and mischievous look.";
            } else if (cartoonStyle === 'peppa') {
                styleDesc = "Peppa Pig style";
                styleRules = "Use 2D flat vector art style, thick colored outlines, side-profile faces with both eyes on one side (Picasso-esque), simple geometric shapes, and pastel colors. Very simple and childish aesthetic.";
            } else if (cartoonStyle === 'sailor_moon') {
                styleDesc = "Sailor Moon style (Naoko Takeuchi)";
                styleRules = "Use 90s shoujo anime aesthetic, soft pastel colors, sparkling eyes, long flowing hair, magical girl transformation vibes, and dreamy soft focus. Emphasize the romantic and magical atmosphere.";
            } else if (cartoonStyle === 'aot') {
                styleDesc = "Attack on Titan style (Wit Studio/MAPPA)";
                styleRules = "Use thick, bold outlines (especially around characters), gritty textures, intense facial expressions with heavy shadowing lines under eyes, and a desaturated, serious color palette. Emphasize the dark and intense atmosphere.";
            } else if (cartoonStyle === 'marvel') {
                styleDesc = "Marvel Comic Book style";
                styleRules = "Use classic American comic book aesthetic, bold black ink lines, dynamic cross-hatching shading, vibrant colors, Ben-Day dots (optional), and heroic proportions. Capture the action and drama.";
            } else if (cartoonStyle === 'junji_ito') {
                styleDesc = "Junji Ito horror manga style";
                styleRules = "Use detailed black and white line art (or muted colors), intricate cross-hatching, disturbing or surreal elements, spiral patterns, and expressions of horror or unease. Focus on the eerie and macabre atmosphere.";
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
            // Cartoon to Photo
            stylePrompt = "Turn the scene into a hyper realistic live-action film frame, preserving the exact composition, subjects, poses, light, camera angle, background and color relationships, while converting every element into natural real-world textures";

            console.log('Generated Style Prompt:', stylePrompt);
        }

        return [refImagePart, { text: stylePrompt }].filter(part => part !== null);
    }
}

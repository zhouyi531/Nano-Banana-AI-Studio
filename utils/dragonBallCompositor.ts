import { DragonBallCharacter } from '../constants/dragonBallData';

export const compositeDragonBallCard = async (
    baseImageUrl: string,
    character: DragonBallCharacter
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }

            // 1. Draw Base Image
            ctx.drawImage(img, 0, 0);

            // Scaling factor based on image width (assuming standard width around 1024px for high res)
            // If image is small, we scale down the UI elements.
            const scale = canvas.width / 1024;

            // 2. Draw Rarity Badge (Top Left)
            const rarity = character.rarity;
            const badgeX = 40 * scale;
            const badgeY = 40 * scale;
            const badgeWidth = 100 * scale;
            const badgeHeight = 50 * scale;
            const radius = 10 * scale;

            ctx.save();

            // Badge Background Gradient
            let gradient;
            if (rarity === 'UR') {
                gradient = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeWidth, badgeY);
                gradient.addColorStop(0, 'rgba(147, 51, 234, 0.9)'); // purple-600
                gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.9)'); // pink-500
                gradient.addColorStop(1, 'rgba(239, 68, 68, 0.9)'); // red-500
            } else if (rarity === 'SSR') {
                gradient = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeWidth, badgeY);
                gradient.addColorStop(0, 'rgba(253, 224, 71, 0.9)'); // yellow-300
                gradient.addColorStop(0.5, 'rgba(234, 179, 8, 0.9)'); // yellow-500
                gradient.addColorStop(1, 'rgba(217, 119, 6, 0.9)'); // amber-600
            } else if (rarity === 'SR') {
                gradient = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeWidth, badgeY);
                gradient.addColorStop(0, 'rgba(203, 213, 225, 0.9)'); // slate-300
                gradient.addColorStop(1, 'rgba(100, 116, 139, 0.9)'); // slate-500
            } else {
                gradient = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeWidth, badgeY);
                gradient.addColorStop(0, 'rgba(180, 83, 9, 0.9)'); // amber-700
                gradient.addColorStop(1, 'rgba(180, 83, 9, 0.9)');
            }

            // Draw Rounded Rect for Badge
            ctx.beginPath();
            ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, radius);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Badge Border
            ctx.strokeStyle = rarity === 'SSR' ? 'rgba(254, 240, 138, 0.8)' : 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 2 * scale;
            ctx.stroke();

            // Badge Text
            ctx.fillStyle = (rarity === 'SSR' || rarity === 'SR') ? '#000000' : '#FFFFFF';
            ctx.font = `italic 900 ${30 * scale}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 4 * scale;
            ctx.fillText(rarity, badgeX + badgeWidth / 2, badgeY + badgeHeight / 2 + (2 * scale));
            ctx.restore();


            // 3. Draw Bottom Overlay
            const overlayHeight = canvas.height * 0.35;
            const overlayY = canvas.height - overlayHeight;

            const bottomGradient = ctx.createLinearGradient(0, overlayY, 0, canvas.height);
            bottomGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
            bottomGradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.7)');
            bottomGradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');

            ctx.fillStyle = bottomGradient;
            ctx.fillRect(0, overlayY, canvas.width, overlayHeight);

            // 4. Draw Text Content
            const contentX = 40 * scale;
            const contentBottomY = canvas.height - (40 * scale);

            // Vertical Accent Line
            const lineX = contentX;
            const lineWidth = 6 * scale;
            // Estimate height based on text content roughly
            const lineHeightEstimate = 150 * scale;
            const lineY = contentBottomY - lineHeightEstimate;

            ctx.fillStyle = '#EAB308'; // yellow-500
            ctx.fillRect(lineX, lineY, lineWidth, lineHeightEstimate);

            // Text Positioning
            const textLeftPadding = 20 * scale;
            const textX = lineX + lineWidth + textLeftPadding;

            // Name (CN)
            ctx.save();
            ctx.fillStyle = '#FFFFFF';
            ctx.font = `italic 900 ${48 * scale}px sans-serif`;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowBlur = 4 * scale;
            ctx.shadowOffsetY = 2 * scale;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            const nameY = lineY + (50 * scale);
            ctx.fillText(character.name.cn, textX, nameY);

            // Name (JP)
            const cnNameWidth = ctx.measureText(character.name.cn).width;
            ctx.fillStyle = '#FACC15'; // yellow-400
            ctx.font = `500 ${24 * scale}px sans-serif`;
            ctx.fillText(character.name.jp, textX + cnNameWidth + (15 * scale), nameY);
            ctx.restore();

            // Description
            ctx.save();
            ctx.fillStyle = '#E2E8F0'; // slate-200
            ctx.font = `500 ${24 * scale}px sans-serif`;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowBlur = 2 * scale;
            ctx.shadowOffsetY = 1 * scale;

            // Simple word wrap for description
            const maxWidth = canvas.width - textX - (40 * scale);
            const words = character.description.split(''); // Split by char for Chinese
            let line = '';
            let testY = nameY + (40 * scale);
            const lineHeight = 32 * scale;

            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n];
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    ctx.fillText(line, textX, testY);
                    line = words[n];
                    testY += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, textX, testY);
            ctx.restore();

            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = (err) => reject(err);
        img.src = baseImageUrl;
    });
};

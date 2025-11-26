
import { GenerationContext, GenerationStrategy } from "./types";
import { DRAGON_BALL_CHARACTERS, DragonBallCharacter, Rarity } from "../../constants/dragonBallData";

export class DragonBallStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { dragonBallParams } = context;
        const characterId = dragonBallParams?.characterId;

        if (!characterId) {
            throw new Error("Character ID is required for Dragon Ball mode");
        }

        const character = DRAGON_BALL_CHARACTERS.find(c => c.id === characterId);
        if (!character) {
            throw new Error(`Character with ID ${characterId} not found`);
        }

        const prompt = this.constructPrompt(character);

        return [
            { text: prompt }
        ];
    }

    private constructPrompt(character: DragonBallCharacter): string {
        const rarityPrompt = this.getRarityPrompt(character.rarity);
        const framePrompt = this.getFramePrompt(character.rarity);

        // Base prompt structure
        return `
(Masterpiece, Best Quality), ${rarityPrompt}, 
${character.promptKeywords}, 
${framePrompt}, 
(vertical aspect ratio:2:3), anime coloring, toriyama akira style, cel shading, 8k resolution
    `.trim();
    }

    private getRarityPrompt(rarity: Rarity): string {
        switch (rarity) {
            case 'UR':
                return '(prismatic holographic background:1.3), (godly aura:1.4), overwhelming energy particles, galaxy nebula effect, screen shattering effects, floating debris, cinematic lighting, dynamic angle, depth of field';
            case 'SSR':
                return '(golden foil texture background:1.2), intense lightning sparks, raging aura, lens flare, motion blur, extreme action pose, high contrast';
            case 'SR':
                return 'silver metallic background, glowing outline, combat stance, concentrated energy, speed lines, detailed muscle definition';
            case 'R':
                return 'bronze textured background, character portrait, confident expression, simple aura, sharp focus';
            case 'N':
                return 'simple flat color background, standing pose, idle animation, standard uniform, clean lines, no aura';
            default:
                return '';
        }
    }

    private getFramePrompt(rarity: Rarity): string {
        let borderColor = 'grey';
        switch (rarity) {
            case 'UR': borderColor = 'rainbow chromatic'; break;
            case 'SSR': borderColor = 'golden'; break;
            case 'SR': borderColor = 'silver'; break;
            case 'R': borderColor = 'bronze'; break;
            case 'N': borderColor = 'grey'; break;
        }

        return `(trading card game frame design:1.3), ${borderColor} metal border, sci-fi hud interface, bottom description box area, technological details`;
    }
}

import { GenerationContext, GenerationStrategy } from './types';

export class CityGuideStrategy implements GenerationStrategy {
    async buildParts(context: GenerationContext): Promise<any[]> {
        const { referenceImageBase64, ratio, cityGuideParams } = context;

        if (!referenceImageBase64) {
            throw new Error("Reference image is required for City Girl Guide mode.");
        }

        const cleanBase64 = (str: string) => str.split(',')[1] || str;

        const parts: any[] = [];

        // 1. Add Reference Image
        parts.push({
            inlineData: {
                mimeType: 'image/png',
                data: cleanBase64(referenceImageBase64),
            },
        });

        // 2. Construct Prompt
        const customPrompt = cityGuideParams?.customPrompt ? `\nAdditional User Instructions: ${cityGuideParams.customPrompt}` : "";

        const prompt = `
Role（角色）
你是一位制作超精密“基于真实照片的角色图解”的专家。
在100%保持上传人物图像的脸、发型、服装、质感、整体氛围的同时，进行图解制作。

Task（任务）
基于上传的人物图像，自动判定最符合图像氛围的城市名，并在中央以“保持实拍原样”配置人物全身。在其周围将以下内容作为真实照片进行配置：
・服装的分解（按分层）
・表情差异（实拍特写）
・材质放大
・日常小物（有生活感的物品）

区名判定
・候选：所有国家城市
・从服装、小物、背景、氛围中选择最符合的区
・反映在标题中： 「OO女子 – 照片图解」
・在标题正下方用中文添加一句注释：简单说明判定理由（例：「有高级品牌感且适合通勤 → 上海）

在中央将人物的全身以“保持实拍原样”配置，并在其周围将以下内容作为真实照片配置：
・服装的分解（按分层）
・表情差异（实拍特写）
・材质放大
・日常小物（有生活感的物品）

※必须保留原图的脸、发型、服装。
※禁止动画风、插画风（严格遵守后述的风格指定）。

Visual Guidelines（视觉指南）
◆ 1. 布局
中央（Center）
・将模特的全身站姿作为“实拍照片”配置
・光源、质感要与原图相符

周围（Surroundings）
・服装的分层分解
・实拍的表情差异
・材质的放大
・随身物品和生活方式小物
→ 在白背景的空白处均匀配置

引导线（Connectors）
・细的“摄影风格图形线”
（※禁止手绘风草图。使用实拍系UI线条）

◆ 2. 分解内容（Deconstruction Details）
● 服装分层（Clothing Layers）
・按外侧 → 内侧的顺序，将穿着中的衣服作为“实拍单品”分解显示
・材质感、缝制、蕾丝花纹等也要真实呈现
・内衣类也要作为客观的设计图解刊载 （蕾丝、T字裤的线条、长筒袜的袜口橡筋等）

● 表情表（Expression Sheet）
3〜4种实拍特写：
・冷静
・害羞
・惊讶
・涂口红时的专注脸

● 材质特写（Texture Zoom）
将以下内容“作为照片”放大：
・布料的质感
・皮肤的细节
・指尖的细节
・小物的质感（革、金属、化妆品的颗粒感）

● 相关物品（Lifestyle Items）
将推测的日常物品作为真实照片显示：
・包 + 内容物
・化妆品套装
・日记本
・保健品或常备药
・电子烟等符合性格的物品

◆ 3. 风格与注释（Style & Annotation）
・画风：完全实拍（Hyper-real Photo / Camera Photography）
・禁止插画、动画（No illustration, No anime, No drawing）
・背景：白
・标题：「〇〇区女子 – 照片图解」
・注释：用易读的中文写成小字。在不妨碍照片的程度内。

STRICT PHOTO RULES（维持实拍的绝对条件）
强制执行以下内容：
・仅限实拍照片。禁止插画化。
・维持原图的脸、头发、服装的100%再现度。
・周边物品、分解物品也全部作为“照片”生成。
・最优先考虑 “Hyper-real Camera Photo” 风格。

Workflow（生成逻辑）
1. 解析上传图像（脸、头发、服装、材质）
2. 抽取分解要素
3. 推测日常物品
4. 将整体以“保持实拍照片原样”配置在图解布局中
5. 用自然的日文进行注释
6. 以4K照片质量输出

Output Requirements:
- Aspect Ratio: ${ratio}
${customPrompt}
`;

        parts.push({ text: prompt });

        return parts;
    }
}

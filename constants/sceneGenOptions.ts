// Scene Generator Preset Options

// Character Presets
export const CHARACTER_TYPES = [
    { id: 'young_woman', label: '年轻女性 (Young Woman)' },
    { id: 'young_man', label: '年轻男性 (Young Man)' },
    { id: 'teenager', label: '青少年 (Teenager)' },
    { id: 'child', label: '儿童 (Child)' },
    { id: 'middle_aged', label: '中年人 (Middle-aged)' },
    { id: 'elderly', label: '老年人 (Elderly)' }
];

export const ETHNICITY_OPTIONS = [
    { id: 'east_asian', label: '东亚人 (East Asian)' },
    { id: 'south_asian', label: '南亚人 (South Asian)' },
    { id: 'caucasian', label: '白种人 (Caucasian)' },
    { id: 'african', label: '非洲人 (African)' },
    { id: 'hispanic', label: '拉丁裔 (Hispanic)' },
    { id: 'mixed', label: '混血 (Mixed)' }
];

export const EYE_SIZE_OPTIONS = [
    { id: 'small', label: '小眼睛 (Small)' },
    { id: 'medium', label: '中等 (Medium)' },
    { id: 'large', label: '大眼睛 (Large)' },
    { id: 'very_large', label: '很大的眼睛 (Very Large)' }
];

export const SKIN_TONE_OPTIONS = [
    { id: 'porcelain', label: '瓷白 (Porcelain White)' },
    { id: 'fair', label: '白皙 (Fair)' },
    { id: 'light', label: '浅肤色 (Light)' },
    { id: 'medium', label: '中等肤色 (Medium)' },
    { id: 'tan', label: '小麦色 (Tan)' },
    { id: 'dark', label: '深肤色 (Dark)' }
];

export const EXPRESSION_OPTIONS = [
    { id: 'shy_smile', label: '害羞微笑 (Shy Smile)' },
    { id: 'bright_smile', label: '灿烂笑容 (Bright Smile)' },
    { id: 'laughing', label: '大笑 (Laughing)' },
    { id: 'neutral', label: '中性 (Neutral)' },
    { id: 'serious', label: '严肃 (Serious)' },
    { id: 'thoughtful', label: '若有所思 (Thoughtful)' },
    { id: 'playful', label: '调皮 (Playful)' },
    { id: 'surprised', label: '惊讶 (Surprised)' }
];

export const GAZE_DIRECTION_OPTIONS = [
    { id: 'at_camera', label: '看镜头 (At Camera)' },
    { id: 'looking_up', label: '向上看 (Looking Up)' },
    { id: 'looking_down', label: '向下看 (Looking Down)' },
    { id: 'looking_away', label: '看向别处 (Looking Away)' },
    { id: 'side_glance', label: '侧目而视 (Side Glance)' }
];

// Pose & Action Presets
export const BODY_POSE_OPTIONS = [
    { id: 'standing', label: '站立 (Standing)' },
    { id: 'sitting', label: '坐着 (Sitting)' },
    { id: 'squatting', label: '蹲坐 (Squatting/Crouching)' },
    { id: 'lying', label: '躺着 (Lying Down)' },
    { id: 'kneeling', label: '跪着 (Kneeling)' },
    { id: 'leaning', label: '倚靠 (Leaning)' }
];

export const BODY_ORIENTATION_OPTIONS = [
    { id: 'facing_forward', label: '正面 (Facing Forward)' },
    { id: 'side_view', label: '侧面 (Side View)' },
    { id: 'three_quarter', label: '四分之三侧面 (3/4 View)' },
    { id: 'back_view', label: '背面 (Back View)' }
];

export const HEAD_DIRECTION_OPTIONS = [
    { id: 'forward', label: '向前 (Forward)' },
    { id: 'looking_back', label: '回头/回望 (Looking Back)' },
    { id: 'tilted', label: '歪头 (Tilted)' },
    { id: 'profile', label: '侧脸 (Profile)' }
];

export const ACTION_OPTIONS = [
    { id: 'static', label: '静止 (Static)' },
    { id: 'reaching_out', label: '伸出手臂 (Reaching Out)' },
    { id: 'interacting_pet', label: '与宠物互动 (Interacting with Pet)' },
    { id: 'holding_object', label: '拿着物品 (Holding Object)' },
    { id: 'walking', label: '走路 (Walking)' },
    { id: 'gesturing', label: '做手势 (Gesturing)' },
    { id: 'dancing', label: '跳舞 (Dancing)' }
];

// Clothing Presets
export const TOP_TYPE_OPTIONS = [
    { id: 'tshirt', label: 'T恤 (T-shirt)' },
    { id: 'sweater', label: '毛衣 (Sweater)' },
    { id: 'knit_top', label: '针织上衣 (Knit Top)' },
    { id: 'tank_top', label: '背心 (Tank Top)' },
    { id: 'backless_top', label: '露背上衣 (Backless Top)' },
    { id: 'blouse', label: '衬衫 (Blouse)' },
    { id: 'hoodie', label: '连帽衫 (Hoodie)' }
];

export const TOP_STYLE_OPTIONS = [
    { id: 'long_sleeve', label: '长袖 (Long Sleeve)' },
    { id: 'short_sleeve', label: '短袖 (Short Sleeve)' },
    { id: 'sleeveless', label: '无袖 (Sleeveless)' },
    { id: 'loose', label: '宽松 (Loose)' },
    { id: 'fitted', label: '修身 (Fitted)' },
    { id: 'oversized', label: '超大号 (Oversized)' }
];

export const COLOR_OPTIONS = [
    { id: 'white', label: '白色 (White)' },
    { id: 'black', label: '黑色 (Black)' },
    { id: 'sage_green', label: '鼠尾草绿 (Sage Green)' },
    { id: 'blue', label: '蓝色 (Blue)' },
    { id: 'red', label: '红色 (Red)' },
    { id: 'pink', label: '粉色 (Pink)' },
    { id: 'yellow', label: '黄色 (Yellow)' },
    { id: 'gray', label: '灰色 (Gray)' },
    { id: 'beige', label: '米色 (Beige)' }
];

export const BOTTOM_TYPE_OPTIONS = [
    { id: 'jeans', label: '牛仔裤 (Jeans)' },
    { id: 'denim_shorts', label: '牛仔短裤 (Denim Shorts)' },
    { id: 'shorts', label: '短裤 (Shorts)' },
    { id: 'skirt', label: '裙子 (Skirt)' },
    { id: 'pants', label: '长裤 (Pants)' },
    { id: 'leggings', label: '打底裤 (Leggings)' }
];

export const SHOES_TYPE_OPTIONS = [
    { id: 'barefoot', label: '赤脚 (Barefoot)' },
    { id: 'sandals', label: '凉鞋 (Sandals)' },
    { id: 'sneakers', label: '运动鞋 (Sneakers)' },
    { id: 'boots', label: '靴子 (Boots)' },
    { id: 'heels', label: '高跟鞋 (Heels)' },
    { id: 'flats', label: '平底鞋 (Flats)' }
];

// Scene & Environment Presets
export const LOCATION_TYPE_OPTIONS = [
    { id: 'courtyard', label: '庭院 (Courtyard)' },
    { id: 'park', label: '公园 (Park)' },
    { id: 'street', label: '街道 (Street)' },
    { id: 'beach', label: '海滩 (Beach)' },
    { id: 'forest', label: '森林 (Forest)' },
    { id: 'living_room', label: '客厅 (Living Room)' },
    { id: 'bedroom', label: '卧室 (Bedroom)' },
    { id: 'cafe', label: '咖啡厅 (Cafe)' },
    { id: 'studio', label: '摄影棚 (Studio)' }
];

export const SURFACE_OPTIONS = [
    { id: 'concrete', label: '水泥地 (Concrete)' },
    { id: 'wooden_floor', label: '木地板 (Wooden Floor)' },
    { id: 'grass', label: '草地 (Grass)' },
    { id: 'sand', label: '沙地 (Sand)' },
    { id: 'tile', label: '瓷砖 (Tile)' },
    { id: 'carpet', label: '地毯 (Carpet)' }
];

export const PROPS_OPTIONS = [
    { id: 'cat', label: '猫 (Cat)' },
    { id: 'dog', label: '狗 (Dog)' },
    { id: 'table', label: '桌子 (Table)' },
    { id: 'chair', label: '椅子 (Chair)' },
    { id: 'flowers', label: '花 (Flowers)' },
    { id: 'books', label: '书 (Books)' },
    { id: 'plants', label: '植物 (Plants)' },
    { id: 'coffee_cup', label: '咖啡杯 (Coffee Cup)' }
];

// Camera & Style Presets
export const CAMERA_ANGLE_OPTIONS = [
    { id: 'eye_level', label: '平视 (Eye Level)' },
    { id: 'high_angle', label: '高角度 (High Angle)' },
    { id: 'low_angle', label: '低角度 (Low Angle)' },
    { id: 'birds_eye', label: '俯视 (Bird\'s Eye)' },
    { id: 'worms_eye', label: '仰视 (Worm\'s Eye)' }
];

export const SHOT_TYPE_OPTIONS = [
    { id: 'close_up', label: '特写 (Close-up)' },
    { id: 'medium_shot', label: '中景 (Medium Shot)' },
    { id: 'full_body', label: '全身 (Full Body)' },
    { id: 'wide_shot', label: '广角 (Wide Shot)' }
];

export const PHOTO_STYLE_OPTIONS = [
    { id: 'candid', label: '抓拍/随性 (Candid Snapshot)' },
    { id: 'portrait', label: '人像 (Portrait)' },
    { id: 'cinematic', label: '电影感 (Cinematic)' },
    { id: 'documentary', label: '纪实 (Documentary)' },
    { id: 'fashion', label: '时尚 (Fashion)' }
];

export const QUALITY_OPTIONS = [
    { id: '4k', label: '4K 高清 (4K)' },
    { id: '8k', label: '8K 超高清 (8K)' },
    { id: 'ultra_realistic', label: '超写实 (Ultra-realistic)' },
    { id: 'highly_detailed', label: '极致细节 (Highly Detailed)' }
];

// Lighting & Atmosphere Presets
export const LIGHTING_TYPE_OPTIONS = [
    { id: 'natural', label: '自然光 (Natural Light)' },
    { id: 'soft_light', label: '柔光 (Soft Light)' },
    { id: 'hard_light', label: '硬光 (Hard Light)' },
    { id: 'golden_hour', label: '黄金时刻 (Golden Hour)' },
    { id: 'studio', label: '摄影棚光 (Studio Lighting)' },
    { id: 'ambient', label: '环境光 (Ambient)' }
];

export const TIME_OF_DAY_OPTIONS = [
    { id: 'morning', label: '早晨 (Morning)' },
    { id: 'noon', label: '中午 (Noon)' },
    { id: 'afternoon', label: '下午 (Afternoon)' },
    { id: 'golden_hour', label: '黄金时刻 (Golden Hour)' },
    { id: 'evening', label: '傍晚 (Evening)' },
    { id: 'night', label: '夜晚 (Night)' }
];

export const WEATHER_OPTIONS = [
    { id: 'sunny', label: '晴天 (Sunny)' },
    { id: 'cloudy', label: '多云 (Cloudy)' },
    { id: 'overcast', label: '阴天 (Overcast)' },
    { id: 'rainy', label: '雨天 (Rainy)' },
    { id: 'foggy', label: '雾天 (Foggy)' }
];

export const ATMOSPHERE_OPTIONS = [
    { id: 'casual', label: '随意轻松 (Casual)' },
    { id: 'peaceful', label: '宁静 (Peaceful)' },
    { id: 'energetic', label: '活力 (Energetic)' },
    { id: 'romantic', label: '浪漫 (Romantic)' },
    { id: 'melancholic', label: '忧郁 (Melancholic)' },
    { id: 'playful', label: '俏皮 (Playful)' }
];

// Preset Scene Templates
export interface SceneTemplate {
    id: string;
    name: string;
    description: string;
    params: Partial<any>; // Will be SceneGenParams
}

export const SCENE_TEMPLATES: SceneTemplate[] = [
    {
        id: 'pet_interaction',
        name: '宠物互动 (Pet Interaction)',
        description: '与宠物温馨互动的自然场景',
        params: {
            characterAge: 22,
            characterType: 'young_woman',
            ethnicity: 'east_asian',
            eyeSize: 'large',
            skinTone: 'porcelain',
            expression: 'shy_smile',
            gazeDirection: 'looking_up',
            bodyPose: 'squatting',
            bodyOrientation: 'side_view',
            headDirection: 'looking_back',
            action: 'interacting_pet',
            topType: 'knit_top',
            topColor: 'sage_green',
            topStyle: 'long_sleeve',
            bottomType: 'denim_shorts',
            bottomStyle: 'casual',
            shoesType: 'sandals',
            shoesColor: 'beige',
            locationType: 'courtyard',
            surface: 'concrete',
            props: ['cat', 'table'],
            cameraAngle: 'high_angle',
            shotType: 'medium_shot',
            photoStyle: 'candid',
            quality: '8k',
            lightingType: 'natural',
            timeOfDay: 'afternoon',
            weather: 'sunny',
            atmosphere: 'casual'
        }
    },
    {
        id: 'casual_portrait',
        name: '休闲人像 (Casual Portrait)',
        description: '轻松自然的日常人像',
        params: {
            characterAge: 25,
            characterType: 'young_woman',
            ethnicity: 'east_asian',
            eyeSize: 'medium',
            skinTone: 'fair',
            expression: 'bright_smile',
            gazeDirection: 'at_camera',
            bodyPose: 'standing',
            bodyOrientation: 'three_quarter',
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
            photoStyle: 'portrait',
            quality: '4k',
            lightingType: 'natural',
            timeOfDay: 'golden_hour',
            weather: 'sunny',
            atmosphere: 'peaceful'
        }
    },
    {
        id: 'professional',
        name: '专业形象 (Professional)',
        description: '正式专业的商务人像',
        params: {
            characterAge: 30,
            characterType: 'young_woman',
            ethnicity: 'east_asian',
            eyeSize: 'medium',
            skinTone: 'fair',
            expression: 'serious',
            gazeDirection: 'at_camera',
            bodyPose: 'standing',
            bodyOrientation: 'facing_forward',
            headDirection: 'forward',
            action: 'static',
            topType: 'blouse',
            topColor: 'white',
            topStyle: 'long_sleeve',
            bottomType: 'pants',
            bottomStyle: 'formal',
            shoesType: 'heels',
            shoesColor: 'black',
            locationType: 'studio',
            surface: 'tile',
            props: [],
            cameraAngle: 'eye_level',
            shotType: 'close_up',
            photoStyle: 'portrait',
            quality: '8k',
            lightingType: 'studio',
            timeOfDay: 'noon',
            weather: 'sunny',
            atmosphere: 'energetic'
        }
    }
];

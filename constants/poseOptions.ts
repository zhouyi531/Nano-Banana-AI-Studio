// Pose Transfer Presets

export interface PosePreset {
    id: string;
    name: string;
    description: string;
    category: 'standing' | 'sitting' | 'action' | 'professional' | 'casual' | 'sport';
    imageUrl: string;
    promptDescription: string;
}

export const POSE_CATEGORIES = [
    { id: 'standing', label: 'Standing' },
    { id: 'sitting', label: 'Sitting' },
    { id: 'action', label: 'Action' },
    { id: 'professional', label: 'Professional' },
    { id: 'casual', label: 'Casual' },
    { id: 'sport', label: 'Sport & Fitness' }
];

export const POSE_PRESETS: PosePreset[] = [
    // Standing Poses
    {
        id: 'standing-natural',
        name: 'Natural Standing',
        description: 'Relaxed standing pose with arms at sides',
        category: 'standing',
        imageUrl: '/pose-presets/standing-natural.jpg',
        promptDescription: 'Standing naturally with arms relaxed at sides, weight evenly distributed, facing forward with good posture'
    },
    {
        id: 'standing-arms-crossed',
        name: 'Arms Crossed',
        description: 'Confident pose with arms crossed',
        category: 'standing',
        imageUrl: '/pose-presets/standing-arms-crossed.jpg',
        promptDescription: 'Standing confidently with arms crossed over chest, shoulders back, looking forward'
    },
    {
        id: 'standing-hands-hips',
        name: 'Hands on Hips',
        description: 'Power pose with hands on hips',
        category: 'standing',
        imageUrl: '/pose-presets/standing-hands-hips.jpg',
        promptDescription: 'Standing with hands placed on hips, elbows out to the sides, confident posture'
    },
    {
        id: 'standing-one-hand-pocket',
        name: 'Casual Pocket',
        description: 'Casual pose with one hand in pocket',
        category: 'standing',
        imageUrl: '/pose-presets/standing-pocket.jpg',
        promptDescription: 'Standing casually with one hand in pocket, other arm relaxed, slight weight shift to one leg'
    },

    // Sitting Poses
    {
        id: 'sitting-casual',
        name: 'Casual Sitting',
        description: 'Relaxed sitting position',
        category: 'sitting',
        imageUrl: '/pose-presets/sitting-casual.jpg',
        promptDescription: 'Sitting relaxed on a chair, hands resting on lap or armrests, comfortable posture'
    },
    {
        id: 'sitting-professional',
        name: 'Professional Sitting',
        description: 'Upright professional sitting pose',
        category: 'sitting',
        imageUrl: '/pose-presets/sitting-professional.jpg',
        promptDescription: 'Sitting upright in a chair with good posture, hands clasped or resting on desk, professional demeanor'
    },
    {
        id: 'sitting-cross-legged',
        name: 'Cross-legged',
        description: 'Sitting cross-legged on floor',
        category: 'sitting',
        imageUrl: '/pose-presets/sitting-cross-legged.jpg',
        promptDescription: 'Sitting cross-legged on the floor, hands resting on knees, relaxed meditation-like pose'
    },

    // Action Poses
    {
        id: 'walking-confident',
        name: 'Walking',
        description: 'Mid-stride walking pose',
        category: 'action',
        imageUrl: '/pose-presets/walking.jpg',
        promptDescription: 'Walking forward mid-stride, arms swinging naturally, confident gait'
    },
    {
        id: 'running-action',
        name: 'Running',
        description: 'Dynamic running pose',
        category: 'action',
        imageUrl: '/pose-presets/running.jpg',
        promptDescription: 'Running with body leaning forward, arms pumping, one foot off the ground, dynamic athletic pose'
    },
    {
        id: 'jumping-joy',
        name: 'Jumping',
        description: 'Energetic jumping pose',
        category: 'action',
        imageUrl: '/pose-presets/jumping.jpg',
        promptDescription: 'Jumping in the air with both feet off ground, arms raised, expressing joy and energy'
    },

    // Professional Poses
    {
        id: 'business-handshake',
        name: 'Handshake',
        description: 'Professional handshake pose',
        category: 'professional',
        imageUrl: '/pose-presets/handshake.jpg',
        promptDescription: 'Extended right hand for handshake, standing upright, professional business greeting posture'
    },
    {
        id: 'presentation-gesture',
        name: 'Presentation',
        description: 'Presenting or explaining gesture',
        category: 'professional',
        imageUrl: '/pose-presets/presentation.jpg',
        promptDescription: 'Standing with one or both arms extended in a presenting gesture, engaging body language'
    },
    {
        id: 'thinking-pose',
        name: 'Thinking Pose',
        description: 'Thoughtful contemplative pose',
        category: 'professional',
        imageUrl: '/pose-presets/thinking.jpg',
        promptDescription: 'Standing or sitting with hand on chin in a thoughtful, contemplative pose'
    },

    // Casual Poses
    {
        id: 'leaning-wall',
        name: 'Leaning',
        description: 'Casual lean against wall',
        category: 'casual',
        imageUrl: '/pose-presets/leaning.jpg',
        promptDescription: 'Leaning casually against a wall with shoulder or back, relaxed posture, arms crossed or in pockets'
    },
    {
        id: 'stretching-arms',
        name: 'Stretching',
        description: 'Arms stretched overhead',
        category: 'casual',
        imageUrl: '/pose-presets/stretching.jpg',
        promptDescription: 'Standing with both arms stretched overhead, body slightly arched back, relaxed stretching pose'
    },

    // Sport & Fitness Poses
    {
        id: 'yoga-tree',
        name: 'Tree Pose',
        description: 'Yoga tree balance pose',
        category: 'sport',
        imageUrl: '/pose-presets/yoga-tree.jpg',
        promptDescription: 'Standing on one leg with other foot placed on inner thigh, hands in prayer position at chest or raised overhead, balanced yoga tree pose'
    },
    {
        id: 'yoga-warrior',
        name: 'Warrior Pose',
        description: 'Yoga warrior strength pose',
        category: 'sport',
        imageUrl: '/pose-presets/yoga-warrior.jpg',
        promptDescription: 'Lunging forward with front knee bent, back leg straight, arms extended to sides or overhead, powerful warrior yoga pose'
    },
    {
        id: 'fitness-plank',
        name: 'Plank Position',
        description: 'Fitness plank exercise pose',
        category: 'sport',
        imageUrl: '/pose-presets/plank.jpg',
        promptDescription: 'In plank position with body straight, supported on forearms and toes, core engaged, fitness exercise pose'
    }
];

export const getPosesByCategory = (category: string) => {
    return POSE_PRESETS.filter(pose => pose.category === category);
};

export const getPoseById = (id: string) => {
    return POSE_PRESETS.find(pose => pose.id === id);
};

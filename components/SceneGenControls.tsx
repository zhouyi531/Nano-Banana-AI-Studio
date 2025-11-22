import React, { useState } from 'react';
import { SceneGenParams } from '../types';
import {
    CHARACTER_TYPES, ETHNICITY_OPTIONS, EYE_SIZE_OPTIONS, SKIN_TONE_OPTIONS,
    EXPRESSION_OPTIONS, GAZE_DIRECTION_OPTIONS,
    BODY_POSE_OPTIONS, BODY_ORIENTATION_OPTIONS, HEAD_DIRECTION_OPTIONS, ACTION_OPTIONS,
    TOP_TYPE_OPTIONS, TOP_STYLE_OPTIONS, COLOR_OPTIONS, BOTTOM_TYPE_OPTIONS, SHOES_TYPE_OPTIONS,
    LOCATION_TYPE_OPTIONS, SURFACE_OPTIONS, PROPS_OPTIONS,
    CAMERA_ANGLE_OPTIONS, SHOT_TYPE_OPTIONS, PHOTO_STYLE_OPTIONS, QUALITY_OPTIONS,
    LIGHTING_TYPE_OPTIONS, TIME_OF_DAY_OPTIONS, WEATHER_OPTIONS, ATMOSPHERE_OPTIONS,
    SCENE_TEMPLATES
} from '../constants/sceneGenOptions';

interface SceneGenControlsProps {
    sceneGenParams: SceneGenParams;
    onChange: (params: SceneGenParams) => void;
}

export const SceneGenControls: React.FC<SceneGenControlsProps> = ({
    sceneGenParams,
    onChange
}) => {
    const [activeTab, setActiveTab] = useState<'character' | 'pose' | 'clothing' | 'scene' | 'camera' | 'lighting'>('character');
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const handleTemplateSelect = (templateId: string) => {
        const template = SCENE_TEMPLATES.find(t => t.id === templateId);
        if (template) {
            setSelectedTemplate(templateId);
            onChange({ ...sceneGenParams, ...template.params });
        }
    };

    const handlePropsToggle = (propId: string) => {
        const currentProps = sceneGenParams.props || [];
        const newProps = currentProps.includes(propId)
            ? currentProps.filter(p => p !== propId)
            : [...currentProps, propId];
        onChange({ ...sceneGenParams, props: newProps });
    };

    const tabs = [
        { id: 'character', label: '人物 Character', icon: '👤' },
        { id: 'pose', label: '姿势 Pose', icon: '🤸' },
        { id: 'clothing', label: '服装 Clothing', icon: '👔' },
        { id: 'scene', label: '场景 Scene', icon: '🏞️' },
        { id: 'camera', label: '相机 Camera', icon: '📷' },
        { id: 'lighting', label: '光线 Lighting', icon: '💡' }
    ];

    const SelectField = ({ label, value, options, onChange: onFieldChange }: any) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onFieldChange(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
                {options.map((opt: any) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="space-y-4">
            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-400 mb-2">🎬 网红场景生成器 Influencer Scene Generator</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                    使用预设构建超写实场景。在上方"参考人脸"处上传图片可保持面部特征,或留空从零生成。
                </p>
                <p className="text-xs text-slate-400 mt-1">
                    💡 提示:上传参考人脸后,AI会保持该人物的面部特征,仅根据你的设置生成场景。
                </p>
            </div>

            {/* Preset Templates */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 className="text-sm font-medium text-slate-300 mb-3">📋 预设模板 Templates</h3>
                <div className="grid grid-cols-3 gap-2">
                    {SCENE_TEMPLATES.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => handleTemplateSelect(template.id)}
                            className={`p-2 rounded-lg text-xs transition-all ${selectedTemplate === template.id
                                    ? 'bg-brand-600 text-white'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                        >
                            {template.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-700 pb-2 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-3 py-2 rounded-t-lg text-xs font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-brand-600 text-white'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                            }`}
                    >
                        <span className="mr-1">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {activeTab === 'character' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">年龄 Age</label>
                                <input
                                    type="number"
                                    value={sceneGenParams.characterAge}
                                    onChange={(e) => onChange({ ...sceneGenParams, characterAge: parseInt(e.target.value) })}
                                    min="1"
                                    max="100"
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200"
                                />
                            </div>
                            <SelectField
                                label="类型 Type"
                                value={sceneGenParams.characterType}
                                options={CHARACTER_TYPES}
                                onChange={(val: string) => onChange({ ...sceneGenParams, characterType: val })}
                            />
                        </div>
                        <SelectField
                            label="种族 Ethnicity"
                            value={sceneGenParams.ethnicity}
                            options={ETHNICITY_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, ethnicity: val })}
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <SelectField
                                label="眼睛大小 Eye Size"
                                value={sceneGenParams.eyeSize}
                                options={EYE_SIZE_OPTIONS}
                                onChange={(val: string) => onChange({ ...sceneGenParams, eyeSize: val })}
                            />
                            <SelectField
                                label="肤色 Skin Tone"
                                value={sceneGenParams.skinTone}
                                options={SKIN_TONE_OPTIONS}
                                onChange={(val: string) => onChange({ ...sceneGenParams, skinTone: val })}
                            />
                        </div>
                        <SelectField
                            label="表情 Expression"
                            value={sceneGenParams.expression}
                            options={EXPRESSION_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, expression: val })}
                        />
                        <SelectField
                            label="视线方向 Gaze"
                            value={sceneGenParams.gazeDirection}
                            options={GAZE_DIRECTION_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, gazeDirection: val })}
                        />
                    </div>
                )}

                {activeTab === 'pose' && (
                    <div className="space-y-4">
                        <SelectField
                            label="身体姿势 Body Pose"
                            value={sceneGenParams.bodyPose}
                            options={BODY_POSE_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, bodyPose: val })}
                        />
                        <SelectField
                            label="身体朝向 Orientation"
                            value={sceneGenParams.bodyOrientation}
                            options={BODY_ORIENTATION_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, bodyOrientation: val })}
                        />
                        <SelectField
                            label="头部方向 Head Direction"
                            value={sceneGenParams.headDirection}
                            options={HEAD_DIRECTION_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, headDirection: val })}
                        />
                        <SelectField
                            label="动作 Action"
                            value={sceneGenParams.action}
                            options={ACTION_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, action: val })}
                        />
                    </div>
                )}

                {activeTab === 'clothing' && (
                    <div className="space-y-4">
                        <div className="border-b border-slate-700 pb-3 mb-3">
                            <h4 className="text-xs font-medium text-slate-400 mb-3">上衣 Top</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <SelectField
                                    label="类型 Type"
                                    value={sceneGenParams.topType}
                                    options={TOP_TYPE_OPTIONS}
                                    onChange={(val: string) => onChange({ ...sceneGenParams, topType: val })}
                                />
                                <SelectField
                                    label="颜色 Color"
                                    value={sceneGenParams.topColor}
                                    options={COLOR_OPTIONS}
                                    onChange={(val: string) => onChange({ ...sceneGenParams, topColor: val })}
                                />
                            </div>
                            <div className="mt-3">
                                <SelectField
                                    label="风格 Style"
                                    value={sceneGenParams.topStyle}
                                    options={TOP_STYLE_OPTIONS}
                                    onChange={(val: string) => onChange({ ...sceneGenParams, topStyle: val })}
                                />
                            </div>
                        </div>
                        <div className="border-b border-slate-700 pb-3 mb-3">
                            <h4 className="text-xs font-medium text-slate-400 mb-3">下装 Bottom</h4>
                            <SelectField
                                label="类型 Type"
                                value={sceneGenParams.bottomType}
                                options={BOTTOM_TYPE_OPTIONS}
                                onChange={(val: string) => onChange({ ...sceneGenParams, bottomType: val })}
                            />
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-slate-400 mb-3">鞋子 Shoes</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <SelectField
                                    label="类型 Type"
                                    value={sceneGenParams.shoesType}
                                    options={SHOES_TYPE_OPTIONS}
                                    onChange={(val: string) => onChange({ ...sceneGenParams, shoesType: val })}
                                />
                                <SelectField
                                    label="颜色 Color"
                                    value={sceneGenParams.shoesColor}
                                    options={COLOR_OPTIONS}
                                    onChange={(val: string) => onChange({ ...sceneGenParams, shoesColor: val })}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'scene' && (
                    <div className="space-y-4">
                        <SelectField
                            label="地点类型 Location"
                            value={sceneGenParams.locationType}
                            options={LOCATION_TYPE_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, locationType: val })}
                        />
                        <SelectField
                            label="地面 Surface"
                            value={sceneGenParams.surface}
                            options={SURFACE_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, surface: val })}
                        />
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">道具 Props</label>
                            <div className="grid grid-cols-2 gap-2">
                                {PROPS_OPTIONS.map((prop) => (
                                    <button
                                        key={prop.id}
                                        onClick={() => handlePropsToggle(prop.id)}
                                        className={`px-3 py-2 rounded-lg text-xs transition-all ${sceneGenParams.props?.includes(prop.id)
                                                ? 'bg-brand-600 text-white'
                                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                    >
                                        {prop.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                自定义道具 Custom Props
                            </label>
                            <textarea
                                value={sceneGenParams.customProps || ''}
                                onChange={(e) => onChange({ ...sceneGenParams, customProps: e.target.value })}
                                placeholder="描述额外道具,如:粉色桌布、木质桌子..."
                                rows={2}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 text-sm"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'camera' && (
                    <div className="space-y-4">
                        <SelectField
                            label="相机角度 Angle"
                            value={sceneGenParams.cameraAngle}
                            options={CAMERA_ANGLE_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, cameraAngle: val })}
                        />
                        <SelectField
                            label="镜头类型 Shot Type"
                            value={sceneGenParams.shotType}
                            options={SHOT_TYPE_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, shotType: val })}
                        />
                        <SelectField
                            label="照片风格 Photo Style"
                            value={sceneGenParams.photoStyle}
                            options={PHOTO_STYLE_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, photoStyle: val })}
                        />
                        <SelectField
                            label="质量 Quality"
                            value={sceneGenParams.quality}
                            options={QUALITY_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, quality: val })}
                        />
                    </div>
                )}

                {activeTab === 'lighting' && (
                    <div className="space-y-4">
                        <SelectField
                            label="光线类型 Lighting"
                            value={sceneGenParams.lightingType}
                            options={LIGHTING_TYPE_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, lightingType: val })}
                        />
                        <SelectField
                            label="时间 Time of Day"
                            value={sceneGenParams.timeOfDay}
                            options={TIME_OF_DAY_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, timeOfDay: val })}
                        />
                        <SelectField
                            label="天气 Weather"
                            value={sceneGenParams.weather}
                            options={WEATHER_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, weather: val })}
                        />
                        <SelectField
                            label="氛围 Atmosphere"
                            value={sceneGenParams.atmosphere}
                            options={ATMOSPHERE_OPTIONS}
                            onChange={(val: string) => onChange({ ...sceneGenParams, atmosphere: val })}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

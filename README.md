# PortraitGenius AI / AI人像生成器

[English](#english) | [中文](#chinese)

---

<a name="english"></a>
## 🎨 English

### Overview

**PortraitGenius AI** is a powerful AI-powered portrait generation and transformation tool built with Google's Gemini AI. Create stunning portraits, swap faces, transform styles, design fashion looks, change hairstyles, preview tattoos, and more - all while preserving facial identity.

### ✨ Features

- **🎨 Portrait Generator** - Generate photorealistic portraits with custom styles and scenes
- **🔄 Face Swap** - Seamlessly swap faces between photos
- **✨ Style Converter** - Transform between photo and cartoon/anime styles
- **👔 Fashion Studio** - Try different outfits, hairstyles, and accessories
- **⏳ Age Transformation** - See yourself at any age
- **💇 Hairstyle Changer** - Preview different hairstyles instantly
- **💉 Tattoo Preview** - Visualize tattoos on your body before getting inked

### 📸 Examples

#### Portrait Generation
![Portrait Example 1](examples/屏幕截图%202025-11-21%20200423.jpg)
![Portrait Example 2](examples/屏幕截图%202025-11-21%20201203.jpg)

#### Face Swap & Style Transfer
![Face Swap Example](examples/屏幕截图%202025-11-21%20201310.jpg)
![Style Transfer Example](examples/屏幕截图%202025-11-21%20230445.jpg)

#### Fashion Studio
![Fashion Example 1](examples/屏幕截图%202025-11-21%20230516.jpg)
![Fashion Example 2](examples/屏幕截图%202025-11-21%20230656.jpg)

#### Hairstyle Transformation
![Hairstyle Example 1](examples/屏幕截图%202025-11-21%20230753.jpg)
![Hairstyle Example 2](examples/屏幕截图%202025-11-21%20230922.jpg)

#### Tattoo Preview
![Tattoo Example 1](examples/屏幕截图%202025-11-21%20232708.jpg)
![Tattoo Example 2](examples/屏幕截图%202025-11-21%20232745.jpg)
![Tattoo Example 3](examples/屏幕截图%202025-11-21%20232902.jpg)

### 🚀 Installation

#### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

#### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AI_Portrait_Gen_By_Gemini.git
   cd AI_Portrait_Gen_By_Gemini
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure API Key**
   
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the application**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:3001`

### 📖 Usage

1. **Select a Mode** - Choose from 7 different AI modes (Portrait, Face Swap, Converter, Fashion, Age, Hairstyle, Tattoo)

2. **Upload Reference Image** - Upload a clear photo of the face you want to use

3. **Customize Settings** - Depending on the mode:
   - Portrait: Select preset styles or write custom prompts
   - Face Swap: Upload target scene and specify which face to replace
   - Style Converter: Choose between photo-to-cartoon or cartoon-to-photo
   - Fashion: Select clothing, hairstyle, accessories from presets or custom
   - Age: Adjust target age slider
   - Hairstyle: Browse styles or use quick presets
   - Tattoo: Choose body position and design

4. **Generate** - Click the generate button and wait for AI to create your image

5. **Download** - Hover over the result and click download to save

### 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.5 Flash & Gemini 3 Pro
- **Backend**: Express.js (for image storage)

### 📝 License

MIT License - feel free to use for personal or commercial projects

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<a name="chinese"></a>
## 🎨 中文

### 概述

**PortraitGenius AI（AI人像生成器）** 是一款基于 Google Gemini AI 的强大人像生成和转换工具。可以创建精美的人像、换脸、风格转换、时尚设计、发型更换、纹身预览等功能，同时完美保持面部特征。

### ✨ 功能特色

- **🎨 人像生成器** - 使用自定义风格和场景生成逼真的人像照片
- **🔄 人脸替换** - 在不同照片间无缝替换人脸
- **✨ 风格转换** - 在真实照片和卡通/动漫风格间转换
- **👔 时尚工作室** - 尝试不同的服装、发型和配饰
- **⏳ 年龄变换** - 查看自己在任何年龄的样子
- **💇 发型更换** - 即时预览不同发型效果
- **💉 纹身预览** - 在纹身前可视化纹身在身体上的效果

### 📸 示例展示

#### 人像生成
![人像示例 1](examples/屏幕截图%202025-11-21%20200423.jpg)
![人像示例 2](examples/屏幕截图%202025-11-21%20201203.jpg)

#### 换脸与风格转换
![换脸示例](examples/屏幕截图%202025-11-21%20201310.jpg)
![风格转换示例](examples/屏幕截图%202025-11-21%20230445.jpg)

#### 时尚工作室
![时尚示例 1](examples/屏幕截图%202025-11-21%20230516.jpg)
![时尚示例 2](examples/屏幕截图%202025-11-21%20230656.jpg)

#### 发型转换
![发型示例 1](examples/屏幕截图%202025-11-21%20230753.jpg)
![发型示例 2](examples/屏幕截图%202025-11-21%20230922.jpg)

#### 纹身预览
![纹身示例 1](examples/屏幕截图%202025-11-21%20232708.jpg)
![纹身示例 2](examples/屏幕截图%202025-11-21%20232745.jpg)
![纹身示例 3](examples/屏幕截图%202025-11-21%20232902.jpg)

### 🚀 安装步骤

#### 前置要求

- Node.js (v16 或更高版本)
- npm 或 pnpm
- Google Gemini API 密钥 ([在此获取](https://aistudio.google.com/app/apikey))

#### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/AI_Portrait_Gen_By_Gemini.git
   cd AI_Portrait_Gen_By_Gemini
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或者
   pnpm install
   ```

3. **配置 API 密钥**
   
   在根目录创建 `.env` 文件：
   ```env
   GEMINI_API_KEY=你的_gemini_api_密钥
   ```

4. **启动应用**
   ```bash
   npm run dev
   # 或者
   pnpm run dev
   ```

5. **在浏览器中打开**
   
   访问 `http://localhost:3001`

### 📖 使用说明

1. **选择模式** - 从7种不同的AI模式中选择（人像、换脸、转换器、时尚、年龄、发型、纹身）

2. **上传参考图片** - 上传一张清晰的人脸照片作为参考

3. **自定义设置** - 根据不同模式：
   - 人像：选择预设风格或编写自定义提示词
   - 换脸：上传目标场景并指定要替换的人脸
   - 风格转换：选择照片转卡通或卡通转照片
   - 时尚：从预设或自定义中选择服装、发型、配饰
   - 年龄：调整目标年龄滑块
   - 发型：浏览发型样式或使用快速预设
   - 纹身：选择身体位置和设计

4. **生成** - 点击生成按钮，等待AI创建图片

5. **下载** - 将鼠标悬停在结果上并点击下载保存

### 🛠️ 技术栈

- **前端**: React 19, TypeScript, Vite
- **样式**: Tailwind CSS
- **AI**: Google Gemini 2.5 Flash & Gemini 3 Pro
- **后端**: Express.js (用于图片存储)

### 📝 许可证

MIT 许可证 - 可自由用于个人或商业项目

### 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

如果您觉得这个项目有用，请考虑给它一个星标！⭐

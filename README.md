# 🐴 马生模拟器 2026 (Job Life Simulator)

> "2026人生重开模拟器，用荒诞选择鉴定你的职场人设。"

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack](https://img.shields.io/badge/Stack-React_Vite_Supabase-blue)](https://vitejs.dev/)

一个基于 **React**, **Vite**, **Supabase** 和 **Pixel Art** 风格构建的荒诞职场生存模拟器。在这个游戏中，你将扮演一名普通的职场人，通过一系列“致命”的二选一抉择，最终揭示你的职场命运——是进化成“战马”，还是沦为“马卡笼”？

![Cover](public/og-image.png)

![Cover](public/og-image.png)

## 🌐 在线体验 (Live Demo)

| 方式 (Platform) | 入口 (Entry) | 说明 (Note) |
| :--- | :--- | :--- |
| **📱 微信 (WeChat)** | ![QR Code](public/images/wechat_qr.png)<br>[点击跳转 (Click to Open)](http://43041ee0dcc54e09916a60006eb925c6.ap-singapore.myide.io) | **推荐！** 请使用微信扫码，或在微信内打开链接体验。 |
| **💻 网页 (Web)** | [https://cenima.lovable.app](https://cenima.lovable.app) | 浏览器/桌面端访问。 |

## ✨ 特性 (Features)

- **🕹️ 像素风交互 (Retro Pixel UI)**: 全站采用怀旧 8-bit 视觉风格，配合 CRT 显示器特效。
- **🎲 荒诞叙事 (Absurdist Storytelling)**: 包含 "带薪拉屎", "AI 觉醒", "股市熔断" 等 50+ 个讽刺现实的随机事件。
- **📊 四维属性系统 (4-Stats System)**:
  - 💰 **Money**: 你的存款（通常是负的）
  - 💇 **Hair**: 你的发量（程序员的核心资产）
  - 🧠 **IQ**: 你的智商（偶尔由于熬夜而离线）
  - 😀 **Happiness**: 你的快乐值（摸鱼时最高）
- **🏆 15+ 种结局鉴定**: 根据你的属性，生成“皇阿马”、“白聋马”、“爱马仕”等专属人设报告。
- **📱 PWA 支持**: 支持安装到手机，提供原生 App 般的沉浸体验。
- **🎨 动态分享卡片**: 一键生成带有你专属人设和“测你马”二维码的像素风战绩卡片。

## 🛠️ 技术栈 (Tech Stack)

- **Runtime**: [Bun](https://bun.sh) / Node.js
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Backend (BaaS)**: [Supabase](https://supabase.com/) (Database, Auth)
- **State Management**: React Query
- **Analytics**: Google Analytics 4 (Optional)

## 🚀 快速开始 (Getting Started)

### 1. 环境准备

确保你的本地已安装 Node.js (v18+) 或 Bun。

### 2. 克隆项目

```bash
git clone https://github.com/tangchunwu/shabi.git
cd shabi
```

### 3. 安装依赖

```bash
# 使用 npm
npm install

# 或者使用 bun (推荐)
bun install
```

### 4. 环境变量配置 (⚠️ 重要)

本项目依赖 Supabase 作为后端服务。你需要创建一个 Supabase 项目并获取相应的 API Keys。

复制 `.env.example` 为 `.env`：

```bash
cp .env.example .env
```

填入你的配置信息：

```ini
# Supabase 配置 (必须)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id

# Google Analytics (可选)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# 本地调试地址
VITE_APP_URL=http://localhost:5173
```

> **注意**: 切勿将包含真实 Key 的 `.env` 文件提交到代码仓库！

### 5. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 `http://localhost:5173` 即可开始体验。

## 🤝 贡献 (Contributing)

欢迎提交 Issue 和 Pull Request！如果你有更有趣的“职场梗”或“事件创意”，请直接在 Issue 中留言，我们会考虑加入到事件库中。

## 📄 开源协议 (License)

[MIT License](LICENSE)

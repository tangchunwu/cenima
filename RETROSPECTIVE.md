# 项目复盘 (RETROSPECTIVE)

## 2026-01-29：视觉与交互优化阶段

### 遇到的挑战 (Challenges)
1. **组件定位困难**：用户提供的截图中包含特定文本（如“马格分裂”），但在源代码中直接搜索未命中。
   - **原因**：项目使用了 i18n 国际化，文本存储在 `translations.ts` 中。
   - **解决**：先搜索翻译文件找到 key，再反向查找使用该 key 的组件 (`MemoryCleaner.tsx`)。

2. **水花特效遮挡**：`SplashCursor` 组件默认层级 (`z-index: 50`) 过高，导致其覆盖在页面文字之上，干扰阅读。

3. **暗色模式下的可读性**：在极暗背景下，默认的 placeholder 颜色（如 `red-900/30`）对比度严重不足，导致用户无法看清提示文字。

### 解决方案 (Solutions)
1. **层级重构**：
   - 建立清晰的 Z-Index 规范：背景层 (-10) < 特效层 (0) < 内容层 (10+)。
   - 将背景样式统一移除并下沉至全局 `App.tsx`。

2. **对比度增强**：
   - 将输入框 placeholder 颜色调整为半透明白色 (`white/50`) 或高亮色，确保在深色背景下清晰可见。
   - 提升水花特效的亮度系数 (0.15 -> 0.8)，使其在深色背景下更具表现力。

### 新学到的知识 (Learnings)
- **i18n 项目调试**：在多语言项目中调试 UI 问题时，应优先检查翻译文件作为入口。
- **视觉层级管理**：全局背景特效（如粒子、流体）应始终置于 DOM 结构的最底层或使用负 z-index，以避免干扰交互元素。
- **暗黑模式设计**：输入框的占位符文本在暗黑模式下需要更高的不透明度（>40%）才能保证良好的可访问性。
Phase 3 content update

## 2026-01-29：Phase 3 - 工程化与深度打磨 (Engineering & Polish)

### 1. 新词汇与内容体系 (Content Expansion)
为了解决原版“内容单薄”的问题，我们构建了一个基于“讽刺现实”的事件库。

- **核心词汇库 (New Vocabulary)**：
  - **人设标签**：“战马”（内卷赢家）、“白聋马”（职场装死）、“马bee”（苦逼乙方）、“皇阿马”（把自己当皇帝）、“爱马仕”（精致穷）、“马卡笼”（倒霉蛋）。
  - **事件梗**：“带薪拉屎”、“冲动辞职”、“把AI拔电源”、“用阳寿换钱”、“深夜emo”。
- **架构设计**：
  - 将事件分为 `Work` (职场), `Social` (社交), `Life` (生活), `Random` (随机) 四大类。
  - 每个事件包含互斥选项 (A/B)，分别对应 `Money`, `Happiness`, `Hair` (发量), `IQ` 四维属性的增减。
  - **挑战**：如何让简单的数值游戏具备叙事感？
  - **解决**：引入 `regret` (悔恨) 和 `wish` (愿望) 机制，配合 **Retro Terminal** 风格的启动动画，营造“人生重开”的仪式感。

### 2. 全链路数据埋点 (Analytics System)
从零构建了轻量级的数据追踪体系，为后续产品迭代提供依据。

- **数据漏斗 (Funnel)**：
  1. `APP_OPEN` (应用启动)
  2. `START_GAME` (点击开始)
  3. `EVENT_CHOICE` (每次做选择 - 记录偏好)
  4. `SURVEY_COMPLETE` (游戏完成 - 记录结果Tag)
  5. `SHARE_CLICK` (点击分享/生成图片)
- **技术实现**：
  - 封装 `trackEvent(event, props)` 函数，目前只在 Console 打印 (Dev模式)，生产环境预留接口接入 PostHog 或 Google Analytics。
  - **隐私考量**：不收集用户具体输入内容（如具体的愿望文本），只统计行为类型。

### 3. 动态 SEO (Dynamic SEO)
为了增强在社交媒体（微信、Twitter）的传播效果，实现了动态 Meta 信息。

- **动态标题**：页面 Title 不再是静态的 "Shabi Remake"，而是变为 `确诊: 战马 | 2026人设报告`。
- **技术栈**：`react-helmet-async`。
- **实现细节**：
  - 封装 `<DynamicSEO />` 组件。
  - 分状态渲染：
    - 首页：`2026 牛马人生重开模拟器`
    - 结果页：`确诊: [人设名] | 你的2026年度报告`
    - 反应页：`经过诊断，我的年度人格是...`
- **移动端适配**：
  - 增加了 `<meta name="theme-color" content="#020617" />`，让 Safari 顶部地址栏颜色与页面背景融为一体，实现类似 Native App 的沉浸感。

### 遇到的挑战 (Challenges) & 解决方案
- **Tailwind 动态类名失效**：
  - **问题**：尝试使用 `bg-[${hexColor}]` 动态生成渐变背景时，Tailwind JIT 无法在编译时捕获这些动态值，导致样式失效（透明）。
  - **解决**：放弃在动态场景下使用 Tailwind 类名，回归原生 `style={{ backgroundImage: ... }}` 内联样式，直接操作 Hex 颜色值。

- **SystemBootLoader 国际化**：
  - **问题**：原版启动日志是纯英文，与游戏“接地气”的中文风格割裂。
   - **解决**：重写日志文案，采用“中英双语”或“伪技术黑话”（如“挂载灵魂分区”），既保留极客感又降低阅读门槛。

## 2026-01-29：Phase 4 - 上线准备 (Launch Preparation)

### 已完成里程碑 (Milestones Achieved)
1. **PWA 支持 (Progressive Web App)**
   - 创建了 `manifest.json` 与标准图标 (192x192, 512x512)。
   - 应用现已支持“添加到主屏幕”，在移动端拥有接近原生 App 的全屏体验。
   - 优化了 Meta 标签，提升 SEO 与社交分享体验 (Open Graph)。

2. **数据埋点 (Analytics)**
   - 成功接入 **PostHog**。
   - 实现了精细化的漏斗追踪：`APP_OPEN` -> `START_GAME` -> `EVENT_CHOICE` -> `GAME_COMPLETE` -> `SHARE_CLICK`。
   - 区分了 Dev/Prod 环境，确保开发数据不污染线上大盘。

3. **法律与合规 (Legal)**
   - 创建了 `/privacy` 页，明确告知用户“不收集敏感信息”，为应用上架或小程序审核扫清障碍。

4. **内容补全 (Content)**
   - 识别出 10+ 个缺失配图的 Random 类事件。
   - 成功生成并应用了 8 张 **简体中文像素风** 配图（包括：诈骗电话、手机掉厕所、加班、UFO 等）。
   - 风格统一为 "Absurdist Pixel Art"，强化了游戏的讽刺幽默感。

### 遇到的挑战 (Challenges)
1. **API 配额限制 (Rate Limiting)**
   - **问题**：在批量生成图片时，触发了 `429 Too Many Requests` 和 `503 Service Unavailable` 错误。
   - **影响**：导致最后两张图片（股市熔断、网红梦）未能生成。
   - **解决**：
     - 调整策略，分批次生成。
     - 优先保证核心高频事件的配图。
     - 在 `LAUNCH_CHECKLIST.md` 中标记待办，等待配额恢复后补全。

2. **TypeScript 类型定义**
   - **问题**：新事件引入了 `social` 和 `health` 属性，但原 `LifeEvent` 接口未定义这两个字段，导致构建报错。
   - **解决**：快速重构 `events.ts` 中的接口定义，将所有属性字段（money, hair, iq, happiness, social, health）设为可选，增强了系统的扩展性。

### 下一步计划 (Next Steps)
1. **等待配额恢复**：补全剩余 2 张配图。
2. **代码合并**：将 `feature/pwa-support` 分支合并至主分支。
3. **最终部署**：部署到 Vercel/Netlify 生产环境。

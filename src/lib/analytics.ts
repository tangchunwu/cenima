// Analytics Wrapper
// 统一管理所有埋点事件，已接入 PostHog

import posthog from 'posthog-js';

// 初始化 PostHog（仅生产环境）
const POSTHOG_KEY = 'phx_15JtpzYnnHaZbcXUt9eMhaPvwhgxFDT30eGgWQ9JBHki8Ucw';
const POSTHOG_HOST = 'https://us.i.posthog.com'; // 或 'https://eu.i.posthog.com' 如果是欧洲区

if (!import.meta.env.DEV) {
       posthog.init(POSTHOG_KEY, {
              api_host: POSTHOG_HOST,
              loaded: (posthog) => {
                     // 可选：自动追踪页面访问
                     posthog.capture('$pageview');
              },
              autocapture: false, // 关闭自动采集，我们手动控制
              capture_pageview: false, // 我们在 loaded 里手动触发
       });
}

export const AnalyticsEvents = {
       // 核心漏斗
       APP_OPEN: 'app_open', // 进入首页
       START_GAME: 'start_game', // 点击开始
       CAMP_SELECTED: 'camp_selected', // 选择阵营
       GAME_COMPLETE: 'game_complete', // 游戏结束（所有题目做完）
       RESULT_VIEWED: 'result_viewed', // 看到结果页

       // 交互行为
       EVENT_CHOICE: 'event_choice', // 每一题的选择
       POKEDEX_OPEN: 'pokedex_open', // 打开图鉴
       SHARE_CLICK: 'share_click', // 点击分享
       BATTLE_INITIATED: 'battle_initiated', // 发起挑战
       RETEST: 'retest', // 重测

       // 彩蛋
       EGG_FOUND: 'egg_found', // 发现彩蛋
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
       // 1. 开发环境打 Log
       if (import.meta.env.DEV) {
              console.log(`[Analytics DEV] ${eventName}`, properties);
              return;
       }

       // 2. 生产环境上报到 PostHog
       try {
              posthog.capture(eventName, properties);
       } catch (e) {
              console.warn('Analytics Error:', e);
       }
};

// 用户身份识别（可选，用于追踪回头客）
export const identifyUser = (userId: string, traits?: Record<string, any>) => {
       if (!import.meta.env.DEV) {
              posthog.identify(userId, traits);
       }
};

// 重置用户（用于登出或重新测试）
export const resetUser = () => {
       if (!import.meta.env.DEV) {
              posthog.reset();
       }
};

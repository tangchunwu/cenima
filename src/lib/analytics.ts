// Analytics Wrapper
// 统一管理所有埋点事件，方便未来接入 PostHog / Google Analytics

const isDev = import.meta.env.DEV;

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

       // 鸡蛋里挑骨头
       EGG_FOUND: 'egg_found', // 发现彩蛋
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
       // 1. 开发环境打 Log
       if (isDev) {
              console.groupCollapsed(`[Analytics] 📊 ${eventName}`);
              console.log('Properties:', properties);
              console.groupEnd();
       }

       // 2. 生产环境上报 (占位符)
       // TODO: Initialize PostHog or GA here
       try {
              // Example: window.posthog?.capture(eventName, properties);
              // Example: window.gtag?.('event', eventName, properties);
       } catch (e) {
              console.warn('Analytics Error:', e);
       }
};


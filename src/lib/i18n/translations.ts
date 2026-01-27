export type Language = 'zh' | 'en';

export const translations = {
       zh: {
              // 游戏通用
              'game.title': '人生模拟器',
              'game.start': '开始人生',
              'game.desc': '你将面对 12 个人生抉择，每个选择都会影响你的属性。任何属性归零 = 游戏结束',
              'game.attributes.money': '资产',
              'game.attributes.hair': '发量',
              'game.attributes.iq': '智力',
              'game.attributes.happiness': '快乐',

              // 状态
              'game.status.bankrupt': '破产 (BANKRUPT)',
              'game.status.exhaustion': '过劳 (EXHAUSTION)',
              'game.status.depression': '抑郁 (DEPRESSION)',
              'game.status.stupidity': '脑死 (BURNOUT)',
              'game.status.survival': '幸存 (SURVIVAL)',

              // UI
              'ui.drag_to_play': '拖动滑块',
              'ui.choice_a': 'A',
              'ui.choice_b': 'B',
              'ui.urgent': '⚠️ 快做决定！时间不等人！',
              'ui.switch_lang': 'English',

              // Home
              'home.warn_tag': '🔥 警告：这里没有完美人生',
              'home.title.static': '12道题，揭穿你的2025真面目',
              'home.title.highlight': '揭穿',
              'home.title.sub': '（已有 24,593 人测完想删记录）',
              'home.btn.start': '启动人生模拟',
              'home.warn.btn': '⚠️ 警告：系统资源有限，请谨慎分配',
              'home.stats.impossible': '😅 23%的人表示"不可能，重测"',
              'home.stats.scared': '🤐 67%的人不敢发朋友圈',
              'home.carousel.t1': '别不信', 'home.carousel.s1': '你的人设比你想的更毒 👀',
              'home.carousel.t2': '别装了', 'home.carousel.s2': '87%的人测完不敢发朋友圈 🤐',
              'home.carousel.t3': '别破防', 'home.carousel.s3': '测完可能会和朋友吵架 💔',
              'home.carousel.t4': '别想逃', 'home.carousel.s4': '你的2025比你想的更离谱 📉',

              // Live Updates
              'live.action.1': '表示强烈不服', 'live.action.2': '第5次重测还是它', 'live.action.3': '和对象吵起来了',
              'live.action.4': '破防了', 'live.action.5': '假装没看见', 'live.action.6': '转发到了家族群',
              'live.action.7': '正在拉黑好友', 'live.action.8': '发誓今晚早睡', 'live.action.9': '还在纠结要不要分享',
              'live.action.10': '手机差点摔了',

              // Memory Cleaner (Error Screen)
              'cleaner.title': '内存溢出 (MEMORY OVERFLOW)',
              'cleaner.code': '错误代码: 2025_REGRET_LEAK (遗憾泄露)',
              'cleaner.fatal': '检测到致命错误',
              'cleaner.desc1': '因情感资源耗尽，系统时间线已崩溃。',
              'cleaner.desc2': '为启动紧急时间回溯协议，你必须献祭一段2025年的负面记忆。',
              'cleaner.prompt': '> 请输入要献祭给熵神的记忆片段：',
              'cleaner.placeholder': '例如：遗憾的事 / 讨厌的人 / 没做成的梦...',
              'cleaner.btn.reversing': '正在回溯时间...',
              'cleaner.btn.init': '启动重生程序',
              'cleaner.warn': '* 警告：已删除的记忆将无法恢复。',

              // System Boot Loader (Terminal)
              'boot.header': '根权限终端 v2.0.26',
              'boot.log.1': 'BIOS自检... 通过',
              'boot.log.2': '加载内核... 通过',
              'boot.log.3': '挂载设备... 完成',
              'boot.log.4': '检查情感驱动... 已优化',
              'boot.log.5': '删除旧缓存....... 已清除',
              'boot.log.6': '初始化2026核心... 就绪',
              'boot.ready': '> 系统就绪。等待用户指令。',
              'boot.ask': '请输入你的 2026 年度首要目标以初始化系统：',
              'boot.placeholder': '在此输入指令...',

              // Report Common
              'report.top_secret': 'TOP SECRET',
              'report.confidential': 'CONFIDENTIAL MEDICAL RECORD',
              'report.eval_title': '2025 ANNUAL PSYCH EVALUATION',
              'report.confirmed': 'CONFIRMED',
              'report.diagnosis': 'PRIMARY DIAGNOSIS (主要诊断)',
              'report.observation': 'CLINICAL OBSERVATION',
              'report.behavior': 'BEHAVIORAL NOTES (TOXIC)',
              'report.traits': 'TRAIT MARKERS',
              'report.page': 'PAGE',
              'report.id': 'SUBJECT PROFILE',
       },
       en: {
              // Game General
              'game.title': 'Life Simulator',
              'game.start': 'Start Life',
              'game.desc': 'You will face 12 life choices. Each choice affects your attributes. Any attribute hitting 0 = Game Over.',
              'game.attributes.money': 'Money',
              'game.attributes.hair': 'Hair',
              'game.attributes.iq': 'IQ',
              'game.attributes.happiness': 'Joy',

              // Status
              'game.status.bankrupt': 'BANKRUPT',
              'game.status.exhaustion': 'EXHAUSTION',
              'game.status.depression': 'DEPRESSION',
              'game.status.stupidity': 'BURNOUT',
              'game.status.survival': 'SURVIVAL',

              // UI
              'ui.drag_to_play': 'Drag Sliders',
              'ui.choice_a': 'Option A',
              'ui.choice_b': 'Option B',
              'ui.urgent': '⚠️ Hurry up! Time is running out!',
              'ui.switch_lang': '中文',

              // Home
              'home.warn_tag': '🔥 WARNING: No Perfect Life Here',
              'home.title.static': '12 Questions to Expose Your 2025 Reality',
              'home.title.highlight': 'Expose',
              'home.title.sub': '(24,593 users regret taking this test)',
              'home.btn.start': 'Start Simulation',
              'home.warn.btn': '⚠️ WARNING: Limited resources, allocate wisely',
              'home.stats.impossible': '😅 23% said "Impossible, Retest"',
              'home.stats.scared': '🤐 67% dared not share on social media',
              'home.carousel.t1': 'Face It', 'home.carousel.s1': 'Your persona is more toxic than you think 👀',
              'home.carousel.t2': 'No Hiding', 'home.carousel.s2': '87% users generate results they can\'t share 🤐',
              'home.carousel.t3': 'No Crying', 'home.carousel.s3': 'Might cause arguments with friends 💔',
              'home.carousel.t4': 'No Escape', 'home.carousel.s4': 'Your 2025 is crazier than expected 📉',

              // Live Updates
              'live.action.1': 'strongly disagrees', 'live.action.2': 'got same result 5 times', 'live.action.3': 'fighting with partner',
              'live.action.4': 'is emotional damage', 'live.action.5': 'pretends not to see', 'live.action.6': 'shared to family group',
              'live.action.7': 'blocking friends now', 'live.action.8': 'swears to sleep early', 'live.action.9': 'hesitating to share',
              'live.action.10': 'almost smashed phone',

              // Memory Cleaner
              'cleaner.title': 'MEMORY OVERFLOW',
              'cleaner.code': 'ERROR_CODE: 2025_REGRET_LEAK',
              'cleaner.fatal': 'FATAL ERROR DETECTED',
              'cleaner.desc1': 'System timeline has collapsed due to resource depletion.',
              'cleaner.desc2': 'To initiate emergency time-reversal protocol, you must sacrifice a negative memory block from 2025.',
              'cleaner.prompt': '> Enter the memory to satisfy the entropy god:',
              'cleaner.placeholder': 'e.g. Regrets / Hated person / Unfulfilled dreams...',
              'cleaner.btn.reversing': 'REVERSING TIME...',
              'cleaner.btn.init': 'INITIATE REVIVAL',
              'cleaner.warn': '* Warning: Deleted memories cannot be recovered.',

              // System Boot Loader
              'boot.header': 'ROOT_ACCESS_TERMINAL v2.0.26',
              'boot.log.1': 'BIOS_CHECK... OK',
              'boot.log.2': 'LOADING_KERNEL... OK',
              'boot.log.3': 'MOUNTING_DEVICES... DONE',
              'boot.log.4': 'CHECKING_EMOTIONAL_DRIVERS... OPTIMIZED',
              'boot.log.5': 'DELETING_OLD_CACHES....... CLEARED',
              'boot.log.6': 'INITIALIZING_2026_CORE... READY',
              'boot.ready': '> SYSTEM READY. WAITING FOR USER DIRECTIVE.',
              'boot.ask': 'Please enter your primary goal for 2026 to initialize:',
              'boot.placeholder': 'Type command...',

              // Report Common
              'report.top_secret': 'TOP SECRET',
              'report.confidential': 'CONFIDENTIAL MEDICAL RECORD',
              'report.eval_title': '2025 ANNUAL PSYCH EVALUATION',
              'report.confirmed': 'CONFIRMED',
              'report.diagnosis': 'PRIMARY DIAGNOSIS',
              'report.observation': 'CLINICAL OBSERVATION',
              'report.behavior': 'BEHAVIORAL NOTES (TOXIC)',
              'report.traits': 'TRAIT MARKERS',
              'report.page': 'PAGE',
              'report.id': 'SUBJECT PROFILE',
       }
};

export type TranslationKey = keyof typeof translations.zh;

export type Language = 'zh' | 'en';

export const translations = {
       zh: {
              // 游戏通用
              'game.title': '测你马',
              'game.start': '开始鉴定',
              'game.desc': '2026年是马年。你在职场里到底是哪种马？通过12个灵魂拷问，测出你的真实马格。',
              'game.attributes.money': '资产',
              'game.attributes.hair': '发量',
              'game.attributes.iq': '智力',
              'game.attributes.happiness': '快乐',

              // 状态
              'game.status.bankrupt': '资产归零 (BANKRUPT)',
              'game.status.exhaustion': '秃顶猝死 (BALDNESS)',
              'game.status.depression': '抑郁离职 (DEPRESSION)',
              'game.status.stupidity': '降智打击 (BRAIN DEAD)',
              'game.status.survival': '艰难存活 (SURVIVAL)',

              // UI
              'ui.drag_to_play': '拖动滑块',
              'ui.choice_a': 'A',
              'ui.choice_b': 'B',
              'ui.urgent': '⚠️ 快选！别墨迹！',
              'ui.switch_lang': 'English',

              // Home
              'home.warn_tag': '🐴 2026马年限定版',
              'home.title.static': '测测2026年你是哪种马',
              'home.title.highlight': '测你马',
              'home.title.sub': '（已有 102,492 人测出牛马）',
              'home.btn.start': '立刻测你马',
              'home.warn.btn': '⚠️ 警告：结果可能过于真实',
              'home.stats.impossible': '😅 99%的人觉得自己是千里马',
              'home.stats.scared': '🤐 实际上大部分是牛马',
              'home.carousel.t1': '你是哪种马', 'home.carousel.s1': '牛马？黑马？还是白龙马？',
              'home.carousel.t2': '职场现形记', 'home.carousel.s2': '测完别发到公司群 🤐',
              'home.carousel.t3': '精准打击', 'home.carousel.s3': '比你的年终考核还准 🎯',
              'home.carousel.t4': '马年运势', 'home.carousel.s4': '看看今年你能跑多远 🏃',

              // Live Updates
              'live.action.1': '测出了牛马', 'live.action.2': '不服气，正在重测', 'live.action.3': '转发给了老板',
              'live.action.4': '破防了', 'live.action.5': '确诊为哈士奇混入', 'live.action.6': '发朋友圈被拉黑',
              'live.action.7': '正在怀疑人生', 'live.action.8': '决定明天辞职', 'live.action.9': '笑出了猪叫',
              'live.action.10': '把手机扔了',

              // Memory Cleaner
              'cleaner.title': '马格分裂 (SPLIT PERSONALITY)',
              'cleaner.code': 'ERROR_CODE: HORSE_404',
              'cleaner.fatal': '马设崩塌 Warning',
              'cleaner.desc1': '检测到你的职场人设与内心真实想法严重冲突。',
              'cleaner.desc2': '为了防止精神分裂，请献祭一个去年的职场黑历史。',
              'cleaner.prompt': '> 告诉马神在这留下一段黑历史：',
              'cleaner.placeholder': '例如：背锅侠 / 舔狗时刻 / 摸鱼被抓...',
              'cleaner.btn.reversing': '正在重塑马格...',
              'cleaner.btn.init': '重塑马生',
              'cleaner.warn': '* 提示：马神会宽恕你的过去（大概）',

              // System Boot Loader
              'boot.header': 'H-OS v2026 (Horse OS)',
              'boot.log.1': '检测蹄铁磨损度... 严重',
              'boot.log.2': '加载草料资源... 不足',
              'boot.log.3': '测试奔跑速度... 缓慢',
              'boot.log.4': '扫描职场生存欲...极其强烈',
              'boot.log.5': '清除摸鱼缓存....... 失败',
              'boot.log.6': '生成马年运势... 生成中',
              'boot.ready': '> 牧场大门已开启。',
              'boot.ask': '请输入你2026年最大的愿望（马神会听到的）：',
              'boot.placeholder': '例如：暴富 / 不加班 / 炒老板鱿鱼...',

              // Report Common
              'report.top_secret': 'TOP HORSE',
              'report.confidential': 'SPECIES IDENTIFICATION',
              'report.eval_title': '2026 职场马种鉴定报告',
              'report.confirmed': '确诊',
              'report.diagnosis': '鉴定品种',
              'report.observation': '习性观察',
              'report.behavior': '职场行为特征',
              'report.traits': '马格特质',
              'report.page': 'PAGE',
              'report.id': 'HORSE ID',
              'report.persona_card_title': '[ 人格档案 ]',
              'report.tilt_hint': '移动鼠标体验3D效果',
       },
       en: {
              // Game General
              'game.title': 'Horse Personality Test',
              'game.start': 'Start Test',
              'game.desc': '2026 is the Year of the Horse. What kind of horse are you in the workplace?',
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
              'ui.urgent': '⚠️ Hurry up!',
              'ui.switch_lang': '中文',

              // Home
              'home.warn_tag': '🐴 2026 Limited Edition',
              'home.title.static': 'What Horse Are You?',
              'home.title.highlight': 'Test Your Horse',
              'home.title.sub': '(102,492 users confirmed as Workhorses)',
              'home.btn.start': 'Test Now',
              'home.warn.btn': '⚠️ WARNING: Too Real',
              'home.stats.impossible': '😅 99% think they are Stallions',
              'home.stats.scared': '🤐 Actually mostly Workhorses',
              'home.carousel.t1': 'Who are you?', 'home.carousel.s1': 'Workhorse or Dark Horse?',
              'home.carousel.t2': 'Truth Revealed', 'home.carousel.s2': 'Do not share with your boss 🤐',
              'home.carousel.t3': 'Precision Strike', 'home.carousel.s3': 'More accurate than your KPI review 🎯',
              'home.carousel.t4': 'Horse Fortune', 'home.carousel.s4': 'How far can you run this year? 🏃',

              // Live Updates
              'live.action.1': 'is a Workhorse', 'live.action.2': 'is retaking the test', 'live.action.3': 'fwd to boss',
              'live.action.4': 'is crying', 'live.action.5': 'is a Husky in disguise', 'live.action.6': 'blocked by friends',
              'live.action.7': 'questioning life', 'live.action.8': 'quitting tomorrow', 'live.action.9': 'laughing loudly',
              'live.action.10': 'threw the phone',

              // Memory Cleaner
              'cleaner.title': 'SPLIT PERSONALITY',
              'cleaner.code': 'ERROR_CODE: HORSE_404',
              'cleaner.fatal': 'Persona Collapse Warning',
              'cleaner.desc1': 'Conflict detected between your workplace persona and inner self.',
              'cleaner.desc2': 'To prevent mental breakdown, sacrifice a dark history from last year.',
              'cleaner.prompt': '> Leave a dark history here:',
              'cleaner.placeholder': 'e.g. Scapegoat / Bootlicker / Slacking off...',
              'cleaner.btn.reversing': 'Rebuilding Persona...',
              'cleaner.btn.init': 'Reborn',
              'cleaner.warn': '* Hint: The Horse God forgives (maybe)',

              // System Boot Loader
              'boot.header': 'H-OS v2026 (Horse OS)',
              'boot.log.1': 'Checking horseshoes... Worn',
              'boot.log.2': 'Loading hay resources... Insufficient',
              'boot.log.3': 'Testing speed... Slow',
              'boot.log.4': 'Scanning survival instinct... High',
              'boot.log.5': 'Clearing cache....... Failed',
              'boot.log.6': 'Generating fortune... Processing',
              'boot.ready': '> Stable gates open.',
              'boot.ask': 'Enter your biggest wish for 2026:',
              'boot.placeholder': 'e.g. Rich / No Overtime / Fire Boss...',

              // Report Common
              'report.top_secret': 'TOP HORSE',
              'report.confidential': 'SPECIES IDENTIFICATION',
              'report.eval_title': '2026 HORSE ID REPORT',
              'report.confirmed': 'CONFIRMED',
              'report.diagnosis': 'SPECIES',
              'report.observation': 'HABITS',
              'report.behavior': 'BEHAVIORAL TRAITS',
              'report.traits': 'MARKERS',
              'report.page': 'PAGE',
              'report.id': 'HORSE ID',
              'report.persona_card_title': '[ PERSONA FILE ]',
              'report.tilt_hint': 'Move mouse for 3D effect',
       }
};

export type TranslationKey = keyof typeof translations.zh;

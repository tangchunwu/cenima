// 2025年度报告问卷问题设计
// 22道选择题 + 3道开放题 = 25题

export interface QuestionOption {
  id: string;
  text: string;
  emoji: string;
  dimension: string;
  score: number;
}

export interface Question {
  id: number;
  type: 'choice' | 'open' | 'multi';
  text: string;
  subtext?: string;
  emoji?: string;
  options?: QuestionOption[];
  placeholder?: string;
}

// 五个维度：
// 1. social - 社交倾向 (外向/平衡/内向)
// 2. thinking - 思维模式 (行动派/思想家/感受者)
// 3. stress - 压力应对 (冲锋/分析/回避)
// 4. life - 生活态度 (冒险/稳健/安全)
// 5. time - 时间感知 (追赶者/享受者/拖延者)

export const questions: Question[] = [
  // ===== 社交倾向 (5题) =====
  {
    id: 1,
    type: 'choice',
    text: '周末的理想状态是？',
    emoji: '🌅',
    options: [
      { id: '1a', text: '呼朋引伴，人越多越嗨', emoji: '🎉', dimension: 'social', score: 3 },
      { id: '1b', text: '和几个好友小聚', emoji: '☕', dimension: 'social', score: 2 },
      { id: '1c', text: '在家瘫着刷手机', emoji: '📱', dimension: 'social', score: 1 },
    ],
  },
  {
    id: 2,
    type: 'choice',
    text: '收到聚会邀请时，你的第一反应是？',
    emoji: '💌',
    options: [
      { id: '2a', text: '太棒了！在哪儿？', emoji: '🙋', dimension: 'social', score: 3 },
      { id: '2b', text: '看看是什么聚会再说', emoji: '🤔', dimension: 'social', score: 2 },
      { id: '2c', text: '能推掉吗...', emoji: '😅', dimension: 'social', score: 1 },
    ],
  },
  {
    id: 3,
    type: 'choice',
    text: '在一个陌生的社交场合，你会？',
    emoji: '🎭',
    options: [
      { id: '3a', text: '主动和人聊天交朋友', emoji: '🗣️', dimension: 'social', score: 3 },
      { id: '3b', text: '找熟悉的人抱团', emoji: '👥', dimension: 'social', score: 2 },
      { id: '3c', text: '找个角落看手机', emoji: '📲', dimension: 'social', score: 1 },
    ],
  },
  {
    id: 4,
    type: 'choice',
    text: '你的微信消息一般多久回复？',
    emoji: '💬',
    options: [
      { id: '4a', text: '秒回！聊天使我快乐', emoji: '⚡', dimension: 'social', score: 3 },
      { id: '4b', text: '有空就回', emoji: '⏰', dimension: 'social', score: 2 },
      { id: '4c', text: '让子弹飞一会儿...', emoji: '🐢', dimension: 'social', score: 1 },
    ],
  },
  {
    id: 5,
    type: 'choice',
    text: '独处的时候你会觉得？',
    emoji: '🧘',
    options: [
      { id: '5a', text: '无聊，想出门找人', emoji: '😩', dimension: 'social', score: 3 },
      { id: '5b', text: '还好，偶尔需要', emoji: '😌', dimension: 'social', score: 2 },
      { id: '5c', text: '太棒了！充电时间', emoji: '🔋', dimension: 'social', score: 1 },
    ],
  },

  // ===== 思维模式 (4题) =====
  {
    id: 6,
    type: 'choice',
    text: '面对一个新任务，你会先？',
    emoji: '📋',
    options: [
      { id: '6a', text: '直接开干，边做边调整', emoji: '🏃', dimension: 'thinking', score: 3 },
      { id: '6b', text: '先想想怎么做最好', emoji: '🧠', dimension: 'thinking', score: 2 },
      { id: '6c', text: '感受一下这件事的意义', emoji: '💭', dimension: 'thinking', score: 1 },
    ],
  },
  {
    id: 7,
    type: 'choice',
    text: '做决定时，你更依赖？',
    emoji: '⚖️',
    options: [
      { id: '7a', text: '快速的直觉判断', emoji: '💡', dimension: 'thinking', score: 3 },
      { id: '7b', text: '理性的分析比较', emoji: '📊', dimension: 'thinking', score: 2 },
      { id: '7c', text: '内心的感受', emoji: '❤️', dimension: 'thinking', score: 1 },
    ],
  },
  {
    id: 8,
    type: 'choice',
    text: '学习新东西时，你喜欢？',
    emoji: '📚',
    options: [
      { id: '8a', text: '直接上手实践', emoji: '🛠️', dimension: 'thinking', score: 3 },
      { id: '8b', text: '先看说明书和教程', emoji: '📖', dimension: 'thinking', score: 2 },
      { id: '8c', text: '观察别人怎么做', emoji: '👀', dimension: 'thinking', score: 1 },
    ],
  },
  {
    id: 9,
    type: 'choice',
    text: '遇到问题时，你更容易？',
    emoji: '🔧',
    options: [
      { id: '9a', text: '想到什么方法就试什么', emoji: '🎯', dimension: 'thinking', score: 3 },
      { id: '9b', text: '分析问题找最优解', emoji: '🔍', dimension: 'thinking', score: 2 },
      { id: '9c', text: '问问身边人的意见', emoji: '💬', dimension: 'thinking', score: 1 },
    ],
  },

  // ===== 压力应对 (4题) =====
  {
    id: 10,
    type: 'choice',
    text: 'DDL临近时，你的状态是？',
    emoji: '⏰',
    options: [
      { id: '10a', text: '肾上腺素飙升，效率MAX', emoji: '🔥', dimension: 'stress', score: 3 },
      { id: '10b', text: '制定计划稳步推进', emoji: '📅', dimension: 'stress', score: 2 },
      { id: '10c', text: '焦虑到不行但还是在拖', emoji: '😰', dimension: 'stress', score: 1 },
    ],
  },
  {
    id: 11,
    type: 'choice',
    text: '工作/学习压力大时，你会？',
    emoji: '😓',
    options: [
      { id: '11a', text: '加把劲冲过去', emoji: '💪', dimension: 'stress', score: 3 },
      { id: '11b', text: '合理安排，劳逸结合', emoji: '⚖️', dimension: 'stress', score: 2 },
      { id: '11c', text: '先放松一下再说', emoji: '🎮', dimension: 'stress', score: 1 },
    ],
  },
  {
    id: 12,
    type: 'choice',
    text: '面对困难任务，你的心态是？',
    emoji: '🏔️',
    options: [
      { id: '12a', text: '困难越大越兴奋', emoji: '😈', dimension: 'stress', score: 3 },
      { id: '12b', text: '分析可行性再行动', emoji: '🧐', dimension: 'stress', score: 2 },
      { id: '12c', text: '能不能换个简单的...', emoji: '😅', dimension: 'stress', score: 1 },
    ],
  },
  {
    id: 13,
    type: 'choice',
    text: '犯错之后你的第一反应是？',
    emoji: '😱',
    options: [
      { id: '13a', text: '马上补救，没事没事', emoji: '🏃', dimension: 'stress', score: 3 },
      { id: '13b', text: '复盘原因避免再犯', emoji: '📝', dimension: 'stress', score: 2 },
      { id: '13c', text: '自责好一阵子', emoji: '😢', dimension: 'stress', score: 1 },
    ],
  },

  // ===== 生活态度 (5题) =====
  {
    id: 14,
    type: 'choice',
    text: '对于未来，你更倾向于？',
    emoji: '🔮',
    options: [
      { id: '14a', text: '充满未知才刺激', emoji: '🎢', dimension: 'life', score: 3 },
      { id: '14b', text: '有大致规划就好', emoji: '🗺️', dimension: 'life', score: 2 },
      { id: '14c', text: '希望一切都在掌控', emoji: '🏠', dimension: 'life', score: 1 },
    ],
  },
  {
    id: 15,
    type: 'choice',
    text: '如果可以，你更想？',
    emoji: '✈️',
    options: [
      { id: '15a', text: '环游世界探索未知', emoji: '🌍', dimension: 'life', score: 3 },
      { id: '15b', text: '偶尔旅行增加阅历', emoji: '🧳', dimension: 'life', score: 2 },
      { id: '15c', text: '待在熟悉的地方最舒适', emoji: '🏡', dimension: 'life', score: 1 },
    ],
  },
  {
    id: 16,
    type: 'choice',
    text: '对于尝试新事物，你？',
    emoji: '🆕',
    options: [
      { id: '16a', text: '超爱！新鲜感万岁', emoji: '🤩', dimension: 'life', score: 3 },
      { id: '16b', text: '有兴趣的会试试', emoji: '🙂', dimension: 'life', score: 2 },
      { id: '16c', text: '熟悉的最好', emoji: '😊', dimension: 'life', score: 1 },
    ],
  },
  {
    id: 17,
    type: 'choice',
    text: '你的消费风格是？',
    emoji: '💰',
    options: [
      { id: '17a', text: '喜欢就买，人生苦短', emoji: '🛍️', dimension: 'life', score: 3 },
      { id: '17b', text: '理性消费，偶尔放纵', emoji: '📊', dimension: 'life', score: 2 },
      { id: '17c', text: '存钱使我安心', emoji: '🐷', dimension: 'life', score: 1 },
    ],
  },
  {
    id: 18,
    type: 'choice',
    text: '你觉得生活应该是？',
    emoji: '🌈',
    options: [
      { id: '18a', text: '精彩刺激充满变化', emoji: '🎆', dimension: 'life', score: 3 },
      { id: '18b', text: '平淡中有小惊喜', emoji: '🌸', dimension: 'life', score: 2 },
      { id: '18c', text: '安稳踏实最重要', emoji: '🌾', dimension: 'life', score: 1 },
    ],
  },

  // ===== 时间感知 (4题) =====
  {
    id: 19,
    type: 'choice',
    text: '你的2024过得？',
    emoji: '📆',
    options: [
      { id: '19a', text: '飞速！感觉还没开始就结束了', emoji: '🚀', dimension: 'time', score: 3 },
      { id: '19b', text: '刚刚好，该做的都做了', emoji: '✨', dimension: 'time', score: 2 },
      { id: '19c', text: '漫长...很多事还没完成', emoji: '🐌', dimension: 'time', score: 1 },
    ],
  },
  {
    id: 20,
    type: 'choice',
    text: '面对时间流逝，你的感受是？',
    emoji: '⏳',
    options: [
      { id: '20a', text: '紧迫感，要抓紧做更多', emoji: '😤', dimension: 'time', score: 3 },
      { id: '20b', text: '珍惜当下每一刻', emoji: '🙏', dimension: 'time', score: 2 },
      { id: '20c', text: '迷茫，不知道时间都去哪了', emoji: '😵', dimension: 'time', score: 1 },
    ],
  },
  {
    id: 21,
    type: 'choice',
    text: '你的待办事项清单通常？',
    emoji: '✅',
    options: [
      { id: '21a', text: '当天清空，效率拉满', emoji: '⚡', dimension: 'time', score: 3 },
      { id: '21b', text: '大部分完成，留点明天', emoji: '😌', dimension: 'time', score: 2 },
      { id: '21c', text: '越积越多...', emoji: '📚', dimension: 'time', score: 1 },
    ],
  },
  {
    id: 22,
    type: 'choice',
    text: '早上醒来，你的状态是？',
    emoji: '🌅',
    options: [
      { id: '22a', text: '充满干劲准备开始新一天', emoji: '💪', dimension: 'time', score: 3 },
      { id: '22b', text: '慢慢清醒，享受晨光', emoji: '☀️', dimension: 'time', score: 2 },
      { id: '22c', text: '再睡五分钟...', emoji: '😴', dimension: 'time', score: 1 },
    ],
  },

  // ===== 开放题 (3题) =====
  {
    id: 23,
    type: 'open',
    text: '2024年，你最大的遗憾是什么？',
    subtext: '诚实面对，才能真正释怀',
    emoji: '💔',
    placeholder: '写下那件让你念念不忘的事...',
  },
  {
    id: 24,
    type: 'open',
    text: '2025年，你最期待的事是什么？',
    subtext: '写下来，让愿望更有力量',
    emoji: '🌟',
    placeholder: '无论大小，写下你的期待...',
  },
  {
    id: 25,
    type: 'multi',
    text: '2025年，你的年度目标是？',
    subtext: '可以选多个，也可以自己写',
    emoji: '🎯',
    options: [
      { id: '25a', text: '身体健康，坚持运动', emoji: '🏃', dimension: 'goal', score: 0 },
      { id: '25b', text: '学习成长，提升自己', emoji: '📚', dimension: 'goal', score: 0 },
      { id: '25c', text: '赚更多钱', emoji: '💰', dimension: 'goal', score: 0 },
      { id: '25d', text: '多陪伴家人朋友', emoji: '👨‍👩‍👧', dimension: 'goal', score: 0 },
      { id: '25e', text: '完成一个大项目', emoji: '🚀', dimension: 'goal', score: 0 },
      { id: '25f', text: '好好生活，照顾自己', emoji: '🌸', dimension: 'goal', score: 0 },
      { id: '25g', text: '脱单/维护好感情', emoji: '💕', dimension: 'goal', score: 0 },
      { id: '25h', text: '出去旅行看世界', emoji: '✈️', dimension: 'goal', score: 0 },
    ],
    placeholder: '或者写下你自己的目标...',
  },
];

export const totalQuestions = questions.length;

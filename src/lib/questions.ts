// 2025年度报告问卷 - 病毒传播优化版

export interface QuestionOption {
  id: string;
  text: string;
  emoji: string;
  dimension: 'social' | 'thinking' | 'stress' | 'life' | 'time';
  score: number;
}

export interface Question {
  id: string;
  type: 'choice' | 'open' | 'multi';
  text: string;
  subtext?: string;
  emoji: string;
  options?: QuestionOption[];
  placeholder?: string;
}

export const questions: Question[] = [
  // 社交维度 (2题) - 更口语化
  {
    id: 'social_1',
    type: 'choice',
    text: '周末了，你的尸体在哪里？',
    subtext: '说的就是你的社交电量',
    emoji: '🛋️',
    options: [
      { id: 'a', text: '当然是和朋友浪啊！', emoji: '🎉', dimension: 'social', score: 5 },
      { id: 'b', text: '看心情，有局就去', emoji: '🤷', dimension: 'social', score: 3 },
      { id: 'c', text: '床和WiFi才是真爱', emoji: '📱', dimension: 'social', score: 1 },
    ],
  },
  {
    id: 'social_2',
    type: 'choice',
    text: '有人喊你出去玩，内心OS是？',
    subtext: '你的第一反应最真实',
    emoji: '📲',
    options: [
      { id: 'a', text: '好耶！穿什么去！', emoji: '🙋', dimension: 'social', score: 5 },
      { id: 'b', text: '谁喊的？去哪？几个人？', emoji: '🧐', dimension: 'social', score: 3 },
      { id: 'c', text: '已读不回是门艺术', emoji: '💀', dimension: 'social', score: 1 },
    ],
  },
  // 思维维度 (2题) - 更接地气
  {
    id: 'thinking_1',
    type: 'choice',
    text: '领导突然发消息@你，你会？',
    subtext: '别慌，先选',
    emoji: '😰',
    options: [
      { id: 'a', text: '冷静分析：可能是...', emoji: '🧠', dimension: 'thinking', score: 5 },
      { id: 'b', text: '边慌边点开看', emoji: '😅', dimension: 'thinking', score: 3 },
      { id: 'c', text: '先假装没看到', emoji: '🙈', dimension: 'thinking', score: 1 },
    ],
  },
  {
    id: 'thinking_2',
    type: 'choice',
    text: '遇到问题时，你的第一反应是？',
    subtext: '诚实点哦',
    emoji: '🤔',
    options: [
      { id: 'a', text: '先查资料研究一下', emoji: '📚', dimension: 'thinking', score: 5 },
      { id: 'b', text: '问问万能的朋友圈', emoji: '💬', dimension: 'thinking', score: 3 },
      { id: 'c', text: '随缘吧，船到桥头自然直', emoji: '🌊', dimension: 'thinking', score: 1 },
    ],
  },
  // 压力维度 (2题) - 更扎心
  {
    id: 'stress_1',
    type: 'choice',
    text: '明天deadline，今天的你：',
    subtext: '是谁半夜还在改PPT',
    emoji: '⏰',
    options: [
      { id: 'a', text: '早就搞完了，躺着玩', emoji: '😎', dimension: 'stress', score: 1 },
      { id: 'b', text: '在做了在做了（慌', emoji: '💦', dimension: 'stress', score: 3 },
      { id: 'c', text: '通宵战士报道！', emoji: '🔥', dimension: 'stress', score: 5 },
    ],
  },
  {
    id: 'stress_2',
    type: 'choice',
    text: '3AM还没睡，你在干嘛？',
    subtext: '深夜emo时间',
    emoji: '🌙',
    options: [
      { id: 'a', text: '我早睡的，不存在这问题', emoji: '😴', dimension: 'stress', score: 1 },
      { id: 'b', text: '刷手机停不下来', emoji: '📱', dimension: 'stress', score: 3 },
      { id: 'c', text: '内耗/焦虑/想太多...', emoji: '🌀', dimension: 'stress', score: 5 },
    ],
  },
  // 生活维度 (2题) - 更真实
  {
    id: 'life_1',
    type: 'choice',
    text: '突然中了一笔钱，你会？',
    subtext: '假装你真的中了',
    emoji: '💰',
    options: [
      { id: 'a', text: '存着，以后有用', emoji: '🏦', dimension: 'life', score: 1 },
      { id: 'b', text: '买点一直想要的东西', emoji: '🛍️', dimension: 'life', score: 3 },
      { id: 'c', text: '先快乐再说！', emoji: '🎢', dimension: 'life', score: 5 },
    ],
  },
  {
    id: 'life_2',
    type: 'choice',
    text: '面对新鲜事物，你的态度是？',
    subtext: '比如新开的店、新出的APP',
    emoji: '✨',
    options: [
      { id: 'a', text: '冲啊！不试试怎么知道', emoji: '🚀', dimension: 'life', score: 5 },
      { id: 'b', text: '等等评价再说', emoji: '👀', dimension: 'life', score: 3 },
      { id: 'c', text: '旧的用着挺好的', emoji: '🛋️', dimension: 'life', score: 1 },
    ],
  },
  // 时间维度 (2题) - 更扎心
  {
    id: 'time_1',
    type: 'choice',
    text: '回顾2025，你觉得这一年？',
    subtext: '诚实面对自己',
    emoji: '📆',
    options: [
      { id: 'a', text: '收获满满，值了！', emoji: '🏆', dimension: 'time', score: 5 },
      { id: 'b', text: '有好有坏，还行吧', emoji: '😐', dimension: 'time', score: 3 },
      { id: 'c', text: '感觉啥也没干就过完了...', emoji: '💨', dimension: 'time', score: 1 },
    ],
  },
  {
    id: 'time_2',
    type: 'choice',
    text: '听到"时间过得好快"，你的反应是？',
    subtext: '年底必备感慨',
    emoji: '⏳',
    options: [
      { id: 'a', text: '确实！但我过得很充实', emoji: '💪', dimension: 'time', score: 5 },
      { id: 'b', text: '是挺快的...有点感慨', emoji: '🍂', dimension: 'time', score: 3 },
      { id: 'c', text: '别说了，焦虑了', emoji: '😭', dimension: 'time', score: 1 },
    ],
  },
  // 开放题 (2题) - 更有仪式感
  {
    id: 'open_regret',
    type: 'open',
    text: '2025年，最意难平的一件事？',
    subtext: '写下来，然后划掉它 ✖️',
    emoji: '🥲',
    placeholder: '那件让你念念不忘的事...',
  },
  {
    id: 'open_wish',
    type: 'open',
    text: '2026年，你最想实现的事？',
    subtext: '许个愿，让宇宙听到 🌟',
    emoji: '💫',
    placeholder: '写下你的2026心愿...',
  },
];

export const totalQuestions = questions.length;

// 问题间的彩蛋提示语
export const easterEggMessages = [
  '正在偷偷分析你...',
  'emmm这答案有点意思',
  '你是不是以为我看不出来',
  '已记录，继续...',
  '有点东西哦',
  '系统正在努力理解你',
];

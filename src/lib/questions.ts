// 2025年度报告问卷 - 精简版12题

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
  // 社交维度 (2题)
  {
    id: 'social_1',
    type: 'choice',
    text: '周末的理想状态是？',
    emoji: '🌟',
    options: [
      { id: 'a', text: '和朋友浪到飞起', emoji: '🎉', dimension: 'social', score: 5 },
      { id: 'b', text: '小聚一下刚刚好', emoji: '☕', dimension: 'social', score: 3 },
      { id: 'c', text: '宅家才是真香', emoji: '🏠', dimension: 'social', score: 1 },
    ],
  },
  {
    id: 'social_2',
    type: 'choice',
    text: '收到聚会邀请，第一反应是？',
    emoji: '📱',
    options: [
      { id: 'a', text: '好耶！我来！', emoji: '🙋', dimension: 'social', score: 5 },
      { id: 'b', text: '看看是谁发的再说', emoji: '🤔', dimension: 'social', score: 3 },
      { id: 'c', text: '先想个借口...', emoji: '😅', dimension: 'social', score: 1 },
    ],
  },
  // 思维维度 (2题)
  {
    id: 'thinking_1',
    type: 'choice',
    text: '面对新任务，你会先？',
    emoji: '💡',
    options: [
      { id: 'a', text: '列个详细计划', emoji: '📋', dimension: 'thinking', score: 5 },
      { id: 'b', text: '想个大概方向', emoji: '🎯', dimension: 'thinking', score: 3 },
      { id: 'c', text: '先干了再说', emoji: '🚀', dimension: 'thinking', score: 1 },
    ],
  },
  {
    id: 'thinking_2',
    type: 'choice',
    text: '遇到难题时，你更倾向于？',
    emoji: '🧩',
    options: [
      { id: 'a', text: '查资料深入研究', emoji: '📚', dimension: 'thinking', score: 5 },
      { id: 'b', text: '问问身边的人', emoji: '🗣️', dimension: 'thinking', score: 3 },
      { id: 'c', text: '跟着直觉走', emoji: '✨', dimension: 'thinking', score: 1 },
    ],
  },
  // 压力维度 (2题)
  {
    id: 'stress_1',
    type: 'choice',
    text: 'DDL临近时，你的状态是？',
    emoji: '⏰',
    options: [
      { id: 'a', text: '淡定，早就搞定了', emoji: '😎', dimension: 'stress', score: 1 },
      { id: 'b', text: '有点慌但还行', emoji: '😬', dimension: 'stress', score: 3 },
      { id: 'c', text: '疯狂输出ing', emoji: '🔥', dimension: 'stress', score: 5 },
    ],
  },
  {
    id: 'stress_2',
    type: 'choice',
    text: '犯错之后，你的第一反应是？',
    emoji: '💭',
    options: [
      { id: 'a', text: '冷静分析原因', emoji: '🔍', dimension: 'stress', score: 1 },
      { id: 'b', text: '有点自责但会调整', emoji: '😔', dimension: 'stress', score: 3 },
      { id: 'c', text: '疯狂内耗中...', emoji: '🌀', dimension: 'stress', score: 5 },
    ],
  },
  // 生活维度 (2题)
  {
    id: 'life_1',
    type: 'choice',
    text: '对于尝试新事物，你的态度是？',
    emoji: '🎨',
    options: [
      { id: 'a', text: '超爱！冲冲冲', emoji: '🌈', dimension: 'life', score: 5 },
      { id: 'b', text: '看情况，有趣就试试', emoji: '🎲', dimension: 'life', score: 3 },
      { id: 'c', text: '还是熟悉的更安心', emoji: '🛋️', dimension: 'life', score: 1 },
    ],
  },
  {
    id: 'life_2',
    type: 'choice',
    text: '你的消费风格是？',
    emoji: '💰',
    options: [
      { id: 'a', text: '精打细算型', emoji: '🧮', dimension: 'life', score: 1 },
      { id: 'b', text: '该省省该花花', emoji: '⚖️', dimension: 'life', score: 3 },
      { id: 'c', text: '快乐最重要', emoji: '🛍️', dimension: 'life', score: 5 },
    ],
  },
  // 时间维度 (2题)
  {
    id: 'time_1',
    type: 'choice',
    text: '回顾2025，你觉得这一年过得？',
    emoji: '📅',
    options: [
      { id: 'a', text: '超充实，收获满满', emoji: '🏆', dimension: 'time', score: 5 },
      { id: 'b', text: '还行，有好有坏', emoji: '🌤️', dimension: 'time', score: 3 },
      { id: 'c', text: '感觉啥也没干就过完了', emoji: '💨', dimension: 'time', score: 1 },
    ],
  },
  {
    id: 'time_2',
    type: 'choice',
    text: '面对时间流逝，你的感受是？',
    emoji: '⏳',
    options: [
      { id: 'a', text: '珍惜当下，活在此刻', emoji: '🌸', dimension: 'time', score: 5 },
      { id: 'b', text: '偶尔会感慨一下', emoji: '🍂', dimension: 'time', score: 3 },
      { id: 'c', text: '时间焦虑患者', emoji: '😰', dimension: 'time', score: 1 },
    ],
  },
  // 开放题 (2题)
  {
    id: 'open_regret',
    type: 'open',
    text: '2025年，最让你遗憾的一件事是？',
    subtext: '写下来，然后放下它',
    emoji: '🥲',
    placeholder: '在这里写下你的遗憾...',
  },
  {
    id: 'open_wish',
    type: 'open',
    text: '2026年，你最期待的事情是？',
    subtext: '许个愿，让它成真',
    emoji: '🌠',
    placeholder: '写下你的新年愿望...',
  },
];

export const totalQuestions = questions.length;

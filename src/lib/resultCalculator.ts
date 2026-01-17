import { questions } from './questions';

export type Answers = Record<string, string>;

export interface DimensionScores {
  social: number;
  thinking: number;
  stress: number;
  life: number;
  time: number;
}

export interface TagResult {
  mainTag: string;
  subTags: string[];
  description: string;
  emoji: string;
  color: string;
}

// 计算各维度得分
export function calculateDimensionScores(answers: Answers): DimensionScores {
  const dimensionTotals: Record<string, { sum: number; count: number }> = {
    social: { sum: 0, count: 0 },
    thinking: { sum: 0, count: 0 },
    stress: { sum: 0, count: 0 },
    life: { sum: 0, count: 0 },
    time: { sum: 0, count: 0 },
  };

  questions.forEach((question) => {
    if (question.type !== 'choice' || !question.options) return;
    
    const answer = answers[question.id];
    if (!answer) return;

    const selectedOption = question.options.find((opt) => opt.id === answer);
    if (selectedOption) {
      dimensionTotals[selectedOption.dimension].sum += selectedOption.score;
      dimensionTotals[selectedOption.dimension].count += 1;
    }
  });

  // 计算平均分并归一化到 1-5
  const scores: DimensionScores = {
    social: dimensionTotals.social.count > 0 
      ? dimensionTotals.social.sum / dimensionTotals.social.count 
      : 3,
    thinking: dimensionTotals.thinking.count > 0 
      ? dimensionTotals.thinking.sum / dimensionTotals.thinking.count 
      : 3,
    stress: dimensionTotals.stress.count > 0 
      ? dimensionTotals.stress.sum / dimensionTotals.stress.count 
      : 3,
    life: dimensionTotals.life.count > 0 
      ? dimensionTotals.life.sum / dimensionTotals.life.count 
      : 3,
    time: dimensionTotals.time.count > 0 
      ? dimensionTotals.time.sum / dimensionTotals.time.count 
      : 3,
  };

  return scores;
}

// 根据分数确定标签类型
function getLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 4) return 'high';
  if (score >= 2.5) return 'medium';
  return 'low';
}

// 主要人设标签组合
const tagCombinations: Record<string, TagResult> = {
  // 社交高 + 生活高 = 社交达人
  'social_high_life_high': {
    mainTag: '人间小太阳',
    subTags: ['社交达人', '活力满满', '快乐源泉'],
    description: '你是朋友圈里的开心果，走到哪里都能带来欢乐和温暖',
    emoji: '☀️',
    color: 'from-yellow-400 to-orange-400',
  },
  // 社交低 + 思维高 = 独立思考者
  'social_low_thinking_high': {
    mainTag: '深度思考者',
    subTags: ['独立灵魂', '内心丰富', '自我世界'],
    description: '你享受独处的时光，在安静中思考人生的意义',
    emoji: '🌙',
    color: 'from-purple-400 to-indigo-400',
  },
  // 压力高 + 时间低 = 燃烧战士
  'stress_high_time_low': {
    mainTag: 'DDL战士',
    subTags: ['燃烧自己', '极限操作', '压力选手'],
    description: '你总是在最后时刻爆发惊人的能量，在压力中成长',
    emoji: '🔥',
    color: 'from-red-400 to-orange-400',
  },
  // 生活高 + 时间高 = 人生赢家
  'life_high_time_high': {
    mainTag: '人生体验家',
    subTags: ['热爱生活', '精彩不断', '活在当下'],
    description: '你把每一天都过得精彩，生活对你来说是一场盛大的冒险',
    emoji: '🎪',
    color: 'from-pink-400 to-rose-400',
  },
  // 思维高 + 压力低 = 稳如泰山
  'thinking_high_stress_low': {
    mainTag: '淡定王者',
    subTags: ['心态稳健', '思路清晰', '运筹帷幄'],
    description: '泰山崩于前而色不变，你是那个永远冷静的人',
    emoji: '🧘',
    color: 'from-teal-400 to-cyan-400',
  },
  // 社交高 + 压力高 = 活力焦虑
  'social_high_stress_high': {
    mainTag: '社交小蝴蝶',
    subTags: ['人缘超好', '略带焦虑', '努力前行'],
    description: '你热爱社交但也会焦虑，在热闹中寻找平衡',
    emoji: '🦋',
    color: 'from-blue-400 to-purple-400',
  },
  // 生活低 + 思维高 = 理性务实
  'life_low_thinking_high': {
    mainTag: '务实派大佬',
    subTags: ['理性思考', '稳扎稳打', '目标明确'],
    description: '你不追求花哨，用理性和坚持走出自己的路',
    emoji: '🎯',
    color: 'from-slate-400 to-zinc-500',
  },
  // 时间高 + 社交低 = 自我修炼
  'time_high_social_low': {
    mainTag: '时间管理大师',
    subTags: ['自律达人', '效率极高', '独自进化'],
    description: '你善于利用时间，在独处中不断提升自己',
    emoji: '⏰',
    color: 'from-emerald-400 to-green-400',
  },
};

// 生成默认标签（当没有匹配的组合时）
function generateDefaultTag(scores: DimensionScores): TagResult {
  const socialLevel = getLevel(scores.social);
  const thinkingLevel = getLevel(scores.thinking);
  const stressLevel = getLevel(scores.stress);
  const lifeLevel = getLevel(scores.life);
  const timeLevel = getLevel(scores.time);

  // 基于主要特征生成
  if (socialLevel === 'high') {
    return {
      mainTag: '快乐小达人',
      subTags: ['爱交朋友', '活泼开朗', '正能量'],
      description: '你是个阳光的人，总能给身边的人带来快乐',
      emoji: '🌻',
      color: 'from-yellow-400 to-amber-400',
    };
  }
  
  if (thinkingLevel === 'high') {
    return {
      mainTag: '智慧担当',
      subTags: ['思路清晰', '逻辑强', '靠谱'],
      description: '你有着清晰的头脑，是大家眼中的可靠存在',
      emoji: '🧠',
      color: 'from-blue-400 to-cyan-400',
    };
  }

  if (lifeLevel === 'high') {
    return {
      mainTag: '生活艺术家',
      subTags: ['热爱尝鲜', '会享受', '有品味'],
      description: '你把平凡的日子过成诗，每天都在创造美好',
      emoji: '🎨',
      color: 'from-pink-400 to-purple-400',
    };
  }

  if (timeLevel === 'high') {
    return {
      mainTag: '充实人生',
      subTags: ['不虚度', '有目标', '在成长'],
      description: '你的时间都花在了刀刃上，每一天都很充实',
      emoji: '⭐',
      color: 'from-amber-400 to-yellow-400',
    };
  }

  if (stressLevel === 'low') {
    return {
      mainTag: '佛系青年',
      subTags: ['心态好', '不内耗', '随遇而安'],
      description: '你有一颗平和的心，不被焦虑所困扰',
      emoji: '🍃',
      color: 'from-green-400 to-emerald-400',
    };
  }

  // 通用默认
  return {
    mainTag: '平衡达人',
    subTags: ['稳稳当当', '不偏不倚', '中庸之道'],
    description: '你在各方面都保持着不错的平衡，是个全面发展的人',
    emoji: '🌈',
    color: 'from-indigo-400 to-purple-400',
  };
}

export function calculateResult(answers: Answers): TagResult {
  const scores = calculateDimensionScores(answers);
  
  // 尝试匹配预设组合
  const combinations = [
    { key: 'social_high_life_high', condition: getLevel(scores.social) === 'high' && getLevel(scores.life) === 'high' },
    { key: 'social_low_thinking_high', condition: getLevel(scores.social) === 'low' && getLevel(scores.thinking) === 'high' },
    { key: 'stress_high_time_low', condition: getLevel(scores.stress) === 'high' && getLevel(scores.time) === 'low' },
    { key: 'life_high_time_high', condition: getLevel(scores.life) === 'high' && getLevel(scores.time) === 'high' },
    { key: 'thinking_high_stress_low', condition: getLevel(scores.thinking) === 'high' && getLevel(scores.stress) === 'low' },
    { key: 'social_high_stress_high', condition: getLevel(scores.social) === 'high' && getLevel(scores.stress) === 'high' },
    { key: 'life_low_thinking_high', condition: getLevel(scores.life) === 'low' && getLevel(scores.thinking) === 'high' },
    { key: 'time_high_social_low', condition: getLevel(scores.time) === 'high' && getLevel(scores.social) === 'low' },
  ];

  for (const combo of combinations) {
    if (combo.condition && tagCombinations[combo.key]) {
      return tagCombinations[combo.key];
    }
  }

  return generateDefaultTag(scores);
}

import { questions } from './questions';
import { horses } from './horses';

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
  roast: string; // 毒舌吐槽
  keyword2025: string; // 2025年度关键词
  prediction2026: string; // 2026预言
  emoji: string;
  color: string;
  image: string; // 新增：人设形象图路径
  rarity: 'SSR' | 'SR' | 'R' | 'N'; // 稀有度
  populationPercentage: number; // 人群占比
}



// 将 HorseDef 转换为 TagResult
export const tagCombinations: Record<string, TagResult> = {};
horses.forEach(h => {
  // 生成一些动态标签
  const subTags = [h.shortDesc.replace(/["']/g, '')];
  if (h.attributes.卷度 > 80) subTags.push('卷王');
  else if (h.attributes.卷度 < 20) subTags.push('躺平');
  if (h.attributes.摸鱼指数 > 80) subTags.push('摸鱼达人');
  if (h.attributes.暴躁值 > 80) subTags.push('不好惹');
  if (h.attributes.干饭能力 > 80) subTags.push('干饭人');

  tagCombinations[h.name] = {
    mainTag: h.name,
    subTags: subTags.slice(0, 3),
    description: h.description,
    roast: h.shortDesc,
    keyword2025: '马到成功',
    prediction2026: `2026年，${h.shortDesc.replace(/["']/g, '')}`,
    emoji: '🐴',
    color: h.color,
    image: h.image,
    rarity: (h.attributes.卷度 > 90 || h.attributes.摸鱼指数 > 90) ? 'SSR' : 'R',
    populationPercentage: Math.floor(Math.random() * 10) + 1
  };
});

export function getHorseResultByName(name: string): TagResult {
  return tagCombinations[name] || tagCombinations['牛马'];
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

export function calculateResult(answers: Answers): TagResult {
  const scores = calculateDimensionScores(answers);

  // 简单的映射逻辑，作为 fallback
  if (scores.stress > 4) return getHorseResultByName('牛马');
  if (scores.life > 4) return getHorseResultByName('白聋马');
  if (scores.social > 4) return getHorseResultByName('傻马特');
  if (scores.thinking > 4) return getHorseResultByName('皇阿马');

  return getHorseResultByName('牛马'); // Default
}

export interface ChartData {
  annualCurve: { month: string; value: number; status: 'high' | 'low' | 'normal' }[];
  dimensions: { subject: string; A: number; fullMark: number }[];
}

export interface HealthIndices {
  internalFriction: number; // 内耗指数 (0-100)
  socialBattery: number;   // 社交电量 (0-100)
  anxietyLevel: number;    // 焦虑等级 (0-100)
  dopamineStock: number;   // 多巴胺储备 (0-100)
}

export function calculateHealthIndices(answers: Answers): HealthIndices {
  const scores = calculateDimensionScores(answers);

  // 简单的加权计算
  // 内耗 = (思维 * 1.5 + 压力 * 1.5) / 3 * 20
  const internalFriction = Math.min(100, Math.round(((scores.thinking * 1.5 + scores.stress * 1.5) / 15) * 100));

  // 社交电量 = 社交 * 20
  const socialBattery = Math.min(100, Math.round(scores.social * 20));

  // 焦虑等级 = 压力 * 20 + (5 - 生活) * 4
  const anxietyLevel = Math.min(100, Math.round((scores.stress * 4 + (5 - scores.life) * 4) * 4));

  // 多巴胺 = (生活 * 1.5 + 社交 * 0.5) * 10
  const dopamineStock = Math.min(100, Math.round(((scores.life * 1.5 + scores.social * 0.5) / 10) * 100));

  return {
    internalFriction,
    socialBattery,
    anxietyLevel,
    dopamineStock
  };
}

// 生成图表数据
export function calculateChartData(answers: Answers): ChartData {
  const scores = calculateDimensionScores(answers);

  // 1. 生成年度心情曲线 (基于分数的伪随机但确定性曲线)
  // 使用 scores 的总和作为种子
  const seed = Object.values(scores).reduce((a, b) => a + b, 0);
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  let currentValue = 50 + (seed % 20); // 初始值
  const annualCurve = months.map((month, index) => {
    // 简单的伪随机波动
    const change = Math.sin(index + seed) * 20 + (Math.random() - 0.5) * 10;
    currentValue = Math.max(10, Math.min(90, currentValue + change));

    let status: 'high' | 'low' | 'normal' = 'normal';
    if (currentValue > 80) status = 'high';
    if (currentValue < 30) status = 'low';

    return {
      month,
      value: Math.round(currentValue),
      status,
    };
  });

  // 2. 生成雷达图数据
  const dimensions = [
    { subject: '社交', A: Math.round(scores.social / 5 * 100), fullMark: 100 },
    { subject: '思维', A: Math.round(scores.thinking / 5 * 100), fullMark: 100 },
    { subject: '压力', A: Math.round(scores.stress / 5 * 100), fullMark: 100 },
    { subject: '生活', A: Math.round(scores.life / 5 * 100), fullMark: 100 },
    { subject: '时间', A: Math.round(scores.time / 5 * 100), fullMark: 100 },
  ];

  return {
    annualCurve,
    dimensions,
  };
}

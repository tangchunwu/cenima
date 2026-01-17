// 结果计算器 - 基于五维度答案生成独特标签

interface DimensionScores {
  social: number;
  thinking: number;
  stress: number;
  life: number;
  time: number;
}

interface Answers {
  [questionId: string]: string | string[];
}

// 计算各维度得分
export function calculateDimensionScores(answers: Answers): DimensionScores {
  const scores: DimensionScores = {
    social: 0,
    thinking: 0,
    stress: 0,
    life: 0,
    time: 0,
  };

  const counts: DimensionScores = {
    social: 0,
    thinking: 0,
    stress: 0,
    life: 0,
    time: 0,
  };

  // 题目维度映射
  const questionDimensions: { [id: number]: keyof DimensionScores } = {
    1: 'social', 2: 'social', 3: 'social', 4: 'social', 5: 'social',
    6: 'thinking', 7: 'thinking', 8: 'thinking', 9: 'thinking',
    10: 'stress', 11: 'stress', 12: 'stress', 13: 'stress',
    14: 'life', 15: 'life', 16: 'life', 17: 'life', 18: 'life',
    19: 'time', 20: 'time', 21: 'time', 22: 'time',
  };

  // 答案分数映射 (a=3, b=2, c=1)
  const getScore = (answer: string): number => {
    if (answer.endsWith('a')) return 3;
    if (answer.endsWith('b')) return 2;
    if (answer.endsWith('c')) return 1;
    return 2; // default
  };

  Object.entries(answers).forEach(([qId, answer]) => {
    const questionId = parseInt(qId);
    const dimension = questionDimensions[questionId];
    
    if (dimension && typeof answer === 'string') {
      scores[dimension] += getScore(answer);
      counts[dimension]++;
    }
  });

  // 计算平均分 (归一化到1-3)
  Object.keys(scores).forEach((dim) => {
    const d = dim as keyof DimensionScores;
    if (counts[d] > 0) {
      scores[d] = scores[d] / counts[d];
    }
  });

  return scores;
}

// 标签体系
interface TagResult {
  mainTag: string;
  subTags: string[];
  description: string;
  emoji: string;
  color: string;
}

const socialLabels = {
  high: { label: '社牛', emoji: '🎉' },
  mid: { label: '社交恰好', emoji: '☕' },
  low: { label: '社恐', emoji: '🏠' },
};

const thinkingLabels = {
  high: { label: '行动派', emoji: '🏃' },
  mid: { label: '思想家', emoji: '🧠' },
  low: { label: '感受者', emoji: '💭' },
};

const stressLabels = {
  high: { label: '压力战士', emoji: '🔥' },
  mid: { label: '稳扎稳打', emoji: '⚖️' },
  low: { label: '佛系', emoji: '🧘' },
};

const lifeLabels = {
  high: { label: '冒险家', emoji: '🎢' },
  mid: { label: '探索者', emoji: '🧭' },
  low: { label: '安稳派', emoji: '🏡' },
};

const timeLabels = {
  high: { label: '时间管理大师', emoji: '⚡' },
  mid: { label: '享受当下', emoji: '🌸' },
  low: { label: '慢生活主义', emoji: '🐢' },
};

function getLevel(score: number): 'high' | 'mid' | 'low' {
  if (score >= 2.4) return 'high';
  if (score >= 1.7) return 'mid';
  return 'low';
}

// 主标签组合表 - 创造有趣的组合标签
const tagCombinations: { [key: string]: { tag: string; description: string; emoji: string; color: string } } = {
  'high-high-high-high-high': {
    tag: '人生赢家型卷王',
    description: '精力充沛、社交达人、高效行动派，你就是那个别人口中"什么都能干成"的人！',
    emoji: '👑',
    color: 'sunshine',
  },
  'low-low-low-low-low': {
    tag: '佛系躺平艺术家',
    description: '慢下来也是一种生活艺术，你深谙此道。在喧嚣的世界里，保持内心的平静是一种超能力。',
    emoji: '🧘',
    color: 'mint',
  },
  'high-high-high-high-mid': {
    tag: '社牛型效率怪兽',
    description: '又能玩又能干，社交场合游刃有余，工作效率令人羡慕。',
    emoji: '🦁',
    color: 'peach',
  },
  'low-mid-low-low-low': {
    tag: '安静的深度思考者',
    description: '你喜欢独处和思考，对生活有自己的节奏和理解。',
    emoji: '🦉',
    color: 'lavender',
  },
  'high-low-mid-high-mid': {
    tag: '派对动物冒险家',
    description: '爱社交、爱冒险，跟着感觉走，人生就是要活得精彩！',
    emoji: '🎉',
    color: 'primary',
  },
  'mid-mid-mid-mid-mid': {
    tag: '完美平衡主义者',
    description: '你是那种各方面都很平衡的人，适应力强，在哪都能过得不错。',
    emoji: '⚖️',
    color: 'sky',
  },
  'low-high-high-low-high': {
    tag: '安静的实干家',
    description: '不爱社交但超能干，默默努力的实力派，用成果说话。',
    emoji: '🦾',
    color: 'accent',
  },
  'high-mid-low-mid-low': {
    tag: '社牛型拖延症患者',
    description: '超爱玩超能聊，但一到干活就...明天再说吧！',
    emoji: '😂',
    color: 'peach',
  },
};

// 生成默认组合标签
function generateDefaultTag(scores: DimensionScores): TagResult {
  const socialLevel = getLevel(scores.social);
  const thinkingLevel = getLevel(scores.thinking);
  
  const socialLabel = socialLabels[socialLevel];
  const thinkingLabel = thinkingLabels[thinkingLevel];
  
  const mainTag = `${socialLabel.label}型${thinkingLabel.label}`;
  
  const subTags = [
    stressLabels[getLevel(scores.stress)].label,
    lifeLabels[getLevel(scores.life)].label,
    timeLabels[getLevel(scores.time)].label,
  ];

  const descriptions: { [key: string]: string } = {
    '社牛型行动派': '你是团队里的发动机，能带动氛围也能推动事情！',
    '社牛型思想家': '爱社交也爱思考，聚会上的灵魂人物同时也是有深度的人。',
    '社牛型感受者': '善于共情，能让每个人都感到被重视，天生的社交高手。',
    '社交恰好型行动派': '该干活干活，该玩乐玩乐，生活工作平衡拿捏得刚好。',
    '社交恰好型思想家': '有自己的社交圈也有独处的时间，思考让你更有深度。',
    '社交恰好型感受者': '不会过度社交，但每段关系都用心经营。',
    '社恐型行动派': '不爱说话但超能干，用实力证明自己。',
    '社恐型思想家': '独处时光是你的灵感源泉，思考让你与众不同。',
    '社恐型感受者': '敏感细腻，对身边的人和事有独特的感知力。',
  };

  return {
    mainTag,
    subTags,
    description: descriptions[mainTag] || `你是独特的${mainTag}，保持自己的节奏就好！`,
    emoji: socialLabel.emoji,
    color: getLevel(scores.social) === 'high' ? 'primary' : 
           getLevel(scores.social) === 'mid' ? 'accent' : 'lavender',
  };
}

export function calculateResult(answers: Answers): TagResult {
  const scores = calculateDimensionScores(answers);
  
  // 生成组合key
  const key = [
    getLevel(scores.social),
    getLevel(scores.thinking),
    getLevel(scores.stress),
    getLevel(scores.life),
    getLevel(scores.time),
  ].join('-');

  // 查找预定义组合
  if (tagCombinations[key]) {
    const combo = tagCombinations[key];
    return {
      mainTag: combo.tag,
      subTags: [
        stressLabels[getLevel(scores.stress)].label,
        lifeLabels[getLevel(scores.life)].label,
        timeLabels[getLevel(scores.time)].label,
      ],
      description: combo.description,
      emoji: combo.emoji,
      color: combo.color,
    };
  }

  // 使用默认生成
  return generateDefaultTag(scores);
}

export function getScoreEmoji(scores: DimensionScores): string[] {
  return [
    socialLabels[getLevel(scores.social)].emoji,
    thinkingLabels[getLevel(scores.thinking)].emoji,
    stressLabels[getLevel(scores.stress)].emoji,
    lifeLabels[getLevel(scores.life)].emoji,
    timeLabels[getLevel(scores.time)].emoji,
  ];
}

export function getDimensionLabels(scores: DimensionScores) {
  return {
    social: socialLabels[getLevel(scores.social)],
    thinking: thinkingLabels[getLevel(scores.thinking)],
    stress: stressLabels[getLevel(scores.stress)],
    life: lifeLabels[getLevel(scores.life)],
    time: timeLabels[getLevel(scores.time)],
  };
}

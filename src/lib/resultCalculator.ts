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
  roast: string; // 毒舌吐槽
  keyword2025: string; // 2025年度关键词
  prediction2026: string; // 2026预言
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

// 🔥 新版毒舌人设标签系统 - 更有网感和争议性
const tagCombinations: Record<string, TagResult> = {
  // 社交高 + 生活高 = 精神氪金玩家
  'social_high_life_high': {
    mainTag: '精神氪金玩家',
    subTags: ['社交永动机', 'e人天花板', '朋友圈显眼包'],
    description: '你的社交精力仿佛开了无限外挂，别人还在充电你已经又开了一局',
    roast: '但说真的，你不累吗？你的introvert朋友们已经被你榨干了',
    keyword2025: '社交KPI超额完成',
    prediction2026: '2026年可能会：终于学会享受独处（大概吧）',
    emoji: '⚡',
    color: 'from-yellow-400 via-orange-500 to-red-500',
  },
  // 社交低 + 思维高 = 赛博隐士
  'social_low_thinking_high': {
    mainTag: '赛博隐士',
    subTags: ['精神洁癖', '人间清醒', '社恐但清醒'],
    description: '你看透了这个世界，选择在角落安静地当一个清醒的旁观者',
    roast: '承认吧，你不是不想社交，你只是懒得解释自己为什么这么优秀',
    keyword2025: '精神内核稳定',
    prediction2026: '2026年可能会：被迫营业一次（但表情管理依然到位）',
    emoji: '🌙',
    color: 'from-purple-500 via-indigo-500 to-blue-600',
  },
  // 压力高 + 时间低 = 拖延症晚期
  'stress_high_time_low': {
    mainTag: '拖延症晚期',
    subTags: ['DDL战神', '极限操作', '夜猫子本猫'],
    description: '在deadline面前疯狂输出，压力是你的超能力buff',
    roast: '每次都说下次一定提前，但你我都知道这是个美丽的谎言',
    keyword2025: '火烧眉毛才是动力',
    prediction2026: '2026年可能会：继续拖延（但你依然能活下来）',
    emoji: '🔥',
    color: 'from-red-500 via-orange-500 to-yellow-500',
  },
  // 生活高 + 时间高 = YOLO星人
  'life_high_time_high': {
    mainTag: 'YOLO星人',
    subTags: ['人生体验家', '及时行乐', '活在当下'],
    description: '你把每一天都活成了最后一天，人生就是用来挥霍的',
    roast: '存款？那是什么？能让我更快乐吗？',
    keyword2025: '快乐至上主义者',
    prediction2026: '2026年可能会：开启一段新的冒险（钱包准备好了吗）',
    emoji: '🎪',
    color: 'from-pink-500 via-rose-500 to-red-500',
  },
  // 思维高 + 压力低 = 人间清醒
  'thinking_high_stress_low': {
    mainTag: '人间清醒',
    subTags: ['情绪稳定', '理性怪物', '淡定王者'],
    description: '泰山崩于前而色不变，你是那个永远冷静到可怕的人',
    roast: '别人焦虑的时候你在干嘛？在心里默默吐槽他们',
    keyword2025: '心如止水型选手',
    prediction2026: '2026年可能会：继续当大家的情绪稳定器（辛苦了）',
    emoji: '🧊',
    color: 'from-cyan-400 via-teal-500 to-emerald-500',
  },
  // 社交高 + 压力高 = 表面社牛
  'social_high_stress_high': {
    mainTag: '表面社牛',
    subTags: ['内心戏精', '人均社恐', '微笑抑郁'],
    description: '人前社牛本牛，人后只想静静，你的社交电量全靠演技撑着',
    roast: '聚会时笑得最大声的是你，回家倒头就睡的也是你',
    keyword2025: '人设维护大师',
    prediction2026: '2026年可能会：学会说"不"（真的，试试看）',
    emoji: '🎭',
    color: 'from-blue-500 via-purple-500 to-pink-500',
  },
  // 生活低 + 思维高 = 低调狠人
  'life_low_thinking_high': {
    mainTag: '低调狠人',
    subTags: ['闷声发财', '务实派', '效率怪物'],
    description: '别人在玩的时候你在默默进化，你的野心都藏在沉默里',
    roast: '表面上风平浪静，其实早就在暗中观察所有人了',
    keyword2025: '韬光养晦进行中',
    prediction2026: '2026年可能会：突然发力让所有人震惊',
    emoji: '🦊',
    color: 'from-slate-500 via-zinc-600 to-neutral-700',
  },
  // 时间高 + 社交低 = 卷王本王
  'time_high_social_low': {
    mainTag: '卷王本王',
    subTags: ['时间管理', '自律达人', '效率机器'],
    description: '你的一天有48小时，别人的24小时在你面前瑟瑟发抖',
    roast: '承认吧，你已经把"努力"当成了一种瘾',
    keyword2025: '自我提升成瘾者',
    prediction2026: '2026年可能会：终于允许自己休息一天（也许）',
    emoji: '🏃',
    color: 'from-emerald-500 via-green-500 to-lime-500',
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
      mainTag: '人来疯本疯',
      subTags: ['社交达人', '气氛组组长', '人群中的焦点'],
      description: '有人的地方就有你，没人的地方你可以制造人群',
      roast: '你的社交能量确实惊人，但偶尔也要给别人一点喘息空间',
      keyword2025: '社交小蝴蝶',
      prediction2026: '2026年可能会：认识更多奇奇怪怪的朋友',
      emoji: '🦋',
      color: 'from-yellow-400 via-amber-500 to-orange-500',
    };
  }
  
  if (thinkingLevel === 'high') {
    return {
      mainTag: '思考者本者',
      subTags: ['脑子转得快', '分析怪', '理性大师'],
      description: '你的大脑从不休息，连做梦都在思考人生',
      roast: '有时候想太多也是一种病，试着让大脑放个假？',
      keyword2025: '过度思考患者',
      prediction2026: '2026年可能会：想通一些一直想不通的事',
      emoji: '🧠',
      color: 'from-blue-500 via-cyan-500 to-teal-500',
    };
  }

  if (lifeLevel === 'high') {
    return {
      mainTag: '生活艺术家',
      subTags: ['会享受', '有品味', '精致生活'],
      description: '你把平凡的日子过成诗，每一天都是精心编排的',
      roast: '但说真的，你的仪式感是不是有点太多了',
      keyword2025: '生活品质担当',
      prediction2026: '2026年可能会：解锁更多让人羡慕的生活方式',
      emoji: '🎨',
      color: 'from-pink-500 via-purple-500 to-indigo-500',
    };
  }

  if (timeLevel === 'high') {
    return {
      mainTag: '时间魔法师',
      subTags: ['充实人生', '不虚度', '日程表满满'],
      description: '你的时间都花在了刀刃上，每一分钟都不浪费',
      roast: '累不累啊？偶尔摆烂一下天塌不下来的',
      keyword2025: '时间利用率MAX',
      prediction2026: '2026年可能会：发现"无聊"其实也挺好的',
      emoji: '⏰',
      color: 'from-amber-500 via-yellow-500 to-lime-500',
    };
  }

  if (stressLevel === 'low') {
    return {
      mainTag: '佛系躺平人',
      subTags: ['心态好', '不内耗', '岁月静好'],
      description: '你有一颗平和的心，不被焦虑所困扰，让人羡慕到哭',
      roast: '你是怎么做到不焦虑的？求传授秘诀！',
      keyword2025: '躺平学大师',
      prediction2026: '2026年可能会：继续佛系（这也是一种能力）',
      emoji: '🍃',
      color: 'from-green-400 via-emerald-500 to-teal-500',
    };
  }

  // 通用默认
  return {
    mainTag: '神秘选手',
    subTags: ['难以定义', '独特灵魂', '不走寻常路'],
    description: '你太独特了，以至于任何标签都无法完全定义你',
    roast: '系统表示：你是个谜，但是个有趣的谜',
    keyword2025: '无法被定义的存在',
    prediction2026: '2026年可能会：继续让大家猜不透你',
    emoji: '🔮',
    color: 'from-indigo-500 via-purple-500 to-pink-500',
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

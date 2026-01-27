import { Answers } from "./resultCalculator";

// 游戏属性接口
export interface GameAttributes {
       money: number;
       hair: number;
       iq: number;
       happiness: number;
}

// 选择记录接口
export interface ChoiceRecord {
       eventId: string;
       choice: 'A' | 'B';
       timestamp: number;
       attributesBefore: GameAttributes;
}

// 统计维度
interface DimensionScore {
       stress: number;   // 压力/卷 (Money driven)
       social: number;   // 社交 (Social/Event driven)
       thinking: number; // 思考 (IQ driven)
       life: number;     // 生活 (Happiness/Hair driven)
}

// 将游戏属性映射为问卷答案格式
export function mapAttributesToAnswers(attributes: GameAttributes): Answers {
       const answers: Answers = {};

       // 保持兼容性，生成模拟答案

       // Money -> Stress/Thinking
       if (attributes.money > 70) {
              answers['q1'] = 'A';
              answers['q5'] = 'B';
       }

       // Happiness -> Social/Life
       if (attributes.happiness > 70) {
              answers['q2'] = 'A';
              answers['q6'] = 'D';
       }

       // IQ -> Thinking
       if (attributes.iq > 70) {
              answers['q3'] = 'C';
              answers['q7'] = 'A';
       }

       // Hair -> Low Stress/Life
       if (attributes.hair > 70) {
              answers['q4'] = 'D';
              answers['q8'] = 'B';
       }

       // 兜底补全
       const options = ['A', 'B', 'C', 'D'];
       for (let i = 1; i <= 8; i++) {
              const key = `q${i}`;
              if (!answers[key]) {
                     answers[key] = options[Math.floor(Math.random() * 4)];
              }
       }

       return answers;
}

// 综合分析游戏结果 (属性 + 选择历史)
export function analyzeGameResult(attributes: GameAttributes, choices: ChoiceRecord[] = []): string {
       const { money, hair, iq, happiness } = attributes;

       // 1. 分析选择倾向
       let workCount = 0;
       let socialCount = 0;
       let lifeCount = 0;
       let riskCount = 0; // 随机/冒险事件

       // 这里我们需要假设 ChoiceRecord 的 eventId 能反映类别
       // 或者我们需要把 event category 存入 ChoiceRecord
       // 暂时通过 eventId 前缀判断 (work_, social_, life_, random_)
       choices.forEach(c => {
              if (c.eventId.startsWith('work_')) workCount++;
              else if (c.eventId.startsWith('social_')) socialCount++;
              else if (c.eventId.startsWith('life_')) lifeCount++;
              else if (c.eventId.startsWith('random_')) riskCount++;
       });

       const totalChoices = choices.length || 1;
       const workRatio = workCount / totalChoices;
       const socialRatio = socialCount / totalChoices;
       const lifeRatio = lifeCount / totalChoices;

       // 2. 结合属性判定

       // --- 特殊结局 (极端属性) ---

       // 卷王本王: 钱多(>60)，头发少(<40)，且职场选择占比高
       if (money > 60 && hair < 40 && workRatio > 0.3) return '卷王本王';

       // 赛博隐士: 头发多(>60)，钱少(<40)，社交选择极少
       if (hair > 60 && money < 40 && socialRatio < 0.2) return '赛博隐士';

       // 精神氪金玩家: 快乐极高(>80)，钱少(<30)
       if (happiness > 80 && money < 30) return '精神氪金玩家';

       // 人间清醒: 智商极高(>80)
       if (iq > 80) return '人间清醒';

       // --- 行为驱动结局 ---

       // 表面社牛: 社交选择多，且快乐值不低
       if (socialRatio > 0.4 && happiness > 50) return '表面社牛';

       // 拖延症晚期: 生活/享乐选择多，但快乐并没有很高(可能是无效躺平)，且智商一般
       if (lifeRatio > 0.4 && happiness < 60 && iq < 60) return '拖延症晚期';

       // YOLO星人: 随机/冒险选择多，或者快乐很高
       if ((riskCount / totalChoices > 0.3) || happiness > 70) return 'YOLO星人';

       // 低调狠人: 各方面都不错，且没有明显短板
       if (money > 50 && iq > 50 && happiness > 50 && hair > 50) return '低调狠人';

       // 默认兜底
       return '赛博隐士';
}

// 废弃旧方法，保留兼容
export function determineGameResultTag(attributes: GameAttributes): string {
       return analyzeGameResult(attributes, []);
}

import { Answers } from "./resultCalculator";

// 游戏属性接口
export interface GameAttributes {
       money: number;
       hair: number;
       iq: number;
       happiness: number;
}

// 将游戏属性映射为问卷答案格式，以便复用现有的计算逻辑
// 或者直接返回计算出的 TagResult 类型
export function mapAttributesToAnswers(attributes: GameAttributes): Answers {
       // 这里我们反向生成一份假的 Answers，让 calculateResult 能算出我们要的结果
       // 现有的 Tag 逻辑是基于 dimensions (social, stress, thinking, life)

       // 映射关系：
       // Money (高) -> Stress (高), Life (低)
       // Hair (高) -> Stress (低), Life (高)
       // IQ (高) -> Thinking (高), Social (低)
       // Happiness (高) -> Social (高), Stress (低)

       const answers: Answers = {};

       // 简单模拟生成 8 道题的答案
       // A, B, C, D 选项分别对应不同维度的加分

       // 如果 Money 高 (>70) -> 倾向于 "卷王本王" (High Stress, High Thinking)
       if (attributes.money > 70) {
              answers['q1'] = 'A'; // 工作狂选项
              answers['q5'] = 'B'; // 搞钱选项
       }

       // 如果 Happiness 高 (>70) -> "YOLO星人" (High Life, High Social)
       if (attributes.happiness > 70) {
              answers['q2'] = 'A'; // 享乐选项
              answers['q6'] = 'D'; // 聚会选项
       }

       // 如果 IQ 高 (>70) -> "人间清醒" (High Thinking, Low Social)
       if (attributes.iq > 70) {
              answers['q3'] = 'C'; // 思考选项
              answers['q7'] = 'A'; // 独处选项
       }

       // 如果 Hair 高 (同时意味着 Money 低, Stress 低) -> "赛博隐士" (Low Social, Low Stress)
       if (attributes.hair > 70) {
              answers['q4'] = 'D'; // 养生选项
              answers['q8'] = 'B'; // 躺平选项
       }

       // 兜底：如果都很平均，随机填充
       const options = ['A', 'B', 'C', 'D'];
       for (let i = 1; i <= 8; i++) {
              const key = `q${i}`;
              if (!answers[key]) {
                     answers[key] = options[Math.floor(Math.random() * 4)];
              }
       }

       return answers;
}

// 直接根据属性返回 MainTag (更准确)
export function determineGameResultTag(attributes: GameAttributes): string {
       const { money, hair, iq, happiness } = attributes;

       // 1. 卷王本王: 钱多，头发少
       if (money > 70 && hair < 30) return '卷王本王';

       // 2. 赛博隐士: 头发多，社交少(快乐中等)，钱少
       if (hair > 70 && money < 40) return '赛博隐士';

       // 3. 精神氪金玩家: 快乐极高，钱少
       if (happiness > 80 && money < 30) return '精神氪金玩家';

       // 4. 人间清醒: 智商极高，快乐一般
       if (iq > 80) return '人间清醒';

       // 5. 拖延症晚期: 啥都一般，快乐尚可
       if (happiness > 50 && money < 50 && iq < 50) return '拖延症晚期';

       // 6. YOLO星人: 快乐高，钱也还行
       if (happiness > 70 && money > 50) return 'YOLO星人';

       // 7. 低调狠人: 钱多，智商高，不显山露水
       if (money > 60 && iq > 60) return '低调狠人';

       // 8. 表面社牛: 快乐看似高，其实智商(敏感度)也高
       if (happiness > 60 && iq > 60) return '表面社牛';

       return '赛博隐士'; // 默认
}

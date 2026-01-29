import { Answers } from "./resultCalculator";
import { ChoiceRecord } from "@/components/game/LifeEditor";

export interface GameAttributes {
       money: number;
       hair: number;
       iq: number;
       happiness: number;
}

// Stats Mapping (to keep compatible with survey)
export function mapAttributesToAnswers(attributes: GameAttributes): Answers {
       const answers: Answers = {};
       const options = ['A', 'B', 'C', 'D'];
       // Mock answers based on attributes just to fill the data, 
       // real logic relies on analyzeGameResult returning the Tag string.
       for (let i = 1; i <= 8; i++) {
              answers[`q${i}`] = options[Math.floor(Math.random() * 4)];
       }
       return answers;
}

export function analyzeGameResult(attributes: GameAttributes, choices: ChoiceRecord[] = []): string {
       const { money, hair, iq, happiness } = attributes;

       // 1. 计算行为偏好比例
       let workCount = 0;
       let socialCount = 0;
       let lifeCount = 0;
       let riskCount = 0;

       // 2. 关键事件标记
       let is996Warrior = false; // 996战士
       let isResigner = false;   // 裸辞侠
       let isBigSpender = false; // 剁手党
       let isGambler = false;    // 赌徒

       choices.forEach(c => {
              if (c.eventId.startsWith('work_')) workCount++;
              else if (c.eventId.startsWith('social_')) socialCount++;
              else if (c.eventId.startsWith('life_')) lifeCount++;
              else if (c.eventId.startsWith('random_')) riskCount++;

              // 检查关键选择
              if (c.eventId === 'work_996' && c.choice === 'A') is996Warrior = true;
              if (c.eventId === 'random_resign' && c.choice === 'A') isResigner = true;
              if (c.eventId === 'life_shopping' && c.choice === 'A') isBigSpender = true;
              if (c.eventId === 'random_invest' && c.choice === 'A') isGambler = true;
       });

       const total = choices.length || 1;
       const socialRatio = socialCount / total;

       // 3. 加权维度评分 (0-100)
       // 卷度：钱多、发少、快乐少、选了996
       const curlScore = (money * 0.4) + ((100 - hair) * 0.3) + ((100 - happiness) * 0.3) + (is996Warrior ? 15 : 0);

       // 躺平度：快乐多、发多、钱少、裸辞
       const layScore = (happiness * 0.4) + (hair * 0.3) + ((100 - money) * 0.3) + (isResigner ? 15 : 0);

       // 社交度：社交占比高
       const socialScore = socialRatio * 100;

       // 智谋度：智商高、钱多
       const smartScore = (iq * 0.6) + (money * 0.4);

       // 4. 最终判定逻辑 (优先级：特质 > 最高分)

       // --- 特殊极值 ---
       if (happiness < 20 && money < 40) return '刀马'; // 惨
       if (money > 85 && iq > 70) return '皇阿马'; // 顶级赢家
       if (attributes.hair < 20) return '马bee'; // 秃了

       // --- 关键事件主导 ---
       if (is996Warrior && money > 50) return '战马'; // 卷赢了
       if (is996Warrior && money < 50) return '牛马'; // 卷输了 (经典牛马)
       if (isResigner && happiness > 60) return '白聋马'; // 潇洒离职
       if (isBigSpender && money < 30) return '爱马仕'; // 精致穷
       if (isGambler && money < 20) return '马卡笼'; // 赌输了

       // --- 评分主导 ---
       const maxScore = Math.max(curlScore, layScore, socialScore, smartScore);

       if (maxScore === curlScore) {
              return money > 60 ? '战马' : '牛马';
       }
       if (maxScore === layScore) {
              return happiness > 70 ? '饿了马' : '河马'; // 饿了马=快乐穷，河马=纯躺
       }
       if (maxScore === socialScore) {
              return '傻马特';
       }
       if (maxScore === smartScore) {
              return iq > 80 ? '千里马' : '收款马';
       }

       // --- 默认 ---
       // 如果智商极低
       if (iq < 30) return '马冬梅';

       return '搬马'; // 平平无奇
}

export function determineGameResultTag(attributes: GameAttributes): string {
       return analyzeGameResult(attributes, []);
}

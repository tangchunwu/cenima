import { Language } from './i18n/translations';

// 人生事件卡数据库
// 每个事件影响 4 个属性：money（资产）, hair（发量）, iq（智力）, happiness（快乐）

export interface LifeEvent {
       id: string;
       title: string;
       description: string;
       emoji: string;
       image?: string; // 霓虹塔罗插图路径
       category: 'work' | 'social' | 'life' | 'random';
       optionA: {
              text: string;
              effects: { money?: number; hair?: number; iq?: number; happiness?: number };
       };
       optionB: {
              text: string;
              effects: { money?: number; hair?: number; iq?: number; happiness?: number };
       };
}

const lifeEventsZh: LifeEvent[] = [
       // ===== 职场类 =====
       {
              id: 'work_996',
              title: '996 邀请函',
              description: '老板邀请你加入核心项目，需要996但承诺年终奖翻倍',
              emoji: '💼',
              image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', // Building
              category: 'work',
              optionA: { text: '接受挑战', effects: { money: 25, hair: -20, happiness: -10 } },
              optionB: { text: '婉拒保命', effects: { happiness: 10, money: -5 } },
       },
       {
              id: 'work_promotion',
              title: '晋升机会',
              description: '有个管理岗位空缺，但需要你负责更多事务',
              emoji: '📈',
              category: 'work',
              optionA: { text: '冲！', effects: { money: 20, iq: 10, hair: -15, happiness: -5 } },
              optionB: { text: '躺平挺好', effects: { happiness: 15, hair: 5 } },
       },
       {
              id: 'work_deadline',
              title: '紧急 Deadline',
              description: '项目要提前交付，需要连续加班三天',
              emoji: '⏰',
              image: 'https://images.unsplash.com/photo-1506784317898-7104416f6b35?q=80&w=800&auto=format&fit=crop', // Clock/Time
              category: 'work',
              optionA: { text: '熬夜赶工', effects: { money: 15, hair: -25, happiness: -15 } },
              optionB: { text: '申请延期', effects: { iq: 10, money: -10 } },
       },
       {
              id: 'work_side',
              title: '副业机会',
              description: '朋友邀请你一起做个小项目，可能赚钱也可能白忙',
              emoji: '🚀',
              category: 'work',
              optionA: { text: '搞起来', effects: { money: 20, hair: -10, iq: 5 } },
              optionB: { text: '专注主业', effects: { happiness: 10, hair: 5 } },
       },

       // ===== 社交类 =====
       {
              id: 'social_party',
              title: '周末聚会',
              description: '朋友喊你周末去 KTV，你已经累了一周',
              emoji: '🎤',
              image: 'https://images.unsplash.com/photo-1514525253440-b393452e2729?q=80&w=800&auto=format&fit=crop', // Party
              category: 'social',
              optionA: { text: '嗨起来', effects: { happiness: 20, money: -15, hair: -5 } },
              optionB: { text: '在家躺着', effects: { hair: 10, happiness: -5 } },
       },
       {
              id: 'social_date',
              title: '心动约会',
              description: '有个心仪的人约你吃饭，但今晚你有个重要会议',
              emoji: '💕',
              image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop', // Neon Date
              category: 'social',
              optionA: { text: '赴约！', effects: { happiness: 25, money: -10, iq: -5 } },
              optionB: { text: '工作优先', effects: { money: 10, happiness: -15 } },
       },
       {
              id: 'social_help',
              title: '朋友求助',
              description: '好友搬家需要帮忙，但你周末本来想休息',
              emoji: '📦',
              image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?q=80&w=800&auto=format&fit=crop', // Boxes
              category: 'social',
              optionA: { text: '义气相挺', effects: { happiness: 15, hair: -10 } },
              optionB: { text: '找借口推掉', effects: { hair: 10, happiness: -10, iq: -5 } },
       },
       {
              id: 'social_wedding',
              title: '红色炸弹',
              description: '收到婚礼请柬，份子钱不便宜',
              emoji: '💒',
              category: 'social',
              optionA: { text: '出席送祝福', effects: { happiness: 10, money: -20 } },
              optionB: { text: '随个红包算了', effects: { money: -10, happiness: -5 } },
       },

       // ===== 生活类 =====
       {
              id: 'life_gym',
              title: '健身计划',
              description: '办了健身卡，今天要不要去练一下？',
              emoji: '🏋️',
              category: 'life',
              optionA: { text: '撸铁！', effects: { hair: 15, happiness: 10, iq: 5 } },
              optionB: { text: '明天再说', effects: { happiness: 5, hair: -5 } },
       },
       {
              id: 'life_takeout',
              title: '外卖诱惑',
              description: '深夜饿了，是吃炸鸡还是忍一忍？',
              emoji: '🍗',
              image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800&auto=format&fit=crop', // Food
              category: 'life',
              optionA: { text: '吃！减什么肥', effects: { happiness: 15, hair: -5, money: -5 } },
              optionB: { text: '喝杯水睡觉', effects: { hair: 10, iq: 5 } },
       },
       {
              id: 'life_sleep',
              title: '熬夜刷剧',
              description: '追的剧更新了，但已经凌晨1点',
              emoji: '📺',
              category: 'life',
              optionA: { text: '先看两集', effects: { happiness: 15, hair: -15, iq: -5 } },
              optionB: { text: '明天再看', effects: { hair: 10, iq: 5 } },
       },
       {
              id: 'life_shopping',
              title: '购物车召唤',
              description: '双十一到了，购物车里的东西在呼唤你',
              emoji: '🛒',
              category: 'life',
              optionA: { text: '清空购物车', effects: { happiness: 20, money: -25 } },
              optionB: { text: '理性消费', effects: { money: 10, happiness: -5 } },
       },
       {
              id: 'life_pet',
              title: '猫咪生病',
              description: '毛孩子精神不太好，带去医院花费可能不少',
              emoji: '😿',
              category: 'life',
              optionA: { text: '立刻送医', effects: { money: -20, happiness: 10, iq: 5 } },
              optionB: { text: '先观察一下', effects: { happiness: -15 } },
       },

       // ===== 随机类 =====
       {
              id: 'random_lottery',
              title: '彩票站',
              description: '路过彩票站，要不要买一注？',
              emoji: '🎰',
              category: 'random',
              optionA: { text: '来一注', effects: { money: -5, happiness: 10 } },
              optionB: { text: '不赌为赢', effects: { iq: 5 } },
       },
       {
              id: 'random_rain',
              title: '突然下雨',
              description: '没带伞，打车还是淋雨跑回去？',
              emoji: '🌧️',
              image: 'https://images.unsplash.com/photo-1605218427306-635ba7b04886?q=80&w=800&auto=format&fit=crop', // Rain
              category: 'random',
              optionA: { text: '打车', effects: { money: -10, hair: 5 } },
              optionB: { text: '跑！', effects: { hair: -10, happiness: 5, iq: -5 } },
       },
       {
              id: 'random_boss',
              title: '老板请客',
              description: '老板突然请部门吃饭，但要陪酒',
              emoji: '🍺',
              category: 'random',
              optionA: { text: '陪喝', effects: { money: 10, hair: -15, happiness: 5 } },
              optionB: { text: '找借口溜了', effects: { happiness: 10, money: -5 } },
       },
       {
              id: 'random_invest',
              title: '理财建议',
              description: '同事推荐了一个"稳赚不赔"的投资',
              emoji: '📊',
              category: 'random',
              optionA: { text: '跟一把', effects: { money: 30, iq: -10, happiness: -5 } },
              optionB: { text: '谨慎拒绝', effects: { iq: 10, money: 5 } },
       },
       {
              id: 'random_coffee',
              title: '咖啡续命',
              description: '下午犯困，来杯咖啡提神？',
              emoji: '☕',
              category: 'random',
              optionA: { text: '来一杯', effects: { iq: 10, money: -5, hair: -5 } },
              optionB: { text: '困了就睡', effects: { hair: 10, iq: -5 } },
       },
       {
              id: 'random_resign',
              title: '裸辞冲动',
              description: '工作太累了，想立刻辞职',
              emoji: '🚪',
              image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', // Door
              category: 'random',
              optionA: { text: '冲动辞职', effects: { happiness: 30, money: -30, hair: 20 } },
              optionB: { text: '忍忍再说', effects: { money: 10, happiness: -10, hair: -10 } },
       },
];

const lifeEventsEn: LifeEvent[] = [
       // ===== Work =====
       {
              id: 'work_996',
              title: 'Overtime Invitation',
              description: 'Boss asks you to join a core project (996) but promises double bonus.',
              emoji: '💼',
              category: 'work',
              optionA: { text: 'Accept Challenge', effects: { money: 25, hair: -20, happiness: -10 } },
              optionB: { text: 'Decline for Health', effects: { happiness: 10, money: -5 } },
       },
       {
              id: 'work_promotion',
              title: 'Promotion Chance',
              description: 'A management position is open, but comes with more responsibility.',
              emoji: '📈',
              category: 'work',
              optionA: { text: 'Go for it!', effects: { money: 20, iq: 10, hair: -15, happiness: -5 } },
              optionB: { text: 'Stay Chill', effects: { happiness: 15, hair: 5 } },
       },
       {
              id: 'work_deadline',
              title: 'Urgent Deadline',
              description: 'Project due earlier. Need to work late for 3 days.',
              emoji: '⏰',
              category: 'work',
              optionA: { text: 'Work All Night', effects: { money: 15, hair: -25, happiness: -15 } },
              optionB: { text: 'Ask Extension', effects: { iq: 10, money: -10 } },
       },
       {
              id: 'work_side',
              title: 'Side Hustle',
              description: 'Friend invites you to a startup. High risk, high reward?',
              emoji: '🚀',
              category: 'work',
              optionA: { text: 'Do it!', effects: { money: 20, hair: -10, iq: 5 } },
              optionB: { text: 'Focus on Job', effects: { happiness: 10, hair: 5 } },
       },

       // ===== Social =====
       {
              id: 'social_party',
              title: 'Weekend Party',
              description: 'Friends invite you to KTV, but you are tired.',
              emoji: '🎤',
              category: 'social',
              optionA: { text: 'Let\'s Party!', effects: { happiness: 20, money: -15, hair: -5 } },
              optionB: { text: 'Stay Home', effects: { hair: 10, happiness: -5 } },
       },
       {
              id: 'social_date',
              title: 'Romantic Date',
              description: 'Your crush invites you to dinner, but you have a meeting.',
              emoji: '💕',
              category: 'social',
              optionA: { text: 'Go on Date!', effects: { happiness: 25, money: -10, iq: -5 } },
              optionB: { text: 'Work First', effects: { money: 10, happiness: -15 } },
       },
       {
              id: 'social_help',
              title: 'Friend Needs Help',
              description: 'Friend moving house needs help on your rest day.',
              emoji: '📦',
              category: 'social',
              optionA: { text: 'Help Friend', effects: { happiness: 15, hair: -10 } },
              optionB: { text: 'Make Excuse', effects: { hair: 10, happiness: -10, iq: -5 } },
       },
       {
              id: 'social_wedding',
              title: 'Wedding Invite',
              description: 'Received a wedding invitation. Gift money is expensive.',
              emoji: '💒',
              category: 'social',
              optionA: { text: 'Attend & Gift', effects: { happiness: 10, money: -20 } },
              optionB: { text: 'Send Red Packet', effects: { money: -10, happiness: -5 } },
       },

       // ===== Life =====
       {
              id: 'life_gym',
              title: 'Gym Time',
              description: 'Bought a gym membership. Go workout today?',
              emoji: '🏋️',
              category: 'life',
              optionA: { text: 'Workout!', effects: { hair: 15, happiness: 10, iq: 5 } },
              optionB: { text: 'Maybe Tomorrow', effects: { happiness: 5, hair: -5 } },
       },
       {
              id: 'life_takeout',
              title: 'Late Night Snack',
              description: 'Hungry at midnight. Fried chicken or water?',
              emoji: '🍗',
              category: 'life',
              optionA: { text: 'Fried Chicken!', effects: { happiness: 15, hair: -5, money: -5 } },
              optionB: { text: 'Drink Water', effects: { hair: 10, iq: 5 } },
       },
       {
              id: 'life_sleep',
              title: 'Binge Watching',
              description: 'New episode is out, but it\'s 1 AM.',
              emoji: '📺',
              category: 'life',
              optionA: { text: 'Watch 2 eps', effects: { happiness: 15, hair: -15, iq: -5 } },
              optionB: { text: 'Sleep', effects: { hair: 10, iq: 5 } },
       },
       {
              id: 'life_shopping',
              title: 'Shopping Spree',
              description: 'Double 11 Sale! Your cart is calling you.',
              emoji: '🛒',
              category: 'life',
              optionA: { text: 'Buy All', effects: { happiness: 20, money: -25 } },
              optionB: { text: 'Be Rational', effects: { money: 10, happiness: -5 } },
       },
       {
              id: 'life_pet',
              title: 'Sick Pet',
              description: 'Your cat looks sick. Vet bill might be high.',
              emoji: '😿',
              category: 'life',
              optionA: { text: 'Go to Vet', effects: { money: -20, happiness: 10, iq: 5 } },
              optionB: { text: 'Wait & See', effects: { happiness: -15 } },
       },

       // ===== Random =====
       {
              id: 'random_lottery',
              title: 'Lottery',
              description: 'Passing a lottery shop. Buy a ticket?',
              emoji: '🎰',
              category: 'random',
              optionA: { text: 'Buy One', effects: { money: -5, happiness: 10 } },
              optionB: { text: 'No Gambling', effects: { iq: 5 } },
       },
       {
              id: 'random_rain',
              title: 'Sudden Rain',
              description: 'No umbrella. Taxi or run in rain?',
              emoji: '🌧️',
              category: 'random',
              optionA: { text: 'Taxi', effects: { money: -10, hair: 5 } },
              optionB: { text: 'Run!', effects: { hair: -10, happiness: 5, iq: -5 } },
       },
       {
              id: 'random_boss',
              title: 'Boss Treat',
              description: 'Boss invites team for dinner, but must drink alcohol.',
              emoji: '🍺',
              category: 'random',
              optionA: { text: 'Drink', effects: { money: 10, hair: -15, happiness: 5 } },
              optionB: { text: 'Escape', effects: { happiness: 10, money: -5 } },
       },
       {
              id: 'random_invest',
              title: 'Investment Tip',
              description: 'Colleague suggests a "sure win" investment.',
              emoji: '📊',
              category: 'random',
              optionA: { text: 'Invest', effects: { money: 30, iq: -10, happiness: -5 } },
              optionB: { text: 'Decline', effects: { iq: 10, money: 5 } },
       },
       {
              id: 'random_coffee',
              title: 'Coffee Break',
              description: 'Sleepy afternoon. Coffee?',
              emoji: '☕',
              category: 'random',
              optionA: { text: 'Drink Coffee', effects: { iq: 10, money: -5, hair: -5 } },
              optionB: { text: 'Take Nap', effects: { hair: 10, iq: -5 } },
       },
       {
              id: 'random_resign',
              title: 'Quit Job',
              description: 'Too tired. Want to quit job now.',
              emoji: '🚪',
              category: 'random',
              optionA: { text: 'Quit Now', effects: { happiness: 30, money: -30, hair: 20 } },
              optionB: { text: 'Endure', effects: { money: 10, happiness: -10, hair: -10 } },
       },
];

// 获取随机事件（根据语言）
export function getRandomEvents(count: number, lang: Language = 'zh'): LifeEvent[] {
       const source = lang === 'en' ? lifeEventsEn : lifeEventsZh;
       const shuffled = [...source].sort(() => Math.random() - 0.5);
       return shuffled.slice(0, count);
}

// 1分钟游戏，约 12-15 张卡
export const EVENTS_PER_GAME = 12;
export const DECISION_TIME_MS = 4000; // 每张卡 4 秒决策时间

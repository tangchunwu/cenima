import { ReportCard } from './ReportCard';
import { TagResult } from '@/lib/resultCalculator';
import { TrendingUp, Flame, Brain, Heart, Clock } from 'lucide-react';

interface DataCardProps {
  result: TagResult;
}

// 根据人设生成虚拟但有趣的数据
function generateFunData(result: TagResult) {
  // 基于标签类型生成不同的数据
  const dataMap: Record<string, any> = {
    '精神氪金玩家': {
      socialEnergy: 95,
      introvertTears: '∞',
      avgPartyPerWeek: 4.7,
      highlight: '成功让3个i人出门',
    },
    '赛博隐士': {
      peaceIndex: 88,
      socialBattery: 12,
      deepThinkHours: 847,
      highlight: '成功拒绝47个局',
    },
    '拖延症晚期': {
      ddlSurvivalRate: '100%',
      lastMinutePower: 'MAX',
      allNighters: 23,
      highlight: '凌晨3点的PPT最好看',
    },
    'YOLO星人': {
      happinessIndex: 97,
      spontaneousTrips: 12,
      newExperiences: 156,
      highlight: '钱包：？？？',
    },
    '人间清醒': {
      anxietyLevel: 5,
      wisdomScore: 94,
      dramaAvoided: 89,
      highlight: '情绪稳定到可怕',
    },
    '表面社牛': {
      actingSkill: 98,
      realEnergy: 15,
      fakeSmiles: 1847,
      highlight: '回家倒头就睡',
    },
    '低调狠人': {
      hiddenPower: 95,
      silentProgress: 'MAX',
      surprisePrep: 87,
      highlight: '暗中观察所有人',
    },
    '卷王本王': {
      efficiency: 99,
      restDays: 3,
      selfImproveHours: 2341,
      highlight: '自律到没朋友',
    },
  };

  return dataMap[result.mainTag] || {
    uniqueScore: 99,
    mysteryLevel: 'MAX',
    unpredictability: 100,
    highlight: '无法被分类的存在',
  };
}

export const DataCard = ({ result }: DataCardProps) => {
  const data = generateFunData(result);

  return (
    <ReportCard className="bg-gradient-to-br from-slate-800/90 via-purple-900/90 to-slate-800/90 border-2 border-mint/30">
      <div className="space-y-6">
        {/* 标题 */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-mint/20 px-4 py-1 rounded-full border border-mint/30">
            <TrendingUp className="w-4 h-4 text-mint" />
            <span className="text-sm font-bold text-mint">2025年度数据</span>
          </div>
          <p className="text-white/50 text-xs mt-2">（虚拟数据，但可能很准）</p>
        </div>

        {/* 数据展示 */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(data).slice(0, 4).map(([key, value], index) => {
            const icons = [Flame, Brain, Heart, Clock];
            const colors = ['text-red-400', 'text-blue-400', 'text-pink-400', 'text-yellow-400'];
            const bgColors = ['bg-red-500/10', 'bg-blue-500/10', 'bg-pink-500/10', 'bg-yellow-500/10'];
            const Icon = icons[index];
            
            const labels: Record<string, string> = {
              socialEnergy: '社交能量',
              introvertTears: 'i人眼泪',
              avgPartyPerWeek: '周均局数',
              highlight: '年度高光',
              peaceIndex: '内心平静度',
              socialBattery: '社交电量',
              deepThinkHours: '深度思考时长',
              ddlSurvivalRate: 'DDL存活率',
              lastMinutePower: '最后一刻能量',
              allNighters: '通宵次数',
              happinessIndex: '快乐指数',
              spontaneousTrips: '说走就走',
              newExperiences: '新体验次数',
              anxietyLevel: '焦虑等级',
              wisdomScore: '清醒指数',
              dramaAvoided: '成功避雷',
              actingSkill: '演技等级',
              realEnergy: '真实电量',
              fakeSmiles: '营业微笑',
              hiddenPower: '隐藏实力',
              silentProgress: '默默进化',
              surprisePrep: '惊喜准备',
              efficiency: '效率等级',
              restDays: '休息天数',
              selfImproveHours: '自我提升时长',
              uniqueScore: '独特指数',
              mysteryLevel: '神秘等级',
              unpredictability: '不可预测性',
            };

            if (key === 'highlight') return null;
            
            return (
              <div 
                key={key}
                className={`${bgColors[index]} rounded-xl p-4 border border-white/10`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${colors[index]}`} />
                  <span className="text-white/60 text-xs">{labels[key] || key}</span>
                </div>
              <p className={`text-2xl font-bold ${colors[index]}`}>
                  {typeof value === 'number' ? `${value}%` : String(value)}
                </p>
              </div>
            );
          })}
        </div>

        {/* 年度高光 */}
        {data.highlight && (
          <div className="bg-gradient-to-r from-primary/20 via-coral/20 to-mint/20 rounded-xl p-4 border border-white/10 text-center">
            <p className="text-white/60 text-xs mb-2">✨ 2025年度高光时刻</p>
            <p className="text-white font-bold text-lg">{data.highlight}</p>
          </div>
        )}

        {/* 内耗指数 */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/70 text-sm">2025内耗指数</span>
            <span className="text-red-400 text-xs">（仅供参考）</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i}
                className={`h-3 flex-1 rounded ${
                  i <= (result.mainTag.includes('清醒') || result.mainTag.includes('佛系') ? 2 : 
                        result.mainTag.includes('拖延') || result.mainTag.includes('表面') ? 5 : 3)
                    ? 'bg-gradient-to-r from-yellow-500 to-red-500'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>佛系</span>
            <span>爆炸</span>
          </div>
        </div>
      </div>
    </ReportCard>
  );
};

import { ReportCard } from './ReportCard';
import { TagResult, Answers, calculateChartData } from '@/lib/resultCalculator';
import { TrendingUp, Flame, Brain, Heart, Clock, Activity, AlertTriangle, Scan } from 'lucide-react';
import { AnnualCurveChart } from './charts/AnnualCurveChart';
import { DimensionRadarChart } from './charts/DimensionRadarChart';
import { useMemo } from 'react';

interface DataCardProps {
  result: TagResult;
  answers: Answers;
}

// 根据人设生成虚拟但有趣的数据 (保留旧逻辑作为补充)
function generateFunData(result: TagResult) {
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

export const DataCard = ({ result, answers }: DataCardProps) => {
  const funData = generateFunData(result);

  // 计算图表数据
  const chartData = useMemo(() => calculateChartData(answers), [answers]);

  return (
    <ReportCard className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 relative overflow-hidden">
      {/* 装饰背景 - 医疗网格 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="space-y-6 relative z-10">
        {/* 标题栏 - 科幻医疗风格 */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-mint/20 p-2 rounded-lg border border-mint/30">
              <Activity className="w-5 h-5 text-mint" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wider flex items-center gap-2">
                BIO-SCAN
                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded animate-pulse">LIVE</span>
              </h3>
              <p className="text-white/40 text-xs font-mono">REPORT ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>
          <Scan className="w-6 h-6 text-white/20" />
        </div>

        {/* 1. 五维雷达图 */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-2 relative">
          <div className="absolute top-2 left-3 text-xs text-white/50 font-mono flex items-center gap-1">
            <Scan className="w-3 h-3" /> 五维机能检测
          </div>
          <DimensionRadarChart data={chartData.dimensions} />
        </div>

        {/* 2. 年度状态K线 */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-3 pt-8 relative">
          <div className="absolute top-3 left-3 text-xs text-white/50 font-mono flex items-center gap-1">
            <Activity className="w-3 h-3" /> 年度心率/状态监控
          </div>
          <AnnualCurveChart data={chartData.annualCurve} />
        </div>

        {/* 3. 核心异常指标 (原趣味数据) */}
        <div className="bg-red-500/10 rounded-xl border border-red-500/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-bold text-sm">异常指标警示</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(funData).slice(0, 4).map(([key, value], index) => {
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
                <div key={key} className="flex justify-between items-center border-b border-white/5 pb-1">
                  <span className="text-white/60 text-xs font-mono">{labels[key] || key}</span>
                   <span className="text-white font-bold font-mono">{String(value)}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 4. 医生/系统建议 (高光时刻) */}
        {funData.highlight && (
          <div className="bg-mint/10 rounded-xl p-4 border border-mint/20 flex gap-3 text-left">
            <div className="mt-1">
              <Activity className="w-4 h-4 text-mint" />
            </div>
            <div>
              <p className="text-mint text-xs font-bold mb-1">SYSTEM DIAGNOSIS (系统诊断)</p>
              <p className="text-white/80 text-sm leading-relaxed">
                主体在2025年表现出极强的生存本能。<br />
                核心高光记录：<span className="text-mint font-bold underline">{funData.highlight}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </ReportCard>
  );
};

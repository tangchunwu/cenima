import { useRef } from 'react';
import { ReportCard } from './ReportCard';
import { TagResult, HealthIndices } from '@/lib/resultCalculator';
import { Battery, Activity, Zap, Brain, Flame, Skull, Radar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DimensionRadarChart } from './charts/DimensionRadarChart';
import { motion, useInView } from 'framer-motion';

interface HealthScoreCardProps {
       result: TagResult;
       indices: HealthIndices;
}

const ProgressBar = ({ value, color, label, icon: Icon, delay = 0 }: { value: number; color: string; label: string; icon: any; delay?: number }) => {
       const ref = useRef(null);
       const isInView = useInView(ref, { once: true });

       return (
              <div ref={ref} className="space-y-1">
                     <div className="flex justify-between text-xs font-mono font-bold">
                            <div className="flex items-center gap-2">
                                   <Icon className={`w-3 h-3 ${color}`} />
                                   <span className="text-white/70">{label}</span>
                            </div>
                            <span className={color}>{value}%</span>
                     </div>
                     <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/10 relative">
                            <motion.div
                                   className={`h-full ${color.replace('text-', 'bg-')} relative`}
                                   initial={{ width: 0 }}
                                   animate={isInView ? { width: `${value}%` } : { width: 0 }}
                                   transition={{ duration: 1, delay, ease: "easeOut" }}
                            >
                                   <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </motion.div>
                     </div>
              </div>
       );
};

export const HealthScoreCard = ({ result, indices }: HealthScoreCardProps) => {
       const radarData = [
              { subject: '暴躁', A: indices.anxietyLevel, fullMark: 100 },
              { subject: '磨损', A: indices.internalFriction, fullMark: 100 },
              { subject: '动力', A: indices.dopamineStock, fullMark: 100 },
              { subject: '欲望', A: indices.socialBattery, fullMark: 100 },
              { subject: '防御', A: 100 - (indices.anxietyLevel * 0.5), fullMark: 100 }, // 计算得出的伪属性
       ];

       return (
              <ReportCard className="bg-slate-900 border border-white/10 overflow-hidden relative">
                     {/* 背景动态光效 */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] animate-pulse" />
                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />

                     {/* 顶部标签 */}
                     <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] px-2 py-0.5 rounded-bl-lg font-black tracking-widest border-l border-b border-yellow-500 z-10">
                            HORSE POWER
                     </div>

                     <div className="space-y-6 relative z-10">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                   <div className="bg-yellow-500/20 p-2 rounded-lg border border-yellow-500/30">
                                          <Zap className="w-6 h-6 text-yellow-500" />
                                   </div>
                                   <div>
                                          <h3 className="text-xl font-black text-white italic tracking-tighter">
                                                 马力监测报告
                                          </h3>
                                          <p className="text-white/40 text-xs font-mono">PERFORMANCE METRICS</p>
                                   </div>
                            </div>

                            {/* 雷达图区域 */}
                            <div className="flex justify-center -my-4 relative scale-110">
                                   <DimensionRadarChart data={radarData} />
                            </div>

                            <div className="grid grid-cols-1 gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                                   {/* 核心指标 - 暴躁指数 */}
                                   <div className="flex justify-between items-center mb-2">
                                          <div className="flex items-center gap-2">
                                                 <Flame className="w-4 h-4 text-red-500" />
                                                 <span className="text-sm font-bold text-white">综合暴躁指数</span>
                                          </div>
                                          <span className={`text-xl font-black font-mono italic ${indices.anxietyLevel > 70 ? 'text-red-500' : 'text-orange-400'}`}>
                                                 {indices.anxietyLevel}%
                                          </span>
                                   </div>

                                   {/* 其他指标 */}
                                   <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                          <ProgressBar
                                                 value={indices.internalFriction}
                                                 color="text-purple-400"
                                                 label="精神磨损"
                                                 icon={Brain}
                                                 delay={0.2}
                                          />
                                          <ProgressBar
                                                 value={indices.dopamineStock}
                                                 color="text-emerald-400"
                                                 label="奔跑动力"
                                                 icon={Activity}
                                                 delay={0.4}
                                          />
                                          <ProgressBar
                                                 value={indices.socialBattery}
                                                 color="text-blue-400"
                                                 label="嘶吼欲望"
                                                 icon={Battery}
                                                 delay={0.6}
                                          />
                                          <ProgressBar
                                                 value={Math.round(100 - (indices.anxietyLevel * 0.5))}
                                                 color="text-slate-400"
                                                 label="心理防御"
                                                 icon={Radar}
                                                 delay={0.8}
                                          />
                                   </div>
                            </div>

                            {/* 饲养员建议 */}
                            <div className="flex gap-3 bg-white/5 p-3 rounded-lg border border-white/10 items-start">
                                   <Skull className="w-5 h-5 text-white/40 mt-0.5" />
                                   <div className="space-y-1">
                                          <p className="text-xs font-bold text-white/60">饲养员笔记:</p>
                                          <p className="text-xs text-white/50 leading-relaxed">
                                                 根据雷达图显示，该马匹{indices.anxietyLevel > 60 ? '野性难驯，各项指标均已爆表。' : '情绪相对稳定，适合长期役使。'}
                                                 {indices.dopamineStock < 30 ? '近期动力严重不足，建议画饼充饥。' : '动力系统运转良好。'}
                                          </p>
                                   </div>
                            </div>
                     </div>
              </ReportCard>
       );
};

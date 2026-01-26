import { ReportCard } from './ReportCard';
import { TagResult, HealthIndices } from '@/lib/resultCalculator';
import { Battery, Activity, Zap, Brain, Thermometer, AlertCircle } from 'lucide-react';

interface HealthScoreCardProps {
       result: TagResult;
       indices: HealthIndices;
}

const ProgressBar = ({ value, color, label }: { value: number; color: string; label: string }) => (
       <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                     <span className="text-white/60">{label}</span>
                     <span className={color}>{value}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                     <div
                            className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-1000`}
                            style={{ width: `${value}%` }}
                     />
              </div>
       </div>
);

export const HealthScoreCard = ({ result, indices }: HealthScoreCardProps) => {
       return (
              <ReportCard className="bg-slate-900 border border-white/10 overflow-hidden relative">
                     {/* 顶部标签 */}
                     <div className="absolute top-0 right-0 bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded-bl-lg font-mono border-l border-b border-red-500/20">
                            CLINICAL DIAGNOSIS
                     </div>

                     <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                   <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
                                          <Activity className="w-5 h-5 text-blue-400" />
                                   </div>
                                   <div>
                                          <h3 className="text-lg font-bold text-white tracking-wider">
                                                 VITAL SIGNS
                                          </h3>
                                          <p className="text-white/40 text-xs font-mono">24H MONITORING DATA</p>
                                   </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                   {/* 内耗指数 - 核心指标 */}
                                   <div className="bg-white/5 rounded-xl p-4 border border-white/10 relative">
                                          <div className="flex justify-between items-start mb-2">
                                                 <div className="flex items-center gap-2">
                                                        <Brain className="w-4 h-4 text-purple-400" />
                                                        <span className="text-sm font-bold text-white">精神内耗指数</span>
                                                 </div>
                                                 <span className={`text-xl font-bold font-mono ${indices.internalFriction > 70 ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                                                        {indices.internalFriction}
                                                 </span>
                                          </div>
                                          <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/10">
                                                 <div
                                                        className={`h-full ${indices.internalFriction > 70 ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
                                                        style={{ width: `${indices.internalFriction}%` }}
                                                 />
                                          </div>
                                          <p className="text-[10px] text-white/40 mt-2 font-mono">
                                                 {indices.internalFriction > 70 ? 'WARNING: CRITICAL LEVELS DETECTED' : 'STATUS: STABLE'}
                                          </p>
                                   </div>

                                   {/* 其他指标 */}
                                   <div className="space-y-4">
                                          <div className="flex items-center gap-3">
                                                 <Battery className="w-4 h-4 text-emerald-400" />
                                                 <div className="flex-1">
                                                        <ProgressBar value={indices.socialBattery} color="text-emerald-400" label="SOCIAL BATTERY (社交电量)" />
                                                 </div>
                                          </div>

                                          <div className="flex items-center gap-3">
                                                 <Thermometer className="w-4 h-4 text-orange-400" />
                                                 <div className="flex-1">
                                                        <ProgressBar value={indices.anxietyLevel} color="text-orange-400" label="ANXIETY LEVELS (焦虑水平)" />
                                                 </div>
                                          </div>

                                          <div className="flex items-center gap-3">
                                                 <Zap className="w-4 h-4 text-yellow-400" />
                                                 <div className="flex-1">
                                                        <ProgressBar value={indices.dopamineStock} color="text-yellow-400" label="DOPAMINE RESERVES (多巴胺储备)" />
                                                 </div>
                                          </div>
                                   </div>
                            </div>

                            {/* 诊断结论 */}
                            <div className="flex gap-3 bg-white/5 p-3 rounded-lg border border-white/10 items-start">
                                   <AlertCircle className="w-5 h-5 text-white/40 mt-0.5" />
                                   <div className="space-y-1">
                                          <p className="text-xs font-bold text-white/60">DOCTOR'S NOTE:</p>
                                          <p className="text-xs text-white/50 leading-relaxed font-mono">
                                                 Patient shows signs of {indices.internalFriction > 60 ? 'chronic overthinking' : 'unusual stability'}.
                                                 Recommended immediate intake of {indices.socialBattery < 30 ? 'isolation' : 'social interaction'}.
                                          </p>
                                   </div>
                            </div>
                     </div>
              </ReportCard>
       );
};

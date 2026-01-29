import { ReportCard } from './ReportCard';
import { useState } from 'react';
import { ArrowDown, CheckCircle2, History, Target, Trash2 } from 'lucide-react';

interface RegretWishCardProps {
       regret: string;
       wish: string;
}

export const RegretWishCard = ({ regret, wish }: RegretWishCardProps) => {
       const [isStrikedOut, setIsStrikedOut] = useState(false);
       const [isLitUp, setIsLitUp] = useState(false);

       return (
              <ReportCard className="text-center bg-slate-50 text-slate-800 border-2 border-slate-200 relative overflow-hidden">
                     {/* 顶部装饰条: 渐变表示过去到未来 */}
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-400 to-emerald-500" />

                     <div className="space-y-6 pt-2 w-full">
                            {/* 标题 */}
                            <div className="flex items-center justify-center gap-2 pb-2 border-b border-slate-100">
                                   <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">年度病历交接</h2>
                                   <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">2025 → 2026</span>
                            </div>

                            {/* 2025 遗憾部分 */}
                            <div className="relative group">
                                   <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-slate-300 tracking-widest uppercase">
                                          History
                                   </div>

                                   <div
                                          className={`
              mx-4 p-4 rounded-xl border-2 transition-all duration-500 cursor-pointer relative
              ${isStrikedOut
                                                        ? 'bg-slate-100 border-slate-200 opacity-60'
                                                        : 'bg-white border-slate-200 hover:border-red-200 shadow-sm'
                                                 }
            `}
                                          onClick={() => setIsStrikedOut(true)}
                                   >
                                          <div className="flex items-start gap-3">
                                                 <div className="bg-slate-100 p-1.5 rounded-lg flex-shrink-0">
                                                        <History className="w-4 h-4 text-slate-500" />
                                                 </div>
                                                 <div className="flex-1 text-left">
                                                        <p className="text-xs text-slate-400 font-bold mb-1 uppercase">2025 已清除症状</p>
                                                        <p className={`text-sm font-serif italic text-slate-700 leading-relaxed transition-all duration-500 ${isStrikedOut ? 'line-through decoration-red-500/50 decoration-2 text-slate-400' : ''
                                                               }`}>
                                                               "{regret}"
                                                        </p>
                                                 </div>
                                                 {!isStrikedOut && (
                                                        <Trash2 className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2" />
                                                 )}
                                          </div>

                                          {isStrikedOut && (
                                                 <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none">
                                                        <span className="text-red-500/30 font-black text-4xl uppercase -rotate-12 inline-block border-4 border-red-500/30 px-2 rounded">
                                                               CLEARED
                                                        </span>
                                                 </div>
                                          )}
                                   </div>
                            </div>

                            {/* 连接箭头 */}
                            <div className="flex justify-center -my-2 relative z-10">
                                   <div className="bg-white border border-slate-200 rounded-full p-1 text-slate-300 shadow-sm">
                                          <ArrowDown className="w-4 h-4 animate-bounce" />
                                   </div>
                            </div>

                            {/* 2026 愿望部分 */}
                            <div className="relative group">
                                   <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-emerald-300 tracking-widest uppercase">
                                          Future
                                   </div>

                                   <div
                                          className={`
              mx-4 p-4 rounded-xl border-2 transition-all duration-500 cursor-pointer
              ${isLitUp
                                                        ? 'bg-emerald-50 border-emerald-400 shadow-md scale-[1.02]'
                                                        : 'bg-white border-slate-200 hover:border-emerald-200 hover:shadow-sm'
                                                 }
            `}
                                          onClick={() => setIsLitUp(true)}
                                   >
                                          <div className="flex items-start gap-3">
                                                 <div className={`p-1.5 rounded-lg flex-shrink-0 transition-colors ${isLitUp ? 'bg-emerald-200 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                                        <Target className="w-4 h-4" />
                                                 </div>
                                                 <div className="flex-1 text-left">
                                                        <p className={`text-xs font-bold mb-1 uppercase transition-colors ${isLitUp ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                               2026 治疗方案
                                                        </p>
                                                        <p className={`text-base font-medium leading-normal transition-colors ${isLitUp ? 'text-emerald-900' : 'text-slate-600'}`}>
                                                               "{wish}"
                                                        </p>
                                                 </div>
                                                 {isLitUp && (
                                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 absolute top-2 right-2 animate-in zoom-in" />
                                                 )}
                                          </div>
                                   </div>
                            </div>

                            {/* 底部状态 */}
                            <div className="bg-slate-100/80 mx-4 rounded-lg p-2 text-[10px] text-slate-400 text-center font-mono">
                                   {isStrikedOut && isLitUp ? (
                                          <span className="text-emerald-600 font-bold animate-pulse">✨ SYSTEM UPGRADE COMPLETE</span>
                                   ) : (
                                          <span>PENDING PATIENT CONFIRMATION...</span>
                                   )}
                            </div>
                     </div>
              </ReportCard>
       );
};

import { useRef, useEffect } from "react";
import { TagResult, tagCombinations } from "@/lib/resultCalculator";
import { Swords, Share2, Download, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { toast } from "sonner";

interface BattleCardProps {
       result: TagResult;
       inviterInfo: { name: string; camp: string };
}

export const BattleCard = ({ result, inviterInfo }: BattleCardProps) => {
       const cardRef = useRef<HTMLDivElement>(null);

       // 查找邀请者的人设详情
       const inviterPersona = Object.values(tagCombinations).find(
              (tag) => tag.mainTag === inviterInfo.camp
       );

       // 找不到邀请者信息时的兜底 (不应该发生，除非URL被篡改)
       if (!inviterPersona) return null;

       const isSameParams = result.mainTag === inviterPersona.mainTag;

       const handleDownload = async () => {
              if (!cardRef.current) return;
              try {
                     const canvas = await html2canvas(cardRef.current, {
                            backgroundColor: '#1a1a1a',
                            scale: 2,
                            useCORS: true,
                     });
                     const url = canvas.toDataURL("image/png");
                     const link = document.createElement("a");
                     link.download = `shabi-battle-${inviterInfo.name}-vs-me.png`;
                     link.href = url;
                     link.click();
                     toast.success("对战海报已保存！发给Ta看看谁更强？");
              } catch (err) {
                     toast.error("保存失败，请截屏分享");
              }
       };

       return (
              <div className="w-full max-w-md mx-auto mb-8 animate-fade-in-up">
                     {/* 实际渲染的卡片区域 */}
                     <div
                            ref={cardRef}
                            className="relative bg-slate-900 border-4 border-yellow-500 rounded-xl overflow-hidden shadow-2xl"
                     >
                            {/* 背景特效 */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-transparent to-blue-900/50"></div>

                            {/* 顶部状态栏 */}
                            <div className="relative z-10 flex justify-between items-center bg-black/60 px-4 py-2 text-white border-b border-white/10 uppercase font-black italic tracking-wider text-xs">
                                   <span className="text-yellow-500">Player 1 (CHALLENGER)</span>
                                   <span className="text-white/50">VS</span>
                                   <span className="text-cyan-400">Player 2 (YOU)</span>
                            </div>

                            {/* 战斗主体 */}
                            <div className="relative z-10 p-6 flex items-center justify-between">

                                   {/* 左侧：邀请者 */}
                                   <div className="flex-1 flex flex-col items-center gap-2 relative">
                                          {/* 稀有度标签 */}
                                          <span className={`absolute -top-2 px-2 py-0.5 text-[10px] font-bold rounded bg-black/50 border ${inviterPersona.rarity === 'SSR' ? 'text-yellow-500 border-yellow-500' : 'text-white border-white'
                                                 }`}>
                                                 {inviterPersona.rarity}
                                          </span>

                                          <div className="w-20 h-20 relative">
                                                 <div className={`absolute inset-0 bg-gradient-to-r ${inviterPersona.color} rounded-full blur-xl opacity-40 animate-pulse`}></div>
                                                 {inviterPersona.image ? (
                                                        <img src={inviterPersona.image} className="w-full h-full object-contain relative z-10 drop-shadow-lg -scale-x-100" alt={inviterPersona.mainTag} />
                                                 ) : (
                                                        <span className="text-5xl flex items-center justify-center h-full relative z-10">{inviterPersona.emoji}</span>
                                                 )}
                                          </div>

                                          <div className="text-center">
                                                 <h3 className="font-black text-white text-sm leading-tight text-shadow-sm">{inviterInfo.name}</h3>
                                                 <p className="text-[10px] text-white/60 font-medium bg-white/10 px-2 py-0.5 rounded-full mt-1">
                                                        {inviterPersona.mainTag}
                                                 </p>
                                          </div>
                                   </div>

                                   {/* 中间：VS */}
                                   <div className="shrink-0 flex flex-col items-center justify-center px-2 relative">
                                          <div className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-red-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] animate-bounce-slow">
                                                 VS
                                          </div>
                                          <Swords className="w-6 h-6 text-white/40 mt-1" />
                                   </div>

                                   {/* 右侧：用户（自己） */}
                                   <div className="flex-1 flex flex-col items-center gap-2 relative">
                                          {/* 稀有度标签 */}
                                          <span className={`absolute -top-2 px-2 py-0.5 text-[10px] font-bold rounded bg-black/50 border ${result.rarity === 'SSR' ? 'text-yellow-500 border-yellow-500' : 'text-white border-white'
                                                 }`}>
                                                 {result.rarity}
                                          </span>

                                          <div className="w-20 h-20 relative">
                                                 <div className={`absolute inset-0 bg-gradient-to-r ${result.color} rounded-full blur-xl opacity-40 animate-pulse`}></div>
                                                 {result.image ? (
                                                        <img src={result.image} className="w-full h-full object-contain relative z-10 drop-shadow-lg" alt={result.mainTag} />
                                                 ) : (
                                                        <span className="text-5xl flex items-center justify-center h-full relative z-10">{result.emoji}</span>
                                                 )}
                                          </div>

                                          <div className="text-center">
                                                 <h3 className="font-black text-white text-sm leading-tight text-shadow-sm">YOU</h3>
                                                 <p className="text-[10px] text-white/60 font-medium bg-white/10 px-2 py-0.5 rounded-full mt-1">
                                                        {result.mainTag}
                                                 </p>
                                          </div>
                                   </div>
                            </div>

                            {/* 底部判定文案 */}
                            <div className="relative z-10 bg-black/40 backdrop-blur-sm p-4 text-center border-t border-white/5">
                                   <h4 className="text-yellow-400 font-black text-lg mb-1 flex items-center justify-center gap-2">
                                          {isSameParams ? (
                                                 <><Zap className="w-5 h-5" /> 绝命毒师组合 <Zap className="w-5 h-5" /></>
                                          ) : (
                                                 <><Shield className="w-5 h-5" /> 宿命对决 <Swords className="w-5 h-5" /></>
                                          )}
                                   </h4>
                                   <p className="text-xs text-white/80 italic">
                                          {isSameParams
                                                 ? `你们都是【${result.mainTag}】，这种强强联手（或互坑）的概率只有 ${(result.populationPercentage * result.populationPercentage / 100).toFixed(4)}%！`
                                                 : `【${inviterPersona.mainTag}】遇上【${result.mainTag}】，这将会是一场没有硝烟的战争。`}
                                   </p>
                            </div>
                     </div>

                     {/* 操作按钮 */}
                     <div className="flex gap-2 mt-4 px-4">
                            <Button
                                   onClick={handleDownload}
                                   className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-bold border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1 transition-all"
                            >
                                   <Download className="w-4 h-4 mr-2" />
                                   保存对战海报
                            </Button>
                     </div>
              </div>
       );
};

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Crown, TrendingUp, Users } from "lucide-react";
import { tagCombinations, TagResult } from "@/lib/resultCalculator";
import { ScrollArea } from "@/components/ui/scroll-area";

// 模拟的基础用户数量，让数据看起来不那么冷清
const MOCK_BASE_TOTAL = 12580;

interface LeaderboardItem extends TagResult {
       count: number;
       rank: number;
}

export const Leaderboard = () => {
       const [isOpen, setIsOpen] = useState(false);
       const [items, setItems] = useState<LeaderboardItem[]>([]);

       useEffect(() => {
              // 基于预设的 populationPercentage 生成模拟数据
              // 混合一点随机数，让每次刷新看起来略有变化（模拟实时感）
              const generateData = () => {
                     const data = Object.values(tagCombinations).map(tag => {
                            const baseCount = Math.floor(MOCK_BASE_TOTAL * (tag.populationPercentage / 100));
                            const variance = Math.floor(Math.random() * 50); // 随机波动
                            return {
                                   ...tag,
                                   count: baseCount + variance,
                                   // 临时 rank，稍后排序
                                   rank: 0
                            };
                     });

                     // 排序：数量多的排前面
                     data.sort((a, b) => b.count - a.count);

                     // 重新分配排名
                     return data.map((item, index) => ({ ...item, rank: index + 1 }));
              };

              setItems(generateData());
       }, []);

       return (
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                     <DialogTrigger asChild>
                            <Button
                                   variant="outline"
                                   size="icon"
                                   className="fixed bottom-36 sm:bottom-24 right-4 sm:right-6 z-50 rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/90 border-slate-600 hover:bg-slate-700 hover:scale-110 transition-all shadow-xl backdrop-blur-sm"
                            >
                                   <Trophy className="w-6 h-6 text-yellow-500" />
                            </Button>
                     </DialogTrigger>

                     <DialogContent className="max-w-md bg-slate-900/95 border-slate-700 text-white backdrop-blur-xl max-h-[85vh] flex flex-col p-6">
                            <DialogHeader>
                                   <DialogTitle className="flex items-center gap-2 text-xl font-black italic">
                                          <TrendingUp className="w-6 h-6 text-red-500" />
                                          <span>全网·人格排行榜</span>
                                          <span className="text-xs font-normal text-white/40 ml-auto flex items-center gap-1">
                                                 <Users className="w-3 h-3" />
                                                 实时数据
                                          </span>
                                   </DialogTitle>
                            </DialogHeader>

                            <ScrollArea className="flex-1 -mx-6 px-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 150px)' }}>
                                   <div className="space-y-4 py-4">
                                          {items.map((item) => (
                                                 <div
                                                        key={item.mainTag}
                                                        className={`relative flex items-center gap-4 p-3 rounded-xl border transition-all ${item.rank === 1 ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]' :
                                                               item.rank === 2 ? 'bg-slate-400/10 border-slate-400/50' :
                                                                      item.rank === 3 ? 'bg-orange-700/10 border-orange-700/50' :
                                                                             'bg-white/5 border-white/5'
                                                               }`}
                                                 >
                                                        {/* 排名 */}
                                                        <div className={`w-8 flex justify-center font-black italic text-lg ${item.rank === 1 ? 'text-yellow-500' :
                                                               item.rank === 2 ? 'text-slate-400' :
                                                                      item.rank === 3 ? 'text-orange-600' :
                                                                             'text-white/20'
                                                               }`}>
                                                               {item.rank <= 3 ? <Crown className="w-5 h-5" /> : item.rank}
                                                        </div>

                                                        {/* 头像 */}
                                                        <div className="relative w-12 h-12 shrink-0">
                                                               {item.image ? (
                                                                      <img src={item.image} alt={item.mainTag} className="w-full h-full object-contain drop-shadow-md" />
                                                               ) : (
                                                                      <span className="text-2xl">{item.emoji}</span>
                                                               )}
                                                        </div>

                                                        {/* 信息 */}
                                                        <div className="flex-1 min-w-0">
                                                               <div className="flex items-center gap-2">
                                                                      <h3 className="font-bold text-sm truncate">{item.mainTag}</h3>
                                                                      <span className={`text-[10px] px-1 rounded border ${item.rarity === 'SSR' ? 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10' :
                                                                             item.rarity === 'SR' ? 'text-purple-500 border-purple-500/30 bg-purple-500/10' :
                                                                                    'text-blue-500 border-blue-500/30 bg-blue-500/10'
                                                                             }`}>
                                                                             {item.rarity}
                                                                      </span>
                                                               </div>
                                                               <p className="text-xs text-white/40 truncate">{item.subTags[0]}</p>
                                                        </div>

                                                        {/* 数据 */}
                                                        <div className="text-right">
                                                               <div className="font-mono font-bold text-sm">{item.count.toLocaleString()}</div>
                                                               <div className="text-[10px] text-white/30">已确诊</div>
                                                        </div>
                                                 </div>
                                          ))}
                                   </div>
                            </ScrollArea>

                            <p className="text-center text-xs text-white/20 mt-2">
                                   *数据来源：SHABI 实时监测中心 (Mock Beta)
                            </p>
                     </DialogContent>
              </Dialog>
       );
};

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Banana, Lock, HelpCircle } from "lucide-react";
import { useCollection } from "@/hooks/useCollection";
import { tagCombinations } from "@/lib/resultCalculator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { trackEvent, AnalyticsEvents } from "@/lib/analytics";

export const Pokedex = () => {
       const { unlockedTags, getProgress, hasNew, clearNewParams } = useCollection();
       const [isOpen, setIsOpen] = useState(false);

       const { current, total } = getProgress();

       useEffect(() => {
              if (isOpen) {
                     trackEvent(AnalyticsEvents.POKEDEX_OPEN);
              }
              if (isOpen && hasNew) {
                     clearNewParams();
              }
       }, [isOpen, hasNew, clearNewParams]);

       return (
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                     <DialogTrigger asChild>
                            <Button
                                   variant="outline"
                                   size="icon"
                                   className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400 border-yellow-500 hover:bg-yellow-300 hover:scale-110 transition-all shadow-xl"
                            >
                                   <div className="relative">
                                          <Banana className="w-8 h-8 text-yellow-900" />
                                          {hasNew && (
                                                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                                          )}
                                   </div>
                            </Button>
                     </DialogTrigger>

                     <DialogContent className="max-w-md bg-slate-900/95 border-slate-700 text-white backdrop-blur-xl max-h-[85vh] flex flex-col p-6">
                            <DialogHeader>
                                   <DialogTitle className="flex items-center justify-between text-xl font-black italic">
                                          <span className="flex items-center gap-2">
                                                 <Banana className="w-6 h-6 text-yellow-400" />
                                                 SHABI图鉴
                                          </span>
                                          <span className="text-sm font-normal text-white/60 bg-white/10 px-3 py-1 rounded-full">
                                                 {current} / {total}
                                          </span>
                                   </DialogTitle>
                            </DialogHeader>

                            <div className="w-full bg-slate-800/50 rounded-full h-2 mb-2 overflow-hidden">
                                   <div
                                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 ease-out"
                                          style={{ width: `${(current / total) * 100}%` }}
                                   />
                            </div>

                            <ScrollArea className="flex-1 -mx-6 px-6">
                                   <div className="grid grid-cols-3 gap-4 py-4">
                                          {Object.entries(tagCombinations).map(([key, data]) => {
                                                 const isUnlocked = unlockedTags.includes(data.mainTag);

                                                 return (
                                                        <div
                                                               key={key}
                                                               className={`aspect-[3/4] rounded-xl flex flex-col items-center justify-center p-2 text-center transition-all ${isUnlocked
                                                                      ? 'bg-gradient-to-b from-white/10 to-transparent border border-white/20'
                                                                      : 'bg-black/40 border border-white/5 opacity-60'
                                                                      }`}
                                                        >
                                                               <div className="flex-1 flex items-center justify-center w-full mb-2">
                                                                      {isUnlocked ? (
                                                                             data.image ? (
                                                                                    <img
                                                                                           src={data.image}
                                                                                           alt={data.mainTag}
                                                                                           className="w-16 h-16 object-contain drop-shadow-lg animate-fade-in"
                                                                                    />
                                                                             ) : (
                                                                                    <span className="text-4xl animate-bounce-slow">{data.emoji}</span>
                                                                             )
                                                                      ) : (
                                                                             <HelpCircle className="w-8 h-8 text-white/20" />
                                                                      )}
                                                               </div>

                                                               <div className="w-full">
                                                                      <p className={`text-[10px] font-bold leading-tight ${isUnlocked ? 'text-white' : 'text-white/30'}`}>
                                                                             {isUnlocked ? data.mainTag : '???'}
                                                                      </p>
                                                                      {isUnlocked && (
                                                                             <span className={`text-[8px] px-1.5 py-0.5 rounded ml-1 scale-75 inline-block origin-center mt-1 
                        ${data.rarity === 'SSR' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                                                                                           data.rarity === 'SR' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' :
                                                                                                  'bg-blue-500/20 text-blue-400 border border-blue-500/50'}`
                                                                             }>
                                                                                    {data.rarity}
                                                                             </span>
                                                                      )}
                                                               </div>
                                                        </div>
                                                 );
                                          })}
                                   </div>
                            </ScrollArea>

                            <p className="text-center text-xs text-white/30 mt-4">
                                   集齐所有图鉴召唤神龙 (并不会)
                            </p>
                     </DialogContent>
              </Dialog>
       );
};

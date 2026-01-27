import { useState, useEffect, useCallback } from 'react';
import { Coins, Brain, Flame, Heart, Calendar, Skull, Play, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { EventCard } from './EventCard';
import { getRandomEvents, EVENTS_PER_GAME, DECISION_TIME_MS, LifeEvent } from '@/lib/events';
import { useLanguage } from '@/contexts/LanguageContext';

// 用户选择记录
export interface ChoiceRecord {
       eventId: string;
       choice: 'A' | 'B';
       timestamp: number;
       attributesBefore: GameAttributes;
}

export interface GameAttributes {
       money: number;
       hair: number;
       iq: number;
       happiness: number;
}

interface LifeEditorProps {
       onComplete: (data: any) => void;
       onTriggerRegret: () => void;
       onTriggerWish: (attributes: GameAttributes, choices: ChoiceRecord[]) => void;
       regretResolved: boolean;
}

export const LifeEditor = ({ onComplete, onTriggerRegret, onTriggerWish, regretResolved }: LifeEditorProps) => {
       const { t, language } = useLanguage();
       const [attributes, setAttributes] = useState<GameAttributes>({
              money: 50,
              hair: 50,
              iq: 50,
              happiness: 50,
       });

       const [isPlaying, setIsPlaying] = useState(false);
       const [isDead, setIsDead] = useState(false);
       const [hasRevived, setHasRevived] = useState(false);
       const [gameWon, setGameWon] = useState(false);

       // 事件卡系统
       const [events, setEvents] = useState<LifeEvent[]>([]);
       const [currentEventIndex, setCurrentEventIndex] = useState(0);
       const [choices, setChoices] = useState<ChoiceRecord[]>([]);

       // 初始化事件
       useEffect(() => {
              if (isPlaying && events.length === 0) {
                     setEvents(getRandomEvents(EVENTS_PER_GAME, language));
              }
       }, [isPlaying, events.length, language]);

       // 恢复游戏（复活后）
       useEffect(() => {
              if (regretResolved && isDead) {
                     setIsDead(false);
                     setHasRevived(true);
                     setAttributes(prev => ({
                            money: Math.max(40, prev.money),
                            hair: Math.max(40, prev.hair),
                            iq: Math.max(40, prev.iq),
                            happiness: Math.max(40, prev.happiness),
                     }));
                     toast.success(t('game.status.survival'), { icon: "⏪" });
              }
       }, [regretResolved, isDead, t]);

       // 处理选择
       const handleChoice = useCallback((choice: 'A' | 'B') => {
              const currentEvent = events[currentEventIndex];
              if (!currentEvent) return;

              // 记录选择
              const record: ChoiceRecord = {
                     eventId: currentEvent.id,
                     choice,
                     timestamp: Date.now(),
                     attributesBefore: { ...attributes },
              };
              setChoices(prev => [...prev, record]);

              // 应用效果
              const effects = choice === 'A' ? currentEvent.optionA.effects : currentEvent.optionB.effects;
              setAttributes(prev => {
                     const next = { ...prev };
                     if (effects.money) next.money = Math.max(0, Math.min(100, next.money + effects.money));
                     if (effects.hair) next.hair = Math.max(0, Math.min(100, next.hair + effects.hair));
                     if (effects.iq) next.iq = Math.max(0, Math.min(100, next.iq + effects.iq));
                     if (effects.happiness) next.happiness = Math.max(0, Math.min(100, next.happiness + effects.happiness));

                     // 检查死亡
                     if (Object.values(next).some(v => v <= 0)) {
                            if (!hasRevived) {
                                   handleDeath(next);
                                   return prev;
                            } else {
                                   // 复活后有保护
                                   Object.keys(next).forEach(k => {
                                          if ((next as any)[k] <= 0) (next as any)[k] = 5;
                                   });
                            }
                     }

                     return next;
              });

              // 显示反馈
              const effectStr = choice === 'A' ? currentEvent.optionA.text : currentEvent.optionB.text;
              toast(effectStr, { icon: currentEvent.emoji, duration: 1500 });

              // 下一个事件或结束
              if (currentEventIndex >= EVENTS_PER_GAME - 1) {
                     handleGameComplete();
              } else {
                     setCurrentEventIndex(prev => prev + 1);
              }
       }, [events, currentEventIndex, attributes, hasRevived, choices]);

       // 注意：这里 handleDeath 的 t 调用需要依赖最新闭包，但 handleChoice 的依赖列表中没写 handleDeath，所以 handleDeath 最好放在 handleChoice 内部或用 useCallback 包裹并添加 t
       // 其实 handleChoice 重新创建时，会调用新的 handleDeath（如果在内部定义）
       // 为了安全，我把 handleDeath 移到 component scope 并且不作为 dependency 传给 handleChoice？不，那样会闭包陷阱。
       // 因为 handleChoice 依赖 attributes 等，所以它每次都会重建，所引用的 handleDeath 必须也是新的。
       // 但我们这里是直接定义在组件里，每次 render 都是新的函数。
       // 只要 handleChoice 的 deps 是对的，它就能访问到最新的 handleDeath（其实是访问到最新的 scope 里的函数，不完全是这样）。
       // 实际上直接在 handleChoice 里调用的函数，在 handleChoice 被定义时就固定了 scope 里的引用。
       // 所以如果 handleChoice 使用了 useCallback，它只会捕获创建时的闭包。
       // 只要 handleChoice 会因为 [t] 变化而重建，就能拿到新的 t。
       // 所以需要把 t 加到 handleChoice 的 dependency 里（通过 Hook useLanguage 拿到的 t 引用可能变也可能不变，通常是不变的，但 language 会变）。

       const handleDeath = (failedAttributes: GameAttributes) => {
              setIsDead(true);
              let cause = "UNKNOWN_ERROR";
              if (failedAttributes.money <= 0) cause = t('game.status.bankrupt');
              else if (failedAttributes.hair <= 0) cause = t('game.status.exhaustion');
              else if (failedAttributes.happiness <= 0) cause = t('game.status.depression');
              else if (failedAttributes.iq <= 0) cause = t('game.status.stupidity');

              toast.error(`GAME_OVER: ${cause}`, { duration: 3000 });
              setTimeout(() => onTriggerRegret(), 1000);
       };

       const handleGameComplete = () => {
              setGameWon(true);
              toast.success(t('game.status.survival') + "!", { icon: "🎉" });
              setTimeout(() => {
                     onTriggerWish(attributes, choices);
              }, 1000);
       };

       // 属性栏组件 (HUD Style)
       const AttributeBar = ({ icon: Icon, label, value, color, barColor }: {
              icon: any;
              label: string;
              value: number;
              color: string;
              barColor: string;
       }) => (
              <div className="flex items-center gap-3 group">
                     <div className={`
                            w-8 h-8 rounded-lg flex items-center justify-center
                            bg-slate-900 border border-slate-700
                            ${color} shadow-[0_0_10px_inset] shadow-${color.split('-')[1]}-900/50
                     `}>
                            <Icon className="w-5 h-5" />
                     </div>

                     <div className="flex-1 relative h-4 bg-slate-900/80 rounded border border-slate-700/50 overflow-hidden">
                            {/* Grid Background */}
                            <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzjwqhgYGARAXCAxEA8kBgQA8zMv7Q20R78AAAAASUVORK5CYII=')] opacity-20" />

                            <motion.div
                                   className={`h-full relative ${barColor}`}
                                   animate={{ width: `${value}%` }}
                                   transition={{ duration: 0.5, type: "spring" }}
                            >
                                   {/* Stripes Overlay */}
                                   <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:10px_10px]" />
                                   {/* Glow End */}
                                   <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/50 shadow-[0_0_8px_white]" />
                            </motion.div>
                     </div>

                     <div className="w-12 text-right">
                            <span className={`font-mono text-sm font-bold ${color} drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]`}>
                                   {Math.round(value).toString().padStart(3, '0')}
                            </span>
                     </div>
              </div>
       );

       return (
              <div className={`w-full max-w-md mx-auto p-4 relative ${isDead ? 'grayscale blur-sm' : ''}`}>
                     {/* 教程/开始界面 */}
                     <AnimatePresence>
                            {!isPlaying && !isDead && !gameWon && !hasRevived && (
                                   <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm rounded-xl"
                                   >
                                          <div className="text-center space-y-6 p-6 max-w-xs">
                                                 <div className="w-16 h-16 bg-gradient-to-r from-primary to-coral rounded-full flex items-center justify-center mx-auto animate-pulse">
                                                        <AlertTriangle className="w-8 h-8 text-white" />
                                                 </div>
                                                 <div>
                                                        <h2 className="text-2xl font-black text-white mb-2">{t('game.title')}</h2>
                                                        <p className="text-white/60 text-sm leading-relaxed">
                                                               {t('game.desc')}
                                                        </p>
                                                 </div>
                                                 <Button
                                                        size="lg"
                                                        onClick={() => setIsPlaying(true)}
                                                        className="w-full font-bold bg-gradient-to-r from-primary to-coral hover:opacity-90"
                                                 >
                                                        <Play className="w-4 h-4 mr-2" />
                                                        {t('game.start')}
                                                 </Button>
                                          </div>
                                   </motion.div>
                            )}
                     </AnimatePresence>

                     {/* 属性面板 */}
                     <div className="mb-6 space-y-2 bg-black/30 rounded-xl p-4 border border-white/10">
                            <AttributeBar icon={Coins} label={t('game.attributes.money')} value={attributes.money} color="text-yellow-400" barColor="bg-yellow-400" />
                            <AttributeBar icon={Flame} label={t('game.attributes.hair')} value={attributes.hair} color="text-orange-400" barColor="bg-orange-400" />
                            <AttributeBar icon={Brain} label={t('game.attributes.iq')} value={attributes.iq} color="text-blue-400" barColor="bg-blue-400" />
                            <AttributeBar icon={Heart} label={t('game.attributes.happiness')} value={attributes.happiness} color="text-pink-400" barColor="bg-pink-400" />
                     </div>

                     {/* 事件卡区域 */}
                     {isPlaying && !isDead && !gameWon && events[currentEventIndex] && (
                            <AnimatePresence mode="wait">
                                   <EventCard
                                          key={events[currentEventIndex].id}
                                          event={events[currentEventIndex]}
                                          onChoice={handleChoice}
                                          decisionTimeMs={DECISION_TIME_MS}
                                          eventNumber={currentEventIndex + 1}
                                          totalEvents={EVENTS_PER_GAME}
                                   />
                            </AnimatePresence>
                     )}

                     {/* 死亡遮罩 */}
                     {isDead && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                   <Skull className="w-32 h-32 text-red-600 animate-pulse drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                            </div>
                     )}
              </div>
       );
};

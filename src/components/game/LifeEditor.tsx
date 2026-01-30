import { useState, useEffect, useCallback, useMemo } from 'react';
import { Coins, Brain, Flame, Heart, Calendar, Skull, Play, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { EventCard } from './EventCard';
import { getRandomEvents, EVENTS_PER_GAME, DECISION_TIME_MS, LifeEvent } from '@/lib/events';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';
import { preloadImages, preloadNextImages } from '@/components/ui/OptimizedImage';

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
       const [prevAttributes, setPrevAttributes] = useState<GameAttributes>({ money: 50, hair: 50, iq: 50, happiness: 50 });

       // 事件卡系统
       const [events, setEvents] = useState<LifeEvent[]>([]);
       const [currentEventIndex, setCurrentEventIndex] = useState(0);
       const [choices, setChoices] = useState<ChoiceRecord[]>([]);

       // 初始化事件
       useEffect(() => {
              if (isPlaying && events.length === 0) {
                     const newEvents = getRandomEvents(EVENTS_PER_GAME, language);
                     setEvents(newEvents);
                     
                     // 立即预加载所有事件图片
                     const allImages = newEvents
                            .filter(e => e.image)
                            .map(e => e.image!);
                     if (allImages.length > 0) {
                            preloadImages(allImages, 8); // 前8张高优先级
                     }
              }
       }, [isPlaying, events.length, language]);

       // 动态预加载：当前事件变化时，预加载后续图片
       useEffect(() => {
              if (events.length > 0 && currentEventIndex < events.length) {
                     const upcomingImages = events
                            .slice(currentEventIndex, currentEventIndex + 4)
                            .filter(e => e.image)
                            .map(e => e.image!);
                     if (upcomingImages.length > 0) {
                            preloadNextImages(upcomingImages, 0, 4);
                     }
              }
       }, [events, currentEventIndex]);

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

              // Analytics
              trackEvent(AnalyticsEvents.EVENT_CHOICE, {
                     eventId: currentEvent.id,
                     choice,
                     eventNumber: currentEventIndex + 1
              });

              // 应用效果
              const effects = choice === 'A' ? currentEvent.optionA.effects : currentEvent.optionB.effects;
              // 保存前一次属性值用于动画
              setPrevAttributes({ ...attributes });
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

       // 适配滑动交互的选择处理
       const handleSwipeChoice = useCallback((direction: 'left' | 'right') => {
              handleChoice(direction === 'left' ? 'A' : 'B');
       }, [handleChoice]);

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
       // 音效播放工具函数
       const playSound = (type: 'gain' | 'loss') => {
              try {
                     const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                     if (!AudioContext) return;

                     const ctx = new AudioContext();
                     const oscillator = ctx.createOscillator();
                     const gainNode = ctx.createGain();

                     oscillator.connect(gainNode);
                     gainNode.connect(ctx.destination);

                     if (type === 'gain') {
                            // 上升音效：钱入账的叮咚声
                            oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
                            oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
                            oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
                            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                            oscillator.start(ctx.currentTime);
                            oscillator.stop(ctx.currentTime + 0.3);
                     } else {
                            // 下降音效：低沉的警告声
                            oscillator.frequency.setValueAtTime(294, ctx.currentTime); // D4
                            oscillator.frequency.setValueAtTime(220, ctx.currentTime + 0.15); // A3
                            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
                            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
                            oscillator.start(ctx.currentTime);
                            oscillator.stop(ctx.currentTime + 0.25);
                     }
              } catch (e) {
                     // 音频播放失败时静默处理
              }
       };

       // 属性栏组件 (HUD Style) - 带中文标签、变化反馈和音效
       const AttributeBar = ({ icon: Icon, label, value, color, barColor, prevValue, emoji }: {
              icon: any;
              label: string;
              value: number;
              color: string;
              barColor: string;
              prevValue?: number;
              emoji?: string;
       }) => {
              const diff = prevValue !== undefined ? value - prevValue : 0;
              const showDiff = diff !== 0;

              // 播放音效
              useEffect(() => {
                     if (showDiff) {
                            playSound(diff > 0 ? 'gain' : 'loss');
                     }
              }, [value]);

              return (
                     <div className="flex items-center gap-2 group relative">
                            {/* 图标 + 标签 */}
                            <motion.div
                                   className={`
                                          flex items-center gap-1.5 min-w-[72px]
                                   `}
                                   animate={showDiff ? {
                                          scale: [1, 1.1, 1],
                                   } : {}}
                                   transition={{ duration: 0.3 }}
                            >
                                   <div className={`
                                          w-7 h-7 rounded-lg flex items-center justify-center
                                          bg-slate-900 border border-slate-700
                                          ${color} shadow-[0_0_8px_inset] shadow-${color.split('-')[1]}-900/50
                                   `}>
                                          {emoji ? (
                                                 <span className="text-sm">{emoji}</span>
                                          ) : (
                                                 <Icon className="w-4 h-4" />
                                          )}
                                   </div>
                                   <span className={`text-xs font-bold ${color} whitespace-nowrap`}>{label}</span>
                            </motion.div>

                            {/* 进度条 */}
                            <div className="flex-1 relative h-3.5 bg-slate-900/80 rounded border border-slate-700/50 overflow-hidden">
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

                                   {/* 闪光效果 */}
                                   <AnimatePresence>
                                          {showDiff && (
                                                 <motion.div
                                                        initial={{ opacity: 0.8, x: '-100%' }}
                                                        animate={{ opacity: 0, x: '100%' }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.6 }}
                                                        className={`absolute inset-0 bg-gradient-to-r ${diff > 0 ? 'from-transparent via-green-400/40 to-transparent' : 'from-transparent via-red-400/40 to-transparent'
                                                               }`}
                                                 />
                                          )}
                                   </AnimatePresence>
                            </div>

                            {/* 数值显示 */}
                            <div className="w-12 text-right relative">
                                   <motion.span
                                          className={`font-mono text-sm font-bold ${color} drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]`}
                                          animate={showDiff ? { scale: [1, 1.15, 1] } : {}}
                                          transition={{ duration: 0.3 }}
                                   >
                                          {Math.round(value).toString().padStart(3, '0')}
                                   </motion.span>

                                   {/* 浮动变化数字 */}
                                   <AnimatePresence>
                                          {showDiff && (
                                                 <motion.div
                                                        initial={{ opacity: 1, y: 0 }}
                                                        animate={{ opacity: 0, y: -20 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.8 }}
                                                        className={`absolute -top-1 right-0 font-mono text-xs font-bold ${diff > 0 ? 'text-green-400' : 'text-red-400'
                                                               }`}
                                                 >
                                                        {diff > 0 ? `+${diff}` : diff}
                                                 </motion.div>
                                          )}
                                   </AnimatePresence>
                            </div>
                     </div>
              );
       };


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
                                          <div className="relative w-full max-w-xs p-4">
                                                 {/* Floating Icon Badge */}
                                                 <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                                        <div className="relative group">
                                                               <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full animate-pulse-slow" />
                                                               <div className="w-20 h-20 bg-gradient-to-br from-primary to-coral rounded-full flex items-center justify-center border-[6px] border-slate-950 shadow-2xl relative z-10 animate-float">
                                                                      <AlertTriangle className="w-10 h-10 text-white drop-shadow-md" />
                                                               </div>
                                                        </div>
                                                 </div>

                                                 <div className="mt-12 text-center space-y-4">
                                                        <div>
                                                               <h2 className="text-4xl font-black text-white mb-3 tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                                                                      马生模拟器 v2026
                                                               </h2>
                                                               <p className="text-white text-sm leading-relaxed font-mono font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                                                      谨慎分配你的牛马力<br />
                                                                      <span className="text-[10px] opacity-80 tracking-widest text-white">ALLOCATE RESOURCES CAREFULLY</span>
                                                               </p>
                                                        </div>

                                                        <div className="pt-4">
                                                               <Button
                                                                      size="lg"
                                                                      onClick={() => setIsPlaying(true)}
                                                                      className="w-full h-14 rounded-full font-black text-lg bg-gradient-to-r from-primary via-coral to-primary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] hover:scale-[1.02] border-t border-white/20 group relative overflow-hidden"
                                                               >
                                                                      <span className="relative z-10 flex items-center gap-2">
                                                                             <Play className="w-5 h-5 fill-current" />
                                                                             开始我的牛马一生
                                                                      </span>
                                                                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
                                                               </Button>
                                                        </div>
                                                 </div>
                                          </div>
                                   </motion.div>
                            )}
                     </AnimatePresence>

                     {/* 顶部状态栏 - 已汉化 */}
                     {!isPlaying && !isDead ? null : (
                            <div className="text-center mb-6 pt-2">
                                   <h2 className="text-xl font-black text-white tracking-widest opacity-80">
                                          牛马值管理 <span className="text-xs align-top opacity-50">v2.0</span>
                                   </h2>
                            </div>
                     )}

                     {/* 属性面板 */}
                     <div className="mb-6 space-y-2.5 bg-black/40 rounded-xl p-4 border border-white/10 backdrop-blur-md shadow-2xl">
                            <AttributeBar icon={Coins} emoji="💰" label="存款" value={attributes.money} prevValue={prevAttributes.money} color="text-yellow-400" barColor="bg-yellow-400" />
                            <AttributeBar icon={Flame} emoji="💇" label="发量" value={attributes.hair} prevValue={prevAttributes.hair} color="text-orange-400" barColor="bg-orange-400" />
                            <AttributeBar icon={Brain} emoji="🧠" label="智商" value={attributes.iq} prevValue={prevAttributes.iq} color="text-blue-400" barColor="bg-blue-400" />
                            <AttributeBar icon={Heart} emoji="❤️" label="快乐" value={attributes.happiness} prevValue={prevAttributes.happiness} color="text-pink-400" barColor="bg-pink-400" />
                     </div>

                     {/* 交互核心：Swipeable Event Card */}
                     {isPlaying && !isDead && !gameWon && events[currentEventIndex] && (
                            <SwipeableCard
                                   key={events[currentEventIndex].id}
                                   event={events[currentEventIndex]}
                                   onSwipe={handleSwipeChoice}
                                   remainingCards={EVENTS_PER_GAME - currentEventIndex - 1}
                            />
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

// -----------------------------------------------------------------------------
// 内部组件：可滑动的事件卡
// -----------------------------------------------------------------------------
function SwipeableCard({ event, onSwipe, remainingCards }: {
       event: LifeEvent;
       onSwipe: (direction: 'left' | 'right') => void;
       remainingCards: number;
}) {
       const x = useMotionValue(0);
       const rotate = useTransform(x, [-200, 200], [-30, 30]); // 拖动时旋转
       const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]); // 拖动太远变透明

       // 选项提示的透明度映射
       const leftTipOpacity = useTransform(x, [-150, -20], [1, 0]); // 左滑显示左边提示
       const rightTipOpacity = useTransform(x, [20, 150], [0, 1]); // 右滑显示右边提示

       const handleDragEnd = (_: any, info: any) => {
              const threshold = 100; // 触发阈值
              if (info.offset.x > threshold) {
                     onSwipe('right');
              } else if (info.offset.x < -threshold) {
                     onSwipe('left');
              }
       };

       return (
              <div className="relative w-full h-[420px] flex items-center justify-center perspective-1000">
                     {/* 背景堆叠卡片 (Visual Only) */}
                     {[...Array(Math.min(3, remainingCards))].map((_, i) => (
                            <div
                                   key={i}
                                   className="absolute w-full h-full bg-slate-800 rounded-2xl border border-white/5"
                                   style={{
                                          zIndex: -i - 1,
                                          transform: `scale(${1 - (i + 1) * 0.05}) translateY(${(i + 1) * 10}px)`,
                                          opacity: 0.5 - i * 0.1
                                   }}
                            />
                     ))}

                     {/* 顶部可交互卡片 */}
                     <motion.div
                            className="absolute w-full h-full cursor-grab active:cursor-grabbing z-50 touch-none"
                            style={{ x, rotate, opacity }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }} // 限制拖回原点，但允许拉出去
                            dragElastic={0.7} // 阻尼感
                            onDragEnd={handleDragEnd}
                            whileTap={{ scale: 1.05 }}
                     >
                            {/* 拖动时的选项提示层 */}
                            <motion.div
                                   style={{ opacity: leftTipOpacity }}
                                   className="absolute top-8 right-8 z-[60] border-4 border-red-500 text-red-500 font-black text-2xl px-4 py-2 rounded-lg rotate-[15deg] bg-white/10 pointer-events-none"
                            >
                                   {event.optionA.text.length > 4 ? "选 A" : event.optionA.text}
                            </motion.div>

                            <motion.div
                                   style={{ opacity: rightTipOpacity }}
                                   className="absolute top-8 left-8 z-[60] border-4 border-emerald-500 text-emerald-500 font-black text-2xl px-4 py-2 rounded-lg rotate-[-15deg] bg-white/10 pointer-events-none"
                            >
                                   {event.optionB.text.length > 4 ? "选 B" : event.optionB.text}
                            </motion.div>

                            {/* 真正的卡片内容 */}
                            <EventCard
                                   event={event}
                                   onChoice={(c) => {
                                          // 保留点击支持，兼容老习惯
                                          // 模拟滑动方向来触发
                                          onSwipe(c === 'A' ? 'left' : 'right');
                                   }}
                                   decisionTimeMs={DECISION_TIME_MS}
                                   eventNumber={EVENTS_PER_GAME - remainingCards}
                                   totalEvents={EVENTS_PER_GAME}
                            />
                     </motion.div>

                     {/* 底部操作指引 */}
                     <div className="absolute -bottom-12 flex justify-between w-full px-8 text-white/30 text-xs font-bold pointer-events-none">
                            <span className="animate-pulse">👈 左滑拒绝</span>
                            <span className="animate-pulse">右滑接受 👉</span>
                     </div>
              </div>
       );
}

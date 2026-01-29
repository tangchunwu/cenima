import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LifeEvent } from '@/lib/events';
import { Timer, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EventCardProps {
       event: LifeEvent;
       onChoice: (choice: 'A' | 'B') => void;
       decisionTimeMs: number;
       eventNumber: number;
       totalEvents: number;
}

export const EventCard = ({
       event,
       onChoice,
       decisionTimeMs,
       eventNumber,
       totalEvents
}: EventCardProps) => {
       const { t } = useLanguage();
       const [timeLeft, setTimeLeft] = useState(decisionTimeMs);
       const [isExpired, setIsExpired] = useState(false);
       const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>(null);

       // 倒计时
       useEffect(() => {
              const interval = setInterval(() => {
                     setTimeLeft(prev => {
                            if (prev <= 100) {
                                   setIsExpired(true);
                                   return 0;
                            }
                            return prev - 100;
                     });
              }, 100);

              return () => clearInterval(interval);
       }, []);

       // 时间耗尽自动选择随机选项
       useEffect(() => {
              if (isExpired) {
                     const randomChoice = Math.random() > 0.5 ? 'A' : 'B';
                     setTimeout(() => onChoice(randomChoice), 300);
              }
       }, [isExpired, onChoice]);

       const progress = (timeLeft / decisionTimeMs) * 100;
       const isUrgent = timeLeft < 3000; // 扩展到最后 3 秒
       const isCritical = timeLeft < 1500; // 最后 1.5 秒更紧迫

       const handleChoice = (choice: 'A' | 'B') => {
              if (isExpired || selectedChoice) return;
              setSelectedChoice(choice);

              // 触发震动反馈 (如果设备支持)
              if (navigator.vibrate) {
                     navigator.vibrate(50);
              }

              // 延迟一点触发，让动画有时间播放
              setTimeout(() => onChoice(choice), 150);
       };

       // 格式化效果文本
       const formatEffects = (effects: Record<string, number | undefined>) => {
              const labels: Record<string, string> = {
                     money: '💰',
                     hair: '💇',
                     iq: '🧠',
                     happiness: '💖',
              };
              return Object.entries(effects)
                     .filter(([_, v]) => v !== undefined && v !== 0)
                     .map(([k, v]) => `${labels[k]}${v! > 0 ? '+' : ''}${v}`)
                     .join(' ');
       };

       // 选项按钮动画变体
       const buttonVariants = {
              idle: { scale: 1 },
              hover: { scale: 1.02, transition: { duration: 0.2 } },
              tap: { scale: 0.97, transition: { duration: 0.1 } },
              selected: {
                     scale: 1.05,
                     boxShadow: '0 0 30px rgba(255,255,255,0.3)',
                     transition: { duration: 0.2 }
              }
       };

       return (
              <motion.div
                     initial={{ opacity: 0, scale: 0.9, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9, y: -20 }}
                     className="w-full max-w-sm mx-auto relative"
              >
                     {/* 紧迫时刻的红光边缘效果 */}
                     <AnimatePresence>
                            {isCritical && (
                                   <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                                          exit={{ opacity: 0 }}
                                          transition={{ duration: 0.5, repeat: Infinity }}
                                          className="absolute -inset-2 bg-gradient-to-r from-red-600/50 via-transparent to-red-600/50 rounded-3xl blur-xl pointer-events-none z-0"
                                   />
                            )}
                     </AnimatePresence>

                     {/* 进度条 */}
                     <div className="mb-4 space-y-2 relative z-10">
                            <div className="flex justify-between items-center text-xs text-white/60">
                                   <span className="font-mono">{eventNumber}/{totalEvents}</span>
                                   <motion.span
                                          className={`flex items-center gap-1 font-bold ${isCritical ? 'text-red-400' : isUrgent ? 'text-orange-400' : ''}`}
                                          animate={isCritical ? { scale: [1, 1.1, 1] } : {}}
                                          transition={{ duration: 0.3, repeat: isCritical ? Infinity : 0 }}
                                   >
                                          {isCritical && <AlertCircle className="w-3 h-3" />}
                                          <Timer className="w-3 h-3" />
                                          {(timeLeft / 1000).toFixed(1)}s
                                   </motion.span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                   <motion.div
                                          className={`h-full rounded-full ${isCritical
                                                        ? 'bg-red-500'
                                                        : isUrgent
                                                               ? 'bg-orange-500'
                                                               : 'bg-gradient-to-r from-primary to-coral'
                                                 }`}
                                          initial={{ width: '100%' }}
                                          animate={{ width: `${progress}%` }}
                                          transition={{ duration: 0.1 }}
                                   />
                            </div>
                     </div>

                     {/* 事件卡片 */}
                     <motion.div
                            className={`
                                   bg-gradient-to-br from-slate-800/90 to-slate-900/90 
                                   backdrop-blur-xl rounded-2xl border-2 
                                   overflow-hidden shadow-2xl relative z-10
                                   transition-all duration-300
                                   ${isCritical
                                          ? 'border-red-500/70 shadow-red-500/30'
                                          : isUrgent
                                                 ? 'border-orange-500/50 shadow-orange-500/20'
                                                 : 'border-white/10'
                                   }
                            `}
                            animate={isCritical ? {
                                   boxShadow: [
                                          '0 0 20px rgba(239,68,68,0.3)',
                                          '0 0 40px rgba(239,68,68,0.5)',
                                          '0 0 20px rgba(239,68,68,0.3)'
                                   ]
                            } : {}}
                            transition={{ duration: 0.5, repeat: isCritical ? Infinity : 0 }}
                     >
                            {/* 头部：图片或Emoji */}
                            <div className="relative overflow-hidden group">
                                   {event.image ? (
                                          <div className="w-full h-40 relative overflow-hidden">
                                                 <img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                 />
                                                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                                                 {/* Glitch Overlay Effect */}
                                                 <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                          </div>
                                   ) : (
                                          <div className="p-4 text-center bg-white/5 mx-auto">
                                                 <motion.div
                                                        className="text-5xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                 >
                                                        {event.emoji}
                                                 </motion.div>
                                          </div>
                                   )}

                                   {/* 文本区域 */}
                                   <div className={`
                                          relative z-10 p-4 pt-2 text-center border-b border-white/10
                                          ${event.image ? '-mt-10' : ''}
                                   `}>
                                          {event.image && (
                                                 <div className="inline-block px-3 py-1 mb-2 text-xs font-bold text-black bg-white/90 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)] backdrop-blur-md">
                                                        {event.emoji}
                                                 </div>
                                          )}
                                          <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">{event.title}</h3>
                                          <p className="text-white/70 text-sm leading-relaxed">
                                                 {event.description}
                                          </p>
                                   </div>
                            </div>

                            {/* 选项 */}
                            <div className="p-3 space-y-2">
                                   {/* 选项 A */}
                                   <motion.button
                                          onClick={() => handleChoice('A')}
                                          disabled={isExpired || !!selectedChoice}
                                          variants={buttonVariants}
                                          initial="idle"
                                          whileHover="hover"
                                          whileTap="tap"
                                          animate={selectedChoice === 'A' ? 'selected' : 'idle'}
                                          className={`
                                                 w-full p-3.5 rounded-xl text-left transition-colors duration-200
                                                 bg-gradient-to-r from-blue-600/20 to-blue-500/10 
                                                 border-2 border-blue-500/30 
                                                 hover:border-blue-400 hover:bg-blue-500/30
                                                 disabled:opacity-50 disabled:cursor-not-allowed
                                                 active:bg-blue-500/40
                                                 ${selectedChoice === 'A' ? 'border-blue-400 bg-blue-500/40 ring-2 ring-blue-400/50' : ''}
                                          `}
                                   >
                                          <div className="flex justify-between items-center gap-2">
                                                 <span className={`font-bold text-white transition-colors ${selectedChoice === 'A' ? 'text-blue-200' : ''}`}>
                                                        {t('ui.choice_a')}. {event.optionA.text}
                                                 </span>
                                                 <span className="text-xs text-white/60 font-mono whitespace-nowrap">
                                                        {formatEffects(event.optionA.effects)}
                                                 </span>
                                          </div>
                                   </motion.button>

                                   {/* 选项 B */}
                                   <motion.button
                                          onClick={() => handleChoice('B')}
                                          disabled={isExpired || !!selectedChoice}
                                          variants={buttonVariants}
                                          initial="idle"
                                          whileHover="hover"
                                          whileTap="tap"
                                          animate={selectedChoice === 'B' ? 'selected' : 'idle'}
                                          className={`
                                                 w-full p-3.5 rounded-xl text-left transition-colors duration-200
                                                 bg-gradient-to-r from-purple-600/20 to-purple-500/10 
                                                 border-2 border-purple-500/30 
                                                 hover:border-purple-400 hover:bg-purple-500/30
                                                 disabled:opacity-50 disabled:cursor-not-allowed
                                                 active:bg-purple-500/40
                                                 ${selectedChoice === 'B' ? 'border-purple-400 bg-purple-500/40 ring-2 ring-purple-400/50' : ''}
                                          `}
                                   >
                                          <div className="flex justify-between items-center gap-2">
                                                 <span className={`font-bold text-white transition-colors ${selectedChoice === 'B' ? 'text-purple-200' : ''}`}>
                                                        {t('ui.choice_b')}. {event.optionB.text}
                                                 </span>
                                                 <span className="text-xs text-white/60 font-mono whitespace-nowrap">
                                                        {formatEffects(event.optionB.effects)}
                                                 </span>
                                          </div>
                                   </motion.button>
                            </div>

                            {/* 提示 */}
                            <AnimatePresence>
                                   {isUrgent && (
                                          <motion.div
                                                 initial={{ opacity: 0, height: 0 }}
                                                 animate={{ opacity: 1, height: 'auto' }}
                                                 exit={{ opacity: 0, height: 0 }}
                                                 className="px-4 pb-3"
                                          >
                                                 <p className={`text-center text-xs font-bold ${isCritical ? 'text-red-400' : 'text-orange-400'}`}>
                                                        {isCritical ? '⚠️ 快做决定！' : t('ui.urgent')}
                                                 </p>
                                          </motion.div>
                                   )}
                            </AnimatePresence>
                     </motion.div>
              </motion.div>
       );
};

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LifeEvent } from '@/lib/events';
import { Timer } from 'lucide-react';
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
       const isUrgent = timeLeft < 1500;

       const handleChoice = (choice: 'A' | 'B') => {
              if (isExpired) return;
              onChoice(choice);
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

       return (
              <motion.div
                     initial={{ opacity: 0, scale: 0.9, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9, y: -20 }}
                     className="w-full max-w-sm mx-auto"
              >
                     {/* 进度条 */}
                     <div className="mb-4 space-y-2">
                            <div className="flex justify-between items-center text-xs text-white/60">
                                   <span className="font-mono">{eventNumber}/{totalEvents}</span>
                                   <span className={`flex items-center gap-1 ${isUrgent ? 'text-red-400 animate-pulse' : ''}`}>
                                          <Timer className="w-3 h-3" />
                                          {(timeLeft / 1000).toFixed(1)}s
                                   </span>
                            </div>
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                   <motion.div
                                          className={`h-full rounded-full ${isUrgent ? 'bg-red-500' : 'bg-gradient-to-r from-primary to-coral'}`}
                                          initial={{ width: '100%' }}
                                          animate={{ width: `${progress}%` }}
                                          transition={{ duration: 0.1 }}
                                   />
                            </div>
                     </div>

                     {/* 事件卡片 */}
                     <div className={`
        bg-gradient-to-br from-slate-800/90 to-slate-900/90 
        backdrop-blur-xl rounded-2xl border border-white/10 
        overflow-hidden shadow-2xl
        ${isUrgent ? 'border-red-500/50 shadow-red-500/20' : ''}
      `}>
                            {/* 头部：图片或Emoji */}
                            <div className="relative overflow-hidden group">
                                   {event.image ? (
                                          <div className="w-full h-48 relative overflow-hidden">
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
                                          <div className="p-6 text-center bg-white/5 mx-auto">
                                                 <div className="text-6xl mb-2 animate-bounce-slow filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                                        {event.emoji}
                                                 </div>
                                          </div>
                                   )}

                                   {/* 文本区域 */}
                                   <div className={`
                                          relative z-10 p-5 pt-2 text-center border-b border-white/10
                                          ${event.image ? '-mt-12' : ''}
                                   `}>
                                          {event.image && (
                                                 <div className="inline-block px-3 py-1 mb-2 text-xs font-bold text-black bg-white/90 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)] backdrop-blur-md">
                                                        {event.emoji}
                                                 </div>
                                          )}
                                          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">{event.title}</h3>
                                          <p className="text-white/70 text-sm leading-relaxed font-medium">
                                                 {event.description}
                                          </p>
                                   </div>
                            </div>

                            {/* 选项 */}
                            <div className="p-4 space-y-3">
                                   {/* 选项 A */}
                                   <button
                                          onClick={() => handleChoice('A')}
                                          disabled={isExpired}
                                          className={`
              w-full p-4 rounded-xl text-left transition-all duration-200
              bg-gradient-to-r from-blue-600/20 to-blue-500/10 
              border border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/20
              disabled:opacity-50 disabled:cursor-not-allowed
              group
            `}
                                   >
                                          <div className="flex justify-between items-center">
                                                 <span className="font-bold text-white group-hover:text-blue-300 transition-colors">
                                                        {t('ui.choice_a')}. {event.optionA.text}
                                                 </span>
                                                 <span className="text-xs text-white/50 font-mono">
                                                        {formatEffects(event.optionA.effects)}
                                                 </span>
                                          </div>
                                   </button>

                                   {/* 选项 B */}
                                   <button
                                          onClick={() => handleChoice('B')}
                                          disabled={isExpired}
                                          className={`
              w-full p-4 rounded-xl text-left transition-all duration-200
              bg-gradient-to-r from-purple-600/20 to-purple-500/10 
              border border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/20
              disabled:opacity-50 disabled:cursor-not-allowed
              group
            `}
                                   >
                                          <div className="flex justify-between items-center">
                                                 <span className="font-bold text-white group-hover:text-purple-300 transition-colors">
                                                        {t('ui.choice_b')}. {event.optionB.text}
                                                 </span>
                                                 <span className="text-xs text-white/50 font-mono">
                                                        {formatEffects(event.optionB.effects)}
                                                 </span>
                                          </div>
                                   </button>
                            </div>

                            {/* 提示 */}
                            {isUrgent && (
                                   <div className="px-4 pb-4">
                                          <p className="text-center text-red-400 text-xs animate-pulse font-bold">
                                                 {t('ui.urgent')}
                                          </p>
                                   </div>
                            )}
                     </div>
              </motion.div>
       );
};

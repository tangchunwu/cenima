import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AttributeSlider } from './AttributeSlider';
import { Coins, Brain, Flame, Heart, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

// 互斥逻辑常量
const TOTAL_POINTS = 200; // 总属性点上限（给4个属性分，平均50，很难全满）

interface LifeEditorProps {
       onComplete: (data: any) => void;
       onTriggerRegret: () => void;
       onTriggerWish: (attributes: any) => void;
       regretResolved: boolean;
}

export const LifeEditor = ({ onComplete, onTriggerRegret, onTriggerWish, regretResolved }: LifeEditorProps) => {
       const [attributes, setAttributes] = useState({
              money: 30,
              hair: 80,
              iq: 50,
              happiness: 40,
       });

       const [warnings, setWarnings] = useState<string | null>(null);
       const [isLagging, setIsLagging] = useState(false);

       // 监听很多Resolved状态，如果解决了，就清除卡顿
       useEffect(() => {
              if (regretResolved) {
                     setIsLagging(false);
                     setWarnings("SYSTEM_OPTIMIZED. PERFORMANCE RESTORED.");
                     setTimeout(() => setWarnings(null), 3000);
              }
       }, [regretResolved]);

       // 记录调整次数，用于触发剧情
       const [interactionCount, setInteractionCount] = useState(0);
       const hasTriggeredRegretRef = useRef(false);
       const hasTriggeredWishRef = useRef(false);

       // 处理属性变更（核心互斥物理引擎）
       const handleAttributeChange = (key: keyof typeof attributes, newValue: number) => {
              setInteractionCount(prev => prev + 1);

              const diff = newValue - attributes[key];

              // 如果没有变化，直接返回
              if (Math.abs(diff) < 0.1) return;

              let newAttributes = { ...attributes, [key]: newValue };

              // 1. 物理互斥规则 (The Physics)

              // 规则 A: 金钱 vs 头发 (负相关)
              if (key === 'money' && diff > 0) {
                     // 赚钱越多，头发掉越快
                     newAttributes.hair = Math.max(0, newAttributes.hair - diff * 0.8);
              }
              if (key === 'hair' && diff > 0) {
                     // 想要头发，就得花钱养生
                     newAttributes.money = Math.max(0, newAttributes.money - diff * 0.5);
              }

              // 规则 B: 智商 vs 快乐 (负相关)
              if (key === 'iq' && diff > 0) {
                     // 知道得越多越痛苦
                     newAttributes.happiness = Math.max(0, newAttributes.happiness - diff * 0.7);
              }
              if (key === 'happiness' && diff > 0) {
                     // 傻乐需要降智
                     newAttributes.iq = Math.max(0, newAttributes.iq - diff * 0.4);
              }

              // 2. 总量守恒（防止全满）
              const currentTotal = Object.values(newAttributes).reduce((a, b) => a + b, 0);
              if (currentTotal > TOTAL_POINTS) {
                     setWarnings('⚠️ SYSTEM RESOURCE LIMIT EXCEEDED');
                     // 随机扣除其他属性来平衡
                     const otherKeys = Object.keys(newAttributes).filter(k => k !== key) as (keyof typeof attributes)[];
                     const overflow = currentTotal - TOTAL_POINTS;
                     const deductionPerKey = overflow / otherKeys.length;

                     otherKeys.forEach(k => {
                            newAttributes[k] = Math.max(0, newAttributes[k] - deductionPerKey);
                     });
              } else {
                     setWarnings(null);
              }

              // 应用新值
              setAttributes(newAttributes);

              // 3. 剧情触发检查 (The Hook)

              // 触发遗憾任务：当操作次数足够多，且金钱或智商仍然很低时，或者 simply based on count
              // 模拟系统卡顿
              if (interactionCount > 10 && !hasTriggeredRegretRef.current) {
                     setIsLagging(true);
                     if (interactionCount > 15) {
                            hasTriggeredRegretRef.current = true;
                            onTriggerRegret();
                     }
              }

              // 触发愿望任务：当总分接近上限，或者看起来很完美时（这里简单设定为总分高）
              // 或者在遗憾任务完成后一段操作后
              if (hasTriggeredRegretRef.current && !hasTriggeredWishRef.current && interactionCount > 30) {
                     hasTriggeredWishRef.current = true;
                     onTriggerWish(newAttributes);
              }
       };

       return (
              <div className={`w-full max-w-md mx-auto space-y-8 p-6 ${isLagging ? 'grayscale-[0.5] blur-[0.5px] transition-all duration-1000' : ''}`}>

                     {/* 顶部状态栏 */}
                     <div className="bg-black/40 rounded-lg p-2 flex justify-between items-center border border-white/10 font-mono text-xs">
                            <span className={warnings ? "text-red-500 animate-pulse" : "text-green-500"}>
                                   {warnings || "SYSTEM_STATUS: STABLE"}
                            </span>
                            <span className="text-white/40">CPU: {isLagging ? "99%" : "12%"}</span>
                     </div>

                     <div className="space-y-6">
                            <AttributeSlider
                                   label="ASSETS (资产)"
                                   icon={Coins}
                                   value={attributes.money}
                                   onChange={(v) => handleAttributeChange('money', v)}
                                   color="text-yellow-400"
                                   isGlitching={isLagging}
                            />

                            <AttributeSlider
                                   label="HAIR_DENSITY (发量)"
                                   icon={Flame}
                                   value={attributes.hair}
                                   onChange={(v) => handleAttributeChange('hair', v)}
                                   color="text-orange-400"
                                   isGlitching={isLagging}
                            />

                            <AttributeSlider
                                   label="CPU_INTELLECT (智力)"
                                   icon={Brain}
                                   value={attributes.iq}
                                   onChange={(v) => handleAttributeChange('iq', v)}
                                   color="text-blue-400"
                                   isGlitching={isLagging}
                            />

                            <AttributeSlider
                                   label="DOPAMINE (快乐)"
                                   icon={Heart}
                                   value={attributes.happiness}
                                   onChange={(v) => handleAttributeChange('happiness', v)}
                                   color="text-pink-400"
                                   isGlitching={isLagging}
                            />
                     </div>

                     {isLagging && (
                            <div className="fixed inset-0 pointer-events-none bg-red-500/5 mix-blend-overlay animate-pulse z-50" />
                     )}
              </div>
       );
};

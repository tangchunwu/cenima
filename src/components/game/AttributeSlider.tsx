import React, { useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AttributeSliderProps {
       label: string;
       icon: LucideIcon;
       value: number; // 0-100
       onChange: (value: number) => void;
       color: string;
       isLocked?: boolean;
       isGlitching?: boolean;
}

export const AttributeSlider = ({
       label,
       icon: Icon,
       value,
       onChange,
       color,
       isLocked = false,
       isGlitching = false,
}: AttributeSliderProps) => {
       // 拖拽约束
       const constraintsRef = React.useRef(null);
       const trackRef = React.useRef<HTMLDivElement>(null);

       // 物理弹簧配置
       const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
       const x = useSpring(0, springConfig);

       // 将位置映射回 0-100 的值
       useEffect(() => {
              if (trackRef.current) {
                     // 这里的逻辑稍微复杂：我们需要把外部的 value 映射到 x 轴位置
                     // 但同时 x 轴位置也反向控制 value
                     // 简单起见，我们主要由外部 value 控制视觉位置
                     const width = trackRef.current.offsetWidth;
                     // 假设滑块宽度约 40px
                     const maxDrag = width - 40;
                     const targetX = (value / 100) * maxDrag;
                     x.set(targetX);
              }
       }, [value, x]);

       // 处理拖拽结束，更新值
       // 实际上 Framer Motion 的 drag 会直接更新 x，我们需要监听 x 的变化来更新父组件 state
       // 但为了简化双向绑定，我们可以在 onDrag 中计算

       const handleDrag = (event: any, info: any) => {
              if (isLocked) return;
              if (trackRef.current) {
                     const width = trackRef.current.offsetWidth - 40;
                     // info.point.x 是绝对坐标，我们需要相对坐标
                     // 更简单的方式：利用 constraints 和 ref，直接读取 x.get()
                     // 但 x.get() 在 drag 时不一定实时准确反映我们想要的百分比

                     // 使用 rect 计算
                     const rect = trackRef.current.getBoundingClientRect();
                     const relativeX = info.point.x - rect.left - 20; // -20 是滑块半径
                     let newValue = (relativeX / width) * 100;
                     newValue = Math.max(0, Math.min(100, newValue));

                     onChange(newValue);
              }
       };

       return (
              <div className={cn("relative space-y-2 select-none", isGlitching && "animate-pulse")}>
                     <div className="flex justify-between items-center text-sm font-bold font-mono text-slate-300">
                            <div className="flex items-center gap-2">
                                   <Icon className={cn("w-4 h-4", color)} />
                                   <span className={isGlitching ? "glitch-text" : ""}>{label}</span>
                            </div>
                            <span className={color}>{Math.round(value)}%</span>
                     </div>

                     <div
                            ref={trackRef}
                            className={cn(
                                   "h-10 bg-slate-800/50 rounded-lg border border-white/5 relative overflow-hidden backdrop-blur-sm",
                                   isGlitching && "border-red-500/30"
                            )}
                     >
                            {/* 进度条填充 */}
                            <motion.div
                                   className={cn("absolute top-0 left-0 bottom-0 opacity-20", color.replace('text-', 'bg-'))}
                                   style={{ width: `${value}%` }}
                            />

                            {/* 物理滑块 */}
                            <motion.div
                                   drag="x"
                                   dragConstraints={trackRef}
                                   dragElastic={0.1}
                                   dragMomentum={false}
                                   onDrag={handleDrag}
                                   style={{ x }}
                                   className={cn(
                                          "absolute top-1 bottom-1 w-10 rounded-md shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center border border-white/10",
                                          color.replace('text-', 'bg-'),
                                          isLocked && "grayscale cursor-not-allowed opacity-50"
                                   )}
                                   whileHover={{ scale: 1.05 }}
                                   whileTap={{ scale: 0.95 }}
                            >
                                   {isLocked ? (
                                          <div className="w-2 h-2 bg-slate-900 rounded-full" />
                                   ) : (
                                          <div className="w-1 h-4 bg-white/30 rounded-full" />
                                   )}
                            </motion.div>

                            {/* 刻度线装饰 */}
                            <div className="absolute inset-0 pointer-events-none flex justify-between px-3">
                                   {[...Array(9)].map((_, i) => (
                                          <div key={i} className="w-[1px] h-full bg-white/5" />
                                   ))}
                            </div>
                     </div>
              </div>
       );
};

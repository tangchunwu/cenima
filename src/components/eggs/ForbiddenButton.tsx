import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skull, AlertOctagon } from 'lucide-react';
import { toast } from 'sonner';

export const ForbiddenButton = () => {
       const [isExploded, setIsExploded] = useState(false);

       const handleSelfDestruct = () => {
              if (isExploded) return;
              setIsExploded(true);

              toast("不让你按你非要按...", {
                     description: "系统将在 3秒后 重启",
                     icon: "💣",
              });

              // 1. 给页面上所有主要元素添加下落动画
              const elements = document.querySelectorAll('div, button, p, h1, h2, img, span');
              elements.forEach((el) => {
                     if (el instanceof HTMLElement) {
                            // 随机延迟和旋转，增加混乱感
                            const delay = Math.random() * 0.5;
                            const rotate = (Math.random() - 0.5) * 180;

                            el.style.transition = `transform 1s ease-in ${delay}s, opacity 1s ease-in ${delay}s`;
                            el.style.transform = `translateY(120vh) rotate(${rotate}deg)`;
                            el.style.opacity = '0';
                            el.style.pointerEvents = 'none'; // 禁用交互
                     }
              });

              // 2. 3秒后刷新页面恢复
              setTimeout(() => {
                     window.location.reload();
              }, 3500);
       };

       return (
              <div className="fixed bottom-20 sm:bottom-4 left-4 z-50 animate-pulse-slow group">
                     <Button
                            variant="destructive"
                            size="lg"
                            onClick={handleSelfDestruct}
                            className="relative overflow-hidden rounded-full px-8 py-6 bg-red-600 hover:bg-red-700 text-white font-black text-lg tracking-widest border-4 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:shadow-[0_0_40px_rgba(239,68,68,0.9)] hover:scale-105 transition-all duration-300 animate-[bounce_1s_infinite]"
                     >
                            <span className="relative z-10 flex items-center gap-2">
                                   <AlertOctagon className="w-6 h-6 animate-spin-slow" />
                                   千万别点
                            </span>

                            {/* 扫光动画 */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                     </Button>
              </div>
       );
};

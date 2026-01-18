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
                            size="sm"
                            onClick={handleSelfDestruct}
                            className="rounded-full w-10 h-10 p-0 bg-red-900/50 hover:bg-red-600 border border-red-500/30 overflow-hidden transition-all duration-300 sm:group-hover:w-32 sm:group-hover:justify-start"
                     >
                            <div className="w-10 h-10 flex items-center justify-center shrink-0">
                                   <AlertOctagon className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
                            </div>
                            <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap text-xs font-bold transition-opacity pl-1">
                                   千万别点
                            </span>
                     </Button>
              </div>
       );
};

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skull, AlertOctagon } from 'lucide-react';
import { toast } from 'sonner';

export const ForbiddenButton = () => {
       const [isExploded, setIsExploded] = useState(false);

       const handleSelfDestruct = () => {
              if (isExploded) return;
              setIsExploded(true);

              // 0. 初始警告
              toast.error("⚠️ SYSTEM FAILURE INITIATED", {
                     duration: 5000,
                     style: { background: 'red', color: 'white', fontWeight: 'bold' }
              });

              // 1. 视觉冲击 (0s) - 反色 + 震动
              document.documentElement.style.filter = 'invert(1) contrast(1.5)';
              document.body.style.transition = 'transform 0.1s';

              const shakeInterval = setInterval(() => {
                     const x = (Math.random() - 0.5) * 20;
                     const y = (Math.random() - 0.5) * 20;
                     document.body.style.transform = `translate(${x}px, ${y}px)`;
              }, 50);

              // 2. 元素崩坏 (0.5s) - 炸飞效果
              setTimeout(() => {
                     const elements = document.querySelectorAll('div, p, h1, h2, button, img');
                     elements.forEach((el) => {
                            if (el instanceof HTMLElement && !el.id.includes('crash-overlay')) {
                                   const angle = Math.random() * 360;
                                   const velocity = 500 + Math.random() * 1000;
                                   const x = Math.cos(angle) * velocity;
                                   const y = Math.sin(angle) * velocity;
                                   const rotate = Math.random() * 720;

                                   el.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
                                   el.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${Math.random()})`;
                                   el.style.opacity = '0';
                            }
                     });
              }, 500);

              // 3. 伪造蓝屏/黑屏 (1.5s)
              setTimeout(() => {
                     clearInterval(shakeInterval);
                     document.body.style.transform = 'none';

                     // 创建崩溃覆盖层
                     const overlay = document.createElement('div');
                     overlay.id = 'crash-overlay';
                     overlay.style.cssText = `
                            position: fixed; inset: 0; background: #0000AA; color: white; 
                            font-family: 'Courier New', monospace; z-index: 99999; 
                            padding: 40px; font-size: 20px; line-height: 1.5;
                            display: flex; flex-direction: column; justify-content: flex-start;
                     `;
                     overlay.innerHTML = `
                            <div>Running System Diagnostics...</div>
                            <div style="margin-top: 20px">FATAL ERROR: 0x000000ED</div>
                            <div>UNMOUNTABLE_BOOT_VOLUME</div>
                            <br/>
                            <div>Collecting data for crash dump...</div>
                            <div>Initializing disk for crash dump...</div>
                            <div style="margin-top: 20px">Beginning dump of physical memory.</div>
                            <div>Dumping physical memory to disk: <span id="dump-counter">0</span>%</div>
                     `;
                     document.body.appendChild(overlay);

                     // 模拟进度条
                     let progress = 0;
                     const dumpInterval = setInterval(() => {
                            progress += Math.floor(Math.random() * 10);
                            if (progress > 100) progress = 100;
                            const counter = document.getElementById('dump-counter');
                            if (counter) counter.innerText = progress.toString();
                     }, 100);

              }, 1500);

              // 4. 重启 (4s)
              setTimeout(() => {
                     document.documentElement.style.filter = '';
                     window.location.reload();
              }, 4000);
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

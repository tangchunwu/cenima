import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const CLICK_THRESHOLD = 5; // 多少次点击触发
const TIME_WINDOW = 800;   // 时间窗口 (ms)

export const RageClick = () => {
       const clicksRef = useRef<number[]>([]);
       const isCooldownRef = useRef(false);

       useEffect(() => {
              const handleClick = () => {
                     if (isCooldownRef.current) return;

                     const now = Date.now();
                     // 移除过期点击
                     clicksRef.current = clicksRef.current.filter(t => now - t < TIME_WINDOW);
                     // 添加新点击
                     clicksRef.current.push(now);

                     if (clicksRef.current.length >= CLICK_THRESHOLD) {
                            triggerRageMode();
                     }
              };

              window.addEventListener('click', handleClick);
              return () => window.removeEventListener('click', handleClick);
       }, []);

       const triggerRageMode = () => {
              isCooldownRef.current = true;

              // 震动效果
              document.body.classList.add('animate-shake-hard');

              // 嘲讽
              const messages = [
                     "急急国王驾到？👑",
                     "屏幕：我做错了什么？😭",
                     "别点了，再点CPU要冒烟了🔥",
                     "手速不错，单身多少年了？🐶"
              ];
              const msg = messages[Math.floor(Math.random() * messages.length)];

              toast.error(msg, {
                     duration: 3000,
                     className: "border-2 border-red-500 bg-red-950 font-black text-white"
              });

              // 冷却 3秒
              setTimeout(() => {
                     document.body.classList.remove('animate-shake-hard');
                     clicksRef.current = [];
                     isCooldownRef.current = false;
              }, 3000);
       };

       return null;
};

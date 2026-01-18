import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useCollection } from '@/hooks/useCollection';

const KONAMI_CODE = [
       'ArrowUp', 'ArrowUp',
       'ArrowDown', 'ArrowDown',
       'ArrowLeft', 'ArrowRight',
       'ArrowLeft', 'ArrowRight',
       'b', 'a'
];

export const KonamiCode = () => {
       const [inputIndex, setInputIndex] = useState(0);
       const { unlock } = useCollection();

       useEffect(() => {
              const handleKeyDown = (e: KeyboardEvent) => {
                     // 检查按键是否匹配当前序列
                     if (e.key === KONAMI_CODE[inputIndex]) {
                            const nextIndex = inputIndex + 1;

                            // 如果序列完成
                            if (nextIndex === KONAMI_CODE.length) {
                                   triggerEasterEgg();
                                   setInputIndex(0);
                            } else {
                                   setInputIndex(nextIndex);
                            }
                     } else {
                            // 如果按错，重置
                            setInputIndex(0);
                     }
              };

              window.addEventListener('keydown', handleKeyDown);
              return () => window.removeEventListener('keydown', handleKeyDown);
       }, [inputIndex]);

       const triggerEasterEgg = () => {
              // 解锁 hidden tag
              unlock('dev_god_mode');

              // 播放音效 (可选)
              const audio = new Audio('https://www.myinstants.com/media/sounds/level-up-bonus-sequence-1-186892.mp3');
              audio.volume = 0.5;
              audio.play().catch(() => { });

              toast.success("Cheat Code Activated! 🎮", {
                     description: "解锁隐藏SSR：【幕后黑手】",
                     duration: 5000,
                     className: "bg-black text-green-400 border-green-500 font-mono"
              });
       };

       return null; // 无UI组件
};

import { useState, useEffect } from 'react';

export const TitleCarousel = () => {
       const [index, setIndex] = useState(0);

       useEffect(() => {
              const interval = setInterval(() => {
                     setIndex((prev) => (prev + 1) % 4);
              }, 4000);
              return () => clearInterval(interval);
       }, []);

       const titles = ['别不信', '别装了', '别破防', '别想逃'];
       const subtitles = [
              '你的人设比你想的更毒 👀',
              '87%的人测完不敢发朋友圈 🤐',
              '测完可能会和朋友吵架 💔',
              '你的2025比你想的更离谱 📉'
       ];

       return (
              <div className="space-y-4 min-h-[160px]">
                     <h1 className="text-4xl md:text-6xl font-black text-white leading-tight transition-all duration-500">
                            <span className="block animate-slide-up text-transparent bg-clip-text bg-gradient-to-r from-primary via-coral to-mint">
                                   {titles[index]}
                            </span>
                            <span className="block mt-2 text-3xl md:text-5xl text-white animate-slide-up">
                                   {subtitles[index]}
                            </span>
                     </h1>

                     {/* 副标题 */}
                     <p className="text-xl md:text-2xl text-white/70 font-medium animate-fade-in">
                            12道题，<span className="text-primary font-bold">揭穿</span>你的2025真面目
                            <br />
                            <span className="text-sm text-white/50">（已有 24,593 人测完想删记录）</span>
                     </p>
              </div>
       );
};

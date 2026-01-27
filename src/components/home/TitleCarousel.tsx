import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const TitleCarousel = () => {
       const { t } = useLanguage();
       const [index, setIndex] = useState(0);

       useEffect(() => {
              const interval = setInterval(() => {
                     setIndex((prev) => (prev + 1) % 4);
              }, 4000);
              return () => clearInterval(interval);
       }, []);

       const titles = [
              t('home.carousel.t1'),
              t('home.carousel.t2'),
              t('home.carousel.t3'),
              t('home.carousel.t4')
       ];
       const subtitles = [
              t('home.carousel.s1'),
              t('home.carousel.s2'),
              t('home.carousel.s3'),
              t('home.carousel.s4')
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
                            {t('home.title.static')}
                            <br />
                            <span className="text-sm text-white/50">{t('home.title.sub')}</span>
                     </p>
              </div>
       );
};

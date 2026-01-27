import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// 模拟数据源中的 tag 和 city 暂时保留，但在展示 action 时使用翻译
const liveUpdates = [
  { city: '杭州', tag: '拖延症晚期', emoji: '😂' },
  { city: '深圳', tag: '卷王本王', emoji: '🔥' },
  { city: '成都', tag: '宇宙级摸鱼王', emoji: '😱' },
  { city: '上海', tag: '精神内耗大师', emoji: '💔' },
  { city: '北京', tag: '社交恐龙', emoji: '🦖' },
  { city: '广州', tag: '及时行乐教主', emoji: '🎉' },
  { city: '武汉', tag: '玻璃心碎一地', emoji: '💎' },
  { city: '长沙', tag: '熬夜冠军', emoji: '🌙' },
  { city: '西安', tag: '选择困难症', emoji: '😵' },
  { city: '重庆', tag: '暴躁老哥', emoji: '💣' },
];

export const LiveUpdates = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % liveUpdates.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const update = liveUpdates[currentIndex];
  // 动态获取 action 的翻译
  // i18n key: live.action.1 ~ 10
  // currentIndex 是 0-9，所以 key 是 currentIndex + 1
  const actionText = t(`live.action.${currentIndex + 1}` as any);

  return (
    <div className="flex flex-col gap-2 text-center">
      {/* 实时动态 */}
      <div
        className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
      >
        <p className="text-white/70 text-sm">
          {update.emoji} 来自<span className="text-primary">{update.city}</span>的用户
          测出【<span className="font-bold text-white">{update.tag}</span>】
          {actionText}
        </p>
      </div>

      {/* 数据统计 */}
      <div className="flex items-center justify-center gap-4 text-xs text-white/50">
        <span>{t('home.stats.impossible')}</span>
        <span>•</span>
        <span>{t('home.stats.scared')}</span>
      </div>
    </div>
  );
};

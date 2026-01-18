import { useState, useEffect } from 'react';

const liveUpdates = [
  { city: '杭州', tag: '拖延症晚期', emoji: '😂', action: '表示强烈不服' },
  { city: '深圳', tag: '卷王本王', emoji: '🔥', action: '第5次重测还是它' },
  { city: '成都', tag: '宇宙级摸鱼王', emoji: '😱', action: '和对象吵起来了' },
  { city: '上海', tag: '精神内耗大师', emoji: '💔', action: '破防了' },
  { city: '北京', tag: '社交恐龙', emoji: '🦖', action: '假装没看见' },
  { city: '广州', tag: '及时行乐教主', emoji: '🎉', action: '转发到了家族群' },
  { city: '武汉', tag: '玻璃心碎一地', emoji: '💎', action: '正在拉黑好友' },
  { city: '长沙', tag: '熬夜冠军', emoji: '🌙', action: '发誓今晚早睡' },
  { city: '西安', tag: '选择困难症', emoji: '😵', action: '还在纠结要不要分享' },
  { city: '重庆', tag: '暴躁老哥', emoji: '💣', action: '手机差点摔了' },
];

export const LiveUpdates = () => {
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

  return (
    <div className="flex flex-col gap-2 text-center">
      {/* 实时动态 */}
      <div 
        className={`transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <p className="text-white/70 text-sm">
          {update.emoji} 来自<span className="text-primary">{update.city}</span>的用户
          测出【<span className="font-bold text-white">{update.tag}</span>】
          {update.action}
        </p>
      </div>

      {/* 数据统计 */}
      <div className="flex items-center justify-center gap-4 text-xs text-white/50">
        <span>😅 23%的人表示"不可能，重测"</span>
        <span>•</span>
        <span>🤐 67%的人不敢发朋友圈</span>
      </div>
    </div>
  );
};

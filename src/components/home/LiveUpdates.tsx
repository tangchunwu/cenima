import { useState, useEffect } from 'react';

const liveUpdates = [
  { city: '北京', tag: '卷王本王', emoji: '🔥', action: '表示不服' },
  { city: '上海', tag: '精神氪金玩家', emoji: '⚡', action: '疯狂截图中' },
  { city: '广州', tag: '拖延症晚期', emoji: '😂', action: '第3次重测了' },
  { city: '成都', tag: '赛博隐士', emoji: '🌙', action: '默默保存了' },
  { city: '深圳', tag: '社交牛人', emoji: '🎉', action: '已分享到群聊' },
  { city: '杭州', tag: '情绪过山车', emoji: '🎢', action: '表示太准了' },
  { city: '南京', tag: '佛系躺平人', emoji: '🍃', action: '淡定接受了' },
  { city: '武汉', tag: '精神氪金玩家', emoji: '💰', action: '正在疯狂否认' },
  { city: '重庆', tag: '卷王本王', emoji: '⚡', action: '第2次重测了' },
  { city: '西安', tag: '赛博隐士', emoji: '🌙', action: '默默点了赞' },
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

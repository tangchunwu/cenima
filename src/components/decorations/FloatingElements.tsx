import { useEffect, useState } from 'react';

interface FloatingItem {
  id: number;
  emoji: string;
  left: number;
  top: number;
  animationDelay: number;
  scale: number;
  duration: number;
}

export const FloatingElements = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const emojis = ['⭐', '✨', '🌸', '💫', '🎀', '🌙', '💖', '🌈', '☁️', '🦋', '🍀', '🎊'];
    const newItems: FloatingItem[] = [];

    for (let i = 0; i < 20; i++) {
      newItems.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 5,
        scale: 0.6 + Math.random() * 0.8,
        duration: 3 + Math.random() * 4,
      });
    }

    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute animate-float opacity-40"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            animationDelay: `${item.animationDelay}s`,
            animationDuration: `${item.duration}s`,
            transform: `scale(${item.scale})`,
            fontSize: `${1.2 + item.scale * 0.8}rem`,
          }}
        >
          {item.emoji}
        </div>
      ))}
      
      {/* 额外的大装饰元素 */}
      <div className="absolute top-10 left-10 text-4xl animate-float opacity-30" style={{ animationDelay: '0s' }}>🌟</div>
      <div className="absolute top-20 right-16 text-3xl animate-float opacity-25" style={{ animationDelay: '1s' }}>🎀</div>
      <div className="absolute bottom-32 left-20 text-3xl animate-float opacity-30" style={{ animationDelay: '2s' }}>💫</div>
      <div className="absolute bottom-20 right-10 text-4xl animate-float opacity-25" style={{ animationDelay: '0.5s' }}>🌸</div>
      <div className="absolute top-1/3 left-5 text-2xl animate-wiggle opacity-30" style={{ animationDelay: '1.5s' }}>✨</div>
      <div className="absolute top-1/2 right-8 text-2xl animate-wiggle opacity-25" style={{ animationDelay: '2.5s' }}>🦋</div>
    </div>
  );
};

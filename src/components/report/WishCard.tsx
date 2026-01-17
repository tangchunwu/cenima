import { ReportCard } from './ReportCard';
import { useState } from 'react';
import { Sparkles, Star } from 'lucide-react';

interface WishCardProps {
  content: string;
}

export const WishCard = ({ content }: WishCardProps) => {
  const [isLitUp, setIsLitUp] = useState(false);

  return (
    <ReportCard className="text-center bg-gradient-to-br from-slate-800/90 via-purple-900/90 to-slate-800/90 border-2 border-yellow-500/30">
      <div className="space-y-6">
        {/* 标题 */}
        <div className="space-y-2">
          <div className={`text-5xl transition-all duration-500 ${isLitUp ? 'animate-bounce-slow scale-125' : 'animate-float'}`}>
            {isLitUp ? '🌟' : '⭐'}
          </div>
          <h2 className="text-2xl font-bold text-white">2026年的心愿</h2>
          <p className="text-sm text-white/50">点击点亮它，让宇宙听到</p>
        </div>

        {/* 内容区域 - 可点击点亮 */}
        <div 
          className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-500 ${
            isLitUp 
              ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-2 border-yellow-400/50 shadow-lg shadow-yellow-500/20' 
              : 'bg-yellow-500/10 border-2 border-yellow-500/20 hover:bg-yellow-500/20'
          }`}
          onClick={() => setIsLitUp(true)}
        >
          {/* 发光效果 */}
          {isLitUp && (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-2xl animate-pulse" />
              <Sparkles className="absolute top-2 right-2 w-5 h-5 text-yellow-400 animate-sparkle" />
              <Sparkles className="absolute bottom-2 left-2 w-4 h-4 text-yellow-400 animate-sparkle" style={{ animationDelay: '0.3s' }} />
            </>
          )}
          
          <p className={`text-lg leading-relaxed relative z-10 transition-all duration-500 ${
            isLitUp ? 'text-yellow-100 font-medium' : 'text-white/90'
          }`}>
            🌟 {content}
          </p>
        </div>

        {/* 状态文案 */}
        {isLitUp ? (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <p className="text-yellow-400 font-bold text-lg">
                愿望已被宇宙收到！
              </p>
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </div>
            <p className="text-white/60">
              相信它，等待它
            </p>
          </div>
        ) : (
          <p className="text-white/50 text-sm">
            👆 点击上方区域点亮心愿
          </p>
        )}

        {/* 祝福语 */}
        <div className="space-y-2 pt-4">
          <p className="text-white/70">
            2026年，一切都会实现的
          </p>
          <p className="text-mint font-bold">
            勇敢去追吧 ✨
          </p>
        </div>

        {/* 底部装饰 */}
        <div className="flex justify-center gap-3">
          <span className={`text-xl ${isLitUp ? 'animate-sparkle' : 'animate-float'}`}>⭐</span>
          <span className={`text-2xl ${isLitUp ? 'animate-sparkle' : 'animate-float'}`} style={{ animationDelay: '0.2s' }}>🌙</span>
          <span className={`text-xl ${isLitUp ? 'animate-sparkle' : 'animate-float'}`} style={{ animationDelay: '0.4s' }}>💫</span>
        </div>
      </div>
    </ReportCard>
  );
};

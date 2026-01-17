import { ReportCard } from './ReportCard';
import { useState } from 'react';
import { X } from 'lucide-react';

interface RegretCardProps {
  content: string;
}

export const RegretCard = ({ content }: RegretCardProps) => {
  const [isStrikedOut, setIsStrikedOut] = useState(false);

  return (
    <ReportCard className="text-center bg-gradient-to-br from-slate-800/90 via-purple-900/90 to-slate-800/90 border-2 border-red-500/30">
      <div className="space-y-6">
        {/* 标题 */}
        <div className="space-y-2">
          <div className="text-5xl animate-float">🥲</div>
          <h2 className="text-2xl font-bold text-white">2025年的意难平</h2>
          <p className="text-sm text-white/50">点击划掉它，让它过去</p>
        </div>

        {/* 内容区域 - 可点击划掉 */}
        <div 
          className={`bg-red-500/10 border-2 border-red-500/20 rounded-2xl p-6 cursor-pointer transition-all duration-500 ${
            isStrikedOut ? 'opacity-50' : 'hover:bg-red-500/20'
          }`}
          onClick={() => setIsStrikedOut(true)}
        >
          <div className="relative">
            <p className={`text-lg text-white/90 leading-relaxed italic transition-all duration-500 ${
              isStrikedOut ? 'line-through decoration-red-500 decoration-2' : ''
            }`}>
              "{content}"
            </p>
            {isStrikedOut && (
              <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                <X className="w-16 h-16 text-red-500/50" />
              </div>
            )}
          </div>
        </div>

        {/* 状态文案 */}
        {isStrikedOut ? (
          <div className="space-y-3 animate-fade-in">
            <p className="text-mint font-bold text-lg">
              ✅ 已释放！
            </p>
            <p className="text-white/60">
              过去的就让它过去吧
            </p>
          </div>
        ) : (
          <p className="text-white/50 text-sm">
            👆 点击上方区域划掉它
          </p>
        )}

        {/* 治愈文案 */}
        <div className="space-y-2 pt-4">
          <p className="text-white/70">
            遗憾也是成长的一部分
          </p>
          <p className="text-primary font-bold">
            2026年，轻装上阵 🚀
          </p>
        </div>

        {/* 底部装饰 */}
        <div className="flex justify-center gap-3">
          <span className="text-xl animate-float">🌸</span>
          <span className="text-2xl animate-float" style={{ animationDelay: '0.3s' }}>💪</span>
          <span className="text-xl animate-float" style={{ animationDelay: '0.6s' }}>🌈</span>
        </div>
      </div>
    </ReportCard>
  );
};

import { Button } from '@/components/ui/button';
import { Flame, Leaf } from 'lucide-react';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

export type Camp = 'juanwang' | 'tangping' | null;

interface CampSelectionProps {
  onSelect: (camp: Camp) => void;
  onSkip: () => void;
}

export const CampSelection = ({ onSelect, onSkip }: CampSelectionProps) => {
  return (
    <div className="text-center space-y-6 sm:space-y-8 animate-fade-in max-w-md mx-auto px-3 sm:px-4">
      {/* 标题 */}
      <div className="space-y-2 sm:space-y-3">
        <p className="text-white/60 text-xs sm:text-sm">在开始之前...</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          2025年，你觉得自己更像...
        </h2>
        <p className="text-white/50 text-xs sm:text-sm">随便选一个，待会儿验证 👀</p>
      </div>

      {/* 阵营选择 - 移动端触摸优化 */}
      <div className="flex gap-3 sm:gap-4 justify-center">
        {/* 卷王派 */}
        <Button
          onClick={() => {
            trackEvent(AnalyticsEvents.CAMP_SELECTED, { camp: 'juanwang' });
            onSelect('juanwang');
          }}
          className="flex-1 h-auto py-5 sm:py-6 px-3 sm:px-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border-2 border-red-500/30 hover:border-red-500/50 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-[0.98] group touch-feedback"
          variant="ghost"
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center group-hover:animate-pulse">
              <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold text-white">🔥 卷王派</p>
              <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 sm:mt-1">卷死别人，累死自己</p>
            </div>
          </div>
        </Button>

        {/* 躺平派 */}
        <Button
          onClick={() => {
            trackEvent(AnalyticsEvents.CAMP_SELECTED, { camp: 'tangping' });
            onSelect('tangping');
          }}
          className="flex-1 h-auto py-5 sm:py-6 px-3 sm:px-4 bg-gradient-to-br from-green-500/20 to-cyan-500/20 hover:from-green-500/30 hover:to-cyan-500/30 border-2 border-green-500/30 hover:border-green-500/50 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-[0.98] group touch-feedback"
          variant="ghost"
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center group-hover:animate-pulse">
              <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold text-white">🍃 躺平派</p>
              <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 sm:mt-1">与世无争，快乐咸鱼</p>
            </div>
          </div>
        </Button>
      </div>

      {/* 跳过 */}
      <button
        onClick={onSkip}
        className="text-white/40 text-xs sm:text-sm hover:text-white/60 transition-colors underline underline-offset-4 touch-target py-2"
      >
        先不选，直接测试
      </button>

      {/* 阵营战况预告 */}
      <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
        <p className="text-white/60 text-xs sm:text-sm">
          ⚔️ 当前阵营战况：<span className="text-green-400">躺平派 53%</span> vs <span className="text-red-400">卷王派 47%</span>
        </p>
        <p className="text-white/40 text-[10px] sm:text-xs mt-1">你会站哪边？</p>
      </div>
    </div>
  );
};

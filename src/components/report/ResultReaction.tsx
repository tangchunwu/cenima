import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, RotateCcw, Share2, Sparkles } from 'lucide-react';
import { TagResult } from '@/lib/resultCalculator';
import { Camp } from '@/components/home/CampSelection';

interface ResultReactionProps {
  result: TagResult;
  camp: Camp;
  retestCount: number;
  onAccept: () => void;
  onRetest: () => void;
}

const retestTaunts = [
  '不信结果？行，再测一次',
  '又来？看来上次结果触及灵魂了 😏',
  '你已经第3次重测了...结果可能还是一样的',
  '执着！但AI不会说谎的 🔮',
  '再测100次结果也不会变的~',
];

export const ResultReaction = ({ result, camp, retestCount, onAccept, onRetest }: ResultReactionProps) => {
  const [reaction, setReaction] = useState<'none' | 'accepted' | 'denied'>('none');

  const handleAccept = () => {
    setReaction('accepted');
    setTimeout(onAccept, 1500);
  };

  const handleDeny = () => {
    setReaction('denied');
    setTimeout(onRetest, 2000);
  };

  // 已经有反应后显示的内容
  if (reaction === 'accepted') {
    return (
      <div className="text-center space-y-4 animate-fade-in">
        <div className="text-6xl animate-bounce-slow">🎉</div>
        <p className="text-xl font-bold text-white">勇气可嘉！</p>
        <p className="text-white/60">敢发朋友圈吗？👇</p>
      </div>
    );
  }

  if (reaction === 'denied') {
    const tauntIndex = Math.min(retestCount, retestTaunts.length - 1);
    return (
      <div className="text-center space-y-4 animate-fade-in">
        <div className="text-6xl">😏</div>
        <p className="text-lg text-white/80">{retestTaunts[tauntIndex]}</p>
        <p className="text-white/40 text-sm">正在重置...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 挑衅文案 */}
      <div className="text-center">
        <p className="text-white/70 text-lg">
          怎么，不服？<span className="text-primary font-bold">87%</span>的人都不服
        </p>
        <p className="text-white/50 text-sm mt-1">但结果往往很准 😏</p>
      </div>

      {/* 阵营显示 */}
      {camp && (
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
          <p className="text-white/60 text-sm mb-2">
            你是 <span className={camp === 'juanwang' ? 'text-red-400' : 'text-green-400'}>
              {camp === 'juanwang' ? '🔥 卷王派' : '🍃 躺平派'}
            </span> 的
          </p>
          <p className="text-2xl font-bold text-white">{result.mainTag}</p>
          
          {/* 阵营战况 */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-green-400">🍃 躺平派 53%</span>
              <span className="text-red-400">🔥 卷王派 47%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '53%' }} />
            </div>
            <p className="text-white/40 text-xs mt-2">
              {camp === 'tangping' ? '躺平派正在赢！拉个卷王来验证' : '卷王派加油！快拉人来站队'}
            </p>
          </div>
        </div>
      )}

      {/* 双按钮 */}
      <div className="flex gap-3">
        <Button
          onClick={handleAccept}
          className="flex-1 py-6 bg-gradient-to-r from-primary to-coral text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform"
        >
          <ThumbsUp className="w-5 h-5 mr-2" />
          太准了，我承认
        </Button>
        <Button
          onClick={handleDeny}
          variant="outline"
          className="flex-1 py-6 border-white/20 text-white hover:bg-white/10 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          不可能，重测
        </Button>
      </div>

      {/* 底部提示 */}
      <p className="text-center text-white/40 text-xs">
        👆 {retestCount > 0 ? `你已经重测了${retestCount}次` : '选择你的真实反应'}
      </p>
    </div>
  );
};

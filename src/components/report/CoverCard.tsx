import { TagResult } from '@/lib/resultCalculator';
import { ReportCard } from './ReportCard';
import { Sparkles, Zap } from 'lucide-react';

interface CoverCardProps {
  result: TagResult;
}

export const CoverCard = ({ result }: CoverCardProps) => {
  return (
    <ReportCard className="text-center bg-gradient-to-br from-slate-800/90 via-purple-900/90 to-slate-800/90 border-2 border-primary/30">
      <div className="space-y-6">
        {/* 顶部标签 */}
        <div className="inline-flex items-center gap-2 bg-red-500/20 px-4 py-1 rounded-full border border-red-500/30">
          <Zap className="w-4 h-4 text-red-400" />
          <span className="text-sm font-bold text-red-400">2025年度人设揭晓</span>
        </div>

        {/* 主要emoji - 更大更醒目 */}
        <div className="relative">
          <div className="text-9xl animate-bounce-slow">{result.emoji}</div>
          <div className="absolute inset-0 text-9xl animate-ping opacity-30">{result.emoji}</div>
        </div>

        {/* 主标签 - 霓虹效果 */}
        <div className="space-y-3">
          <p className={`text-5xl font-black bg-gradient-to-r ${result.color} bg-clip-text text-transparent animate-glow-text`}>
            {result.mainTag}
          </p>
          <p className="text-white/60 text-sm">你的2025年度人设</p>
        </div>

        {/* 副标签 */}
        <div className="flex flex-wrap justify-center gap-2">
          {result.subTags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 border border-white/20"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 年度关键词 */}
        <div className="bg-primary/20 rounded-xl px-4 py-3 border border-primary/30">
          <p className="text-xs text-primary/80 mb-1">2025年度关键词</p>
          <p className="text-primary font-bold text-lg">{result.keyword2025}</p>
        </div>

        {/* 描述 */}
        <p className="text-white/70 text-base leading-relaxed px-2">
          {result.description}
        </p>

        {/* 底部提示 */}
        <div className="flex items-center justify-center gap-2 text-white/40 text-xs pt-2">
          <span>向左滑动查看更多</span>
          <span>→</span>
        </div>
      </div>
    </ReportCard>
  );
};

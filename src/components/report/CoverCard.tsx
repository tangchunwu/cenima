import { TagResult } from '@/lib/resultCalculator';
import { ReportCard } from './ReportCard';
import { Sparkles } from 'lucide-react';

interface CoverCardProps {
  result: TagResult;
}

export const CoverCard = ({ result }: CoverCardProps) => {
  return (
    <ReportCard className="text-center">
      <div className="space-y-6">
        {/* 顶部装饰 */}
        <div className="flex justify-center gap-2">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">2025年度报告</span>
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        </div>

        {/* 主要emoji */}
        <div className="text-8xl animate-bounce-slow">{result.emoji}</div>

        {/* 标题 */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            你的2025年度人设
          </h1>
          <p className={`text-4xl font-bold bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
            {result.mainTag}
          </p>
        </div>

        {/* 副标签 */}
        <div className="flex flex-wrap justify-center gap-2">
          {result.subTags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-secondary/50 rounded-full text-sm text-secondary-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 描述 */}
        <p className="text-muted-foreground text-lg leading-relaxed px-4">
          {result.description}
        </p>

        {/* 底部装饰 */}
        <div className="flex justify-center gap-3 pt-4">
          <span className="text-2xl animate-float">🌟</span>
          <span className="text-xl animate-float" style={{ animationDelay: '0.3s' }}>✨</span>
          <span className="text-2xl animate-float" style={{ animationDelay: '0.6s' }}>💫</span>
        </div>

        <p className="text-xs text-muted-foreground/60">向左滑动查看更多 →</p>
      </div>
    </ReportCard>
  );
};

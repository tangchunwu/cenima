import { ReportCard } from './ReportCard';

interface WishCardProps {
  content: string;
}

export const WishCard = ({ content }: WishCardProps) => {
  return (
    <ReportCard className="text-center">
      <div className="space-y-6">
        {/* 标题 */}
        <div className="space-y-2">
          <div className="text-5xl animate-bounce-slow">🌠</div>
          <h2 className="text-2xl font-bold text-foreground">2026年的期待</h2>
          <p className="text-sm text-muted-foreground">许个愿，让它成真</p>
        </div>

        {/* 内容区域 */}
        <div className="bg-gradient-to-br from-primary/10 to-coral/10 rounded-2xl p-6 border-2 border-primary/20">
          <p className="text-lg text-foreground leading-relaxed">
            🌟 {content}
          </p>
        </div>

        {/* 祝福语 */}
        <div className="space-y-2">
          <p className="text-primary font-bold text-lg">
            愿望已被宇宙收到 ✨
          </p>
          <p className="text-muted-foreground text-sm">
            2026年，一切都会实现的
          </p>
        </div>

        {/* 底部装饰 */}
        <div className="flex justify-center gap-3">
          <span className="text-xl animate-sparkle">⭐</span>
          <span className="text-2xl animate-sparkle" style={{ animationDelay: '0.2s' }}>🌙</span>
          <span className="text-xl animate-sparkle" style={{ animationDelay: '0.4s' }}>💫</span>
        </div>
      </div>
    </ReportCard>
  );
};

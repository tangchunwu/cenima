import { ReportCard } from './ReportCard';

interface RegretCardProps {
  content: string;
}

export const RegretCard = ({ content }: RegretCardProps) => {
  return (
    <ReportCard className="text-center">
      <div className="space-y-6">
        {/* 标题 */}
        <div className="space-y-2">
          <div className="text-5xl animate-float">🥲</div>
          <h2 className="text-2xl font-bold text-foreground">2025年的遗憾</h2>
          <p className="text-sm text-muted-foreground">写下来，然后放下它</p>
        </div>

        {/* 内容区域 */}
        <div className="bg-secondary/30 rounded-2xl p-6">
          <p className="text-lg text-foreground leading-relaxed italic">
            "{content}"
          </p>
        </div>

        {/* 治愈文案 */}
        <div className="space-y-2">
          <p className="text-muted-foreground">
            遗憾也是成长的一部分
          </p>
          <p className="text-primary font-medium">
            2026年，重新出发 ✨
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

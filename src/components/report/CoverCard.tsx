import { ReportCard } from "./ReportCard";
import { FloatingElements } from "../decorations/FloatingElements";

interface CoverCardProps {
  year?: string;
}

export function CoverCard({ year = "2025" }: CoverCardProps) {
  return (
    <ReportCard variant="gradient" className="relative overflow-hidden">
      <FloatingElements variant="stars" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 text-7xl animate-bounce-slow">📊</div>
        
        <h1 className="mb-2 text-4xl font-black text-foreground">
          我的{year}
        </h1>
        <h2 className="text-3xl font-bold text-primary">
          年度报告
        </h2>
        
        <div className="mt-6 flex gap-2">
          <span className="text-2xl">✨</span>
          <span className="text-2xl">🎯</span>
          <span className="text-2xl">💫</span>
        </div>
        
        <p className="mt-6 text-sm text-muted-foreground">
          向左滑动查看更多 →
        </p>
      </div>
    </ReportCard>
  );
}

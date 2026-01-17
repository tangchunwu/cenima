import { ReportCard } from "./ReportCard";

interface WishCardProps {
  expectation: string;
}

export function WishCard({ expectation }: WishCardProps) {
  return (
    <ReportCard variant="gradient" className="relative overflow-hidden">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 text-6xl animate-sparkle">🌟</div>
        
        <p className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          2025最期待的事
        </p>
        
        <div className="relative mb-6 rounded-2xl bg-sunshine/20 p-6">
          <p className="text-lg font-medium text-foreground">
            {expectation}
          </p>
        </div>
        
        <div className="space-y-2 text-center">
          <p className="text-xl font-bold text-primary">
            愿望一定会实现的 ✨
          </p>
          <p className="text-sm text-muted-foreground">
            2025，我们一起加油！
          </p>
        </div>
      </div>
    </ReportCard>
  );
}

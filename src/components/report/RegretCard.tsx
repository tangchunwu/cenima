import { ReportCard } from "./ReportCard";

interface RegretCardProps {
  regret: string;
}

export function RegretCard({ regret }: RegretCardProps) {
  return (
    <ReportCard variant="default" className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 text-6xl">💔</div>
        
        <p className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          2024年的遗憾
        </p>
        
        <div className="relative mb-6 rounded-2xl bg-muted/50 p-6">
          <span className="absolute -left-2 -top-2 text-3xl opacity-30">"</span>
          <p className="text-lg font-medium text-foreground italic">
            {regret}
          </p>
          <span className="absolute -bottom-2 -right-2 text-3xl opacity-30">"</span>
        </div>
        
        <p className="text-sm text-muted-foreground">
          释怀过去，拥抱2025 ✨
        </p>
      </div>
    </ReportCard>
  );
}

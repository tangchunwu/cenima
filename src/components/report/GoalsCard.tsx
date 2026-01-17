import { ReportCard } from "./ReportCard";

interface GoalsCardProps {
  goals: string[];
  customGoal?: string;
}

export function GoalsCard({ goals, customGoal }: GoalsCardProps) {
  // 目标emoji映射
  const goalEmojis: { [key: string]: { emoji: string; text: string } } = {
    '25a': { emoji: '🏃', text: '身体健康，坚持运动' },
    '25b': { emoji: '📚', text: '学习成长，提升自己' },
    '25c': { emoji: '💰', text: '赚更多钱' },
    '25d': { emoji: '👨‍👩‍👧', text: '多陪伴家人朋友' },
    '25e': { emoji: '🚀', text: '完成一个大项目' },
    '25f': { emoji: '🌸', text: '好好生活，照顾自己' },
    '25g': { emoji: '💕', text: '脱单/维护好感情' },
    '25h': { emoji: '✈️', text: '出去旅行看世界' },
  };

  return (
    <ReportCard variant="accent" className="relative">
      <div className="flex flex-col items-center text-center w-full">
        <div className="mb-4 text-6xl animate-bounce-slow">🎯</div>
        
        <p className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          2025年度目标
        </p>
        
        <h3 className="mb-6 text-2xl font-bold text-foreground">
          我要做到的事
        </h3>
        
        <div className="w-full space-y-3">
          {goals.filter(g => !g.startsWith('custom:')).map((goalId, index) => {
            const goal = goalEmojis[goalId];
            if (!goal) return null;
            return (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl bg-card p-3 text-left shadow-sm"
              >
                <span className="text-2xl">{goal.emoji}</span>
                <span className="font-medium">{goal.text}</span>
              </div>
            );
          })}
          
          {customGoal && (
            <div className="flex items-center gap-3 rounded-xl bg-primary/10 p-3 text-left shadow-sm border-2 border-primary/20">
              <span className="text-2xl">✍️</span>
              <span className="font-medium">{customGoal}</span>
            </div>
          )}
        </div>
      </div>
    </ReportCard>
  );
}

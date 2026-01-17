import { ReportCard } from "./ReportCard";
import { TagResult } from "@/lib/resultCalculator";
import { cn } from "@/lib/utils";

interface TagCardProps {
  result: TagResult;
}

export function TagCard({ result }: TagCardProps) {
  return (
    <ReportCard className="relative overflow-hidden">
      <div className="flex flex-col items-center text-center">
        {/* 主Emoji */}
        <div className="mb-4 text-7xl animate-float">
          {result.emoji}
        </div>
        
        {/* 你的标签 */}
        <p className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          你的年度人设
        </p>
        
        {/* 主标签 */}
        <h2 className={`mb-4 text-3xl font-black bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
          {result.mainTag}
        </h2>
        
        {/* 副标签 */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {result.subTags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium",
                index === 0 && "bg-secondary text-secondary-foreground",
                index === 1 && "bg-accent/20 text-accent-foreground",
                index === 2 && "bg-sunshine/30 text-foreground",
              )}
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* 描述 */}
        <p className="text-base text-muted-foreground leading-relaxed">
          {result.description}
        </p>
      </div>
    </ReportCard>
  );
}

import { ReportCard } from "./ReportCard";
import { cn } from "@/lib/utils";

interface TagCardProps {
  mainTag: string;
  subTags: string[];
  description: string;
  emoji: string;
}

export function TagCard({ mainTag, subTags, description, emoji }: TagCardProps) {
  return (
    <ReportCard variant="primary" className="relative overflow-hidden">
      <div className="flex flex-col items-center text-center">
        {/* 主Emoji */}
        <div className="mb-4 text-7xl animate-float">
          {emoji}
        </div>
        
        {/* 你的标签 */}
        <p className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          你的年度人设
        </p>
        
        {/* 主标签 */}
        <h2 className="mb-4 text-3xl font-black text-primary">
          {mainTag}
        </h2>
        
        {/* 副标签 */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {subTags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium",
                index === 0 && "bg-secondary text-secondary-foreground",
                index === 1 && "bg-accent/20 text-accent-foreground",
                index === 2 && "bg-sunshine/30 text-foreground",
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* 描述 */}
        <p className="text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </ReportCard>
  );
}

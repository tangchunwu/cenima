import { ReportCard } from "./ReportCard";
import { TagResult } from "@/lib/resultCalculator";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface TagCardProps {
  result: TagResult;
}

export function TagCard({ result }: TagCardProps) {
  return (
    <ReportCard className="relative overflow-hidden bg-gradient-to-br from-slate-800/90 via-purple-900/90 to-slate-800/90 border-2 border-coral/30">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* 标题 */}
        <div className="flex items-center gap-2 text-coral">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-bold">灵魂拷问时间</span>
        </div>
        
        {/* 主Emoji */}
        <div className="text-7xl animate-wiggle">
          {result.emoji}
        </div>
        
        {/* 主标签 */}
        <h2 className={`text-3xl font-black bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
          {result.mainTag}
        </h2>
        
        {/* 毒舌描述 - 核心亮点 */}
        <div className="bg-red-500/10 border-2 border-red-500/20 rounded-2xl p-5 w-full">
          <p className="text-white/90 text-base leading-relaxed">
            {result.description}
          </p>
          <div className="mt-4 pt-4 border-t border-red-500/20">
            <p className="text-red-400/80 text-sm italic">
              💀 "{result.roast}"
            </p>
          </div>
        </div>
        
        {/* 2026预言 */}
        <div className="bg-mint/10 border border-mint/30 rounded-xl p-4 w-full">
          <p className="text-xs text-mint/70 mb-1">🔮 系统预测</p>
          <p className="text-mint font-medium text-sm">
            {result.prediction2026}
          </p>
        </div>
        
        {/* 副标签 */}
        <div className="flex flex-wrap justify-center gap-2">
          {result.subTags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium",
                index === 0 && "bg-primary/20 text-primary border border-primary/30",
                index === 1 && "bg-coral/20 text-coral border border-coral/30",
                index === 2 && "bg-mint/20 text-mint border border-mint/30",
              )}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </ReportCard>
  );
}

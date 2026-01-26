import { ReportCard } from "./ReportCard";
import { TagResult } from "@/lib/resultCalculator";
import { cn } from "@/lib/utils";
import { User, ScanBarcode, Fingerprint } from "lucide-react";

interface TagCardProps {
  result: TagResult;
}

export function TagCard({ result }: TagCardProps) {
  return (
    <ReportCard className="relative overflow-hidden bg-slate-100 text-slate-800 border-2 border-slate-300 shadow-md">
      {/* 顶部挂绳孔装饰 */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-slate-300 rounded-full" />

      <div className="flex flex-col items-center space-y-6 pt-6">
        {/* 顶部ID标识 */}
        <div className="w-full flex justify-between items-center px-4 border-b border-slate-200 pb-2">
          <div className="flex items-center gap-1 text-slate-400 font-mono text-xs">
            <ScanBarcode className="w-4 h-4" />
            <span>ID-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
          </div>
          <div className="bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            Subject Profile
          </div>
        </div>

        {/* 头像区域 */}
        <div className="relative">
          <div className="w-32 h-32 bg-slate-200 rounded-lg flex items-center justify-center border border-slate-300 shadow-inner">
            <div className="text-6xl filter drop-shadow-md grayscale hover:grayscale-0 transition-all cursor-pointer">
              {result.emoji}
            </div>
          </div>
          {/* 稀有度标签 */}
          <div className="absolute -bottom-3 -right-3 bg-slate-800 text-white text-xs font-black px-2 py-1 rounded shadow-lg border-2 border-white">
            CLASS-{result.rarity}
          </div>
        </div>

        {/* 主标签 */}
        <div className="text-center space-y-1">
          <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Assigned Designation</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {result.mainTag}
          </h2>
        </div>

        {/* 临床描述 */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 w-full text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-1">
            <Fingerprint className="w-12 h-12 text-slate-100 -rotate-12" />
          </div>
          <p className="text-xs text-slate-400 font-bold mb-1 uppercase">Clinical Observation</p>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            {result.description}
          </p>

          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-bold mb-1 uppercase">Behavioral Notes (Toxic)</p>
            <p className="text-red-500 text-xs italic">
              "{result.roast}"
            </p>
          </div>
        </div>

        {/* 特征标签 */}
        <div className="w-full">
          <p className="text-xs text-slate-400 font-bold mb-2 uppercase text-center">Trait Markers</p>
          <div className="flex flex-wrap justify-center gap-2">
            {result.subTags.map((tag, index) => (
              <span
                key={index}
                className={cn(
                  "rounded px-2 py-1 text-xs font-bold border",
                  "bg-slate-50 text-slate-600 border-slate-200"
                )}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 底部条形码装饰 */}
        <div className="w-full h-8 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAYAAAD5PA/NAAAAFklEQVR42mN88f79fwYgYGRkZGQAJQwAHl4Gf7/j+5AAAAAASUVORK5CYII=')] opacity-20 mt-4" />
      </div>
    </ReportCard>
  );
}

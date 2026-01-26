import { ReportCard } from './ReportCard';
import { useState } from 'react';
import { X, FileClock, Trash2 } from 'lucide-react';

interface RegretCardProps {
  content: string;
}

export const RegretCard = ({ content }: RegretCardProps) => {
  const [isStrikedOut, setIsStrikedOut] = useState(false);

  return (
    <ReportCard className="text-center bg-slate-100 text-slate-800 border-2 border-slate-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-300" />

      <div className="space-y-6 pt-4">
        {/* 标题 */}
        <div className="flex flex-col items-center border-b border-slate-200 pb-4">
          <div className="bg-slate-200 p-2 rounded-full mb-2">
            <FileClock className="w-6 h-6 text-slate-500" />
          </div>
          <h2 className="text-xl font-black text-slate-700 uppercase tracking-tight">Past Medical History</h2>
          <p className="text-xs text-slate-400 font-bold uppercase">Chronic Symptoms (2025)</p>
        </div>

        {/* 内容区域 - 可点击划掉 */}
        <div
          className={`bg-white border-2 border-slate-200 rounded-xl p-6 cursor-pointer transition-all duration-500 relative ${isStrikedOut ? 'opacity-60 bg-slate-50' : 'hover:border-slate-300 shadow-sm'
            }`}
          onClick={() => setIsStrikedOut(true)}
        >
          <div className="relative z-10">
            <p className={`text-lg text-slate-700 font-serif italic leading-relaxed transition-all duration-500 ${isStrikedOut ? 'line-through decoration-red-500 decoration-4 text-slate-400 blur-[1px]' : ''
              }`}>
              "{content}"
            </p>
            {isStrikedOut && (
              <div className="absolute inset-0 flex items-center justify-center animate-fade-in scale-125">
                <div className="border-4 border-red-500 text-red-500 px-4 py-2 font-black text-2xl -rotate-12 rounded opacity-80 decoration-slice">
                  RESOLVED
                </div>
              </div>
            )}

            {!isStrikedOut && (
              <div className="absolute -bottom-3 -right-3">
                <Trash2 className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </div>
        </div>

        {/* 状态文案 */}
        <div className="bg-slate-200/50 rounded-lg p-3">
          {isStrikedOut ? (
            <div className="space-y-1 animate-fade-in">
              <p className="text-emerald-600 font-bold text-sm">
                ✓ SYMPTOM CLEARED
              </p>
              <p className="text-slate-500 text-xs">
                Patient has successfully processed this trauma.
              </p>
            </div>
          ) : (
            <p className="text-slate-400 text-xs font-bold uppercase">
              tap record to mark as resolved
            </p>
          )}
        </div>

        {/* 底部装饰 */}
        <div className="flex justify-center gap-3 opacity-30 grayscale">
          <span className="text-xl">🖤</span>
          <span className="text-xl">🥀</span>
          <span className="text-xl">🍂</span>
        </div>
      </div>
    </ReportCard>
  );
};

import { ReportCard } from './ReportCard';
import { useState } from 'react';
import { Target, CheckCircle2, Flag, Pen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSound } from '@/contexts/SoundContext';

interface WishCardProps {
  content: string;
}

export const WishCard = ({ content }: WishCardProps) => {
  const [isLitUp, setIsLitUp] = useState(false);
  const { playSFX } = useSound();

  return (
    <ReportCard className="text-center bg-slate-50 text-slate-800 border-2 border-emerald-500/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50" />

      <div className="space-y-6 pt-4">
        {/* 标题 */}
        <div className="flex flex-col items-center border-b border-emerald-100 pb-4">
          <div className="bg-emerald-100 p-2 rounded-full mb-2">
            <Target className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">2026 康复目标</h2>
          <p className="text-xs text-slate-400 font-bold uppercase">TREATMENT PLAN</p>
        </div>

        {/* 内容区域 - 可点击点亮 */}
        <div
          className={`relative rounded-xl p-6 cursor-pointer transition-all duration-500 border-2 ${isLitUp
            ? 'bg-emerald-50 border-emerald-400 shadow-lg scale-[1.02]'
            : 'bg-white border-slate-200 hover:border-emerald-200'
            }`}
          onClick={() => setIsLitUp(true)}
        >
          <div className="relative z-10 flex flex-col items-center">
            <Flag className={`w-6 h-6 mb-2 transition-colors duration-500 ${isLitUp ? 'text-emerald-500' : 'text-slate-300'}`} />

            <p className={`text-lg font-medium leading-relaxed transition-all duration-500 ${isLitUp ? 'text-emerald-800' : 'text-slate-600'
              }`}>
              "{content}"
            </p>

            {isLitUp && (
              <div className="mt-2 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase animate-fade-in">
                目标已锁定
              </div>
            )}
          </div>
        </div>

        {/* 交互区域 */}
        <div className="bg-emerald-50/50 rounded-lg p-3 relative min-h-[60px] flex items-center justify-center">
          {isLitUp ? (
            <div className="space-y-1 animate-fade-in relative z-10">
              <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>方案已生效</span>
              </div>
              <p className="text-slate-500 text-xs">
                全宇宙能量正在汇聚中...
              </p>

              {/* 盖章动画 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-16 border-4 border-red-500/30 text-red-500/30 rounded flex items-center justify-center font-black text-xl -rotate-12 animate-in zoom-in duration-300 pointer-events-none whitespace-nowrap">
                APPROVED
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLitUp(true);
                playSFX('click');
                confetti({
                  particleCount: 60,
                  spread: 70,
                  origin: { y: 0.7 },
                  colors: ['#10b981', '#34d399', '#6ee7b7']
                });
              }}
              className="group flex items-center gap-2 px-6 py-2 bg-emerald-100/50 hover:bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase transition-all active:scale-95"
            >
              <Pen className="w-3 h-3 group-hover:rotate-12 transition-transform" />
              点击签署治疗方案
            </button>
          )}
        </div>

        {/* 底部装饰 */}
        <div className="flex justify-center gap-3 opacity-40">
          <span className="text-xl">🌱</span>
          <span className="text-xl">☀️</span>
          <span className="text-xl">🏃</span>
        </div>
      </div>
    </ReportCard>
  );
};

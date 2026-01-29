import { TagResult } from '@/lib/resultCalculator';
import { ReportCard } from './ReportCard';
import { Zap, Lock, Fingerprint, FileWarning, Stamp, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CoverCardProps {
  result: TagResult;
}

export const CoverCard = ({ result }: CoverCardProps) => {
  const { t } = useLanguage();
  return (
    <ReportCard className="text-center bg-[#f4f4f5] text-slate-800 border-t-8 border-red-600 relative overflow-hidden font-mono shadow-xl rounded-t-lg rounded-b-xl">
      {/* 档案袋纹理 */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] opacity-30 pointer-events-none" />

      <div className="absolute top-2 right-4 text-[10px] text-red-600/60 font-black tracking-[0.2em] border border-red-600/30 px-2 py-0.5 rounded rotate-2">
        {t('report.top_secret')}
      </div>

      {/* 稀有度标签 - 左上角 */}
      <div className="absolute top-2 left-4">
        {result.rarity === 'SSR' && (
          <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded text-xs font-black shadow-sm animate-pulse">
            <Star className="w-3 h-3 fill-current" /> SSR
          </div>
        )}
      </div>

      <div className="space-y-4 relative z-10 p-2">
        {/* 绝密档案头部 */}
        <div className="border-b-2 border-slate-300 pb-2 border-dashed">
          <div className="inline-flex items-center gap-2 bg-slate-200 px-4 py-1 rounded text-xs font-bold text-slate-500 mb-2">
            <Lock className="w-3 h-3" /> {t('report.confidential')}
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase whitespace-pre-wrap">
            {t('report.eval_title')}
          </h1>
        </div>

        {/* 核心形象展示 (马图片) */}
        <div className="relative py-2 min-h-[180px] flex items-center justify-center">
          {/* 背景装饰 */}
          <div className={`absolute inset-0 bg-gradient-to-b ${result.color} opacity-10 rounded-xl blur-lg scale-90`} />
          <Fingerprint className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-slate-900/5 rotate-12" />

          <div className="relative z-10 w-full max-w-[240px] aspect-square mx-auto transform hover:scale-105 transition-transform duration-500">
            {result.image ? (
              <img
                src={result.image}
                alt={result.mainTag}
                className="w-full h-full object-contain drop-shadow-2xl filter brightness-110"
              />
            ) : (
              <div className="text-8xl drop-shadow-xl filter grayscale-[0.2]">
                {result.emoji}
              </div>
            )}
          </div>

          {/* 诊断印章 */}
          <div className="absolute bottom-0 right-4 rotate-[-12deg] animate-pulse">
            <div className="border-4 border-red-600 text-red-600 px-3 py-1 font-black text-xl rounded opacity-80 backdrop-blur-sm shadow-lg flex items-center gap-1">
              <Stamp className="w-5 h-5" />
              {t('report.confirmed')}
            </div>
          </div>
        </div>

        {/* 诊断名称 (马类型) */}
        <div className="space-y-2 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 mx-1 shadow-sm">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">
            {t('report.diagnosis')}
          </p>
          <p className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${result.color} filter drop-shadow-sm`}>
            {result.mainTag}
          </p>
        </div>

        {/* 毒舌短评 (原描述) */}
        <div className="text-center bg-yellow-50 border border-yellow-200 p-3 rounded shadow-sm relative mt-2 -rotate-1 mx-2">
          <p className="text-slate-800 text-lg font-bold font-serif italic relative">
            <span className="text-3xl text-yellow-400 absolute -top-2 -left-2">"</span>
            {result.roast}
            <span className="text-3xl text-yellow-400 absolute -bottom-4 -right-2">"</span>
          </p>
        </div>

        {/* 详细描述 */}
        <div className="bg-slate-100 p-3 rounded text-sm text-slate-600 text-left leading-relaxed border border-slate-200 mx-2">
          {result.description}
        </div>

        {/* 底部翻页提示 */}
        <div className="text-[10px] text-slate-400 pt-2 flex items-center justify-center gap-2">
          <span>{t('report.page')} 1 OF 5</span>
          <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-1/5 h-full bg-slate-400" />
          </div>
        </div>
      </div>
    </ReportCard>
  );
};

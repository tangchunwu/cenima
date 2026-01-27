import { TagResult } from '@/lib/resultCalculator';
import { ReportCard } from './ReportCard';
import { Zap, Lock, Fingerprint, FileWarning } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CoverCardProps {
  result: TagResult;
}

export const CoverCard = ({ result }: CoverCardProps) => {
  const { t } = useLanguage();
  return (
    <ReportCard className="text-center bg-[#e0e5ec] text-slate-800 border-t-8 border-red-600 relative overflow-hidden font-mono shadow-xl rounded-t-lg rounded-b-xl">
      {/* 档案袋纹理 */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] opacity-30 pointer-events-none" />

      <div className="absolute top-2 right-4 text-[10px] text-red-600/60 font-black tracking-[0.2em] border border-red-600/30 px-2 py-0.5 rounded rotate-2">
        {t('report.top_secret')}
      </div>

      <div className="space-y-6 relative z-10 p-2">
        {/* 绝密档案头部 */}
        <div className="border-b-2 border-slate-300 pb-4 border-dashed">
          <div className="inline-flex items-center gap-2 bg-slate-200 px-4 py-1.5 rounded text-xs font-bold text-slate-500 mb-3">
            <Lock className="w-3 h-3" /> {t('report.confidential')}
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase whitespace-pre-wrap">
            {t('report.eval_title')}
          </h1>
        </div>

        {/* 核心诊断结果 (原主要Emoji) */}
        <div className="relative py-4">
          {/* 指纹装饰 */}
          <Fingerprint className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-slate-900/5 rotate-12" />

          <div className="relative z-10">
            <div className="text-8xl drop-shadow-xl filter grayscale-[0.2] hover:grayscale-0 transition-all duration-500 cursor-help">
              {result.emoji}
            </div>

            {/* 诊断印章 */}
            <div className="absolute -bottom-4 -right-2 rotate-[-12deg] animate-pulse">
              <div className="border-4 border-red-600 text-red-600 px-3 py-1 font-black text-xl rounded opacity-80 backdrop-blur-sm">
                {t('report.confirmed')}
              </div>
            </div>
          </div>
        </div>

        {/* 诊断名称 (原主标签) */}
        <div className="space-y-2 bg-white/50 p-4 rounded-xl border border-slate-200 mx-1">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">
            {t('report.diagnosis')}
          </p>
          <p className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${result.color} filter drop-shadow-sm`}>
            {result.mainTag}
          </p>
        </div>

        {/* 关联症状 (原副标签) */}
        <div className="flex flex-wrap justify-center gap-2">
          {result.subTags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-200 rounded text-xs font-bold text-slate-600 border border-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 年度总结 (原描述) */}
        <div className="text-left bg-yellow-50 border border-yellow-200 p-3 rounded shadow-sm relative mt-2 rotate-1">
          <FileWarning className="absolute -top-2 -left-2 w-5 h-5 text-yellow-600 bg-yellow-100 rounded-full p-1" />
          <p className="text-slate-700 text-sm leading-relaxed font-serif italic">
            "{result.description}"
          </p>
        </div>

        {/* 底部翻页提示 */}
        <div className="text-[10px] text-slate-400 pt-4 flex items-center justify-center gap-2">
          <span>{t('report.page')} 1 OF 4</span>
          <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-1/4 h-full bg-slate-400" />
          </div>
        </div>
      </div>
    </ReportCard>
  );
};

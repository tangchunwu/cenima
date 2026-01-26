import { TagResult } from '@/lib/resultCalculator';
import { ReportCard } from './ReportCard';
import { Share2, Copy, Check, Download, Loader2, Hospital, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { PosterGenerator } from './PosterGenerator';

interface ShareCardProps {
  result: TagResult;
  sessionId: string;
}

export const ShareCard = ({ result, sessionId }: ShareCardProps) => {
  const [copied, setCopied] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateTrigger, setGenerateTrigger] = useState(false);

  // 生成挑战链接
  const battleLink = `${window.location.origin}?inviter=${encodeURIComponent(result.mainTag)}&camp=${encodeURIComponent(result.mainTag)}&score=${sessionId.slice(0, 4)}`;

  const shareTexts = [
    `🏥 2025年度体检报告出炉\n\n我的确诊结果：【${result.mainTag}】\n症状描述：${result.roast}\n\n建议你也来查查脑子 👉 ${battleLink}`,
    `💊 确诊通知书\n\n患者：${result.mainTag}\n严重程度：${result.rarity}\n医生建议：放弃治疗，保持现状。\n\n预约挂号通道 👉 ${battleLink}`,
    `🆘 紧急病历分享\n\n我查出了【${result.mainTag}】，据说只有${result.populationPercentage}%的人得这病。\n\n来看看你的检查结果 👉 ${battleLink}`,
    `👨‍⚕️ 医生说我没救了\n\n确诊为【${result.mainTag}】，已开具2026年处方。\n\n你的体检报告已生成 👉 ${battleLink}`,
  ];
  const shareText = shareTexts[textIndex];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success('已复制到剪贴板！');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('复制失败，请手动复制');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '我的2025年度报告',
          text: shareText,
        });
      } catch (err) {
        // 用户取消分享
      }
    } else {
      handleCopy();
    }
  };

  const handleGeneratePoster = () => {
    setIsGenerating(true);
    setGenerateTrigger(true);
  };

  const onPosterGenerated = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shabi-report-${result.mainTag}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsGenerating(false);
    setGenerateTrigger(false);
    toast.success('海报保存成功！');
  };

  return (
    <ReportCard className="text-center relative bg-white border border-slate-200 shadow-xl overflow-hidden text-slate-800">
      {/* 顶部装饰条 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />

      {/* Hidden Generator */}
      <PosterGenerator
        result={result}
        onGenerate={onPosterGenerated}
        trigger={generateTrigger}
        link={battleLink}
      />

      <div className="space-y-6 pt-6">
        {/* 医院/机构抬头 */}
        <div className="flex flex-col items-center border-b border-slate-100 pb-4">
          <div className="bg-red-500 text-white rounded-full p-2 mb-2">
            <Hospital className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">DISCHARGE SUMMARY</h2>
          <p className="text-xs text-slate-400 font-bold uppercase">Patient Copy • Non-Official Document</p>
        </div>

        {/* 核心展示区 */}
        <div className="space-y-2">
          <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <div className="text-4xl">{result.emoji}</div>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Diagnosis Confirmed</p>
            <h3 className="text-2xl font-black text-slate-900">{result.mainTag}</h3>
          </div>
        </div>

        {/* 分享文案选择 */}
        <div className="flex flex-wrap justify-center gap-2">
          {['体检版', '确诊版', '病历版', '没救版'].map((label, idx) => (
            <button
              key={idx}
              onClick={() => setTextIndex(idx)}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all border ${idx === textIndex
                ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 预览卡片 */}
        <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-200 relative">
          <Stethoscope className="absolute -top-3 -left-2 w-6 h-6 text-slate-400 transform -rotate-12 bg-white rounded-full p-1 border border-slate-200" />
          <p className="text-sm text-slate-600 font-medium whitespace-pre-line leading-relaxed selection:bg-red-100">{shareText}</p>
        </div>

        {/* 按钮组 */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleGeneratePoster}
            disabled={isGenerating}
            className="w-full bg-slate-900 text-white hover:bg-slate-800 py-6 rounded-xl text-lg font-bold shadow-lg shadow-slate-200"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing Report...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                保存诊断书 (推荐)
              </>
            )}
          </Button>

          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full py-6 rounded-xl text-lg border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <Share2 className="w-5 h-5 mr-2" />
            转发给病友
          </Button>

          <Button
            variant="ghost"
            onClick={handleCopy}
            className="w-full py-4 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-green-500" />
                已复制
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                仅复制医嘱
              </>
            )}
          </Button>
        </div>
      </div>
    </ReportCard>
  );
};

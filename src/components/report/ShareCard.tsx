import { TagResult } from '@/lib/resultCalculator';
import { ReportCard } from './ReportCard';
import { Share2, Copy, Check, Download, Loader2, Hospital, Stethoscope, Swords } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { PosterGenerator } from './PosterGenerator';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

interface ShareCardProps {
  result: TagResult;
  sessionId: string;
}

export const ShareCard = ({ result, sessionId }: ShareCardProps) => {
  const [copied, setCopied] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateTrigger, setGenerateTrigger] = useState(false);

  // 生成挑战链接 - 优先使用自定义域名，回退到当前域名
  // shabi.fun 需要配置为 302 重定向并保留 query string
  const getShareBaseUrl = () => {
    // 检测当前是否在 shabi.fun 域名下，如果是则使用它
    if (window.location.hostname === 'shabi.fun') {
      return 'https://shabi.fun';
    }

    // 开发/预览环境使用当前域名
    return window.location.origin;
  };

  const baseUrl = getShareBaseUrl();
  const battleLink = `${baseUrl}?inviter=${encodeURIComponent(result.mainTag)}&camp=${encodeURIComponent(result.mainTag)}&score=${sessionId.slice(0, 4)}`;

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
    trackEvent(AnalyticsEvents.SHARE_CLICK, { type: 'native_share', result: result.mainTag });
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
    trackEvent(AnalyticsEvents.SHARE_CLICK, { type: 'poster', result: result.mainTag });
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

      <div className="space-y-3 pt-4">
        {/* 医院/机构抬头 */}
        <div className="flex flex-col items-center border-b border-slate-100 pb-4">
          <div className="bg-red-500 text-white rounded-full p-2 mb-2">
            <Hospital className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black text-slate-800 tracking-tight">DISCHARGE SUMMARY</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Patient Copy • Non-Official Document</p>
        </div>

        {/* 核心展示区 - 横向布局 */}
        <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 text-left">
          <div className="w-14 h-14 shrink-0 bg-white rounded-full flex items-center justify-center border-2 border-slate-200 shadow-sm overflow-hidden">
            {result.image ? (
              <img
                src={result.image}
                alt={result.mainTag}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-3xl">{result.emoji}</div>
            )}
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Diagnosis Confirmed</p>
            <h3 className="text-lg font-black text-slate-900 leading-tight">{result.mainTag}</h3>
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
        <div className="bg-slate-50 rounded-xl p-3 text-left border border-slate-200 relative">
          <Stethoscope className="absolute -top-3 -left-2 w-6 h-6 text-slate-400 transform -rotate-12 bg-white rounded-full p-1 border border-slate-200" />
          <p className="text-xs text-slate-600 font-medium whitespace-pre-line leading-relaxed selection:bg-red-100 break-all">{shareText}</p>
        </div>

        {/* 按钮组 */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleGeneratePoster}
            disabled={isGenerating}
            className="w-full bg-slate-900 text-white hover:bg-slate-800 py-3 rounded-xl text-base font-bold shadow-lg shadow-slate-200"
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

          {/* 新增：发起挑战按钮 */}
          <Button
            onClick={() => {
              trackEvent(AnalyticsEvents.BATTLE_INITIATED, { result: result.mainTag });
              const url = battleLink;
              navigator.clipboard.writeText(url);
              toast.success('挑战书链接已复制！发给Ta看看谁是真牛马');
            }}
            className="w-full py-3 rounded-xl text-base font-black bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg shadow-red-500/20 animate-pulse-slow"
          >
            <Swords className="w-5 h-4 mr-2" />
            发起宿命对决 (VS)
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full py-2 h-auto rounded-xl text-sm border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <Share2 className="w-4 h-4 mr-2" />
              转发给病友
            </Button>

            <Button
              variant="outline"
              onClick={handleCopy}
              className="w-full py-2 h-auto rounded-xl text-sm border-2 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
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
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col items-center">
        <p className="text-xs text-slate-400 mb-3 font-bold uppercase tracking-widest">Scan to Diagnose</p>
        <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-inner">
          <QRCodeCanvas
            value={battleLink || window.location.href}
            size={100}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"M"}
            includeMargin={true}
            imageSettings={{
              src: "/images/qr_center.png",
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        </div>
        <p className="text-[10px] text-slate-300 mt-2">2026 马生模拟器</p>
      </div>
    </ReportCard>
  );
};

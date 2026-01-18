import { TagResult } from '@/lib/resultCalculator';
import { ReportCard } from './ReportCard';
import { Share2, Copy, Check, Download, Loader2 } from 'lucide-react';
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
    `🔥 2025年度人设测试\n\n我测出来是【${result.mainTag}】，稀有度${result.rarity}！\n据说这个结果只有${result.populationPercentage}%的人能测出来。\n\n敢不敢来battle一下？👉 ${battleLink}`,
    `⚠️ 警告：这测试有点毒\n\n我的结果：${result.mainTag} (${result.rarity})\n系统说：${result.roast}\n\n测测它怎么骂你 👉 ${battleLink}`,
    `🆘 破防了家人们\n\n我是【${result.mainTag}】，你的呢？\n不服来战 👉 ${battleLink}`,
    `⚔️ 发起挑战\n\n我的人设战斗力：${result.rarity === 'SSR' ? '9999' : result.rarity === 'SR' ? '6666' : '2333'}\n来看看我们是队友还是对手 👉 ${battleLink}`,
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
    <ReportCard className="text-center relative bg-slate-900/80 backdrop-blur-xl border-white/20">
      {/* Hidden Generator */}
      <PosterGenerator
        result={result}
        onGenerate={onPosterGenerated}
        trigger={generateTrigger}
        link={battleLink}
      />

      <div className="space-y-6">
        {/* 挑衅式标题 */}
        <div className="space-y-2">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${result.color} rounded-full blur-xl opacity-20`} />
            {/* 如果有图片则显示图片，否则显示Emoji */}
            {result.image ? (
              <img src={result.image} alt="persona" className="w-full h-full object-contain relative z-10 animate-bounce-slow" />
            ) : (
              <div className="text-6xl animate-bounce-slow flex items-center justify-center h-full">{result.emoji}</div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white">敢发朋友圈吗？</h2>
          <p className="text-white/60">让朋友也来测测他们的"真面目"</p>
        </div>

        {/* 文案选择器 */}
        <div className="flex flex-wrap justify-center gap-2">
          {['挑衅版', '悬念版', '自黑版', '对战版'].map((label, idx) => (
            <button
              key={idx}
              onClick={() => setTextIndex(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${idx === textIndex
                ? 'bg-primary text-white shadow-lg scale-105'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 分享预览 */}
        <div className="bg-white/5 rounded-2xl p-4 text-left border border-white/10 hover:bg-white/10 transition-colors">
          <p className="text-sm text-white/90 whitespace-pre-line break-all selection:bg-primary/30">{shareText}</p>
        </div>

        {/* 挑衅提示 */}
        <div className="text-center">
          <p className="text-white/50 text-xs">
            👆 点击上方圆点切换文案风格
          </p>
        </div>

        {/* 分享按钮组 */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleGeneratePoster}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 rounded-xl text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-purple-500/20"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                正在生成海报...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                保存毒舌海报 (推荐)
              </>
            )}
          </Button>

          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full py-6 rounded-xl text-lg border-white/40 text-white bg-white/5 hover:bg-white/15 hover:text-white"
          >
            <Share2 className="w-5 h-5 mr-2" />
            挑战朋友来测
          </Button>

          <Button
            variant="ghost"
            onClick={handleCopy}
            className="w-full py-4 text-white/60 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-green-500" />
                已复制
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                仅复制文案
              </>
            )}
          </Button>
        </div>

        {/* 社交证明 */}
        <div className="bg-red-500/10 rounded-xl p-3 border border-red-500/20">
          <p className="text-red-400 text-sm">
            🔥 已有 <span className="font-bold">12,847</span> 人分享，引发 <span className="font-bold">328</span> 场争论
          </p>
        </div>

        {/* 底部装饰 */}
        <div className="flex justify-center gap-2 text-2xl">
          <span className="animate-wiggle">🎯</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.2s' }}>⚡</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.4s' }}>🔥</span>
        </div>

        <p className="text-xs text-white/40">
          2025年度报告 · 测准了记得回来骂我
        </p>
      </div>
    </ReportCard>
  );
};

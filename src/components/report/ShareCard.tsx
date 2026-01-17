import { TagResult } from '@/lib/resultCalculator';
import { ReportCard } from './ReportCard';
import { Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareCardProps {
  result: TagResult;
  sessionId: string;
}

// 挑衅式分享文案
const getShareTexts = (result: TagResult) => [
  `我测出来是【${result.mainTag}】${result.emoji}，系统说这很准，我不信。你呢？`,
  `⚠️ 高能预警：测完才知道2025年的自己有多"毒"\n\n我是【${result.mainTag}】，87%的人不敢发。你敢测吗？`,
  `别笑，你的人设可能比我还毒 👀\n\n我测出来是【${result.mainTag}】${result.emoji}，${result.description.slice(0, 30)}...`,
  `🔥 2025年度人设测试\n\n我：【${result.mainTag}】\n特征：${result.subTags.join('、')}\n\n不服？你来测测`,
];

export const ShareCard = ({ result, sessionId }: ShareCardProps) => {
  const [copied, setCopied] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  const shareTexts = getShareTexts(result);
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

  return (
    <ReportCard className="text-center">
      <div className="space-y-6">
        {/* 挑衅式标题 */}
        <div className="space-y-2">
          <div className="text-5xl animate-bounce-slow">😏</div>
          <h2 className="text-2xl font-bold text-white">敢发朋友圈吗？</h2>
          <p className="text-white/60">让朋友也来测测他们的"真面目"</p>
        </div>

        {/* 文案选择器 */}
        <div className="flex justify-center gap-2">
          {shareTexts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setTextIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === textIndex ? 'bg-primary w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* 分享预览 */}
        <div className="bg-white/10 rounded-2xl p-4 text-left border border-white/10">
          <p className="text-sm text-white/90 whitespace-pre-line">{shareText}</p>
        </div>

        {/* 挑衅提示 */}
        <div className="text-center">
          <p className="text-white/50 text-xs">
            👆 点击上方圆点切换文案风格
          </p>
        </div>

        {/* 分享按钮 */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-primary to-coral text-white py-6 rounded-xl text-lg font-bold hover:scale-105 transition-transform"
          >
            <Share2 className="w-5 h-5 mr-2" />
            挑战朋友来测
          </Button>
          
          <Button
            variant="outline"
            onClick={handleCopy}
            className="w-full py-6 rounded-xl text-lg border-white/20 text-white hover:bg-white/10"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 mr-2 text-green-500" />
                已复制，快去发！
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 mr-2" />
                复制挑衅文案
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

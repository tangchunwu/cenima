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

export const ShareCard = ({ result, sessionId }: ShareCardProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = `🎊 我的2025年度人设是【${result.mainTag}】${result.emoji}\n\n${result.description}\n\n你也来测测？👇`;

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
        {/* 标题 */}
        <div className="space-y-2">
          <div className="text-5xl animate-bounce-slow">🎉</div>
          <h2 className="text-2xl font-bold text-foreground">分享你的人设</h2>
          <p className="text-muted-foreground">让朋友也来测测</p>
        </div>

        {/* 分享预览 */}
        <div className="bg-secondary/30 rounded-2xl p-4 text-left">
          <p className="text-sm text-foreground whitespace-pre-line">{shareText}</p>
        </div>

        {/* 分享按钮 */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-primary to-coral text-white py-6 rounded-xl text-lg"
          >
            <Share2 className="w-5 h-5 mr-2" />
            分享给朋友
          </Button>
          
          <Button
            variant="outline"
            onClick={handleCopy}
            className="w-full py-6 rounded-xl text-lg"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 mr-2 text-green-500" />
                已复制
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 mr-2" />
                复制文案
              </>
            )}
          </Button>
        </div>

        {/* 底部装饰 */}
        <div className="flex justify-center gap-2 text-2xl">
          <span className="animate-wiggle">🌸</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.2s' }}>✨</span>
          <span className="animate-wiggle" style={{ animationDelay: '0.4s' }}>🎀</span>
        </div>

        <p className="text-xs text-muted-foreground/60">
          2025年度报告 · 感谢参与
        </p>
      </div>
    </ReportCard>
  );
};

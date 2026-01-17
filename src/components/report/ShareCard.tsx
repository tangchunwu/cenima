import { ReportCard } from "./ReportCard";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareCardProps {
  sessionId: string;
  mainTag: string;
}

export function ShareCard({ sessionId, mainTag }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}?view=${sessionId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("链接已复制！");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("复制失败，请手动复制");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '我的2025年度报告',
          text: `我是「${mainTag}」，来看看你是什么类型？`,
          url: shareUrl,
        });
      } catch (err) {
        // 用户取消分享
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <ReportCard variant="primary" className="relative overflow-hidden">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 text-6xl">🎊</div>
        
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          恭喜完成测试！
        </h2>
        
        <p className="mb-6 text-muted-foreground">
          分享给朋友，看看他们是什么类型
        </p>
        
        <div className="w-full space-y-3">
          <Button
            onClick={handleShare}
            className="w-full rounded-2xl py-6 text-lg font-bold shadow-cartoon"
          >
            <Share2 className="mr-2 h-5 w-5" />
            分享给朋友
          </Button>
          
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full rounded-2xl py-6 text-lg font-medium"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-5 w-5 text-green-500" />
                已复制
              </>
            ) : (
              <>
                <Copy className="mr-2 h-5 w-5" />
                复制链接
              </>
            )}
          </Button>
        </div>
        
        <p className="mt-6 text-xs text-muted-foreground">
          邀请朋友做测试，查看他们的报告 💕
        </p>
      </div>
    </ReportCard>
  );
}

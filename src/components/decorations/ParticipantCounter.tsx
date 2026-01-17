import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface ParticipantCounterProps {
  className?: string;
}

export function ParticipantCounter({ className }: ParticipantCounterProps) {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 获取初始计数
    const fetchCount = async () => {
      const { data, error } = await supabase
        .from('participant_stats')
        .select('total_count')
        .limit(1)
        .maybeSingle();
      
      if (data && !error) {
        setCount(data.total_count);
      }
      setIsLoading(false);
    };

    fetchCount();

    // 订阅实时更新
    const channel = supabase
      .channel('participant_stats_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'participant_stats',
        },
        (payload) => {
          if (payload.new && 'total_count' in payload.new) {
            setCount(payload.new.total_count as number);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formattedCount = count.toLocaleString('zh-CN');

  return (
    <div className={cn(
      "inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur-sm px-4 py-2 shadow-cartoon-sm",
      className
    )}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
      </span>
      {isLoading ? (
        <span className="text-sm text-muted-foreground">加载中...</span>
      ) : (
        <span className="text-sm font-medium">
          已有 <span className="font-bold text-primary">{formattedCount}</span> 人参与
        </span>
      )}
    </div>
  );
}

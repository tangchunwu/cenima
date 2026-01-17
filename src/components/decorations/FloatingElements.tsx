import { cn } from "@/lib/utils";

interface FloatingElementsProps {
  variant?: 'stars' | 'clouds' | 'mixed';
  className?: string;
}

export function FloatingElements({ variant = 'mixed', className }: FloatingElementsProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* 星星 */}
      {(variant === 'stars' || variant === 'mixed') && (
        <>
          <span className="absolute left-[10%] top-[15%] text-2xl animate-float opacity-60">⭐</span>
          <span className="absolute right-[15%] top-[20%] text-xl animate-float-delayed opacity-50">✨</span>
          <span className="absolute left-[20%] bottom-[25%] text-lg animate-sparkle opacity-40">🌟</span>
          <span className="absolute right-[10%] bottom-[15%] text-2xl animate-float opacity-50">⭐</span>
          <span className="absolute left-[50%] top-[10%] text-sm animate-sparkle opacity-30">✨</span>
        </>
      )}
      
      {/* 云朵 */}
      {(variant === 'clouds' || variant === 'mixed') && (
        <>
          <span className="absolute left-[5%] top-[30%] text-4xl animate-float opacity-30">☁️</span>
          <span className="absolute right-[5%] top-[40%] text-3xl animate-float-delayed opacity-25">☁️</span>
          <span className="absolute left-[70%] bottom-[30%] text-5xl animate-float opacity-20">☁️</span>
        </>
      )}
      
      {/* 装饰性圆点 */}
      <div className="absolute left-[15%] top-[60%] h-3 w-3 rounded-full bg-primary/20 animate-bounce-slow" />
      <div className="absolute right-[20%] top-[70%] h-2 w-2 rounded-full bg-accent/30 animate-bounce-slow" />
      <div className="absolute left-[80%] top-[25%] h-4 w-4 rounded-full bg-sunshine/40 animate-pulse-soft" />
    </div>
  );
}

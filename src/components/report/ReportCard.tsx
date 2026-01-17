import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ReportCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'accent' | 'gradient';
}

export function ReportCard({ children, className, variant = 'default' }: ReportCardProps) {
  const variantStyles = {
    default: "bg-card border-2 border-border",
    primary: "bg-primary/5 border-2 border-primary/30",
    accent: "bg-accent/10 border-2 border-accent/30", 
    gradient: "bg-gradient-to-br from-primary/10 via-card to-accent/10 border-2 border-primary/20",
  };

  return (
    <div className={cn(
      "rounded-3xl p-6 shadow-cartoon",
      "flex flex-col items-center justify-center",
      "min-h-[400px] w-full max-w-sm",
      variantStyles[variant],
      className
    )}>
      {children}
    </div>
  );
}

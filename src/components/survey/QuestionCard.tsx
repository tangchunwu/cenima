import { useState } from "react";
import { Question } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }: QuestionCardProps) {
  const [textAnswer, setTextAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { toast } = useToast();

  const handleChoiceClick = (optionId: string) => {
    // 立即设置选中状态，提供视觉反馈
    setSelectedOption(optionId);

    // 趣味反馈逻辑
    if (question.id === 'social_1' && optionId === 'c') {
      toast({
        title: "🛏️ 宅家党+1",
        description: "看来你是真的不想动啊...",
        className: "bg-primary/20 border-primary/50 text-white",
      });
    }
    if (question.id === 'stress_1' && optionId === 'c') {
      toast({
        title: "⚠️ 肝帝出没",
        description: "头发还好吗？",
        className: "bg-red-500/20 border-red-500/50 text-white",
      });
    }
    if (question.id === 'social_2' && optionId === 'c') {
      toast({
        title: "💀 社恐认证",
        description: "这很不像话，但很真实",
        className: "bg-purple-500/20 border-purple-500/50 text-white",
      });
    }

    // 短暂延迟后进入下一题，让用户看到选中效果
    setTimeout(() => {
      onAnswer(optionId);
      setSelectedOption(null);
    }, 300);
  };

  const handleTextSubmit = () => {
    if (textAnswer.trim()) {
      onAnswer(textAnswer.trim());
    }
  };

  return (
    <div className="flex flex-col items-center animate-scale-up w-full max-w-md mx-auto">
      {/* 问题编号 */}
      <p className="text-sm text-muted-foreground mb-2">
        {questionNumber} / {totalQuestions}
      </p>

      {/* 问题Emoji */}
      <div className="mb-4 text-6xl animate-bounce-slow">
        {question.emoji}
      </div>

      {/* 问题文本 */}
      <h2 className="mb-2 text-center text-2xl font-bold text-white">
        {question.text}
      </h2>

      {question.subtext && (
        <p className="mb-6 text-center text-white/70">
          {question.subtext}
        </p>
      )}

      {/* 选择题选项 */}
      {question.type === 'choice' && question.options && (
        <div className="mt-4 flex w-full flex-col gap-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleChoiceClick(option.id)}
              disabled={selectedOption !== null}
              className={cn(
                "group flex items-center gap-4 rounded-2xl border-2 bg-card p-4 text-left transition-all duration-200",
                selectedOption === option.id
                  ? "border-primary bg-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.5)] scale-105"
                  : "border-border hover:border-primary hover:shadow-cartoon-sm hover:scale-[1.02] active:scale-[0.98]",
                selectedOption !== null && selectedOption !== option.id && "opacity-50"
              )}
            >
              <span className="text-3xl group-hover:animate-wiggle">
                {option.emoji}
              </span>
              <span className="flex-1 font-medium">{option.text}</span>
              <ChevronRight className={cn(
                "h-5 w-5 text-muted-foreground transition-transform",
                "group-hover:translate-x-1 group-hover:text-primary"
              )} />
            </button>
          ))}
        </div>
      )}

      {/* 开放题 */}
      {question.type === 'open' && (
        <div className="mt-4 w-full">
          <Textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder={question.placeholder}
            className="min-h-[120px] rounded-2xl border-2 text-base resize-none focus:border-primary"
          />
          <Button
            onClick={handleTextSubmit}
            disabled={!textAnswer.trim()}
            className="mt-4 w-full rounded-2xl py-6 text-lg font-bold shadow-cartoon"
          >
            继续 <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}

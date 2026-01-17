import { useState } from "react";
import { Question } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: number, answer: string | string[]) => void;
  currentAnswer?: string | string[];
}

export function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array.isArray(currentAnswer) ? currentAnswer : []
  );
  const [textAnswer, setTextAnswer] = useState(
    typeof currentAnswer === 'string' ? currentAnswer : ''
  );
  const [customGoal, setCustomGoal] = useState('');

  const handleChoiceClick = (optionId: string) => {
    onAnswer(question.id, optionId);
  };

  const handleMultiSelect = (optionId: string) => {
    const newSelected = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];
    setSelectedOptions(newSelected);
  };

  const handleMultiSubmit = () => {
    const finalAnswer = customGoal 
      ? [...selectedOptions, `custom:${customGoal}`]
      : selectedOptions;
    if (finalAnswer.length > 0) {
      onAnswer(question.id, finalAnswer);
    }
  };

  const handleTextSubmit = () => {
    if (textAnswer.trim()) {
      onAnswer(question.id, textAnswer.trim());
    }
  };

  return (
    <div className="flex flex-col items-center animate-scale-up">
      {/* 问题Emoji */}
      <div className="mb-4 text-6xl animate-bounce-slow">
        {question.emoji}
      </div>

      {/* 问题文本 */}
      <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
        {question.text}
      </h2>
      
      {question.subtext && (
        <p className="mb-6 text-center text-muted-foreground">
          {question.subtext}
        </p>
      )}

      {/* 选择题选项 */}
      {question.type === 'choice' && question.options && (
        <div className="mt-4 flex w-full max-w-md flex-col gap-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleChoiceClick(option.id)}
              className={cn(
                "group flex items-center gap-4 rounded-2xl border-2 bg-card p-4 text-left transition-all duration-200",
                "hover:border-primary hover:shadow-cartoon-sm hover:scale-[1.02]",
                "active:scale-[0.98]",
                currentAnswer === option.id
                  ? "border-primary bg-primary/5 shadow-cartoon-sm"
                  : "border-border"
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
        <div className="mt-4 w-full max-w-md">
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

      {/* 多选题 */}
      {question.type === 'multi' && question.options && (
        <div className="mt-4 w-full max-w-md">
          <div className="flex flex-wrap gap-2 mb-4">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleMultiSelect(option.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  "border-2",
                  selectedOptions.includes(option.id)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <span>{option.emoji}</span>
                <span>{option.text}</span>
              </button>
            ))}
          </div>
          
          <Textarea
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
            placeholder={question.placeholder}
            className="min-h-[80px] rounded-2xl border-2 text-base resize-none focus:border-primary mb-4"
          />
          
          <Button
            onClick={handleMultiSubmit}
            disabled={selectedOptions.length === 0 && !customGoal.trim()}
            className="w-full rounded-2xl py-6 text-lg font-bold shadow-cartoon"
          >
            完成 🎉
          </Button>
        </div>
      )}
    </div>
  );
}

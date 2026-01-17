import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FloatingElements } from "@/components/decorations/FloatingElements";
import { ParticipantCounter } from "@/components/decorations/ParticipantCounter";
import { ProgressBar } from "@/components/survey/ProgressBar";
import { QuestionCard } from "@/components/survey/QuestionCard";
import { CoverCard } from "@/components/report/CoverCard";
import { TagCard } from "@/components/report/TagCard";
import { RegretCard } from "@/components/report/RegretCard";
import { GoalsCard } from "@/components/report/GoalsCard";
import { WishCard } from "@/components/report/WishCard";
import { ShareCard } from "@/components/report/ShareCard";
import { useSurvey } from "@/hooks/useSurvey";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AppState = 'home' | 'survey' | 'loading' | 'result';

export default function Index() {
  const [appState, setAppState] = useState<AppState>('home');
  const [reportCardIndex, setReportCardIndex] = useState(0);

  const survey = useSurvey();

  // 处理加载状态
  if (survey.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-sunshine">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // 如果已完成，直接显示结果
  if (survey.isComplete && appState !== 'result') {
    setAppState('result');
  }

  // 首页
  if (appState === 'home') {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-sunshine">
        <FloatingElements variant="mixed" />
        
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
          {/* Logo/装饰 */}
          <div className="mb-8 text-8xl animate-bounce-slow">📊</div>
          
          {/* 标题 */}
          <h1 className="mb-3 text-center text-4xl font-black text-foreground">
            我的2025
          </h1>
          <h2 className="mb-2 text-center text-3xl font-bold text-primary">
            年度报告
          </h2>
          
          {/* 副标题 */}
          <p className="mb-8 text-center text-lg text-muted-foreground">
            25道题，5分钟，发现你的年度人设
          </p>
          
          {/* 参与人数 */}
          <ParticipantCounter className="mb-8" />
          
          {/* 开始按钮 */}
          <Button
            onClick={() => setAppState('survey')}
            className="h-16 rounded-3xl px-12 text-xl font-bold shadow-cartoon hover:scale-105 transition-transform"
          >
            开始测试 ✨
          </Button>
          
          {/* 底部说明 */}
          <p className="mt-8 text-sm text-muted-foreground">
            🔒 你的回答仅用于生成报告
          </p>
        </div>
      </div>
    );
  }

  // 问卷页
  if (appState === 'survey') {
    return (
      <div className="relative min-h-screen bg-gradient-sunshine">
        {/* 顶部栏 */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md px-4 py-3 border-b border-border">
          <div className="mx-auto max-w-md">
            <div className="flex items-center gap-3 mb-3">
              {survey.progress > 0 && (
                <button
                  onClick={survey.goBack}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              <ProgressBar
                current={survey.progress + 1}
                total={survey.totalQuestions}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* 问题区域 */}
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">
            <QuestionCard
              key={survey.currentQuestion.id}
              question={survey.currentQuestion}
              onAnswer={(qId, answer) => {
                survey.answerQuestion(qId, answer);
                // 如果是最后一题，切换到加载状态
                if (survey.progress >= survey.totalQuestions - 1) {
                  setAppState('loading');
                  setTimeout(() => setAppState('result'), 2000);
                }
              }}
              currentAnswer={survey.answers[survey.currentQuestion.id]}
            />
          </div>
        </div>
      </div>
    );
  }

  // 加载页
  if (appState === 'loading') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-sunshine px-6">
        <FloatingElements variant="stars" />
        
        <div className="text-8xl mb-8 animate-bounce-slow">🔮</div>
        
        <h2 className="mb-4 text-2xl font-bold text-foreground text-center">
          正在生成你的年度报告...
        </h2>
        
        <p className="text-muted-foreground text-center animate-pulse">
          分析你的回答中 ✨
        </p>
        
        <div className="mt-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // 结果页
  if (appState === 'result' && survey.result) {
    const customGoal = survey.openAnswers.goals.find(g => g.startsWith('custom:'))?.replace('custom:', '');
    
    const reportCards = [
      <CoverCard key="cover" />,
      <TagCard
        key="tag"
        mainTag={survey.result.mainTag}
        subTags={survey.result.subTags}
        description={survey.result.description}
        emoji={survey.result.emoji}
      />,
      survey.openAnswers.regret && (
        <RegretCard key="regret" regret={survey.openAnswers.regret} />
      ),
      survey.openAnswers.expectation && (
        <WishCard key="wish" expectation={survey.openAnswers.expectation} />
      ),
      survey.openAnswers.goals.length > 0 && (
        <GoalsCard
          key="goals"
          goals={survey.openAnswers.goals}
          customGoal={customGoal}
        />
      ),
      <ShareCard
        key="share"
        sessionId={survey.sessionId}
        mainTag={survey.result.mainTag}
      />,
    ].filter(Boolean);

    return (
      <div className="relative min-h-screen bg-gradient-sunshine">
        <FloatingElements variant="mixed" className="opacity-50" />
        
        {/* 卡片导航 */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md px-4 py-3 border-b border-border">
          <div className="mx-auto max-w-md flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {reportCardIndex + 1} / {reportCards.length}
            </span>
            <div className="flex gap-1">
              {reportCards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setReportCardIndex(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    idx === reportCardIndex
                      ? "w-6 bg-primary"
                      : "w-2 bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 卡片展示 */}
        <div className="flex min-h-[calc(100vh-60px)] items-center justify-center px-6 py-8">
          <div className="relative w-full max-w-sm">
            {/* 左右切换按钮 */}
            {reportCardIndex > 0 && (
              <button
                onClick={() => setReportCardIndex(prev => prev - 1)}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card shadow-lg hover:bg-muted transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            
            {reportCardIndex < reportCards.length - 1 && (
              <button
                onClick={() => setReportCardIndex(prev => prev + 1)}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card shadow-lg hover:bg-muted transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}

            {/* 当前卡片 */}
            <div className="animate-scale-up">
              {reportCards[reportCardIndex]}
            </div>
          </div>
        </div>

        {/* 重新开始按钮 */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
          <button
            onClick={() => {
              survey.restart();
              setAppState('home');
              setReportCardIndex(0);
            }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            重新测试
          </button>
        </div>
      </div>
    );
  }

  return null;
}

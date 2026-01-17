import { useState, useEffect } from "react";
import { useSurvey } from "@/hooks/useSurvey";
import { FloatingElements } from "@/components/decorations/FloatingElements";
import { ParticipantCounter } from "@/components/decorations/ParticipantCounter";
import { ProgressBar } from "@/components/survey/ProgressBar";
import { QuestionCard } from "@/components/survey/QuestionCard";
import { CoverCard } from "@/components/report/CoverCard";
import { TagCard } from "@/components/report/TagCard";
import { RegretCard } from "@/components/report/RegretCard";
import { WishCard } from "@/components/report/WishCard";
import { ShareCard } from "@/components/report/ShareCard";
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type AppState = "home" | "survey" | "loading" | "result";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("home");
  const [reportCardIndex, setReportCardIndex] = useState(0);
  const survey = useSurvey();

  // 如果已完成，直接显示结果 - 必须在所有条件判断之前
  useEffect(() => {
    if (survey.result && !survey.isLoading) {
      setAppState("result");
    }
  }, [survey.result, survey.isLoading]);

  // 初始加载状态
  if (survey.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-cream to-sky/30 flex items-center justify-center">
        <div className="animate-spin text-4xl">🌟</div>
      </div>
    );
  }

  // 首页
  if (appState === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-cream to-sky/30 relative overflow-hidden">
        <FloatingElements />
        
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen relative z-10">
          {/* 顶部装饰 */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2 animate-bounce-slow">
            <span className="text-3xl">✨</span>
            <span className="text-2xl">🎊</span>
            <span className="text-3xl">✨</span>
          </div>
          
          {/* 主要内容区域 */}
          <div className="text-center space-y-6 animate-fade-in">
            {/* 年份标签 */}
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border-2 border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">2025年度报告</span>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            
            {/* 主标题 */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                <span className="block animate-pop">你的2025</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-coral to-mint animate-pop" style={{ animationDelay: '0.1s' }}>
                  是什么人设？
                </span>
              </h1>
            </div>
            
            {/* 副标题 */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              12道题，2分钟
              <br />
              <span className="text-primary font-medium">发现你的年度关键词 ✨</span>
            </p>
            
            {/* 参与人数 */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <ParticipantCounter />
            </div>
            
            {/* 开始按钮 */}
            <div className="pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button
                onClick={() => setAppState("survey")}
                size="lg"
                className="group relative bg-gradient-to-r from-primary to-coral hover:from-primary/90 hover:to-coral/90 text-white px-10 py-7 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-pulse-glow"
              >
                <span className="flex items-center gap-2">
                  测测我是谁
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
            
            {/* 底部装饰文案 */}
            <p className="text-sm text-muted-foreground/70 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              🎯 已有 <span className="font-semibold text-primary">超多人</span> 发现了自己的人设
            </p>
          </div>
          
          {/* 底部装饰 */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 opacity-60">
            <span className="text-2xl animate-float">🌸</span>
            <span className="text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🌟</span>
            <span className="text-2xl animate-float" style={{ animationDelay: '1s' }}>🎀</span>
          </div>
        </div>
      </div>
    );
  }

  // 问卷页面
  if (appState === "survey") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-cream to-sky/30 relative overflow-hidden">
        <FloatingElements />
        
        <div className="container mx-auto px-4 py-6 flex flex-col min-h-screen relative z-10">
          {/* 进度条和返回 */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => {
                if (survey.currentQuestionIndex > 0) {
                  survey.goBack();
                } else {
                  setAppState("home");
                }
              }}
              className="p-2 rounded-full bg-white/80 shadow-sm hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex-1">
              <ProgressBar current={survey.progress} total={survey.totalQuestions} />
            </div>
          </div>

          {/* 问题卡片 */}
          <div className="flex-1 flex items-center justify-center">
            {survey.currentQuestion && (
              <QuestionCard
                question={survey.currentQuestion}
                onAnswer={(answer) => {
                  survey.answerQuestion(answer);
                  // 如果是最后一题，进入加载状态
                  if (survey.currentQuestionIndex === survey.totalQuestions - 1) {
                    setAppState("loading");
                  }
                }}
                questionNumber={survey.currentQuestionIndex + 1}
                totalQuestions={survey.totalQuestions}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // 加载页面
  if (appState === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-cream to-sky/30 flex items-center justify-center relative overflow-hidden">
        <FloatingElements />
        
        <div className="text-center space-y-6 animate-fade-in z-10">
          <div className="text-6xl animate-bounce-slow">🔮</div>
          <h2 className="text-2xl font-bold text-foreground">正在生成你的年度报告...</h2>
          <p className="text-muted-foreground">AI正在分析你的答案 ✨</p>
          <div className="flex justify-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
            <span className="w-2 h-2 bg-mint rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          </div>
        </div>
      </div>
    );
  }

  // 结果页面
  if (appState === "result" && survey.result) {
    const reportCards = [
      <CoverCard key="cover" result={survey.result} />,
      <TagCard key="tag" result={survey.result} />,
    ];

    // 添加开放题卡片
    const regretAnswer = survey.openAnswers?.['open_regret'];
    const wishAnswer = survey.openAnswers?.['open_wish'];

    if (regretAnswer) {
      reportCards.push(<RegretCard key="regret" content={regretAnswer} />);
    }
    if (wishAnswer) {
      reportCards.push(<WishCard key="wish" content={wishAnswer} />);
    }

    reportCards.push(<ShareCard key="share" result={survey.result} sessionId={survey.sessionId} />);

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-cream to-sky/30 relative overflow-hidden">
        <FloatingElements />
        
        <div className="container mx-auto px-4 py-6 flex flex-col min-h-screen relative z-10">
          {/* 卡片指示器 */}
          <div className="flex justify-center gap-2 mb-4">
            {reportCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setReportCardIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === reportCardIndex 
                    ? 'bg-primary w-6' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          {/* 卡片容器 */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* 左箭头 */}
            {reportCardIndex > 0 && (
              <button
                onClick={() => setReportCardIndex(prev => prev - 1)}
                className="absolute left-0 z-20 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-muted-foreground" />
              </button>
            )}

            {/* 当前卡片 */}
            <div className="w-full max-w-md animate-fade-in">
              {reportCards[reportCardIndex]}
            </div>

            {/* 右箭头 */}
            {reportCardIndex < reportCards.length - 1 && (
              <button
                onClick={() => setReportCardIndex(prev => prev + 1)}
                className="absolute right-0 z-20 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* 重测按钮 */}
          <div className="flex justify-center py-4">
            <Button
              variant="ghost"
              onClick={() => {
                survey.restart();
                setAppState("home");
                setReportCardIndex(0);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重新测试
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;

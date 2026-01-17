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
import { DataCard } from "@/components/report/DataCard";
import { ChevronLeft, ChevronRight, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { easterEggMessages } from "@/lib/questions";

type AppState = "home" | "survey" | "loading" | "result";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("home");
  const [reportCardIndex, setReportCardIndex] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const survey = useSurvey();

  // 如果已完成，直接显示结果 - 必须在所有条件判断之前
  useEffect(() => {
    if (survey.result && !survey.isLoading) {
      setAppState("result");
    }
  }, [survey.result, survey.isLoading]);

  // 加载页面的动态文案
  useEffect(() => {
    if (appState === 'loading') {
      const messages = [
        '正在偷偷分析你...',
        '你的答案很有意思',
        'AI正在疯狂计算中...',
        '生成专属人设中...',
        '你可能会想截图的...',
      ];
      let index = 0;
      const interval = setInterval(() => {
        setLoadingMessage(messages[index % messages.length]);
        index++;
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [appState]);

  // 初始加载状态
  if (survey.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin text-4xl">🔮</div>
      </div>
    );
  }

  // 首页 - 更大胆的设计
  if (appState === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <FloatingElements />
        
        {/* 霓虹光效背景 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-coral/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mint/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen relative z-10">
          {/* 顶部热度标签 */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30 animate-pulse">
            <span className="text-red-400 text-sm font-medium">🔥 最近1小时 328人 测完就开始吵架了</span>
          </div>
          
          {/* 主要内容区域 */}
          <div className="text-center space-y-8 animate-fade-in">
            {/* 主标题 - 打字机效果 */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                <span className="block animate-slide-up">2025年</span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-coral to-mint animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  你是什么"人"？
                </span>
              </h1>
              
              {/* 副标题 - 更有冲击力 */}
              <p className="text-xl md:text-2xl text-white/70 font-medium animate-fade-in" style={{ animationDelay: '0.4s' }}>
                12道题，测出你的<span className="text-primary font-bold">年度人设</span>
                <br />
                <span className="text-sm text-white/50">（可能会被骂，但很准）</span>
              </p>
            </div>
            
            {/* 参与人数 */}
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <ParticipantCounter />
            </div>
            
            {/* 开始按钮 - 更醒目 */}
            <div className="pt-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button
                onClick={() => setAppState("survey")}
                size="lg"
                className="group relative bg-gradient-to-r from-primary via-coral to-primary hover:from-primary/90 hover:via-coral/90 hover:to-primary/90 text-white px-12 py-8 text-2xl font-bold rounded-2xl shadow-2xl shadow-primary/30 transition-all duration-300 hover:scale-105 animate-glow"
              >
                <span className="flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  开始测试
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
            
            {/* 社交证明 - 更有说服力 */}
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <p className="text-white/60 text-sm">
                ⚡ 67%的人对结果表示"太准了不敢发"
              </p>
              <div className="flex items-center justify-center gap-4 text-white/40 text-xs">
                <span>🎯 准确率惊人</span>
                <span>•</span>
                <span>🤣 毒舌but真实</span>
                <span>•</span>
                <span>📱 适合截图发朋友圈</span>
              </div>
            </div>
          </div>
          
          {/* 底部装饰 */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 opacity-60">
            <span className="text-2xl animate-float">✨</span>
            <span className="text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🔮</span>
            <span className="text-2xl animate-float" style={{ animationDelay: '1s' }}>💫</span>
          </div>
        </div>
      </div>
    );
  }

  // 问卷页面
  if (appState === "survey") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
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

  // 加载页面 - 更有趣的文案
  if (appState === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <FloatingElements />
        
        {/* 动态光效 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/30 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="text-center space-y-6 animate-fade-in z-10">
          <div className="text-7xl animate-bounce-slow">🔮</div>
          <h2 className="text-2xl font-bold text-white">{loadingMessage || '正在生成你的人设...'}</h2>
          <p className="text-white/60">准备好接受灵魂拷问了吗 👀</p>
          <div className="flex justify-center gap-2">
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-3 h-3 bg-coral rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
            <span className="w-3 h-3 bg-mint rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
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
      <DataCard key="data" result={survey.result} />,
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <FloatingElements />
        
        <div className="container mx-auto px-4 py-6 flex flex-col min-h-screen relative z-10">
          {/* 卡片指示器 */}
          <div className="flex justify-center gap-2 mb-4">
            {reportCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setReportCardIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === reportCardIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-white/30 w-2 hover:bg-white/50'
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
                className="absolute left-0 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
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
                className="absolute right-0 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
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
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              不服？重测一次
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;

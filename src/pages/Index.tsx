import { useState, useEffect, lazy, Suspense } from "react";
import { useSurvey } from "@/hooks/useSurvey";
import { FloatingElements } from "@/components/decorations/FloatingElements";
import { ParticipantCounter } from "@/components/decorations/ParticipantCounter";
import { CoverCard } from "@/components/report/CoverCard";

import { RegretCard } from "@/components/report/RegretCard";
import { WishCard } from "@/components/report/WishCard";
import { ShareCard } from "@/components/report/ShareCard";
import { DataCard } from "@/components/report/DataCard";
import { PersonaCard } from "@/components/report/PersonaCard";
import { RegretWishCard } from "@/components/report/RegretWishCard";

import { calculateHealthIndices } from "@/lib/resultCalculator";
import { LiveUpdates } from "@/components/home/LiveUpdates";
import { CampSelection, Camp } from "@/components/home/CampSelection";
import { ChevronLeft, ChevronRight, RotateCcw, Zap, ArrowRight, Loader2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundEffect } from "@/components/decorations/BackgroundEffect";
import { TitleCarousel } from "@/components/home/TitleCarousel";
import { useCollection } from "@/hooks/useCollection";
import { toast } from "sonner";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { DynamicSEO } from "@/components/common/DynamicSEO";

// Game Mode Components
import { LifeEditor } from "@/components/game/LifeEditor";
import { MemoryCleaner } from "@/components/game/MemoryCleaner";
import { SystemBootLoader } from "@/components/game/SystemBootLoader";
import { GameAttributes } from "@/lib/gameResultMapper";
import { AiLoader } from "@/components/ui/ai-loader";

// Lazy Load Heavy Components
const Pokedex = lazy(() => import("@/components/home/Pokedex").then(module => ({ default: module.Pokedex })));
const Leaderboard = lazy(() => import("@/components/home/Leaderboard").then(module => ({ default: module.Leaderboard })));
const BattleCard = lazy(() => import("@/components/report/BattleCard").then(module => ({ default: module.BattleCard })));
const ResultReaction = lazy(() => import("@/components/report/ResultReaction").then(module => ({ default: module.ResultReaction })));
const KonamiCode = lazy(() => import("@/components/eggs/KonamiCode").then(module => ({ default: module.KonamiCode })));
const RageClick = lazy(() => import("@/components/eggs/RageClick").then(module => ({ default: module.RageClick })));
const ForbiddenButton = lazy(() => import("@/components/eggs/ForbiddenButton").then(module => ({ default: module.ForbiddenButton })));

type AppState = "home" | "camp" | "game" | "loading" | "result" | "reaction";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("home");
  const [reportCardIndex, setReportCardIndex] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [camp, setCamp] = useState<Camp>(null);
  const [retestCount, setRetestCount] = useState(0);
  const [showReaction, setShowReaction] = useState(true);

  // 挑战相关 State
  const [inviterInfo, setInviterInfo] = useState<{ name: string, camp: string } | null>(null);
  const [hasStarted, setHasStarted] = useState(false); // 控制是否点击开始

  // 游戏模式 State
  const [showCleaner, setShowCleaner] = useState(false);
  const [showBootLoader, setShowBootLoader] = useState(false);
  const [regretResolved, setRegretResolved] = useState(false);
  const [collectedRegret, setCollectedRegret] = useState("");
  const [collectedWish, setCollectedWish] = useState("");
  const [gameAttributes, setGameAttributes] = useState<GameAttributes | null>(null);
  const [gameChoices, setGameChoices] = useState<any[]>([]);

  const survey = useSurvey();
  const { unlock } = useCollection();
  const { language, toggleLanguage, t } = useLanguage();

  // 如果已完成，直接显示结果 - 必须在所有条件判断之前
  useEffect(() => {
    if (survey.result && !survey.isLoading) {
      // 解锁图鉴
      unlock(survey.result.mainTag);

      // Track completion
      trackEvent(AnalyticsEvents.SURVEY_COMPLETE, {
        result: survey.result.mainTag,
        camp: camp
      });

      // 首次完成显示反应页面，重测后也显示
      // 如果已经在 'result' 状态就不跳了，防止无限重置状态
      if (appState !== "result" && appState !== "reaction") {
        setAppState(showReaction ? "reaction" : "result");
      }

      // Delay toast slightly to not conflict with transition
      setTimeout(() => {
        toast.success("解锁新图鉴！快去首页看看吧", {
          icon: "🍌",
          duration: 3000
        });
      }, 1000);
    }
  }, [survey.result, survey.isLoading, showReaction, hasStarted]);

  // 检查URL参数 (Battle Mode)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inviter = params.get('inviter');
    const camp = params.get('camp');

    if (inviter && camp) {
      setInviterInfo({ name: inviter, camp });
      // 保持 hasStarted 为 false, 让用户看到挑战卡片
    }
  }, []);

  // 加载页面的动态文案
  useEffect(() => {
    if (appState === 'loading') {
      const messages = [
        '正在重构人格数据...',
        '检测到灵魂异常...',
        '正在清理2025缓存...',
        '加载2026新驱动...',
        '系统重启中...',
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
      <div className="min-h-screen flex items-center justify-center">
        <AiLoader className="scale-75" />
      </div>
    );
  }

  const handleStart = () => {
    setHasStarted(true);
    setAppState("camp");
  };

  const handleReset = () => {
    survey.restart();
    setHasStarted(false);
    setInviterInfo(null);
    setAppState("home");
    setReportCardIndex(0);
    // 重置游戏状态
    setShowCleaner(false);
    setShowBootLoader(false);
    setRegretResolved(false);
    setCollectedRegret("");
    setCollectedWish("");
    setGameAttributes(null);
    setGameChoices([]);

    // 清除URL参数但不刷新页面
    window.history.pushState({}, '', window.location.pathname);
  };

  // 游戏事件处理
  const handleTriggerRegret = () => {
    setShowCleaner(true);
  };

  const handleRegretCleaned = (regret: string) => {
    setCollectedRegret(regret);
    setShowCleaner(false);
    setRegretResolved(true);
    toast.success("TIME REVERSAL SUCCESSFUL (时间回溯成功)");
  };

  const handleTriggerWish = (attributes: GameAttributes, choices: any[]) => {
    setGameAttributes(attributes);
    setGameChoices(choices);
    setShowBootLoader(true);
  };

  // 专门用于接收游戏最终数据的方法，由 BootLoader 完成后触发
  const finalizeGame = async (wish: string) => {
    setCollectedWish(wish);
    setShowBootLoader(false);
    setAppState("loading");

    if (gameAttributes) {
      try {
        await survey.submitGameData(gameAttributes, collectedRegret, wish, gameChoices);
        // survey.submitGameData 会更新 survey.result，导致 useEffect 触发跳转
      } catch (error) {
        console.error("Game submission failed:", error);
        toast.error("数据上传失败，请重试");
        setAppState("game"); // 回退防止卡死
      }
    } else {
      console.error("Game attributes missing during finalize!");
      toast.error("游戏数据丢失");
      setAppState("home");
    }
  };


  // 首页 - 挑衅式设计
  if (appState === "home") {
    return (
      <div className="min-h-screen relative overflow-hidden text-white font-sans selection:bg-primary selection:text-white">
        <DynamicSEO />
        <FloatingElements />
        <BackgroundEffect />
        <Suspense fallback={null}>
          <Pokedex />
          <Leaderboard />
          <KonamiCode />
          <RageClick />
          <ForbiddenButton />
        </Suspense>

        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen relative z-10">

          {/* 如果有挑战信息，显示挑战卡片 */}
          {!hasStarted && inviterInfo ? (
            <div className="flex-1 flex flex-col justify-center space-y-12 animate-fade-in relative w-full max-w-md">
              <div className="bg-red-900/40 border-2 border-red-500/50 rounded-2xl p-6 text-center transform rotate-1 animate-pulse shadow-2xl">
                <div className="text-6xl mb-4">⚔️</div>
                <h2 className="text-3xl font-black text-white mb-2 leading-tight">
                  {inviterInfo.name} <br />向你发起了挑战！
                </h2>
                <p className="text-white/80 mb-6 text-lg">
                  Ta是 <span className="font-bold text-yellow-400 bg-black/20 px-2 py-1 rounded">{inviterInfo.camp}</span>
                </p>
                <p className="text-white/60 italic border-t border-white/10 pt-4">
                  "敢不敢测测看我们是宿敌还是天生一对？"
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full text-xl font-black h-16 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 background-animate shadow-xl shadow-red-500/20 hover:scale-105 transition-all duration-300"
                  onClick={handleStart}
                >
                  接受挑战
                  <ArrowRight className="ml-2 w-6 h-6 animate-bounce-x" />
                </Button>
                <p className="text-center text-xs text-white/40">已有 1,203 对好友因此绝交</p>
              </div>
            </div>
          ) : (
            /* 正常首页逻辑 */
            <>

              {/* 顶部热度标签 */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30 animate-pulse w-max max-w-[90%]">
                <span className="text-red-400 text-sm font-medium truncate">{t('home.warn_tag')}</span>
              </div>

              {/* 顶部功能区 - 右上角 */}
              <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
                <SoundToggle />
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all active:scale-95 text-white"
                >
                  <Globe className="w-4 h-4 text-white/80" />
                  <span className="text-xs font-bold text-white/90">{t('ui.switch_lang')}</span>
                </button>
              </div>

              {/* 主要内容区域 */}
              <div className="text-center space-y-8 animate-fade-in w-full max-w-md">
                {/* 主标题 - 轮播挑衅版 */}
                <TitleCarousel />

                {/* 实时动态 */}
                <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <LiveUpdates />
                </div>

                {/* 参与人数 */}
                <div className="animate-fade-in" style={{ animationDelay: '0.55s' }}>
                  <ParticipantCounter />
                </div>

                {/* 开始按钮 */}
                <div className="pt-4 animate-fade-in flex flex-col items-center gap-3" style={{ animationDelay: '0.6s' }}>
                  <Button
                    onClick={handleStart}
                    size="lg"
                    className="group relative bg-gradient-to-r from-primary via-coral to-primary hover:from-primary/90 hover:via-coral/90 hover:to-primary/90 text-white px-12 py-8 text-2xl font-bold rounded-2xl shadow-2xl shadow-primary/30 transition-all duration-300 hover:scale-105 animate-glow w-full"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <Zap className="w-6 h-6" />
                      {t('home.btn.start')}
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  <p className="text-xs text-red-400/80 font-bold bg-black/20 px-3 py-1 rounded-full border border-red-500/20 animate-pulse">
                    {t('home.warn.btn')}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // 阵营选择页面
  if (appState === "camp") {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <FloatingElements />

        {/* 返回按钮 */}
        <button
          onClick={() => setAppState("home")}
          className="absolute top-6 left-6 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen relative z-10">
          <CampSelection
            onSelect={(selectedCamp) => {
              setCamp(selectedCamp);
              setAppState("game"); // 修改跳转到 'game'
            }}
            onSkip={() => {
              setCamp(null);
              setAppState("game"); // 修改跳转到 'game'
            }}
          />
        </div>
      </div>
    );
  }

  // 游戏页面 (替代原 Survey)
  if (appState === "game") {
    return (
      <div className="min-h-screen relative overflow-hidden text-white font-sans flex items-center justify-center">
        {/* 故障背景动画 */}
        <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-[0.03] pointer-events-none mix-blend-screen" />

        {/* 游戏主界面 */}
        <div className="w-full max-w-lg relative z-10">
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl font-black tracking-tighter glitch-text" data-text="牛马人生编辑器">
              牛马人生编辑器
            </h1>
            <p className="text-slate-500 font-mono text-xs">
              &gt; 谨慎分配你的资源
            </p>
          </div>

          <LifeEditor
            onTriggerRegret={handleTriggerRegret}
            onTriggerWish={handleTriggerWish}
            onComplete={() => { }} // 暂时不用
            regretResolved={regretResolved}
          />

          {/* 遮罩层组件 */}
          {showCleaner && (
            <MemoryCleaner onClean={handleRegretCleaned} />
          )}

          {showBootLoader && (
            <SystemBootLoader onBoot={finalizeGame} />
          )}
        </div>
      </div>
    );
  }

  // 加载页面
  if (appState === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <FloatingElements />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/30 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="text-center space-y-6 animate-fade-in z-10">
          <AiLoader className="scale-75 mb-8" />
          <h2 className="text-2xl font-bold text-white">{loadingMessage || '正在重构人格数据...'}</h2>
          <p className="text-white/60">系统正在写入您的2026启动指令...</p>
        </div>
      </div>
    );
  }

  // 反应页面
  if (appState === "reaction" && survey.result) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <DynamicSEO
          title={`确诊: ${survey.result.mainTag}`}
          description={`经过赛博诊断，我的2026年度人格是「${survey.result.mainTag}」。你也来测测？`}
        />
        <FloatingElements />
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen relative z-10">
          {/* 结果展示 */}
          <div className="text-center space-y-6 mb-8 animate-fade-in">
            <p className="text-white/60">您的系统已重构完成，确诊为...</p>
            {/* 结果展示 - 优先显示图片 */}
            <div className="relative w-48 h-48 mx-auto animate-bounce-slow">
              <div className={`absolute inset - 0 bg - gradient - to - r ${survey.result.color} rounded - full blur - 3xl opacity - 20`} />
              <div className={`absolute inset-0 bg-gradient-to-r ${survey.result.color} rounded-full blur-3xl opacity-20`} />
              {survey.result.image ? (
                <img
                  src={survey.result.image}
                  alt="Persona"
                  className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                />
              ) : (
                <div className="text-8xl flex items-center justify-center h-full relative z-10">
                  {survey.result.emoji}
                </div>
              )}
            </div>
            <h1 className={`text-5xl font-black bg-gradient-to-r ${survey.result.color} bg-clip-text text-transparent`}>
              {survey.result.mainTag}
            </h1>
            <p className="text-white/70 max-w-sm mx-auto">{survey.result.description}</p>
          </div>

          {/* 反应组件 */}
          <div className="w-full max-w-md animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Suspense fallback={<div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-white/50" /></div>}>
              <ResultReaction
                result={survey.result}
                camp={camp}
                retestCount={retestCount}
                onAccept={() => {
                  setShowReaction(false);
                  setAppState("result");
                }}
                onRetest={() => {
                  setRetestCount(prev => prev + 1);
                  setShowReaction(true);
                  // 重置游戏
                  handleReset();
                  setAppState("camp"); // 实际上 handleReset 会设为 home，这里覆盖一下
                }}
              />
            </Suspense>
          </div>
        </div>
      </div>
    );
  }

  if (appState === "result" && survey.result) {
    const healthIndices = calculateHealthIndices(survey.answers);

    const reportCards = [
      <CoverCard key="cover" result={survey.result} />,
      <PersonaCard key="persona" result={survey.result} />,
    ];

    // 如果是挑战模式，插入对战卡片到最前面
    if (inviterInfo) {
      reportCards.unshift(
        <Suspense key="battle-suspense" fallback={<div className="h-96 w-full bg-black/20 animate-pulse rounded-xl" />}>
          <BattleCard key="battle" result={survey.result} inviterInfo={inviterInfo} />
        </Suspense>
      );
    }

    const regretAnswer = survey.openAnswers?.['open_regret'];
    const wishAnswer = survey.openAnswers?.['open_wish'];

    if (regretAnswer && wishAnswer) {
      reportCards.push(<RegretWishCard key="regret-wish" regret={regretAnswer} wish={wishAnswer} />);
    } else {
      // Fallback for partial data
      if (regretAnswer) reportCards.push(<RegretCard key="regret" content={regretAnswer} />);
      if (wishAnswer) reportCards.push(<WishCard key="wish" content={wishAnswer} />);
    }

    reportCards.push(<ShareCard key="share" result={survey.result} sessionId={survey.sessionId} />);

    return (
      <div className="min-h-screen relative overflow-hidden text-white font-sans selection:bg-primary selection:text-white">
        <DynamicSEO
          title={`${survey.result.mainTag} | 2026人设报告`}
          description={`查看我的2026年度人设报告：${survey.result.mainTag}。测测你的？`}
        />
        <FloatingElements />

        <div className="container mx-auto px-4 py-6 flex flex-col min-h-screen relative z-10">
          {/* 卡片指示器 */}
          <div className="flex justify-center gap-2 mb-4">
            {reportCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setReportCardIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === reportCardIndex
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
          <div className="flex flex-col items-center gap-4 py-4">
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              系统需要重新校准？(重测)
            </Button>

            <p className="text-xs text-white/30 animate-pulse pt-4">
              提示：点击右下角 🍌 查看已收集的变异形态
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;

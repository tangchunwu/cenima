import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, AlertTriangle } from 'lucide-react';

interface MidQuestionTauntProps {
  questionNumber: number;
  totalQuestions: number;
  onContinue: () => void;
  onQuit: () => void;
}

// 根据题号生成挑衅文案
const getTauntContent = (questionNumber: number, totalQuestions: number) => {
  const halfway = Math.floor(totalQuestions / 2);
  const nearEnd = totalQuestions - 2;

  if (questionNumber === 3) {
    return {
      emoji: '😏',
      title: '刚热身完',
      subtitle: '好戏还在后头，这只是开胃菜...',
      continueText: '继续，谁怕谁',
      quitText: '有点慌了',
    };
  }

  if (questionNumber === halfway) {
    return {
      emoji: '🤔',
      title: '走到一半了',
      subtitle: '确定不反悔？前面的答案可是会影响结果的...',
      continueText: '绝不后悔',
      quitText: '让我想想...',
    };
  }

  if (questionNumber === 8) {
    return {
      emoji: '🤫',
      title: '系统正在吃瓜',
      subtitle: '你的回答有点东西，AI CPU都要烧了...',
      continueText: '加大力度',
      quitText: '我收敛点',
    };
  }

  if (questionNumber === nearEnd) {
    return {
      emoji: '👀',
      title: '最后机会！',
      subtitle: '系统已经在偷偷分析你了，确认继续？',
      continueText: '放马过来',
      quitText: '我需要冷静',
    };
  }

  return null;
};

export const MidQuestionTaunt = ({
  questionNumber,
  totalQuestions,
  onContinue,
  onQuit
}: MidQuestionTauntProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const taunt = getTauntContent(questionNumber, totalQuestions);

  if (!taunt) return null;

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(onContinue, 300);
  };

  const handleQuit = () => {
    setIsVisible(false);
    setTimeout(onQuit, 300);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
      <div className={`max-w-sm mx-4 bg-gradient-to-br from-slate-800/95 via-purple-900/95 to-slate-800/95 rounded-3xl p-6 border border-white/20 shadow-2xl transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
        {/* 警告图标 */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <span className="text-4xl animate-bounce-slow">{taunt.emoji}</span>
          </div>
        </div>

        {/* 标题 */}
        <h3 className="text-2xl font-bold text-white text-center mb-2">
          {taunt.title}
        </h3>

        {/* 副标题 */}
        <p className="text-white/70 text-center mb-6">
          {taunt.subtitle}
        </p>

        {/* 进度提示 */}
        <div className="bg-white/5 rounded-xl p-3 mb-6 border border-white/10">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>答题进度</span>
            <span>{questionNumber} / {totalQuestions}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-coral transition-all duration-500"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* 按钮 */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleContinue}
            className="w-full py-5 bg-gradient-to-r from-primary to-coral text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform"
          >
            {taunt.continueText}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            onClick={handleQuit}
            variant="ghost"
            className="w-full py-5 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
          >
            {taunt.quitText}
          </Button>
        </div>

        {/* 底部挑衅 */}
        <p className="text-center text-white/40 text-xs mt-4">
          😏 放弃的话，永远不知道自己是什么人设
        </p>
      </div>
    </div>
  );
};

// 判断是否应该显示挑衅弹窗
export const shouldShowTaunt = (questionNumber: number, totalQuestions: number): boolean => {
  const halfway = Math.floor(totalQuestions / 2);
  const nearEnd = totalQuestions - 2;
  return questionNumber === 3 || questionNumber === halfway || questionNumber === 8 || questionNumber === nearEnd;
};

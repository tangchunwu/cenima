import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/runtimeClient";
import { getSessionId } from "@/lib/sessionUtils";
import { questions, totalQuestions, Question } from "@/lib/questions";
import { calculateResult, Answers, TagResult } from "@/lib/resultCalculator";
import { GameAttributes, mapAttributesToAnswers, determineGameResultTag } from "@/lib/gameResultMapper";


export interface SurveyState {
  currentQuestionIndex: number;
  answers: Answers;
  openAnswers: Record<string, string>;
  isComplete: boolean;
  isLoading: boolean;
  result: TagResult | null;
}

export function useSurvey() {
  const [state, setState] = useState<SurveyState>({
    currentQuestionIndex: 0,
    answers: {},
    openAnswers: {},
    isComplete: false,
    isLoading: true,
    result: null,
  });

  const sessionId = getSessionId();
  const currentQuestion = questions[state.currentQuestionIndex];
  const progress = state.currentQuestionIndex + 1;

  // 加载已保存的进度
  useEffect(() => {
    const loadProgress = async () => {
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('session_id', sessionId)
        .maybeSingle();

      if (data && !error) {
        const answers = (data.answers as Answers) || {};
        const openAnswers = (data.open_answers as Record<string, string>) || {};

        if (data.completed) {
          const result = calculateResult(answers);
          // 如果结果类型是强制覆盖的（比如游戏模式），这里可能会重新计算
          // 但为了保持一致性，我们尽量信赖 answers
          setState(prev => ({
            ...prev,
            answers,
            openAnswers,
            isComplete: true,
            result,
            isLoading: false,
          }));
        } else {
          const answeredCount = Object.keys(answers).length + Object.keys(openAnswers).length;
          setState(prev => ({
            ...prev,
            answers,
            openAnswers,
            currentQuestionIndex: Math.min(answeredCount, totalQuestions - 1),
            isLoading: false,
          }));
        }
      } else {
        await supabase.from('survey_responses').insert({
          session_id: sessionId,
          answers: {},
          open_answers: {},
        });
        await supabase.rpc('increment_participant_count');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadProgress();
  }, [sessionId]);

  // 回答问题
  const answerQuestion = useCallback(async (answer: string) => {
    const question = questions[state.currentQuestionIndex];
    let newAnswers = { ...state.answers };
    let newOpenAnswers = { ...state.openAnswers };

    if (question.type === 'open') {
      newOpenAnswers[question.id] = answer;
    } else {
      newAnswers[question.id] = answer;
    }

    const isLastQuestion = state.currentQuestionIndex >= totalQuestions - 1;

    if (isLastQuestion) {
      const result = calculateResult(newAnswers);

      await supabase
        .from('survey_responses')
        .update({
          answers: newAnswers,
          open_answers: newOpenAnswers,
          completed: true,
          result_type: result.mainTag,
          result_tags: result.subTags,
        })
        .eq('session_id', sessionId);

      setState(prev => ({
        ...prev,
        answers: newAnswers,
        openAnswers: newOpenAnswers,
        isComplete: true,
        result,
      }));
    } else {
      await supabase
        .from('survey_responses')
        .update({
          answers: newAnswers,
          open_answers: newOpenAnswers,
        })
        .eq('session_id', sessionId);

      setState(prev => ({
        ...prev,
        answers: newAnswers,
        openAnswers: newOpenAnswers,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    }
  }, [state.answers, state.openAnswers, state.currentQuestionIndex, sessionId]);

  const goBack = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  }, [state.currentQuestionIndex]);

  const restart = useCallback(async () => {
    await supabase
      .from('survey_responses')
      .update({
        answers: {},
        open_answers: {},
        completed: false,
        result_type: null,
        result_tags: [],
      })
      .eq('session_id', sessionId);

    setState({
      currentQuestionIndex: 0,
      answers: {},
      openAnswers: {},
      isComplete: false,
      isLoading: false,
      result: null,
    });
  }, [sessionId]);

  // 新增：提交游戏数据
  const submitGameData = useCallback(async (
    attributes: GameAttributes,
    regret: string,
    wish: string
  ) => {
    // 1. 将游戏属性转化为 Answers 格式
    const mappedAnswers = mapAttributesToAnswers(attributes);

    // 2. 构造 Open Answers
    const openAnswers = {
      'open_regret': regret,
      'open_wish': wish
    };

    // 3. 计算结果
    // 这里我们可以选择直接用 mapAttributesToAnswers 生成的答案来计算
    // 也可以用 determineGameResultTag 直接定死结果，但为了数据流统一，建议还是走 calculateResult
    // 不过为了确保结果准确匹配我们的游戏逻辑，我们可以手动 override 结果类型

    let result = calculateResult(mappedAnswers);
    const forcedMainTag = determineGameResultTag(attributes);

    // 强制覆盖主标签，确保结果符合游戏直觉
    // 注意：subTags 可能还是根据 answers 算的，这可能导致不一致，但也能接受
    // 或者我们可以修改 calculateResult 允许传入 override
    result = { ...result, mainTag: forcedMainTag };

    // 4. 保存到数据库
    await supabase
      .from('survey_responses')
      .update({
        answers: mappedAnswers,
        open_answers: openAnswers,
        completed: true,
        result_type: result.mainTag,
        result_tags: result.subTags,
      })
      .eq('session_id', sessionId);

    setState(prev => ({
      ...prev,
      answers: mappedAnswers, // 保存映射后的答案，用于 DataCard 图表计算
      openAnswers: openAnswers,
      isComplete: true,
      result,
    }));

  }, [sessionId]);

  return {
    ...state,
    sessionId,
    currentQuestion,
    progress,
    totalQuestions,
    answerQuestion,
    goBack,
    restart,
    submitGameData, // 导出新方法
  };
}

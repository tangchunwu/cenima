import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getSessionId } from "@/lib/sessionUtils";
import { questions, totalQuestions } from "@/lib/questions";
import { calculateResult } from "@/lib/resultCalculator";

export interface SurveyState {
  currentQuestionIndex: number;
  answers: { [key: string]: string | string[] };
  openAnswers: { regret: string; expectation: string; goals: string[] };
  isComplete: boolean;
  isLoading: boolean;
  result: ReturnType<typeof calculateResult> | null;
}

export function useSurvey() {
  const [state, setState] = useState<SurveyState>({
    currentQuestionIndex: 0,
    answers: {},
    openAnswers: { regret: '', expectation: '', goals: [] },
    isComplete: false,
    isLoading: true,
    result: null,
  });

  const sessionId = getSessionId();
  const currentQuestion = questions[state.currentQuestionIndex];
  const progress = state.currentQuestionIndex;

  // 加载已保存的进度
  useEffect(() => {
    const loadProgress = async () => {
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('session_id', sessionId)
        .maybeSingle();

      if (data && !error) {
        const answers = (data.answers as { [key: string]: string | string[] }) || {};
        const openAnswers = (data.open_answers as { regret: string; expectation: string; goals: string[] }) || { regret: '', expectation: '', goals: [] };
        
        if (data.completed) {
          const result = calculateResult(answers);
          setState(prev => ({
            ...prev,
            answers,
            openAnswers,
            isComplete: true,
            result,
            isLoading: false,
          }));
        } else {
          // 恢复进度
          const answeredCount = Object.keys(answers).length;
          setState(prev => ({
            ...prev,
            answers,
            openAnswers,
            currentQuestionIndex: Math.min(answeredCount, totalQuestions - 1),
            isLoading: false,
          }));
        }
      } else {
        // 创建新记录
        await supabase.from('survey_responses').insert({
          session_id: sessionId,
          answers: {},
          open_answers: { regret: '', expectation: '', goals: [] },
        });
        
        // 增加参与人数
        await supabase.rpc('increment_participant_count');
        
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadProgress();
  }, [sessionId]);

  // 回答问题
  const answerQuestion = useCallback(async (questionId: number, answer: string | string[]) => {
    const newAnswers = { ...state.answers, [questionId]: answer };
    let newOpenAnswers = { ...state.openAnswers };

    // 处理开放题答案
    if (questionId === 23) {
      newOpenAnswers.regret = answer as string;
    } else if (questionId === 24) {
      newOpenAnswers.expectation = answer as string;
    } else if (questionId === 25) {
      newOpenAnswers.goals = answer as string[];
    }

    const isLastQuestion = state.currentQuestionIndex >= totalQuestions - 1;

    if (isLastQuestion) {
      // 完成问卷
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
      // 保存并继续
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

  // 返回上一题
  const goBack = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  }, [state.currentQuestionIndex]);

  // 重新开始
  const restart = useCallback(async () => {
    await supabase
      .from('survey_responses')
      .update({
        answers: {},
        open_answers: { regret: '', expectation: '', goals: [] },
        completed: false,
        result_type: null,
        result_tags: [],
      })
      .eq('session_id', sessionId);

    setState({
      currentQuestionIndex: 0,
      answers: {},
      openAnswers: { regret: '', expectation: '', goals: [] },
      isComplete: false,
      isLoading: false,
      result: null,
    });
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
  };
}

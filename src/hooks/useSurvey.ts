import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/runtimeClient";
import { getSessionId } from "@/lib/sessionUtils";
import { questions, totalQuestions, Question } from "@/lib/questions";
import { calculateResult, Answers, TagResult } from "@/lib/resultCalculator";


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

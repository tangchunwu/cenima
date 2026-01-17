-- 创建参与者统计表 (匿名，不需要用户认证)
CREATE TABLE public.participant_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  total_count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 插入初始统计记录
INSERT INTO public.participant_stats (total_count) VALUES (1234);

-- 创建问卷回答表 (匿名用户，用session_id标识)
CREATE TABLE public.survey_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  answers JSONB NOT NULL DEFAULT '{}',
  open_answers JSONB NOT NULL DEFAULT '{}',
  result_tags TEXT[] DEFAULT '{}',
  result_type TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 创建索引
CREATE INDEX idx_survey_responses_session_id ON public.survey_responses(session_id);
CREATE INDEX idx_survey_responses_completed ON public.survey_responses(completed);

-- 启用 RLS
ALTER TABLE public.participant_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- participant_stats 策略 - 所有人可读
CREATE POLICY "Anyone can read participant stats"
  ON public.participant_stats FOR SELECT
  USING (true);

-- survey_responses 策略 - 基于session_id匿名访问
CREATE POLICY "Anyone can insert survey responses"
  ON public.survey_responses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read survey responses by session_id"
  ON public.survey_responses FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update their own survey response"
  ON public.survey_responses FOR UPDATE
  USING (true);

-- 启用实时更新
ALTER PUBLICATION supabase_realtime ADD TABLE public.participant_stats;

-- 创建更新统计的函数
CREATE OR REPLACE FUNCTION public.increment_participant_count()
RETURNS void AS $$
BEGIN
  UPDATE public.participant_stats 
  SET total_count = total_count + 1, updated_at = now()
  WHERE id = (SELECT id FROM public.participant_stats LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建更新时间戳触发器
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_survey_responses_updated_at
  BEFORE UPDATE ON public.survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
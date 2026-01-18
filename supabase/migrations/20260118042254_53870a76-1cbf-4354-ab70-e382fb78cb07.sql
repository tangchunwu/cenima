-- 添加 survey_responses 表的 updated_at 自动更新触发器
DROP TRIGGER IF EXISTS update_survey_responses_updated_at ON public.survey_responses;
CREATE TRIGGER update_survey_responses_updated_at
BEFORE UPDATE ON public.survey_responses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
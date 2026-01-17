-- 修复函数 search_path 安全问题
CREATE OR REPLACE FUNCTION public.increment_participant_count()
RETURNS void AS $$
BEGIN
  UPDATE public.participant_stats 
  SET total_count = total_count + 1, updated_at = now()
  WHERE id = (SELECT id FROM public.participant_stats LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;
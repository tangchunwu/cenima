-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can read survey responses by session_id" ON public.survey_responses;
DROP POLICY IF EXISTS "Anyone can insert survey responses" ON public.survey_responses;
DROP POLICY IF EXISTS "Anyone can update their own survey response" ON public.survey_responses;

-- Create secure session-based policies
-- SELECT: Users can only read their own responses based on session_id header
CREATE POLICY "Users can read their own survey responses" 
  ON public.survey_responses FOR SELECT
  USING (session_id = current_setting('request.headers', true)::json->>'session-id');

-- INSERT: Users can only insert responses matching their session_id header
CREATE POLICY "Users can insert their own survey responses"
  ON public.survey_responses FOR INSERT
  WITH CHECK (session_id = current_setting('request.headers', true)::json->>'session-id');

-- UPDATE: Users can only update their own responses based on session_id header
CREATE POLICY "Users can update their own survey responses"
  ON public.survey_responses FOR UPDATE
  USING (session_id = current_setting('request.headers', true)::json->>'session-id')
  WITH CHECK (session_id = current_setting('request.headers', true)::json->>'session-id');
import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://oiawohlmwahybwnbpoxx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pYXdvaGxtd2FoeWJ3bmJwb3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyNDY0MjcsImV4cCI6MjA0ODgyMjQyN30.PEjg4waJmiuZnCo1_PLnLeV8iYFAMUHBSr6pOc8vhis";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
       
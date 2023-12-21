import { CreateCompletionRequest } from 'https://esm.sh/openai@3.1.0'
import 'https://deno.land/x/xhr@0.3.0/mod.ts'
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


Deno.serve(async (req) => {
  const { query } = await req.json()
  const completionConfig: CreateCompletionRequest = {
    model: 'gpt-3.5-turbo-instruct',
    prompt: query,
    max_tokens: 256,
    temperature: 0,
    stream: false,
  }

  const supabase = createClient("https://fifengrdapbvegoaaqdg.supabase.co/", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZmVuZ3JkYXBidmVnb2FhcWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MDMwNDAsImV4cCI6MjAxODQ3OTA0MH0.XnrjvUM64oUvwG9sCl4VNsZg6b_FDdu5l7-kbL-cW-Q");

  const { data, error } = await supabase
    .from('SubmissionResults')
    .insert([
      {
        candidate_id: "de75d48a-97c5-4e63-9e86-257e046c5b1d",
        submission_id: 19,
        evaluation: "evaluation",
      },
    ])
    .select()


  const aiEvaluationResponse = fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(completionConfig),
  })

  return new Response(JSON.stringify(completionConfig), { headers: { 'Content-Type': 'application/json' } })
})

// const supabase = createClient("https://fifengrdapbvegoaaqdg.supabase.co/", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZmVuZ3JkYXBidmVnb2FhcWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MDMwNDAsImV4cCI6MjAxODQ3OTA0MH0.XnrjvUM64oUvwG9sCl4VNsZg6b_FDdu5l7-kbL-cW-Q");

// const channels = supabase.channel('submission-channel')
//   .on(
//     'postgres_changes',
//     { event: 'INSERT', schema: 'public', table: 'CandidateSubmissions' },
//     (payload) => {
//       console.log('Change received!', payload)
//     }
//   )
//   .subscribe()


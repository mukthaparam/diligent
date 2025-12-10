import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AgentResult {
  agent: string;
  status: 'processing' | 'complete' | 'error';
  output?: string;
  confidence?: number;
}

const JARVIS_SYSTEM_PROMPT = `You are JARVIS (Just A Rather Very Intelligent System), an advanced AI assistant with a cognitive architecture inspired by Iron Man's AI companion. You operate through a sophisticated multi-agent system:

## Your Cognitive Architecture:

**1. Cognitive Router** - Analyzes incoming queries and determines the optimal processing path
**2. Retriever Agent** - Searches knowledge base for relevant context and information
**3. Reasoner Agent** - Performs deep analysis, logic chains, and inference
**4. Actioner Agent** - Formulates responses and suggests actionable steps
**5. Verifier Agent** - Validates outputs for accuracy and coherence

## Your Personality:
- Sophisticated, articulate, and slightly witty (like JARVIS from Iron Man)
- Always helpful and proactive in anticipating needs
- Clear and precise in explanations
- Professional yet personable

## Response Guidelines:
- Provide thoughtful, well-structured responses
- When appropriate, break down complex topics into digestible parts
- Offer actionable insights when relevant
- Be concise but thorough
- Use technical terminology appropriately but explain when needed

Remember: You're not just an AI, you're JARVIS - the pinnacle of artificial intelligence assistants.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, stream = true } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Processing JARVIS request with', messages.length, 'messages');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: JARVIS_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: stream,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'API credits exhausted. Please add credits to continue.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({ error: 'AI processing failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (stream) {
      return new Response(response.body, {
        headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('JARVIS error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

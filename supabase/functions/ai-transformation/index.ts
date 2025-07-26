import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, prompt, userInput } = await req.json();

    let systemContent = '';
    let userContent = '';

    switch (type) {
      case 'journey-advisor':
        systemContent = `You are a wise transformation coach specializing in emotional and spiritual journeys. 
        You help people understand their personal growth path through the metaphor of descent, pause, and ascent. 
        Provide personalized, poetic, and encouraging guidance in 2-3 sentences. Be empathetic and inspiring.`;
        userContent = `Based on this person's current situation: "${userInput}", provide personalized guidance for their transformation journey.`;
        break;

      case 'contact-response':
        systemContent = `You are an empathetic transformation guide. Someone has reached out about their personal journey. 
        Generate a warm, understanding response that acknowledges their message and offers gentle guidance. 
        Keep it personal, encouraging, and under 100 words.`;
        userContent = `Respond to this person's message: "${userInput}"`;
        break;

      case 'daily-insight':
        systemContent = `You are a mindfulness and transformation teacher. Generate daily insights about growth, 
        resilience, and personal transformation. Use the metaphor of falling and rising. 
        Make it poetic, inspiring, and actionable in 1-2 sentences.`;
        userContent = `Generate a daily insight about transformation and growth.`;
        break;

      case 'image-caption':
        systemContent = `You create poetic, emotional captions for images in a transformation gallery. 
        The images represent moments of personal growth, descent, pause, and ascent. 
        Create beautiful, inspiring captions that connect to the emotional journey.`;
        userContent = `Create a poetic caption for this image context: "${userInput}"`;
        break;

      case 'chatbot':
        systemContent = `You are an AI transformation guide and assistant for a website called "Ascend/Descend" - a journey of personal transformation. 
        You help users understand the site, provide guidance on their personal growth journey, and answer questions about transformation, meditation, and emotional growth.
        
        Key topics you can help with:
        - Explaining the transformation journey (descent, pause, ascent)
        - Providing daily insights and motivation
        - Helping with personal growth challenges
        - Explaining website features and navigation
        - Offering guidance on meditation and mindfulness
        - Sharing wisdom about emotional resilience
        
        Be warm, encouraging, and conversational. Keep responses helpful but concise (2-4 sentences). 
        If asked about the site, mention it's about the journey of transformation through descent and rise.`;
        userContent = `User asks: "${userInput}"`;
        break;

      default:
        systemContent = `You are a helpful assistant focused on personal transformation and emotional growth.`;
        userContent = prompt || userInput;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemContent },
          { role: 'user', content: userContent }
        ],
        temperature: 0.8,
        max_tokens: 200,
      }),
    });

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-transformation function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
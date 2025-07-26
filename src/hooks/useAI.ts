import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AIRequest {
  type: 'journey-advisor' | 'contact-response' | 'daily-insight' | 'image-caption' | 'chatbot';
  prompt?: string;
  userInput?: string;
}

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateAIResponse = async ({ type, prompt, userInput }: AIRequest): Promise<string> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-transformation', {
        body: { type, prompt, userInput }
      });

      if (error) throw error;
      
      return data.generatedText;
    } catch (error) {
      console.error('AI generation error:', error);
      throw new Error('Failed to generate AI response');
    } finally {
      setIsLoading(false);
    }
  };

  const getJourneyAdvice = async (userSituation: string) => {
    return generateAIResponse({
      type: 'journey-advisor',
      userInput: userSituation
    });
  };

  const generateContactResponse = async (userMessage: string) => {
    return generateAIResponse({
      type: 'contact-response',
      userInput: userMessage
    });
  };

  const getDailyInsight = async () => {
    return generateAIResponse({
      type: 'daily-insight'
    });
  };

  const generateImageCaption = async (imageContext: string) => {
    return generateAIResponse({
      type: 'image-caption',
      userInput: imageContext
    });
  };

  const getChatbotResponse = async (userMessage: string) => {
    return generateAIResponse({
      type: 'chatbot',
      userInput: userMessage
    });
  };

  return {
    isLoading,
    getJourneyAdvice,
    generateContactResponse,
    getDailyInsight,
    generateImageCaption,
    getChatbotResponse
  };
};
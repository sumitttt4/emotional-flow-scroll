import { useState } from 'react';
import { Bot, Sparkles, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAI } from '@/hooks/useAI';
import { useToast } from '@/hooks/use-toast';

export const AIJourneyAdvisor = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showAdvisor, setShowAdvisor] = useState(false);
  const { getJourneyAdvice, getDailyInsight, isLoading } = useAI();
  const { toast } = useToast();

  const handleGetAdvice = async () => {
    if (!userInput.trim()) {
      toast({
        title: "Share your thoughts",
        description: "Please describe your current situation to receive personalized guidance.",
        variant: "destructive"
      });
      return;
    }

    try {
      const advice = await getJourneyAdvice(userInput);
      setAiResponse(advice);
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect with the AI advisor. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDailyInsight = async () => {
    try {
      const insight = await getDailyInsight();
      setAiResponse(insight);
      setUserInput('Daily insight requested');
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to generate daily insight. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!showAdvisor) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setShowAdvisor(true)}
          className="btn-ascent rounded-full w-14 h-14 shadow-lg animate-glow-pulse group"
          size="icon"
        >
          <Bot className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-80 sm:w-96">
      <Card className="glass shadow-xl border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Bot className="h-5 w-5 text-primary" />
              <span>AI Journey Guide</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAdvisor(false)}
              className="h-6 w-6"
            >
              ×
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Get personalized guidance for your transformation journey
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Button
              onClick={handleDailyInsight}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Daily Insight
            </Button>
          </div>

          <div>
            <Textarea
              placeholder="Describe where you are in your journey... What challenges are you facing? What growth are you seeking?"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="min-h-[80px] bg-background/50"
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={handleGetAdvice}
            disabled={isLoading || !userInput.trim()}
            className="w-full btn-ascent"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Receiving Guidance...
              </>
            ) : (
              <>
                <MessageCircle className="h-4 w-4 mr-2" />
                Get Personal Guidance
              </>
            )}
          </Button>

          {aiResponse && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-start space-x-2 mb-2">
                <Bot className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm font-medium text-primary">Your Guide</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed italic">
                "{aiResponse}"
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
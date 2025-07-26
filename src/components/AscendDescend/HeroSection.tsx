import { ArrowDown, ChevronDown, Sparkles, RefreshCw, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useAI } from '@/hooks/useAI';
import { Card } from '@/components/ui/card';

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dailyInsight, setDailyInsight] = useState('');
  const [showInsight, setShowInsight] = useState(false);
  const { getDailyInsight, isLoading } = useAI();

  useEffect(() => {
    setIsVisible(true);
    // Auto-load daily insight
    loadDailyInsight();
  }, []);

  const loadDailyInsight = async () => {
    try {
      const insight = await getDailyInsight();
      setDailyInsight(insight);
      setShowInsight(true);
    } catch (error) {
      console.error('Failed to load daily insight:', error);
    }
  };

  const handleAIClick = () => {
    try {
      // Trigger the AI chatbot to open
      const aiButton = document.querySelector('[data-ai-chatbot]') as HTMLButtonElement;
      if (aiButton) {
        aiButton.click();
        console.log('AI chatbot triggered successfully');
      } else {
        // Fallback: scroll to a section that might have AI functionality
        console.log('AI button not found, scrolling to gallery section');
        document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error triggering AI chatbot:', error);
      // Fallback to gallery section
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
          alt="Descent Journey - Transformation"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className="container mx-auto text-center relative z-10">
        {/* Hero silhouette */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-t from-foreground to-transparent rounded-full animate-float" />
        </div>

        <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h1 className="heading-hero text-gradient-descent">
            Fall.
            <br />
            <span className="text-foreground">Rise.</span>
            <br />
            <span className="text-gradient-ascent">Become.</span>
          </h1>
          
          <p className="text-poetic max-w-2xl mx-auto text-white/90">
            Every descent is a preparation for ascent. Every fall teaches us to rise stronger. 
            This is your journey through the depths of transformation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-descent group px-8 py-6 text-lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start the Journey
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              className="btn-ascent group px-8 py-6 text-lg shadow-lg hover:shadow-xl animate-pulse"
              onClick={handleAIClick}
              title="Open AI Guide - Get personalized transformation guidance"
            >
              <Bot className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              AI Guide
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg"
              className="text-white/90 hover:text-white border border-white/20 hover:bg-white/10"
              onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Process
            </Button>
          </div>
        </div>

        {/* AI Daily Insight */}
        {showInsight && (
          <div className="absolute top-8 left-4 right-4 sm:left-8 sm:right-8 z-20">
            <Card className="glass p-4 max-w-md mx-auto bg-white/10 backdrop-blur-xl border-white/20">
              <div className="flex items-start space-x-3">
                <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary mb-1">Today's Insight</p>
                  <p className="text-sm text-white/90 leading-relaxed italic">
                    "{dailyInsight}"
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={loadDailyInsight}
                  disabled={isLoading}
                  className="h-6 w-6 hover:text-primary text-white/70"
                >
                  <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-white/70" />
        </div>
      </div>

      {/* Ambient light effect */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent animate-glow-pulse" />
    </section>
  );
};
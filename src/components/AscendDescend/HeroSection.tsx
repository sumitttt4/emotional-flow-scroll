import { ArrowDown, ChevronDown, Sparkles, RefreshCw, Bot } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import { useAI } from '@/hooks/useAI';
import { Card } from '@/components/ui/card';

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dailyInsight, setDailyInsight] = useState('');
  const [showInsight, setShowInsight] = useState(false);
  const { getDailyInsight, isLoading } = useAI();
  const orbRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setIsVisible(true);
    loadDailyInsight();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
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
    const aiButton = document.querySelector('[data-ai-chatbot]') as HTMLButtonElement;
    if (aiButton) aiButton.click();
    else document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mouse move parallax
  const handleMouseMove = (e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 30;
    const y = (e.clientY / innerHeight - 0.5) * 30;
    orbRefs.current.forEach((orb, idx) => {
      if (!orb) return;
      const speed = (idx + 1) * 3;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  };

  // Scroll parallax
  const handleScroll = () => {
    const scrollY = window.scrollY;
    orbRefs.current.forEach((orb, idx) => {
      if (!orb) return;
      const speed = (idx + 1) * 0.3;
      orb.style.transform += ` translateY(${scrollY * speed}px)`;
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 font-sans bg-black">
      
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
          alt="Descent Journey - Transformation"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

        {/* Floating gradient orbs */}
        <div
          ref={(el) => el && (orbRefs.current[0] = el)}
          className="absolute w-72 h-72 bg-gradient-to-r from-purple-600/40 via-pink-500/30 to-blue-500/30 rounded-full blur-3xl opacity-60 top-16 left-1/4 transition-transform duration-300"
        />
        <div
          ref={(el) => el && (orbRefs.current[1] = el)}
          className="absolute w-96 h-96 bg-gradient-to-r from-green-500/30 via-yellow-400/20 to-purple-500/20 rounded-full blur-2xl opacity-50 bottom-28 right-1/3 transition-transform duration-300"
        />
        <div
          ref={(el) => el && (orbRefs.current[2] = el)}
          className="absolute w-60 h-60 bg-gradient-to-r from-pink-500/30 via-red-500/20 to-orange-400/20 rounded-full blur-2xl opacity-50 top-1/2 left-3/4 transition-transform duration-300"
        />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto relative z-10 text-center">
        <div className={`space-y-6 md:space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-red-500">
            Fall.<br/>
            <span className="text-white">Rise.</span><br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Become.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl italic tracking-wide leading-relaxed">
            Every descent is a preparation for ascent. Every fall teaches us to rise stronger. 
            This is your journey through the depths of transformation.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <Button 
              size="lg" 
              className="px-8 py-5 bg-gradient-to-r from-indigo-700 to-pink-600 hover:from-indigo-800 hover:to-pink-700 shadow-lg rounded-xl text-lg flex items-center gap-2 font-medium transition-all duration-300"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start the Journey <ArrowDown className="h-5 w-5 animate-bounce" />
            </Button>

            <Button
              size="lg"
              className="px-8 py-5 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-xl rounded-xl text-lg flex items-center gap-2 animate-pulse font-medium transition-all duration-300"
              onClick={handleAIClick}
              title="Open AI Guide - Personalized guidance"
            >
              <Bot className="h-5 w-5" /> AI Guide
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="text-white/80 border border-white/20 hover:bg-white/10 px-8 py-5 rounded-xl text-lg font-medium transition-all duration-300"
              onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Process
            </Button>
          </div>
        </div>

        {/* AI Daily Insight */}
        {showInsight && (
          <Card className="glass p-5 max-w-md mx-auto mt-8 backdrop-blur-xl border border-white/20 bg-white/10">
            <div className="flex items-start space-x-3">
              <Sparkles className="h-6 w-6 text-yellow-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-yellow-400 mb-1">Today's Insight</p>
                <p className="text-white/90 italic">{dailyInsight}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={loadDailyInsight}
                disabled={isLoading}
                className="h-7 w-7 text-white/70 hover:text-yellow-400"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </Card>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-white/70" />
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent animate-pulse-slow" />
    </section>
  );
};

import { ArrowDown, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
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
          
          <p className="text-poetic max-w-2xl mx-auto">
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
              variant="ghost" 
              size="lg"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Process
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>

      {/* Ambient light effect */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent animate-glow-pulse" />
    </section>
  );
};
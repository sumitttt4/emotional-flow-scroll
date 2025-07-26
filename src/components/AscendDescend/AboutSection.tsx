import { useEffect, useRef, useState } from 'react';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 px-4" ref={sectionRef}>
      <div className="container mx-auto">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="space-y-8">
            <h2 className="heading-section text-foreground">
              The Journey
              <span className="text-gradient-descent"> Within</span>
            </h2>
            
            <div className="space-y-6 text-poetic">
              <p>
                In the depths of our darkest moments, we discover the seeds of our greatest transformations. 
                The descent is not our enemy—it is our teacher, our guide through the labyrinth of self-discovery.
              </p>
              
              <p>
                This experience takes you through three sacred phases: the courageous descent into your depths, 
                the profound pause of reflection, and the triumphant rise into your authentic power.
              </p>
              
              <p>
                Each scroll, each moment, each breath is an invitation to witness your own metamorphosis. 
                Are you ready to embrace the journey?
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="glass p-8 rounded-2xl hover-lift">
              <div className="aspect-square bg-gradient-to-br from-accent/20 via-transparent to-primary/20 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-t from-foreground/80 to-transparent rounded-full flex items-center justify-center">
                    <div className="w-3 h-8 bg-foreground rounded-full animate-float" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Transformation in Motion
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
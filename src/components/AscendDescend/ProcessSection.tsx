import { TrendingDown, Pause, TrendingUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const processSteps = [
  {
    id: 'descent',
    icon: TrendingDown,
    title: 'Descent',
    subtitle: 'The Courageous Fall',
    description: 'Embrace the darkness, for it holds the wisdom of transformation. Here we learn to release what no longer serves.',
    color: 'accent'
  },
  {
    id: 'pause',
    icon: Pause,
    title: 'Pause',
    subtitle: 'The Sacred Stillness',
    description: 'In the deepest point, we find profound stillness. This is where clarity emerges from chaos.',
    color: 'muted-foreground'
  },
  {
    id: 'rebirth',
    icon: TrendingUp,
    title: 'Rebirth',
    subtitle: 'The Triumphant Rise',
    description: 'From the ashes of who we were, we emerge as who we are meant to be. This is your ascension.',
    color: 'primary'
  }
];

export const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0');
            setVisibleSteps(prev => [...new Set([...prev, stepIndex])]);
          }
        });
      },
      { threshold: 0.5 }
    );

    const stepElements = document.querySelectorAll('[data-step]');
    stepElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="py-24 px-4" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-section mb-6">
            The <span className="text-gradient-descent">Three</span> Phases
          </h2>
          <p className="text-poetic max-w-3xl mx-auto">
            Every transformation follows an ancient pattern. Through descent, pause, and rebirth, 
            we discover the infinite potential that lies within our deepest challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.includes(index);
            
            return (
              <div
                key={step.id}
                data-step={index}
                className={`text-center group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="glass p-8 rounded-2xl hover-lift group-hover:shadow-xl transition-all duration-500">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center
                    ${step.color === 'accent' ? 'bg-accent/20 text-accent' : 
                      step.color === 'primary' ? 'bg-primary/20 text-primary' : 
                      'bg-muted/20 text-muted-foreground'} 
                    group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-10 w-10" />
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-2 
                    ${step.color === 'accent' ? 'text-gradient-descent' : 
                      step.color === 'primary' ? 'text-gradient-ascent' : 
                      'text-foreground'}`}>
                    {step.title}
                  </h3>
                  
                  <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    {step.subtitle}
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connection line (except for last item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-12 h-px bg-gradient-to-r from-muted to-transparent transform -translate-y-1/2 translate-x-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
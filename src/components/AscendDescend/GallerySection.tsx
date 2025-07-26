import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

// AI Neural Network Animation Component
const AINeuralNetwork = () => {
  const [nodes, setNodes] = useState<Array<{id: number, x: number, y: number, size: number, pulse: boolean}>>([]);
  const [connections, setConnections] = useState<Array<{from: number, to: number, active: boolean}>>([]);

  useEffect(() => {
    // Create neural network nodes
    const newNodes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 20 + (i % 4) * 20,
      y: 20 + Math.floor(i / 4) * 20,
      size: Math.random() * 0.5 + 0.5,
      pulse: false
    }));
    setNodes(newNodes);

    // Create connections between nodes
    const newConnections = [];
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
        if (Math.random() > 0.7) {
          newConnections.push({
            from: i,
            to: j,
            active: false
          });
        }
      }
    }
    setConnections(newConnections);

    // Animate connections
    const interval = setInterval(() => {
      setConnections(prev => prev.map(conn => ({
        ...conn,
        active: Math.random() > 0.5
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-80 h-80 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Connections */}
        {connections.map((conn, index) => (
          <line
            key={index}
            x1={nodes[conn.from]?.x || 0}
            y1={nodes[conn.from]?.y || 0}
            x2={nodes[conn.to]?.x || 0}
            y2={nodes[conn.to]?.y || 0}
            stroke={conn.active ? "hsl(142, 76%, 36%)" : "hsl(142, 76%, 36%, 0.3)"}
            strokeWidth="0.5"
            className="transition-all duration-1000"
          />
        ))}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.size * 2}
            fill="hsl(142, 76%, 36%)"
            className={`transition-all duration-500 ${node.pulse ? 'animate-pulse' : ''}`}
            style={{
              filter: node.pulse ? 'drop-shadow(0 0 10px hsl(142, 76%, 36%))' : 'none'
            }}
          />
        ))}
      </svg>
      
      {/* Floating data particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

// AI Brain Core Component
const AIBrainCore = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer ring */}
      <div 
        className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin"
        style={{ animationDuration: '20s' }}
      />
      
      {/* Middle ring */}
      <div 
        className="absolute inset-4 border border-primary/50 rounded-full animate-spin"
        style={{ animationDuration: '15s', animationDirection: 'reverse' }}
      />
      
      {/* Inner core */}
      <div className="absolute inset-8 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full animate-pulse" />
      </div>
      
      {/* Neural connections */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-gradient-to-t from-primary to-transparent"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-32px)`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState<'neural' | 'brain'>('neural');
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveAnimation(prev => prev === 'neural' ? 'brain' : 'neural');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="ai-help" className="py-24 px-4">
      <div className="container mx-auto">
        <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="relative max-w-2xl mx-auto">
            {/* AI Animation Container */}
            <div className="relative mb-8 h-80">
              <div className={`transition-all duration-1000 ${activeAnimation === 'neural' ? 'opacity-100' : 'opacity-0'}`}>
                <AINeuralNetwork />
              </div>
              <div className={`absolute inset-0 transition-all duration-1000 ${activeAnimation === 'brain' ? 'opacity-100' : 'opacity-0'}`}>
                <AIBrainCore />
              </div>
            </div>

            {/* AI Text */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gradient-ascent">
                AI <span className="text-foreground">Transformation</span>
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Experience the power of artificial intelligence guiding your journey through 
                the depths of transformation and emergence.
              </p>
              {/* Status indicator */}
              <div className="flex justify-center space-x-2 mt-8">
                <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${activeAnimation === 'neural' ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${activeAnimation === 'brain' ? 'bg-primary' : 'bg-muted'}`} />
              </div>
              {/* AI Help Button */}
              <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
                <DialogTrigger asChild>
                  <button
                    className="mt-8 px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow-lg hover:bg-primary/80 transition-colors"
                  >
                    AI Help
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg mx-auto text-center">
                  <h3 className="text-xl font-bold mb-2 text-gradient-ascent">How can AI help you?</h3>
                  <p className="text-muted-foreground mb-4">
                    Welcome! I am your AI assistant. I can guide you through the transformation journey, answer questions about the site, or help you explore features. How can I assist you today?
                  </p>
                  <ul className="text-left text-sm text-foreground space-y-2 mb-4">
                    <li>• Get tips on using the site</li>
                    <li>• Learn about the transformation journey</li>
                    <li>• Ask for feature explanations</li>
                    <li>• Get support or contact info</li>
                  </ul>
                  <button
                    className="mt-2 px-4 py-2 rounded bg-primary text-white hover:bg-primary/80 transition-colors"
                    onClick={() => setHelpOpen(false)}
                  >
                    Close
                  </button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 
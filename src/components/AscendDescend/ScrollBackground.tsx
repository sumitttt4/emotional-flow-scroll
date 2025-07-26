import { useEffect, useState } from 'react';

export const ScrollBackground = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Color interpolation based on scroll progress
  const getBackgroundColor = () => {
    if (scrollProgress < 0.3) {
      // Red to Black transition (descent)
      const localProgress = scrollProgress / 0.3;
      const redIntensity = Math.round(85 - (localProgress * 85));
      const lightness = Math.round(60 - (localProgress * 52)); // 60% to 8%
      return `hsl(0, ${redIntensity}%, ${lightness}%)`;
    } else if (scrollProgress < 0.7) {
      // Black pause
      return 'hsl(0, 0%, 8%)';
    } else {
      // Black to Green transition (ascent)
      const localProgress = (scrollProgress - 0.7) / 0.3;
      const hue = Math.round(localProgress * 142); // 0 to 142 (green)
      const saturation = Math.round(localProgress * 76);
      const lightness = Math.round(8 + (localProgress * 28)); // 8% to 36%
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
  };

  return (
    <div
      className="fixed inset-0 -z-10 transition-colors duration-1000 ease-out"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {/* Particle effect overlay */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"
          style={{
            transform: `translateY(${scrollProgress * 100}px)`,
          }}
        />
      </div>
    </div>
  );
};
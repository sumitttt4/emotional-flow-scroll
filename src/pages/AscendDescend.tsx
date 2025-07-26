import { ScrollBackground } from '@/components/AscendDescend/ScrollBackground';
import { DarkModeToggle } from '@/components/AscendDescend/DarkModeToggle';
import { HeroSection } from '@/components/AscendDescend/HeroSection';
import { AboutSection } from '@/components/AscendDescend/AboutSection';
import { ProcessSection } from '@/components/AscendDescend/ProcessSection';
import { TestimonialSection } from '@/components/AscendDescend/TestimonialSection';
import { GallerySection } from '@/components/AscendDescend/GallerySection';
import { ContactSection } from '@/components/AscendDescend/ContactSection';
import { FixedFooter } from '@/components/AscendDescend/FixedFooter';

const AscendDescend = () => {
  return (
    <div className="relative min-h-screen">
      {/* Scroll-based background */}
      <ScrollBackground />
      
      {/* Dark mode toggle */}
      <DarkModeToggle />
      
      {/* Main content */}
      <main className="relative z-10">
        <section id="hero">
          <HeroSection />
        </section>
        
        <AboutSection />
        <ProcessSection />
        <TestimonialSection />
        <GallerySection />
        
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      {/* Fixed footer navigation */}
      <FixedFooter />
      
      {/* Bottom padding to account for fixed footer */}
      <div className="h-20" />
    </div>
  );
};

export default AscendDescend;
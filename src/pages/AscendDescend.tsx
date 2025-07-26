import { ScrollBackground } from '@/components/AscendDescend/ScrollBackground';
import { DarkModeToggle } from '@/components/AscendDescend/DarkModeToggle';
import { TopHeader } from '@/components/AscendDescend/TopHeader';
import { HeroSection } from '@/components/AscendDescend/HeroSection';
import { AboutSection } from '@/components/AscendDescend/AboutSection';
import { ProcessSection } from '@/components/AscendDescend/ProcessSection';
import { TestimonialSection } from '@/components/AscendDescend/TestimonialSection';
import { GallerySection } from '@/components/AscendDescend/GallerySection';
import { ContactSection } from '@/components/AscendDescend/ContactSection';
import AIChatbot from '@/components/AscendDescend/AIChatbot';

const AscendDescend = () => {
  return (
    <div className="relative min-h-screen">
      {/* Scroll-based background */}
      <ScrollBackground />
      
      {/* Top Header Navigation */}
      <TopHeader />
      
      {/* Dark mode toggle */}
      <DarkModeToggle />
      
      {/* AI Chatbot */}
      <AIChatbot />
      
      {/* Main content with top padding for header */}
      <main className="relative z-10 pt-20">
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
    </div>
  );
};

export default AscendDescend;
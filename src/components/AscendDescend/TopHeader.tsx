import { useState, useEffect } from 'react';
import { Home, User, Compass, Mail, Instagram, ExternalLink, Twitter, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigationLinks = [
  { id: 'home', label: 'Home', icon: Home, href: '#hero' },
  { id: 'about', label: 'About', icon: User, href: '#about' },
  { id: 'explore', label: 'Explore', icon: Compass, href: '#process' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  { id: 'ai-help', label: 'Help with AI', icon: Compass, href: '#ai-help' },
];

const socialLinks = [
  { id: 'instagram', label: 'Instagram', icon: Instagram, href: '#' },
  { id: 'behance', label: 'Behance', icon: ExternalLink, href: '#' },
  { id: 'twitter', label: 'Twitter', icon: Twitter, href: '#' }
];

export const TopHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-xl border-b border-white/20' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection('#hero')}>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="w-2 h-5 bg-white rounded-full animate-float" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg text-white">Ascend/Descend</h1>
            <p className="text-xs text-white/70">Transformation Journey</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigationLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.href)}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group"
              >
                <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Social Links */}
        <div className="hidden lg:flex items-center space-x-2">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.id}
                href={link.href}
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all group"
                title={link.label}
              >
                <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </a>
            );
          })}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 glass backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-4 bg-white rounded-full" />
                </div>
                <span className="font-bold text-white">Ascend/Descend</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5 text-white"/>
              </Button>
            </div>

            <nav className="space-y-6">
              {navigationLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.href)}
                    className="flex items-center space-x-3 w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors group"
                  >
                    <Icon className="h-5 w-5 text-white group-hover:scale-110 transition-transform"/>
                    <span className="font-medium text-white">{link.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-white/70 mb-4">Follow the Journey</p>
              <div className="flex space-x-2">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      className="p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all group"
                      title={link.label}
                    >
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform"/>
                    </a>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

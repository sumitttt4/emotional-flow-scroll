import { Home, User, Compass, Mail, Instagram, ExternalLink, Twitter } from 'lucide-react';

const navigationLinks = [
  { id: 'home', label: 'Home', icon: Home, href: '#hero' },
  { id: 'about', label: 'About', icon: User, href: '#about' },
  { id: 'explore', label: 'Explore', icon: Compass, href: '#process' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' }
];

const socialLinks = [
  { id: 'instagram', label: 'Instagram', icon: Instagram, href: '#' },
  { id: 'behance', label: 'Behance', icon: ExternalLink, href: '#' },
  { id: 'twitter', label: 'Twitter', icon: Twitter, href: '#' }
];

export const FixedFooter = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-border/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
              <div className="w-2 h-4 bg-white rounded-full" />
            </div>
            <span className="font-bold text-foreground hidden sm:block">Ascend/Descend</span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1 sm:space-x-4">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.href)}
                  className="flex items-center space-x-1 px-2 sm:px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all duration-200 group"
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm hidden md:block">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Social Links */}
          <div className="flex items-center space-x-1">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors group"
                  title={link.label}
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
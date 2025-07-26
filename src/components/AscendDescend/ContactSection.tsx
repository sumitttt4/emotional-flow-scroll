import { useState, useEffect } from 'react';
import { Send, Instagram, ExternalLink, Twitter, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAI } from '@/hooks/useAI';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [showAIResponse, setShowAIResponse] = useState(false);
  const { toast } = useToast();
  const { generateContactResponse, isLoading: aiLoading } = useAI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate AI response to user's message
      if (formData.message.trim()) {
        const response = await generateContactResponse(formData.message);
        setAiResponse(response);
        setShowAIResponse(true);
      }

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. Your journey begins now.",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAIPreview = async () => {
    if (!formData.message.trim()) {
      toast({
        title: "Add your message",
        description: "Write your message first to see an AI-generated response preview.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await generateContactResponse(formData.message);
      setAiResponse(response);
      setShowAIResponse(true);
    } catch (error) {
      toast({
        title: "AI Preview Error",
        description: "Unable to generate response preview.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    
    // Hide AI response when message changes
    if (e.target.name === 'message' && showAIResponse) {
      setShowAIResponse(false);
    }
  };

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-section mb-6">
              Begin Your <span className="text-gradient-ascent">Transformation</span>
            </h2>
            <p className="text-poetic max-w-2xl mx-auto">
              Ready to embark on your own journey of descent and rise? 
              Reach out and let's explore the depths of your potential together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="glass p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Share your thoughts, questions, or where you are in your journey..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-background/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>
                
                {/* AI Preview Button */}
                <Button
                  type="button"
                  onClick={handleAIPreview}
                  disabled={aiLoading || !formData.message.trim()}
                  variant="outline"
                  className="w-full"
                >
                  <Bot className="mr-2 h-4 w-4" />
                  {aiLoading ? 'Generating Preview...' : 'Preview AI Response'}
                </Button>

                {/* AI Response Preview */}
                {showAIResponse && aiResponse && (
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-start space-x-2 mb-2">
                      <Bot className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm font-medium text-primary">Expected Response</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed italic">
                      "{aiResponse}"
                    </p>
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-ascent group"
                  size="lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Connection Info */}
            <div className="space-y-8">
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Connect & Follow</h3>
                <p className="text-muted-foreground mb-6">
                  Join the community of transformers and stay connected with the latest 
                  insights on growth, creativity, and conscious evolution.
                </p>
                
                <div className="space-y-4">
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span>@ascenddescend</span>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </a>
                  
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <ExternalLink className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span>Behance Portfolio</span>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </a>
                  
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span>@ascenddescend</span>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </a>
                </div>
              </div>

              <div className="glass p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Artist's Note</h3>
                <p className="text-muted-foreground leading-relaxed">
                  "This experience was born from my own journey through the depths of creative 
                  transformation. Every pixel, every transition, every word carries the energy 
                  of countless moments of falling and rising. May it serve as a mirror for your 
                  own magnificent becoming."
                </p>
                <p className="text-sm text-muted-foreground mt-4 italic">
                  — The Creator
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
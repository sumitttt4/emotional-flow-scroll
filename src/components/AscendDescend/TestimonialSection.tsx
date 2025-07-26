import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    quote: "The descent taught me that my greatest fears were actually my greatest teachers. Through the darkness, I found a light I never knew existed.",
    author: "Maya Chen",
    role: "Creative Director",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 2,
    quote: "In the pause, I discovered silence wasn't empty—it was full of infinite possibility. That moment of stillness changed everything.",
    author: "Alex Rivera",
    role: "Philosopher",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 3,
    quote: "The ascent isn't about returning to who you were. It's about becoming who you were always meant to be. That's the real magic.",
    author: "Jordan Kim",
    role: "Transformation Coach",
    avatar: "/api/placeholder/100/100"
  }
];

export const TestimonialSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-section mb-6">
            Voices of <span className="text-gradient-ascent">Transformation</span>
          </h2>
          <p className="text-poetic max-w-2xl mx-auto">
            Stories from those who have walked the path of descent and rise, 
            each finding their own unique way to become.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass p-8 rounded-2xl hover-lift group transition-all duration-500"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <Quote className="h-8 w-8 text-primary mb-6 group-hover:scale-110 transition-transform" />
              
              <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
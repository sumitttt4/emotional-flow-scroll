import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

// Generate placeholder images with different aspect ratios for masonry effect
const galleryImages = [
  { id: 1, src: '/lovable-uploads/c7a6954d-bc9b-4918-a538-324714ed44ca.png', alt: 'Descent Journey', aspect: 'aspect-[4/5]' },
  { id: 2, src: '/lovable-uploads/d1d43a89-126d-4d9d-8ff2-e41305aaa6c3.png', alt: 'Ascent Transformation', aspect: 'aspect-[3/4]' },
  { id: 3, src: '/api/placeholder/600/400', alt: 'Moment of Pause', aspect: 'aspect-[3/2]' },
  { id: 4, src: '/api/placeholder/400/600', alt: 'Inner Light', aspect: 'aspect-[2/3]' },
  { id: 5, src: '/api/placeholder/500/300', alt: 'Emergence', aspect: 'aspect-[5/3]' },
  { id: 6, src: '/api/placeholder/300/400', alt: 'Reflection', aspect: 'aspect-[3/4]' },
  { id: 7, src: '/api/placeholder/600/800', alt: 'Rising Energy', aspect: 'aspect-[3/4]' },
  { id: 8, src: '/api/placeholder/400/300', alt: 'New Beginning', aspect: 'aspect-[4/3]' },
  { id: 9, src: '/api/placeholder/500/700', alt: 'Transformation', aspect: 'aspect-[5/7]' }
];

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-section mb-6">
            Visual <span className="text-gradient-ascent">Journey</span>
          </h2>
          <p className="text-poetic max-w-2xl mx-auto">
            Moments captured along the path of transformation. Each image tells a story 
            of descent, reflection, and triumphant rise.
          </p>
        </div>

        <div className="masonry-grid">
          {galleryImages.map((image, index) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <div 
                  className="masonry-item group cursor-pointer relative overflow-hidden rounded-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className={`${image.aspect} relative`}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ZoomIn className="h-8 w-8 text-white transform scale-75 group-hover:scale-100 transition-transform" />
                    </div>
                    
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 rounded-xl ring-1 ring-white/20 group-hover:ring-primary/50 transition-all duration-300" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-black/95 border-0">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white text-lg font-medium">{image.alt}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};
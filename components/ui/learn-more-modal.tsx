'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useModalContent } from '@/lib/hooks/useSupabaseData';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';

interface LearnMoreModalProps {
  modalKey: string;
  triggerText?: string;
  triggerVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  triggerSize?: 'default' | 'sm' | 'lg' | 'icon';
  triggerClassName?: string;
}

export default function LearnMoreModal({
  modalKey,
  triggerText = 'Learn More',
  triggerVariant = 'default',
  triggerSize = 'default',
  triggerClassName = ''
}: LearnMoreModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { modalContent, loading, error } = useModalContent(modalKey);

  // Default content when no specific content is found or Supabase is not configured
  const defaultContent = {
    title: 'Learn More About Our Services',
    content: `
      <p>At UcheAnyanwu & Co., we're committed to providing exceptional legal services tailored to your specific needs. Our experienced team of attorneys brings decades of combined expertise to help you navigate complex legal challenges.</p>
      
      <h3>Why Choose Us?</h3>
      <ul>
        <li>25+ years of combined legal experience</li>
        <li>Proven track record of successful outcomes</li>
        <li>Personalized attention to every case</li>
        <li>Transparent communication throughout the process</li>
        <li>Competitive and fair pricing</li>
      </ul>
      
      <p>We understand that legal matters can be overwhelming, which is why we're here to guide you every step of the way. Contact us today to schedule a consultation and learn how we can help you achieve your goals.</p>
    `,
    image_url: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    button_text: 'Schedule Consultation'
  };

  // Use fetched content or fall back to default
  const content = modalContent || defaultContent;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={triggerVariant} 
          size={triggerSize}
          className={triggerClassName}
        >
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 mb-4">
            {content.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
              <span className="ml-2 text-slate-600">Loading content...</span>
            </div>
          )}

          {/* Content Display */}
          {!loading && (
            <>
              {/* Image */}
              {content.image_url && (
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src={content.image_url}
                    alt={content.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none text-slate-700"
                dangerouslySetInnerHTML={{ __html: content.content }}
              />

              {/* Call to Action */}
              <div className="flex justify-center pt-6 border-t">
                <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    {content.button_text} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-8">
              <p className="text-slate-600 mb-4">
                Unable to load specific content, but here's what you need to know:
              </p>
              <div 
                className="prose prose-lg max-w-none text-slate-700"
                dangerouslySetInnerHTML={{ __html: defaultContent.content }}
              />
              <div className="flex justify-center pt-6 border-t">
                <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    {defaultContent.button_text} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
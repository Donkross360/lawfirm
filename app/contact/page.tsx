'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { sendConsultationEmail } from '@/lib/supabase';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error, adminEmail } = await sendConsultationEmail(data);
      
      if (error) {
        toast.error('Failed to send message. Please try again.');
        console.error('Contact submission error:', error);
      } else {
        toast.success(`Thank you for your message! We'll be in touch within 24 hours. A notification has been sent to ${adminEmail}.`);
        reset();
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
      console.error('Contact submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold">Contact Us</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ready to discuss your legal needs? Our experienced team is here to help. Contact us today for a consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Schedule a Consultation</h2>
                  <p className="text-slate-600 mb-8">
                    Fill out the form below and we'll get back to you within 24 hours. Your consultation request will be sent directly to our team.
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          {...register('name')}
                          className="mt-2"
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          className="mt-2"
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          {...register('phone')}
                          className="mt-2"
                          placeholder="(555) 123-4567"
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Select onValueChange={(value) => setValue('subject', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corporate-law">Corporate Law</SelectItem>
                            <SelectItem value="ma">Mergers & Acquisitions</SelectItem>
                            <SelectItem value="ip">Intellectual Property</SelectItem>
                            <SelectItem value="employment">Employment Law</SelectItem>
                            <SelectItem value="litigation">Commercial Litigation</SelectItem>
                            <SelectItem value="real-estate">Real Estate Law</SelectItem>
                            <SelectItem value="consultation">General Consultation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.subject && (
                          <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        className="mt-2 min-h-32"
                        placeholder="Please describe your legal needs or questions..."
                      />
                      {errors.message && (
                        <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="bg-slate-900 hover:bg-slate-800 w-full md:w-auto"
                    >
                      {isSubmitting ? (
                        'Sending Message...'
                      ) : (
                        <>
                          Send Message <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-900">Address</h4>
                        <p className="text-slate-600 mt-1">
                          123 Legal Plaza<br />
                          Downtown District<br />
                          Abuja, NG 10001
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-900">Phone</h4>
                        <p className="text-slate-600 mt-1">(+234) 123-4567-890</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-900">Email</h4>
                        <p className="text-slate-600 mt-1">info@ucheanyawuandco.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-900">Business Hours</h4>
                        <p className="text-slate-600 mt-1">
                          Monday - Friday: 8:00 AM - 6:00 PM<br />
                          Saturday: 9:00 AM - 2:00 PM<br />
                          Sunday: Emergency Only
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-0 shadow-xl bg-slate-900 text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Emergency Contact</h3>
                  <p className="text-slate-300 mb-4">
                    For urgent legal matters outside of business hours, call our emergency line:
                  </p>
                  <p className="text-2xl font-bold text-amber-400">(+234) 123-HELP</p>
                  <p className="text-slate-300 text-sm mt-2">
                    Available 24/7 for existing clients
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Visit Our Office</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Located in the heart of the downtown legal district, our office is easily accessible by public transportation and offers convenient parking.
            </p>
          </motion.div>

          {/* Placeholder for map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-300 h-96 rounded-lg flex items-center justify-center"
          >
            <p className="text-slate-600 text-lg">Interactive Map Placeholder</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
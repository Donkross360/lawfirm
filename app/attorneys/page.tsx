'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAttorneys } from '@/lib/hooks/useSupabaseData';

export default function AttorneysPage() {
  const { attorneys, loading } = useAttorneys();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-navy to-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold">Our Attorneys</h1>
            <p className="text-xl text-gray-blue-300 max-w-3xl mx-auto">
              Meet our exceptional legal team - experienced professionals dedicated to achieving the best outcomes for our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Attorneys Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="border-0 shadow-lg bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                      <div className="h-80 md:h-full bg-gray-200"></div>
                      <CardContent className="p-8">
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-24 bg-gray-200 rounded mb-6"></div>
                        <div className="h-16 bg-gray-200 rounded mb-6"></div>
                        <div className="h-12 bg-gray-200 rounded mb-6"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {attorneys.map((attorney, index) => (
                <motion.div
                  key={attorney.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                      {/* Image */}
                      <div className="relative h-80 md:h-full">
                        <Image
                          src={attorney.image_url}
                          alt={attorney.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <CardContent className="p-8 flex flex-col justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-navy mb-2">{attorney.name}</h2>
                          <p className="text-gold font-semibold mb-4">{attorney.title}</p>
                          <p className="text-charcoal mb-6 line-clamp-4">{attorney.bio}</p>

                          {/* Expertise */}
                          <div className="mb-6">
                            <h4 className="font-semibold text-navy mb-3">Areas of Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {attorney.expertise.slice(0, 3).map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-gray-100 text-charcoal text-sm rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="space-y-2 mb-6">
                            <div className="flex items-center text-sm text-charcoal">
                              <Mail className="h-4 w-4 mr-2 text-gold" />
                              {attorney.email}
                            </div>
                            <div className="flex items-center text-sm text-charcoal">
                              <Phone className="h-4 w-4 mr-2 text-gold" />
                              {attorney.phone}
                            </div>
                          </div>
                        </div>

                        <Button asChild className="w-full bg-navy hover:bg-navy-800 text-white">
                          <Link href={`/attorneys/${attorney.slug}`}>
                            View Full Profile <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need Legal Representation?
            </h2>
            <p className="text-xl text-gray-blue-300 max-w-3xl mx-auto mb-8">
              Our experienced attorneys are ready to help you navigate your legal challenges. Contact us today for a consultation.
            </p>
            <Button size="lg" asChild className="bg-gold hover:bg-gold-600 text-navy font-semibold px-8 py-4 text-lg">
              <Link href="/contact">
                Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
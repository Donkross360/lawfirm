'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useServices } from '@/lib/hooks/useSupabaseData';

export default function ServicesPage() {
  const { services, loading } = useServices();

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
            <h1 className="text-5xl md:text-6xl font-bold">Our Services</h1>
            <p className="text-xl text-gray-blue-300 max-w-3xl mx-auto">
              Comprehensive legal services tailored to meet the diverse needs of our clients, from individuals to Fortune 500 companies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="h-full border-0 shadow-lg bg-white">
                    <CardContent className="p-8">
                      <div className="bg-gray-200 w-16 h-16 rounded-lg mb-6"></div>
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-16 bg-gray-200 rounded mb-6"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="space-y-3 mb-8">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="h-4 bg-gray-200 rounded"></div>
                        ))}
                      </div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <CardContent className="p-8">
                      <div className="bg-navy w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                        <div className="h-8 w-8 text-gold group-hover:text-navy transition-colors">
                          {/* Icon placeholder - would use dynamic icon rendering in real app */}
                          <div className="w-full h-full bg-current rounded" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-navy mb-4">{service.title}</h3>
                      <p className="text-charcoal mb-6">{service.description}</p>
                      
                      <div className="mb-8">
                        <h4 className="font-semibold text-navy mb-4">Key Services Include:</h4>
                        <ul className="space-y-3">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-charcoal">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button asChild className="w-full bg-navy hover:bg-navy-800 text-white">
                        <Link href="/contact">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Why Choose Our Legal Services
            </h2>
            <p className="text-xl text-charcoal max-w-3xl mx-auto">
              We combine deep legal expertise with innovative approaches to deliver exceptional results for our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Proven Expertise',
                description: '25+ years of combined experience across diverse practice areas with a track record of successful outcomes.'
              },
              {
                title: 'Client-Centric Approach',
                description: 'We listen to understand your unique needs and develop customized legal strategies tailored to your goals.'
              },
              {
                title: 'Innovative Solutions',
                description: 'We leverage the latest legal technology and methodologies to provide efficient and effective services.'
              },
              {
                title: 'Transparent Communication',
                description: 'Regular updates and clear explanations ensure you\'re always informed about your case progress.'
              },
              {
                title: 'Competitive Pricing',
                description: 'Fair and transparent pricing structures with no hidden fees - you know exactly what you\'re paying for.'
              },
              {
                title: '24/7 Support',
                description: 'Our team is available around the clock to address urgent legal matters and client concerns.'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg bg-white">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-navy mb-4">{benefit.title}</h3>
                    <p className="text-charcoal">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-blue-300 max-w-3xl mx-auto mb-8">
              Contact us today to discuss your legal needs and learn how our experienced team can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gold hover:bg-gold-600 text-navy font-semibold px-8 py-4 text-lg">
                <Link href="/contact">
                  Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-navy px-8 py-4 text-lg">
                <Link href="/attorneys">Meet Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
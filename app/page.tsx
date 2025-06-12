'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Users, Award, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedCounter from '@/components/ui/animated-counter';
import LearnMoreModal from '@/components/ui/learn-more-modal';
import { useAttorneys, useServices } from '@/lib/hooks/useSupabaseData';

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // Fetch data from Supabase
  const { attorneys, loading: attorneysLoading } = useAttorneys();
  const { services, loading: servicesLoading } = useServices();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2')] bg-cover bg-center opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-800/80" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Legal Excellence
              <span className="block text-gold">Redefined</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-blue-300 max-w-3xl mx-auto leading-relaxed">
              Providing exceptional legal services with integrity, expertise, and unwavering dedication to our clients' success since 1995.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gold hover:bg-gold-600 text-navy font-semibold px-8 py-4 text-lg">
                <Link href="/contact">
                  Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <LearnMoreModal 
                modalKey="hero-learn-more"
                triggerVariant="outline"
                triggerSize="lg"
                triggerClassName="border-white text-white hover:bg-white hover:text-navy px-8 py-4 text-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Users, number: 500, suffix: '+', label: 'Clients Served' },
              { icon: Award, number: 25, suffix: '+', label: 'Years Experience' },
              { icon: CheckCircle, number: 95, suffix: '%', label: 'Success Rate' },
              { icon: Clock, number: 24, suffix: '/7', label: 'Client Support' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-navy w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-gold" />
                </div>
                <div className="text-4xl font-bold text-navy mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-charcoal font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
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
              Our Practice Areas
            </h2>
            <p className="text-xl text-charcoal max-w-3xl mx-auto">
              We provide comprehensive legal services across multiple practice areas, delivering exceptional results for our clients.
            </p>
          </motion.div>

          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="h-full border-0 shadow-lg bg-white">
                    <CardContent className="p-8">
                      <div className="bg-gray-200 w-14 h-14 rounded-lg mb-6"></div>
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-6"></div>
                      <div className="space-y-2 mb-6">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service, index) => (
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
                      <div className="bg-navy w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                        <div className="h-7 w-7 text-gold group-hover:text-navy transition-colors">
                          {/* Icon placeholder - would use dynamic icon rendering in real app */}
                          <div className="w-full h-full bg-current rounded" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-navy mb-4">{service.title}</h3>
                      <p className="text-charcoal mb-6">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-charcoal">
                            <CheckCircle className="h-4 w-4 text-gold mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <LearnMoreModal 
                        modalKey={`service-${service.id}`}
                        triggerVariant="outline"
                        triggerSize="default"
                        triggerClassName="w-full border-navy text-navy hover:bg-navy hover:text-white"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" asChild className="bg-navy hover:bg-navy-800 text-white">
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-charcoal max-w-3xl mx-auto">
              Our experienced attorneys bring decades of combined expertise to serve your legal needs.
            </p>
          </motion.div>

          {attorneysLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="border-0 shadow-lg bg-white">
                    <div className="h-80 bg-gray-200"></div>
                    <CardContent className="p-8">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-16 bg-gray-200 rounded mb-6"></div>
                      <div className="flex gap-2 mb-6">
                        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                      </div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={attorney.image_url}
                        alt={attorney.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-navy mb-2">{attorney.name}</h3>
                      <p className="text-gold font-semibold mb-4">{attorney.title}</p>
                      <p className="text-charcoal mb-6 line-clamp-3">{attorney.bio}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {attorney.expertise.slice(0, 2).map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-gray-100 text-charcoal text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Button asChild variant="outline" className="w-full border-navy text-navy hover:bg-navy hover:text-white">
                        <Link href={`/attorneys/${attorney.slug}`}>View Profile</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" asChild className="bg-navy hover:bg-navy-800 text-white">
              <Link href="/attorneys">
                Meet All Attorneys <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
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
              Contact us today for a consultation and let us help you navigate your legal challenges with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gold hover:bg-gold-600 text-navy font-semibold px-8 py-4 text-lg">
                <Link href="/contact">
                  Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <LearnMoreModal 
                modalKey="cta-learn-more"
                triggerVariant="outline"
                triggerSize="lg"
                triggerClassName="border-white text-white hover:bg-white hover:text-navy px-8 py-4 text-lg"
                triggerText="Learn About Us"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
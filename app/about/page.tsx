'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Users, Globe, Heart, CheckCircle, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedCounter from '@/components/ui/animated-counter';

export default function AboutPage() {
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
            <h1 className="text-5xl md:text-6xl font-bold">About Us</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              For nearly three decades, UcheAnyanwu & Co. has been at the forefront of legal excellence, providing innovative solutions and unwavering advocacy for our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  Founded in 1995 by Uche Anyanwu, our firm began with a simple yet powerful vision: to provide exceptional legal services that combine deep expertise with genuine care for our clients' success.
                </p>
                <p>
                  What started as a small practice has grown into one of the region's most respected law firms, serving Fortune 500 companies, emerging businesses, and individuals alike. Our growth has been built on a foundation of trust, integrity, and results.
                </p>
                <p>
                  Today, we continue to honor our founding principles while embracing innovation and staying ahead of the evolving legal landscape. Every case we handle reflects our commitment to excellence and our dedication to achieving the best possible outcomes for our clients.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Law firm office"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our core values guide everything we do and shape how we serve our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Excellence',
                description: 'We strive for the highest standards in everything we do, from legal research to client communication.'
              },
              {
                icon: Heart,
                title: 'Integrity',
                description: 'We conduct our practice with honesty, transparency, and unwavering ethical standards.'
              },
              {
                icon: Users,
                title: 'Client-Focused',
                description: 'Our clients\' success is our success. We listen, understand, and deliver tailored solutions.'
              },
              {
                icon: Globe,
                title: 'Innovation',
                description: 'We embrace new technologies and methodologies to deliver more efficient and effective legal services.'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className="h-8 w-8 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                    <p className="text-slate-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg bg-slate-900 text-white">
                <CardContent className="p-12">
                  <div className="flex items-center mb-6">
                    <Target className="h-8 w-8 text-amber-400 mr-4" />
                    <h3 className="text-3xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    To provide exceptional legal services that protect our clients' interests, advance their goals, and contribute to their long-term success. We are committed to building lasting relationships based on trust, expertise, and results.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg bg-amber-400 text-slate-900">
                <CardContent className="p-12">
                  <div className="flex items-center mb-6">
                    <Globe className="h-8 w-8 text-slate-900 mr-4" />
                    <h3 className="text-3xl font-bold">Our Vision</h3>
                  </div>
                  <p className="text-slate-800 text-lg leading-relaxed">
                    To be recognized as the premier legal partner for businesses and individuals seeking sophisticated legal counsel, innovative solutions, and exceptional client service in an ever-evolving legal landscape.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">By the Numbers</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our track record speaks to our commitment to excellence and client success.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 500, suffix: '+', label: 'Satisfied Clients' },
              { number: 1200, suffix: '+', label: 'Cases Handled' },
              { number: 95, suffix: '%', label: 'Success Rate' },
              { number: 25, suffix: '+', label: 'Years of Excellence' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-amber-400 mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-slate-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Why Choose Us</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              What sets us apart in the legal industry and why clients trust us with their most important matters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'Proven track record of successful outcomes',
              'Deep industry expertise across multiple practice areas',
              'Personalized attention and tailored legal strategies',
              'Commitment to transparent communication',
              'Innovative use of technology for efficient service delivery',
              'Strong relationships with courts, regulators, and industry peers',
              'Comprehensive understanding of business and legal complexities',
              'Dedication to staying current with evolving laws and regulations'
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <CheckCircle className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
                <p className="text-slate-700 text-lg">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
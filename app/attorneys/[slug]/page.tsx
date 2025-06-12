import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, GraduationCap, Briefcase, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getAttorneyBySlug } from '@/lib/supabase';

interface AttorneyPageProps {
  params: {
    slug: string;
  };
}

export default async function AttorneyPage({ params }: AttorneyPageProps) {
  const { data: attorney, error } = await getAttorneyBySlug(params.slug);

  if (error || !attorney) {
    notFound();
  }

  return (
    <div className="pt-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" asChild>
          <Link href="/attorneys">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Attorneys
          </Link>
        </Button>
      </div>

      {/* Attorney Profile */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Attorney Image and Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="relative h-96">
                    <Image
                      src={attorney.image_url}
                      alt={attorney.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-8">
                    <h1 className="text-3xl font-bold text-navy mb-2">{attorney.name}</h1>
                    <p className="text-gold font-semibold text-lg mb-6">{attorney.title}</p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center text-charcoal">
                        <Mail className="h-5 w-5 mr-3 text-gold" />
                        <a href={`mailto:${attorney.email}`} className="hover:text-gold transition-colors">
                          {attorney.email}
                        </a>
                      </div>
                      <div className="flex items-center text-charcoal">
                        <Phone className="h-5 w-5 mr-3 text-gold" />
                        <a href={`tel:${attorney.phone}`} className="hover:text-gold transition-colors">
                          {attorney.phone}
                        </a>
                      </div>
                    </div>

                    <Button size="lg" asChild className="w-full bg-navy hover:bg-navy-800 text-white">
                      <Link href="/contact">Schedule Consultation</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Attorney Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Bio */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">About {attorney.name.split(' ')[0]}</h2>
                <div className="prose prose-lg text-charcoal max-w-none">
                  <p>{attorney.bio}</p>
                </div>
              </div>

              {/* Areas of Expertise */}
              <div>
                <div className="flex items-center mb-6">
                  <Award className="h-6 w-6 text-gold mr-3" />
                  <h2 className="text-2xl font-bold text-navy">Areas of Expertise</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {attorney.expertise.map((area) => (
                    <Card key={area} className="border-0 shadow-sm bg-gray-50">
                      <CardContent className="p-4">
                        <p className="font-medium text-charcoal">{area}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center mb-6">
                  <GraduationCap className="h-6 w-6 text-gold mr-3" />
                  <h2 className="text-2xl font-bold text-navy">Education</h2>
                </div>
                <div className="space-y-4">
                  {attorney.education.map((edu, index) => (
                    <Card key={index} className="border-0 shadow-sm bg-gray-50">
                      <CardContent className="p-4">
                        <p className="font-medium text-charcoal">{edu}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center mb-6">
                  <Briefcase className="h-6 w-6 text-gold mr-3" />
                  <h2 className="text-2xl font-bold text-navy">Professional Experience</h2>
                </div>
                <div className="space-y-4">
                  {attorney.experience.map((exp, index) => (
                    <Card key={index} className="border-0 shadow-sm bg-gray-50">
                      <CardContent className="p-4">
                        <p className="font-medium text-charcoal">{exp}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work with {attorney.name.split(' ')[0]}?</h2>
          <p className="text-xl text-gray-blue-300 max-w-3xl mx-auto mb-8">
            Schedule a consultation today to discuss your legal needs and learn how we can help.
          </p>
          <Button size="lg" asChild className="bg-gold hover:bg-gold-600 text-navy font-semibold px-8 py-4 text-lg">
            <Link href="/contact">Schedule Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
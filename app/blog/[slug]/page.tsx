import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-16">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <header className="mb-8">
          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime} min read
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-amber-400" />
              <span className="text-slate-600 font-medium">By {post.author}</span>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-xl text-slate-600 font-medium mb-8 leading-relaxed">
            {post.excerpt}
          </p>
          
          {/* Mock article content */}
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              {post.content}
            </p>
            
            <p>
              In today's rapidly evolving business landscape, staying compliant with legal requirements has become increasingly complex. Organizations must navigate a web of regulations that span multiple jurisdictions and practice areas, making it essential to work with experienced legal counsel who understand both the nuances of the law and the practical implications for your business.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Key Considerations</h2>
            
            <p>
              When evaluating your legal needs, it's important to consider several factors that can significantly impact your organization's success and risk profile. These considerations go beyond simple compliance and extend into strategic planning and operational efficiency.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Regulatory compliance requirements specific to your industry</li>
              <li>Risk assessment and mitigation strategies</li>
              <li>Contractual obligations and relationship management</li>
              <li>Intellectual property protection and monetization</li>
              <li>Employment law considerations and workplace policies</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Best Practices</h2>
            
            <p>
              Our experience working with clients across various industries has revealed several best practices that can help organizations navigate complex legal challenges more effectively. These strategies focus on proactive planning rather than reactive problem-solving.
            </p>

            <p>
              Regular legal health checks, comprehensive documentation practices, and ongoing education for key stakeholders are just a few of the approaches that can significantly reduce legal risks while supporting business objectives.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Looking Forward</h2>
            
            <p>
              As we look to the future, it's clear that the legal landscape will continue to evolve at an accelerated pace. New technologies, changing regulations, and shifting business models all contribute to an environment where proactive legal planning is more important than ever.
            </p>

            <p>
              Organizations that invest in comprehensive legal strategies today will be better positioned to capitalize on opportunities and navigate challenges in the years ahead. The key is to work with legal partners who understand both the current requirements and the trajectory of future developments.
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Legal Assistance?</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            If you have questions about this topic or need legal guidance for your specific situation, our experienced attorneys are here to help.
          </p>
          <Button size="lg" asChild className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold px-8 py-4 text-lg">
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
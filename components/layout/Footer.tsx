import Link from 'next/link';
import { Scale, Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gold p-2 rounded-lg">
                <Scale className="h-6 w-6 text-navy" />
              </div>
              <div>
                <h3 className="text-xl font-bold">UcheAnyanwu & Co.</h3>
                <p className="text-gray-blue-300 text-sm">Legal Excellence Since 1995</p>
              </div>
            </div>
            <p className="text-gray-blue-300 text-sm leading-relaxed">
              Providing exceptional legal services with integrity, expertise, and dedication to our clients' success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-blue-300 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-blue-300 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-blue-300 hover:text-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Our Attorneys', href: '/attorneys' },
                { name: 'Practice Areas', href: '/services' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-blue-300 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Practice Areas</h4>
            <ul className="space-y-3">
              {[
                'Corporate Law',
                'Mergers & Acquisitions',
                'Intellectual Property',
                'Employment Law',
                'Commercial Litigation',
                'Real Estate Law',
              ].map((area) => (
                <li key={area}>
                  <Link
                    href="/services"
                    className="text-gray-blue-300 hover:text-gold transition-colors text-sm"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-blue-300">
                  <p>123 Legal Plaza</p>
                  <p>Downtown District</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gold" />
                <span className="text-sm text-gray-blue-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold" />
                <span className="text-sm text-gray-blue-300">info@richardsonlaw.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-blue-300 text-sm">
              © 2024 UcheAnyanwu & Co.. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-blue-300 hover:text-gold transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-blue-300 hover:text-gold transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-blue-300 hover:text-gold transition-colors text-sm">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
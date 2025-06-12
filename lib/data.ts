import { Attorney, BlogPost, Service } from './types';

export const attorneys: Attorney[] = [
  {
    id: '1',
    name: 'Sarah Richardson',
    title: 'Managing Partner',
    image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Sarah Richardson brings over 20 years of experience in corporate law and litigation. As Managing Partner, she leads our team with exceptional dedication to client service and legal excellence.',
    email: 'sarah.richardson@lawfirm.com',
    phone: '(555) 123-4567',
    expertise: ['Corporate Law', 'Mergers & Acquisitions', 'Securities Law', 'Commercial Litigation'],
    education: ['Harvard Law School, J.D.', 'Yale University, B.A. Economics'],
    experience: [
      'Managing Partner, Richardson & Associates (2015-Present)',
      'Senior Partner, Davis & Partners (2010-2015)',
      'Associate, Sullivan & Cromwell LLP (2005-2010)'
    ],
    slug: 'sarah-richardson'
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Senior Partner',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Michael Chen specializes in intellectual property law and technology transactions. His expertise helps clients navigate complex IP landscapes and protect their innovations.',
    email: 'michael.chen@lawfirm.com',
    phone: '(555) 123-4568',
    expertise: ['Intellectual Property', 'Patent Law', 'Technology Transactions', 'Licensing'],
    education: ['Stanford Law School, J.D.', 'MIT, B.S. Computer Science'],
    experience: [
      'Senior Partner, Richardson & Associates (2012-Present)',
      'Partner, Wilson Sonsini Goodrich & Rosati (2008-2012)',
      'Associate, Cooley LLP (2004-2008)'
    ],
    slug: 'michael-chen'
  },
  {
    id: '3',
    name: 'Emily Thompson',
    title: 'Partner',
    image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Emily Thompson focuses on employment law and regulatory compliance. She helps businesses navigate the complex landscape of employment regulations and workplace issues.',
    email: 'emily.thompson@lawfirm.com',
    phone: '(555) 123-4569',
    expertise: ['Employment Law', 'Labor Relations', 'Regulatory Compliance', 'Workplace Investigations'],
    education: ['Columbia Law School, J.D.', 'University of Pennsylvania, B.A. Political Science'],
    experience: [
      'Partner, Richardson & Associates (2018-Present)',
      'Senior Associate, Littler Mendelson (2013-2018)',
      'Associate, Gibson Dunn & Crutcher (2009-2013)'
    ],
    slug: 'emily-thompson'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding the New Corporate Transparency Act Requirements',
    slug: 'corporate-transparency-act-requirements',
    excerpt: 'What businesses need to know about the new beneficial ownership reporting requirements and compliance deadlines.',
    content: 'The Corporate Transparency Act represents a significant shift in regulatory compliance requirements for many businesses...',
    image: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Sarah Richardson',
    category: 'Corporate Law',
    publishedAt: '2024-01-15',
    readTime: 8,
    tags: ['Corporate Law', 'Compliance', 'Regulation']
  },
  {
    id: '2',
    title: 'Protecting Your Intellectual Property in the Digital Age',
    slug: 'protecting-ip-digital-age',
    excerpt: 'Essential strategies for safeguarding your intellectual property assets in an increasingly digital business environment.',
    content: 'In today\'s digital landscape, protecting intellectual property has become more complex and more critical than ever...',
    image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Michael Chen',
    category: 'Intellectual Property',
    publishedAt: '2024-01-10',
    readTime: 6,
    tags: ['IP Law', 'Technology', 'Digital Rights']
  },
  {
    id: '3',
    title: 'Remote Work Policies: Legal Considerations for Employers',
    slug: 'remote-work-legal-considerations',
    excerpt: 'Key employment law issues to consider when implementing or updating remote work policies.',
    content: 'As remote work continues to be a permanent fixture in many organizations, employers must carefully consider...',
    image: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Emily Thompson',
    category: 'Employment Law',
    publishedAt: '2024-01-05',
    readTime: 7,
    tags: ['Employment Law', 'Remote Work', 'HR Policies']
  }
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Corporate Law',
    description: 'Comprehensive corporate legal services including entity formation, governance, and compliance.',
    icon: 'Building',
    features: [
      'Entity Formation & Structure',
      'Corporate Governance',
      'Regulatory Compliance',
      'Board Advisory Services'
    ]
  },
  {
    id: '2',
    title: 'Mergers & Acquisitions',
    description: 'Strategic guidance through complex M&A transactions from due diligence to closing.',
    icon: 'Handshake',
    features: [
      'Due Diligence',
      'Transaction Structuring',
      'Negotiation Support',
      'Post-Closing Integration'
    ]
  },
  {
    id: '3',
    title: 'Intellectual Property',
    description: 'Protect and monetize your intellectual property assets with our comprehensive IP services.',
    icon: 'Lightbulb',
    features: [
      'Patent & Trademark Registration',
      'IP Portfolio Management',
      'Licensing Agreements',
      'IP Litigation'
    ]
  },
  {
    id: '4',
    title: 'Employment Law',
    description: 'Navigate employment regulations and workplace issues with expert legal guidance.',
    icon: 'Users',
    features: [
      'Employment Compliance',
      'Workplace Investigations',
      'Employee Handbook Development',
      'Labor Relations'
    ]
  },
  {
    id: '5',
    title: 'Commercial Litigation',
    description: 'Experienced representation in complex commercial disputes and litigation matters.',
    icon: 'Scale',
    features: [
      'Business Disputes',
      'Contract Litigation',
      'Regulatory Enforcement',
      'Alternative Dispute Resolution'
    ]
  },
  {
    id: '6',
    title: 'Real Estate Law',
    description: 'Comprehensive real estate legal services for commercial and residential transactions.',
    icon: 'Home',
    features: [
      'Property Transactions',
      'Commercial Leasing',
      'Real Estate Development',
      'Zoning & Land Use'
    ]
  }
];
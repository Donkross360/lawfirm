-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create attorneys table
CREATE TABLE attorneys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  image_url TEXT NOT NULL,
  expertise TEXT[] NOT NULL DEFAULT '{}',
  education TEXT[] NOT NULL DEFAULT '{}',
  experience TEXT[] NOT NULL DEFAULT '{}',
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  read_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT NOT NULL,
  site_description TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  address TEXT NOT NULL,
  business_hours JSONB DEFAULT '{}',
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_attorneys_updated_at BEFORE UPDATE ON attorneys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE attorneys ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read attorneys" ON attorneys FOR SELECT USING (true);
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public can read services" ON services FOR SELECT USING (true);

-- Create policies for authenticated users (admin access)
CREATE POLICY "Authenticated users can manage attorneys" ON attorneys FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage contact submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage site settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Allow public to insert contact submissions
CREATE POLICY "Public can insert contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Insert sample data
INSERT INTO attorneys (name, title, bio, email, phone, image_url, expertise, education, experience, slug) VALUES
('Uche Anyanwu', 'Managing Partner', 'Uche Anyanwu brings over 20 years of experience in corporate law and litigation. As Managing Partner, she leads our team with exceptional dedication to client service and legal excellence.', 'uche@ucheanyanwuandco.com', '(555) 123-4567', 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['Corporate Law', 'Mergers & Acquisitions', 'Securities Law', 'Commercial Litigation'], ARRAY['Harvard Law School, J.D.', 'Yale University, B.A. Economics'], ARRAY['Managing Partner, UcheAnyanwu & Co. (2015-Present)', 'Senior Partner, Davis & Partners (2010-2015)', 'Associate, Sullivan & Cromwell LLP (2005-2010)'], 'uche-anyanwu'),
('Michael Chen', 'Senior Partner', 'Michael Chen specializes in intellectual property law and technology transactions. His expertise helps clients navigate complex IP landscapes and protect their innovations.', 'michael.chen@lawfirm.com', '(555) 123-4568', 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['Intellectual Property', 'Patent Law', 'Technology Transactions', 'Licensing'], ARRAY['Stanford Law School, J.D.', 'MIT, B.S. Computer Science'], ARRAY['Senior Partner, UcheAnyanwu & Co. (2012-Present)', 'Partner, Wilson Sonsini Goodrich & Rosati (2008-2012)', 'Associate, Cooley LLP (2004-2008)'], 'michael-chen'),
('Emily Thompson', 'Partner', 'Emily Thompson focuses on employment law and regulatory compliance. She helps businesses navigate the complex landscape of employment regulations and workplace issues.', 'emily.thompson@lawfirm.com', '(555) 123-4569', 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['Employment Law', 'Labor Relations', 'Regulatory Compliance', 'Workplace Investigations'], ARRAY['Columbia Law School, J.D.', 'University of Pennsylvania, B.A. Political Science'], ARRAY['Partner, UcheAnyanwu & Co. (2018-Present)', 'Senior Associate, Littler Mendelson (2013-2018)', 'Associate, Gibson Dunn & Crutcher (2009-2013)'], 'emily-thompson');

INSERT INTO services (title, description, icon, features) VALUES
('Corporate Law', 'Comprehensive corporate legal services including entity formation, governance, and compliance.', 'Building', ARRAY['Entity Formation & Structure', 'Corporate Governance', 'Regulatory Compliance', 'Board Advisory Services']),
('Mergers & Acquisitions', 'Strategic guidance through complex M&A transactions from due diligence to closing.', 'Handshake', ARRAY['Due Diligence', 'Transaction Structuring', 'Negotiation Support', 'Post-Closing Integration']),
('Intellectual Property', 'Protect and monetize your intellectual property assets with our comprehensive IP services.', 'Lightbulb', ARRAY['Patent & Trademark Registration', 'IP Portfolio Management', 'Licensing Agreements', 'IP Litigation']),
('Employment Law', 'Navigate employment regulations and workplace issues with expert legal guidance.', 'Users', ARRAY['Employment Compliance', 'Workplace Investigations', 'Employee Handbook Development', 'Labor Relations']),
('Commercial Litigation', 'Experienced representation in complex commercial disputes and litigation matters.', 'Scale', ARRAY['Business Disputes', 'Contract Litigation', 'Regulatory Enforcement', 'Alternative Dispute Resolution']),
('Real Estate Law', 'Comprehensive real estate legal services for commercial and residential transactions.', 'Home', ARRAY['Property Transactions', 'Commercial Leasing', 'Real Estate Development', 'Zoning & Land Use']);

INSERT INTO blog_posts (title, slug, excerpt, content, image_url, author, category, tags, published, published_at, read_time) VALUES
('Understanding the New Corporate Transparency Act Requirements', 'corporate-transparency-act-requirements', 'What businesses need to know about the new beneficial ownership reporting requirements and compliance deadlines.', 'The Corporate Transparency Act represents a significant shift in regulatory compliance requirements for many businesses...', 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Uche Anyanwu', 'Corporate Law', ARRAY['Corporate Law', 'Compliance', 'Regulation'], true, '2024-01-15T00:00:00Z', 8),
('Protecting Your Intellectual Property in the Digital Age', 'protecting-ip-digital-age', 'Essential strategies for safeguarding your intellectual property assets in an increasingly digital business environment.', 'In today''s digital landscape, protecting intellectual property has become more complex and more critical than ever...', 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Michael Chen', 'Intellectual Property', ARRAY['IP Law', 'Technology', 'Digital Rights'], true, '2024-01-10T00:00:00Z', 6),
('Remote Work Policies: Legal Considerations for Employers', 'remote-work-legal-considerations', 'Key employment law issues to consider when implementing or updating remote work policies.', 'As remote work continues to be a permanent fixture in many organizations, employers must carefully consider...', 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Emily Thompson', 'Employment Law', ARRAY['Employment Law', 'Remote Work', 'HR Policies'], true, '2024-01-05T00:00:00Z', 7);

INSERT INTO site_settings (site_name, site_description, contact_email, contact_phone, address, business_hours, social_links) VALUES
('UcheAnyanwu & Co.', 'Premier Law Firm providing exceptional legal services with integrity and expertise.', 'info@ucheanyanwuandco.com', '(555) 123-4567', '123 Legal Plaza, Downtown District, New York, NY 10001', 
'{"monday": "8:00 AM - 6:00 PM", "tuesday": "8:00 AM - 6:00 PM", "wednesday": "8:00 AM - 6:00 PM", "thursday": "8:00 AM - 6:00 PM", "friday": "8:00 AM - 6:00 PM", "saturday": "9:00 AM - 2:00 PM", "sunday": "Emergency Only"}',
'{"facebook": "#", "twitter": "#", "linkedin": "#"}');
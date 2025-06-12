-- Create modal_content table
CREATE TABLE modal_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  button_text TEXT DEFAULT 'Learn More',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add updated_at trigger
CREATE TRIGGER update_modal_content_updated_at 
  BEFORE UPDATE ON modal_content 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE modal_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can read active modal content" 
  ON modal_content FOR SELECT 
  USING (active = true);

CREATE POLICY "Authenticated users can manage modal content" 
  ON modal_content FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert sample modal content
INSERT INTO modal_content (key, title, content, image_url, button_text, active) VALUES
('hero-learn-more', 'About Richardson & Associates', 
'<p>Founded in 1995, Richardson & Associates has grown from a small practice to one of the region''s most respected law firms. Our commitment to excellence, integrity, and client service has been the foundation of our success.</p>
<h3>Our Approach</h3>
<p>We believe that exceptional legal representation requires more than just knowledge of the law. It demands understanding our clients'' businesses, their challenges, and their goals. This client-centric approach allows us to provide strategic counsel that goes beyond legal advice.</p>
<h3>Why Choose Us</h3>
<ul>
<li>25+ years of combined experience</li>
<li>Proven track record of successful outcomes</li>
<li>Personalized attention to every case</li>
<li>Innovative legal solutions</li>
<li>Transparent communication throughout the process</li>
</ul>', 
'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
'Learn More', true),

('cta-learn-more', 'Why Richardson & Associates?', 
'<p>When you choose Richardson & Associates, you''re not just hiring a law firm – you''re partnering with a team of dedicated professionals who are committed to your success.</p>
<h3>Our Commitment</h3>
<p>We understand that legal issues can be stressful and overwhelming. That''s why we''re committed to making the process as smooth and transparent as possible. From your initial consultation to the resolution of your matter, we''ll keep you informed every step of the way.</p>
<h3>Areas of Excellence</h3>
<ul>
<li>Corporate Law & Business Formation</li>
<li>Mergers & Acquisitions</li>
<li>Intellectual Property Protection</li>
<li>Employment Law & HR Compliance</li>
<li>Commercial Litigation</li>
<li>Real Estate Transactions</li>
</ul>
<p>Ready to get started? Contact us today for a consultation and let us help you navigate your legal challenges with confidence.</p>', 
'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
'Learn About Us', true),

('service-1', 'Corporate Law Services', 
'<p>Our corporate law practice provides comprehensive legal services to businesses of all sizes, from startups to Fortune 500 companies. We understand the complexities of modern business and provide strategic counsel that supports your growth objectives.</p>
<h3>Entity Formation & Structure</h3>
<p>We help you choose the right business structure and handle all aspects of entity formation, including:</p>
<ul>
<li>Corporation and LLC formation</li>
<li>Partnership agreements</li>
<li>Operating agreements</li>
<li>Shareholder agreements</li>
<li>Buy-sell agreements</li>
</ul>
<h3>Corporate Governance</h3>
<p>Proper governance is essential for business success. We provide ongoing counsel on:</p>
<ul>
<li>Board of directors matters</li>
<li>Corporate compliance</li>
<li>Securities law compliance</li>
<li>Corporate restructuring</li>
<li>Executive compensation</li>
</ul>', 
'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
'Learn More', true);
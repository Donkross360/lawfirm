/*
  # Updated seed data for modal content

  1. Modal Content Updates
    - Fix service modal keys to match actual service IDs from database
    - Update content to be more comprehensive and professional
    - Ensure all modal content is properly formatted

  2. Security
    - Maintains existing RLS policies
    - No changes to table structure
*/

-- Clear existing modal content to avoid conflicts
DELETE FROM modal_content;

-- Insert updated modal content with correct keys
INSERT INTO modal_content (key, title, content, image_url, button_text, active) VALUES
('hero-learn-more', 'About UcheAnyanwu & Co.', 
'<div class="space-y-6">
  <p class="text-lg">Founded in 1995, UcheAnyanwu & Co. has grown from a small practice to one of the region''s most respected law firms. Our commitment to excellence, integrity, and client service has been the foundation of our success for nearly three decades.</p>
  
  <div>
    <h3 class="text-xl font-semibold mb-3 text-navy">Our Approach</h3>
    <p>We believe that exceptional legal representation requires more than just knowledge of the law. It demands understanding our clients'' businesses, their challenges, and their goals. This client-centric approach allows us to provide strategic counsel that goes beyond legal advice.</p>
  </div>
  
  <div>
    <h3 class="text-xl font-semibold mb-3 text-navy">Why Choose Us</h3>
    <ul class="space-y-2">
      <li class="flex items-start"><span class="text-gold mr-2">•</span>25+ years of combined experience across diverse practice areas</li>
      <li class="flex items-start"><span class="text-gold mr-2">•</span>Proven track record of successful outcomes for our clients</li>
      <li class="flex items-start"><span class="text-gold mr-2">•</span>Personalized attention and tailored legal strategies</li>
      <li class="flex items-start"><span class="text-gold mr-2">•</span>Innovative legal solutions using cutting-edge technology</li>
      <li class="flex items-start"><span class="text-gold mr-2">•</span>Transparent communication throughout the entire process</li>
    </ul>
  </div>
  
  <p class="text-lg font-medium text-navy">Ready to experience the Richardson & Associates difference? Contact us today for a consultation.</p>
</div>', 
'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
'Learn More', true),

('cta-learn-more', 'Why UcheAnyanwu & Co.?', 
'<div class="space-y-6">
  <p class="text-lg">When you choose Richardson & Associates, you''re not just hiring a law firm – you''re partnering with a team of dedicated professionals who are committed to your success and understand the complexities of today''s legal landscape.</p>
  
  <div>
    <h3 class="text-xl font-semibold mb-3 text-navy">Our Commitment to Excellence</h3>
    <p>We understand that legal issues can be stressful and overwhelming. That''s why we''re committed to making the process as smooth and transparent as possible. From your initial consultation to the resolution of your matter, we''ll keep you informed every step of the way.</p>
  </div>
  
  <div>
    <h3 class="text-xl font-semibold mb-3 text-navy">Comprehensive Legal Services</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h4 class="font-semibold text-gold mb-2">Business Law</h4>
        <ul class="space-y-1 text-sm">
          <li>• Corporate Law & Business Formation</li>
          <li>• Mergers & Acquisitions</li>
          <li>• Commercial Litigation</li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-gold mb-2">Specialized Practice</h4>
        <ul class="space-y-1 text-sm">
          <li>• Intellectual Property Protection</li>
          <li>• Employment Law & HR Compliance</li>
          <li>• Real Estate Transactions</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="bg-gray-50 p-4 rounded-lg">
    <p class="text-center font-medium text-navy">Ready to get started? Contact us today for a consultation and let us help you navigate your legal challenges with confidence.</p>
  </div>
</div>', 
'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
'Learn About Us', true);

-- Insert service-specific modal content using the actual service IDs from the services table
INSERT INTO modal_content (key, title, content, image_url, button_text, active)
SELECT 
  CONCAT('service-', s.id),
  CONCAT(s.title, ' - Comprehensive Legal Services'),
  CONCAT(
    '<div class="space-y-6">',
    '<p class="text-lg">', s.description, '</p>',
    '<div>',
    '<h3 class="text-xl font-semibold mb-3 text-navy">Our ', s.title, ' Services Include:</h3>',
    '<ul class="space-y-2">',
    CASE 
      WHEN array_length(s.features, 1) >= 1 THEN CONCAT('<li class="flex items-start"><span class="text-gold mr-2">•</span>', s.features[1], '</li>')
      ELSE ''
    END,
    CASE 
      WHEN array_length(s.features, 1) >= 2 THEN CONCAT('<li class="flex items-start"><span class="text-gold mr-2">•</span>', s.features[2], '</li>')
      ELSE ''
    END,
    CASE 
      WHEN array_length(s.features, 1) >= 3 THEN CONCAT('<li class="flex items-start"><span class="text-gold mr-2">•</span>', s.features[3], '</li>')
      ELSE ''
    END,
    CASE 
      WHEN array_length(s.features, 1) >= 4 THEN CONCAT('<li class="flex items-start"><span class="text-gold mr-2">•</span>', s.features[4], '</li>')
      ELSE ''
    END,
    '</ul>',
    '</div>',
    '<div class="bg-gray-50 p-4 rounded-lg">',
    '<h4 class="font-semibold text-navy mb-2">Why Choose Our ', s.title, ' Services?</h4>',
    '<p>Our experienced attorneys combine deep legal expertise with practical business knowledge to deliver results that matter. We work closely with our clients to understand their unique needs and develop customized strategies that align with their goals.</p>',
    '</div>',
    '<p class="text-center font-medium text-navy">Ready to discuss your ', LOWER(s.title), ' needs? Contact us today for a consultation.</p>',
    '</div>'
  ),
  'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Learn More',
  true
FROM services s;
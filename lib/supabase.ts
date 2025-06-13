import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Create a mock response for when Supabase is not configured
const mockResponse = { data: null, error: { message: 'Supabase not configured. Please set up your environment variables.' } };
const mockArrayResponse = { data: [], error: null };

// Create Supabase client or mock client
let supabase: any;

if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-project.supabase.co') {
  try {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Failed to create Supabase client:', error);
    supabase = createMockClient();
  }
} else {
  if (isBrowser) {
    console.warn('Supabase not configured. Using mock client. Please update your .env.local file with your Supabase credentials.');
  }
  supabase = createMockClient();
}

function createMockClient() {
  const createChainableQuery = () => {
    const query = {
      eq: (column: string, value: any) => query,
      single: async () => mockResponse,
      order: (column: string, options?: any) => mockArrayResponse
    };
    return query;
  };

  return {
    auth: {
      signInWithPassword: async () => mockResponse,
      signUp: async () => mockResponse,
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ 
        data: { 
          subscription: { 
            unsubscribe: () => {} 
          } 
        } 
      })
    },
    from: (table: string) => ({
      select: (columns?: string) => createChainableQuery(),
      insert: (data: any) => ({
        select: (columns?: string) => ({
          single: async () => mockResponse
        })
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          select: (columns?: string) => ({
            single: async () => mockResponse
          })
        })
      }),
      delete: () => ({
        eq: async (column: string, value: any) => ({ error: null })
      })
    })
  };
}

export { supabase };

// Auth helpers
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database helpers
export const getAttorneys = async () => {
  const { data, error } = await supabase
    .from('attorneys')
    .select('*')
    .order('created_at', { ascending: true });
  return { data, error };
};

export const getAttorneyBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('attorneys')
    .select('*')
    .eq('slug', slug)
    .single();
  return { data, error };
};

export const getBlogPosts = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
  return { data, error };
};

export const getBlogPostBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  return { data, error };
};

export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: true });
  return { data, error };
};

export const createContactSubmission = async (submission: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([submission])
    .select()
    .single();
  return { data, error };
};

export const getContactSubmissions = async () => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

// Site settings helpers
export const getSiteSettings = async () => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single();
  return { data, error };
};

export const updateSiteSettings = async (settings: {
  site_name?: string;
  site_description?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  business_hours?: any;
  social_links?: any;
}) => {
  const { data, error } = await supabase
    .from('site_settings')
    .update(settings)
    .eq('id', (await getSiteSettings()).data?.id)
    .select()
    .single();
  return { data, error };
};

// Modal content helpers
export const getModalContent = async (key: string) => {
  const { data, error } = await supabase
    .from('modal_content')
    .select('*')
    .eq('key', key)
    .eq('active', true)
    .limit(1);
  
  // Return the first item from the array, or null if no data
  return { data: data && data.length > 0 ? data[0] : null, error };
};

export const getAllModalContent = async () => {
  const { data, error } = await supabase
    .from('modal_content')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const createModalContent = async (content: {
  key: string;
  title: string;
  content: string;
  image_url?: string;
  button_text?: string;
  active?: boolean;
}) => {
  const { data, error } = await supabase
    .from('modal_content')
    .insert([{
      ...content,
      button_text: content.button_text || 'Learn More',
      active: content.active ?? true
    }])
    .select()
    .single();
  return { data, error };
};

export const updateModalContent = async (id: string, updates: {
  key?: string;
  title?: string;
  content?: string;
  image_url?: string;
  button_text?: string;
  active?: boolean;
}) => {
  const { data, error } = await supabase
    .from('modal_content')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteModalContent = async (id: string) => {
  const { error } = await supabase
    .from('modal_content')
    .delete()
    .eq('id', id);
  return { error };
};

// Email notification helper
export const sendConsultationEmail = async (formData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  try {
    // Get the admin email from site settings
    const { data: settings } = await getSiteSettings();
    const adminEmail = settings?.contact_email || 'info@ucheanyanwuandco.com';

    // In a real application, you would use a service like:
    // - Supabase Edge Functions with email service
    // - SendGrid, Mailgun, or similar email service
    // - Resend, Postmark, etc.
    
    // For now, we'll just log the email details and save to database
    console.log('Consultation request email would be sent to:', adminEmail);
    console.log('Email content:', {
      to: adminEmail,
      subject: `New Consultation Request from ${formData.name}`,
      body: `
        New consultation request received:
        
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Subject: ${formData.subject}
        
        Message:
        ${formData.message}
        
        Please respond to this inquiry as soon as possible.
      `
    });

    // Save the submission to the database
    const { data, error } = await createContactSubmission(formData);
    
    return { data, error, adminEmail };
  } catch (error) {
    console.error('Error sending consultation email:', error);
    return { data: null, error, adminEmail: null };
  }
};

// Attorney CRUD operations
export const createAttorney = async (attorney: {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  image_url: string;
  expertise: string[];
  education: string[];
  experience: string[];
  slug: string;
}) => {
  const { data, error } = await supabase
    .from('attorneys')
    .insert([attorney])
    .select()
    .single();
  return { data, error };
};

export const updateAttorney = async (id: string, updates: Partial<{
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  image_url: string;
  expertise: string[];
  education: string[];
  experience: string[];
  slug: string;
}>) => {
  const { data, error } = await supabase
    .from('attorneys')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteAttorney = async (id: string) => {
  const { error } = await supabase
    .from('attorneys')
    .delete()
    .eq('id', id);
  return { error };
};

// Service CRUD operations
export const createService = async (service: {
  title: string;
  description: string;
  icon: string;
  features: string[];
}) => {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single();
  return { data, error };
};

export const updateService = async (id: string, updates: Partial<{
  title: string;
  description: string;
  icon: string;
  features: string[];
}>) => {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteService = async (id: string) => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);
  return { error };
};

// Blog post CRUD operations
export const createBlogPost = async (post: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  read_time?: number;
}) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{ 
      ...post, 
      published_at: post.published ? new Date().toISOString() : null,
      read_time: post.read_time || 5
    }])
    .select()
    .single();
  return { data, error };
};

export const updateBlogPost = async (id: string, updates: Partial<{
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  read_time: number;
}>) => {
  // Create the update data with proper typing
  const updateData: any = { ...updates };
  
  // Handle published_at field separately
  if (updates.published !== undefined) {
    updateData.published_at = updates.published ? new Date().toISOString() : null;
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteBlogPost = async (id: string) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  return { error };
};

// Contact submission management
export const updateContactSubmissionStatus = async (id: string, status: 'new' | 'read' | 'responded' | 'archived') => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteContactSubmission = async (id: string) => {
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);
  return { error };
};
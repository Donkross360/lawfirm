'use client';

import { useEffect, useState } from 'react';
import { 
  getAttorneys, 
  getBlogPosts, 
  getServices, 
  getContactSubmissions,
  getAllModalContent,
  getModalContent
} from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type Attorney = Database['public']['Tables']['attorneys']['Row'];
type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type Service = Database['public']['Tables']['services']['Row'];
type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];
type ModalContent = Database['public']['Tables']['modal_content']['Row'];

export function useAttorneys() {
  const [attorneys, setAttorneys] = useState<Attorney[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttorneys = async () => {
      const { data, error } = await getAttorneys();
      if (error) {
        setError(error.message);
      } else {
        setAttorneys(data || []);
      }
      setLoading(false);
    };

    fetchAttorneys();
  }, []);

  return { attorneys, loading, error, refetch: () => setLoading(true) };
}

export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data, error } = await getBlogPosts();
      if (error) {
        setError(error.message);
      } else {
        setBlogPosts(data || []);
      }
      setLoading(false);
    };

    fetchBlogPosts();
  }, []);

  return { blogPosts, loading, error, refetch: () => setLoading(true) };
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await getServices();
      if (error) {
        setError(error.message);
      } else {
        setServices(data || []);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  return { services, loading, error, refetch: () => setLoading(true) };
}

export function useContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const { data, error } = await getContactSubmissions();
      if (error) {
        setError(error.message);
      } else {
        setSubmissions(data || []);
      }
      setLoading(false);
    };

    fetchSubmissions();
  }, []);

  return { submissions, loading, error, refetch: () => setLoading(true) };
}

export function useModalContent(key?: string) {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!key) {
      setLoading(false);
      return;
    }

    const fetchModalContent = async () => {
      const { data, error } = await getModalContent(key);
      if (error) {
        setError(error.message);
      } else {
        setModalContent(data);
      }
      setLoading(false);
    };

    fetchModalContent();
  }, [key]);

  return { modalContent, loading, error };
}

export function useAllModalContent() {
  const [modalContents, setModalContents] = useState<ModalContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setLoading(true);
    const { data, error } = await getAllModalContent();
    if (error) {
      setError(error.message);
    } else {
      setModalContents(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  return { modalContents, loading, error, refetch };
}
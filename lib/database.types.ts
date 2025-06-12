export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      attorneys: {
        Row: {
          id: string
          name: string
          title: string
          bio: string
          email: string
          phone: string
          image_url: string
          expertise: string[]
          education: string[]
          experience: string[]
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title: string
          bio: string
          email: string
          phone: string
          image_url: string
          expertise: string[]
          education: string[]
          experience: string[]
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string
          bio?: string
          email?: string
          phone?: string
          image_url?: string
          expertise?: string[]
          education?: string[]
          experience?: string[]
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          image_url: string
          author: string
          category: string
          tags: string[]
          published: boolean
          published_at: string | null
          read_time: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          image_url: string
          author: string
          category: string
          tags: string[]
          published?: boolean
          published_at?: string | null
          read_time?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          image_url?: string
          author?: string
          category?: string
          tags?: string[]
          published?: boolean
          published_at?: string | null
          read_time?: number
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          icon: string
          features: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon: string
          features: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string
          features?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          subject: string
          message: string
          status: 'new' | 'read' | 'responded' | 'archived'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          subject: string
          message: string
          status?: 'new' | 'read' | 'responded' | 'archived'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          subject?: string
          message?: string
          status?: 'new' | 'read' | 'responded' | 'archived'
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          site_name: string
          site_description: string
          contact_email: string
          contact_phone: string
          address: string
          business_hours: Json
          social_links: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          site_name: string
          site_description: string
          contact_email: string
          contact_phone: string
          address: string
          business_hours?: Json
          social_links?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          site_name?: string
          site_description?: string
          contact_email?: string
          contact_phone?: string
          address?: string
          business_hours?: Json
          social_links?: Json
          created_at?: string
          updated_at?: string
        }
      }
      modal_content: {
        Row: {
          id: string
          key: string
          title: string
          content: string
          image_url: string | null
          button_text: string
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          title: string
          content: string
          image_url?: string | null
          button_text?: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          title?: string
          content?: string
          image_url?: string | null
          button_text?: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
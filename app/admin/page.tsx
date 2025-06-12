'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, MessageSquare, BarChart3, Settings, LogOut, Eye, Trash2, Edit, Plus, Monitor, Briefcase, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useAuth } from '@/lib/hooks/useAuth';
import { useContactSubmissions, useAllModalContent, useAttorneys, useBlogPosts, useServices } from '@/lib/hooks/useSupabaseData';
import { 
  createModalContent, 
  updateModalContent, 
  deleteModalContent, 
  getSiteSettings, 
  updateSiteSettings,
  createAttorney,
  updateAttorney,
  deleteAttorney,
  createService,
  updateService,
  deleteService,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  updateContactSubmissionStatus,
  deleteContactSubmission
} from '@/lib/supabase';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await login(email, password);
      if (error) {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@richardsonlaw.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>
          </form>
          <p className="text-sm text-charcoal mt-4 text-center">
            Use your Supabase admin credentials to access the dashboard
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function ModalContentManager() {
  const { modalContents, loading, refetch } = useAllModalContent();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingModal, setEditingModal] = useState<any>(null);
  const [formData, setFormData] = useState({
    key: '',
    title: '',
    content: '',
    image_url: '',
    button_text: 'Learn More',
    active: true
  });

  const resetForm = () => {
    setFormData({
      key: '',
      title: '',
      content: '',
      image_url: '',
      button_text: 'Learn More',
      active: true
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await createModalContent(formData);
      if (error) {
        toast.error('Failed to create modal content');
      } else {
        toast.success('Modal content created successfully');
        setIsCreateModalOpen(false);
        resetForm();
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModal) return;

    try {
      const { error } = await updateModalContent(editingModal.id, formData);
      if (error) {
        toast.error('Failed to update modal content');
      } else {
        toast.success('Modal content updated successfully');
        setEditingModal(null);
        resetForm();
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this modal content?')) return;

    try {
      const { error } = await deleteModalContent(id);
      if (error) {
        toast.error('Failed to delete modal content');
      } else {
        toast.success('Modal content deleted successfully');
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const startEdit = (modal: any) => {
    setEditingModal(modal);
    setFormData({
      key: modal.key,
      title: modal.title,
      content: modal.content,
      image_url: modal.image_url || '',
      button_text: modal.button_text,
      active: modal.active
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Modal Content Management</CardTitle>
            <p className="text-sm text-charcoal mt-1">
              Manage content for "Learn More" modals that appear throughout the site
            </p>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-navy hover:bg-navy-800">
                <Plus className="h-4 w-4 mr-2" />
                Add Modal Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Modal Content</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <Label htmlFor="key">Key (unique identifier)</Label>
                  <Input
                    id="key"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    placeholder="e.g., hero-learn-more, service-1"
                    required
                  />
                  <p className="text-xs text-charcoal mt-1">
                    This identifies which "Learn More" button this content is for
                  </p>
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Modal title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content (HTML supported)</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Modal content..."
                    className="min-h-32"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL (optional)</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="button_text">Button Text</Label>
                  <Input
                    id="button_text"
                    value={formData.button_text}
                    onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                    placeholder="Learn More"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-navy hover:bg-navy-800">Create</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading modal content...</div>
        ) : modalContents.length === 0 ? (
          <div className="text-center py-8 text-charcoal">No modal content yet</div>
        ) : (
          <div className="space-y-4">
            {modalContents.map((modal) => (
              <div key={modal.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-navy">{modal.title}</h3>
                    <p className="text-sm text-charcoal">Key: {modal.key}</p>
                    <p className="text-sm text-charcoal">Button: {modal.button_text}</p>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <Badge variant={modal.active ? 'default' : 'secondary'}>
                      {modal.active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => startEdit(modal)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(modal.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-charcoal mb-2 line-clamp-2">{modal.content.replace(/<[^>]*>/g, '')}</p>
                <p className="text-xs text-soft-gray-blue">
                  Created: {new Date(modal.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        <Dialog open={!!editingModal} onOpenChange={(open) => !open && setEditingModal(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Modal Content</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label htmlFor="edit-key">Key</Label>
                <Input
                  id="edit-key"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-content">Content (HTML supported)</Label>
                <Textarea
                  id="edit-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="min-h-32"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-image_url">Image URL</Label>
                <Input
                  id="edit-image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-button_text">Button Text</Label>
                <Input
                  id="edit-button_text"
                  value={formData.button_text}
                  onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setEditingModal(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-navy hover:bg-navy-800">Update</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function AttorneyManager() {
  const { attorneys, loading, refetch } = useAttorneys();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAttorney, setEditingAttorney] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    image_url: '',
    expertise: [] as string[],
    education: [] as string[],
    experience: [] as string[],
    slug: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      bio: '',
      email: '',
      phone: '',
      image_url: '',
      expertise: [],
      education: [],
      experience: [],
      slug: ''
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await createAttorney(formData);
      if (error) {
        toast.error('Failed to create attorney profile');
      } else {
        toast.success('Attorney profile created successfully');
        setIsCreateModalOpen(false);
        resetForm();
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAttorney) return;

    try {
      const { error } = await updateAttorney(editingAttorney.id, formData);
      if (error) {
        toast.error('Failed to update attorney profile');
      } else {
        toast.success('Attorney profile updated successfully');
        setEditingAttorney(null);
        resetForm();
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (attorneyId: string, attorneyName: string) => {
    if (!confirm(`Are you sure you want to delete ${attorneyName}? This action cannot be undone.`)) return;

    try {
      const { error } = await deleteAttorney(attorneyId);
      if (error) {
        toast.error('Failed to delete attorney profile');
      } else {
        toast.success('Attorney profile deleted successfully');
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const startEdit = (attorney: any) => {
    setEditingAttorney(attorney);
    setFormData({
      name: attorney.name,
      title: attorney.title,
      bio: attorney.bio,
      email: attorney.email,
      phone: attorney.phone,
      image_url: attorney.image_url,
      expertise: attorney.expertise,
      education: attorney.education,
      experience: attorney.experience,
      slug: attorney.slug
    });
  };

  const handleArrayInput = (field: 'expertise' | 'education' | 'experience', value: string) => {
    const items = value.split('\n').filter(item => item.trim() !== '');
    setFormData({ ...formData, [field]: items });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Attorney Management</CardTitle>
            <p className="text-sm text-charcoal mt-1">
              Manage attorney profiles and information
            </p>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-navy hover:bg-navy-800">
                <Plus className="h-4 w-4 mr-2" />
                Add New Attorney
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Attorney Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Managing Partner"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="min-h-24"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/photo.jpg"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="john-doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="expertise">Areas of Expertise (one per line)</Label>
                  <Textarea
                    id="expertise"
                    value={formData.expertise.join('\n')}
                    onChange={(e) => handleArrayInput('expertise', e.target.value)}
                    placeholder="Corporate Law&#10;Mergers & Acquisitions&#10;Securities Law"
                    className="min-h-20"
                  />
                </div>
                <div>
                  <Label htmlFor="education">Education (one per line)</Label>
                  <Textarea
                    id="education"
                    value={formData.education.join('\n')}
                    onChange={(e) => handleArrayInput('education', e.target.value)}
                    placeholder="Harvard Law School, J.D.&#10;Yale University, B.A. Economics"
                    className="min-h-20"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Professional Experience (one per line)</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience.join('\n')}
                    onChange={(e) => handleArrayInput('experience', e.target.value)}
                    placeholder="Managing Partner, UcheAnyanwu & Co. (2015-Present)&#10;Senior Partner, Davis & Partners (2010-2015)"
                    className="min-h-20"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-navy hover:bg-navy-800">Create Attorney</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy mx-auto"></div>
            <p className="mt-2 text-charcoal">Loading attorneys...</p>
          </div>
        ) : attorneys.length === 0 ? (
          <div className="text-center py-8 text-charcoal">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No attorneys found in the database.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {attorneys.map((attorney) => (
              <div key={attorney.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={attorney.image_url} 
                        alt={attorney.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy text-lg">{attorney.name}</h3>
                      <p className="text-sm text-gold font-medium">{attorney.title}</p>
                      <p className="text-sm text-charcoal mt-1">{attorney.email}</p>
                      <p className="text-sm text-charcoal">{attorney.phone}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {attorney.expertise.slice(0, 3).map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-navy-50 text-navy text-xs rounded border">
                            {skill}
                          </span>
                        ))}
                        {attorney.expertise.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-charcoal text-xs rounded">
                            +{attorney.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => startEdit(attorney)}
                      className="hover:bg-navy hover:text-white"
                      title="Edit attorney profile"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(attorney.id, attorney.name)}
                      className="hover:bg-red-500 hover:text-white"
                      title="Delete attorney"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        <Dialog open={!!editingAttorney} onOpenChange={(open) => !open && setEditingAttorney(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Attorney Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-bio">Biography</Label>
                <Textarea
                  id="edit-bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="min-h-24"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-image_url">Image URL</Label>
                  <Input
                    id="edit-image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-slug">URL Slug</Label>
                  <Input
                    id="edit-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-expertise">Areas of Expertise (one per line)</Label>
                <Textarea
                  id="edit-expertise"
                  value={formData.expertise.join('\n')}
                  onChange={(e) => handleArrayInput('expertise', e.target.value)}
                  className="min-h-20"
                />
              </div>
              <div>
                <Label htmlFor="edit-education">Education (one per line)</Label>
                <Textarea
                  id="edit-education"
                  value={formData.education.join('\n')}
                  onChange={(e) => handleArrayInput('education', e.target.value)}
                  className="min-h-20"
                />
              </div>
              <div>
                <Label htmlFor="edit-experience">Professional Experience (one per line)</Label>
                <Textarea
                  id="edit-experience"
                  value={formData.experience.join('\n')}
                  onChange={(e) => handleArrayInput('experience', e.target.value)}
                  className="min-h-20"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setEditingAttorney(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-navy hover:bg-navy-800">Update Attorney</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function ServicesManager() {
  const { services, loading, refetch } = useServices();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    features: [] as string[]
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '',
      features: []
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await createService(formData);
      if (error) {
        toast.error('Failed to create service');
      } else {
        toast.success('Service created successfully');
        setIsCreateModalOpen(false);
        resetForm();
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const { error } = await updateService(editingService.id, formData);
      if (error) {
        toast.error('Failed to update service');
      } else {
        toast.success('Service updated successfully');
        setEditingService(null);
        resetForm();
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (serviceId: string, serviceTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${serviceTitle}"? This action cannot be undone.`)) return;

    try {
      const { error } = await deleteService(serviceId);
      if (error) {
        toast.error('Failed to delete service');
      } else {
        toast.success('Service deleted successfully');
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const startEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features
    });
  };

  const handleFeaturesInput = (value: string) => {
    const features = value.split('\n').filter(item => item.trim() !== '');
    setFormData({ ...formData, features });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Services Management</CardTitle>
            <p className="text-sm text-charcoal mt-1">
              Manage practice areas and legal services
            </p>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-navy hover:bg-navy-800">
                <Plus className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Service</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Corporate Law"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the service..."
                    className="min-h-20"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon Name</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., Building, Scale, Users"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="features">Key Features (one per line)</Label>
                  <Textarea
                    id="features"
                    value={formData.features.join('\n')}
                    onChange={(e) => handleFeaturesInput(e.target.value)}
                    placeholder="Entity Formation & Structure&#10;Corporate Governance&#10;Regulatory Compliance"
                    className="min-h-24"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-navy hover:bg-navy-800">Create Service</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy mx-auto"></div>
            <p className="mt-2 text-charcoal">Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-8 text-charcoal">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No services found in the database.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-gold rounded"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy text-lg">{service.title}</h3>
                      <p className="text-sm text-charcoal mt-1">{service.description}</p>
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-navy mb-2">Key Features:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                          {service.features.slice(0, 4).map((feature) => (
                            <div key={feature} className="flex items-start text-xs text-charcoal">
                              <span className="text-gold mr-1">•</span>
                              {feature}
                            </div>
                          ))}
                        </div>
                        {service.features.length > 4 && (
                          <p className="text-xs text-soft-gray-blue mt-1">
                            +{service.features.length - 4} more features
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => startEdit(service)}
                      className="hover:bg-navy hover:text-white"
                      title="Edit service"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(service.id, service.title)}
                      className="hover:bg-red-500 hover:text-white"
                      title="Delete service"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        <Dialog open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Service Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-20"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-icon">Icon Name</Label>
                <Input
                  id="edit-icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-features">Key Features (one per line)</Label>
                <Textarea
                  id="edit-features"
                  value={formData.features.join('\n')}
                  onChange={(e) => handleFeaturesInput(e.target.value)}
                  className="min-h-24"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setEditingService(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-navy hover:bg-navy-800">Update Service</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function BlogManager() {
  const { blogPosts, loading, refetch } = useBlogPosts();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    author: '',
    category: '',
    tags: [] as string[],
    published: false,
    read_time: 5
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image_url: '',
      author: '',
      category: '',
      tags: [],
      published: false,
      read_time: 5
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await createBlogPost(formData);
      if (error) {
        toast.error('Failed to create blog post');
      } else {
        toast.success('Blog post created successfully');
        setIsCreateModalOpen(false);
        resetForm();
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    try {
      const { error } = await updateBlogPost(editingPost.id, formData);
      if (error) {
        toast.error('Failed to update blog post');
      } else {
        toast.success('Blog post updated successfully');
        setEditingPost(null);
        resetForm();
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (postId: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) return;

    try {
      const { error } = await deleteBlogPost(postId);
      if (error) {
        toast.error('Failed to delete blog post');
      } else {
        toast.success('Blog post deleted successfully');
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const startEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image_url: post.image_url,
      author: post.author,
      category: post.category,
      tags: post.tags,
      published: post.published,
      read_time: post.read_time
    });
  };

  const handleTagsInput = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setFormData({ ...formData, tags });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Blog Management</CardTitle>
            <p className="text-sm text-charcoal mt-1">
              Manage blog posts and articles
            </p>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-navy hover:bg-navy-800">
                <Plus className="h-4 w-4 mr-2" />
                Create New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Blog Post</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="url-friendly-title"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief summary of the post..."
                    className="min-h-20"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Full post content..."
                    className="min-h-32"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Corporate Law"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="image_url">Featured Image URL</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="read_time">Read Time (minutes)</Label>
                    <Input
                      id="read_time"
                      type="number"
                      value={formData.read_time}
                      onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags.join(', ')}
                    onChange={(e) => handleTagsInput(e.target.value)}
                    placeholder="Corporate Law, Legal Updates, Business"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-navy hover:bg-navy-800">Create Post</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy mx-auto"></div>
            <p className="mt-2 text-charcoal">Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-8 text-charcoal">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No blog posts found in the database.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-navy text-lg">{post.title}</h3>
                    <p className="text-sm text-charcoal">By {post.author}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Badge variant={post.published ? 'default' : 'outline'}>
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                      <span className="text-xs text-soft-gray-blue">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Not published'}
                      </span>
                      <span className="text-xs text-soft-gray-blue">
                        {post.read_time} min read
                      </span>
                    </div>
                    <p className="text-sm text-charcoal mt-2 line-clamp-2">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-charcoal text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => startEdit(post)}
                      className="hover:bg-navy hover:text-white"
                      title="Edit blog post"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(post.id, post.title)}
                      className="hover:bg-red-500 hover:text-white"
                      title="Delete blog post"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        <Dialog open={!!editingPost} onOpenChange={(open) => !open && setEditingPost(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Blog Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-slug">URL Slug</Label>
                  <Input
                    id="edit-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-excerpt">Excerpt</Label>
                <Textarea
                  id="edit-excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="min-h-20"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="min-h-32"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-author">Author</Label>
                  <Input
                    id="edit-author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-image_url">Featured Image URL</Label>
                  <Input
                    id="edit-image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-read_time">Read Time (minutes)</Label>
                  <Input
                    id="edit-read_time"
                    type="number"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
                <Input
                  id="edit-tags"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleTagsInput(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="edit-published">Published</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setEditingPost(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-navy hover:bg-navy-800">Update Post</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function ContactManager() {
  const { submissions, loading, refetch } = useContactSubmissions();

  const handleStatusUpdate = async (id: string, status: 'new' | 'read' | 'responded' | 'archived') => {
    try {
      const { error } = await updateContactSubmissionStatus(id, status);
      if (error) {
        toast.error('Failed to update status');
      } else {
        toast.success('Status updated successfully');
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the submission from ${name}? This action cannot be undone.`)) return;

    try {
      const { error } = await deleteContactSubmission(id);
      if (error) {
        toast.error('Failed to delete submission');
      } else {
        toast.success('Submission deleted successfully');
        refetch();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Contact Submissions</CardTitle>
        <p className="text-sm text-charcoal">
          Messages from the contact form on your website
        </p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading submissions...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-8 text-charcoal">No submissions yet</div>
        ) : (
          <div className="space-y-4">
            {submissions.map((contact) => (
              <div key={contact.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-navy">{contact.name}</h3>
                    <p className="text-sm text-charcoal">{contact.email} • {contact.phone}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="secondary">{contact.subject}</Badge>
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusUpdate(contact.id, e.target.value as any)}
                      className="text-xs border rounded px-2 py-1"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                    </select>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(contact.id, contact.name)}
                      className="hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-charcoal mb-2">{contact.message}</p>
                <p className="text-xs text-soft-gray-blue">
                  {new Date(contact.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SiteSettingsManager() {
  const [settings, setSettings] = useState({
    site_name: '',
    site_description: '',
    contact_email: '',
    contact_phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data, error } = await getSiteSettings();
        if (data) {
          setSettings({
            site_name: data.site_name || '',
            site_description: data.site_description || '',
            contact_email: data.contact_email || '',
            contact_phone: data.contact_phone || '',
            address: data.address || ''
          });
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await updateSiteSettings(settings);
      if (error) {
        toast.error('Failed to save settings');
      } else {
        toast.success('Settings saved successfully');
      }
    } catch (error) {
      toast.error('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <p className="text-sm text-charcoal">
          Configure site-wide settings including contact information for consultation emails.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="siteName">Site Name</Label>
            <Input 
              id="siteName" 
              value={settings.site_name}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              placeholder="UcheAnyanwu & Co."
            />
          </div>
          <div>
            <Label htmlFor="siteDescription">Site Description</Label>
            <Input 
              id="siteDescription" 
              value={settings.site_description}
              onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              placeholder="Premier Law Firm"
            />
          </div>
          <div>
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input 
              id="contactEmail" 
              type="email"
              value={settings.contact_email}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              placeholder="info@richardsonlaw.com"
            />
            <p className="text-sm text-soft-gray-blue mt-1">
              This email will receive consultation requests from the contact form.
            </p>
          </div>
          <div>
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input 
              id="contactPhone" 
              value={settings.contact_phone}
              onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="address">Office Address</Label>
            <Textarea 
              id="address" 
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              placeholder="123 Legal Plaza, Downtown District, New York, NY 10001"
              className="min-h-20"
            />
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-navy hover:bg-navy-800">
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AdminDashboard() {
  const { logout } = useAuth();
  const { submissions, loading: submissionsLoading } = useContactSubmissions();
  const { modalContents } = useAllModalContent();
  const { attorneys } = useAttorneys();
  const { blogPosts } = useBlogPosts();
  const { services } = useServices();

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      toast.error('Error signing out');
    }
  };

  const stats = [
    { title: 'Total Attorneys', value: attorneys.length, icon: Users, color: 'text-blue-600' },
    { title: 'Services Offered', value: services.length, icon: Briefcase, color: 'text-green-600' },
    { title: 'Blog Posts', value: blogPosts.length, icon: FileText, color: 'text-purple-600' },
    { title: 'Contact Submissions', value: submissions.length, icon: MessageSquare, color: 'text-orange-600' },
    { title: 'Modal Contents', value: modalContents.length, icon: Monitor, color: 'text-teal-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-navy">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-charcoal">{stat.title}</p>
                      <p className="text-3xl font-bold text-navy">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
            <TabsTrigger value="modals">Modal Content</TabsTrigger>
            <TabsTrigger value="attorneys">Attorneys</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Contact Submissions */}
          <TabsContent value="contacts">
            <ContactManager />
          </TabsContent>

          {/* Modal Content Management */}
          <TabsContent value="modals">
            <ModalContentManager />
          </TabsContent>

          {/* Attorneys Management */}
          <TabsContent value="attorneys">
            <AttorneyManager />
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          {/* Blog Management */}
          <TabsContent value="blog">
            <BlogManager />
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <SiteSettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <AdminDashboard />;
}
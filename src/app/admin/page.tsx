'use client';

import { useState, useEffect } from 'react';
import { getAboutMe, saveAboutMe, getProjects, saveProject, deleteProject, getSkills, saveSkills } from '@/lib/portfolio-service';
import { Project, Skill, AboutMeData } from '@/lib/portfolio-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, LogOut, Plus, Trash2, Edit, Save, FileJson, Copy, Database, HelpCircle, Lock, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(true);

  // Dynamic Portfolio Data States
  const [aboutData, setAboutData] = useState<AboutMeData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  // Editor Modal States
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);

  // Check local storage for session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localSession = localStorage.getItem('tilakfolio_admin_session');
      if (localSession === 'active') {
        setIsAuthenticated(true);
        loadPortfolioData();
      }
    }
    setAuthLoading(false);
  }, []);

  const loadPortfolioData = async () => {
    try {
      const about = await getAboutMe();
      const projs = await getProjects();
      const sks = await getSkills();
      setAboutData(about);
      setProjects(projs);
      setSkills(sks);
    } catch (e) {
      console.error('Error loading admin panel data:', e);
      toast({
        title: 'Error loading data',
        description: 'Failed to retrieve portfolio records.',
        variant: 'destructive',
      });
    }
  };

  // -------------------------------------------------------------
  // AUTHENTICATION HANDLERS
  // -------------------------------------------------------------

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    
    if (!adminPassword) {
      toast({
        title: 'Configuration Error',
        description: 'NEXT_PUBLIC_ADMIN_PASSWORD environment variable is not configured.',
        variant: 'destructive',
      });
      return;
    }

    if (password === adminPassword) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('tilakfolio_admin_session', 'active');
      }
      loadPortfolioData();
      toast({
        title: 'Welcome Back',
        description: 'Successfully logged in as administrator.',
      });
    } else {
      toast({
        title: 'Access Denied',
        description: 'Invalid administrator password.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tilakfolio_admin_session');
    }
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  // -------------------------------------------------------------
  // SAVE CONTROLS
  // -------------------------------------------------------------

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aboutData) return;
    try {
      await saveAboutMe(aboutData);
      toast({
        title: 'Profile Updated',
        description: 'Your bio and headlines have been saved.',
      });
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: 'Could not sync updates to database.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveProjectForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.id) return;
    
    try {
      // Clean tags, technologies, screenshots, useCases into arrays
      const cleanedProj: Project = {
        id: editingProject.id,
        title: editingProject.title || 'Untitled Project',
        shortDescription: editingProject.shortDescription || '',
        imageUrl: editingProject.imageUrl || '/assets/image/headshotUrl.png',
        liveDemoUrl: editingProject.liveDemoUrl || '',
        githubRepoUrl: editingProject.githubRepoUrl || '',
        tags: Array.isArray(editingProject.tags) 
          ? editingProject.tags 
          : (editingProject.tags as any || '').split(',').map((t: any) => t.trim()).filter(Boolean),
        fullDescription: editingProject.fullDescription || '',
        imageAiHint: editingProject.imageAiHint || 'coding interface',
        screenshots: Array.isArray(editingProject.screenshots)
          ? editingProject.screenshots
          : (editingProject.screenshots as any || '').split(',').map((s: any) => s.trim()).filter(Boolean),
        useCases: Array.isArray(editingProject.useCases)
          ? editingProject.useCases
          : (editingProject.useCases as any || '').split(',').map((u: any) => u.trim()).filter(Boolean),
        technologies: Array.isArray(editingProject.technologies)
          ? editingProject.technologies
          : (editingProject.technologies as any || '').split(',').map((t: any) => t.trim()).filter(Boolean),
      };

      await saveProject(cleanedProj);
      toast({
        title: 'Project Saved',
        description: `"${cleanedProj.title}" has been saved successfully.`,
      });
      setEditingProject(null);
      loadPortfolioData();
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: 'Failed to record project changes.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      toast({
        title: 'Project Deleted',
        description: 'Project removed from database.',
      });
      loadPortfolioData();
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: 'Could not remove project.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveSkillForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name) return;

    try {
      const newSkills = [...skills];
      const index = newSkills.findIndex(s => s.name === editingSkill.name);
      
      const newSkillRecord: Skill = {
        name: editingSkill.name,
        proficiency: Number(editingSkill.proficiency) || 50,
        category: editingSkill.category || 'Frontend',
        iconName: editingSkill.iconName || 'Code'
      };

      if (index >= 0) {
        newSkills[index] = newSkillRecord;
      } else {
        newSkills.push(newSkillRecord);
      }

      await saveSkills(newSkills);
      toast({
        title: 'Skill Saved',
        description: `"${newSkillRecord.name}" has been recorded.`,
      });
      setEditingSkill(null);
      loadPortfolioData();
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: 'Failed to record skill change.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSkill = async (name: string) => {
    if (!confirm(`Remove "${name}" from your skills list?`)) return;
    try {
      const filtered = skills.filter(s => s.name !== name);
      await saveSkills(filtered);
      toast({
        title: 'Skill Removed',
        description: 'Skill record updated.',
      });
      loadPortfolioData();
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: 'Could not remove skill.',
        variant: 'destructive',
      });
    }
  };

  // -------------------------------------------------------------
  // EXPORT CONFIG CODE FOR GIT BACKUP
  // -------------------------------------------------------------

  const handleExportCode = () => {
    if (!aboutData) return;

    // Construct the formatted TypeScript file content
    const code = `
import type { LucideIcon } from 'lucide-react';
import { 
  Github, Linkedin, Twitter, Globe, UserLock, Briefcase, Lightbulb, 
  Code, Settings, Hexagon, Waves, Atom, Flame, BrainCog, GlobeLock, 
  ShieldCheck, Terminal, Server, Database, KeyRound, Monitor 
} from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  liveDemoUrl?: string;
  githubRepoUrl?: string;
  tags: string[];
  fullDescription: string;
  screenshots?: string[];
  useCases?: string[];
  technologies: string[];
  imageAiHint: string;
}

export interface Skill {
  name: string;
  proficiency: number;
  icon?: any;
  iconName?: string;
  category?: 'Frontend' | 'Backend & Database' | 'Cybersecurity' | 'Tools & Utilities';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: any;
}

export interface AboutMeData {
  name: string;
  email: string;
  title: string;
  tagline: string;
  bio: string;
  headshotUrl: string;
  headshotAiHint: string;
  resumeUrl: string;
}

export const aboutMe: AboutMeData = ${JSON.stringify(aboutData, null, 2)};

export const projectsData: Project[] = ${JSON.stringify(
      projects.map(p => ({
        id: p.id,
        title: p.title,
        shortDescription: p.shortDescription,
        imageUrl: p.imageUrl,
        liveDemoUrl: p.liveDemoUrl,
        githubRepoUrl: p.githubRepoUrl,
        tags: p.tags,
        fullDescription: p.fullDescription,
        screenshots: p.screenshots || [],
        useCases: p.useCases || [],
        technologies: p.technologies || [],
        imageAiHint: p.imageAiHint || 'coding interface'
      })), 
      null, 
      2
    )};

export const skillsData: Skill[] = [
${skills.map(s => `  { name: ${JSON.stringify(s.name)}, proficiency: ${s.proficiency}, icon: ${s.iconName || 'Code'}, iconName: ${JSON.stringify(s.iconName || 'Code')}, category: ${JSON.stringify(s.category || 'Frontend')} }`).join(',\n')}
];

export const socialLinksData: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/tilak8923', icon: Github },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tilak-tiwari-33b84825a', icon: Linkedin },
  { name: 'Twitter', url: 'https://x.com/tilaktiwari_', icon: Twitter },
];

export const getProjects = (): Project[] => projectsData;
export const getProjectById = (id: string): Project | undefined => projectsData.find(p => p.id === id);
`.trim();

    navigator.clipboard.writeText(code);
    toast({
      title: 'Code Copied!',
      description: 'TypeScript portfolio-data.ts content copied to clipboard. You can paste this in src/lib/portfolio-data.ts and commit!',
    });
  };

  // -------------------------------------------------------------
  // RENDERING
  // -------------------------------------------------------------

  if (authLoading) {
    return (
      <div className="container min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground font-medium text-sm">Authenticating admin session...</p>
      </div>
    );
  }

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="container min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
        <div className="absolute top-1/3 left-1/2 -z-10 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px] dark:bg-primary/20" />
        <Card className="w-full max-w-md shadow-2xl border-border/50 bg-card/60 backdrop-blur-md rounded-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl font-bold tracking-tight">Admin Portal</CardTitle>
            <CardDescription>Authenticate to configure your portfolio headlines, projects, and tech stack.</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Access Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Enter administrator passkey..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 rounded-xl"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full py-5 rounded-xl text-sm font-semibold">
                Unlock Console
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t border-border/40 py-4 bg-secondary/20 rounded-b-2xl">
            <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              &larr; Back to Portfolio
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="container py-8 max-w-6xl space-y-6">
      
      {/* HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card/40 backdrop-blur-sm border border-border/50 p-6 rounded-2xl shadow-sm">
        <div className="space-y-1">
          <h1 className="font-headline text-3xl font-extrabold tracking-tight flex items-center gap-2 text-primary">
            <ShieldCheck className="h-7 w-7 text-primary" /> Admin Panel
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage bio details, project lists, and tool highlights.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExportCode} className="h-9 gap-1.5 rounded-lg text-xs font-semibold hover:border-primary">
            <Copy className="h-3.5 w-3.5" /> Copy Code (Git Backup)
          </Button>
          <Button variant="destructive" size="sm" onClick={handleLogout} className="h-9 gap-1.5 rounded-lg text-xs font-semibold">
            <LogOut className="h-3.5 w-3.5" /> End Session
          </Button>
        </div>
      </div>

      {/* DATABASE INDICATOR NOTICE */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card className="border-border/50 bg-card/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Console Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs font-medium">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border">
                <span className="text-muted-foreground">Database Mode:</span>
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Database className="h-3.5 w-3.5 text-amber-500" />
                  Local Storage
                </span>
              </div>
              <div className="p-3 bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 rounded-lg space-y-1.5 leading-relaxed font-normal font-sans">
                <p className="font-semibold text-xs text-amber-800 dark:text-amber-400">Local Backup Sync:</p>
                <p>Changes will save in your browser. Use the **Copy Code (Git Backup)** button to copy your code updates, and paste them into `src/lib/portfolio-data.ts` to make them permanent in git!</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MAIN CONFIG TABS */}
        <div className="md:col-span-3">
          <Card className="border-border/50 shadow-md rounded-2xl overflow-hidden">
            <Tabs defaultValue="profile">
              <TabsList className="w-full justify-start rounded-none border-b border-border bg-muted/50 p-1">
                <TabsTrigger value="profile" className="font-headline text-sm px-5 py-3">Profile Info</TabsTrigger>
                <TabsTrigger value="projects" className="font-headline text-sm px-5 py-3">Projects</TabsTrigger>
                <TabsTrigger value="skills" className="font-headline text-sm px-5 py-3">Tech Stack & Tools</TabsTrigger>
              </TabsList>

              {/* TABS CONTENT: PROFILE */}
              <TabsContent value="profile" className="p-6 focus-visible:outline-none">
                {aboutData ? (
                  <form onSubmit={handleSaveAbout} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Your Name</label>
                        <Input
                          value={aboutData.name}
                          onChange={(e) => setAboutData({ ...aboutData, name: e.target.value })}
                          required
                          className="rounded-lg h-10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Contact Email</label>
                        <Input
                          type="email"
                          value={aboutData.email}
                          onChange={(e) => setAboutData({ ...aboutData, email: e.target.value })}
                          required
                          className="rounded-lg h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Profile Title / Headline</label>
                      <Input
                        value={aboutData.title}
                        onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                        required
                        className="rounded-lg h-10"
                        placeholder="e.g. Web Developer | Cybersecurity Learner"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Tagline</label>
                      <Input
                        value={aboutData.tagline}
                        onChange={(e) => setAboutData({ ...aboutData, tagline: e.target.value })}
                        required
                        className="rounded-lg h-10"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Bio (Markdown supported)</label>
                      <Textarea
                        value={aboutData.bio}
                        onChange={(e) => setAboutData({ ...aboutData, bio: e.target.value })}
                        required
                        className="rounded-lg min-h-[160px] leading-relaxed font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Headshot Picture URL</label>
                        <Input
                          value={aboutData.headshotUrl}
                          onChange={(e) => setAboutData({ ...aboutData, headshotUrl: e.target.value })}
                          required
                          className="rounded-lg h-10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Resume URL (Doc / PDF)</label>
                        <Input
                          value={aboutData.resumeUrl}
                          onChange={(e) => setAboutData({ ...aboutData, resumeUrl: e.target.value })}
                          required
                          className="rounded-lg h-10"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Button type="submit" className="h-10 px-6 gap-2 rounded-lg font-semibold shadow-md shadow-primary/20">
                        <Save className="h-4 w-4" /> Save Profile Details
                      </Button>
                    </div>
                  </form>
                ) : (
                  <p className="text-center text-sm text-muted-foreground py-6">Loading profile template...</p>
                )}
              </TabsContent>

              {/* TABS CONTENT: PROJECTS */}
              <TabsContent value="projects" className="p-6 focus-visible:outline-none space-y-6">
                
                {/* PROJECT LIST VIEW */}
                {!editingProject ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-headline text-lg font-bold text-card-foreground">Project Listings</h3>
                      <Button 
                        onClick={() => setEditingProject({
                          id: '', title: '', shortDescription: '', imageUrl: '', liveDemoUrl: '', githubRepoUrl: '',
                          tags: [], fullDescription: '', screenshots: [], useCases: [], technologies: [], imageAiHint: ''
                        })} 
                        size="sm" 
                        className="h-9 gap-1.5 rounded-lg text-xs font-semibold"
                      >
                        <Plus className="h-4 w-4" /> Add Project
                      </Button>
                    </div>

                    <div className="divide-y divide-border border rounded-xl overflow-hidden bg-background/50">
                      {projects.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground py-8">No projects in portfolio.</p>
                      ) : (
                        projects.map((project) => (
                          <div key={project.id} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors">
                            <div className="space-y-1 pr-4">
                              <h4 className="font-headline font-bold text-sm text-foreground">{project.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-1">{project.shortDescription}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => setEditingProject(project)}
                                className="h-8 w-8 rounded-lg hover:border-primary hover:text-primary"
                                title="Edit Project"
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => handleDeleteProject(project.id)}
                                className="h-8 w-8 rounded-lg hover:border-red-500 hover:text-red-500"
                                title="Delete Project"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  // PROJECT EDITOR FORM
                  <form onSubmit={handleSaveProjectForm} className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-3 mb-2">
                      <h3 className="font-headline text-base font-bold text-primary">
                        {editingProject.id ? 'Edit Project' : 'New Project'}
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => setEditingProject(null)} className="h-8 text-xs">
                        Cancel
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Project ID (Unique, url friendly)</label>
                        <Input
                          value={editingProject.id}
                          onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value.replace(/\s+/g, '-') })}
                          required
                          disabled={!!editingProject.title && projects.some(p => p.id === editingProject.id)}
                          placeholder="e.g. DefenderIQ"
                          className="rounded-lg h-10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Project Title</label>
                        <Input
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          required
                          placeholder="e.g. DefenderIQ (Threat Scanner)"
                          className="rounded-lg h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Short Description</label>
                      <Input
                        value={editingProject.shortDescription}
                        onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                        required
                        placeholder="Keep this around 2 sentences."
                        className="rounded-lg h-10"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Card Cover Image URL</label>
                        <Input
                          value={editingProject.imageUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                          required
                          placeholder="e.g. /assets/image/defender_iq_mockup.png"
                          className="rounded-lg h-10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">AI Image Prompt Hint</label>
                        <Input
                          value={editingProject.imageAiHint}
                          onChange={(e) => setEditingProject({ ...editingProject, imageAiHint: e.target.value })}
                          placeholder="e.g. cyber threat scanner interface mockup"
                          className="rounded-lg h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Live Demo Link (Optional)</label>
                        <Input
                          value={editingProject.liveDemoUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, liveDemoUrl: e.target.value })}
                          placeholder="e.g. https://defendiq.vercel.app/"
                          className="rounded-lg h-10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">GitHub Repository Link (Optional)</label>
                        <Input
                          value={editingProject.githubRepoUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, githubRepoUrl: e.target.value })}
                          placeholder="e.g. https://github.com/tilak8923/DefenderIQ"
                          className="rounded-lg h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Search Tags (Comma-separated)</label>
                        <Input
                          value={Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : editingProject.tags || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value as any })}
                          placeholder="e.g. Next.js, Cybersecurity, Tailwind CSS"
                          className="rounded-lg h-10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Technologies Used (Comma-separated)</label>
                        <Input
                          value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : editingProject.technologies || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value as any })}
                          placeholder="e.g. React.js, Prisma ORM, VirusTotal API"
                          className="rounded-lg h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Screenshots URLs (Optional, comma-separated)</label>
                        <Input
                          value={Array.isArray(editingProject.screenshots) ? editingProject.screenshots.join(', ') : editingProject.screenshots as any || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, screenshots: e.target.value as any })}
                          placeholder="e.g. /assets/image/shot1.png, /assets/image/shot2.png"
                          className="rounded-lg h-10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Use Cases (Optional, comma-separated)</label>
                        <Input
                          value={Array.isArray(editingProject.useCases) ? editingProject.useCases.join(', ') : editingProject.useCases as any || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, useCases: e.target.value as any })}
                          placeholder="e.g. Threat Intelligence Investigation, IP Auditing"
                          className="rounded-lg h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Full Project Details Description (Markdown supported)</label>
                      <Textarea
                        value={editingProject.fullDescription}
                        onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                        required
                        className="rounded-lg min-h-[160px] font-sans"
                        placeholder="Detail the project goals, features, and setup instructions..."
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <Button type="button" variant="ghost" onClick={() => setEditingProject(null)} className="h-10 px-4 rounded-lg text-sm font-semibold">
                        Discard
                      </Button>
                      <Button type="submit" className="h-10 px-6 gap-2 rounded-lg font-semibold shadow-md shadow-primary/20">
                        <Save className="h-4 w-4" /> Save Project
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>

              {/* TABS CONTENT: SKILLS */}
              <TabsContent value="skills" className="p-6 focus-visible:outline-none space-y-6">
                
                {/* ADD/EDIT SKILL FORM PANEL */}
                {editingSkill ? (
                  <form onSubmit={handleSaveSkillForm} className="bg-secondary/20 border p-4 rounded-xl space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <h4 className="font-headline font-bold text-sm text-primary">
                        {skills.some(s => s.name === editingSkill.name) ? 'Edit Skill/Tool' : 'Add New Skill/Tool'}
                      </h4>
                      <Button variant="ghost" size="sm" onClick={() => setEditingSkill(null)} className="h-8 text-xs">Cancel</Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Skill/Tool Name</label>
                        <Input
                          value={editingSkill.name}
                          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          required
                          disabled={skills.some(s => s.name === editingSkill.name)}
                          placeholder="e.g. Burp Suite"
                          className="rounded-lg h-10"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Proficiency (0-100%)</label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={editingSkill.proficiency || ''}
                          onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: Number(e.target.value) })}
                          required
                          placeholder="e.g. 75"
                          className="rounded-lg h-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">Category</label>
                        <select
                          value={editingSkill.category || 'Frontend'}
                          onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                          className="w-full rounded-lg h-10 px-3 border border-input bg-background text-sm font-medium focus-visible:outline-none"
                        >
                          <option value="Frontend">Frontend</option>
                          <option value="Backend & Database">Backend & Database</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="Tools & Utilities">Tools & Utilities</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                          Lucide Icon Name 
                          <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" title="Browse Icon Library">
                            <HelpCircle className="h-3.5 w-3.5" />
                          </a>
                        </label>
                        <Input
                          value={editingSkill.iconName}
                          onChange={(e) => setEditingSkill({ ...editingSkill, iconName: e.target.value })}
                          required
                          placeholder="e.g. ShieldCheck, GlobeLock, Atom"
                          className="rounded-lg h-10"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <Button type="submit" size="sm" className="h-9 gap-1.5 rounded-lg text-xs font-semibold">
                        <Save className="h-3.5 w-3.5" /> Save Skill
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between items-center">
                    <h3 className="font-headline text-lg font-bold text-card-foreground">Skills & Tools Grid</h3>
                    <Button 
                      onClick={() => setEditingSkill({ name: '', proficiency: 70, category: 'Frontend', iconName: 'Code' })} 
                      size="sm" 
                      className="h-9 gap-1.5 rounded-lg text-xs font-semibold"
                    >
                      <Plus className="h-4 w-4" /> Add Skill/Tool
                    </Button>
                  </div>
                )}

                {/* SKILL LIST BY CATEGORIES */}
                <div className="space-y-6">
                  {['Frontend', 'Backend & Database', 'Cybersecurity', 'Tools & Utilities'].map((cat) => {
                    const filtered = skills.filter(s => s.category === cat);
                    return (
                      <div key={cat} className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary">{cat}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {filtered.map((skill) => (
                            <div key={skill.name} className="flex items-center justify-between p-3 border rounded-xl bg-background/40 hover:bg-secondary/10 transition-colors">
                              <div className="space-y-0.5 pr-2">
                                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                  {skill.name}
                                  <Badge variant="outline" className="text-[9px] py-0 px-1.5 h-auto font-medium">
                                    {skill.proficiency}%
                                  </Badge>
                                </span>
                                <span className="text-[10px] text-muted-foreground block">Icon: {skill.iconName || 'Code'}</span>
                              </div>
                              
                              <div className="flex items-center gap-1 shrink-0">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => setEditingSkill(skill)}
                                  className="h-7 w-7 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleDeleteSkill(skill.name)}
                                  className="h-7 w-7 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-secondary"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          {filtered.length === 0 && (
                            <p className="text-[11px] text-muted-foreground py-2 col-span-full italic">No skills listed in this category.</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}

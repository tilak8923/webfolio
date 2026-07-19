import * as Icons from 'lucide-react';
import { aboutMe as staticAboutMe, projectsData as staticProjects, skillsData as staticSkills, Project, Skill, AboutMeData } from './portfolio-data';

const KEYS = {
  ABOUT_ME: 'tilakfolio_about_me',
  PROJECTS: 'tilakfolio_projects',
  SKILLS: 'tilakfolio_skills',
};

// Map icon string names to Lucide icons
export const getIconByName = (name: string): any => {
  if (!name) return null;
  const icon = (Icons as any)[name];
  return icon || Icons.Code; // Fallback to Code icon
};

// Helper to get local storage item safely
const getLocal = (key: string) => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Helper to set local storage item safely
const setLocal = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// -------------------------------------------------------------
// ABOUT ME SERVICES
// -------------------------------------------------------------

export const getAboutMe = async (): Promise<AboutMeData> => {
  const local = getLocal(KEYS.ABOUT_ME);
  if (local) return local;
  return staticAboutMe;
};

export const saveAboutMe = async (data: AboutMeData): Promise<void> => {
  setLocal(KEYS.ABOUT_ME, data);
};

// -------------------------------------------------------------
// PROJECTS SERVICES
// -------------------------------------------------------------

export const getProjects = async (): Promise<Project[]> => {
  const local = getLocal(KEYS.PROJECTS);
  if (local && Array.isArray(local) && local.length > 0) return local;
  return staticProjects;
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
};

export const saveProject = async (project: Project): Promise<void> => {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.push(project);
  }
  setLocal(KEYS.PROJECTS, projects);
};

export const deleteProject = async (id: string): Promise<void> => {
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  setLocal(KEYS.PROJECTS, filtered);
};

// -------------------------------------------------------------
// SKILLS / TOOLS SERVICES
// -------------------------------------------------------------

export const getSkills = async (): Promise<Skill[]> => {
  const local = getLocal(KEYS.SKILLS);
  if (local && Array.isArray(local) && local.length > 0) {
    return local.map((s: any) => ({
      ...s,
      icon: s.iconName ? getIconByName(s.iconName) : undefined
    }));
  }

  return staticSkills.map(s => {
    let iconName = s.iconName;
    if (!iconName && s.icon) {
      iconName = s.icon.displayName || s.icon.name || '';
    }
    return {
      ...s,
      iconName,
      category: s.category || getSkillCategoryFallback(s.name)
    };
  });
};

export const saveSkills = async (skills: Skill[]): Promise<void> => {
  const normalized = skills.map(s => ({
    name: s.name,
    proficiency: Number(s.proficiency),
    category: s.category || 'Frontend',
    iconName: s.iconName || ''
  }));
  setLocal(KEYS.SKILLS, normalized);
};

// Fallback logic to categorize legacy skills
function getSkillCategoryFallback(name: string): Skill['category'] {
  const n = name.toLowerCase();
  if (n.includes('react') || n.includes('frontend') || n.includes('tailwind') || n.includes('css') || n.includes('html') || n.includes('javascript') || n.includes('typescript')) {
    return 'Frontend';
  }
  if (n.includes('python') || n.includes('node') || n.includes('express') || n.includes('mongodb') || n.includes('database') || n.includes('sql') || n.includes('firestore') || n.includes('cloud')) {
    return 'Backend & Database';
  }
  if (n.includes('pandas') || n.includes('numpy') || n.includes('learn') || n.includes('model') || n.includes('visualization') || n.includes('data') || n.includes('ai') || n.includes('ml')) {
    return 'AI, ML & Data Science';
  }
  return 'Tools & Utilities';
}

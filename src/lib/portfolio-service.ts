import { db, isFirebaseConfigured } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
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
  // 1. Try Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'portfolio', 'about_me');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as AboutMeData;
      }
    } catch (e) {
      console.warn('Error fetching aboutMe from Firestore, using fallback:', e);
    }
  }

  // 2. Try LocalStorage
  const local = getLocal(KEYS.ABOUT_ME);
  if (local) return local;

  // 3. Fallback to static
  return staticAboutMe;
};

export const saveAboutMe = async (data: AboutMeData): Promise<void> => {
  // Always update LocalStorage for instant local preview
  setLocal(KEYS.ABOUT_ME, data);

  // Update Firestore if configured
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'portfolio', 'about_me');
      await setDoc(docRef, data);
    } catch (e) {
      console.error('Error saving aboutMe to Firestore:', e);
      throw e;
    }
  }
};

// -------------------------------------------------------------
// PROJECTS SERVICES
// -------------------------------------------------------------

export const getProjects = async (): Promise<Project[]> => {
  // 1. Try Firestore
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, 'projects');
      const querySnapshot = await getDocs(colRef);
      if (!querySnapshot.empty) {
        const list: Project[] = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Project);
        });
        return list;
      }
    } catch (e) {
      console.warn('Error fetching projects from Firestore, using fallback:', e);
    }
  }

  // 2. Try LocalStorage
  const local = getLocal(KEYS.PROJECTS);
  if (local && Array.isArray(local) && local.length > 0) return local;

  // 3. Fallback to static
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

  // Always update LocalStorage
  setLocal(KEYS.PROJECTS, projects);

  // Update Firestore if configured
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'projects', project.id);
      await setDoc(docRef, project);
    } catch (e) {
      console.error('Error saving project to Firestore:', e);
      throw e;
    }
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);

  // Always update LocalStorage
  setLocal(KEYS.PROJECTS, filtered);

  // Update Firestore if configured
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'projects', id);
      await deleteDoc(docRef);
    } catch (e) {
      console.error('Error deleting project from Firestore:', e);
      throw e;
    }
  }
};

// -------------------------------------------------------------
// SKILLS / TOOLS SERVICES
// -------------------------------------------------------------

export const getSkills = async (): Promise<Skill[]> => {
  // 1. Try Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'portfolio', 'skills');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().skills) {
        const skillsList = docSnap.data().skills as Skill[];
        return skillsList.map(s => ({
          ...s,
          icon: s.iconName ? getIconByName(s.iconName) : undefined
        }));
      }
    } catch (e) {
      console.warn('Error fetching skills from Firestore, using fallback:', e);
    }
  }

  // 2. Try LocalStorage
  const local = getLocal(KEYS.SKILLS);
  if (local && Array.isArray(local) && local.length > 0) {
    return local.map((s: any) => ({
      ...s,
      icon: s.iconName ? getIconByName(s.iconName) : undefined
    }));
  }

  // 3. Fallback to static
  return staticSkills.map(s => {
    // Map static icon component to its string name if not present
    let iconName = s.iconName;
    if (!iconName && s.icon) {
      // Try to find the name of the icon function
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
  // Normalize skills: strip the actual icon component function to prevent serialization errors
  const normalized = skills.map(s => ({
    name: s.name,
    proficiency: Number(s.proficiency),
    category: s.category || 'Frontend',
    iconName: s.iconName || ''
  }));

  // Always update LocalStorage
  setLocal(KEYS.SKILLS, normalized);

  // Update Firestore if configured
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'portfolio', 'skills');
      await setDoc(docRef, { skills: normalized });
    } catch (e) {
      console.error('Error saving skills to Firestore:', e);
      throw e;
    }
  }
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

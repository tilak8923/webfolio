import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Twitter, Globe, Briefcase, Lightbulb, Code, Settings, BarChart } from 'lucide-react';

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
  proficiency: number; // 0-100
  icon?: LucideIcon;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface AboutMeData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  headshotUrl: string;
  headshotAiHint: string;
  resumeUrl: string;
}

export const aboutMe: AboutMeData = {
  name: 'Alex Johnson',
  title: 'Full-stack Developer & Tech Enthusiast',
  tagline: 'Crafting innovative digital solutions with a passion for technology and leadership.',
  bio: `
Hello! I'm Alex, a versatile Full-stack Developer with a knack for bringing complex projects to life. 
With several years of experience in the tech industry, I've honed my skills in both front-end and back-end development, 
specializing in creating responsive, user-friendly web applications. 
My approach is rooted in a strong understanding of software architecture, agile methodologies, and a commitment to continuous learning. 
I thrive in collaborative environments and enjoy tackling challenges that push the boundaries of technology. 
When I'm not coding, you can find me exploring new tech trends or contributing to open-source projects.
  `.trim(),
  headshotUrl: 'https://placehold.co/300x300.png',
  headshotAiHint: 'professional portrait',
  resumeUrl: '/resume.pdf', // Replace with actual path to resume
};

export const projectsData: Project[] = [
  {
    id: 'folioforge-app',
    title: 'FolioForge Portfolio',
    shortDescription: 'A dynamic personal portfolio website built with Next.js and Tailwind CSS.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'website design',
    liveDemoUrl: '#',
    githubRepoUrl: 'https://github.com/yourusername/folioforge',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    fullDescription: `
### Project Overview
FolioForge is a modern, responsive portfolio application designed to showcase projects, skills, and professional experience. 
It features a clean, developer-centric aesthetic with dark mode capabilities.

### Key Features
- **Dynamic Project Showcase:** Easily updateable project listings.
- **SEO Optimization Tool:** AI-powered content enhancement for better search engine visibility.
- **Responsive Design:** Adapts seamlessly to all screen sizes.
- **Dark Mode:** A sleek dark theme for comfortable viewing.

### Technologies Used
- Next.js for server-side rendering and static site generation.
- React for building interactive UI components.
- Tailwind CSS for utility-first styling.
- TypeScript for type safety and improved developer experience.
- Genkit for AI-powered SEO optimization.
    `.trim(),
    screenshots: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    useCases: ['Personal Portfolio', 'Developer Showcase', 'Online Resume'],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Genkit'],
  },
  {
    id: 'codelab-platform',
    title: 'CodeLab Interactive Learning',
    shortDescription: 'An online platform for interactive coding tutorials and challenges.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'coding interface',
    liveDemoUrl: '#',
    githubRepoUrl: '#',
    tags: ['Vue.js', 'Firebase', 'Node.js'],
    fullDescription: `
### Project Overview
CodeLab is an interactive learning platform aimed at helping aspiring developers learn programming languages through hands-on exercises and real-time feedback.

### Key Features
- **Interactive Code Editor:** In-browser code execution.
- **Gamified Learning:** Points, badges, and leaderboards to motivate users.
- **Curated Learning Paths:** Structured courses for various programming languages.

### Technologies Used
- Vue.js for the front-end user interface.
- Firebase for real-time database and authentication.
- Node.js and Express for the back-end API.
    `.trim(),
    screenshots: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    useCases: ['Online Education', 'Developer Training', 'Coding Bootcamps'],
    technologies: ['Vue.js', 'Firebase', 'Node.js', 'Express', 'Docker'],
  },
];

export const skillsData: Skill[] = [
  { name: 'JavaScript', proficiency: 95, icon: Code },
  { name: 'TypeScript', proficiency: 90, icon: Code },
  { name: 'React / Next.js', proficiency: 90, icon: Code },
  { name: 'Node.js / Express', proficiency: 85, icon: Settings },
  { name: 'Python / Django', proficiency: 75, icon: Code },
  { name: 'Databases (SQL/NoSQL)', proficiency: 80, icon: BarChart },
  { name: 'Cloud (AWS/Firebase)', proficiency: 70, icon: Globe },
  { name: 'Agile Methodologies', proficiency: 90, icon: Lightbulb },
];

export const socialLinksData: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { name: 'Twitter', url: 'https://twitter.com', icon: Twitter },
];


export const getProjects = (): Project[] => projectsData;
export const getProjectById = (id: string): Project | undefined => projectsData.find(p => p.id === id);

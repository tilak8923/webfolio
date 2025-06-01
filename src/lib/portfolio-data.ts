
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
  email: string;
  title: string;
  tagline: string;
  bio: string;
  headshotUrl: string;
  headshotAiHint: string;
  resumeUrl: string;
}

export const aboutMe: AboutMeData = {
  name: 'Tilak Tiwari',
  email: 'tilaktiwari789@gmail.com',
  title: 'Full-stack Developer & Tech Enthusiast',
  tagline: 'Crafting innovative digital solutions with a passion for technology and leadership.',
  bio: `
Hello! I'm Tilak, a versatile Full-stack Developer with a knack for bringing complex projects to life. 
With several years of experience in the tech industry, I've honed my skills in both front-end and back-end development, 
specializing in creating responsive, user-friendly web applications. 
My approach is rooted in a strong understanding of software architecture, agile methodologies, and a commitment to continuous learning. 
I thrive in collaborative environments and enjoy tackling challenges that push the boundaries of technology. 
When I'm not coding, you can find me exploring new tech trends or contributing to open-source projects.
  `.trim(),
  headshotUrl: '/assets/image/profile_pic.jpeg',
  headshotAiHint: 'professional portrait',
  resumeUrl: '/assets/documents/TilakTiwariResume.pdf', 
};

export const projectsData: Project[] = [
  {
    id: 'AI-Chatbot',
    title: 'MediMate AI(AI-powered healthcare Chatbot Assistant)',
    shortDescription: 'An AI-powered healthcare assistant web app built with Next.js, Tailwind CSS, Node.js, and Firebase.Features include Google login, real-time chat with a medical AI chatbot, and secure chat history management — designed for patients seeking quick and reliable medical guidance.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'coding interface',
    liveDemoUrl: '#',
    githubRepoUrl: 'https://github.com/tilak8923/MediMate-AI',
    tags: ['Next.js', 'Node.js' , 'Tailwind CSS','Firebase Authentication', 'Firebase Firestore (Database)','Google Sign-In Integration', 'AI Chatbot (OpenAI-based or similar)', 'Responsive UI/UX Design', 'Real-time Chat Interface' ],
    fullDescription: `
### Project Overview
MediMate AI is an AI-powered chatbot assistant designed for the healthcare sector. It allows patients to interact with an intelligent medical chatbot to receive quick, reliable responses related to symptoms, diseases, and treatments — all in a clean and intuitive chat interface.

### Key Features
- AI Chatbot Integration: Offers accurate responses using medical knowledge and AI models.
- Secure Google Authentication: Quick access via Google Sign-In and Firebase Auth.
- Real-time Chat Interface: Seamless, live interaction between patient and chatbot.
- Chat History Storage: Maintains conversation logs for future reference.
- Responsive & Minimal UI: Clean design using Tailwind CSS for a smooth user experience.

### Technologies Used
- Next.js for building the front-end and server-rendered React components.
- Tailwind CSS for utility-first responsive UI design.
- Node.js for backend logic and API routing.
- Firebase Authentication for secure user login (Google Sign-In).
- Firebase Firestore to store user data and chat history in real-time.
    `.trim(),
    screenshots: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    useCases: ['Medical Chatbot', 'Patient Support Platform', 'Virtual Health Consultation'],
    technologies: ['Next.js', 'Node.js' , 'Tailwind CSS','Firebase Authentication', 'Firebase Firestore (Database)','Google Sign-In Integration', 'AI Chatbot (OpenAI-based or similar)', 'Responsive UI/UX Design', 'Real-time Chat Interface'],
  },
  {
    id: 'Sriinsta',
    title: 'Sriinsta',
    shortDescription: 'A full-stack Instagram-inspired web app with user authentication, post management, and profile features built using Node.js, Express, MongoDB, and vanilla frontend technologies.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'instagram clone app UI design',
    liveDemoUrl: '#',
    githubRepoUrl: 'https://github.com/tilak8923/instaClone',
    tags: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
    fullDescription: `
  ### Project Overview
  This is a full-stack Instagram clone project designed to replicate core features of Instagram including user authentication, post uploading, and profile management. The frontend is built with HTML, CSS, and JavaScript while the backend uses Node.js with Express and MongoDB for database storage.
  
  ### Key Features
  - User Authentication: Secure signup and login functionality using sessions or JWT with MongoDB.  
  - Post Upload & Display: Users can upload images and videos, which are displayed in a grid on their profile page.  
  - Profile Management: Custom profile pages featuring user info and a grid of all user posts.  
  - Post Preview: Long press or click-to-preview posts using a custom viewModel() function.  
  - Responsive UI: Clean and responsive design for seamless user experience across devices.  
  - Backend API: RESTful API endpoints handling user data and posts efficiently.  
  
  ### Technologies Used
  - Node.js and Express for backend server and API development.  
  - MongoDB as a NoSQL database for storing users and post metadata.  
  - HTML, CSS, and JavaScript for frontend UI and interactions.  
  - Vercel for frontend deployment.  
    `.trim(),
    screenshots: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    useCases: ['Social Media Clone', 'Full Stack Learning', 'User Authentication Practice'],
    technologies: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'Spotify-Clone',
    title: 'TTS-Spotify',
    shortDescription: 'A frontend-only Spotify clone that uses embedded Spotify iframes for streaming real songs. Built using HTML, CSS, and JavaScript, hosted on Netlify. Users can browse playlists and play real songs from Spotify with a clean, responsive UI.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'music player UI with playlist thumbnails',
    liveDemoUrl: 'https://tts-spotify.netlify.app/home.html',
    githubRepoUrl: 'https://github.com/tilak8923/TTS-Spotify',
    tags: ['HTML','CSS','JavaScript','Spotify Embed','Responsive UI','Frontend Project','Netlify Hosting'],
    fullDescription: `
  ### Project Overview
  This project is a Spotify Clone built using only HTML, CSS, and JavaScript. It utilizes Spotify's official embed feature via \`<iframe>\` to play real songs and playlists. Each playlist is manually curated with actual Spotify track links, providing an authentic streaming experience — all without any backend or database.
  
  ### Key Features
  - 🎵 Spotify Iframe Integration: Plays real Spotify songs using public embed links.
  - 📃 Curated Playlists: Manually added track links for different moods and genres.
  - 🖼️ Clean UI Design: Responsive layout with playlist cards and song previews.
  - 🌐 Netlify Hosted: Fast and free global deployment via Netlify.
  - 🚫 No Backend Required: 100% frontend-based static site.
  
  ### Technologies Used
  - HTML: Structure of the web pages.
  - CSS: Styling and responsive design.
  - JavaScript: Basic interactivity (playlist clicks, dynamic loading, etc.).
  - Spotify Embed API: To embed track/playlist players via iframe.
  - Netlify: For live deployment and global hosting.
  
  ### Limitations
  - Users must be logged into Spotify to play full songs.
  - No user login or database (static frontend project).
  - No custom song upload (only uses public Spotify links).
  
  ### Example Embed Format
  <iframe
    src="https://open.spotify.com/embed/track/1yNzmw1iJgUouD4nUmCgU2" 
    width="100%" 
    height="80" 
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
    `.trim(),
    screenshots: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    useCases: ['Music Portfolio Project','Beginner-Level Spotify UI Clone','Frontend-Only Streaming Demo'],
    technologies: ['HTML','CSS','JavaScript','Spotify Embed API','Responsive UI','Netlify Hosting']
  },
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
- Dynamic Project Showcase: Easily updateable project listings.
- SEO Optimization Tool: AI-powered content enhancement for better search engine visibility.
- Responsive Design: Adapts seamlessly to all screen sizes.
- Dark Mode: A sleek dark theme for comfortable viewing.

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
  }
];

export const skillsData: Skill[] = [
  { name: 'JavaScript', proficiency: 60, icon: Code },
  { name: 'TypeScript', proficiency: 50, icon: Code },
  { name: 'React / Next.js', proficiency: 65, icon: Code },
  { name: 'Node.js / Express', proficiency: 40, icon: Settings },
  { name: 'Python', proficiency: 75, icon: Code },
  { name: 'Databases (SQl/MongoDB Compass)', proficiency: 80, icon: BarChart },
  { name: 'Cloud (Firebase)', proficiency: 70, icon: Globe },
  { name: 'Prompt Engineering', proficiency: 60, icon: Lightbulb },
];

export const socialLinksData: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/tilak8923', icon: Github },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tilak-tiwari-33b84825a', icon: Linkedin },
  { name: 'Twitter', url: 'https://x.com/tilaktiwari_', icon: Twitter },
];


export const getProjects = (): Project[] => projectsData;
export const getProjectById = (id: string): Project | undefined => projectsData.find(p => p.id === id);


    
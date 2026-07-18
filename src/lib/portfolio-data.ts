import type { LucideIcon } from 'lucide-react';
import { 
  Github, Linkedin, Twitter, Globe, Briefcase, Lightbulb, Code, Settings, 
  BarChart, Hexagon, Waves, Atom, Flame, BrainCog, GlobeLock, ShieldCheck, 
  Server, Database, Terminal, Lock 
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
  proficiency: number; // 0-100
  icon?: any;
  iconName?: string;
  category?: 'Frontend' | 'Backend & Database' | 'AI, ML & Data Science' | 'Tools & Utilities';
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

export const aboutMe: AboutMeData = {
  name: 'Tilak Tiwari',
  email: 'tilaktiwari789@gmail.com',
  title: 'Full-Stack Developer | AI & Data Science Explorer',
  tagline: 'Building high-performance full-stack web applications and analyzing complex data to create intelligent solutions.',
  bio: `
Hi, I’m Tilak — a full-stack developer who enjoys building clean, interactive web applications and analyzing complex data to create intelligent solutions. I focus on combining strong development practices with machine learning models and exploratory data analysis. While my primary expertise lies in frontend/backend development and data analytics, I also enjoy exploring cybersecurity concepts to ensure the systems I build are secure and robust. Outside of coding, I participate in open-source development, study machine learning pipelines, and experiment with data visualization projects.
  `.trim(),
  headshotUrl: '/assets/image/mypic.jpg',
  headshotAiHint: 'professional portrait',
  resumeUrl: '/assets/documents/TilakTiwariResume.pdf', 
};

export const projectsData: Project[] = [
  {
    id: 'DefenderIQ',
    title: 'DefenderIQ (Threat Intelligence Scanner)',
    shortDescription: 'An advanced IP, domain, and file threat intelligence scanner. It integrates security vendor feeds, DNS lookups, and WHOIS information to analyze indicators of compromise (IoCs) for security analysts.',
    imageUrl: '/assets/image/defender_iq_mockup.png',
    imageAiHint: 'cybersecurity threat intelligence dashboard',
    liveDemoUrl: 'https://defendiq.vercel.app/',
    githubRepoUrl: 'https://github.com/tilak8923/DefenderIQ',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'API Integration', 'Threat Intelligence', 'Cybersecurity'],
    fullDescription: `
### Project Overview
DefenderIQ is a cyber threat intelligence scanning tool designed for security analysts and researchers. It allows users to scan IPs, domains, URLs, and files to gather security intelligence, analyze DNS records, check SSL certificate details, and query threat intelligence databases.

### Key Features
- 🔍 Indicator of Compromise (IoC) Lookup: Instantly scan IPs and domains against global threat feeds.
- 🛡️ VirusTotal Integration: Retrieve real-time security vendor analyses.
- 🌐 DNS & WHOIS Analyzer: Investigate domain registration history and record configurations.
- 🔒 SSL Certificate Validator: Check validity, issuer, and potential configuration issues.
- ⚡ Fast & Secure Dashboard: Clean, responsive user interface with quick lookup capabilities.

### Technologies Used
- Next.js for a performant, component-driven frontend.
- Tailwind CSS for modern, custom dashboard designs.
- Third-party APIs (VirusTotal, Whois, DNS resolver feeds) for threat data collection.
- Vercel for hosting and continuous deployment.
    `.trim(),
    screenshots: [],
    useCases: ['Threat Intelligence Investigation', 'IP/Domain Security Auditing', 'Phishing Link Detection'],
    technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'VirusTotal API', 'DNS Queries', 'WHOIS Lookup']
  },
  {
    id: 'Airbnb-Clone',
    title: 'SurajBnB (Deployed Airbnb Clone)',
    shortDescription: 'A hosted instance of a Next.js Airbnb clone (original code by rahul4019) deployed on Vercel to study Prisma database relations, MongoDB Atlas integration, and NextAuth session configuration.',
    imageUrl: '/assets/image/airbnb_clone_mockup.png',
    imageAiHint: 'modern vacation rental website design',
    liveDemoUrl: 'https://surajbnb.vercel.app/',
    githubRepoUrl: 'https://github.com/rahul4019/airbnb-clone',
    tags: ['Next.js', 'Deployment', 'Prisma ORM', 'MongoDB Atlas', 'NextAuth', 'Vercel hosting'],
    fullDescription: `
### Project Overview
SurajBnB is a deployed instance of a popular open-source Airbnb clone repository. I cloned and hosted this codebase on Vercel to study, configure, and manage full-stack deployment components, database orchestration, and authentication protocols.

### Key Deployment Accomplishments
- **Database Orchestration**: Configured MongoDB Atlas cloud database instance and linked it via Prisma schema migrations.
- **Third-Party Integrations**: Hooked up Cloudinary image storage APIs for user property photo uploads.
- **Session Management**: Configured NextAuth environment keys to enable secure login systems.
- **Serverless Hosting**: Managed Next.js build options for optimized deployment on Vercel.

### Credits & Attribution
- Original Repository: [rahul4019/airbnb-clone](https://github.com/rahul4019/airbnb-clone)
- All core application logic and page styles belong to the original author. This deployment serves as a hands-on case study of full-stack infrastructure setup.
    `.trim(),
    screenshots: [],
    useCases: ['Web Hosting Practice', 'Full-stack Infrastructure Configuration', 'Database Connection Auditing'],
    technologies: ['Next.js', 'React.js', 'Prisma ORM', 'MongoDB Atlas', 'NextAuth.js', 'Cloudinary', 'Vercel']
  },
  {
    id: 'EMSAdminPro',
    title: 'EMSAdminPro (Employee Management System)',
    shortDescription: 'A robust, high-performance employee management admin panel featuring employee onboarding, task assignment, role-based access control, and dynamic analytics charts.',
    imageUrl: '/assets/image/ems_admin_pro_mockup.png',
    imageAiHint: 'employee management admin panel dashboard',
    liveDemoUrl: 'https://ems-admin-pro.vercel.app/',
    githubRepoUrl: 'https://github.com/tilak8923/EMSAdminPro',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Recharts'],
    fullDescription: `
### Project Overview
EMSAdminPro is a comprehensive admin dashboard and management system designed for corporate environments. It enables HR managers and team leads to onboard employees, assign and monitor tasks, track performance metrics, and manage employee records with role-based access control.

### Key Features
- 👥 Employee Onboarding & Directory: Centralized database of employee profiles, contact details, and department details.
- 📋 Task Assignment Board: Assign tasks to employees, set priorities, and track completion states.
- 📊 Interactive Analytics: Visual dashboards featuring department distributions, performance metrics, and task progress using charting libraries.
- 🔒 Role-Based Permissions: Separate access interfaces for Administrators (full control) and Employees (task viewing/marking completed).
- ⚡ Dynamic CRUD System: Seamless management of tasks and employees.

### Technologies Used
- React & Tailwind CSS for a modern corporate layout.
- Node.js & Express for the backend REST API.
- MongoDB for persistence of employee records and tasks.
- Recharts for dynamic data visualization.
    `.trim(),
    screenshots: [],
    useCases: ['Corporate HR Management', 'Task Tracking & Planning', 'HR Performance Analysis'],
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Recharts']
  },
  {
    id: 'AI-Chatbot',
    title: 'MediMate AI (Healthcare Chatbot)',
    shortDescription: 'An AI-powered healthcare assistant web app built with Next.js, Node.js, and Firebase. Features include Google login, real-time chat with a medical AI, and secure chat history management.',
    imageUrl: '/assets/image/headshotUrl.png',
    imageAiHint: 'coding interface',
    liveDemoUrl: 'https://medimateai.vercel.app',
    githubRepoUrl: 'https://github.com/tilak8923/MediMateAI',
    tags: ['Next.js', 'Node.js', 'Tailwind CSS', 'Firebase', 'Google Sign-In', 'AI Chatbot', 'Real-time Chat'],
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
    screenshots: ['/assets/image/AIWSignup.png', '/assets/image/AIWLogin.png', '/assets/image/AIWChat1.png', '/assets/image/AIWChat2.png'],
    useCases: ['Medical Chatbot', 'Patient Support Platform', 'Virtual Health Consultation'],
    technologies: ['Next.js', 'Node.js', 'Tailwind CSS', 'Firebase Authentication', 'Firebase Firestore (Database)', 'Google Sign-In Integration', 'AI Chatbot', 'Responsive UI/UX Design', 'Real-time Chat Interface'],
  },
  {
    id: 'Spotify-Clone',
    title: 'TTS-Spotify (Spotify UI Clone)',
    shortDescription: 'A frontend-only Spotify clone that uses embedded Spotify iframes for streaming real songs. Built using HTML, CSS, and JavaScript, hosted on Netlify.',
    imageUrl: '/assets/image/SpotifyHeadshotUrl.png',
    imageAiHint: 'music player UI with playlist thumbnails',
    liveDemoUrl: 'https://tts-spotify.netlify.app/home.html',
    githubRepoUrl: 'https://github.com/tilak8923/TTS-Spotify',
    tags: ['HTML', 'CSS', 'JavaScript', 'Spotify Embed', 'Responsive UI', 'Netlify Hosting'],
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
    `.trim(),
    screenshots: ['/assets/image/SpotifyLogin.png', '/assets/image/SpotifyHome.png', '/assets/image/SpotifyPlaylist.png', '/assets/image/SpotifyCode.png', '/assets/image/SpotifyReadme1.png', '/assets/image/SpotifyReadme2.png'],
    useCases: ['Music Portfolio Project', 'Beginner-Level Spotify UI Clone', 'Frontend-Only Streaming Demo'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Spotify Embed API', 'Responsive UI', 'Netlify Hosting']
  },
  {
    id: 'AQI-Analysis',
    title: 'Air Quality Index (AQI) Analysis',
    shortDescription: 'An exploratory data analysis and visual profiling of Air Quality Indices (AQI) using Python, analyzing PM2.5, PM10, and other pollutant drivers across different seasons.',
    imageUrl: '/assets/image/customer_segmentation.png',
    imageAiHint: 'air pollution indexes data science dashboard scatter plot',
    githubRepoUrl: 'https://github.com/tilak8923/AQI-Analysis',
    tags: ['Python', 'Jupyter Notebook', 'Data Analysis', 'AQI Profiling', 'Pandas', 'Seaborn', 'Data Science'],
    fullDescription: `
### Project Overview
This repository hosts a data science case study examining regional Air Quality Index (AQI) statistics. By auditing concentration metrics of key particulate matter (PM2.5, PM10, NO2, CO), this analysis maps out trends in environmental hazards and pollution distributions.

### Key Insights & Findings
- **Pollutant Correlation**: Discovered that PM2.5 concentrations are the highest predictor of poor AQI levels during seasonal changes.
- **Clustering Air Quality Zones**: Structured data groups showing "Safe", "Moderate", and "Unhealthy" zones using data visualization tools.
- **Data Cleaning Pipelines**: Handled missing pollution sensor records and outlier spikes to ensure statistical integrity.

### Original Files & Notebooks
- Repository: [AQI-Analysis](https://github.com/tilak8923/AQI-Analysis)
- Core Tools: Pandas, NumPy, Seaborn, Matplotlib, Jupyter Notebook.
    `.trim(),
    screenshots: [],
    useCases: ['Environmental Safety Auditing', 'Exploratory Pollution Profiling', 'Outlier Data Cleaning'],
    technologies: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Matplotlib', 'Jupyter Notebook', 'Recharts']
  },
  {
    id: 'Food-Reduction-Prediction',
    title: 'Food Waste Reduction Prediction Model',
    shortDescription: 'A machine learning regression model built to analyze agricultural/commercial supplies and predict food waste volumes to optimize distribution efficiency.',
    imageUrl: '/assets/image/crop_yield_prediction.png',
    imageAiHint: 'food waste and inventory analytics dashboard line charts',
    githubRepoUrl: 'https://github.com/tilak8923/FoodRedunctionPredictionModel',
    tags: ['Python', 'Jupyter Notebook', 'Machine Learning', 'Regression Models', 'Random Forest', 'Predictive Modeling', 'Data Science'],
    fullDescription: `
### Project Overview
This project develops a predictive machine learning model to estimate commercial food waste volumes. By predicting excess supply margins, it helps organizations optimize food rescue distributions and reduce overall resource decay.

### Key Insights & Findings
- **Model Performance**: Evaluated Random Forest and Gradient Boosting algorithms, achieving high prediction scores for seasonal demand shifts.
- **Key Driver**: Storage durations and packaging types were identified as critical features in predicting shelf-life limits.
- **Impact**: Provides data-driven estimates to coordinate food banks and reduce waste.

### Original Files & Notebooks
- Repository: [FoodRedunctionPredictionModel](https://github.com/tilak8923/FoodRedunctionPredictionModel)
- Core Tools: Scikit-Learn, Pandas, NumPy, Matplotlib, Jupyter Notebook.
    `.trim(),
    screenshots: [],
    useCases: ['Supply Chain Resource Optimization', 'Predictive Shelf-Life Forecasting', 'Machine Learning Model Fitting'],
    technologies: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter Notebook', 'Recharts']
  }
];

export const skillsData: Skill[] = [
  // --- FRONTEND ---
  { name: 'React.js', proficiency: 75, icon: Atom, iconName: 'Atom', category: 'Frontend' },
  { name: 'Next.js', proficiency: 70, icon: Globe, iconName: 'Globe', category: 'Frontend' },
  { name: 'TypeScript', proficiency: 65, icon: Code, iconName: 'Code', category: 'Frontend' },
  { name: 'Tailwind CSS', proficiency: 80, icon: Waves, iconName: 'Waves', category: 'Frontend' },
  { name: 'JavaScript (ES6+)', proficiency: 80, icon: Code, iconName: 'Code', category: 'Frontend' },
  
  // --- BACKEND & DATABASE ---
  { name: 'Node.js & Express', proficiency: 70, icon: Server, iconName: 'Server', category: 'Backend & Database' },
  { name: 'Python', proficiency: 75, icon: Code, iconName: 'Code', category: 'Backend & Database' },
  { name: 'MongoDB', proficiency: 70, icon: Database, iconName: 'Database', category: 'Backend & Database' },
  { name: 'Firebase & Firestore', proficiency: 75, icon: Flame, iconName: 'Flame', category: 'Backend & Database' },
  
  // --- AI, ML & DATA SCIENCE ---
  { name: 'Python (Pandas / NumPy)', proficiency: 80, icon: Code, iconName: 'Code', category: 'AI, ML & Data Science' },
  { name: 'Scikit-Learn & ML Models', proficiency: 70, icon: BrainCog, iconName: 'BrainCog', category: 'AI, ML & Data Science' },
  { name: 'Data Visualization & Charts', proficiency: 75, icon: BarChart, iconName: 'BarChart', category: 'AI, ML & Data Science' },
  { name: 'SQL & Data Warehousing', proficiency: 80, icon: Database, iconName: 'Database', category: 'AI, ML & Data Science' },
  
  // --- TOOLS & UTILITIES ---
  { name: 'Git & GitHub', proficiency: 80, icon: Github, iconName: 'Github', category: 'Tools & Utilities' },
  { name: 'VS Code', proficiency: 85, icon: Code, iconName: 'Code', category: 'Tools & Utilities' },
  { name: 'Linux Command Line', proficiency: 70, icon: Terminal, iconName: 'Terminal', category: 'Tools & Utilities' },
  { name: 'Postman', proficiency: 75, icon: Settings, iconName: 'Settings', category: 'Tools & Utilities' },
  { name: 'Cybersecurity Basics (Nmap/Wireshark)', proficiency: 60, icon: ShieldCheck, iconName: 'ShieldCheck', category: 'Tools & Utilities' },
  { name: 'Docker', proficiency: 50, icon: Settings, iconName: 'Settings', category: 'Tools & Utilities' },
  { name: 'Vercel / Netlify / Cloud Hosting', proficiency: 75, icon: Hexagon, iconName: 'Hexagon', category: 'Tools & Utilities' }
];

export const socialLinksData: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/tilak8923', icon: Github },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tilak-tiwari-33b84825a', icon: Linkedin },
  { name: 'Twitter', url: 'https://x.com/tilaktiwari_', icon: Twitter },
];

export const getProjects = (): Project[] => projectsData;
export const getProjectById = (id: string): Project | undefined => projectsData.find(p => p.id === id);


    
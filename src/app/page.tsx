'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/sections/hero-section';
import AboutMeSection from '@/components/sections/about-me-section';
import SkillsOverviewSection from '@/components/sections/skills-overview-section';
import ProjectShowcaseSection from '@/components/sections/project-showcase-section';
import ContactSection from '@/components/sections/contact-section';
import { getAboutMe, getProjects, getSkills } from '@/lib/portfolio-service';
import { aboutMe as staticAboutMe, projectsData as staticProjects, skillsData as staticSkills, Project, Skill, AboutMeData } from '@/lib/portfolio-data';

export default function HomePage() {
  const [aboutData, setAboutData] = useState<AboutMeData>(staticAboutMe);
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [skills, setSkills] = useState<Skill[]>(staticSkills);

  useEffect(() => {
    async function loadDynamicData() {
      try {
        const loadedAbout = await getAboutMe();
        const loadedProjects = await getProjects();
        const loadedSkills = await getSkills();
        
        setAboutData(loadedAbout);
        setProjects(loadedProjects);
        setSkills(loadedSkills);
      } catch (error) {
        console.error('Failed to load portfolio dynamic data:', error);
      }
    }
    loadDynamicData();
  }, []);

  return (
    <>
      <HeroSection name={aboutData.name} title={aboutData.title} tagline={aboutData.tagline} />
      <AboutMeSection aboutMe={aboutData} />
      <SkillsOverviewSection skills={skills} />
      <ProjectShowcaseSection projects={projects} limit={6} showViewAllButton={true} />
      <ContactSection />
    </>
  );
}

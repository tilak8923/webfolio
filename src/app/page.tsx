import HeroSection from '@/components/sections/hero-section';
import AboutMeSection from '@/components/sections/about-me-section';
import SkillsOverviewSection from '@/components/sections/skills-overview-section';
import ProjectShowcaseSection from '@/components/sections/project-showcase-section';
import ContactSection from '@/components/sections/contact-section';
import { aboutMe, projectsData, skillsData } from '@/lib/portfolio-data';

export default function HomePage() {
  return (
    <>
      <HeroSection name={aboutMe.name} title={aboutMe.title} tagline={aboutMe.tagline} />
      <AboutMeSection aboutMe={aboutMe} />
      <SkillsOverviewSection skills={skillsData} />
      <ProjectShowcaseSection projects={projectsData} limit={3} showViewAllButton={true} />
      <ContactSection />
    </>
  );
}

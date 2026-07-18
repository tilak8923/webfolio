'use client';

import { useEffect, useState } from 'react';
import ProjectShowcaseSection from '@/components/sections/project-showcase-section';
import { getProjects as fetchDynamicProjects } from '@/lib/portfolio-service';
import { projectsData as staticProjects, Project } from '@/lib/portfolio-data';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(staticProjects);

  useEffect(() => {
    async function loadProjects() {
      try {
        const loaded = await fetchDynamicProjects();
        setProjects(loaded);
      } catch (error) {
        console.error('Failed to load dynamic projects list:', error);
      }
    }
    loadProjects();
  }, []);

  return (
    <div className="container py-12 max-w-6xl">
      <div className="text-center space-y-3 mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl text-primary">
          All Projects
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A collection of cybersecurity tools, full-stack applications, and interactive front-end web platforms.
        </p>
        <div className="h-1 w-12 bg-primary rounded-full mx-auto" />
      </div>
      <ProjectShowcaseSection projects={projects} />
    </div>
  );
}

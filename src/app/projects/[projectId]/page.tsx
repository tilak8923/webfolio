'use client';

import { useEffect, useState } from 'react';
import { getProjectById as fetchDynamicProject } from '@/lib/portfolio-service';
import { getProjectById as getStaticProjectById, Project } from '@/lib/portfolio-data';
import ProjectDetailSection from '@/components/sections/project-detail-section';
import { notFound, useParams } from 'next/navigation';

export default function ProjectPage() {
  const params = useParams();
  const projectId = params?.projectId as string;
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    async function loadProject() {
      if (!projectId) return;
      try {
        const loaded = await fetchDynamicProject(projectId);
        if (loaded) {
          setProject(loaded);
        } else {
          // Try static fallback
          const staticProj = getStaticProjectById(projectId);
          setProject(staticProj || null);
        }
      } catch (error) {
        console.error('Failed to load dynamic project details:', error);
        const staticProj = getStaticProjectById(projectId);
        setProject(staticProj || null);
      }
    }
    loadProject();
  }, [projectId]);

  // Loading state skeleton
  if (project === undefined) {
    return (
      <div className="container py-24 text-center max-w-4xl">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-secondary rounded-lg w-3/4 mx-auto" />
          <div className="flex justify-center space-x-2">
            <div className="h-6 bg-secondary rounded w-16" />
            <div className="h-6 bg-secondary rounded w-16" />
            <div className="h-6 bg-secondary rounded w-16" />
          </div>
          <div className="aspect-video bg-secondary rounded-xl w-full" />
          <div className="h-32 bg-secondary rounded-xl w-full" />
        </div>
      </div>
    );
  }

  // Not found redirect
  if (project === null) {
    notFound();
  }

  return <ProjectDetailSection project={project} />;
}

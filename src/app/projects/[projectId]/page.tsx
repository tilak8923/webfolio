import { getProjectById, getProjects } from '@/lib/portfolio-data';
import ProjectDetailSection from '@/components/sections/project-detail-section';
import { notFound } from 'next/navigation';

type ProjectPageProps = {
  params: {
    projectId: string;
  };
};

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    projectId: project.id,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetailSection project={project} />;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = getProjectById(params.projectId);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  return {
    title: `${project.title} | FolioForge`,
    description: project.shortDescription,
  };
}

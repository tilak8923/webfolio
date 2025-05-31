import ProjectShowcaseSection from '@/components/sections/project-showcase-section';
import { getProjects } from '@/lib/portfolio-data';

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="container py-12">
      <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-primary">
        All Projects
      </h1>
      <ProjectShowcaseSection projects={projects} />
    </div>
  );
}

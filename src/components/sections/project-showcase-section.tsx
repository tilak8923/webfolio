import type { Project } from '@/lib/portfolio-data';
import ProjectCard from '@/components/custom/project-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProjectShowcaseSectionProps {
  projects: Project[];
  limit?: number;
  showViewAllButton?: boolean;
}

export default function ProjectShowcaseSection({ projects, limit, showViewAllButton = false }: ProjectShowcaseSectionProps) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="projects" className={showViewAllButton ? 'bg-secondary' : ''}>
      <div className="container">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-10 text-primary">
          Featured Projects
        </h2>
        {displayedProjects.length === 0 ? (
          <p className="text-center text-muted-foreground">No projects to display yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        {showViewAllButton && projects.length > (limit || 0) && (
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

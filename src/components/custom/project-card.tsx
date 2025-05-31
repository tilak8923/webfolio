import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/portfolio-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary">
      <CardHeader>
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={project.imageAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="font-headline text-xl mb-2 text-primary">{project.title}</CardTitle>
        <CardDescription className="mb-3 text-sm text-muted-foreground line-clamp-3">{project.shortDescription}</CardDescription>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-4 border-t">
        <div className="flex space-x-2">
          {project.liveDemoUrl && (
            <Button variant="outline" size="sm" asChild className="transition-colors hover:border-accent hover:text-accent">
              <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Link>
            </Button>
          )}
          {project.githubRepoUrl && (
            <Button variant="outline" size="sm" asChild className="transition-colors hover:border-accent hover:text-accent">
              <Link href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
          )}
        </div>
        <Button variant="link" size="sm" asChild className="text-primary hover:text-accent p-0 h-auto">
          <Link href={`/projects/${project.id}`}>
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

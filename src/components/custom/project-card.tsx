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
  // Determine badge styling based on tag contents
  const getBadgeVariant = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('security') || t.includes('threat') || t.includes('intel') || t.includes('hacking')) {
      return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
    }
    if (t.includes('next.js') || t.includes('react') || t.includes('typescript')) {
      return 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20';
    }
    if (t.includes('node') || t.includes('express') || t.includes('mongodb') || t.includes('prisma')) {
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
    }
    return 'bg-secondary text-secondary-foreground border-border/50';
  };

  return (
    <Card className="group flex flex-col overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 rounded-2xl">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/5 z-10 transition-colors group-hover:bg-black/0" />
          <Image
            src={project.imageUrl || 'https://placehold.co/600x400.png'}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700 ease-out group-hover:scale-105"
            data-ai-hint={project.imageAiHint}
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-5 space-y-4">
        <div className="space-y-1">
          <CardTitle className="font-headline text-lg sm:text-xl text-foreground font-bold transition-colors group-hover:text-primary leading-tight">
            {project.title}
          </CardTitle>
        </div>
        
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {project.shortDescription}
        </CardDescription>
        
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getBadgeVariant(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 p-5 pt-0 border-t border-border/40 bg-secondary/10 mt-auto">
        <div className="flex gap-2">
          {project.liveDemoUrl && (
            <Button variant="outline" size="sm" asChild className="h-8 text-xs font-medium px-3 rounded-lg transition-all duration-300 hover:border-primary hover:text-primary active:scale-95">
              <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live
              </Link>
            </Button>
          )}
          {project.githubRepoUrl && (
            <Button variant="outline" size="sm" asChild className="h-8 text-xs font-medium px-3 rounded-lg transition-all duration-300 hover:border-primary hover:text-primary active:scale-95">
              <Link href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1.5 h-3.5 w-3.5" /> GitHub
              </Link>
            </Button>
          )}
        </div>
        
        <Button variant="link" size="sm" asChild className="text-primary hover:text-accent p-0 h-auto self-start sm:self-auto text-xs font-semibold">
          <Link href={`/projects/${project.id}`}>
            View Details <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

import type { Project } from '@/lib/portfolio-data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectDetailSectionProps {
  project: Project;
}

export default function ProjectDetailSection({ project }: ProjectDetailSectionProps) {
  return (
    <section className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl text-primary mb-4">
          {project.title}
        </h1>
        <div className="mb-6">
          {project.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="mr-2 mb-2">{tag}</Badge>
          ))}
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg mb-8">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={project.imageAiHint}
          />
        </div>
        
        <div className="flex space-x-4 mb-8">
          {project.liveDemoUrl && (
            <Button asChild className="transition-transform hover:scale-105">
              <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Link>
            </Button>
          )}
          {project.githubRepoUrl && (
            <Button variant="outline" asChild className="transition-transform hover:scale-105">
              <Link href={project.githubRepoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View on GitHub
              </Link>
            </Button>
          )}
        </div>

        <div className="prose dark:prose-invert max-w-none mb-8">
          <h2 className="font-headline text-2xl font-semibold mb-3">Project Overview</h2>
          <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{project.shortDescription}</p>
          
          <h2 className="font-headline text-2xl font-semibold mt-6 mb-3">Full Description</h2>
          <div className="text-muted-foreground whitespace-pre-line leading-relaxed" dangerouslySetInnerHTML={{ __html: project.fullDescription.replace(/### (.*)/g, '<h3 class="font-headline text-xl font-semibold mt-4 mb-2">$1</h3>').replace(/\n- (.*)/g, '\n<li class="ml-4">$1</li>').replace(/\n/g, '<br />') }} />
        </div>

        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-8">
            <h2 className="font-headline text-2xl font-semibold mb-3">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>
        )}

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-8">
            <h2 className="font-headline text-2xl font-semibold mb-3">Screenshots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((src, index) => (
                <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg shadow-md">
                  <Image 
                    src={src} 
                    alt={`${project.title} screenshot ${index + 1}`} 
                    layout="fill" 
                    objectFit="cover"
                    data-ai-hint="application screenshot" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {project.useCases && project.useCases.length > 0 && (
          <div>
            <h2 className="font-headline text-2xl font-semibold mb-3">Use Cases</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {project.useCases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-12 text-center">
            <Button asChild variant="outline">
                <Link href="/projects">Back to Projects</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

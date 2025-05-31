import Image from 'next/image';
import type { AboutMeData } from '@/lib/portfolio-data';

interface AboutMeSectionProps {
  aboutMe: AboutMeData;
}

export default function AboutMeSection({ aboutMe }: AboutMeSectionProps) {
  return (
    <section id="about" className="bg-secondary">
      <div className="container grid items-center gap-8 md:grid-cols-2 lg:gap-12">
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-lg shadow-xl aspect-square">
          <Image
            src={aboutMe.headshotUrl}
            alt={aboutMe.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
            data-ai-hint={aboutMe.headshotAiHint}
          />
        </div>
        <div className="space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">About Me</h2>
          <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
            {aboutMe.bio}
          </p>
        </div>
      </div>
    </section>
  );
}

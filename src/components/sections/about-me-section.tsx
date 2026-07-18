import Image from 'next/image';
import type { AboutMeData } from '@/lib/portfolio-data';
import { Briefcase, Code, Shield } from 'lucide-react';

interface AboutMeSectionProps {
  aboutMe: AboutMeData;
}

export default function AboutMeSection({ aboutMe }: AboutMeSectionProps) {
  const stats = [
    { label: 'Projects Built', value: '5+', icon: Briefcase, color: 'text-blue-500' },
    { label: 'Tools Mastered', value: '15+', icon: Code, color: 'text-purple-500' },
    { label: 'Cyber Security Focus', value: 'Learner', icon: Shield, color: 'text-emerald-500' },
  ];

  return (
    <section id="about" className="bg-secondary/40 py-16 md:py-24 border-y border-border/30">
      <div className="container grid items-center gap-12 md:grid-cols-2 lg:gap-16 max-w-6xl">
        <div className="relative group mx-auto w-full max-w-sm aspect-square">
          {/* Animated decorative glow rings */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary to-accent opacity-30 blur-md transition duration-500 group-hover:opacity-60 group-hover:duration-200" />
          
          <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl bg-background border border-border/50">
            <Image
              src={aboutMe.headshotUrl}
              alt={aboutMe.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={aboutMe.headshotAiHint}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-primary">About Me</h2>
            <div className="h-1 w-12 bg-primary rounded-full" />
          </div>
          
          <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-line">
            {aboutMe.bio}
          </p>
          
          <div className="grid grid-cols-3 gap-4 pt-4">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-background border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-1"
              >
                <stat.icon className={`h-5 w-5 mb-2 ${stat.color}`} />
                <span className="font-headline text-2xl font-bold text-foreground leading-none mb-1">{stat.value}</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground text-center font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

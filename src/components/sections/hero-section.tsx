import { Button } from "@/components/ui/button";
import Link from "next/link";
import TechBackdrop from "@/components/custom/tech-backdrop";
import TypingText from "@/components/custom/typing-text";

interface HeroSectionProps {
  name: string;
  title: string;
  tagline: string;
}

export default function HeroSection({ name, title, tagline }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 md:py-24 lg:py-32">
      {/* Interactive canvas backdrop */}
      <TechBackdrop />
      
      {/* Decorative gradient radial glow */}
      <div className="absolute top-1/2 left-1/2 -z-20 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/20" />
      
      <div className="container text-center space-y-8 max-w-4xl px-4 z-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase animate-fade-in-up">
            Welcome to my portfolio
          </p>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent dark:from-primary-foreground dark:to-accent select-none pb-2">
            {name}
          </h1>
          <div className="font-headline text-2xl font-bold text-foreground/90 sm:text-3xl md:text-4xl min-h-[2.5rem]">
            I'm a <TypingText words={['Full-Stack Developer', 'Cybersecurity Learner', 'Problem Solver', 'Open-Source Explorer']} />
          </div>
        </div>
        
        <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
          {tagline}
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
          <Button asChild size="lg" className="px-8 shadow-md shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95">
            <Link href="/projects">View My Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 transition-all duration-300 hover:scale-105 hover:bg-secondary/50 active:scale-95">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

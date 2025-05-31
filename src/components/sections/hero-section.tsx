import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroSectionProps {
  name: string;
  title: string;
  tagline: string;
}

export default function HeroSection({ name, title, tagline }: HeroSectionProps) {
  return (
    <section className="container grid min-h-[calc(100vh-4rem)] place-items-center py-12 md:py-24 lg:py-32">
      <div className="text-center space-y-6">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
          {name}
        </h1>
        <p className="font-headline text-xl font-medium text-foreground/80 sm:text-2xl md:text-3xl">
          {title}
        </p>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          {tagline}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="transition-transform hover:scale-105">
            <Link href="/projects">View My Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="transition-transform hover:scale-105">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

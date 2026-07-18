'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DarkModeToggle } from '@/components/custom/dark-mode-toggle';
import { aboutMe } from '@/lib/portfolio-data';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/sandbox', label: 'Dev Sandbox' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-border/40 shadow-[0_0_15px_rgba(16,185,129,0.05)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_18px_rgba(16,185,129,0.25)] group-hover:border-primary/50">
            <Image
              src="/assets/image/logo-circle.png"
              alt="Tilak logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
            Tilakfolio
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button asChild variant="outline">
            <a href={aboutMe.resumeUrl} download>Download Resume</a>
          </Button>
          <DarkModeToggle />
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild variant="outline" className="w-full mt-4">
                  <a href={aboutMe.resumeUrl} download>Download Resume</a>
                </Button>
                <div className="mt-4 flex justify-center">
                   <DarkModeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}

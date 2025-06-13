import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DarkModeToggle } from '@/components/custom/dark-mode-toggle';
import { aboutMe } from '@/lib/portfolio-data';
import { Menu,} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/seo-optimizer', label: 'SEO Tool' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          {/* <Feather className="h-6 w-6 text-primary" /> */}
          {/* <span className="font-headline text-xl font-bold">Webfolio by Tilak</span> */}
          <img  src='assets/image/mainLogo.png' alt="Webfolio by Tilak logo"
  className="h-60 w-60 object-contain"/>
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
    </header>
  );
}

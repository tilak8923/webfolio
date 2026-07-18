import Link from 'next/link';
import { socialLinksData } from '@/lib/portfolio-data';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card/30">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:h-20 md:flex-row md:py-0">
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {currentYear} Tilak Tiwari. All rights reserved.
          </p>
          <Link 
            href="/admin" 
            className="text-xs text-muted-foreground/30 hover:text-primary transition-colors flex items-center gap-1 font-medium"
            title="Secret Admin Dashboard"
          >
            <ShieldCheck className="h-3 w-3" /> Admin Portal
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          {socialLinksData.map((social) => (
            <Button key={social.name} variant="ghost" size="icon" asChild className="hover:text-primary transition-colors">
              <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                <social.icon className="h-5 w-5" />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}

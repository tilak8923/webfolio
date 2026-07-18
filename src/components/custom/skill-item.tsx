import type { Skill } from '@/lib/portfolio-data';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface SkillItemProps {
  skill: Skill;
}

export default function SkillItem({ skill }: SkillItemProps) {
  const IconComponent = skill.icon;

  return (
    <Card className="group relative overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5">
      {/* Decorative hover gradient glow line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle className="text-sm font-semibold font-headline text-card-foreground/90 transition-colors group-hover:text-primary">
          {skill.name}
        </CardTitle>
        {IconComponent && (
          <IconComponent className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-accent" />
        )}
      </CardHeader>
    </Card>
  );
}

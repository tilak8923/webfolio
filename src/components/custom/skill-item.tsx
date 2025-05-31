import type { Skill } from '@/lib/portfolio-data';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SkillItemProps {
  skill: Skill;
}

export default function SkillItem({ skill }: SkillItemProps) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium font-headline">{skill.name}</CardTitle>
        {skill.icon && <skill.icon className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <Progress value={skill.proficiency} aria-label={`${skill.name} proficiency: ${skill.proficiency}%`} className="h-3" />
        <p className="text-xs text-muted-foreground mt-1">{skill.proficiency}% Proficiency</p>
      </CardContent>
    </Card>
  );
}

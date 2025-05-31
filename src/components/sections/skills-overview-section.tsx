import type { Skill } from '@/lib/portfolio-data';
import SkillItem from '@/components/custom/skill-item';

interface SkillsOverviewSectionProps {
  skills: Skill[];
}

export default function SkillsOverviewSection({ skills }: SkillsOverviewSectionProps) {
  return (
    <section id="skills">
      <div className="container">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-10 text-primary">
          My Skills
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill) => (
            <SkillItem key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

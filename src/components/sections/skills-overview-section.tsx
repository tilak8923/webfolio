'use client';

import type { Skill } from '@/lib/portfolio-data';
import SkillItem from '@/components/custom/skill-item';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SkillsOverviewSectionProps {
  skills: Skill[];
}

export default function SkillsOverviewSection({ skills }: SkillsOverviewSectionProps) {
  // Define categories
  const categories = [
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend & Database', label: 'Backend & DB' },
    { value: 'AI, ML & Data Science', label: 'AI & Data Science' },
    { value: 'Tools & Utilities', label: 'Tools & Utilities' },
  ];

  // Group skills by category
  const getSkillsByCategory = (category: string) => {
    return skills.filter((s) => s.category === category);
  };

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container max-w-6xl">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-primary">
            Skills & Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive list of technologies, frameworks, and specialized tools I work with.
          </p>
          <div className="h-1 w-12 bg-primary rounded-full mx-auto" />
        </div>

        <Tabs defaultValue="Frontend" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-2xl grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-0 h-auto p-1 bg-muted rounded-xl">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="font-headline text-xs sm:text-sm py-2.5 px-3 rounded-lg transition-all"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => {
            const filteredSkills = getSkillsByCategory(cat.value);
            return (
              <TabsContent key={cat.value} value={cat.value} className="space-y-4 focus-visible:outline-none">
                {filteredSkills.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No skills found in this category.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-in">
                    {filteredSkills.map((skill) => (
                      <SkillItem key={skill.name} skill={skill} />
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}

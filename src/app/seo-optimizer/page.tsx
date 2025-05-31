import SEOOptimizerForm from '@/components/custom/seo-optimizer-form';

export const metadata = {
  title: 'SEO Optimizer | FolioForge',
  description: 'Optimize your content for SEO using AI. Enhance your bio and project descriptions.',
};

export default function SEOOptimizerPage() {
  return (
    <section className="container py-12">
      <SEOOptimizerForm />
    </section>
  );
}

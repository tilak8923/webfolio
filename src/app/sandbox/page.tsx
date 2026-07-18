import CyberSandbox from '@/components/custom/cyber-sandbox';

export const metadata = {
  title: 'Dev & AI Sandbox | Tilak Tiwari',
  description: 'Interactive developer & AI terminal simulator. Train machine learning models, analyze dataset statistics, and run system diagnostics.',
};

export default function SandboxPage() {
  return (
    <div className="container py-12 max-w-6xl space-y-8">
      <div className="text-center space-y-3 mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl text-primary">
          Dev & AI Shell Sandbox
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          An interactive command-line simulator showing your development tools, dataset segmentations, and machine learning models.
        </p>
        <div className="h-1 w-12 bg-primary rounded-full mx-auto" />
      </div>

      <CyberSandbox />
    </div>
  );
}

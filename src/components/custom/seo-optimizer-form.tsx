"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getOptimizedTextAction, type SEOOptimizerFormState } from "@/app/actions/seo";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const initialState: SEOOptimizerFormState = {
  message: "",
  errors: {},
  optimizedText: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full transition-transform hover:scale-105">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Optimize Text
    </Button>
  );
}

export default function SEOOptimizerForm() {
  const [state, formAction] = useFormState(getOptimizedTextAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.success && state.errors && Object.keys(state.errors).length > 0) {
      const errorMessages = Object.values(state.errors).flat().join("\n");
      toast({
        title: "Optimization Error",
        description: state.message || errorMessages || "An unknown error occurred during optimization.",
        variant: "destructive",
      });
    } else if (state.message && state.success) {
        toast({
            title: "Success!",
            description: state.message,
        });
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">SEO Content Optimizer</CardTitle>
        <CardDescription>
          Enter your text and target keywords to get an AI-optimized version for better SEO performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="text" className="font-medium">Text to Optimize</Label>
            <Textarea
              id="text"
              name="text"
              placeholder="Paste your bio, project description, or any text here..."
              required
              rows={8}
              className="mt-1"
              aria-describedby="text-error"
            />
            {state.errors?.text && (
              <p id="text-error" className="text-sm text-destructive mt-1">
                {state.errors.text.join(", ")}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="keywords" className="font-medium">Target Keywords</Label>
            <Input
              id="keywords"
              name="keywords"
              type="text"
              placeholder="e.g., web development, Next.js, portfolio"
              required
              className="mt-1"
              aria-describedby="keywords-error"
            />
            {state.errors?.keywords && (
              <p id="keywords-error" className="text-sm text-destructive mt-1">
                {state.errors.keywords.join(", ")}
              </p>
            )}
          </div>
           {state.errors?.server && (
            <p className="text-sm text-destructive text-center">
              {state.errors.server.join(", ")}
            </p>
          )}
          <SubmitButton />
        </form>
      </CardContent>
      {state.optimizedText && (
        <CardFooter className="flex-col items-start gap-2 pt-6 border-t">
          <h3 className="font-headline text-lg font-semibold text-primary">Optimized Text:</h3>
          <Textarea
            readOnly
            value={state.optimizedText}
            rows={8}
            className="bg-muted/50 border-dashed"
            aria-label="Optimized SEO text"
          />
        </CardFooter>
      )}
    </Card>
  );
}

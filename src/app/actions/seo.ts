'use server';
import { optimizeSEO, type OptimizeSEOInput } from '@/ai/flows/optimize-seo';
import { z } from 'zod';

const seoOptimizerSchema = z.object({
  text: z.string().min(10, { message: "Text must be at least 10 characters." }),
  keywords: z.string().min(3, { message: "Keywords must be at least 3 characters." }),
});

export interface SEOOptimizerFormState {
  message?: string;
  errors?: {
    text?: string[];
    keywords?: string[];
    server?: string[];
  };
  optimizedText?: string | null;
  success: boolean;
}

export async function getOptimizedTextAction(
  prevState: SEOOptimizerFormState,
  formData: FormData
): Promise<SEOOptimizerFormState> {
  const rawData = {
    text: formData.get('text'),
    keywords: formData.get('keywords'),
  };

  const validatedFields = seoOptimizerSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
      optimizedText: null,
      success: false,
    };
  }

  try {
    const result = await optimizeSEO(validatedFields.data as OptimizeSEOInput);
    return { 
      optimizedText: result.optimizedText,
      message: "Text optimized successfully!",
      errors: {},
      success: true 
    };
  } catch (error) {
    console.error("SEO Optimization Error:", error);
    return { 
      errors: { server: ["Failed to optimize text due to a server error. Please try again."] },
      message: "Server error during optimization.",
      optimizedText: null,
      success: false
    };
  }
}

'use server';

/**
 * @fileOverview An AI agent that optimizes text for SEO.
 *
 * - optimizeSEO - A function that optimizes input text for search engine optimization.
 * - OptimizeSEOInput - The input type for the optimizeSEO function.
 * - OptimizeSEOOutput - The return type for the optimizeSEO function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeSEOInputSchema = z.object({
  text: z.string().describe('The text to optimize for SEO.'),
  keywords: z.string().describe('Comma separated list of keywords to optimize for.'),
});
export type OptimizeSEOInput = z.infer<typeof OptimizeSEOInputSchema>;

const OptimizeSEOOutputSchema = z.object({
  optimizedText: z.string().describe('The text optimized for SEO.'),
});
export type OptimizeSEOOutput = z.infer<typeof OptimizeSEOOutputSchema>;

export async function optimizeSEO(input: OptimizeSEOInput): Promise<OptimizeSEOOutput> {
  return optimizeSEOFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeSEOPrompt',
  input: {schema: OptimizeSEOInputSchema},
  output: {schema: OptimizeSEOOutputSchema},
  prompt: `You are an SEO expert. Optimize the following text for the keywords provided.\n\nText: {{{text}}}\nKeywords: {{{keywords}}}`,
});

const optimizeSEOFlow = ai.defineFlow(
  {
    name: 'optimizeSEOFlow',
    inputSchema: OptimizeSEOInputSchema,
    outputSchema: OptimizeSEOOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

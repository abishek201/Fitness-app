import { generateText, Output } from 'ai'; // 👈 Use the modern Output API
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const { image } = await req.json();
    console.log('📸 Image received:', image?.substring(0, 50) + '...');

    if (!image) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }

    // Clean up data URL headers if present
    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

    const result = await generateText({
      model: google('gemini-3.6-flash'), 
      
      // 👇 Modern AI SDK syntax for strongly-typed JSON validation
      output: Output.object({
        schema: z.object({
          foodName: z.string(),
          confidence: z.number(),
          macros: z.object({
            calories: z.number(),
            protein: z.number(),
            carbs: z.number(),
            fat: z.number(),
          }),
          ingredients: z.array(z.string()),
          advice: z.string(),
        }),
      }),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this food image and estimate its macronutrients.',
            },
            {
              type: 'image',
              image: base64Image,
            },
          ],
        },
      ],
    });

    // Validated JSON output will be accessible at result.output
    console.log('✅ Gemini structured response:', result.output);

    return Response.json(result.output);
  } catch (error) {
    console.error('❌ API Error:', error);
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}

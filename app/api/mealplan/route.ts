import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  try {
    // Debug 1: Check if request body is received
    const body = await req.json();
    console.log('📦 Request body received:', body);

    const userData = body;
    
    // Debug 2: Check if API key exists
    console.log('🔑 API Key exists:', !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    console.log('🔑 API Key preview:', process.env.GOOGLE_GENERATIVE_AI_API_KEY?.substring(0, 15) + '...');

    // Debug 3: Build prompt
    const prompt = `You are a professional nutritionist. Create a personalized 7-day meal plan.

USER PROFILE:
- Name: ${userData.name || 'User'}
- Goal: ${userData.goal || 'maintain weight'}
- Daily Calorie Target: ${userData.caloriesTarget || 2000} kcal
- Protein Target: ${userData.proteinTarget || 50}g
- Carbs Target: ${userData.carbsTarget || 250}g
- Fats Target: ${userData.fatsTarget || 65}g
- Activity Level: ${userData.activity || 'moderate'}
- Allergens to AVOID: ${userData.allergens?.join(', ') || 'None'}
- Health Conditions: ${userData.diseases || 'None'}

INSTRUCTIONS:
1. Create a 7-day meal plan (Monday to Sunday)
2. Each day must include: Breakfast, Lunch, Dinner, and 2 Snacks
3. STRICTLY AVOID these allergens: ${userData.allergens?.join(', ') || 'None'}
4. Consider health condition: ${userData.diseases || 'None'}
5. Target approximately ${userData.caloriesTarget || 2000} calories per day
6. provide a meal plan which is daily available in the india and can be prepared at home.


Return ONLY a JSON object with this exact structure:
{
  "days": [
    {
      "day": "Monday",
      "totalCalories": 2900,
      "meals": [
        {
          "type": "Breakfast",
          "name": "Meal name",
          "description": "Brief description",
          "calories": 600,
          "protein": 25,
          "carbs": 60,
          "fat": 20
        }
      ]
    }
  ],
  "tips": ["Tip 1", "Tip 2"],
  "warnings": ["Warning 1"]
}`;

    console.log('📝 Prompt built, calling Gemini...');

    // Debug 4: Call Gemini
    const result = await generateText({
      model: google('gemini-3.6-flash'),
      prompt: prompt,
      temperature: 0.7,
    });

    console.log('✅ Gemini response received:', result.text?.substring(0, 100) + '...');

    // Debug 5: Parse JSON
    const jsonMatch = result.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('❌ No JSON found in response:', result.text);
      throw new Error('Invalid response format from AI');
    }

    const mealPlan = JSON.parse(jsonMatch[0]);
    console.log('✅ Meal plan parsed successfully');

    return Response.json(mealPlan);

  } catch (error) {
    console.error('❌ Meal plan error:', error);
    console.error('❌ Error stack:', (error as Error).stack);
    return Response.json(
      { error: 'Failed to generate meal plan: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
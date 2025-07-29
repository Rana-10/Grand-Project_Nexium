// app/api/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("✅ Received form data:", body);

    const prompt = `Suggest 5 ${body.diet} ${body.cuisine} ${body.mealType} dishes using the following ingredients: ${body.ingredients.join(', ')}.`;

    console.log("📤 Sending prompt to OpenAI:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const responseContent = completion.choices[0]?.message?.content;
    console.log("✅ OpenAI raw response:", responseContent);

    const generatedText = responseContent && responseContent.trim().length > 0
      ? responseContent
      : "No dishes found. Please try different ingredients.";

    return NextResponse.json({ dishes: generatedText });

  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ API Error:", error.message);
    } else {
      console.error("❌ Unknown Error:", error);
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

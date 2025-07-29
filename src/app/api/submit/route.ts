import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { ingredients, cuisine, mealType, diet } = data;

  // Insert into Supabase
  const { error } = await supabase.from('Storing Recipes').insert([
    {
      ingredients,
      cuisine,
      meal_type: mealType,
      diet,
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Form data saved to Supabase',
  });

  
}

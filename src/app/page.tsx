"use client";

import RecipeForm from "@/components/recipe_form";

interface FormData {
  ingredients: string[];
  diet: string;
  cuisine: string;
  mealType: string;
}

export default function Home() {
  const handleFormSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", data);
    // Later: send to n8n or API
  };

  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-white font-sans">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Recipe Generator</h1>
      <RecipeForm onSubmit={handleFormSubmit} />
    </main>
  );
}

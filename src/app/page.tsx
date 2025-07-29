"use client";

import { useState } from "react";
import RecipeForm from "@/components/recipe_form";

interface FormData {
  ingredients: string[];
  diet: string;
  cuisine: string;
  mealType: string;
}

export default function Home() {
  const [dishes, setDishes] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const handleFormSubmit = async (data: FormData) => {
  console.log("Form Data Submitted:", data);

  setLoading(true);
  setError(null);
  setDishes(null);

  try {
    // First, save data to Supabase
    const saveResponse = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!saveResponse.ok) {
      throw new Error("Failed to save data to Supabase");
    }

    const saveResult = await saveResponse.json();
    console.log("Supabase Save Response:", saveResult);

    // Then, fetch suggested dishes from OpenAI
    const suggestResponse = await fetch("/api/suggest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!suggestResponse.ok) {
      throw new Error("Failed to generate dishes from OpenAI");
    }

    const suggestResult = await suggestResponse.json();
    console.log("OpenAI Suggestion Response:", suggestResult);

    setDishes(suggestResult.dishes || "No dishes found.");
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
      console.error("Submission error:", error.message);
    } else {
      setError("Unknown error occurred");
      console.error("Unknown submission error", error);
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-white font-sans p-4">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Recipe Generator</h1>

      <RecipeForm onSubmit={handleFormSubmit} />

      {loading && (
        <p className="mt-6 text-yellow-400">Generating recipes...</p>
      )}

      {error && (
        <p className="mt-6 text-red-500">Error: {error}</p>
      )}

      {dishes && (
        <div className="mt-6 p-4 bg-neutral-800 rounded-lg shadow-md max-w-xl w-full">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            Suggested Dishes:
          </h2>
          <pre className="whitespace-pre-wrap">{dishes}</pre>
        </div>
      )}
    </main>
  );
}

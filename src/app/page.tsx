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
  const [copied, setCopied] = useState(false);

  const handleFormSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setDishes(null);

    try {
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

      await saveResponse.json();

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
      setDishes(suggestResult.dishes || "No dishes found.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppShare = () => {
    if (dishes) {
      const message = `Here are some dishes GPT suggested:\n\n${dishes}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleCopy = () => {
    if (dishes) {
      navigator.clipboard.writeText(`Here are some dishes GPT suggested:\n\n${dishes}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
        <div className="background-blur">
    <main className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: "var(--color-background)", color: "var(--color-foreground)" }}>
    <h1 className=" text-5xl font-pacifico text-[#283618] mb-8">ammibot ai</h1>

      <RecipeForm onSubmit={handleFormSubmit} />

      {loading && (
        <p className="mt-6" style={{ color: "var(--color-secondary)" }}>
          Generating recipes...
        </p>
      )}

      {error && (
        <p className="mt-6" style={{ color: "var(--color-secondary)" }}>
          Error: {error}
        </p>
      )}


        {dishes && (
          <>
            <div className="card mt-6 w-full max-w-xl">
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--color-primary)" }}>
                Suggested Dishes:
              </h2>
              <pre className="whitespace-pre-wrap">{dishes}</pre>
            </div>

            {/* WhatsApp Share Button */}
            <button
              onClick={handleWhatsAppShare}
              className="mt-4 inline-block bg-[#556B2F] text-white px-4 py-2 rounded hover:bg-[#556B2F] hover:text-white transition duration-200 cursor-pointer"
            >
              Share on WhatsApp
            </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(`Here are some dishes GPT suggested:\n\n${dishes}`);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="clickable mt-4 inline-block cursor-pointer bg-[#556B2F] text-white px-4 py-2 rounded hover:bg-[#556B2F] hover:text-white transition duration-200"
          >
            Copy to Clipboard
          </button>

          {copied && (
            <p className="text-sm mt-1"  style={{ color: "var(--color-primary)" }}>
              Copied!
            </p>
          )}
        </>
      )}
    </main>
        </div>
  );
}

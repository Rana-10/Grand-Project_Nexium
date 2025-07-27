"use client";

import { useState } from "react";

// Type for props
interface FormData {
  ingredients: string[];
  cuisine: string;
  mealType: string;
  diet: string;
}

const INGREDIENT_OPTIONS = [
  "Onion", "Garlic", "Tomato", "Green Chili", "Cumin", "Coriander",
  "Red Chili Powder", "Turmeric", "Salt", "Ginger", "Oil", "Garam Masala",
  "Black Pepper", "Yogurt", "Butter", "Chicken", "Beef", "Rice", "Lentils", "Potato",
];

const CUISINES = ["Pakistani", "Indian", "Middle Eastern", "Afghani"];
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];
const DIETS = ["Regular", "Vegetarian", "Vegan", "Keto"];

export default function RecipeForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState(CUISINES[0]);
  const [mealType, setMealType] = useState(MEAL_TYPES[0]);
  const [diet, setDiet] = useState(DIETS[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleIngredient = (item: string) => {
    setIngredients((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ingredients, cuisine, mealType, diet });
  };

  const filteredIngredients = INGREDIENT_OPTIONS.filter((ing) =>
    ing.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg px-4">
      {/* Ingredients Search + Multi-select */}
      <div>
        <label className="block mb-2 font-semibold text-white">Ingredients</label>
        <input
          type="text"
          placeholder="Search ingredients..."
          className="w-full p-2 rounded bg-neutral-800 text-white mb-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="max-h-40 overflow-y-auto border border-neutral-700 rounded p-2 bg-neutral-800">
          {filteredIngredients.map((item) => (
            <div key={item} className="flex items-center gap-2 mb-1 text-white">
              <input
                type="checkbox"
                checked={ingredients.includes(item)}
                onChange={() => toggleIngredient(item)}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cuisine Dropdown */}
      <div>
        <label className="block mb-2 font-semibold text-white">Cuisine</label>
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        >
          {CUISINES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Meal Type Dropdown */}
      <div>
        <label className="block mb-2 font-semibold text-white">Meal Type</label>
        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        >
          {MEAL_TYPES.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Diet Dropdown */}
      <div>
        <label className="block mb-2 font-semibold text-white">Diet</label>
        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          className="w-full p-2 rounded bg-neutral-800 text-white"
        >
          {DIETS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full"
      >
        Submit
      </button>
    </form>
  );
}

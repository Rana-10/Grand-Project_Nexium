"use client";

import { useState } from "react";

interface FormData {
  ingredients: string[];
  cuisine: string;
  mealType: string;
  diet: string;
}

const INGREDIENT_OPTIONS = [
  "Chana Daal", "Moong Daal", "Daal Maash", "Kaala chana", "Masoor Daal", "Cauliflower", "Garlic", "Tomato", "Onion", "Cumin",
  "Turmeric", "Salt", "Spinach",
  "Black Pepper", "Yogurt", "Beetroot", "Peas", "Butter", "Chicken", "Beef", "Rice", "Lentils", "Potato", "Eggplant",
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

    const formData: FormData = {
      ingredients,
      cuisine,
      mealType,
      diet,
    };

    onSubmit(formData);
  };

  const filteredIngredients = INGREDIENT_OPTIONS.filter((ing) =>
    ing.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg px-4">
      {/* Ingredients */}
      <div>
        <label className="block mb-2 font-pacifico text-[#283618]">Ingredients</label>
        <input
          type="text"
          placeholder="Search ingredients..."
          className="w-full p-2 rounded bg-[#fefae0] text-[#283618] border border-[#606c38] mb-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="max-h-40 overflow-y-auto border border-[#606c38] rounded p-2 bg-[#fefae0]">
          {filteredIngredients.map((item) => (
            <div key={item} className="flex items-center gap-2 mb-1 text-[#283618]">
            <input
            type="checkbox"
            checked={ingredients.includes(item)}
            onChange={() => toggleIngredient(item)}
            className="clickable accent-[#556B2F]"
            />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cuisine */}
      <div>
        <label className="block mb-2 font-pacifico text-[#283618]">Cuisine</label>
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="clickable w-full p-2 rounded bg-[#fefae0] text-[#283618] border border-[#606c38]"
        >
          {CUISINES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Meal Type */}
      <div>
        <label className="block mb-2 font-pacifico text-[#283618]">Meal Type</label>
        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="clickable w-full p-2 rounded bg-[#fefae0] text-[#283618] border border-[#606c38]"
        >
          {MEAL_TYPES.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Diet */}
      <div>
        <label className="block mb-2 font-pacifico text-[#283618]">Diet</label>
        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          className="clickable w-full p-2 rounded bg-[#fefae0] text-[#283618] border border-[#606c38]"
        >
          {DIETS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="clickable cursor-pointer bg-[#283618] hover:bg-[#606c38] text-[#fefae0] font-geist-sans py-2 px-4 rounded w-full"
      >
        Submit
      </button>
    </form>
  );
}

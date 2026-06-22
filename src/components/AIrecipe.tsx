import {useState} from "react";
import {sendPrompt} from "../services/aiService.ts";
import type {Recipe} from "../types/Recipe.ts";

export default function AIrecipe() {
    const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
    const [prompt, setPrompt] = useState("");

    const handlePrompt = async (e) => {
        e.preventDefault();
        const data = await sendPrompt(prompt)
        setGeneratedRecipe(data);
    }

    return (
        <>
            <h2>Let AI help you!</h2>
            <textarea value={prompt}
                      onChange={(e) =>
                          setPrompt(e.target.value)
                      }
                      placeholder="Enter prompt for recipe"/>
            <div>
                <button
                    onClick={handlePrompt}
                >Generate recipe!
                </button>
            </div>
            {generatedRecipe && (
                <>
                    <div align="center">
                        <h3>AI generated recipe:</h3>
                        <p>{generatedRecipe.name}</p>
                        {generatedRecipe.ingredients.map((ingredient) => (
                            <li>{ingredient}</li>
                        ))}
                        {generatedRecipe.instructions.map((instruction) => (
                            <p>{instruction}</p>
                        ))}
                        <div>
                            <button type="button">Add Recipe</button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
import {useState} from "react";
import {createRecipe} from "../services/recipeService.ts";

export default function CreateRecipeForm() {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const recipe = {
            name,
            ingredients,
            instructions
        };
        await createRecipe(recipe)
        setSuccess(true)
    }


    return (
        <>
            <h2>Add your recipe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Recipe name:
                        <div>
                    <textarea
                        rows={1}
                        placeholder="Enter recipe name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                        </div>
                    </label>
                </div>
                <div>
                    <label>Ingredients:
                        <div>
                <textarea
                    rows={4}
                    placeholder="Enter ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
                        </div>
                    </label>
                </div>
                <div>
                    <label>Instructions:
                        <div>
                <textarea
                    rows={4}
                    placeholder="Enter instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                />
                        </div>
                    </label>
                </div>
                <button
                    type="submit">
                    Create Recipe!
                </button>
                <div>
                    <p>{success && 'Recipe created successfully'}</p>
                </div>
            </form>
        </>
    );
}

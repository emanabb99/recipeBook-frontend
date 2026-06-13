import {useEffect, useState} from "react";
import {createRecipe, editRecipe} from "../services/recipeService.ts";
import type {Recipe} from "../types/Recipe.ts";

interface EditRecipeProps {
    editingRecipe : Recipe
    clearEdit : ()=>void
}

export default function CreateRecipeForm({editingRecipe,clearEdit}:EditRecipeProps) {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [success, setSuccess] = useState(false);
    const isEditting = editingRecipe!=null;
    const formTitle = isEditting ? "Edit your recipe" : "Add your recipe";
    const formSubmit = isEditting ? "Save Recipe!" : "Create Recipe!";
    const successMessage = isEditting ? "Recipe edited successfully!" : "Recipe created successfully!";

    useEffect(() => {
            setName(editingRecipe.name)
            setIngredients(editingRecipe.ingredients)
            setInstructions(editingRecipe.instructions)
    }, [editingRecipe]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const recipe = {
            name,
            ingredients,
            instructions
        };
        if (isEditting) {
            const updatedRecipe = {
                id : editingRecipe.id,
                ...recipe
            }
            await editRecipe(updatedRecipe)
        }
        else {
            const recipe = {
                name,
                ingredients,
                instructions
            }
            await createRecipe(recipe);
            }
        setSuccess(true)
    }


    return (
        <>
            <h2>{formTitle}</h2>
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
                    {formSubmit}
                </button>
                {isEditting && (
                    <button
                        type="button"
                        onClick={clearEdit}
                    >Cancel</button>
                )}
                <div>
                    <p>{success && successMessage}</p>
                </div>
            </form>
        </>
    );
}

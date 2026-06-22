import {useEffect, useState} from "react";
import {createRecipe, editRecipe} from "../services/recipeService.ts";
import type {Recipe} from "../types/Recipe.ts";
import type {User} from "../types/User.ts"

interface CreateRecipeProps {
    editingRecipe: Recipe | null
    clearEdit: () => void
    currentUser: User
}

export default function CreateRecipeForm({editingRecipe, clearEdit, currentUser}: CreateRecipeProps) {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [ingredientsInput, setIngredientsInput] = useState("");
    const [instructions, setInstructions] = useState<string[]>([]);
    const [instructionsInput, setInstructionsInput] = useState("");
    const [success, setSuccess] = useState(false);
    const isEditting = editingRecipe != null;
    const formTitle = isEditting ? "Edit your recipe" : "Add your recipe";
    const formSubmit = isEditting ? "Save Recipe!" : "Create Recipe!";
    const successMessage = isEditting ? "Recipe edited successfully!" : "Recipe created successfully!";

    useEffect(() => {
        if (isEditting) {
            setName(editingRecipe.name)
            setIngredients(editingRecipe.ingredients)
            setInstructions(editingRecipe.instructions)
        } else {
            setName("")
            setIngredients([])
            setInstructions([])
        }
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
                id: editingRecipe.id,
                ...recipe
            }
            await editRecipe(updatedRecipe)
        } else {
            const recipe = {
                name,
                ingredients,
                instructions
            }
            if (!currentUser?.id) return;
            await createRecipe(recipe, currentUser.id);
        }
        setSuccess(true)
    }

    const handleIngredientDelete = (ingredient: string) => {
        setIngredients(ingredients.filter(ingr => ingr !== ingredient));
    }

    const handleInstructionDelete = (instruction: string) => {
        setInstructions(instructions.filter(inst => inst !== instruction));
    }


    return (
        <>
            <div className="form-card">
                <h2>{formTitle}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Recipe name:
                            <div>
                    <input
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
                            <div className="inline-input">
                                <input value={ingredientsInput}
                                       placeholder="Add ingredient"
                                       onChange={(e) => setIngredientsInput(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIngredients([...ingredients, ingredientsInput])
                                        setIngredientsInput("")
                                    }}
                                >Add
                                </button>
                            </div>
                            {ingredients.map((ingredient) => (
                                <>
                                    <div>
                                        <li>{ingredient}</li>
                                        <button type="button" onClick={() => {
                                            handleIngredientDelete(ingredient)
                                        }}>Delete
                                        </button>
                                    </div>
                                </>
                            ))
                            }
                        </label>
                    </div>
                    <div>
                        <label>Instructions:
                            <div className="inline-input">
                            <textarea
                                placeholder="Enter instructions one at a time"
                                value={instructionsInput}
                                onChange={(e) => setInstructionsInput(e.target.value)}
                            />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setInstructions([...instructions, instructionsInput])
                                        setInstructionsInput("")
                                    }}
                                >Add
                                </button>
                            </div>
                            {instructions.map((instruction) => (
                                <>
                                    <li type="1">{instruction}</li>
                                    <button type="button" onClick={() => {
                                        handleInstructionDelete(instruction)
                                    }}>Delete
                                    </button>
                                </>
                            ))}
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
            </div>
        </>
    );
}

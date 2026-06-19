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
    const [ingredientsInput,setIngredientsInput] = useState("");
    const [instructions, setInstructions] = useState<string[]>([]);
    const [instructionsInput,setInstructionsInput] = useState("");
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
                            <input value={ingredientsInput}
                                   placeholder="Add ingredient"
                                   onChange={(e)=>setIngredientsInput(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={()=>{
                                    setIngredients([...ingredients,ingredientsInput])
                                    setIngredientsInput("")
                                }}
                            >Add</button>
                            {ingredients.map((ingredient)=>(
                                <>
                                <li>{ingredient}</li>
                                </>
                            ))
                            }
                        </div>
                    </label>
                </div>
                <div>
                    <label>Instructions:
                        <div>
                            <input
                                placeholder="Enter instructions"
                                value={instructionsInput}
                                onChange={(e)=>setInstructionsInput(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={()=>{
                                    setInstructions([...instructions,instructionsInput])
                                    setInstructionsInput("")
                                }}
                            >Add</button>
                            {instructions.map((instruction)=>(
                                <>
                                    <li>{instruction}</li>
                                </>
                            ))}
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

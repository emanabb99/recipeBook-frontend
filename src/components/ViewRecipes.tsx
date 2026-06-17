import {useEffect, useState} from "react";
import type {Recipe} from "../types/Recipe.ts";
import {deleteRecipe, viewRecipes} from "../services/recipeService.ts";
import CreateRecipeForm from "./CreateRecipeForm.tsx";
import type {User} from "../types/User.ts";

interface ViewRecipeProps {
    currentUser: User | null
}

export default function ViewRecipes({currentUser}:ViewRecipeProps) {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipeToEdit, setRecipeToEdit] = useState<Recipe | null>(null);

    useEffect(() => {
        const data = async () => {
            if (currentUser?.id) {
                const response = await viewRecipes(currentUser.id);
                setRecipes(response)
            }
        }
        data();
    }, []);

    const handleDelete = async (id: number)=> {
        await deleteRecipe(id);
        setRecipes(recipes.filter(recipe => recipe.id !== id));
    }

    return (
        <>
            <h1>All recipes</h1>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <li>{recipe.name}</li>
                    <p>{recipe.ingredients}</p>
                    <p>{recipe.instructions}</p>
                    <div>
                        <button onClick={()=> setRecipeToEdit(recipe)}>Edit</button>
                        <button onClick={()=>handleDelete(recipe.id)}>Delete</button>
                        {recipeToEdit &&
                            <>
                                <CreateRecipeForm
                                editingRecipe={recipeToEdit}
                                clearEdit={()=>setRecipeToEdit(null)}
                                />
                            </>
                        }
                    </div>
                </div>
            ))
            }
        </>
    )
}
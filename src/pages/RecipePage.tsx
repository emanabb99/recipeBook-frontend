import {useState,useEffect} from "react";
import {getAllRecipes} from "../services/recipeService.ts";
import type {Recipe} from "../types/Recipe.ts";
import {deleteRecipe} from "../services/recipeService.ts";

function RecipePage() {
    const [recipes, setRecipes] = useState<Recipe[]>([])

    async function handleDelete(id: number) {
        await deleteRecipe(id)
        setRecipes((prevRecipes) =>
            prevRecipes.filter(recipe => recipe.id !== id)) //show all the recipes who dont have the same id
    }

    useEffect(() => {
        async function loadRecipes() {
            const recipeList = await getAllRecipes()
            setRecipes(recipeList)
        }

        loadRecipes();
    }, []);

    return (
        <>
            <div>
                <h1>My recipes</h1>
            </div>
            <div className="nav-buttons">
                {recipes.map((recipe => (
                    <div key={recipe.id}>
                        <p>{recipe.name}</p>
                        <button onClick={() => handleDelete(recipe.id!)}>Delete</button>
                        <button>Edit</button>
                    </div>
                )))}
            </div>
        </>
    );
}
//the exclamation point after recipe.id is a not-null assertion operator

export default RecipePage;
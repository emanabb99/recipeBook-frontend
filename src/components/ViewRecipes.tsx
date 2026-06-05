import {viewRecipes} from "../services/recipeService.ts";
import {useState, useEffect} from "react";
import type {Recipe} from "../types/Recipe.ts";

export default function ViewRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    useEffect(() => {
            const fetchData = async () => {
                const recipeList = await viewRecipes();
                setRecipes(recipeList);
            }
            fetchData();
        }, []);

    return (
        <>
            <h2>All Recipes</h2>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <li>{recipe.name}</li>
                    <p>{recipe.ingredients}</p>
                    <p>{recipe.instructions}</p>
                </div>
            ))}

        </>
    )
}
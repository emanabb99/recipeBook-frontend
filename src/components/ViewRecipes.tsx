import {useEffect, useState} from "react";
import type {Recipe} from "../types/Recipe.ts";
import {viewRecipes} from "../services/recipeService.ts";

export default function ViewRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const data = async () => {
            const response = await viewRecipes();
            setRecipes(response)
        }
        data();
    }, []);

    return (
        <>
            <h1>All recipes</h1>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <li>{recipe.name}</li>
                    <p>{recipe.ingredients}</p>
                    <p>{recipe.instructions}</p>
                </div>
            ))
            }
        </>
    )
}
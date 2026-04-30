import {useState} from "react";
import {createRecipe} from "../services/recipeService" //this is the service in the backend
import type { FormEvent }  from "react";

export default function CreateRecipeForm() {

    const [name, setName] = useState(""); //empty strings as initial states
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault() //prevents refresh
        console.log("SUBMIT FIRED");

        try {
            await createRecipe({
                name,
                ingredients,
                instructions,
            }); //this is creating the object Recipe

            setName("");
            setIngredients("");
            setInstructions("");

            console.log("Recipe created successfully");

        } catch
            (error) {
            console.error("Error creating recipe", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Recipe name:
                    <div>
                    <textarea
                        rows={1}
                        placeholder="Enter recipe name"
                        onChange={ (e) => setName(e.target.value)}
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
                    onChange={ (e) => setIngredients(e.target.value)}

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
                    onChange={ (e) => setInstructions(e.target.value)}
                />
                </div>
            </label>
            </div>
            <button type="submit">
                Create Recipe!
            </button>
        </form>
    );
}

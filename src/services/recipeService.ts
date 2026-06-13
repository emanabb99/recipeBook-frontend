export async function createRecipe(recipe: Recipe) {
    const response = await fetch("http://localhost:8080/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
    });

    if (!response.ok) {
        throw new Error("Failed to create recipe");
    }

    return response.json();
}

export async function editRecipe(recipe: Recipe) {
    const response = await fetch("http://localhost:8080/recipes",{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
    });
    if (!response.ok) {
        throw new Error("Failed to create recipe");
    }

    return response.json();
}

export async function deleteRecipe(id : number) {
    const response = await fetch(`http://localhost:8080/recipes/${id}`, {
        method: "DELETE"
    })
    if (!response.ok) {
        throw new Error("Failed to create recipe");
    }

    return id;
}

export async function viewRecipes() {
    const response = await fetch("http://localhost:8080/recipes", {
        method: "GET"
    });

    if(!response.ok) {
        throw new Error("Failed to get recipes");
    }

    return response.json();
}
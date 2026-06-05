import CreateRecipeForm from "./components/CreateRecipeForm.tsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Link} from "react-router-dom";


export default function App() {
    return (
        <BrowserRouter>
            <>
                <Routes>
                    <Route
                        path={"/"}
                        element={
                        <>
                            <h1>Recipe Book</h1>
                            <Link to="/createRecipe">
                                <button>Go to create recipe</button>
                            </Link>
                            <Link to="/allRecipes">
                                <button>View all recipes</button>
                            </Link>
                        </>
                        }
                    />
                    <Route
                        path="/createRecipe"
                        element={
                            <>
                                <h2>Add your recipe</h2>
                                <CreateRecipeForm/>
                            </>
                        }
                        />
                    <Route
                        path="/allRecipes"
                        element={
                        <>
                        </>
                        }
                    />
                </Routes>
            </>
        </BrowserRouter>
    )
}

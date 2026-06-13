import type {User} from "../types/User.ts";
import {Link} from 'react-router-dom';

interface userProps{
    currentUser:User
}

export default function HomePage ({currentUser}:userProps) {
    return (
        <>
            <h2>Welcome {currentUser.firstName}</h2>
            <Link to="/createRecipe">
                <button>Create a recipe</button>
            </Link>
            <Link to="/viewRecipes">
                <button>View recipes</button>
            </Link>
        </>
    )
}
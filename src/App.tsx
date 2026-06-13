import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Link} from "react-router-dom";
import CreateUserForm from "./components/CreateUserForm.tsx";
import {useState} from "react";
import Login from "./components/Login.tsx";
import type {User} from "./types/User.ts";
import HomePage from "./components/HomePage.tsx";

export default function App() {
    const [userLoggedIn, setUserLoggedIn] = useState<User | null>(null);

    return (
        <BrowserRouter>
            <>
                <Routes>
                    <Route
                        path={"/"}
                        element={
                            <>
                                <h1>Recipe Book</h1>
                                <Link to="/createUser">
                                    <button>Create User</button>
                                </Link>
                                <Link to="/login">
                                    <button>Log in</button>
                                </Link>
                            </>
                        }
                    />
                    <Route
                        path={"/createUser"}
                        element={
                            <>
                                <CreateUserForm/>
                            </>
                        }>
                    </Route>
                    <Route
                        path={"/login"}
                        element={
                            <Login
                                onLoginSuccess={setUserLoggedIn}
                            />
                        }>
                    </Route>
                    <Route
                        path={"/homePage"}
                        element={
                            userLoggedIn ? (
                                <HomePage
                                    currentUser={userLoggedIn}/>
                            ) : (
                                <Navigate to="/login"/>
                            )
                        }>
                    </Route>
                </Routes>
            </>
        </BrowserRouter>
    )
}

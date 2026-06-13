import {useState} from "react";
import {getUser} from "../services/userService.ts";
import HomePage from "./HomePage.tsx";
import {useNavigate} from "react-router-dom";
import type {User} from "../types/User.ts";

interface SuccessProp {
    onLoginSuccess: (user: User | null) => void
}

export default function Login({onLoginSuccess}: SuccessProp) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await getUser(email, password);
            setSuccess(true);
            onLoginSuccess(user);
            navigate("/homePage");

        } catch (err: any) {
            setError("Invalid email or password. Please try again.");
            console.error("Login failed gracefully:", err.message);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Log in</h2>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)}
                       placeholder="Enter password"/>
                <button>Log in</button>
                {success && (
                    <>
                        <HomePage/>
                    </>
                )}
            </form>
        </>
    )
}
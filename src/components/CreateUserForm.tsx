import {useState} from "react";
import {createUser} from "../services/userService.ts";

export default function CreateUserForm() {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            firstName,
            secondName,
            email,
            password
        }
        await createUser(user);
        setSuccess(true)
    }

    return (
        <>
            <h2>Create a user</h2>
            <form onSubmit={handleSubmit}>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name"/>
                <input value={secondName} onChange={(e) => setSecondName(e.target.value)}
                       placeholder="Enter last name"/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"/>
                <button>Create Account</button>
                {success && (
                    <p>User created successfully!</p>
                )
                }
            </form>
        </>
    )
}
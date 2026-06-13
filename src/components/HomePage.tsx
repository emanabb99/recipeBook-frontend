import type {User} from "../types/User.ts";

interface userProps{
    currentUser:User
}

export default function HomePage ({currentUser}:userProps) {
    return (
        <>
            <h2>Welcome {currentUser.firstName}</h2>
        </>
    )
}
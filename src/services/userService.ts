export async function createUser(user: User) {
    const response = await fetch("http://localhost:8080/users",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    if (!response.ok) {
        throw new Error("Failed to create user");
    }
    return response.json();
}
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

export async function getUser(email:string,password:string) {
    const response = await fetch("http://localhost:8080/login",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({email,password})
    })
    if (!response.ok) {
        throw new Error("Failed to get user");
    }
    return response.json();
}
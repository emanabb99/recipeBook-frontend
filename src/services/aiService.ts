export async function sendPrompt(prompt: string) {
    const response = await fetch ("http://localhost:8080/api/ai/generate",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({prompt:prompt})
    })
    return response.json();
}
import {useState} from "react";
import {sendPrompt} from "../services/aiService.ts";

export default function AIrecipe() {
    const [generatedRecipe,setGeneratedRecipe] = useState<String | null>(null);
    const [prompt,setPrompt] = useState("");

    const handlePrompt = async (e) => {
        e.preventDefault();
        const data = await sendPrompt(prompt)
        console.log(data);
        setGeneratedRecipe(data);
    }

    return (
        <>
            <h2>Let AI help you!</h2>
            <textarea value={prompt}
                      onChange={(e)=>
                          setPrompt(e.target.value)
                      }
                      placeholder="Enter prompt for recipe"/>
            <div>
            <button
                onClick={handlePrompt}
            >Generate recipe!</button>
            </div>
            {generatedRecipe && (
                <>
                    <p>{generatedRecipe}</p>
                </>
            )}
        </>
    )
}
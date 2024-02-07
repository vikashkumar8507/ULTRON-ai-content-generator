import axios from "axios";

//generate content----------

export const generateContentAPI = async({userPrompt})=>{
    const response = await axios.post("http://localhost:5000/api/v1/openai/generate", {
        prompt: userPrompt,
    },
    {
        withCredentials: true,
    })
    return response?.data;
}
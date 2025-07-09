import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GoogleGenAI } from "@google/genai";


type Inputs = {
    query: string
}

const apiKey = process.env.REACT_APP_API_KEY;

const ai = new GoogleGenAI({
    apiKey: apiKey
});


const SearchBar = () => {
    const {
        register,
        handleSubmit
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data.query)

    //Quickstart, answers a question
    async function runQuery() {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Explain how AI works in a few words",
        });
        
        return response.text;
    }

    const search: SubmitHandler<Inputs> = async (userInput) => {
        const listResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Answer the following question and output in a list. " + userInput.query,
        });

        const searchResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                "Use Google Shoppong to find me Amazon links for products that match items in this list: " + listResponse.text + ". Do not embed the links give the full url for each product." //May need to tweak but got links from this prompt
            ],
            config: {
                tools: [{urlContext: {}}, {googleSearch: {}}],
            }
        });

        console.log(searchResponse.text)
        console.log(searchResponse.candidates)
    }

    return(
        <form onSubmit={handleSubmit(search)}>
            <input defaultValue="" {...register("query")} />

            <input type="submit" />
        </form>
    );
}

export default SearchBar
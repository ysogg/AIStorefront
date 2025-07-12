import { useState }from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GoogleGenAI, Type } from "@google/genai";
import { url } from "inspector";
import Card  from "./Card"
import { json } from "stream/consumers";
import "../Styles/global.css"


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

    const [arr, setArr] = useState([""])

    // var arr: string[] = [];

    const search: SubmitHandler<Inputs> = async (userInput) => {
        
        const listResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Answer the following question and output in a list. " + userInput.query,
        });

        const searchResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                "Find me Amazon links for products that match items in this list: " + listResponse.text + ". Do not embed the links give the full url for each product. Produce JSON matching this specification: \
                Products = [ url, ] \
                Return: array<Products>" 
            ],
            config: {
                tools: [{urlContext: {}}, {googleSearch: {}}]
            }
        });

        console.log(searchResponse.text)
        // console.log(searchResponse.candidates)

       if (searchResponse.text != undefined) {
            try {
                setArr(JSON.parse(searchResponse.text.slice(7, -4))["Products"])
                console.log(arr)
            } catch (err){
                console.log(err)
            }
        } else {
            console.log("Err: Search response undefined")
        }
    }
        
    return(
        <>
        <form onSubmit={handleSubmit(search)}>
            <input defaultValue="" {...register("query")} />
            <input type="submit" />
        </form>
        <div className="grid"> 
            { arr && (
                arr.map(e => <Card url={e}/>)
            )}
        </div>
        </>
    );
}

export default SearchBar
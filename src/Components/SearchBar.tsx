import { useState, useEffect }from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GoogleGenAI } from "@google/genai";
import axios from 'axios'
import Card  from "./Card"
import "../Styles/global.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Inputs = {
    query: string
}

type Data = {
    [key:string]: {
        img: string, 
        title: string, 
        price: string
    }
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
    const [renderCards, setRenderCards] = useState(false)
    const [isInitialMount, setIsInitialMount] = useState(true)
    const [list, setList] = useState<Data>({"":{img:"",title:"",price:""}})

    useEffect(() => {
        if (!isInitialMount) {
            const scrapeAllUrls = async () => {
                for (const el of arr) {
                    let data = await scrape(el)
                    if ( (data.img != "") && (data != undefined) ) {
                        let listCpy: Data = list
                        listCpy[el] = data
                        setList(list)
                    }
                }
                setRenderCards(true)
            }

            if (!renderCards) {
                scrapeAllUrls()
            }
        } else {
            setIsInitialMount(false)
        }
    }, [arr])


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
                //fails to access array later if gem doesn't give a products key
                setArr(JSON.parse(searchResponse.text.slice(7, -4))["Products"])
                console.log(arr)
            } catch (err){
                //todo gemini messed up formatting so try and re-run the search function if possible
                console.log(err)
            }
        } else {
            console.log("Err: Search response undefined")
        }
    }

    const scrape = async (url: string) => {
        try {
            const response = await axios.post('http://localhost:8000/scrape', {
                url: JSON.stringify(url).slice(1,-1)
            });
            console.log(response.data);

            let img = response.data.img_url
            let title = response.data.title
            let price = response.data.price
            
            return {img: img, title: title, price: price}
        } catch (error) {
            console.error("Error posting data:", error);
            return {img: "", title: "", price: ""}
        }
    }
        
    return(
        <>
        <form className="searchbar" onSubmit={handleSubmit(search)}>
            <input defaultValue="" {...register("query")} />
            <button type="submit">
            {<FontAwesomeIcon icon={faMagnifyingGlass} />}
            </button>
        </form>
        <div className="grid">
            { renderCards && (
                arr.filter(e => list[e]).map(url => <Card url={url} data={list[url]}/>)
            )}
        </div>
        </>
    );
}

export default SearchBar
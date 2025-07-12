import { createElement } from "react";
import axios, { AxiosResponse } from 'axios'
import "../Styles/global.css"

interface CardProps {
  url: string;
}

//Need to get this all react stated and stuff to get it to render properly
//but is making the requests fine and getting correct variables
//ALSO filter out bad requests so you don't flood the console and confirm all cards created are from valid requests
const Card = ({ url }: CardProps) => {
    var img = ""
    var title = ""
    var price = ""

    const scrape = async () => {
        if (url != "") {
            try {
                const response = await axios.post('http://localhost:8000/scrape', {
                    url: JSON.stringify(url).slice(1,-1)
                });
                console.log(response.data);

                img = response.data.img_url
                title = response.data.title
                price = response.data.price
                
            } catch (error) {
                console.error("Error posting data:", error);
                return null
            }
        }
    }
    
    scrape()

    return createElement(
        'div',
        { className: 'card',
            onClick: () => window.location.href = url
        },
        createElement('img',
            { className: 'card-img',
                src: img
            },
        ),
        createElement('h1',
            { className: 'card-header' },
            title
        ),
        createElement('p',
            { className: 'card-price' },
            price
        )
    );
}

export default Card
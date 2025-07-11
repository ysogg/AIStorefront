import { createElement } from "react";
import axios from 'axios'

interface CardProps {
  url: string;
}


const Card = ({ url }: CardProps) => {
    async function scrape() {
        try {
                    const response = await axios.post('http://localhost:8000/scrape', {
                        url: url
                    });
                    console.log(response.data);
                } catch (error) {
                    console.error("Error posting data:", error);
                }
    }
//     return createElement(
//         'div',
//         { className: 'card',
            
//         },
//         createElement('img',
//             { className: 'card-img',
//                 src: "img_placeholder.jpg"
//             },
//         ),
//         createElement('h1',
//             { className: 'card-header' },
//             title
//         ),
//         createElement('p',
//             { className: 'card-desc display-linebreak' },
//             desc
//         )
//     );
return(
    <>
        <button onClick={scrape}>SCRAPE</button>
    </>
)
}

export default Card
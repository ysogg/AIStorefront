import { createElement, useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios'
import "../Styles/global.css"

interface CardProps {
  url: string;
  data: {img: string, title: string, price: string}
}

const Card = ({ url, data }: CardProps) => {
    const img = data.img
    const title = data.title
    const price = data.price

    return (
        createElement(
            'div',
            { className: 'card',
                onClick: () => window.location.href = url
            },
            createElement('img',
                { className: 'card-img',
                    src: img
                },
            ),
            createElement('p',
                { className: 'card-header' },
                title
            ),
            createElement('p',
                { className: 'card-price' },
                price
            )
        )
    );
}

export default Card
import requests
from bs4 import BeautifulSoup

from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl

app = FastAPI()


origins = [
    "*" #cause I can!!!!
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URL(BaseModel):
    url: HttpUrl

@app.post("/scrape/")
async def scrape_url(url: URL):
    custom_headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    ' (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    'Accept-Language': 'da, en-gb, en',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': 'text/html,application/xhtml+xml,application/xml;'
                'q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Referer': 'https://www.google.com/'
    }

    response = requests.get(str(url.url), headers=custom_headers)
    soup = BeautifulSoup(response.text, 'lxml')


    print(response.status_code)

    imageElement = soup.select_one('#landingImage')
    imageUrl = imageElement.attrs.get('src')

    titleElement = soup.select_one('#productTitle')
    title = titleElement.text.strip()

    priceElement = soup.select_one('#corePrice_feature_div span.a-offscreen')
    price = priceElement.text

    return {"img_url": imageUrl, "title": title, "price": price}
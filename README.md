# AI Storefront

I feel like keyword searching on sites like Amazon is outdated and often returns unhelpful results when the query is anything either than rigid keywords.


I see AI as the obvious solution to this problem and honestly wouldn't be surprised if this becomes the norm in the next few years.


This is a brief demo on how something like this would work; however, the actual implementation is not at all how it would be for real because I don't have access to Amazon's database (╥﹏╥).


## How it works
When a user enters a search query Gemini interprets it into usable keywords and performs a Google search; specifically with Google Shopping. Gemini then returns a list of urls for products it finds. These get fed to a webscraper and converted into clickable cards on the main page.

## Startup
If you'd like to test this make sure to add a .env file with your gemini key as REACT_APP_API_KEY


[FE] - npm start


[API] - fastapi dev main.py (and set up your venv)

# API Project: URL Shortener Microservice for freeCodeCamp

### User Stories

1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. _HINT_: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the `dns` core module.
3. When I visit the shortened URL, it will redirect me to my original link.

#### Creation Example:

POST [project_url]/api/shorturl/new - body (urlencoded) : url=https://www.google.com

#### Usage:

[this_project_url]/api/shorturl/3

#### Will redirect to:

https://www.freecodecamp.org/forum/

# Notes to Self

### VS Code, Github, & Glitch

Today (7/25/2020) I actually used the (apparently previously) installed Glitch VS Code Extension. It was incredibly easy and conveneient. I realized I can write code to my Glitch project now on my computer and in the browser (even from my iPad).
Also I tried out the import/export to Github. Currently this project lives at aarongilly/glitch. It works well, but does require pull reuessts and it's instantly synced like the VS Code Extension is. However this does let me work within the iPad app "Working Copy", but it's not really clear if that's a better experience than just writing to Glitch directly from within the Safari on the iPad, like I'm doing now.
I got a basic write new document script working. So that's cool. Not sure why I was so scared to start.
# Starting this thing

To start up the application run the following command in the root directory of the project
`npm run setup:prisma`
`npm run dev`

You'll also need a `.env` file with a `GIPHY_API_KEY` and `JWT_SECRET` in the app directory

# Shutting down

So you can continue to use localstack you'll need to run the following command to destroy the docker container and free up your postgres port. It can also be used to wipe clean the db to start fresh. God knows there's a lot of ways to break this thing.

`npm run docker:clean`

# Tony's notes on the code and the writing this thing

This project was hard and is pretty disorganized for a variety of reasons but I'm sending it because I'm sick of looking at the code.

## Next was probably a mistake

I screwed myself by writing this in next. I should have gone for a react single page app. I wanted to do next because that's what's in our stack so I figured it would be a good chance to learn and GIPHY has some brebuilt React components so I figured that would save me a lot of time and headache. Unfortunately the tutorial I watched just did an install of next with @latest instead of a specific version and the latest turns on the experimental appDir feature by default and does things quite a bit differently. By the time I realized my mistake it was too late. I had built enough stuff where I felt committed and wanted to power through. Mistake!

### The backend

I have been learning express/prisma/typescript on the side and had already written some of the api. When I learned that next can handle the backend also (we're primarily using it for front end so I didn't know that) I figured it would look weird if I didn't have my backend in next too, so I migrated what I had to Next. The new appDir way of handling APIs is completely different from how they're done previously so that created three big roadblocks for me api wise:

- The Vercel docs on it weren't very fleshed out
- I couldn't ask chat GPT for advice because this is brand new and the ai hadn't been trained on it
- No great way to handle middleware, therefore auth is my own homebrewed shitshow

For what I had to work with, I don't think the backend turned out terribly but I recognize there are a ton of typescript red underlines and places where this thing could break because I'm not guarding correctly. Because its so different from express and I had a front end to write (poorly) I had left a lot of things un-typed (not even a lazy any). I have shit to do okay?

### The frontend

Man am I not a front end guy. I thought I'd be able to figure out React pretty easily. JSX didn't seem that intimmidating and I figured I'd even have enough time to add a little styling to it. Nope.

To start with, Next added more complication to my world with the fact that I didn't understand server side vs client side components and reloading so everything has `'use client'` and it may as well have been a SPA react app. I didn't have time to really learn state management so I'm managing things like if the user is logged in on a component by component basis instead of at an app level (which I know is very bad).

In running with the theme of this being a GIF application here's a few Gifs of how I feel about state management and useEffect:

- https://media.giphy.com/media/l2Jed4ncwDwEXa7oQ/giphy.gif
- https://media.giphy.com/media/l2Jed4ncwDwEXa7oQ/giphy.gif
- https://media.giphy.com/media/l2Jed4ncwDwEXa7oQ/giphy.gif

I couldn't figure out routing and getting my components to reload and ChatGPT wasn't any help so I instead did it the lofi (i.e. bad) way and used `window.location` stuff.

As for styling, the glitter on this turd, I stole a basic dark theme from some random dude's github. Looks nice. Better than anything I could have done. I didn't feel like I had enough time to learn tailwind and I didn't want to use boostrap because fuck bootstrap.

### WFT Next?

The other thing I REALLY hate about how this new appDir works is that all the files have the exact same name. Its madness. I can't tell what I'm working on in the api because every file is called `route.ts` and every webpage is `page.tsx`. The number of times I had to close all my tabs and just start over because I couldn't remember what I was working on and where it was, was insane. I did not like.

# Conclusions

Its spaghetti code on the front end and the back end but its mine and it works (happy path only please). I leave my fate in the hands of whatever poor soul has to review this monstrosity of code.

I may come back to it in a day or two and try to add comments more for myself than anything. I'll leave the logic of it as it exists right now alone.

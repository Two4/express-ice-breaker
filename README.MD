A rudimentary clone of Reddit's core API functionality, implemented with ExpressJS and Typescript.

This is the first time I've used ExpressJS and Mongo, and therefore (unsurprisingly) it doesn't actually work.
However, the code is reasonably well-structured (I think), and demonstrates my approach to an API.

To run this project, open a terminal in the project directory and run `docker compose up -f ./mongo-stack.yml` to bring up a MongoDB docker stack (obviously, docker is required).
Then run `npm run build`, follow by `npm run dev`.

# Daily Coding - Backend

This document explains how to deploy the backend API (Node.js + Express + MongoDB).

## Required environment variables

- `MONGO_URI` - MongoDB connection string (example: `mongodb://user:pass@host:27017/dbname`).
- `JWT_SECRET` - Secret used to sign JWT tokens.
- `PORT` - Optional. Defaults to `5000`.
- `CLIENT_URL` - Optional. Frontend origin for CORS (e.g., `https://your-app.netlify.app`).

## Quick local run

```
cd backend
npm install
npm run seed    # create admin + sample questions
npm start
```

## Deploy to Heroku

1. Create a new Heroku app.
2. Set environment variables in the Heroku dashboard (MONGO_URI, JWT_SECRET, CLIENT_URL if needed).
3. Push the repository to Heroku (Git remote) or connect GitHub.
4. Heroku will run `npm run heroku-postbuild` after installing dependencies which runs the seed script.

Notes: The provided `Procfile` starts the server with `node index.js`.

## Deploy with Docker

Build and run locally:

```
docker build -t daily-coding-backend .
docker run -e MONGO_URI="your-mongo-uri" -e JWT_SECRET="your-secret" -p 5000:5000 daily-coding-backend
```

## Deploy to Render

1. Create a new Web Service on Render.
2. Connect the repo and set the build command to `npm install` and the start command to `node index.js`.
3. Add environment variables in the Render dashboard.

## Serving the frontend

The backend serves the `frontend` folder at root. For production it is recommended to deploy the frontend separately (Netlify or Vercel) and set `CLIENT_URL` to that app's URL.

## Troubleshooting

- If the server exits on DB connection errors, verify `MONGO_URI` and network access.
- If JWT errors occur, ensure `JWT_SECRET` is set.
- To seed the DB manually: `npm run seed`.

Note: The server now enforces that `JWT_SECRET` is present when `NODE_ENV=production`. Make sure you set it in your hosting provider's env settings.

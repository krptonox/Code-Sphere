# Code-Sphere

Code-Arena is a MERN-style project in progress with a React frontend and a Node.js + Express backend.

This documentation summarizes what has been implemented so far in both backend and frontend.

## Latest Updates (2026-03-29)

- Added Prettier to backend dev dependencies for consistent code formatting.
- Added backend formatter configuration files:
  - `Backend/.prettierrc`
  - `Backend/.prettierignore`
- Updated frontend ignore rules in `Frontend/.gitignore` with clearer dependency, build, cache, and environment exclusions.
- Repository cleanup and git tracking alignment were reviewed before push.

## Latest Updates (2026-03-30)

- Standardized backend module usage to CommonJS for startup compatibility.
- Added and documented dedicated MongoDB connector flow:
  - `Backend/src/DataBase/db.js`
  - `Backend/constant.js`
- Added detailed database setup and troubleshooting guide:
  - `Backend/src/DataBase/README.md`
- Improved dotenv usage notes (`#` comment style in env files).
- Investigated Atlas connection failures and identified practical troubleshooting path:
  - verify cluster status is `Active`
  - verify DB user credentials and network access rules
  - verify local network allows outbound TCP `27017`

## Current Progress

### Backend (implemented)

- Express server setup in `Backend/index.js`
- Environment variable loading with `dotenv`
- Base route:
  - `GET /` -> returns `Code-Arena`
- Demo jokes API:
  - `GET /api/jokes` -> returns a static jokes array
- MongoDB connection module wired into backend startup
- MongoDB modeling started with Mongoose (feed + user domain schemas)
- Backend package setup with scripts:
  - `npm run dev`
  - `npm start`

### Backend (in progress)

- Controllers, routes, database connection wiring are mostly placeholders
- Models are created but not yet integrated into API routes/services

### Frontend (implemented)

- React + Vite project setup
- Tailwind integrated through Vite plugin
- API proxy configured in Vite:
  - `/api` -> `http://localhost:3000`
- Pages created:
  - Home
  - Login
  - Signup
  - Jokes
- `Jokes` page fetches backend data from `/api/jokes` using Axios
- `Home` includes a toggle between login and signup UI

### Frontend (in progress)

- Routing is imported but not actively used in `App.jsx`
- Login/Signup currently log form input in console (no auth integration yet)

## Tech Stack

- Frontend: React, Vite, Axios, React Router, TailwindCSS
- Backend: Node.js, Express, Mongoose, dotenv, bcryptjs, jsonwebtoken, cookie-parser, cors
- Database: MongoDB (schema layer in progress)

## Project Structure

```text
Code-Sphere/
  Backend/
    index.js
    app.js
    src/
      Models/
        FeedPage/
        Users/
      Controllers/
      Routes/
      DataBase/
      Middlewares/
      Utils/
  Frontend/
    src/
      Pages/
      App.jsx
      main.jsx
```

## Mongoose Models Created So Far

### User Domain

- `users.model.js`
  - `id`, `username`, `email`, `password`, `email_Verified`, timestamps
- `email_verfication.model.js`
  - `id`, `token`, `expiresAt`, `verifiedAt`, `user_id`, timestamps

### Feed Domain

- `daily_contibutions.model.js`
- `friendships.model.js`
- `groups.model.js`
- `group_members.model.js`
- `platform_connection.model.js`
- `user_stats.model.js`

These models define the planned social/feed features such as friendships, groups, memberships, platform sync, and user stats.

## API Endpoints Available Now

### Health/Root

- `GET /`

Response:

```json
"Code-Arena"
```

### Jokes

- `GET /api/jokes`

Response (sample):

```json
[
  {
    "id": 1,
    "title": "A joke",
    "content": "Why don't scientists trust atoms? Because they make up everything!"
  }
]
```

## Local Setup

## 1) Clone

```bash
git clone https://github.com/krptonox/Code-Sphere.git
cd Code-Sphere
```

## 2) Backend setup

```bash
cd Backend
npm install
```

Create `.env` in `Backend/`:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>
```

Run backend:

```bash
npm run dev
```

## 3) Frontend setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend default: `http://localhost:5173`
Backend default: `http://localhost:8000`

## What Is Next (recommended)

- Connect MongoDB in backend startup flow
- Create auth APIs for signup/login
- Wire Mongoose models to controllers and routes
- Enable proper routing in frontend `App.jsx`
- Replace static jokes with DB-backed content
- Add validation/error handling for all request bodies

## Notes

This repo currently contains foundational UI + schema work and a working frontend-backend integration example through the jokes endpoint.

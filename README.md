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

- Standardized backend module usage to ESM for startup compatibility.
- Added and documented dedicated MongoDB connector flow:
  - `Backend/src/DataBase/db.js`
  - `Backend/constant.js`
- Added detailed database setup and troubleshooting guide:
  - `Backend/src/DataBase/README.md`
- Added backend utility response/error standards:
  - `Backend/src/Utils/ApiError.js`
  - `Backend/src/Utils/ApiResponse.js`
  - `Backend/src/Utils/README.md`
- Improved dotenv usage notes (`#` comment style in env files).
- Investigated Atlas connection failures and identified practical troubleshooting path:
  - verify cluster status is `Active`
  - verify DB user credentials and network access rules
  - verify local network allows outbound TCP `27017`

## Latest Updates (2026-04-01)

- **Installed `mongoose-aggregate-paginate-v2`:**
  - Package for implementing pagination in MongoDB aggregation queries
  - Enables efficient handling of large datasets with next/previous page navigation
  - Will be used for feed operations with large datasets

- **Finalized User Authentication Schema:**
  - Completed `Backend/src/Models/Users/users.model.js` with full authentication support
  - Integrated password hashing via bcryptjs with pre-save middleware
  - Implemented JWT-based authentication with access and refresh token generation
  - Added email verification tracking field (`email_Verified`)
  - Added refresh token storage field for session management
  - Added timestamps for automatic `createdAt` and `updatedAt` tracking

- **Created comprehensive Users Model Documentation:**
  - `Backend/src/Models/Users/README.md` - Full documentation covering:
    - Schema field definitions and purposes
    - Password hashing implementation and security
    - Access token generation (1-day expiration)
    - Refresh token generation (10-day expiration)
    - Authentication flow overview
    - Required environment variables
    - Dependencies (mongoose, bcryptjs, jsonwebtoken)

- **Environment Configuration:**
  - Configured JWT secrets and expiration times in `.env`:
    - `ACCESS_TOKEN_SECRET` - Secret for access token signing
    - `ACCESS_TOKEN_EXPIRES_IN=1d` - Short-lived access tokens
    - `REFRESH_TOKEN_SECRET` - Secret for refresh token signing
    - `REFRESH_TOKEN_EXPIRES_IN=10d` - Long-lived refresh tokens
  - Configured MongoDB connection with Atlas credentials
  - Configured CORS origin to frontend URL (`http://localhost:5173`)

## Current Progress

### Backend (implemented)

- Express server setup in `Backend/index.js`
- Environment variable loading with `dotenv`
- Base route:
  - `GET /` -> returns `Code-Arena`
- Demo jokes API:
  - `GET /api/jokes` -> returns a static jokes array
- MongoDB connection module wired into backend startup
- Utility classes created for consistent API success/error payloads
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
- React Router setup with `BrowserRouter` in `src/main.jsx`
- `Jokes` page fetches backend data from `/api/jokes` using Axios
- `Home` includes a toggle between login and signup UI

### Frontend (in progress)

- More routes/pages can be added in `App.jsx` as features grow
- Login/Signup currently log form input in console (no auth integration yet)

## Common Frontend Error and Fix

### Error

If you see this in browser console:

```text
Uncaught Error: useRoutes() may be used only in the context of a <Router> component.
```

### Why It Happens

`<Routes />` (or hooks like `useRoutes`) only works when the app is wrapped in a Router provider.
If `App` renders `<Routes />` directly but `main.jsx` does not wrap `<App />` with `BrowserRouter`, React Router throws this error.

### How It Was Resolved

`src/main.jsx` was updated to wrap `<App />` inside `<BrowserRouter>`:

```jsx
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

### Quick Checklist

- Make sure `react-router-dom` is installed.
- Wrap root app with `BrowserRouter` in `main.jsx`.
- Keep `<Routes>` and `<Route>` inside components rendered under that router.

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
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>
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

- Create auth APIs for signup/login
- Wire Mongoose models to controllers and routes
- Enable proper routing in frontend `App.jsx`
- Replace static jokes with DB-backed content
- Add validation/error handling for all request bodies
- Use `ApiError`, `ApiResponse`, and `asyncHandler` in controllers for uniform API behavior

## Notes

This repo currently contains foundational UI + schema work and a working frontend-backend integration example through the jokes endpoint.

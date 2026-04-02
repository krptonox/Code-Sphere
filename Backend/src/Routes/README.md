# Routes Layer

This folder defines API endpoints and maps each endpoint to a controller method.

## What has been done so far

- Created user route module: `user.routes.js`
- Added user endpoints:
	- `POST /api/users/register`
	- `POST /api/users/login`
- Mounted user routes in app-level router inside `Backend/app.js`

## How it is wired

1. `Backend/app.js` imports routes from `./src/Routes/user.routes.js`.
2. `app.use('/api/users', userRoutes)` mounts all user routes under `/api/users`.
3. `user.routes.js` maps endpoint paths to controller functions.

## Why this structure is used

- Keeps endpoint definitions separate from business logic.
- Makes route files easy to scan and maintain.
- Supports scaling by creating feature-based route modules (users, feed, groups, etc.).

## How this helps in future

- New user endpoints can be added in one place without touching server bootstrap logic.
- Team members can quickly understand API surface from route files.
- Easy migration to route-level middleware (auth, validation, rate limits) when features grow.

## Current note

- `POST /login` currently points to `registerUser` and should be split into a dedicated `loginUser` controller in a later update.

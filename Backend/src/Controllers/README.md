# Controllers Layer

This folder contains request-handling logic for API endpoints.

## What has been done so far

- Created user controller module: `users.controllers.js`
- Added `registerUser` controller as the first user action handler.
- Integrated async error wrapper through `asyncHandler`.
- Fixed async wrapper import mismatch:
  - Before: named import `asynchandler`
  - After: default import `asyncHandler`
- Fixed users model path mismatch in controller:
  - Before: `../Models/Users/user.model.js`
  - After: `../Models/Users/users.model.js`
  - Why: actual model file name is `users.model.js`
- Fixed `ApiError` import style mismatch:
  - Before: named import `{ ApiError }`
  - After: default import `ApiError`
  - Why: `ApiError` is exported as default from `src/Utils/ApiError.js`

## How controller flow works

1. Route receives request (for example, `POST /api/users/register`).
2. Route calls controller method from this folder.
3. Controller runs inside `asyncHandler`.
4. Any async error is passed to Express error middleware through `next(err)`.

## Why this structure is used

- Separates request lifecycle logic from route declarations.
- Reduces repeated try/catch blocks in every controller method.
- Improves consistency of API behavior and debugging.

## Where to use controllers

- Use this folder for all endpoint request handlers (users, auth, feed, groups, profiles).
- Keep route files only for endpoint mapping; move business logic into controller methods.
- Use utility wrappers (`asyncHandler`, `ApiError`, and response helpers) inside controllers for consistent API behavior.
- Use controllers as the integration point between request input and model/service/database operations.

## How to use this pattern

1. Create a controller function for each API action (`registerUser`, `loginUser`, etc.).
2. Wrap each async controller in `asyncHandler`.
3. Validate request data early and throw `ApiError` for bad input/conflicts.
4. Call model/service methods for DB work.
5. Return safe response data (exclude password and tokens unless needed).
6. Export controller methods and map them in the related route file.

## How this helps in future

- Easier to add validation, service calls, and DB operations per action.
- Better maintainability as auth features expand (register, login, refresh, logout).
- Lower risk of unhandled promise rejections in async APIs.
- Faster onboarding because import patterns and controller responsibilities are now explicitly documented.

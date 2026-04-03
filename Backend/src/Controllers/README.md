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

## Latest Controller Updates (2026-04-03)

- Improved request body handling in `users.controllers.js`:
  - Added safe fallback for missing body (`req.body || {}`).
  - Why: prevented runtime crash when body was undefined.

- Added input normalization for register payload:
  - Maps `username`, `userName`, or `name` to a normalized `username` value.
  - Trims `username`, `email`, and `password` before validation.
  - Why: Postman/client payload key differences caused false validation failures.

- Kept strict validation for required fields:
  - Throws `ApiError(400, "All fields are required")` when any required value is empty.
  - Why: avoids creating invalid user records.

- Fixed created-user fetch query usage:
  - Before: `user.findById(user._id)`
  - After: `User.findById(user._id)`
  - Why: `findById` is a model static method, not a document instance method.

## Problems Faced in Controller Layer

1. `Cannot destructure property 'username' of 'req.body' as it is undefined`
   - Root cause: request body missing/not parsed.
   - Resolution: added safe body fallback and route-level multipart parsing.

2. `All fields are required` even when form looked filled
   - Root cause: username key mismatch (`userName`/`name` vs `username`) or empty trimmed values.
   - Resolution: normalized accepted key variants and trimmed inputs before validation.

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

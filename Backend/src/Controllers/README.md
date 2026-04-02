# Controllers Layer

This folder contains request-handling logic for API endpoints.

## What has been done so far

- Created user controller module: `users.controllers.js`
- Added `registerUser` controller as the first user action handler.
- Integrated async error wrapper through `asyncHandler`.
- Fixed import/export mismatch in controller setup:
  - Before: named import `asynchandler`
  - After: default import `asyncHandler`

## How controller flow works

1. Route receives request (for example, `POST /api/users/register`).
2. Route calls controller method from this folder.
3. Controller runs inside `asyncHandler`.
4. Any async error is passed to Express error middleware through `next(err)`.

## Why this structure is used

- Separates request lifecycle logic from route declarations.
- Reduces repeated try/catch blocks in every controller method.
- Improves consistency of API behavior and debugging.

## How this helps in future

- Easier to add validation, service calls, and DB operations per action.
- Better maintainability as auth features expand (register, login, refresh, logout).
- Lower risk of unhandled promise rejections in async APIs.

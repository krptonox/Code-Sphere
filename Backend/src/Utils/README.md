# Backend Utils Setup

This folder contains reusable backend helper utilities used to keep controllers and routes clean.

## What Has Been Done Yet

1. Added `ApiError.js` for standardized error objects.
2. Added `ApiResponse.js` for standardized success responses.
3. Added `asyncHandler.js` as a wrapper pattern for async route handlers.

## Why We Set This Up

1. To avoid repeating response and error logic in every controller.
2. To keep API response format consistent across endpoints.
3. To make global error handling easier with `next(err)` flow.
4. To improve maintainability as backend routes/controllers grow.

## What Each Utility Is For

### 1) ApiError

- Purpose: Create a custom error object for API failures.
- File: `ApiError.js`
- Current shape:
  - `statusCode`
  - `message`
  - `errors`
  - `success` (false)
  - `data` (null)

Use when:

- Validation fails
- Resource not found
- Unauthorized/forbidden actions
- Any business logic failure where you want predictable error payload

### 2) ApiResponse

- Purpose: Return a standard success payload from controllers.
- File: `ApiResponse.js`
- Current shape:
  - `statusCode`
  - `data`
  - `message`
  - `success` (`statusCode < 400`)

Use when:

- Returning successful API data
- Sending create/update/list/get responses in a uniform format

### 3) asyncHandler

- Purpose: Wrap async controllers and forward errors to error middleware.
- File: `asyncHandler.js`
- Idea: avoid writing `try/catch` in every controller.

Use when:

- Defining async route handlers in controllers

## Setup/Dependency Notes

1. Backend is using ESM (`"type": "module"`), so imports/exports use `import` and `export default`.
2. Utilities are framework-level helpers and do not require extra packages.
3. They are designed to work with Express middleware/error flow.

## How We Use It Now

Example controller pattern:

```js
import ApiResponse from "../Utils/ApiResponse.js";
import ApiError from "../Utils/ApiError.js";
import asyncHandler from "../Utils/asyncHandler.js";

const getProfile = asyncHandler(async (req, res) => {
  const user = { id: 1, name: "Aryan" };

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "Profile fetched"));
});
```

## How We Can Use It In Future

1. Apply `ApiResponse` and `ApiError` in all controllers for consistent API contracts.
2. Add a global error middleware that reads `ApiError` fields and returns a clean JSON response.
3. Extend `ApiError` with optional fields like `code` (business code) or `details` for validation libraries.
4. Add utility helpers for pagination metadata, file upload responses, and auth token response format.
5. Keep this folder as the shared utility layer for all modules (users, feed, groups, auth).

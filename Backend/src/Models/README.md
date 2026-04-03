# Models Layer

This folder defines MongoDB schemas and models for user and feed domains.

## What This Layer Handles

- Data structure definitions using Mongoose schemas
- Validation and constraints (required, unique, types)
- Persistence hooks (for example, password hashing)
- Reusable model methods (for example, password compare and token generation)

## Latest Updates (2026-04-03)

- Fixed user pre-save middleware pattern in `Users/users.model.js`.
  - Before: async middleware used `next()` callback.
  - After: promise-style async middleware without `next`.
  - Why: mixing `async` and `next()` caused runtime error `TypeError: next is not a function`.

## Problems Faced and Fixes

1. `TypeError: next is not a function` during `User.create(...)`
   - Root cause: incorrect Mongoose pre-save middleware signature.
   - Fix: switched to pure async pre-save hook and returned early when password is unchanged.

## Notes

- User-model specific details are documented in `Users/README.md`.
- Keep schema-level behavior (hashing, token helpers) here, and request/response logic in controllers.

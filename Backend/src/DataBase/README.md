# Database Setup Guide

This folder contains the MongoDB connection setup for the backend.

## What We Have Done So Far

- Added a dedicated database connection module in `db.js`.
- Connected backend to MongoDB using Mongoose.
- Centralized database name in `Backend/constant.js`.
- Loaded environment variables using dotenv in backend entry file.
- Called `connectDB()` from backend startup so DB connects when server starts.

## Files and Their Purpose

- `db.js`
  - Creates and exports `connectDB` as an async function.
  - Uses Mongoose to connect to MongoDB.
  - Logs success and exits process on connection failure.

- `../../constant.js` (imported into `db.js`)
  - Exports `DB_NAME` so database name is managed in one place.

- `Backend/.env` (runtime)
  - Stores `MONGODB_URI` and `PORT`.
  - Keeps configuration out of source code.

## How Setup Works

1. Install dependencies in `Backend`:
   - `npm install`

2. Create or update `.env` in `Backend`:
   - `PORT=8000`
   - `MONGODB_URI=<your-mongodb-connection-string-without-db-name>`

3. Start backend:
   - `npm run dev`

4. During startup:
   - `index.js` runs `require('dotenv').config()`.
   - `index.js` imports and calls `connectDB()` from `src/DataBase/db.js`.
   - `db.js` builds final URI as `MONGODB_URI/DB_NAME`.
   - If DB connects, server continues; if not, process exits with error.

## Import Paths and Why

- In `Backend/index.js`:
  - `const connectDB = require('./src/DataBase/db')`
  - Why: this is a relative CommonJS import from backend root to DB module.

- In `Backend/src/DataBase/db.js`:
  - `const { DB_NAME } = require('../../constant.js')`
  - Why: `db.js` is inside `src/DataBase`, so it must go two folders up to reach `Backend/constant.js`.

## Why This Structure

- Separation of concerns: DB connection logic is isolated from routes/controllers.
- Reusability: `connectDB` can be reused by tests or other startup flows.
- Maintainability: changing DB name or URI handling is easier in one place.
- Reliability: explicit error handling stops app when DB is unavailable.

## Problems Faced and How We Solved Them

1. Module system mismatch (ESM + CommonJS)
  - Problem: backend startup failed with `Cannot use import statement outside a module`.
  - Cause: mixed `import/export` and `require/module.exports` while backend `package.json` uses CommonJS.
  - Fix: standardized backend files to CommonJS (`require` and `module.exports`).

2. Wrong DB constant import path
  - Problem: DB name import failed when path was not relative to `db.js` location.
  - Cause: using an invalid absolute-like path format.
  - Fix: used `../../constant.js` from `src/DataBase/db.js`.

3. Environment file comment format
  - Problem: dotenv parsing became unreliable with JS-style comments.
  - Cause: `//` comments were used in `.env` style files.
  - Fix: switched comments to `#` style.

4. Atlas connection error (`Could not connect to any servers`)
  - Problem: app printed Atlas server-selection error despite whitelist setup.
  - Cause: local/ISP/network path could not open TCP 27017 to Atlas nodes.
  - Fix: validated SRV DNS and TCP connectivity; identified network/firewall restriction as root issue.
  - Connection Error due to GLA wifi, use VPN for it, otherwise it shows IP address not whitelisted error on terminal.

## What to Check If Connection Fails Again

1. Atlas cluster is `Active` (not paused).
2. Atlas Network Access allows your IP (for testing, `0.0.0.0/0`).
3. Atlas DB username/password matches `.env` values exactly.
4. Local network/firewall allows outbound TCP 27017.
5. Connection URI format remains:
  - `MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-host>`
  - final runtime URI is built as `MONGODB_URI/DB_NAME` in `db.js`.

## Current Implementation Snapshot

- Backend starts Express on `PORT` from `.env`.
- DB connector runs during startup via `connectDB()`.
- On success: logs connection success and continues.
- On failure: logs error and exits process with code `1`.

## Notes

- Backend is currently configured as CommonJS (`"type": "commonjs"`), so use `require/module.exports` for imports/exports in backend files.
- Do not commit real credentials in `.env.example`; keep only placeholder values.

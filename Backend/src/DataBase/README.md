# Database Setup (MongoDB + Mongoose)

This folder contains the database connection logic for the backend.

## What I Used

- MongoDB Atlas as the cloud database
- Mongoose to connect Node.js with MongoDB
- dotenv to read environment variables from `.env`
- ES Modules (`"type": "module"` in package.json)

## Dependencies

From backend dependencies:

- `mongoose`
- `dotenv`

Install dependencies (from `Backend/`):

```bash
npm install
```

## How I Created the Database Connection

1. Created a MongoDB Atlas cluster.
2. Copied the connection URI and saved it in `.env` as `MONGO_URI`.
3. Created `constant.js` in backend root and exported the database name.
4. Created `src/DataBase/db.js` and wrote an async `connectDB()` function.
5. Called `connectDB()` from `Backend/index.js` when the server starts.

## Environment Variables

Required in `.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
```

## Imports and Exports Used

In `src/DataBase/db.js`:

```js
import mongoose from "mongoose";
import { DB_NAME } from "../../constant.js";

async function connectDB() {
  await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
}

export default connectDB;
```

In `Backend/constant.js`:

```js
export const DB_NAME = "Code-Sphere";
```

In `Backend/index.js`:

```js
import dotenv from "dotenv";
import connectDB from "./src/DataBase/db.js";

dotenv.config();
connectDB();
```

## Notes

- Database name is appended to `MONGO_URI` using `/${DB_NAME}`.
- If connection fails, the error is printed in the console.
- Make sure `MONGO_URI` is valid and IP access is allowed in MongoDB Atlas.

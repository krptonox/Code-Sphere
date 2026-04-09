# Controllers README

Yeh folder backend ka "dimaag" hai.
Simple words me: route request pakadta hai, controller decide karta hai "ab kya karna hai".

## Controllers kya hote hain?

Controller wo function hota hai jo request receive karke:

- input validate karta hai
- database/model se baat karta hai
- success ya error response bhejta hai

Is project me main controller file:

- `src/Controllers/users.controllers.js`

## Is folder ko kyun banaya?

Agar saara logic route file me likh doge to code bahut messy ho jayega.
Isliye alag layer banayi gayi:

- routes sirf endpoint mapping kare
- controllers business logic handle kare
- maintain karna easy ho

## Current controller functions (easy explanation)

`users.controllers.js` me abhi ye major functions hain:

1. `registerUser`

- New user ka data leta hai (`username/email/password`)
- required fields check karta hai
- check karta hai user pehle se exist to nahi
- user create karta hai
- safe response return karta hai (password aur refresh token hide)

2. `loginUser`

- email ya username + password se user find karta hai
- password verify karta hai
- access token + refresh token generate karta hai
- cookies set karke login response deta hai

3. `logoutUser`

- logged-in user ka refresh token remove karta hai
- auth cookies clear karta hai
- logout success response bhejta hai

## Kahan use ho raha hai?

Controller functions route layer se call ho rahe hain:

- `registerUser` -> `POST /api/users/register`
- `loginUser` -> `POST /api/users/login`
- `logoutUser` -> `POST /api/users/logout` (auth required)

Mapping file:

- `src/Routes/user.routes.js`

## Controller ka request flow

1. Client request bhejta hai (Postman/Frontend).
2. Route match hota hai.
3. Route controller function call karta hai.
4. Controller input check karta hai.
5. Controller model/database se operation karta hai.
6. Controller `ApiResponse` ke through final response bhejta hai.
7. Error aaye to `ApiError` + `asyncHandler` flow handle karta hai.

## Utilities jo controller ke saath use ho rahi hain

- `asyncHandler`: async function errors ko safely pass karta hai.
- `ApiError`: standard error response banane ke liye.
- `ApiResponse`: standard success response format ke liye.
- `User` model: database me user read/write karne ke liye.

## Important improvements jo already kiye gaye

- body safe fallback add hua: `req.body || {}`
- username normalization add hua: `username/userName/name` handle karta hai
- trim logic add hua: blank spaces wali values reject hoti hain
- created user fetch model ke through fix hua: `User.findById(...)`

## Common mistakes jo avoid karne hain

- Route me heavy logic mat likho, controller me rakho.
- Sensitive data (password, refreshToken) response me mat bhejo.
- Validation skip mat karo.
- Async controller ko `asyncHandler` ke bina mat chalao.

## New controller add karna ho to quick steps

1. `src/Controllers/...controllers.js` me function banao.
2. Input validate karo.
3. Model call karo.
4. `ApiResponse` ya `ApiError` use karo.
5. Function export karo.
6. Route file me map karo.

## Future me revise karte time yaad rakhna

- "Route = path map"
- "Controller = actual kaam"
- "Model = database"

Yeh 3-layer approach follow karoge to code samajhna, debug karna, aur scale karna bahut easy ho jata hai.

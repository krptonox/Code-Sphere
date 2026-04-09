# Middlewares README

Yeh folder backend ka "gatekeeper" layer hai.
Simple words me: middleware controller se pehle chalti hai aur decide karti hai request allowed hai ya block.

## Middleware kya hota hai?

Middleware ek beech ka function hota hai jo:

- request ko check karta hai
- zarurat ho to request me extra data add karta hai
- next step par bhejta hai (`next()`)
- ya error throw karke request rok deta hai

Is project me main middleware file:

- `src/Middlewares/auth.middleware.js`

## Is folder ko kyun banaya?

Agar auth checks har controller me likhenge to duplicate code hoga.
Isliye middleware alag rakha gaya hai:

- reusability ke liye
- security checks centralize karne ke liye
- clean controller logic ke liye

## Current middleware: `verifyJwt`

`verifyJwt` ka kaam:

1. token read karta hai (cookie ya Authorization header se)
2. token verify karta hai (`jsonwebtoken` se)
3. token se user id nikalta hai
4. DB se valid user find karta hai
5. user ko `req.user` me attach karta hai
6. `next()` call karke aage bhejta hai

Agar token invalid/missing ho:

- `ApiError(401, "Unauthorized"/"Invalid access token")` throw hota hai

## Kahan use ho raha hai?

Abhi ye protected route par use ho raha hai:

- `POST /api/users/logout`

Route mapping:

- `src/Routes/user.routes.js`

Flow example:

1. client logout request bhejta hai
2. `verifyJwt` middleware token check karti hai
3. token valid hua to `req.user` set hota hai
4. tab controller `logoutUser` execute hota hai

## Middleware ka fayda

- unauthorized requests ko entry pe hi block karta hai
- controller ko direct authenticated user mil jata hai
- security logic ek hi jagah maintain hoti hai

## Easy mental model

- "Route" = gate ka address
- "Middleware" = security guard
- "Controller" = office staff jo real kaam karta hai

## New auth middleware add karni ho to

1. `src/Middlewares` me nayi file/function banao
2. request se required data read karo
3. validate karo
4. pass hua to `next()`
5. fail hua to `ApiError` throw karo
6. route file me us middleware ko attach karo

## Best practices

- middleware ko small aur focused rakho
- generic name use karo (jaise `verifyJwt`, `isAdmin`)
- repeated checks ko middleware me shift karo
- sensitive error details client ko expose mat karo

Is tarah middleware layer project ko secure, clean, aur scalable banati hai.

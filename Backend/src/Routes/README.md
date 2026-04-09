# Routes README

Yeh folder backend ka "map" hai.
Simple words me: route batata hai kaunsa URL hit hoga to kaunsa function chalega.

## Route kya hota hai?

Route = HTTP method + path + handler.

Example:

- `POST /api/users/register` -> user register logic

Is project me main route file:

- `src/Routes/user.routes.js`

## Is folder ko kyun banaya?

Route layer alag rakhne se:

- endpoint list clearly dikhti hai
- maintain karna easy hota hai
- controller logic aur routing alag rehte hain

## Current user routes (abhi kya use ho raha hai)

1. `POST /api/users/register`

- middleware: `multer().none()` for multipart text fields
- controller: `registerUser`
- use case: new account create

2. `POST /api/users/login`

- controller: `loginUser`
- use case: user authentication

3. `POST /api/users/logout`

- middleware: `verifyJwt` (protected route)
- controller: `logoutUser`
- use case: session logout and token cleanup

## Kahan mount ho raha hai?

App-level mount file:

- `Backend/app.js`

Typical mount pattern:

- `app.use('/api/users', userRoutes)`

Iska matlab `user.routes.js` ke sare paths `/api/users` prefix ke under expose hote hain.

## Route flow easy words me

1. Client endpoint hit karta hai.
2. Express route match karta hai.
3. Agar route pe middleware hai to pehle middleware chalegi.
4. Fir controller function execute hoga.
5. Final response client ko milega.

## Route + Middleware + Controller relation

- Route decide karta hai "kisko call karna hai"
- Middleware decide karti hai "allow/block/check"
- Controller real operation karta hai "DB + response"

## New route add kaise karein (quick)

1. `src/Routes` me relevant file kholo (ya nayi banao).
2. Required controller import karo.
3. Required middleware import karo (agar protected route hai).
4. `router.route(...).get/post/...` define karo.
5. Route module export karo.
6. `app.js` me mount verify karo.

## Best practices

- route files me business logic mat rakho
- endpoint names consistent rakho (`/register`, `/login`, `/logout`)
- protected endpoints par auth middleware lagao
- large project me feature-wise route files banao

## Future me revise karne ka shortcut

Yaad rakho:

- "Route file kholke API surface samajh aata hai"
- "Controller file kholke API behavior samajh aata hai"
- "Middleware file kholke security checks samajh aati hain"

Is approach se onboarding fast hoti hai aur debugging simple ban jati hai.

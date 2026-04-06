# Services Folder Guide (Hinglish)

Yeh README beginner friendly way me explain karta hai ki `services` folder ka use kyun kiya gaya, backend kaise connect hua, aur future me kaise maintain karna hai.

## 1) Services folder kyun banaya?

Simple reason:

- UI file (`Login.jsx`, `Signup.jsx`) clean rahe.
- API call ka code alag jagah rahe.
- Kal ko backend endpoint change ho, to har page me change na karna pade.

Is project me auth ke liye service file hai:

- `authService.js`

## 2) Backend se kya-kya connect hua?

Frontend se ye 2 API hit ho rahi hain:

1. Signup:

- `POST /api/users/register`
- payload: `{ username, email, password }`

2. Login:

- `POST /api/users/login`
- payload: `{ email, password }`
- `withCredentials: true` diya gaya hai, taaki auth cookie handling possible ho.

Vite proxy already set hai, isliye frontend se `/api/...` call backend par forward hoti hai.

## 3) End-to-end flow kaise chal raha hai?

### Signup flow

1. User form fill karta hai (username/email/password).
2. `Signup.jsx` me `signupUser()` call hota hai.
3. Backend successful response deta hai (`ApiResponse` format).
4. Username `sessionStorage` me save hota hai.
5. User `/feed` route par redirect hota hai.

### Login flow

1. User email/password daalta hai.
2. `Login.jsx` me `loginUser()` call hota hai.
3. Backend response se username milta hai.
4. Username `sessionStorage` me save hota hai.
5. User `/feed` route par redirect hota hai.

### Feed page

- `FeedPage.jsx` username 2 jagah se read karta hai:
  1. `location.state?.username`
  2. `sessionStorage.getItem('feed_username')`
- Isliye refresh ke baad bhi welcome text dikh jata hai.

## 4) Tumne ye setup kaise kiya (step by step)

1. Route add kiya:

- `App.jsx` me `/feed` route map kiya.

2. Simple feed page banaya:

- `FeedPage.jsx` me sirf username show karaya.

3. Service file banayi:

- `authService.js` me `signupUser` aur `loginUser` methods banaye.

4. Signup page connect kiya:

- API call + loading state + backend error handling + redirect.

5. Login page connect kiya:

- API call + loading state + backend error handling + redirect.

6. Backend controller bugs fix kiye (auth flow stable karne ke liye):

- token generation order
- login validation
- typo fixes

## 5) Easy future upgrade plan

Aaj ka target: basic username feed ✅

Kal ko agar full user profile chahiye:

1. Backend me `/api/users/me` route banao.
2. Frontend me naya method add karo `authService.js` me.
3. Feed page me API response se full user object show karo.

## 6) Common issues aur quick checks

Agar login/signup fail ho:

1. Backend server running hai ya nahi check karo.
2. Frontend server running hai ya nahi check karo.
3. Vite proxy me `/api` mapping check karo.
4. Backend response me `message` dekh kar issue identify karo.

## 7) Short summary

- Frontend aur backend auth flow connected hai.
- Feed page currently minimal hai (sirf username).
- Code structure future backend scaling ke liye ready hai.

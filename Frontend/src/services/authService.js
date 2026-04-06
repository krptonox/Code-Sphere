import axios from 'axios'

// Yeh method signup form ko backend register API se connect karta hai.
// Isko alag file me rakhne ka reason: future me endpoint change ho to sirf yahi file edit karni pade.
export const signupUser = async ({ username, email, password }) => {
  const response = await axios.post('/api/users/register', {
    username,
    email,
    password,
  })

  return response.data
}

// Yeh method login ke liye backend API call karta hai.
// withCredentials true rakha hai taaki backend cookies bhi receive ho sake (auth flow ke liye useful).
export const loginUser = async ({ email, password }) => {
  const response = await axios.post(
    '/api/users/login',
    {
      email,
      password,
    },
    {
      withCredentials: true,
    },
  )

  return response.data
}

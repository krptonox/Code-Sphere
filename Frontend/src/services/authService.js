import axios from 'axios'

export const signupUser = async ({ username, email, password }) => {
  const response = await axios.post('/api/users/register', {
    username,
    email,
    password,
  })

  return response.data
}


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

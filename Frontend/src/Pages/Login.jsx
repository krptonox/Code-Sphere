import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'

function Login() {
  const [Email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      setIsLoading(true)

      const response = await loginUser({ email: Email, password })

      const username = response?.data?.username || ''

      sessionStorage.setItem('feed_username', username)

      navigate('/feed', { state: { username } })
    } catch (error) {
      
      const message = error?.response?.data?.message || 'Login failed'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
  <>
    <div className='h-screen flex items-center justify-center bg-gray-900'>

       <div className='bg-black p-8 border border-gray-700'>
        <div className='text-5xl font-extrabold tracking-widest text-center text-white py-1'>CODE SPHERE</div>
        <p className='text-2xl text-red-500 font-semibold tracking-wider py-4 flex justify-center items-center'>LOGIN TO YOUR ACCOUNT</p>

        <form className='mt-6 space-y-4' onSubmit={handleSubmit}>
            <div>
             <label className='text-white'>EMAIL</label>
            <input className='w-full mt-1 px-4 py-2  bg-slate-700 text-white outline-none focus:ring-1 focus:ring-red-500'
            type='email'
            value={Email}
            onChange={(e) => setEmail(e.target.value)}>
            </input>
            </div>

            <div className='py-3'>
            <label className='text-white'>PASSWORD</label>
            <input className='w-full mt-1 px-4 py-2  bg-slate-700 text-white outline-none focus:ring-1 focus:ring-red-500'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}>
            </input>
            </div>

            <button
              className='w-full mt-4 py-3 text-black bg-red-500 font-bold tracking-wider hover:text-white hover:bg-red-700 disabled:opacity-60'
              type='submit'
              disabled={isLoading}
            >

              
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </button>

            {errorMessage ? <p className='pt-2 text-sm text-rose-400'>{errorMessage}</p> : null}
        </form>
       </div>
    </div>
  </>
  )
}

export default Login

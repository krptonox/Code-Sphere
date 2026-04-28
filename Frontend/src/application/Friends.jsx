import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Friends() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError('')

        const { data } = await axios.get('http://localhost:8000/api/users/all', {
          withCredentials: true,
        })

        setUsers(data?.data || [])
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className='min-h-screen w-full bg-black text-white p-6 md:p-10'>
      <div className='mx-auto w-full max-w-5xl'>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-3xl font-extrabold tracking-wider text-red-500'>FRIENDS</h1>
          <button
            className='rounded-md border border-red-600 px-4 py-2 font-semibold text-red-400 transition hover:bg-red-600 hover:text-black'
            onClick={() => navigate('/feed')}
          >
            Back to Feed
          </button>
        </div>

        {loading && (
          <div className='rounded-lg border border-red-600/40 bg-gray-900 p-4 text-gray-300'>
            Loading users...
          </div>
        )}

        {error && !loading && (
          <div className='rounded-lg border border-red-600 bg-red-600/10 p-4 text-red-300'>
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {users.length === 0 && (
              <div className='rounded-lg border border-gray-700 bg-gray-900 p-4 text-gray-300'>
                No users found.
              </div>
            )}

            {users.map((user) => (
              <div
                key={user._id}
                className='rounded-xl border border-red-600/50 bg-gray-900 p-4 shadow-md shadow-red-900/20'
              >
                <h2 className='mb-1 text-lg font-bold tracking-wide text-white'>{user.username}</h2>
                <p className='break-all text-sm text-gray-400'>{user.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Friends

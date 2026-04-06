import { useLocation } from 'react-router-dom'

function FeedPage() {
  const location = useLocation()

  // 1st priority: navigate state se username (fresh login/signup ke turant baad).
  const usernameFromState = location.state?.username
  // 2nd priority: sessionStorage fallback (refresh ke baad bhi value rahe).
  const usernameFromStorage = sessionStorage.getItem('feed_username')
  const username = usernameFromState || usernameFromStorage || ''

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-950 px-4'>
      <div className='w-full max-w-xl rounded-2xl border border-gray-700 bg-black p-8 text-white'>
        <h1 className='text-4xl font-extrabold tracking-wider text-red-500'>FEED PAGE</h1>
        <p className='mt-4 text-gray-300'>
          {username ? `Welcome, ${username}` : 'No username found. Please login or signup first.'}
        </p>
      </div>
    </div>
  )
}

export default FeedPage

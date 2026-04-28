import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function FeedPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showPractice, setShowPractice] = useState(false)

  // 1st priority: navigate state se username (fresh login/signup ke turant baad).
  const usernameFromState = location.state?.username
  
  // 2nd priority: sessionStorage fallback (refresh ke baad bhi value rahe).
  const usernameFromStorage = sessionStorage.getItem('feed_username')
  const username = usernameFromState || usernameFromStorage || '';

  const generateData = () =>{

  }

  const days = Array.from({length: 28})
  const practiceSites = [
    { name: 'LeetCode', url: 'https://leetcode.com/' },
    { name: 'Codeforces', url: 'https://codeforces.com/' },
    { name: 'HackerRank', url: 'https://www.hackerrank.com/' },
  ]

  const openPracticeSite = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  

  return (
    <div className='h-screen w-screen bg-black flex items-center justify-center'>
      
      <div className='h-screen w-[15%] flex flex-col items-center justify-baseline bg-gray-900 border-r border-red-600 m-0'>
        <h1 className='font-Segoe-UI text-white bg-red-600 w-full h-[8%] flex items-center justify-center text-2xl border-b border-red-600 mb-[5%]'>CodeSphere.</h1>
        <div className='w-full h-[50%] flex flex-col items-center justify-start gap-4'>
          <button className="w-[70%] h-[12%] hover:ring-[1px] text-gray-300 pl-[5%] focus:bg-red-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-red-600 hover:text-white focus:border-l-[6px] focus:text-white  hover:shadow-red-600/60 border-red-600 font-google-sans-font-300 flex flex-col text-left justify-center">Dashboard</button>
          <button className="w-[70%] h-[12%] hover:ring-[1px] text-gray-300 pl-[5%] focus:bg-red-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-red-600 hover:text-white focus:border-l-[6px] focus:text-white  hover:shadow-red-600/60 border-red-600 font-google-sans-font-300 flex flex-col text-left justify-center" onClick={() => navigate('/friends')}>Friends</button>
          <button className="w-[70%] h-[12%] hover:ring-[1px] text-gray-300 pl-[5%] focus:bg-red-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-red-600 hover:text-white focus:border-l-[6px] focus:text-white  hover:shadow-red-600/60 border-red-600 font-google-sans-font-300 flex flex-col text-left justify-center" onClick={() => navigate('/groups')}>Groups</button>
          <button className="w-[70%] h-[12%] hover:ring-[1px] text-gray-300 pl-[5%] focus:bg-red-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-red-600 hover:text-white focus:border-l-[6px] focus:text-white  hover:shadow-red-600/60 border-red-600 font-google-sans-font-300 flex flex-col text-left justify-center">Leaderboard</button>
          <button className="w-[70%] h-[12%] hover:ring-[1px] text-gray-300 pl-[5%] focus:bg-red-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-red-600 hover:text-white focus:border-l-[6px] focus:text-white  hover:shadow-red-600/60 border-red-600 font-google-sans-font-300 flex flex-col text-left justify-center" onClick={() => setShowPractice(true)}>Practice</button>
  
          <div className='h-px w-[90%] bg-red-600'></div>
          <button className="w-[70%] h-[12%] text-gray-300 pl-[5%] focus:bg-red-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-red-600 hover:text-white focus:border-l-8 focus:text-white border-red-600 font-google-sans-font-300 flex flex-col text-left justify-center">Settings</button>
        </div>
      </div>

      <div className='h-screen w-[85%] flex flex-col items-center justify-center bg-gray-900 px-6'>
        <div className='w-full max-w-4xl rounded-3xl border border-red-600 bg-black/80 p-8 shadow-2xl shadow-red-900/30 md:p-12'>
          <p className='mb-3 text-sm uppercase tracking-[0.4em] text-red-400'>Dashboard</p>
          <h2 className='text-4xl font-extrabold tracking-wider text-white md:text-6xl'>
            Welcome to Code Sphere
          </h2>
          <p className='mt-5 max-w-2xl text-base leading-7 text-gray-300 md:text-lg'>
            Where you can grow together, compete with friends, and sharpen your coding skills every day.
          </p>
        </div>
      </div>

      {showPractice && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4'>
          <div className='w-full max-w-md rounded-2xl border border-red-600 bg-gray-950 p-6 shadow-2xl shadow-red-900/30'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-2xl font-extrabold tracking-wider text-red-500'>PRACTICE</h2>
              <button
                className='text-gray-400 transition hover:text-white'
                onClick={() => setShowPractice(false)}
              >
                Close
              </button>
            </div>

            <p className='mb-5 text-sm text-gray-400'>Choose a platform and jump straight to practice.</p>

            <div className='grid gap-3'>
              {practiceSites.map((site) => (
                <button
                  key={site.name}
                  className='w-full rounded-xl border border-red-600 bg-black px-4 py-3 text-left font-semibold tracking-wide text-white transition hover:bg-red-600 hover:text-black'
                  onClick={() => openPracticeSite(site.url)}
                >
                  {site.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default FeedPage

import { useLocation } from 'react-router-dom'

function FeedPage() {
  const location = useLocation()

  // 1st priority: navigate state se username (fresh login/signup ke turant baad).
  const usernameFromState = location.state?.username
  // 2nd priority: sessionStorage fallback (refresh ke baad bhi value rahe).
  const usernameFromStorage = sessionStorage.getItem('feed_username')
  const username = usernameFromState || usernameFromStorage || ''

  return (
    <div className='h-screen w-screen bg-gray-900 flex items-center justify-center'>
      <div className='h-screen w-[15%] flex flex-col items-center justify-baseline bg-gray-800 border-r border-gray-600 m-0'>
        <h1 className='font-Segoe-UI text-white bg-gray-700 w-full h-[8%] flex items-center justify-center text-2xl border-b border-gray-600 mb-[5%]'>CodeSphere.</h1>
        <div className='w-full h-[50%] flex flex-col items-center justify-start gap-4'>
          <button className="w-[70%] h-[12%] hover:ring-[1px] text-gray-300 pl-[5%] focus:bg-gray-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-gray-500 hover:text-white focus:border-l-[6px] focus:text-white  hover:shadow-green-600/60 border-green-600 font-google-sans-font-300 flex flex-col text-left justify-center">Dashboard</button>
          <button className="w-[70%] h-[12%] hover:ring-[1px] text-gray-300 pl-[5%] focus:bg-gray-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-gray-500 hover:text-white focus:border-l-[6px] focus:text-white  hover:shadow-green-600/60 border-green-600 font-google-sans-font-300 flex flex-col text-left justify-center">Friends</button>
          <button className="w-[70%] h-[12%] hover:ring-[1px] text-gray-300 pl-[5%] focus:bg-gray-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-gray-500 hover:text-white focus:border-l-[6px] focus:text-white  hover:shadow-green-600/60 border-green-600 font-google-sans-font-300 flex flex-col text-left justify-center">Groups</button>
          <button className="w-[70%] h-[12%] hover:ring-[1px] text-gray-300 pl-[5%] focus:bg-gray-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-gray-500 hover:text-white focus:border-l-[6px] focus:text-white  hover:shadow-green-600/60 border-green-600 font-google-sans-font-300 flex flex-col text-left justify-center">Leaderboard</button>
          <button className="w-[70%] h-[12%] hover:ring-[1px] text-gray-300 pl-[5%] focus:bg-gray-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-gray-500 hover:text-white focus:border-l-[6px] focus:text-white  hover:shadow-green-600/60 border-green-600 font-google-sans-font-300 flex flex-col text-left justify-center">Practice</button>
          <button className="w-[70%] h-[12%] hover:ring-[1px] text-gray-300 pl-[5%] focus:bg-gray-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-gray-500 hover:text-white focus:border-l-[6px] focus:text-white  hover:shadow-green-600/60 border-green-600 font-google-sans-font-300 flex flex-col text-left justify-center">Integration</button>
          <div className='h-px w-[90%] bg-gray-400'></div>
          <button className="w-[70%] h-[12%] text-gray-300 pl-[5%] focus:bg-gray-600 rounded-[5px] transition-all ease-[0.3s] hover:bg-gray-500 hover:text-white focus:border-l-8 focus:text-white border-green-600 font-google-sans-font-300 flex flex-col text-left justify-center">Settings</button>
        </div>
      </div>
      <div className='h-screen w-[85%] flex flex-col items-center justify-center'></div>
    </div>
  )
}

export default FeedPage

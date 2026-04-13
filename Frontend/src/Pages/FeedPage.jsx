import { useLocation } from 'react-router-dom'
import { PiSphereFill } from "react-icons/pi";
import { RiDashboard2Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { MdMeetingRoom } from "react-icons/md";
import { MdIntegrationInstructions } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import '../App.css'


function FeedPage() {
  const location = useLocation()

  // 1st priority: navigate state se username (fresh login/signup ke turant baad).
  const usernameFromState = location.state?.username
  // 2nd priority: sessionStorage fallback (refresh ke baad bhi value rahe).
  const usernameFromStorage = sessionStorage.getItem('feed_username')
  const username = usernameFromState || usernameFromStorage || ''

  return (
    <div className='h-screen w-screen bg-gray-900 flex items-center justify-center'>
      <div className='h-screen w-[15%] flex-col items-center justify-baseline bg-gray-800 border-r border-gray-600 m-0'>
        <h1 className='font-google-sans-flex-100 text-white bg-gray-700 w-full h-[8%] flex items-center justify-center text-2xl border-b border-gray-600 mb-[5%]'><PiSphereFill className='w-[20%] h-[50%] m-0' />CodeSphere.</h1>
        <div className='w-full h-[50%] flex flex-col items-center justify-start gap-4 overflow-clip'>
          <button className="w-[50%] transition-all duration-300 ease-in-out hover:w-[60%] focus:w-[65%] h-[10%] p-[5%] bg-gray-700 hover:bg-gray-600 focus:bg-gray-500 flex items-center justify-evenly rounded-[50px] text-white font-[google-sans-flex-100"><RiDashboard2Fill />Dashboard</button>
          <button className="w-[50%] transition-all duration-300 ease-in-out hover:w-[60%] focus:w-[65%] h-[10%] p-[5%] bg-gray-700 hover:bg-gray-600 focus:bg-gray-500 flex items-center justify-evenly rounded-[50px] text-white font-[google-sans-flex-100]"><FaUserFriends />Friends</button>
          <button className="w-[50%] transition-all duration-300 ease-in-out hover:w-[60%] focus:w-[65%] h-[10%] p-[5%] bg-gray-700 hover:bg-gray-600 focus:bg-gray-500 flex items-center justify-evenly rounded-[50px] text-white font-[google-sans-flex-100]"><MdGroups />Groups</button>
          <button className="w-[50%] transition-all duration-300 ease-in-out hover:w-[60%] focus:w-[65%] h-[10%] p-[5%] bg-gray-700 hover:bg-gray-600 focus:bg-gray-500 flex items-center justify-evenly rounded-[50px] text-white font-[google-sans-flex-100]"><MdLeaderboard />Leaderboard</button>
          <button className="w-[50%] transition-all duration-300 ease-in-out hover:w-[60%] focus:w-[65%] h-[10%] p-[5%] bg-gray-700 hover:bg-gray-600 focus:bg-gray-500 flex items-center justify-evenly rounded-[50px] text-white font-[google-sans-flex-100]"><MdMeetingRoom />Practice</button>
          <button className="w-[50%] transition-all duration-300 ease-in-out hover:w-[60%] focus:w-[65%] h-[10%] p-[5%] bg-gray-700 hover:bg-gray-600 focus:bg-gray-500 flex items-center justify-evenly rounded-[50px] text-white font-[google-sans-flex-100]"><MdIntegrationInstructions />Integration</button>
          <div className='h-px w-[90%] bg-gray-400'></div>
          <button className="w-[50%] transition-all duration-300 ease-in-out hover:w-[60%] focus:w-[65%] h-[10%] p-[5%] bg-gray-700 hover:bg-gray-600 focus:bg-gray-500 flex items-center justify-evenly rounded-[50px] text-white font-[google-sans-flex-100]"><IoMdSettings />Settings</button>
        </div>
      </div>
      <div className='h-screen w-[85%] flex flex-col items-center justify-center'></div>
    </div>
  )
}

export default FeedPage

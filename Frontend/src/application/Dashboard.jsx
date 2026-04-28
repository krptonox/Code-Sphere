import React from 'react'

export default function Dashboard() {
  return (
    <div>
       <div className='h-3/12 w-[90%] flex flex-col bg-red-700 '>

          <div className='w-full h-9 bg-amber-500'>
            <h1 className='text-2xl text-white font-bold tracking-wider  flex justify-center items-center'> DAILY CONTRIBUTIONS</h1>
          </div>

          <div className='w-[95%] h-37 gap-3 bg-blue-300'>
             <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, week) => (
              <div key={week} className="flex flex-col gap-1">
      
              {Array.from({ length: 7 }).map((_, day) => (
             <div
               key={day}
               className="w-4 h-4 bg-green-400"
             ></div>
              ))}
             </div>
            ))}
           </div>
          </div>
          
       </div>
    </div>
  )
}

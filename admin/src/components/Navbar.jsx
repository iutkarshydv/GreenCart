import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <div className="flex items-center">
          <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
          <span className="text-green-600 font-semibold ml-2 text-lg">GreenCart Admin</span>
        </div>
        <button onClick={()=>setToken('')} className='bg-green-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
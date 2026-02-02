import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-[#f8f9f5]'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <div className="mb-4 px-3">
                <h3 className="text-green-700 font-semibold text-sm">PRODUCT MANAGEMENT</h3>
            </div>

            <NavLink className={({isActive}) => 
                `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${isActive ? 'bg-green-50 border-green-200 text-green-700' : ''}`
            } to="/add">
                <img className='w-5 h-5' src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add Products</p>
            </NavLink>

            <NavLink className={({isActive}) => 
                `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${isActive ? 'bg-green-50 border-green-200 text-green-700' : ''}`
            } to="/list">
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Manage Products</p>
            </NavLink>

            <div className="mt-6 mb-2 px-3">
                <h3 className="text-green-700 font-semibold text-sm">ORDERS</h3>
            </div>

            <NavLink className={({isActive}) => 
                `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${isActive ? 'bg-green-50 border-green-200 text-green-700' : ''}`
            } to="/orders">
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Customer Orders</p>
            </NavLink>

            <div className="mt-6 mb-2 px-3">
                <h3 className="text-green-700 font-semibold text-sm">CATEGORIES</h3>
                <div className="ml-2 mt-2 text-xs text-gray-600">
                    <p className="py-1">• Sustainable Clothing</p>
                    <p className="py-1">• Daily Use Products</p>
                    <p className="py-1">• Natural Cosmetics</p>
                    <p className="py-1">• Eco-Friendly Bags</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
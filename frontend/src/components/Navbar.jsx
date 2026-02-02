import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible] = useState(false);
    const [categoryDropdown, setCategoryDropdown] = useState(false);

    const {setShowSearch , getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    const navigateToCategory = (category) => {
        navigate(`/collection?category=${category}`);
        setCategoryDropdown(false);
    }

  return (
    <div className='flex items-center justify-between py-5 font-medium bg-white transition-colors duration-200'>
      
    <Link to='/'><img src={assets.logo} className='w-36' alt="" /><span className="text-green-600 text-xs font-semibold ml-1">GREENCART</span></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 dark:bg-gray-300 hidden' />
        </NavLink>
        
        <div className='relative group'>
            <div className='flex flex-col items-center gap-1 cursor-pointer' onClick={() => setCategoryDropdown(!categoryDropdown)}>
                <div className='flex items-center'>
                    <p>SHOP</p>
                    <img src={assets.dropdown_icon} className='w-2 ml-1 dark:invert' alt="" />
                </div>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 dark:bg-gray-300 hidden' />
            </div>
            
            <div className={`absolute dropdown-menu left-0 pt-4 z-10 ${categoryDropdown ? 'block' : 'hidden'} group-hover:block`}>
                <div className='flex flex-col gap-2 w-48 py-3 px-5 bg-white shadow-lg text-gray-500 rounded'>
                    <p onClick={() => navigateToCategory('all')} className='cursor-pointer hover:text-green-600 hover:font-medium'>All Products</p>
                    <p onClick={() => navigateToCategory('Women')} className='cursor-pointer hover:text-green-600 hover:font-medium'>Sustainable Clothing</p>
                    <p onClick={() => navigateToCategory('Daily Use')} className='cursor-pointer hover:text-green-600 hover:font-medium'>Daily Use Products</p>
                    <p onClick={() => navigateToCategory('Cosmetics')} className='cursor-pointer hover:text-green-600 hover:font-medium'>Natural Cosmetics</p>
                    <p onClick={() => navigateToCategory('Bags')} className='cursor-pointer hover:text-green-600 hover:font-medium'>Eco-Friendly Bags</p>
                </div>
            </div>
        </div>
        
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 dark:bg-gray-300 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 dark:bg-gray-300 hidden' />
        </NavLink>

      </ul>

      <div className='flex items-center gap-6'>
            
            <img onClick={()=> { setShowSearch(true); navigate('/collection') }} src={assets.search_icon} className='w-5 cursor-pointer dark:invert' alt="" />
            
            <div className='group relative'>
                <img onClick={()=> token ? null : navigate('/login') } className='w-5 cursor-pointer dark:invert' src={assets.profile_icon} alt="" />
                {/* Dropdown Menu */}
                {token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white shadow-xl text-gray-500 rounded border border-gray-100'>
                        <p onClick={()=>navigate('/profile')} className='cursor-pointer hover:text-green-600 hover:font-medium'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-green-600 hover:font-medium'>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-green-600 hover:font-medium'>Logout</p>
                    </div>
                </div>}
            </div> 
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5 dark:invert' alt="" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-green-600 text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link> 
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden dark:invert' alt="" /> 
      </div>

        {/* Sidebar menu for small screens */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-20 ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <div className='py-2 pl-6 border'>
                        <p className='font-medium text-green-600'>SHOP BY CATEGORY</p>
                        <div className='pl-4 mt-2 flex flex-col gap-2'>
                            <p onClick={() => {navigateToCategory('all'); setVisible(false);}} className='cursor-pointer'>All Products</p>
                            <p onClick={() => {navigateToCategory('Women'); setVisible(false);}} className='cursor-pointer'>Sustainable Clothing</p>
                            <p onClick={() => {navigateToCategory('Daily Use'); setVisible(false);}} className='cursor-pointer'>Daily Use Products</p>
                            <p onClick={() => {navigateToCategory('Cosmetics'); setVisible(false);}} className='cursor-pointer'>Natural Cosmetics</p>
                            <p onClick={() => {navigateToCategory('Bags'); setVisible(false);}} className='cursor-pointer'>Eco-Friendly Bags</p>
                        </div>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
        </div>

    </div>
  )
}

export default Navbar

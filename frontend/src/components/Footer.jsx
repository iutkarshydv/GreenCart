import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="w-full bg-[#f8f9f5] text-gray-800 transition-colors duration-200 px-4 sm:px-8 py-12">
      <div className='w-full max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10 sm:gap-14 mb-12'>

        <div className='max-w-xl'>
            <div className="flex items-center mb-6">
                <span className="text-green-600 text-2xl font-bold">GREENCART</span>
            </div>
            <p className='text-gray-600 leading-relaxed'>
            At GREENCART, we believe in building a sustainable future—one product at a time. Our mission is to bring you eco-friendly alternatives that are kind to the planet and safe for you.
            </p>
        </div>

        <div>
            <p className='text-lg font-medium mb-4'>Quick Links</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
                <li className='hover:text-green-600 cursor-pointer transition-colors'>About us</li>
                <li className='hover:text-green-600 cursor-pointer transition-colors'>Delivery</li>
                <li className='hover:text-green-600 cursor-pointer transition-colors'>Privacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-lg font-medium mb-4'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
                <li className='hover:text-green-600 cursor-pointer transition-colors'>+1-212-456-7890</li>
                <li className='hover:text-green-600 cursor-pointer transition-colors'>contact@green-cart.com</li>
            </ul>
        </div>

      </div>

        <div className='w-full max-w-[1440px] mx-auto'>
            <hr className="border-gray-200" />
            <p className='py-6 text-sm text-center text-gray-600'>Copyright 2025© GREENCART.com - All Rights Reserved.</p>
        </div>

    </div>
  )
}

export default Footer

import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 bg-[#f8f9f5] my-8 transition-colors duration-200'>
      
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Sustainable Materials Icon" />
        <p className='font-semibold text-green-600'>Sustainable Materials</p>
        <p className='text-gray-600'>All products made with eco-friendly materials</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="Carbon Neutral Icon" />
        <p className='font-semibold text-green-600'>Carbon Neutral Shipping</p>
        <p className='text-gray-600'>We offset 100% of our shipping emissions</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="Plastic-Free Packaging Icon" />
        <p className='font-semibold text-green-600'>Plastic-Free Packaging</p>
        <p className='text-gray-600'>All orders shipped in biodegradable packaging</p>
      </div>

    </div>
  )
}

export default OurPolicy

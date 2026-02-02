import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { motion } from 'framer-motion'

const About = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  }
  
  const slideInLeft = {
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
  }
  
  const slideInRight = {
    hidden: { x: 60, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
  }
  
  const slideUp = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  }
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
  
  // Leaf animation for decorative element
  const leafPath = "M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5z";

  return (
    <motion.div 
      className="bg-white transition-colors duration-200 relative overflow-hidden"
      initial="hidden"
      animate="visible"
    >
      {/* Decorative animated elements */}
      <motion.svg 
        className="absolute opacity-10 text-green-600"
        width="70" 
        height="70" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        style={{ top: '20%', left: '5%' }}
        animate={{ 
          y: [0, 20, 0], 
          rotate: [0, 10, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d={leafPath} />
      </motion.svg>
      <motion.svg 
        className="absolute opacity-10 text-green-600"
        width="50" 
        height="50" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        style={{ top: '60%', right: '8%' }}
        animate={{ 
          y: [0, -15, 0], 
          rotate: [0, -15, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <path d={leafPath} />
      </motion.svg>

      <motion.div 
        className='text-2xl text-center pt-8 border-t border-gray-100'
        variants={fadeIn}
      >
          <Title text1={'OUR'} text2={'MISSION'} />
      </motion.div>

      <motion.div 
        className='my-10 flex flex-col md:flex-row gap-16'
        variants={staggerContainer}
      >
          <motion.img 
            className='w-full md:max-w-[450px]' 
            src={assets.about_img} 
            alt="About GreenCart" 
            variants={slideInLeft}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          />
          <motion.div 
            className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'
            variants={slideInRight}
          >
              <motion.p variants={fadeIn}><span className="text-green-600 font-semibold">GreenCart</span> was born out of a passion for sustainability and a mission to revolutionize the way people shop online. Our journey began with a simple yet powerful idea: to create a platform where customers can easily discover, explore, and purchase eco-friendly products that reduce environmental impact while enhancing everyday life.</motion.p>
              <motion.p variants={fadeIn}>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality, eco-conscious products that cater to a wide range of lifestyles and preferences. From sustainable fashion and natural cosmetics to biodegradable daily essentials and eco-friendly bags, our collection is thoughtfully sourced from trusted, environmentally responsible brands and suppliers.</motion.p>
              <motion.b 
                className='text-green-600'
                variants={fadeIn}
                animate={{ 
                  color: ['#059669', '#047857', '#059669'],
                  transition: { duration: 3, repeat: Infinity }
                }}
              >
                Our Environmental Commitment
              </motion.b>
              <motion.p variants={fadeIn}>At <span className="text-green-600 font-semibold">GreenCart</span>, we believe that small changes can make a big difference. Every product in our store is carefully selected based on its environmental impact, ethical production methods, and sustainable materials. We're committed to transparency, providing detailed information about the eco-friendly attributes of each item, so you can make informed choices that align with your values.</motion.p>
          </motion.div>
      </motion.div>

      <motion.div 
        className='text-xl py-4'
        variants={fadeIn}
        whileInView="visible"
        viewport={{ once: true }}
      >
          <Title text1={'OUR'} text2={'VALUES'} />
      </motion.div>

      <motion.div 
        className='flex flex-col md:flex-row text-sm mb-20'
        variants={staggerContainer}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
          <motion.div 
            className='border border-green-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-[#f8f9f5]'
            variants={slideUp}
            whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 128, 0, 0.1)", transition: { duration: 0.3 } }}
          >
            <b className='text-green-600'>Sustainability First</b>
            <p className='text-gray-600'>Every product we offer is selected with the planet in mind, using sustainable materials and ethical production methods.</p>
          </motion.div>
          <motion.div 
            className='border border-green-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-[#f8f9f5]'
            variants={slideUp}
            whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 128, 0, 0.1)", transition: { duration: 0.3 } }}
            transition={{ delay: 0.1 }}
          >
            <b className='text-green-600'>Transparency</b>
            <p className='text-gray-600'>We provide clear information about materials, production methods, and environmental impact for all our products.</p>
          </motion.div>
          <motion.div 
            className='border border-green-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-[#f8f9f5]'
            variants={slideUp}
            whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 128, 0, 0.1)", transition: { duration: 0.3 } }}
            transition={{ delay: 0.2 }}
          >
            <b className='text-green-600'>Community Impact</b>
            <p className='text-gray-600'>We partner with environmental organizations and donate a portion of our profits to conservation efforts and sustainable initiatives.</p>
          </motion.div>
      </motion.div>

      <motion.div 
        className='bg-[#f8f9f5] p-8 mb-12 rounded-lg'
        variants={fadeIn}
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ boxShadow: "0 10px 25px rgba(0, 128, 0, 0.1)" }}
      >
        <motion.h3 
          className='text-xl font-semibold text-green-600 mb-4'
          variants={slideInLeft}
        >
          Our Eco-Friendly Promise
        </motion.h3>
        <motion.ul 
          className='list-disc pl-5 space-y-2 text-gray-600'
          variants={staggerContainer}
        >
          <motion.li variants={slideInRight} custom={0}>All products are made with sustainable, recycled, or biodegradable materials</motion.li>
          <motion.li variants={slideInRight} custom={1}>Plastic-free packaging for all shipments</motion.li>
          <motion.li variants={slideInRight} custom={2}>Carbon-neutral shipping through verified offset programs</motion.li>
          <motion.li variants={slideInRight} custom={3}>Ethical manufacturing partnerships that prioritize fair wages and safe working conditions</motion.li>
          <motion.li variants={slideInRight} custom={4}>Transparent supply chains that you can trust</motion.li>
        </motion.ul>
      </motion.div>

      <motion.div
        variants={fadeIn}
        whileInView="visible"
        viewport={{ once: true }}
      >
        <NewsletterBox/>
      </motion.div>
      
    </motion.div>
  )
}

export default About

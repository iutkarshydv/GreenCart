import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'

const Hero = () => {
  const [isInView, setIsInView] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  }
  
  const slideIn = {
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }
  }
  
  const slideUp = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  }

  const imageScale = {
    hidden: { scale: 1.2, opacity: 0.8 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.2 } }
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
  
  const gradientOverlay = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: [0, 0.1, 0.05],
      transition: { 
        duration: 3, 
        repeat: Infinity, 
        repeatType: "reverse" 
      }
    }
  }

  return (
    <motion.div 
      className='flex flex-col sm:flex-row border border-gray-400 bg-[#f8f9f5] relative'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      onViewportEnter={() => setIsInView(true)}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-green-100/10 to-green-300/10 z-0"
        variants={gradientOverlay}
        animate={controls}
      ></motion.div>
      {/* Hero Left Side */}
      <motion.div 
        className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 relative z-10'
        variants={fadeIn}
      >
            <motion.div 
              className='text-[#414141] px-6'
              variants={staggerContainer}
            >
                <motion.div 
                  className='flex items-center gap-2'
                  variants={slideIn}
                >
                    <p className='w-8 md:w-11 h-[2px] bg-green-600'></p>
                    <p className='font-medium text-sm md:text-base text-green-700 dark:text-green-500'>ECO-FRIENDLY PRODUCTS</p>
                </motion.div>
                <motion.h1 
                  className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'
                  variants={slideIn}
                >
                  Sustainable Living <br/> 
                  <motion.span 
                    className='text-green-700'
                    variants={slideUp}
                  >
                    For A Better Planet
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className='text-sm mb-4 max-w-md'
                  variants={slideIn}
                >
                  Discover our collection of sustainable, eco-friendly products that help reduce environmental impact while enhancing your everyday life.
                </motion.p>
                <Link to='/collection'>
                  <motion.div 
                    className='flex items-center gap-2 group'
                    variants={slideUp}
                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                  >
                      <motion.p 
                        className='font-semibold text-sm md:text-base group-hover:text-green-700 transition-colors'
                        animate={{
                          opacity: [0.9, 1],
                          scale: [1, 1.05, 1],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }
                        }}
                      >
                        SHOP NOW
                      </motion.p>
                      <motion.p 
                        className='w-8 md:w-11 h-[1px] bg-[#414141] group-hover:bg-green-700 transition-colors'
                        animate={{
                          width: ["32px", "44px", "32px"],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }
                        }}
                      ></motion.p>
                  </motion.div>
                </Link>
            </motion.div>
      </motion.div>
      {/* Hero Right Side */}
      <motion.div 
        className='w-full sm:w-1/2 overflow-hidden relative z-9'
        variants={fadeIn}
      >
        <motion.img 
          className='w-full h-full object-cover' 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
          alt="Eco-friendly products including reusable bags, bamboo items, and sustainable packaging"
          variants={imageScale}
          animate={{ 
            scale: [1, 1.02, 1],
            transition: { 
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut" 
            }
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default Hero

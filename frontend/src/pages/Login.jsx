import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800 transition-colors duration-200">
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-6 border border-gray-300 bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">{currentState}</h2>
        <input className='border border-gray-300 bg-gray-50 text-gray-900 px-4 py-2 rounded focus:outline-none' type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        {currentState === 'Sign Up' && (
          <input className='border border-gray-300 bg-gray-50 text-gray-900 px-4 py-2 rounded focus:outline-none' type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
        )}
        <input className='border border-gray-300 bg-gray-50 text-gray-900 px-4 py-2 rounded focus:outline-none' type="password" placeholder='Password' value={password} onChange={(e)=>setPasword(e.target.value)} />
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer text-gray-600'>Forgot your password?</p>
          {currentState === 'Login' ? (
            <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer text-green-700'>Create account</p>
          ) : (
            <p onClick={()=>setCurrentState('Login')} className='cursor-pointer text-green-700'>Login Here</p>
          )}
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4 rounded transition-colors'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </div>
  )
}

export default Login

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext)
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  })
  const [loading, setLoading] = useState(true)
  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0
  })

  // Fetch user data
  const fetchUserData = async () => {
    try {
      if (!token) {
        navigate('/login')
        return
      }

      const response = await axios.post(
        backendUrl + '/api/user/profile',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        const user = response.data.user
        setUserData({
          ...user,
          phone: user.phone || '',
          address: user.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
          }
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to load profile data')
    } finally {
      setLoading(false)
    }
  }

  // Fetch order statistics
  const fetchOrderStats = async () => {
    try {
      if (!token) return

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        const orders = response.data.orders
        setOrderStats({
          total: orders.length,
          pending: orders.filter(order => order.status !== 'Delivered').length,
          delivered: orders.filter(order => order.status === 'Delivered').length
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserData()
    fetchOrderStats()
  }, [token])

  if (loading) {
    return (
      <div className="border-t pt-16 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t pt-10 pb-16 min-h-screen bg-gradient-to-b from-white to-green-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <Title text1={'MY'} text2={'PROFILE'} />
        </div>

        {/* Profile Hero Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center shadow-lg">
                <span className="text-5xl font-bold text-white">
                  {userData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
              <p className="text-green-100 mb-4 flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {userData.email}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  Member since {new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                {userData.phone && (
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {userData.phone}
                  </span>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => navigate('/edit-profile')}
              className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-all font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Total Orders</h3>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{orderStats.total}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Pending Orders</h3>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{orderStats.pending}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 font-medium">Delivered Orders</h3>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{orderStats.delivered}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Orders Card */}
          <div
            onClick={() => navigate('/orders')}
            className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">My Orders</h3>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>

          {/* Shopping Card */}
          <div
            onClick={() => navigate('/collection')}
            className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">Continue Shopping</h3>
            <p className="text-gray-600">Explore our eco-friendly collection</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
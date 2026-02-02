import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {
  const { backendUrl, token, currency, navigate } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadOrderData = async () => {
    try {
      if (!token) {
        navigate('/login')
        return null
      }

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      )
      
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500'
      case 'shipped':
      case 'out for delivery':
        return 'bg-blue-500'
      case 'processing':
      case 'order placed':
        return 'bg-yellow-500'
      case 'cancelled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getPaymentStatusColor = (payment) => {
    return payment ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'
  }

  if (loading) {
    return (
      <div className="border-t pt-16 min-h-screen">
        <div className="flex justify-center items-center h-40">
          <p>Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t pt-16 min-h-screen">
      <div className="text-2xl mb-8">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {orderData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-800">No Orders Yet</h3>
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate('/collection')}
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orderData.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium text-gray-700">Order Date:</span>{' '}
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                      item.payment
                    )}`}
                  >
                    {item.payment ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image and Details */}
                  <div className="flex gap-4 flex-1">
                    <img
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200"
                      src={item.image[0]}
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 mb-2">{item.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">Price:</span>
                          <span className="text-green-600 font-semibold">
                            {currency}
                            {item.price}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">Quantity:</span>
                          <span>{item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">Size:</span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                            {item.size}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">Payment:</span>
                          <span>{item.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div className="md:w-64 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`min-w-2 h-2 rounded-full ${getStatusColor(item.status)}`}
                        ></span>
                        <p className="font-medium text-gray-800">{item.status}</p>
                      </div>

                      {/* Order Progress */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-600">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              item.status ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          ></div>
                          <span>Order Placed</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              item.status !== 'Order Placed' && item.status !== 'Cancelled'
                                ? 'bg-green-500'
                                : 'bg-gray-300'
                            }`}
                          ></div>
                          <span>Processing</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              item.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          ></div>
                          <span>Delivered</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={loadOrderData}
                      className="w-full px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders

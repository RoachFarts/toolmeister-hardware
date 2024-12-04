'use client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { collection, deleteDoc, doc, query } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { ProductData } from '@/type'
import { db } from '@/firebase'

interface Order {
    id:string,
    value:{
        amount: number,
        items: ProductData[]
    }
}

const Orders = () => {
  const {data:session} = useSession()
  const [expandedOrderId, setExpandedOrderId] = 
  useState <string | null> (null)

  const toggleDetails = (orderId: string) => {
    setExpandedOrderId((prev) => 
        (prev === orderId ? 
        null : orderId)
    )}

    const [ordersSnapshot, loading] = useCollection(session && query(collection(db, 'users', session?.user?.email as string, 'orders')))

    const orders = ordersSnapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Order[]


  return (
    <div className='flex flex-col gap-y-5 mt-5'>
        {loading ? (
        <div className='flex flex-col flex-1 space-y-6 overflow-auto'>
            {Array.from({length:3}).map((_,i)=>(
                <div 
                key={i}
                className='w-full py-20 rounded-md shrink-0 animate-pulse bg-zinc-400'
                />
            ))}
        </div>
    ) : (
        <div className="flex flex-col flex-1 space-y-6 overflow-auto p-6">
  {orders && orders.length > 0 ? (
    orders.map((order) => (
      <div
        key={order.id}
        className="p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-800">
              Order ID: {order.id.slice(-10)}
            </p>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-lg font-semibold text-gray-800">
                ₱{order.value.amount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              className="px-4 py-2 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-200"
              onClick={() => toggleDetails(order.id)}
            >
              {expandedOrderId === order.id ? 'Hide Details' : 'Show Details'}
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-700 transition-colors duration-200"
              onClick={async () => {
                await deleteDoc(
                  doc(
                    db,
                    'users',
                    session?.user?.email as string,
                    'orders',
                    order.id
                  )
                );
              }}
            >
              Delete Order
            </button>
          </div>
        </div>
        {expandedOrderId === order.id && (
          <div className="mt-4 transition-all duration-500">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border-b font-semibold text-gray-600">Item</th>
                  <th className="p-2 border-b font-semibold text-gray-600">Price (₱)</th>
                  <th className="p-2 border-b font-semibold text-gray-600">Quantity</th>
                  <th className="p-2 border-b font-semibold text-gray-600">Subtotal (₱)</th>
                </tr>
              </thead>
              <tbody>
                {order.value.items.map((item) => (
                  <tr key={item._id}>
                    <td className="p-2 border-b text-gray-700">{item.title}</td>
                    <td className="p-2 border-b text-gray-700">
                      ₱{item.price.toLocaleString()}
                    </td>
                    <td className="p-2 border-b text-gray-700">{item.quantity}</td>
                    <td className="p-2 border-b text-gray-700">
                      ₱{(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="p-2 text-right font-bold text-gray-800">
                    Total:
                  </td>
                  <td className="p-2 font-bold text-gray-800">
                    ₱{order.value.items
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    ))
  ) : (
    <div className="flex items-center justify-center p-6 bg-gray-100 rounded-lg">
      <p className="text-lg font-semibold text-gray-600">No orders</p>
    </div>
  )}
</div>


    )}
    </div>
  )
}

export default Orders
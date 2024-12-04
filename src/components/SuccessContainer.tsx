'use client'
import { resetCart } from '@/redux/toolmeisterSlice'
import { StoreState } from '@/type'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import { HiCheckCircle, HiHome, HiInformationCircle } from 'react-icons/hi'
import Link from 'next/link'
import toast from 'react-hot-toast'

const SuccessContainer = ({id}:{id:string}) => {
const {cart} = useSelector((state:StoreState)=>state?.toolmeister)
const dispatch = useDispatch()
const {data: session} = useSession()
const [totalAmt, setTotalAmt] = useState(0)
const [loading, setLoading] = useState(false)

useEffect(()=>{
    let price = 0
    cart.map((item)=>{
        price += item?.price * item?.quantity
        return price
    })
    setTotalAmt(price)
    },[cart])

    const handleSaveOrder = async() => {
        try {
            setLoading(true)
            const response = await fetch('api/saveorder',{
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    },
                body:JSON.stringify({
                    cart, 
                    email:session?.user?.email as string,
                    id: id,
                    totalAmt,
                })
            })

            const data = await response.json()
            if(data?.success){
                setLoading(false)
                dispatch(resetCart())
                toast.success(data?.message)
            }

        } catch (error) {
            console.log("Error", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(session?.user && cart?.length ){
            handleSaveOrder()
        }
    }, [session?.user, cart?.length])


  return (
    <div>
        {loading ? <Loader title='Your payment is being processed, please wait.'/> :
        <div className='bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-28'>
            <div className='max-w-md w-full space-y-8 text-center'>
                <div className='relative '>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-32 h-32 bg-green-100 rounded-full'></div>
                        </div>
                            <div className='relative'>
                                <HiCheckCircle className='mx-auto h-24 w-24 text-green-500'/>
                            </div>
                        </div>
                            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
                                Success!
                            </h2> 
                            <p className='text-sm mt-2 text-gray-700'>
                                Your payment was recieved, the transaction has been completed successfully.
                            </p>
                            <div className='mt-8 space-y-6'>
                                <p className='text-base text-gray-700'>
                                    Thank you for participating and testing out our project! - James, Lance & Matthew :D
                                </p>
                            <div className='flex flex-wrap justify-center gap-4'>
                                <Link href={"/"}>
                                    <button className='inline-flex items-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1'>
                                        <HiHome className='mr-2 h-5 w-5'/>
                                        Home
                                    </button>
                                </Link>
                                <Link href={"/orders"}>
                                    <button className='inline-flex items-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1'>
                                        <HiInformationCircle className='mr-2 h-5 w-5'/>
                                        Orders
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className='mt-10 flex justify-center space-x-4'>
                            <div className='w-3 h-3 bg-green-200 rounded-full'/>
                            <div className='w-3 h-3 bg-green-300 rounded-full'/>
                            <div className='w-3 h-3 bg-green-400 rounded-full'/>
                        </div>
                    </div>
                </div>
        }
    </div>
  )
}

export default SuccessContainer
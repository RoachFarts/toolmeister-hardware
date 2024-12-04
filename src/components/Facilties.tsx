import React from 'react'
import { FaWallet, FaWatchmanMonitoring } from 'react-icons/fa'
import { FaClock } from 'react-icons/fa6'
import { GoRocket } from 'react-icons/go'

const data=[
    {
    title: "Fast Delivery",
    description: "We deliver your order within 3 days or less",
    icon: <GoRocket />  ,
    },
    {
        title: "90 days return",
        description: "If the products have defects",
        icon: <FaClock />,
    },
    {
    title: "Quality Products",
    description: "We have products pass through our quality control",
    icon: <FaWatchmanMonitoring />,
    },
    {
        title: "Secure Payment",
        description: "We use Stripe for your payments",
        icon: <FaWallet />,
    },
]

const Facilties = () => {
  return (
    <div className='py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5'>
        {data?.map((item)=>(
            <div key={item?.title} className='flex flex-col sm:flex-row items-center gap-3'>
                <span className='text-3xl text-lightOrange'>{item?.icon}</span>
                <div className='text-center sm:text-left'>
                    <h2 className='uppercase font-bold'>
                        {item?.title}
                    </h2>
                    <p className='text-sm text-lightText'>
                        {item?.description}
                    </p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Facilties
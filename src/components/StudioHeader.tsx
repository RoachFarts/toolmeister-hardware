import Link from 'next/link'
import React from 'react'
import { IoReturnDownBack } from 'react-icons/io5'
import Logo from './Logo'

const StudioHeader = (props) => {
  return (
    <div>
        <div className='p-5 bg-darkOrange text-accent flex items-center justify-between'>
            <Link href={"/"} className='flex items-center gap-3 font-semibold hover:text-accentWhite hoverEffect'><IoReturnDownBack className='text-2xl '/>
            Back to Website
            </Link>
            <Logo className='hover:text-accentWhite hoverEffect' />
            <p className='hidden md:inline-flex text-sm'>Product Management Page</p>
        </div>
        {props.renderDefault(props)}
    </div>
  )
}

export default StudioHeader
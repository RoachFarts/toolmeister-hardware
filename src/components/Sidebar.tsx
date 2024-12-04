import Link from 'next/link'
import React from 'react'
import { MdSwitchAccount } from 'react-icons/md'
import SidebarCart from './SidebarCart'
import { auth } from '@/auth'
import { log } from 'console'
import Image from 'next/image'


const Sidebar = async () => {
  const session = await auth()

  return (
    <div className='fixed top-60 right-2 z-20 flex flex-col gap-2'>
        {/* User */}
        <Link href={session?.user ? '/dashboard' : '/signin'} 
        className='bg-accentWhite w-16 h-[70px] rounded-md flex flex-col gap-1 text-accent justify-center items-center shadow-sm shadow-lightGreen group overflow-hidden'>
        <div className='flex items-center justify-center'>
            {session?.user ? (
              <Image src={session?.user?.image as string} alt="userImage" width={35} height={35} className='rounded-full -translate-x-12 group-hover:translate-x-4 transition-transform duration-200' />
            ):(
              <MdSwitchAccount 
              className='text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200'/>
            )}
            {session?.user ? (
              <Image src={session?.user?.image as string} alt="userImage" width={35} height={35} className='rounded-full -translate-x-5 group-hover:translate-x-12 transition-transform duration-200' />
            ) : (
              <MdSwitchAccount className='text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200'/>)}
        </div>
        <p className='text-xs font-semibold'>Profile</p>
        </Link>
        {/* Cart */}
        <SidebarCart />
    </div>
  )
}

export default Sidebar
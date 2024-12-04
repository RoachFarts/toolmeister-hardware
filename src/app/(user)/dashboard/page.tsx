import { auth, signOut } from '@/auth'
import Container from '@/components/Container'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'


const DashboardPage = async() => {
    const session = await auth()
    if (!session?.user){
        redirect('/')
    }
  return (
    <Container className='py-10 '>
        <h2 className='text-2xl font-semibold'>Welcome to your Dashboard</h2>
        <div className='flex items-center gap-3 my-5'>
            <Image src={session?.user?.image as string} 
            alt='userImage' 
            width={200} 
            height={200} 
            className='w-10 h-10 rounded-full'
            />
            <div>
                <p> {session?.user?.name} </p>
                <p> {session?.user?.email} </p>
            </div>
        </div>
        <form action={async()=>{
            'use server'
            await signOut()
        }}>
            <button 
              type='submit' 
              className='border bg-gray-200 border-gray-400 px-8 py-2 text-sm font-semibold rounded-md hover:bg-gray-800 hover:text-white hoverEffect'>
              Sign Out
            </button>
        </form>
    </Container>
  )
}

export default DashboardPage
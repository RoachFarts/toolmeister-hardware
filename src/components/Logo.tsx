import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const Logo = ({className}:{className?:string}) => {
  return (
    <Link href="/">
        <h2 className={twMerge('text-2xl text-accent hover:text-darkOrange font-bold hoverEffect relative group overflow-hidden', className)}>
        ToolMeister
        <span className='absolute left-0 bottom-0 w-full h-px bg-darkOrange -translate-x-[105%] group-hover:translate-x-0 hoverEffect' />
    </h2>
    </Link>
  )
}

export default Logo
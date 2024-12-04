'use client';
import React from 'react'
import { FaSearchengin } from "react-icons/fa";
import { IoMdClose } from 'react-icons/io';

const SearchInput = () => {
    const [search, setSearch] = React.useState('');
  return(
  <>
  <div className='w-full hidden md:inline-flex flex-1 h-12 relative'>
    <FaSearchengin className='text-lg absolute left-2.5 mt-3.5 text-darkOrange'/>
    <input type='text' placeholder='How can we help you today?'
    className='flex-1 h-full outline-none bg-white placeholder-lightText border-[1px] border-accent/40 rounded-sm pl-8 pr-28' 
    onChange={(e) => setSearch(e.target.value)}
    value={search}
    />
    {search && <IoMdClose onClick={()=>setSearch('')} className='text-accent/50 hover:text-lightRed hoverEffect cursor-pointer absolute right-24 top-4'/>}
    <button className='bg-lightOrange text-accentWhite absolute right-0 px-3.5 py-1.5 mr-1.5 text-sm hover:bg-darkOrange hoverEffect font-medium top-2'>Search</button>
  </div>
  </>
  )
}

export default SearchInput
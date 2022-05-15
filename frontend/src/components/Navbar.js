import React from 'react'

import { useNavigate } from "react-router-dom";

const Navbar = () => {

    let navigate = useNavigate()
  return (
    <div className='w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg'>
        <div className='px-2 flex justify-between items-center w-full h-full'>
            <div className='flex items-center'>
                <h1 onClick={() => {navigate("/")}} className='cursor-pointer text-3xl font-bold mr-4 sm:text-4xl ml-4'>MAGNUS.</h1>
                
            </div>
            <div className='hidden md:flex pr-4'>
                <button className='border-none bg-transparent text-black mr-4'>About</button>
                <button onClick={() => {navigate("/dashboard")}} className='border-none bg-transparent text-black mr-4'>Dashboard</button>
                <button className='border-none bg-transparent text-black mr-4'>Study Decks</button>
                <button className='border-none bg-transparent text-black mr-4'>Support</button>
            </div>
            
        </div>
        
    </div>
  )
}

export default Navbar
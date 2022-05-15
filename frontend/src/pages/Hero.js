import React from 'react'

import { useNavigate } from "react-router-dom";

import reading2 from '../assets/reading2.png'

const Hero = () => {
    let navigate = useNavigate()
  return (
    <div>  
        
        <div className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
            <div className='grid md:grid-cols-2 max-w-[1240px] m-auto md:px-5'>
                <div className='flex flex-col justify-center w-full px-2 py-8'>
                    {/* <p className='text-2xl'>Unique Sequencing & Production</p> */}
                    <h1 className='py-3 text-5xl md:text-7xl font-bold'>Lets Get back to Reading</h1>
                    {/* <p className='text-2xl'>This is our Tech brand</p> */}
                    <div className='flex pr-4 mt-4 space-x-2'>
                        <button onClick={() => {navigate("/uploads")}}className='px-8 py-2 rounded-full bg-transparent text-black mr-4'>Sign In</button>
                        <button className='px-8 py-2 rounded-full '>Sign Up</button>
                    </div>
                </div>
                <div>
                    <img className='w-full ml-3' src={reading2} alt="/"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero
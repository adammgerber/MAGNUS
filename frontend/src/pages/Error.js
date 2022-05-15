import React from 'react'

import error from '../assets/error.png'

const Error = () => {
  return (
        
    <div className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
        <div className='items-center mt-32 flex flex-col justify-between px-2 py-8'>
            <h1 className='text-4xl text-black font-mono'>Oops, Nothing to see here...</h1>
            <img className='w-[80%] h-[80%] ml-3' src={error} alt="/"/>
        </div>
    </div>
  )
}

export default Error
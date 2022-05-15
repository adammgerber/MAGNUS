import React, {useEffect, useState} from 'react'
import { BackspaceIcon } from '@heroicons/react/solid'
import noch from '../assets/noch1.jpg'
const Dashboard = () => {

  
    
    const [isLoading, setLoading] = useState(true)
    const   [loadedData, setLoadedData] = useState([])

    useEffect(()=> {
        setLoading(true)
        fetch('http://localhost:5000/books').then(response => {
        return response.json()
        }).then((data) => {
            // const booktitles= [];
            // for(const key in data){
            //     const booktitle = {
            //         id: key,
            //         ...data[key]
            //     };
            //     booktitles.push(booktitle)
            // };
            setLoading(false)
            setLoadedData(data)
            console.log(data)
        })
    }, [])

    // const booktitles = loadedData.map((title) => <h1>{title}</h1>)

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    }

  return (
    
    <div className='w-full h-screen bg-zinc-200 flex items-center flex-col '>
        <div class="mt-40 align-middle inline-block w-[80%] shadow overflow-hidden rounded-lg border-b border-gray-200">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th
                            class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Title</th>
                        <th
                            class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Author</th>
                        <th
                            class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Status</th>
                        <th
                            class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Language</th>
                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                    </tr>
                </thead>

                <tbody class="bg-white">
                    {loadedData.map((title) => (

                   
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 object-cover rounded-full"
                                        src={noch}
                                        alt=""/>
                                </div>

                                <div className="ml-4">
                                    <button className='border-none px-8 py-3 rounded-md bg-transparent text-black mr-4'>{title}
                                    </button>
                                </div>
                            </div>
                        </td>

                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">Author</div>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        </td>

                        <td
                            className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                            Russian</td>

                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                             <a href="/" className="flex items-center justify-center text-sm text-rose-500 transition-colors duration-300 h-10 w-10 hover:text-rose-400">
                                <BackspaceIcon/>
                            </a>
                        </td>
                    </tr>
                     ))}
                </tbody>
            </table>
        </div>
 </div>
  )
}

export default Dashboard
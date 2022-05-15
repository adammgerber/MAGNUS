import React , {useState} from 'react'
import axios from 'axios';
import books from '../assets/uploadbooks.png'


const Upload = () => {

    const [file, setFile] = useState()
    const [filename, setFilename] = useState('Choose File')
    const [language, setLanguage] = useState('Choose language...')

    function handleChange(e){
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
        
    }
    function handleSubmit(e){
        e.preventDefault()
        const url = '/upload'
        const formData = new FormData()
        formData.append('file', file)
        formData.append('language', language)
        formData.append('fileName', file.name)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formData, config).then((response) => {
            console.log(response.data)
            
        })


    };




  return (
    <div className='w-full h-screen bg-zinc-200 flex items-center flex-col '>
         
        <div className="rounded-xl bg-zinc-100 shadow-2xl flex flex-row justify-center items-center mt-40 w-[60%] h-[60%]">
           
            <div className=" ml-16  max-w-lg  mt-5 mb-2 ab">
                <img alt="avatar" className="object-cover w-80 h-[100%]" src={books}/>
            </div>

            <form onSubmit={handleSubmit} className="w-96 mr-4" action="" method="POST" enctype="multipart/form-data">
                
                <div className="flex flex-col py-24 mt-4 justify-center space-y-36">
                    <div>
                        <div class="custom-file">
                            <input type="file" onChange={handleChange} class="custom-file-input" id="customFile"/>
                            <label class="custom-file-label" for="customFile">{filename}</label>
                            </div>
                        <div className="mb-5 mt-2 xl:w-96">
                            <select onChange={(e) => {
                                const selectedLanguage = e.target.value;
                                setLanguage(selectedLanguage)
                            }} class="custom-select">
                                <option value="">{language}</option>
                                <option value="Russian">Russian</option>
                                <option value="Spanish">Spanish</option>
                                <option value="3">Three</option>
                            </select>
                            
                        </div>
                    </div>
                    <button className='bg-indigo-600 rounded-md py-2'>Submit</button>
                </div>
                
            </form>
            
        </div>
    </div>
  )
}

export default Upload
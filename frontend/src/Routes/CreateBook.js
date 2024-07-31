import React, { useState } from 'react'
import LoggedinUi from '../Component/LoggedinUi';
import Input from '../Component/Input';
import { makeAuthenticatedPOSTRequest } from '../Utils/endPointCalling';
import { useNavigate } from 'react-router-dom';

function CreateBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const uploadBook = async () => {
        if(!title || !author || !description || !genre || !coverImage){
            alert('Incomplete Details');
            return ;
        }
        const body = {title, author, description, genre, coverImage};
        const response = await makeAuthenticatedPOSTRequest('/book/create', body);
        if(response && !response.err){
            console.log(response);
            navigate('/home');
        }
    }

  return (
    <LoggedinUi>
        <div className='w-full h-full flex flex-col justify-center items-start'>
            <div className='w-full h-[15%] flex justify-center items-center text-white text-[2.5vmax] font-bold'>
                CREATE BOOK
            </div>
            <div className='w-full h-[85%] flex flex-col'>
                <Input value={title} setValue={setTitle} label='Title' placeholder='Enter Book TItle' />
                <Input value={author} setValue={setAuthor} label='Author' placeholder='Enter Author Name' />
                <Input value={coverImage} setValue={setCoverImage} label='Cover Image' placeholder='Enter Link To Cover Image' />
                <Input value={genre} setValue={setGenre} label='Genre' placeholder='Enter Book Genre' />
                <Input value={description} setValue={setDescription} label='Description' placeholder='Enter Short Description' />
                <div className='w-full flex gap-[1vmax] justify-center items-center my-[1vmax]'><button onClick={(e)=>{
              e.preventDefault();
              uploadBook();
            }} style={{backgroundColor: '#F2613F'}} className='btn w-[9vmax] p-[0.5vmax] rounded-[0.5vmax] text-[1.1vmax] text-white font-bold'>Upload Book</button></div>
            </div>
        </div>
    </LoggedinUi>
  )
}

export default CreateBook
import React, { useEffect, useState } from 'react'
import LoggedinUi from '../Component/LoggedinUi'
import { makeAuthenticatedGETRequest } from '../Utils/endPointCalling'
import BookCardDB from '../Component/BookCardDB';
import BookCard from '../Component/BookCard';

function Saved() {
    const [book, setBook] = useState([]);
        const [bookAPI, setBookAPI] = useState([]);
    const getData = async () => {

        const response = await makeAuthenticatedGETRequest('/book/get/savedbooks');
        if(response.data && !response.err){
            setBook(response.data.saved);
        }
        if(response.dataAPI) {
            console.log(response.dataAPI)
            setBookAPI(response.dataAPI);
        }
    }

    useEffect(()=>{
        getData();
    },[]);

  return (
    <LoggedinUi>
        <div className='w-full h-full flex flex-col justify-start items-center'>
        <div className='w-full h-[15%] flex justify-center items-center text-white text-[2.5vmax] font-bold'>
                SAVED BOOKS
            </div>
            <div className='w-full flex justify-center flex-wrap items-center'>
                {book.length>0 && book.map((item)=>{
                    return <BookCardDB info={item} />
                })}
                {bookAPI.length>0 && bookAPI.map((item)=>{
                    return <BookCard info={item} />
                })}
            </div>
        </div>
    </LoggedinUi>
  )
}

export default Saved
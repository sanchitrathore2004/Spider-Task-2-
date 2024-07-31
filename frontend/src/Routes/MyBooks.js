import React, { useEffect, useState } from 'react'
import LoggedinUi from '../Component/LoggedinUi';
import { makeAuthenticatedGETRequest } from '../Utils/endPointCalling';
import BookCardDB from '../Component/BookCardDB';

function MyBooks() {
    const [myBooks, setMyBooks] = useState([]);

    useEffect(()=>{
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest('/book/get/mybooks');
            if(response && !response.err){
                console.log(response);
                await setMyBooks(response.data);
            }
        }
        getData();
    },[]);

  return (
    <LoggedinUi>
        <div className='w-full h-full'>
        <div className='w-full h-[15%] flex justify-center items-center text-white text-[2.5vmax] font-bold'>
                MY BOOKS
            </div>
            <div className='w-full h-[85%] flex justify-center items-center flex-wrap'>
                {myBooks.length>0 && myBooks.map((item)=>{
                    return <BookCardDB info={item} />
                })}
            </div>
        </div>
    </LoggedinUi>
  )
}

export default MyBooks
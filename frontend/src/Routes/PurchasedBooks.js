import React, { useEffect, useState } from 'react'
import LoggedinUi from '../Component/LoggedinUi'
import { makeAuthenticatedGETRequest } from '../Utils/endPointCalling';
import BookCardDB from '../Component/BookCardDB';
import BookCard from '../Component/BookCard';

function PurchasedBooks() {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [purchasedBooksAPI, setPurchasedBooksAPI] = useState([]);

  const getData = async () => {
    const response = await makeAuthenticatedGETRequest('/book/get/purchased/books');
    if(response && !response.err){
      console.log(response);
      await setPurchasedBooks(response.data.purchases);
      await setPurchasedBooksAPI(response.dataAPI);
    }
  }

  useEffect(()=>{
    getData();
  },[]);

  return (
    <LoggedinUi>
        <div className='w-full h-full flex justify-center items-center flex-col'>
        <div className='w-full h-[15%] flex justify-center items-center text-white text-[2.5vmax] font-bold'>
                PURCHASED BOOKS
            </div>
            <div className='w-full h-[85%] gap-[2vmax] flex justify-center items-center flex-wrap'>
              {purchasedBooks.length>0 && purchasedBooks.map((item)=>{
                return <BookCardDB info={item} />
              })}
              {purchasedBooksAPI.length>0 && purchasedBooksAPI.map((item)=>{
                return <BookCard info={item} />
              })}
            </div>
        </div>
    </LoggedinUi>
  )
}

export default PurchasedBooks
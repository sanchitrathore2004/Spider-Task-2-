import React, { useEffect, useState } from 'react'
import LoggedinUi from '../Component/LoggedinUi'
import Searchbar from '../Component/Searchbar';
import {makeAuthenticatedGETRequest} from '../Utils/endPointCalling';
import BookCard from '../Component/BookCard';
import BookCardDB from '../Component/BookCardDB';

function LoggedinHome() {
  const [keyword, setKeyword] = useState('');
  const [info, setInfo] = useState(null);
  const [book, setBook] = useState([]);
  const [bookData, setBookData] = useState([]);

  const searchFunc = async () => {
    const response = await makeAuthenticatedGETRequest('/book/search/'+keyword);
    console.log(response);
    setBook(response.data.items);
  }

  useEffect(()=>{
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest('/book/getbooks');
      setBookData(response.data);
    }
    getData();
  },[]);

  return (
    <LoggedinUi>
      <div className='w-full h-full flex flex-col'>
      <div className='flex justify-center w-full h-[15%]'>
      <Searchbar value={keyword} setValue={setKeyword} label='Search' placeholder='Enter Book Name' />
      <button onClick={(e)=>{
        e.preventDefault();
        console.log('clicked')
        searchFunc();
      }}><img className='w-[3vmax] rounded-[0.5vmax] mx-[0.5vmax]' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLRqbzf7cgqwZPQJc-XNuNcDlMdhjyZM9MA&s' /></button>
      </div>
      {book.length>0 && <div className='text-white w-full flex justify-center items-center text-[1.1vmax]'>Showing results for : "{keyword}"</div>}
      <div className='w-full h-[85%] items-start gap-[0.5vmax] justify-center flex flex-wrap'>
        {book.length==0 && bookData.length==0 && <div className='text-white text-[1.1vmax]'>Nothing to show.. Please modify your search</div>}
        {book.length>0 && book.map((item)=>{
          return <BookCard info={item} />
        })}
        {book.length==0 && bookData.length>0 && bookData.map((item)=>{
          return <BookCardDB info={item} />
        })}
      </div>
      </div>
    </LoggedinUi>
  )
}

export default LoggedinHome
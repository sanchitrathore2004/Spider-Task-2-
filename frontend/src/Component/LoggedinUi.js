import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import userContext from '../Context/Context';
import { makeAuthenticatedGETRequest } from '../Utils/endPointCalling';
import BookModal from '../Modal/BookModal';

function LoggedinUi({children}) {

  const {profileInfo, setProfileInfo, showModal, setShowModal, bookInfo, setBookInfo, bookType, setBookType} = useContext(userContext);

  useEffect(()=>{
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest('/auth/get/mydetails');
      console.log(response);
      await setProfileInfo(response.data);
    }
    getData();
  },[]);
  
  return (
    <div style={{background: 'linear-gradient(45deg, #0C0C0C, #481E14)'}} className='w-full h-screen overflow-auto'>
      {showModal && <BookModal info={bookInfo} type={bookType} />}
      <div className='w-full h-[20%] flex justify-center justify-between items-center'> 
        <img className='w-[7vmax] rounded-[0.5vmax] mx-[4vmax]' src={logo} />
        <div className='w-[50%] mx-[4vmax] h-full flex gap-[1vmax] justify-end text-[1.3vmax] font-bold items-center text-white'> 
          <div className='flex justify-center items-center gap-[1vmax] border-2 p-[0.8vmax] rounded-[1vmax]'>
        <Link to='/home'><div className='btnnav cursor-pointer'>HOME</div></Link>
          <Link to='/saved'><div className='btnnav cursor-pointer'>SAVED BOOKS</div></Link>
          <Link to='/create/book'><div className='btnnav cursor-pointer'>CREATE BOOK</div></Link>
          <div className='btnnav cursor-pointer'>PURCHASE</div>
          <div className='btnnav cursor-pointer'>MY BOOKS</div>
          </div>
          <Link to='/profile'><div style={{backgroundColor: '#F2613F'}} className='p-[1vmax] text-[1.8vmax] w-[2.8vmax] h-[2.8vmax] cursor-pointer justify-center items-center flex rounded-full'>{profileInfo && profileInfo.name.charAt(0).toUpperCase()}</div></Link>
           </div>
      </div>
      <div className='w-full h-[80%]'>
        {children}
      </div>
    </div>
  );
}

export default LoggedinUi
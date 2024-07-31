import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import userContext from '../Context/Context';
import { makeAuthenticatedGETRequest } from '../Utils/endPointCalling';
import BookModal from '../Modal/BookModal';
import OptionModal from '../Modal/OptionModal';

function LoggedinUi({children}) {

  const {profileInfo, setProfileInfo, showModal, setShowModal, bookInfo, setBookInfo, bookType, setBookType, profilePhoto, setProfilePhoto, optionModal, setOptionModal} = useContext(userContext);

  useEffect(()=>{
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest('/auth/get/mydetails');
      console.log(response);
      await setProfileInfo(response.data);
    }
    getData();
  },[]);

  function getToken () {
    const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,"$1");
    return accessToken;
} 

useEffect(() => {
  const fetchProfilePhoto = async () => {
      try {
        const token = await getToken();
          const response = await fetch('http://localhost:8080/auth/profile-photo', {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });

          if (response.ok) {
              const blob = await response.blob();
              await setProfilePhoto(URL.createObjectURL(blob));
          } else {
              console.error('Failed to fetch profile photo');
          }
      } catch (error) {
          console.error('Error fetching profile photo:', error);
      }
  };

  fetchProfilePhoto();
}, []);
  
  return (
    <div style={{background: 'linear-gradient(45deg, #0C0C0C, #481E14)'}} className='w-full h-screen overflow-auto'>
      {showModal && <BookModal info={bookInfo} type={bookType} />}
      {optionModal && <OptionModal />}
      <div className='w-full h-[20%] flex justify-center justify-between items-center'> 
        <img className='w-[7vmax] rounded-[0.5vmax] mx-[4vmax]' src={logo} />
        <div className='w-[50%] mx-[4vmax] h-full flex gap-[1vmax] justify-end text-[1.3vmax] font-bold items-center text-white'> 
          <img onClick={(e)=>{
            e.preventDefault();
            setOptionModal(true);
          }} className='navBtn w-[2.8vmax] h-[2.8vmax] rounded-full cursor-pointer' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWXXl6eZm4PhROYHpljv1YdFkioJSkwMTJQ&s' />
          <div className='navigation flex justify-center items-center gap-[1vmax] border-2 p-[0.8vmax] rounded-[1vmax]'>
        <Link to='/home'><div className='btnnav cursor-pointer'>HOME</div></Link>
          <Link to='/saved'><div className='btnnav cursor-pointer'>SAVED BOOKS</div></Link>
          <Link to='/create/book'><div className='btnnav cursor-pointer'>CREATE BOOK</div></Link>
          <Link to={'/purchased/books'}><div className='btnnav cursor-pointer'>PURCHASED</div></Link>
          <Link to='/mybooks'><div className='btnnav cursor-pointer'>MY BOOKS</div></Link>
          </div>
          <Link to='/profile'><div style={{backgroundColor: '#F2613F'}} className=' text-[1.8vmax] w-[2.8vmax] h-[2.8vmax] cursor-pointer justify-center items-center flex rounded-full'>{!profilePhoto && profileInfo && profileInfo.name.charAt(0).toUpperCase()}{profilePhoto && <img className='w-[2.8vmax] h-[2.8vmax] rounded-full' src={profilePhoto} />}</div></Link>
           </div>
      </div>
      <div className='w-full h-[80%]'>
        {children}
      </div>
    </div>
  );
}

export default LoggedinUi
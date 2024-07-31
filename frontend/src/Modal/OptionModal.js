import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../Context/Context';

function OptionModal() {
    const {OptionModal, setOptionModal} = useContext(userContext);
  return (
    <div onClick={(e)=>{
        e.preventDefault();
        setOptionModal(false);
    }} className='w-full h-screen bg-black bg-opacity-80 absolute text-white gap-[1vmax] font-bold flex flex-col justify-center items-center'>
        <Link to='/home'><div className='btnnav cursor-pointer'>HOME</div></Link>
          <Link to='/saved'><div className='btnnav cursor-pointer'>SAVED BOOKS</div></Link>
          <Link to='/create/book'><div className='btnnav cursor-pointer'>CREATE BOOK</div></Link>
          <Link to={'/purchased/books'}><div className='btnnav cursor-pointer'>PURCHASED</div></Link>
          <Link to='/mybooks'><div className='btnnav cursor-pointer'>MY BOOKS</div></Link>
    </div>
  )
}

export default OptionModal
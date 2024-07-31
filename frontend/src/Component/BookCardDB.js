import React, { useContext } from 'react';
import userContext from '../Context/Context';

function BookCardDB({ info }) {
  const {bookInfo, setBookInfo, showModal, setShowModal, bookType, setBookType} = useContext(userContext);
//   const thumbnail = info.volumeInfo.imageLinks?.thumbnail || 'https://st3.depositphotos.com/17828278/33150/v/450/depositphotos_331503262-stock-illustration-no-image-vector-symbol-missing.jpg';

  return (
    <div onClick={(e)=>{
      e.preventDefault();
      setBookInfo(info);
      setBookType('DB');
      setShowModal(true);
    }} style={{ backgroundColor: '#0C0C0C' }} className="bookcard w-[20vmax] h-[30vmax] rounded-[0.5vmax] mx-[0.5vmax] my-[0.5vmax] cursor-pointer">
      <div className="w-full flex flex-col h-[80%] p-[0.5vmax]">
        <img className="rounded-[0.5vmax] h-full object-cover" src={info.coverImage} />
        <div className="w-full h-[50%] p-[0.5vmax]">
          <div className="text-[1.1vmax] font-bold text-center text-white my-[0.5vmax]">{info.title}</div>
        </div>
      </div>
    </div>
  );
}

export default BookCardDB;

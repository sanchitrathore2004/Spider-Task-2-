import React, { useContext } from 'react'
import userContext from '../Context/Context'
import { makeAuthenticatedGETRequest } from '../Utils/endPointCalling';
import { Link, useNavigate } from 'react-router-dom';

function BookModal({info, type}) {
    const {bookInfo , setBookInfo, showModal, setShowModal, profileInfo, setProfileInfo} = useContext(userContext);
    const navigate = useNavigate();
    console.log(profileInfo)
    console.log(info._id)

    const saveFunc = async (type) => {
        if(type=='DB'){
            const response = await makeAuthenticatedGETRequest('/book/save/'+info._id);
            if(response &&!response.err){
                console.log(response);
                setShowModal(false);
            }
        }
        else if(type=='API'){
            const response = await makeAuthenticatedGETRequest('/book/save/api/'+info.id);
            if(response &&!response.err){
                console.log(response);
                setShowModal(false);
            }
        }
    }

    const remvoveFunc = async (type) => {
        if(type=='DB'){
            const response = await makeAuthenticatedGETRequest('/book/remove/'+info._id+"/"+type);
            if(response && ! response.err){
                console.log(response);
                setShowModal(false);
            }
        }
        else if (type=='API'){
            const response = await makeAuthenticatedGETRequest('/book/remove/'+info.id+"/"+type);
            if(response && ! response.err){
                console.log(response);
                setShowModal(false);
            }
        }
    }

  return (
    <div className='w-full h-screen bg-black bg-opacity-80 absolute flex justify-center items-center'>
        <div style={{backgroundColor: '#0C0C0C'}} className='text-white w-[50vmax] h-[35vmax] rounded-[0.5vmax] overflow-auto flex flex-col justify-start items-center'>
            <div className='w-full h-[50%] flex gap-[1vmax] my-[2vmax]'>
                <div className='h-full w-[50%] flex justify-end items-center'><img className='h-full' src={info.coverImage} /></div>
                <div className='h-full w-[50%] flex flex-col justify-start items-center text-[3vmax] font-bold text-center'>{info.title}
                    <div className='text-[2vmax]'>Author:{" "+info.author}</div>
                </div>
            </div>
            <div className='w-full p-[0.5vmax] justify-center text-center items-center my-[2vmax] text-[1.3vmax] font-semibold'>
                    <span className='font-bold text-[1.5vmax]'>Description:</span> {info.description}
                </div>
                <div className='w-full my-[1vmax] flex justify-center gap-[2vmax] items-center'><button onClick={(e)=>{
                    e.preventDefault();
                    if(!profileInfo.saved.includes(info._id) && !profileInfo.savedApi.includes(info.id)){
                        saveFunc(type);
                    }
                    else {
                        remvoveFunc(type);
                    }
                }} style={{backgroundColor: '#F2613F'}} className='p-[0.5vmax] rounded-[0.5vmax] text-[1.1vmax] font-bold'>{profileInfo.saved.includes(info._id) ? 'Remove From Favorites' : 'Save To Favorites' && profileInfo.savedApi.includes(info.id) ? 'Remove From Favorites' : 'Save To Favorites'}</button><button onClick={(e)=>{
                    e.preventDefault();
                    setShowModal(false);
                    if(!profileInfo.purchases.includes(info._id) && !profileInfo.purchasesApi.includes(info.id)){
                        navigate('/purchase');
                    }
                }} style={{backgroundColor: '#F2613F'}} className='p-[0.5vmax] text-[1.1vmax] font-bold rounded-[0.5vmax]'>{profileInfo.purchases.includes(bookInfo._id) ? 'Already Purchased' : 'Purchase Book' && profileInfo.purchasesApi
                .includes(bookInfo.id) ? 'Already Purchased' : 'Purchase Book'}</button></div>
        </div>
        <div onClick={(e)=>{
            e.preventDefault();
            setShowModal(false);
        }} className='flex justify-start items-start h-full cursor-pointer text-white py-[2vmax] text-[3vmax] font-bold'>X</div>
    </div>
  )
}

export default BookModal
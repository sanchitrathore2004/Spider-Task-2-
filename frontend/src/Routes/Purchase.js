import React, { useContext } from 'react'
import LoggedinUi from '../Component/LoggedinUi';
import userContext from '../Context/Context';
import { makeAuthenticatedGETRequest } from '../Utils/endPointCalling';
import { useNavigate } from 'react-router-dom';

function Purchase() {
    const {bookInfo, setBookInfo, bookType, setBookType} = useContext(userContext);
    const navigate = useNavigate();
    console.log(bookInfo);

    const addtoPurchase = async () => {
        if(bookType=='DB'){
            const response = await makeAuthenticatedGETRequest('/book/add/to/purchase/'+bookInfo._id+"/"+bookType);
            if(response && !response.err){
                navigate('/home');
                console.log(response);
            }
        }
        else if(bookType=='API'){
            const response = await makeAuthenticatedGETRequest('/book/add/to/purchase/'+bookInfo.id+"/"+bookType);
            if(response && !response.err){
                navigate('/home');
                console.log(response);
            }
        }  
    }

  return (
    <LoggedinUi>
        <div className='w-full flex justify-center items-center flex-wrap h-full'>
            <div className='h-full flex flex-col justify-center items-center w-[50%]'>
                <img className='w-[25vmax] h-[30vmax]' src={bookInfo.coverImage} />
                <div className='w-[50%] text-white font-bold p-[1vmax] text-[3vmax] text-center'>{bookInfo.title}</div>
            </div>
            <div className='h-full flex flex-col justify-start items-start p-[2vmax] text-[2.5vmax] text-white font-bold w-[50%]'>Price: $$$$
                <div className='h-full flex flex-col justify-start items-start p-[2vmax] text-[1.5vmax] text-white font-bold w-[50%]'><button onClick={(e)=>{
                    e.preventDefault();
                    addtoPurchase();
                }} style={{backgroundColor: '#F2613F'}} className='p-[0.5vmax] rounded-[0.5vmax]'>Purchase</button></div>
            </div>
        </div>
    </LoggedinUi>
  )
}

export default Purchase
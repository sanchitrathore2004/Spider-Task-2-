import React, { useContext } from 'react'
import LoggedinUi from '../Component/LoggedinUi'
import userContext from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
    const {profileInfo, setProfileInfo} = useContext(userContext);
    const navigate = useNavigate();
  return (
    <LoggedinUi>
        <div className='w-full h-full flex flex-col justify-start items-center'>
        <div style={{backgroundColor: '#F2613F'}} className='w-[10vmax] h-[10.4vmax] text-[5vmax] font-bold rounded-full h-[20%] flex justify-center items-center text-white'>
            {profileInfo.name.charAt(0).toUpperCase()}
        </div>
        <div className='w-full h-[50%] flex justify-start items-center my-[1.5vmax] flex-col gap-[1vmax]'>
            <div className='text-[2vmax] text-white font-semibold'>NAME: <span className='font-bold'>{profileInfo.name}</span></div>
            <div className='text-[2vmax] text-white font-semibold'>EMAIL: <span className='font-bold'>{profileInfo.email}</span></div>
            <div className='text-[2vmax] text-white font-semibold'>USERNAME: <span className='font-bold'>{profileInfo.userName}</span></div>
            <div className='w-full flex gap-[1vmax] justify-center items-center'><button onClick={(e)=>{
              e.preventDefault();
              navigate('/profile/edit');
            }} style={{backgroundColor: '#F2613F'}} className='btn w-[9vmax] p-[0.5vmax] rounded-[0.5vmax] text-[1.1vmax] text-white font-bold'>Edit Details</button><button onClick={(e)=>{
                e.preventDefault();
                navigate('/edit/password');
              }} style={{backgroundColor: '#F2613F'}} className='btn w-[9vmax] p-[0.5vmax] rounded-[0.5vmax] text-[1.1vmax] text-white font-bold'>Edit Password</button></div>
        </div>
    </div>
    </LoggedinUi>
  )
}

export default Profile
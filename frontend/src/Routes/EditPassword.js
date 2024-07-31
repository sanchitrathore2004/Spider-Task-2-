import React, { useContext, useState } from 'react'
import LoggedinUi from '../Component/LoggedinUi'
import userContext from '../Context/Context';
import Input from '../Component/Input';
import { useNavigate } from 'react-router-dom';
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../Utils/endPointCalling';
import Password from '../Component/Password';

function EditPassword() {
    const {profileInfo, setProfileInfo, profilePhoto, setProfilePhoto} = useContext(userContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const updatePassword = async () => {
        if(!oldPassword || !newPassword){
            alert('Incomplete Details');
            return ;
        }
        const body = {oldPassword, newPassword};
        const response = await makeAuthenticatedPOSTRequest('/auth/change/password', body);
        if(response && !response.err){
            navigate('/profile');
        }
    }

  return (
    <LoggedinUi>
        <div className='w-full h-full flex flex-col justify-start items-center'>
        <div style={{backgroundColor: `${!profilePhoto && '#F2613F'}`}} className='w-[10vmax] h-[10vmax] text-[5vmax] my-[1vmax] font-bold rounded-full h-[20%] flex justify-center items-center text-white'>
        {!profilePhoto && profileInfo.name.charAt(0).toUpperCase()}{profilePhoto && <img className='w-[10vmax] h-[10vmax] rounded-full' src={profilePhoto} />}
        </div>
        <Password value={oldPassword} setValue={setOldPassword} label='Current Password' placeholder='Enter Your Current Password' />
        <Password value={newPassword} setValue={setNewPassword} label='New Password' placeholder='Enter Your New Password' />
        <div className='w-full flex gap-[1vmax] my-[1vmax] justify-center items-center'><button onClick={(e)=>{
              e.preventDefault();
              updatePassword();
              navigate('/profile/edit');
            }} style={{backgroundColor: '#F2613F'}} className='btn w-[10vmax] p-[0.5vmax] rounded-[0.5vmax] text-[1.1vmax] text-white font-bold'>Update Password</button></div>
        </div>
    </LoggedinUi>
  )
}

export default EditPassword
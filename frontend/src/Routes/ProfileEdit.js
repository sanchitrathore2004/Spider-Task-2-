import React, { useContext, useState } from 'react'
import LoggedinUi from '../Component/LoggedinUi'
import Input from '../Component/Input'
import userContext from '../Context/Context'
import { makeAuthenticatedPOSTRequest } from '../Utils/endPointCalling';
import { useNavigate } from 'react-router-dom';

function ProfileEdit() {
    const {profileInfo, setProfileInfo} = useContext(userContext);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const updateFunc = async () => {
      const body = {};
      if(email){
        body.email = email;
      }
      if(name){
        body.name = name;
      }
      if(userName){
        body.userName = userName;
      }
      if(!email && !name && !userName){
        alert('Enter The Fields You Want To Update');
        return ;
      }
      const response = await makeAuthenticatedPOSTRequest('/auth/edit/my/details', body);
      if(response && !response.err){
        console.log(response);
        navigate('/profile');
      }
    }

    return(
  <LoggedinUi>
    <div className='w-full h-full flex flex-col justify-start items-center'>
        <div style={{backgroundColor: '#F2613F'}} className='w-[10vmax] h-[10.4vmax] text-[5vmax] font-bold rounded-full h-[20%] flex justify-center items-center text-white'>
            {profileInfo.name.charAt(0).toUpperCase()}
        </div>
        <div className='w-full h-[50%] flex flex-col gap-[1vmax]'>
            <Input value={name} setValue={setName} label='Name' placeholder={profileInfo.name} />
            <Input value={email} setValue={setEmail} label='Email' placeholder={profileInfo.email} />
            <Input value={userName} setValue={setUserName} label='UserName' placeholder={profileInfo.userName} />
            <div className='w-full flex justify-center items-center'><button onClick={(e)=>{
              e.preventDefault();
              updateFunc();
            }} style={{backgroundColor: '#F2613F'}} className='w-[9vmax] p-[0.5vmax] rounded-[0.5vmax] text-[1.1vmax] text-white font-bold'>Update Details</button></div>
        </div>
    </div>
  </LoggedinUi>
  )
}

export default ProfileEdit
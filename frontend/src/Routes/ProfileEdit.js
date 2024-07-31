import React, { useContext, useEffect, useRef, useState } from 'react';
import LoggedinUi from '../Component/LoggedinUi';
import Input from '../Component/Input';
import userContext from '../Context/Context';
import { makeAuthenticatedPOSTRequest } from '../Utils/endPointCalling';
import { useNavigate } from 'react-router-dom';

function ProfileEdit() {
    const { profileInfo, setProfileInfo, profilePhoto, setProfilePhoto } = useContext(userContext);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const ref = useRef();

    function getToken () {
      const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,"$1");
      return accessToken;
  } 

    const updateFunc = async () => {
        const body = {};
        if (email) {
            body.email = email;
        }
        if (name) {
            body.name = name;
        }
        if (userName) {
            body.userName = userName;
        }
        if (!email && !name && !userName) {
            alert('Enter The Fields You Want To Update');
            return;
        }
        const response = await makeAuthenticatedPOSTRequest('/auth/edit/my/details', body);
        if (response && !response.err) {
            console.log(response);
            navigate('/profile');
        }
    }

    const handleProfilePhotoUpload = async () => {
        if(!profile){
            alert('Please Select a File');
            return;
        }
      if (profile) {
          try {
              const formData = new FormData();
              formData.append('profilePhoto', profile);
              const token = await getToken();
  
              const response = await fetch('http://localhost:8080/auth/edit/profile-photo', {
                  method: 'POST',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                  },
                  body: formData
              });
  
              if (!response.ok) {
                  const errorText = await response.text();
                  throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
              }
  
              const data = await response.json();
              setProfileInfo(data.user);
              console.log('Profile photo updated successfully');
          } catch (error) {
              console.error('Error uploading profile photo:', error);
          }
      }
  }

    return (
        <LoggedinUi>
            <div className='w-full h-full flex flex-col justify-start items-center'>
                <div style={{backgroundColor: `${!profilePhoto && '#F2613F'}`}} className='w-[10vmax] h-[10vmax] my-[1vmax] text-[5vmax] font-bold rounded-full h-[20%] flex justify-center items-center text-white'>
                    {!profilePhoto && profileInfo.name.charAt(0).toUpperCase()}
                    {profilePhoto && <img className='w-[10vmax] h-[10vmax] rounded-full' src={profilePhoto} />}
                </div>
                <div className='w-full h-[50%] flex flex-col gap-[1vmax]'>
                    <div className='w-full my-[1vmax] flex flex-col justify-center items-center'>
                        <input onChange={(e) => {
                            const file = e.target.files[0];
                            setProfile(file);
                        }} type='file' />
                        <div onClick={(e)=>{
                          handleProfilePhotoUpload();
                        }} style={{ backgroundColor: '#F2613F' }} className='text-[1.3vmax] my-[1vmax] p-[0.5vmax] rounded-[0.5vmax] cursor-pointer font-semibold text-white mx-[1vmax]'>Upload Profile Photo</div>
                    </div>
                    <Input value={name} setValue={setName} label='Name' placeholder={profileInfo.name} />
                    <Input value={email} setValue={setEmail} label='Email' placeholder={profileInfo.email} />
                    <Input value={userName} setValue={setUserName} label='UserName' placeholder={profileInfo.userName} />
                    <div className='w-full flex justify-center items-center'>
                        <button onClick={(e) => {
                            e.preventDefault();
                            updateFunc();
                        }} style={{ backgroundColor: '#F2613F' }} className='w-[9vmax] p-[0.5vmax] my-[1vmax] rounded-[0.5vmax] text-[1.1vmax] text-white font-bold'>Update Details</button>
                    </div>
                </div>
            </div>
        </LoggedinUi>
    )
}

export default ProfileEdit;

import React, { useState } from 'react'
import Input from '../Component/Input';
import Password from '../Component/Password';
import { Link, useNavigate } from 'react-router-dom';
import { makeUnauthenticatedPOSTRequest } from '../Utils/endPointCalling';
import {useCookies} from 'react-cookie';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const [cookie, setCookie] = useCookies(['token']);

    const signupFunc = async () => {
        if(!email || !password ||!name ||!userName){
            alert('Incomplete Details');
            return ;
        }
        const body = {name, email, userName, password};
        const response = await makeUnauthenticatedPOSTRequest('/auth/register', body);
        if(response && !response.err){
            console.log(response);
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate()+30);
            setCookie('token', token, {path: '/', expires: date,});
            navigate('/home');
        }
    }

  return (
    <div style={{background: 'linear-gradient(45deg, #0C0C0C, #481E14)'}} className='w-full flex justify-center items-center h-screen'>
        <div className='signup w-[28vmax] border-2 h-[35vmax] p-[1vmax] rounded-[0.5vmax] flex flex-col text-white'>
            <div style={{background: 'linear-gradient(45deg, #F2613F, #481E14'}} className='w-full rounded-[0.5vmax] flex justify-center items-center text-[1.5vmax] font-bold text-center h-[20%]'>WELCOME TO BOOKNOOK!</div>
            <div className='w-full h-[80%] justify-center flex items-center flex-col'>
            <Input value={name} setValue={setName} label='Name' placeholder='Enter Your Name' />
            <Input value={userName} setValue={setUserName} label='Username' placeholder='Enter Your Username' />
            <Input value={email} setValue={setEmail} label='Email' placeholder='Enter Your Email Id' />
            <Password value={password} setValue={setPassword} label='Password' placeholder='Enter Your Password' />
            <button onClick={(e)=>{
                e.preventDefault();
                signupFunc();
            }} style={{backgroundColor: '#F2613F'}} className='w-[40%] h-[3vmax] rounded-[0.5vmax] my-[0.5vmax] text-[1.1vmax] font-bold'> Sign In </button>
            <div className='text-[1.1vmax]'> Already Have an Account?.. <Link to='/login'><span className='font-bold cursor-pointer'>Login</span></Link> </div>
        </div>
        </div>
    </div>
  )
}

export default Signup
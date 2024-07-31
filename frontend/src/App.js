import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoggedinHome from './Routes/LoggedinHome';
import LoggedinUi from './Component/LoggedinUi';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import {useCookies} from 'react-cookie';
import Profile from './Routes/Profile';
import { useContext, useState } from 'react';
import userContext from './Context/Context';
import ProfileEdit from './Routes/ProfileEdit';
import EditPassword from './Routes/EditPassword';
import CreateBook from './Routes/CreateBook';
import Saved from './Routes/Saved';

function App() {
  const [cookie, setCookie] = useCookies(['token']);
  const [profileInfo, setProfileInfo] = useState(null);
  const [bookInfo, setBookInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookType, setBookType] = useState('');
  return (
    <BrowserRouter>
    <userContext.Provider value={{profileInfo, setProfileInfo, bookInfo, setBookInfo, showModal, setShowModal, bookType, setBookType}}>
    {cookie.token ? (
      <Routes>
      <Route path='/home' element={ <LoggedinHome /> } />
      <Route path='*' element={ <LoggedinHome /> } />
      <Route path='/profile' element={ <Profile /> } />
      <Route path='/profile/edit' element={ <ProfileEdit /> } />
      <Route path='/edit/password' element={ <EditPassword /> } />
      <Route path='/create/book' element={ <CreateBook /> } />
      <Route path='/saved' element={ <Saved /> } />
    </Routes>
    ):(
      <Routes>
      <Route path='/login' element={ <Login /> } />
      <Route path='/signup' element={ <Signup /> } />
      <Route path='*' element={ <Login /> } />
    </Routes>
    )}
    </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;

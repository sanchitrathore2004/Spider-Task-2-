import { createContext } from "react";

const userContext = createContext({
    profileInfo: null,
    setProfileInfo: (profileInfo)=>{},
    bookInfo: null,
    setBookInfo: (bookInfo) => {},
    showModal: null,
    setShowModal: (showModal)=> {},
    bookType: null,
    setBookType: (bookType)=>{},
});

export default userContext;
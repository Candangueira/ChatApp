import { React, useEffect, useState, useContext } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';

export function Chats() {

    const [chats, setChats] = useState([]);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {

        function getChats() {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        });
        return () => {
            unsub();
        };     
    };  
    currentUser.uid && getChats();    
 }, [currentUser.uid]);

    
    console.log(Object.entries(chats));
    
    return (
        <div className='chats'>
            {Object.entries(chats)?.map((chat) => (
            <div className='userchat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} >
            <img src={chat[1].userInfo.photoURL}/>
                <div className='userchatinfo'>
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].userInfo.lastMessage?.text}</p>
                </div>
            </div> 
            ))}
        </div>
    )
};
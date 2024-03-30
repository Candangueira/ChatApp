import { React, useEffect, useState, useContext } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

export function Chats() {

    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
      const getChats = () => {
        // returns realtime updates of the userChats collection.
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setChats(doc.data());
        });

      return () => {
        // clean up function.
        unsub();
      };
    };

    currentUser.uid && getChats();    
 }, [currentUser.uid]);

    const handleSelect = (user) => {
        dispatch({ type:"CHANGE_USER", payload: user });
    };
    
    return (
        <div className='chats'>
            {Object.entries(chats)?.sort((a,b)=>b[1].date -a[1].date).map((chat) => (
            <div className='userchat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} >
            <img src={chat[1].userInfo.photoURL}/>
                <div className='userchatinfo'>
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div> 
            ))}
        </div>
    )
};
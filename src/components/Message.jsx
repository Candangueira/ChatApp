import { React, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export function Message({message}) {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    // console.log(message);
    return (
        <>
        <div className={`message ${message.sendId === currentUser.uid && 'owner'}`}>
            <div className='messageinfo'>
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}/>
                <span>just now</span>
            </div>
            <div className='messagecontent'>
                <p>{message.text}</p>
                {message.img && <img src={message.img}/>}
            </div>
            
        </div>
        </>
    )
}
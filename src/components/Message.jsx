import { React, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export function Message({message}) {
    // Accessing the current user from the authentication context
    const { currentUser } = useContext(AuthContext);
    // Accessing chat data from the ChatContext
    const { data } = useContext(ChatContext);
    // Creating a reference to the message container element
    const ref = useRef();
    
    // Effect hook to scroll to the latest message when it changes
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <>
            <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
                <div className='messageinfo'>
                    <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}/>
                </div>
                <div className='messagecontent'>
                    <p>{message.text}</p>
                    {message.img && <img src={message.img} alt=''/>}
                </div>        
            </div>
        </>
    )
}
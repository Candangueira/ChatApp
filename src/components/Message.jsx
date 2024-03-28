import { React, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export function Message({message}) {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const [timeAgo, setTimeAgo] = useState('');
    const ref = useRef();
    
    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    useEffect(() => {
        // Calculate time ago
        const calculateTimeAgo = () => {
            const timestamp = message.timestamp; 
            const secondsAgo = Math.floor((Date.now() - timestamp) / 1000);
            if (secondsAgo < 60) {
                setTimeAgo('Just Now');
            } else {
                setTimeAgo('a time ago');
                // You can use a library like `date-fns` or `moment.js` for more advanced time formatting
            }
        };
          calculateTimeAgo();
    }, [message.timestamp]);

    return (
        <>
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
            <div className='messageinfo'>
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}/>
                <span>{timeAgo}</span>
            </div>
            <div className='messagecontent'>
                <p>{message.text}</p>
                {message.img && <img src={message.img}/>}
            </div>
            
        </div>
        </>
    )
}
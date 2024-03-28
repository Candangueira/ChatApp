import { React, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export function Message({message}) {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    console.log(message);
    return (
        <>
        <div className='message owner'>
            {/* <div className='messageinfo'>
                <img src='../src/assets/imgs/cassio.jpg'></img>
                <span>just now</span>
            </div>
            <div className='messagecontent'>
                <p>message</p>
                 <img src='../src/assets/imgs/cassio.jpg' className="image-message"></img> 
            </div>
             */}
        </div>
        </>
    )
}
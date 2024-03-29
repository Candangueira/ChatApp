import React, { useContext } from 'react';
import { Messages } from './Messages';
import { ChatContext } from '../context/ChatContext';

export function Chat() {

    const { data } = useContext(ChatContext);

    return (
        <>
        <div className='chat'>
            <div className='chatinfo'>
                <span>{data.user?.displayName}</span>
            </div>
        <Messages/>
        </div>
        </>
    )
}
import { React } from 'react';
import { Messages } from './Messages';

export function Chat() {
    return (
        <>
        <div className='chat'>
            <div className='chatinfo'>
                <span>USERNAME</span>
            </div>
        <Messages/>
        </div>
        </>
    )
}
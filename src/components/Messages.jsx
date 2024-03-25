import { React } from 'react';
import { Message } from './Message';
import { Input } from './Input';

export function Messages() {
    return (
        <>
        <div className='messages'>
            <Message/>
            <Message/>
            <Message/>
        </div>
        <Input/>
        </>
    )
}
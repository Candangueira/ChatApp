import { React, useContext, useEffect, useState } from 'react';
import { Message } from './Message';
import { Input } from './Input';
import { ChatContext } from '../context/ChatContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';


export function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        // passing the combinedId to the onSnapshot function
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        })
        // clean up
        return ()=>{
            unSub();
        }
    }, [data.chatId]);

    return (
        <>
        <div className='messages'>
            {messages.map(m=>(
                <Message message={m} key={m.id}/>
            ))}
        </div>
        <Input/>
        </>
    )
}
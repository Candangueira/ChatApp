import { React, useContext, useEffect, useState } from 'react';
import { Message } from './Message';
import { Input } from './Input';
import { ChatContext } from '../context/ChatContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';


export function Messages() {
    // State for storing messages
    const [messages, setMessages] = useState([]);
    // Accessing chat data from context
    const { data } = useContext(ChatContext);

    useEffect(() => {
        // onSnapshot allows you to listen to real-time updates of a doc.
        // passing the combinedId to the onSnapshot function
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            // If the document exists, update the messages state with the data from the document
            doc.exists() && setMessages(doc.data().messages);
        })
        // clean up function
        return ()=>{
            unSub();
        };
    }, [data.chatId]);

    return (
        <>
            <div className='messages'>
                {messages.map((m)=>(
                    <Message message={m} key={m.id}/>
                ))}
            </div>
        <Input/>
        </>
    )
}
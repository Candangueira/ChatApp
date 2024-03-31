import { React, useContext, useState } from 'react';
import { BiSolidImageAdd } from "react-icons/bi";
import { GrAttachment } from "react-icons/gr";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { v4 as uuid } from 'uuid';
import { Timestamp, updateDoc, arrayUnion, serverTimestamp, doc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export function Input() {
    // State variables for text input and image upload
    const [text, setText] = useState(''); 
    const [img, setImg] = useState(null);
    // Accessing the current user from the authentication context
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    
    // Function to send a message
      const handleSend = async () => {
            // If there is an image, upload it to the storage
            if (img) {
                // Create a reference to the storage location
                const storageRef = ref(storage, uuid());
                // Upload the image to the storage
                const uploadTask = uploadBytesResumable(storageRef, img);
                // When the upload is complete, get the download URL and update the chat document with the message
                uploadTask.on(
                    (error) => {
                        console.log(error);
                    },
                    () => {
                    // If the upload is successful, get the download URL and update the chat document with the message
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                        messages: arrayUnion({
                            id: uuid(),
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img: downloadURL,
                        }),
                        });
                    });
                    }
                );
            } else {
                // If there is no image, update the chat document with the message
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    }),
                });
            }
            // Update the userChats document with the last message and date
            await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
            });
            // Update the userChats document of the other user with the last message and date
            await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
            });
            // Reset the text and image state
            setText("");
            setImg(null);
        };

    return (
        <>
        <div className='input'> 
            <input type='text' placeholder='Type a message...' onChange={e=>setText(e.target.value)} value={text}/>
            <div className="send">
                <GrAttachment size={15}/>
                <input type='file' style={{display: 'none'}} id='file' onChange={e=>setImg(e.target.files[0])}/>
                <label htmlFor='file' className='img-file'>
                    <BiSolidImageAdd size={20}/>
                </label>
                <button className='send-button' onClick={handleSend}>Send</button>
            </div>
        </div>
        </>
    )
}
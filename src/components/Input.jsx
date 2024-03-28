import { React } from 'react';
import { BiSolidImageAdd } from "react-icons/bi";
import { GrAttachment } from "react-icons/gr";


export function Input() {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    return (
        <>
        <div className='input'> 
            <input type='text' placeholder='Type a message...'/>
            <div className="send">
                <GrAttachment size={15}/>
                <input type='file' style={{display: 'none'}} id='file'/>
                <label htmlFor='file' className='img-file'>
                    <BiSolidImageAdd size={20}/>
                </label>
                <button className='send-button'>Send</button>
            </div>
        </div>
        </>
    )
}
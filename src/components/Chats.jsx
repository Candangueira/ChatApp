import { React } from 'react';

export function Chats() {
    return (
        <>
        <div className='chats'>
            <div className='userchat'>
            <img src='../src/assets/imgs/cassio.jpg'></img>
                <div className='userchatinfo'>
                    <span>Username</span>
                    <p>message</p>
                </div>
            </div> 
        </div>

        <div className='chats'>
            <div className='userchat'>
            <img src='../src/assets/imgs/cassio.jpg'></img>
                <div className='userchatinfo'>
                    <span>Username</span>
                    <p>message</p>
                </div>
            </div> 
        </div>
        </>
    )
}
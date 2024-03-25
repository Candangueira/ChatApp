import { React } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export function Navbar() {
    return (
        <>
            <div className='navbar'>
                <span className='logo'>Chat</span>
                <span className='user'>
                    <img src='../src/assets/imgs/cassio.jpg' alt='avatar' className='avatar'/>
                    <span>Username</span>
                    <button onClick={()=>signOut(auth)}>Logout</button>
                </span>
            </div>
        </>
    )
}
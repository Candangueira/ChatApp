import { React } from 'react';

export function Navbar() {
    return (
        <>
            <div className='navbar'>
                <span className='logo'>Chat</span>
                <span className='user'>
                    <img src='../src/assets/imgs/cassio.jpg' alt='avatar' className='avatar'/>
                    <span>Username</span>
                    <button>Logout</button>
                </span>
            </div>
        </>
    )
}
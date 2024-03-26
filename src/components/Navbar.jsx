import { React } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate('/register');
                console.log('Sign-out successful');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };    

    return (
        <>
            <div className='navbar'>
                <span className='logo'>Chat</span>
                <span className='user'>
                    <img src='../src/assets/imgs/cassio.jpg' alt='avatar' className='avatar'/>
                    <span>Username</span>
                    <button onClick={handleSignOut}>Logout</button>
                </span>
            </div>
        </>
    )
}
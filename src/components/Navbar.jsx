import { React, useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function Navbar() {
    const {currentUser} = useContext(AuthContext);
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
                    <img src={currentUser.photoURL} alt='avatar' className='avatar'/>
                    <span>{currentUser.displayName}</span>
                    <button onClick={handleSignOut}>Logout</button>
                </span>
            </div>
        </>
    )
}
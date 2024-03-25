import { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

export function Register() {

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, displayName);
            
            await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
                //Update profile
                await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
                });
                //create user on firestore
                await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
                });

                //create empty user chats on firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
            } catch (err) {
                console.log(err);
                setError(true);
            }
            });
        });
        } catch (err) {
        setError(true);
        }
    };

    return (
        <>
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Chat</span>
                <span className='title'>Register</span>
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Name'/>
                        <input type='email' placeholder='Email'/>
                        <input type='password' placeholder='Password'/>
                        {/* links  */}
                        <input style={{display: "none"}} type='file' id="file"/>
                        <label htmlFor='file'><CgProfile size={20}/>Add an avatar image</label>

                        <button>Sign up</button>
                        {error && <span className='error'>Something went wrong!</span>}
                    </form>
                <p>Already have an account?<Link to='/login'> Login</Link></p>
            </div>
        </div>
        </>
    )
}
import { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { ChatContext } from "../context/ChatContext";
import { useContext } from 'react';

export function Register() {
    // State variable to store the error
    const [error, setError] = useState(false);
    // Accessing the dispatch function from the chat context
    const { dispatch } = useContext(ChatContext);
    // Hook to navigate to a different page
    const navigate = useNavigate();

    // Function to handle the registration of a new user
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // Get the current time
            const date = new Date().getTime();
            // Create a reference to the storage location
            const storageRef = ref(storage,`${displayName + date}`);
            
            // Upload the image to the storage
            await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async(downloadURL) => {
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

                //create empty userchats on firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
                dispatch({ type:"RESET", payload: "" }); 
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
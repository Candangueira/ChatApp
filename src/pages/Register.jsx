import { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase';

export function Register() {

    const [error, setError] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on( 
       
         
        (error) => {
           setError(true);
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                console.log('File available at', downloadURL);
            await updateProfile(res.user, {
                displayName: name,
                photoURL: downloadURL
            });

            await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                displayName: name,
                email,
                photoURL: downloadURL
            });
          });
        }
      );
        } catch (error) {
           setError(true);
           console.log(error.message);

        }
    }


    

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
                <p>Already have an account? Login</p>
            </div>
        </div>
        </>
    )
}
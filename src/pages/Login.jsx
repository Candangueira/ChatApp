import { CgProfile } from "react-icons/cg";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try { 
            await signInWithEmailAndPassword(auth, email, password);
            navigate("login");    
        } catch (err) {
            setError(true);
        }
    };
    return (
        <>
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Chat</span>
                <span className='title'>Login</span>
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Name'/>
                        <input type='password' placeholder='Password'/>
                        <button>Sign in</button>
                        {error && <span className='error'>Something went wrong!</span>}
                    </form>
                <p>Don't have an account? <Link to='/register'>Sign up</Link></p>
            </div>
        </div>
        </>
    )
}
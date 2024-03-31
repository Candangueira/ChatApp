// import { CgProfile } from "react-icons/cg";
// import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ChatContext } from "../context/ChatContext";

export function Login() {
    const [error, setError] = useState(false);
    const { dispatch } = useContext(ChatContext);
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try { 
            await signInWithEmailAndPassword(auth, email, password);
            console.log("SIGN IN WITH EMAIL AND PASSWORD: "+ signInWithEmailAndPassword);
            navigate("/");
            dispatch({ type:"RESET", payload: "" });    
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
                        <input type='email' placeholder='email'/>
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
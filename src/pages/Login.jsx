import { CgProfile } from "react-icons/cg";

export function Login() {
    return (
        <>
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Chat</span>
                <span className='title'>Login</span>
                    <form>
                        <input type='text' placeholder='Name'/>
                        <input type='password' placeholder='Password'/>
                        <button>Sign in</button>
                    </form>
                <p>Don't have an account? Sign up</p>
            </div>
        </div>
        </>
    )
}
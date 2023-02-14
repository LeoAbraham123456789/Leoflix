import { useState, useContext } from 'react'
import { AuthContext } from '../../authContext/AuthContext';
import './login.scss'
import {login} from "../../authContext/apiCalls"

export const Login = () => {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const { dispatch } = useContext(AuthContext)
    const handleLogin=(e)=>{
        e.preventDefault()
        login({email, password}, dispatch)
    }
  return (
    <div className='login'>
        <div className="top">
            <div className="wrapper">
            <img
                className='logo'
                src='https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png'
                alt=''
            />
            </div>
        </div>
        <div className="container">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder='Email or phone number' onChange={(e)=>setEmail(e.target.value)}/>
                <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                <button className='loginButton' onClick={handleLogin}>Sign In</button>
                <span>
                    New to Netflix? <b>Sign up now.</b>
                </span>
                <small>
                    This page is proteted by Google reCAPTCHA to ensure you are not a bot. <b>Learn more</b>
                </small>
            </form>
        </div>
    </div>
  )
}

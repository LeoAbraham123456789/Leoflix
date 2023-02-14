import axios from 'axios'
import { useRef } from 'react'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import './register.scss'
import {Link} from 'react-router-dom'

export const Register = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[username, setUsername] = useState('')
    const navigate=useNavigate()
    const emailRef=useRef() 
    const passwordRef=useRef()
    const usernameRef=useRef()
    const handleStart=()=>{
        setEmail(emailRef.current.value);
    }
    const handleFinish=async(e)=>{
        e.preventDefault();
        setPassword(passwordRef.current.value);
        setUsername(usernameRef.current.value);
        try{
            await axios.post("auth/register", {email, username, password})
            navigate("/login");
        }
        catch(err){

        }
    }
  return (
    <div className='register'>
        <div className="top">
            <div className="wrapper">
            <img
                className='logo'
                src='https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png'
                alt=''
            />
            <Link to ="/login">
            <button className='loginButton'>Sign In</button>
            </Link>
            </div>
        </div>
        <div className="container">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h2>Watch anywhere. Cancel anytime</h2>
            <p>Ready to watch? Enter your mail to create or restart your membership.</p>
            {!email ? (
                <div className="input">
                    <input type="email" placeholder='email address' ref={emailRef}/>
                    <button className='registerButton' onClick={handleStart}>Get Started</button>
                </div>
            ):(
                <form className="input">
                    <input type="username" placeholder='username'/>
                    <input type="password" placeholder='password' ref={passwordRef}/>
                    <button className='registerButton' onClick={handleFinish}>Start</button>
                </form>
            )}
            
        </div>
    </div>
  )
}

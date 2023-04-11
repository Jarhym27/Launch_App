import React from 'react'
import '../css/style.css'
import {useState,useContext} from "react"
import{useNavigate} from "react-router-dom"
import { RocketInfo } from '../App'
import bcrypt from 'bcryptjs'
// import {authentication} from './Auth'

const Login = () => {
  const {userLogin, setUserLogin} = useContext(RocketInfo)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault() 
    const username = e.target.value;
    const password = e.target.value;
    alert(`username:${setUsername} and password: ${password}`)
     const saltRounds = 10;
     const salt =bcrypt.genSaltSync(saltRounds)

     const usernameAndPassword = username + password;
    const hashUsernameAndPassword = bcrypt.hashSync(usernameAndPassword, salt)
    
    
    console.log("Its Hashed!!!! You nerd:", hashUsernameAndPassword);
  }
 

  // const inputChange = async (event) =>{
  //   if(event.target.name === "username"){
  //     setUserLogin({username: event.target.name})
  //     console.log(userLogin)
  //   }else if(event.target.password === "password"){
  //     setPassword({password: event.target.password})
  //     const hashedPassword = bcrypt.hashSync(password, 15)
  //     console.log(password)
  //     window.localStorage.setItem('login', JSON.stringify({userLogin, hashedPassword}))
  //   }else{
      
  //   }
    
  // }

  const signUpForm = async(event) =>{
    event.preventDefault() 
    navigate('/Signup')
     }

  const loginButtonClick = async(event) =>{
    event.preventDefault();


    // const credentials ={username, password};
    // const result = await authentication('',credentials)
    // if(result.status === 'success'){
    //   window.location.reload()
    // }else if(result.status === 'failure') {
    //   alert("error")
    // }
    // const getHashedPassword = JSON.parse(window.localStorage.getItem('login'))
    // console.log(getHashedPassword)
    // // bcyrpyt.compare(password, getHashedPassword, function(err, match) )
    
  }
   
  

  

return (
  <div className='bg-lavender h-screen w-screen flex'>
    <h1 className='font-mono text-3xl text-center padding-y-4'>Welcome to L-Über</h1>
    <div className='grid grid-cols-1 grid-rows-6 gap-10 w-3/6 self-center'>
      <input className='' type='text' placeholder='User Name'></input>
      <input type='password' placeholder='Password'></input>
      <button className='ring-4 bg-magenta w-4/6 justify-self-center'>Login</button>
      <h1 className='font-mono text-3xl text-magenta text-center padding-y-4'>Not a Üser Yet?</h1>
      <button className='ring-4 ring-color-coral bg-purple w-4/6 justify-self-center'>Sign Up!</button>
    </div>
    
  </div>
)
}

export default Login;
//justify-center items-center
//grid w-3/6 h-1/6 space-y-4 grid-cols-1 divide-y

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
  <div>
  <div className="relative mb-6" onSubmit={handleSubmit} >
    <input
      type="text"
      // onChange={inputChange}
      name="username"
      onChange={(e) => setUsername(e.target.value)}
      className="peer block min-h-[auto] w-full rounded border-100 border-black bg-white px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-red-300 dark:placeholder:text-red-700 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-800"
      id="exampleFormControlInput2"
      placeholder="Email address" />
    <label
      // for="exampleFormControlInput2"
      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-black transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-red-500 peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-black"
    >Username
    </label>
  </div>
  <div className="relative mb-6">
    <input
      type="password"
      name="password"
      onChange={(e) => setPassword(e.target.value)}
      // onChange={inputChange}
      className="peer block min-h-[auto] w-full rounded border-100 border-black bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      id="exampleFormControlInput22"
      placeholder="Password" />
    <label
      // for="exampleFormControlInput22"
      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
    >Password
    </label>
  </div>
  <div className="text-center lg:text-left">
    <button
      type="button"
      onClick={handleSubmit}
      className="inline-block rounded bg-green-900 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-green-500 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-rose-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
      Login
    </button>
  </div>
  <div className="text-center lg:text-left">
    <button
      type="button"
      onClick={signUpForm}
      className="inline-block rounded bg-green-900 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-green-500 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-rose-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
      Signup
    </button>
  </div>
</div>
  )
}

export default Login;
import React from 'react'
// import '../css/style.css'
import '../css/Login.css'
import {useState,useContext} from "react"
import{useNavigate} from "react-router-dom"
import { RocketInfo } from '../App'
import bcrypt from 'bcryptjs'
import 'bootstrap/dist/css/bootstrap.min.css';
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
  <div className='background p-3' style={{height: '100vh'}}>
   <div className='d-flex w-100 h-100 align-items-center'>
    
    <div className='col'>
    <h1 className='text-center'>L-Uber</h1>
      <div className='row my-3 justify-content-center'>
        <input type='text' placeholder='User Name' className='w-50 rounded'></input>
      </div>
      <div className='row my-3 d-flex justify-content-center'>
        <input type='password' placeholder='Password' className='w-50 rounded'></input>
      </div>
      <div className='row my-3 d-flex justify-content-center'>
        <button className='btn btn-secondary w-25'>Login!</button>
      </div>
    </div>
      
    
   </div>
    
  </div>
)
}

export default Login;


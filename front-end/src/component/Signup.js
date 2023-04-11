import React from "react";
import '../css/style.css';
import { useNavigate } from "react-router-dom";
import {useState, useContext} from "react"
import { RocketInfo } from '../App'
import bcrypt from 'bcryptjs'
import cookie from "js-cookie"
import axios from "axios"

const Signup = () => {

    const navigate = useNavigate();
    const { userCreate, setUserCreate } = useContext(RocketInfo);

    const inputChange = (event) => {
        event.preventDefault();
        if (event.target.name === 'username') {
          setUserCreate({ ...userCreate, username: event.target.value })
          console.log(userCreate)
        } else if (event.target.name === 'password') {
          setUserCreate({ ...userCreate, password: event.target.value })
          console.log(userCreate)
        } 
    
      }
    
   const createAccount = async (event) => {
         event.preventDefault();
     try{

        if(!userCreate.password){
            throw new Error('Password is missing')
        }
         const hashedPassword = await bcrypt.hash(userCreate.password, 10)
         console.log(hashedPassword)
         console.log(userCreate.password)
         console.log(userCreate.username)
        
         if (hashedPassword) {
           cookie.set('username', userCreate.username, { expires: 1 / 24 })
           cookie.set('password', hashedPassword, { expires: 1 / 24 })
           try{
           const res = await axios.post("http://localhost:8080/login", {
            username: userCreate.username,
              password:hashedPassword})
              console.log(res.data)
           alert(`You created ${userCreate.username}!`)
         
           navigate("/")
          } catch(error) {
             alert('login failed');
               console.error(error)
           }
         }
        } catch(error) {
            alert('error hashing');
              console.error(error)
          }
        }


return(
    <div>
        <div>
        <h2>Personal Details</h2>
             <input 
       type="text"
       placeholder="Last Name" />
        <input 
       type="text"
       placeholder="First Name" />
       <input 
       type="text"
       placeholder="Organization" />
       <input 
       type="text"
       placeholder="Phone Number" />
       <input 
       type="email"
       placeholder="Email" />
       <form action="Post"
        >
       <input 
       type="text"
       name="username"
       onChange={inputChange}
       placeholder="Username" />
        <input 
       type="password"
       name="password"
       onChange={inputChange}
       placeholder="Password" />
       <input 
       type="password"
       placeholder="Confirm Password" />
       </form>
       </div>
       
       <h2>Mailing Address</h2>
       <div>
       
       <input 
       type="text"
       placeholder="Address" />
        <input 
       type="text"
       placeholder="Address 2" />
       <input 
       type="text"
       placeholder="City " />
       <input 
       type="text"
       placeholder="Postal Code" />
       <input 
       type="text"
       placeholder="Country" />
       </div>

       <div>
       <h1>Lower Part</h1> 
       <input 
       type="radio"
       />
      <label>I am an Organizational Pad Owner </label> 
      <input 
       type="radio"
       />
      <label>I am an Organizational Payload User</label> 
       </div>
       <h2>Lower part 2</h2>
       <input 
       type="radio"
       />
      <label>I understand the risk of falsifying information and accept those risk under penalty of law</label> 
      <h2>Lower Part 3</h2>
      <button
      type="button"
      onClick={createAccount}
      className="inline-block rounded bg-green-900 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-green-500 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-rose-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">Submit</button>

    </div>
    
 )

}
export default Signup;
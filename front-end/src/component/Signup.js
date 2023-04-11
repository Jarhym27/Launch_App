import React from "react";
import '../css/style.css';
import { useNavigate } from "react-router-dom";
import {useState, useContext} from "react"
import { RocketInfo } from '../App'
import bcrypt from 'bcryptjs'
import cookie from "js-cookie"
import axios from "axios"
import Header from "./Header.js"
import '../css/Signup.css'
import * as Icon from "react-bootstrap-icons"
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'


const Signup = () => {
  const navigate = useNavigate();
  const { userCreate, setUserCreate } = useContext(RocketInfo);
  const [answer, setAnswer]= useState('')

  const inputChange = (event) => {
      event.preventDefault();
      if (event.target.name === 'username') {
        setUserCreate({ ...userCreate, username: event.target.value })
        console.log(userCreate)
      } else if (event.target.name === 'password') {
        setUserCreate({ ...userCreate, password: event.target.value })
        console.log(userCreate)
      } else if (event.target.name === 'organization') {
        setUserCreate({ ...userCreate,  organization: event.target.value })
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
         const res = await axios.post("http://localhost:8080/signup", {
          username: userCreate.username,
            password:hashedPassword,
          organization:userCreate.organization,
          role:userCreate.role
        })
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

      const roleChoice =[{
        choice: "I am an Organizational Pad Owner", value:"lsp_user",
        choice: "I am an Organizational Payload User", value:"payload_user",
      }]

    

return(
           
            <div className="background">
              <Header/>
              <h1 className="font-mono text-5xl text-center justify-center ">Sign Up</h1>
        <Container>
       <Form>
        <input className="form-control"
       type="text"
       onChange={inputChange}
       name="organization"
       placeholder="Organization" />
       <input className="form-control"
       type="text"
       name="username"
       onChange={inputChange}
       placeholder="Username" />
        <input className="form-control"
       type="password"
       name="password"
       onChange={inputChange}
       placeholder="Password" />
       <input className="form-control"
       type="password"
       placeholder="Confirm Password" />
       </Form>
       </Container>
       <div> 
        {roleChoice.map((choice, index) =>(
          <div>
        <input className='btn-check' name={index} type="radio" value={choice.value} checked={choice[i] === choice.value} />
        </div>
       
       <h1 className="font-mono text-5xl text-center justify-center">Lower Part</h1> 
       <input 
       type="radio"
       />
      <label className="text-white justify-center">I am an Organizational Pad Owner </label> 
      <input 
       type="radio"
       />
      <label className="text-white justify-center">I am an Organizational Payload User</label> 
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
      className="inline-block rounded bg-green-900 px-7 pb-2.5 pt-3 text-white font-medium uppercase leading-normal text-green-500 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-rose-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">Submit</button>

    </div>
    
 )

}
export default Signup;
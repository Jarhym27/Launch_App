import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import {RocketTakeoffFill} from "react-bootstrap-icons";
import { useState, useContext } from "react";
import { RocketInfo } from "../App";



const Header = () =>{

  const { userLogin, setUserLogin } = useContext(RocketInfo);
  let homePath = '/';

  if (userLogin.role === 'lsp_user') {
homePath = '/lsphomepage??'
  } else {
homePath = '/payloadhomepage??'
  }



return(
  <>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  {/* <div  > */}
    <RocketTakeoffFill className="navbar-brand" color='white' size={50}/>
  <a className="navbar-brand" href="#">L-Uber</a>
    <ul className="nav navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href={homePath}>Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/AboutUs">About Us</a>
      </li>
    </ul>
        <ul className='nav navbar-nav navbar-right'>
      <li class="nav-item">
        <a class="nav-link" href="/" onClick={()=>setUserLogin('')}>Logout</a>
      </li>
      </ul>

  {/* </div> */}
</nav>
</>
)

}

export default Header;
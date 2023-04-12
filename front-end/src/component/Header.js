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
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <RocketTakeoffFill class="navbar-brand" color='white' size={50}/>
  <a class="navbar-brand" href="#">L-Uber</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href={homePath}>Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/AboutUs">About Us</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/" onClick={setUserLogin('')}>Logout</a>
      </li>
    </ul>

  </div>
</nav>
</>
)

}

export default Header;
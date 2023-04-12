import React from "react";
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext } from "react";
import Login from "./component/Login";
import Signup from "./component/Signup";
import PayloadProfile from "./component/PayloadProfile";
import LaunchRequest from './component/LaunchRequest';
import PageNotFound from "./component/PageNotFound";
import Header from "./component/Header";
import About from "./component/About";
import Home from "./component/Home"
import {useEffect} from 'react'
import cookie from 'cookie'
// import LSP_Profile from "./component/lsp_profile/lsp_profile_page";

export const RocketInfo = createContext();

function App() {
  const [userLogin, setUserLogin] = useState("");
  const [userCreate, setUserCreate] = useState({
    username: "",
    password: "",
    organization: "",
    role: "",
  });

  useEffect(() => {
    let cookies = cookie.parse(document.cookie);
    // console.log(cookies.userInfo)
    if(cookies.userInfo){
      // console.log(cookies.userInfo)
      fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({userInfo: cookies.userInfo}),
    })
    .then((res) => res.json())
    .then((data) => {
      setUserLogin(data)
    })
    }

  }, [])

  return (
    <RocketInfo.Provider value={{userCreate, setUserCreate, userLogin, setUserLogin}}>
      <Router>
        {userLogin.username && <Header/> }
        <Routes>
          <Route path='/' element={< Login/>}></Route>
          <Route path='/home' element={< Home/>}></Route>
          {/* <Route path='/Login' element={< Login />}></Route> */}
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/request' element={<LaunchRequest/>}></Route>
          <Route path='/header' element={<Header/>}></Route> {/*only needed for testing */}
          <Route path='/aboutus' element={<About/>}></Route>
          <Route path='/payloadprofile' element={<PayloadProfile/>}></Route>
           <Route path="*" element={<PageNotFound />} />
          {/* <Route path='/LSP_Profile' element={<LSP_Profile/>}></Route> */}
        </Routes>
      </Router >
    </RocketInfo.Provider>
  )
}

export default App;

//<RocketInfo.Provider value={{ userCreate, setUserCreate, userLogin, setUserLogin }}></RocketInfo.Provider>

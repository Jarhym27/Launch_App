import React from "react";
import "./css/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Login from "./component/Login";
import Signup from "./component/Signup";
import PayloadProfile from "./component/PayloadProfile";
import PageNotFound from "./component/PageNotFound";
import Header from "./component/Header";
import About from "./component/About";
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

  return (
    <RocketInfo.Provider value={{userCreate, setUserCreate, userLogin, setUserLogin}}>
      <Router>
        {userLogin.username == '' ? <Header/> : ''}
        <Routes>
          <Route path='/' element={< Login/>}></Route>
          {/* <Route path='/Login' element={< Login />}></Route> */}
          <Route path='/Signup' element={<Signup/>}></Route>
          <Route path='/header' element={<Header/>}></Route> {/*only needed for testing */}
          <Route path='/AboutUs' element={<About/>}></Route>
          <Route path='/payloadProfile' element={<PayloadProfile/>}></Route>
           <Route path="*" element={<PageNotFound />} />
          {/* <Route path='/LSP_Profile' element={<LSP_Profile/>}></Route> */}
        </Routes>
      </Router >
    </RocketInfo.Provider>
  )
}

export default App;

//<RocketInfo.Provider value={{ userCreate, setUserCreate, userLogin, setUserLogin }}></RocketInfo.Provider>
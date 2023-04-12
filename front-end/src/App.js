import React from "react";
import './css/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext } from "react";
import Login from './component/Login'
import Signup from "./component/Signup";
import PayloadProfile from "./component/PayloadProfile";
import AnimeRocket from "./component/Animated_Rocket";
// import LSP_Profile from "./component/lsp_profile/lsp_profile_page";

export const RocketInfo = createContext();

function App() {
  const [ userLogin, setUserLogin ] = useState('');
  const [userCreate, setUserCreate] = useState({username:'', password: '', organization:'', role:'' });

  return(
  <RocketInfo.Provider value={{userCreate, setUserCreate}}>
    <Router>
      <Routes>
        <Route path='/' element={< Login/>}></Route>
        <Route path='/rocket' element={< AnimeRocket />}></Route> 
        <Route path='/Signup' element={<Signup/>}></Route>
        {/* <Route path='/LSP_Profile' element={<LSP_Profile/>}></Route> */}
      </Routes>
    </Router >
  </RocketInfo.Provider>
        );
}


        export default App;

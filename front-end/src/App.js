import React from "react";
import './css/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext } from "react";
import Login from './component/Login'
import Signup from "./component/Signup";
import PayloadProfile from "./component/PayloadProfile";

export const RocketInfo = createContext();

function App() {
  const [ userLogin, setUserLogin ] = useState('');
  const [userCreate, setUserCreate] = useState({username:'', password: '', organization:'', role:'' });

  return(
  <RocketInfo.Provider value={{userCreate, setUserCreate}}>
    <Router>
      <Routes>
        <Route path='/' element={< Login/>}></Route>
        {/* <Route path='/Login' element={< Login />}></Route> */}
        <Route path='/Signup' element={<Signup/>}></Route>
      </Routes >
    </Router >
  </RocketInfo.Provider>
        );
}


        export default App;

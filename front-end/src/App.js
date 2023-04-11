import React from "react";
import './css/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext } from "react";
import Login from './component/Login'
import Signup from "./component/Signup";
import LaunchRequest from './component/LaunchRequest';

export const RocketInfo = createContext();

function App() {
  const [ userLogin, setUserLogin ] = useState('');
  const [userCreate, setUserCreate] = useState({username:'', password: '', role_id:'0' })
  return (
    <RocketInfo.Provider value={{userLogin, setUserLogin, userCreate, setUserCreate}}>
    <Router>
      <Routes>
        <Route path='/' element={< Login/>}></Route>
        {/* <Route path='/Login' element={< Login />}></Route> */}
        <Route path='/request' element={<LaunchRequest/>}></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
      </Routes >
    </Router >
    </RocketInfo.Provider>
        );
}

        export default App;

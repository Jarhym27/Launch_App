import React from "react";
// import '../css/style.css'
import "../css/Login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RocketInfo } from "../App";
import bcrypt from "bcryptjs";
import "bootstrap/dist/css/bootstrap.min.css";
// import {authentication} from './Auth'

const Login = () => {
  const { userLogin, setUserLogin } = useContext(RocketInfo);
  const [password, setPassword] = useState("");
  const [hashedPW, setHashedPW] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const submitLogin = () => {
   bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      setHashedPW(hash)
      
    })
   })
  };

  const handleChange = (field, value) => {
    if(field === 'user'){
      setUsername(value)
      console.log('User: ', value)
    }
    else if(field === 'pass'){
      setPassword(value)
      console.log('Pass: ', value)
    }
  }

  return (
    <div className="background p-3" style={{ height: "100vh" }}>
      <div className="d-flex w-100 h-100 align-items-center">
        <div className="col">
          <h1 className="text-center">L-Uber</h1>
          <div className="row my-3 justify-content-center">
            <input
              type="text"
              placeholder="User Name"
              className="w-50 rounded"
              onChange={(e) => handleChange('user', e.target.value)}
            ></input>
          </div>
          <div className="row my-3 d-flex justify-content-center">
            <input
              type="password"
              placeholder="Password"
              className="w-50 rounded"
              onChange={(e) => handleChange('pass', e.target.value)}
            ></input>
          </div>
          <div className="row my-3 d-flex justify-content-center">
            <button className="btn btn-secondary w-25" onClick={() => submitLogin()}>Login!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

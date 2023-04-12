import "../css/Login.css";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookie from 'cookie'
import "bootstrap/dist/css/bootstrap.min.css";
import { RocketInfo } from "../App";


const Login = () => {
  const [pass, setPassword] = useState("");
  const [user, setUser] = useState("");
  const {userCreate, setUserCreate, userLogin, setUserLogin} = useContext(RocketInfo)
  const navigate = useNavigate();
  // const {userLogin, setUserLogin} = useContext(UserContext)
  
  
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

  useEffect(() => {
    if(userLogin){
      // navigate('/AboutUs')
      console.log(userLogin)
    }
  }, [userLogin])

  const submitLogin = () => {
    let body = { username: user, password: pass };
    // console.log(body)
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(body),
    })
    .then(res => res.json())
    .then(data => {
      setUserLogin(data)
    })
  };

  const handleChange = (field, value) => {
    if (field === "user") {
      setUser(value);
      // console.log('User: ', value)
    } else if (field === "pass") {
      setPassword(value);
      // console.log('Pass: ', value)
    }
  };

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
              onChange={(e) => handleChange("user", e.target.value)}
            ></input>
          </div>
          <div className="row my-3 d-flex justify-content-center">
            <input
              type="password"
              placeholder="Password"
              className="w-50 rounded"
              onChange={(e) => handleChange("pass", e.target.value)}
            ></input>
          </div>
          <div className="row my-3 d-flex justify-content-center">
            <button
              className="btn btn-secondary w-25"
              onClick={() => submitLogin()}
            >
              Login!
            </button>
          </div>
          <h1 className="text-center">Not a user yet?</h1>
          <div className="row my-3 d-flex justify-content-center">
            <button
              className="btn btn-secondary w-25"
              onClick={() => navigate('/signup')}
            >
              Sign Up!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

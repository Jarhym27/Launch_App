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
  
  useEffect(() => {
    if(userLogin){
      // navigate('/AboutUs')
      console.log(userLogin)
    }
  }, [userLogin])

  const submitLogin = () => {
    let body = { username: user, password: pass };
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(body),
    })
    .then(res => {
      if(res.status !== 200){
        throw new Error('invalid login')
      } else {
        return res.json()
      }
      })
    .then(data => {
      setUserLogin(data)
      navigate('/home')
    })
    .catch(err=>console.error(err))
  };

  const handleChange = (field, value) => {
    if (field === "user") {
      setUser(value);
    } else if (field === "pass") {
      setPassword(value);
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

import "../css/Login.css";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { RocketInfo } from "../App";
import AnimeRocket from "./Animated_Rocket";

const Login = () => {
  const [pass, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [failed, setFailed] = useState(false);
  const {userCreate, setUserCreate, userLogin, setUserLogin} = useContext(RocketInfo)
  const navigate = useNavigate();
  
  useEffect(() => {
    if(userLogin){
      // navigate('/AboutUs')
      console.log(userLogin)
    }
  }, [userLogin])

  const submitLogin = (e) => {
    e.preventDefault()
    let body = { username: user, password: pass };
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(body),
    })
    .then(res => {
      if(res.status !== 200){
        setFailed(true)
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
    <div className="background p-3" style={{ height: "100vh" , backgroundSize: "cover"}}>
      <h1 className="text-center topHeader loginPageHeader">L<span id="hide">aunch</span>-Uber </h1>
      <div className="d-flex w-100 h-100vh align-items-center">
        <div className="col">
          {failed && <h1 className="text-center failed loginPageHeader">Invalid Login.</h1>}
          <form onSubmit={(e) => submitLogin(e)}>
            <div className="row my-3 justify-content-center">
              <input
                type="text"
                placeholder="User Name"
                className="w-50 rounded text-center"
                required
                onChange={(e) => handleChange("user", e.target.value)}
              ></input>
            </div>
            <div className="row my-3 d-flex justify-content-center">
              <input
                type="password"
                placeholder="Password"
                className="w-50 rounded text-center"
                required
                onChange={(e) => handleChange("pass", e.target.value)}
              ></input>
            </div>
            <div className="row my-3 d-flex justify-content-center">
              <input
                type="submit"
                className="btn btn-secondary w-25"
                
                value="Login!"
              >
              </input>
            </div>
          </form>
          <h1 className="text-center loginPageHeader">Not a user yet?</h1>
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

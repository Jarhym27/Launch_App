import React from "react";
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext, useEffect } from "react";
import Login from "./component/Login";
import Signup from "./component/Signup";
import PayloadProfile from "./component/PayloadProfile";
import AnimeRocket from "./component/Animated_Rocket";
import LaunchRequest from './component/LaunchRequest';
import PageNotFound from "./component/PageNotFound";
import Header from "./component/Header";
import About from "./component/About";
import Home from "./component/Home"
import cookie from 'cookie'
import LspProfile from "./component/lsp_profile/01_lsp_profile_page";
import RequestDetails from "./component/RequestDetails";
import AllMessages from "./component/AllMessages";
import NotificationsBadge from "./component/NotificationsBadge";
export const RocketInfo = createContext();

function App() {
  const [userLogin, setUserLogin] = useState("");
  const [launchVehicles, setLaunchVehicles] = useState()
  const [userCreate, setUserCreate] = useState({
    username: "",
    password: "",
    organization: "",
    role: "",
  });
  const [availablePads, setAvailablePads] = useState();
  const [refresh, setRefresh] = useState(false);
  const [myRequests, setMyRequests] = useState([])

  useEffect(() => {
    let cookies = cookie.parse(document.cookie);
    if (cookies.userInfo) {
      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userInfo: cookies.userInfo }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUserLogin(data)
        })
    }

  }, [])

  return (
    <RocketInfo.Provider value={{ userCreate, setUserCreate, userLogin, setUserLogin, availablePads, setAvailablePads, launchVehicles, setLaunchVehicles, refresh, setRefresh, myRequests, setMyRequests }}>
      <Router>
        {userLogin.username && <Header />}
        <Routes>
          <Route path='/' element={< Login />}></Route>
          <Route path='/home' element={< Home />}></Route>
          {/* <Route path='/Login' element={< Login />}></Route> */}
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/request' element={<LaunchRequest />}></Route>
          <Route path='/header' element={<Header />}></Route> {/*only needed for testing */}
          <Route path='/rocket' element={< AnimeRocket />}></Route>
          <Route path='/aboutus' element={<About/>}></Route>
          <Route path='/payloadprofile' element={<PayloadProfile/>}></Route>
          <Route path='/lspprofile' element={<LspProfile/>}></Route>
          <Route path='/requestdetails' element={<RequestDetails/>}></Route>
          <Route path='/messages' element={<AllMessages/>}></Route>
          <Route path="*" element={<PageNotFound />} ></Route>
        </Routes>
      </Router >
      {userLogin.username &&
        <footer className="bg-dark">
          <div className="container text-center">
            <p className="font-italic text-muted pt-2 mb-0">© 2023 L-Uber.com</p>
          </div>
        </footer>
      }
    </RocketInfo.Provider>
  )
}

export default App;

